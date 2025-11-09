# On-Device ML in Chrome Extensions: Running Intelligence at the Edge

**Published:** November 8, 2025
**Tags:** Machine Learning, Chrome Extensions, JavaScript, Edge Computing

---

## Introduction

What if your browser extension could understand images, classify text, or detect objects—all without sending a single byte to a remote server? Welcome to on-device machine learning in Chrome extensions, where we push the boundaries of what's possible in a browser tab.

This isn't a theoretical exercise. I recently shipped a Chrome extension that uses TensorFlow.js to run real-time ML inference entirely client-side. Here's everything I learned about running neural networks in one of the most constrained environments in computing.

## Why On-Device ML in Extensions?

### The Privacy Win

Traditional ML: Screenshot → Upload → Server processes → Result returns

On-Device ML: Screenshot → Local model → Result

No data leaves the user's machine. Ever. For sensitive use cases (analyzing private documents, processing personal photos, filtering content), this isn't just nice—it's essential.

### The Speed Advantage

Network round-trips are slow and unreliable. Even with a fast connection:
- API call: ~200ms
- Server inference: ~100ms
- Response return: ~200ms
- **Total: ~500ms minimum**

On-device with a quantized model:
- Inference: ~50-150ms
- **Total: 50-150ms**

### The Offline Reality

Extensions should work on planes, in coffee shops with spotty WiFi, and in regions with poor connectivity. On-device ML makes this possible.

## The Harsh Reality: Browser Constraints

Running ML in a browser isn't like running it in Python. You're fighting against:

### 1. Memory Limits

Chrome extensions have strict memory budgets:
- **Background scripts:** ~100MB before throttling
- **Content scripts:** Share page memory (~200-500MB)
- **Popup/UI:** ~50MB

Load a 50MB model + activations + batched inference? You'll hit these limits fast.

### 2. Execution Context Fragmentation

Chrome extensions have 4 distinct execution contexts:

```javascript
// 1. Background/Service Worker (MV3)
// - No DOM access
// - Limited lifetime
// - Best for ML inference

// 2. Content Script
// - Runs in page context
// - Can access DOM
// - Memory shared with page

// 3. Popup
// - Temporary (closes when clicked away)
// - NOT suitable for ML

// 4. Offscreen Document (MV3)
// - Persistent
// - Can use DOM APIs
// - Good for heavier processing
```

### 3. WebAssembly Constraints

TensorFlow.js uses WebAssembly for performance, but:
- Initial compilation is slow (~1-3 seconds)
- Memory can't shrink once grown
- SIMD support varies by browser version

## Architecture: What Actually Works

After six iterations, here's the architecture that survived production:

### Model Selection & Optimization

**Rule 1: Smaller is always better**

I started with MobileNetV2 (14MB). Too big. Switched to:

```javascript
// Final choice: Custom quantized model
const modelConfig = {
  name: 'mobilenet_v2_quantized',
  size: '3.2MB',        // 8-bit quantization
  accuracy: '~89%',     // vs 92% for full precision
  inference: '45ms',    // On average laptop
  tradeoff: 'Worth it'
};
```

**How we got there:**

```python
# Training with quantization-aware training
import tensorflow as tf

# 1. Train model normally
model = create_model()
model.compile(...)
model.fit(...)

# 2. Apply quantization
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.int8]

# 3. Convert to TFLite, then to TF.js
tflite_model = converter.convert()

# 4. Convert to TF.js format
!tensorflowjs_converter \
    --input_format=tf_saved_model \
    --output_format=tfjs_graph_model \
    --quantize_uint8 \
    ./saved_model \
    ./web_model
```

### Loading Strategy: Lazy & Cached

```javascript
// manifest.json - Declare model as web_accessible_resource
{
  "web_accessible_resources": [{
    "resources": ["models/*.json", "models/*.bin"],
    "matches": ["<all_urls>"]
  }]
}

// background.js - Smart loading with caching
class ModelManager {
  constructor() {
    this.model = null;
    this.loading = null;
    this.CACHE_KEY = 'ml_model_cache_v1';
  }

  async loadModel() {
    // Return cached promise if already loading
    if (this.loading) return this.loading;

    // Return model if already loaded
    if (this.model) return this.model;

    this.loading = this._loadModelInternal();
    this.model = await this.loading;
    this.loading = null;

    return this.model;
  }

  async _loadModelInternal() {
    try {
      // Try IndexedDB cache first
      const cached = await this.getCachedModel();
      if (cached) {
        console.log('Model loaded from cache');
        return cached;
      }

      // Load from extension bundle
      const modelUrl = chrome.runtime.getURL('models/model.json');
      const model = await tf.loadGraphModel(modelUrl);

      // Warm up the model
      await this.warmup(model);

      // Cache for next time
      await this.cacheModel(model);

      return model;
    } catch (error) {
      console.error('Model loading failed:', error);
      throw error;
    }
  }

  async warmup(model) {
    // Run dummy inference to compile WebAssembly
    const dummyInput = tf.zeros([1, 224, 224, 3]);
    await model.predict(dummyInput).data();
    dummyInput.dispose();
    console.log('Model warmed up');
  }

  async getCachedModel() {
    // Implementation using IndexedDB or chrome.storage.local
    // Note: chrome.storage has 10MB limit, use IndexedDB for larger models
    return null; // Simplified for example
  }
}

const modelManager = new ModelManager();
```

### Inference Pipeline: Batching & Optimization

```javascript
class InferencePipeline {
  constructor(model) {
    this.model = model;
    this.queue = [];
    this.processing = false;
    this.BATCH_SIZE = 4;
    this.BATCH_TIMEOUT = 100; // ms
  }

  async predict(imageData) {
    return new Promise((resolve, reject) => {
      // Add to queue
      this.queue.push({ imageData, resolve, reject });

      // Process batch if ready or after timeout
      if (this.queue.length >= this.BATCH_SIZE) {
        this.processBatch();
      } else {
        setTimeout(() => this.processBatch(), this.BATCH_TIMEOUT);
      }
    });
  }

  async processBatch() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;
    const batch = this.queue.splice(0, this.BATCH_SIZE);

    try {
      // Preprocess all images in batch
      const tensors = batch.map(item =>
        this.preprocessImage(item.imageData)
      );

      // Stack into single batch tensor
      const batchTensor = tf.stack(tensors);

      // Single inference call for entire batch
      const predictions = await this.model.predict(batchTensor);
      const results = await predictions.array();

      // Distribute results
      results.forEach((result, idx) => {
        batch[idx].resolve(result);
      });

      // Cleanup
      tensors.forEach(t => t.dispose());
      batchTensor.dispose();
      predictions.dispose();

    } catch (error) {
      batch.forEach(item => item.reject(error));
    } finally {
      this.processing = false;
    }
  }

  preprocessImage(imageData) {
    return tf.tidy(() => {
      // Convert ImageData to tensor
      let tensor = tf.browser.fromPixels(imageData);

      // Resize to model input size
      tensor = tf.image.resizeBilinear(tensor, [224, 224]);

      // Normalize [0, 255] -> [-1, 1]
      tensor = tensor.div(127.5).sub(1);

      return tensor;
    });
  }
}
```

### Memory Management: The Make-or-Break

**Memory leaks will kill your extension.** TensorFlow.js doesn't garbage collect tensors automatically.

```javascript
// ❌ BAD: Memory leak
async function badPredict(image) {
  const tensor = tf.browser.fromPixels(image);
  const resized = tf.image.resizeBilinear(tensor, [224, 224]);
  const normalized = resized.div(255);
  const prediction = model.predict(normalized);
  return prediction.data();
  // tensor, resized, normalized, prediction never disposed!
}

// ✅ GOOD: Proper disposal
async function goodPredict(image) {
  return tf.tidy(() => {
    // All intermediate tensors auto-disposed
    const tensor = tf.browser.fromPixels(image);
    const processed = tf.image.resizeBilinear(tensor, [224, 224])
      .div(255);
    return model.predict(processed);
  });
}

// Monitor memory usage
setInterval(() => {
  const info = tf.memory();
  console.log(`Tensors: ${info.numTensors}, MB: ${info.numBytes / 1024 / 1024}`);

  if (info.numTensors > 100) {
    console.warn('Possible memory leak!');
  }
}, 10000);
```

## Real-World Use Case: Content Classifier

Here's a complete example—a content safety classifier for images:

```javascript
// content-classifier.js
class ContentClassifier {
  constructor() {
    this.model = null;
    this.labels = ['safe', 'questionable', 'unsafe'];
    this.CONFIDENCE_THRESHOLD = 0.75;
  }

  async initialize() {
    const modelUrl = chrome.runtime.getURL('models/classifier/model.json');
    this.model = await tf.loadGraphModel(modelUrl);

    // Warmup
    const dummy = tf.zeros([1, 224, 224, 3]);
    await this.model.predict(dummy).data();
    dummy.dispose();

    console.log('Classifier ready');
  }

  async classifyImage(imageUrl) {
    // Load image
    const img = await this.loadImage(imageUrl);

    // Preprocess and predict
    const prediction = await tf.tidy(() => {
      const tensor = tf.browser.fromPixels(img)
        .resizeBilinear([224, 224])
        .div(255)
        .expandDims(0);

      return this.model.predict(tensor);
    });

    // Get results
    const scores = await prediction.data();
    prediction.dispose();

    const maxScore = Math.max(...scores);
    const labelIndex = scores.indexOf(maxScore);

    return {
      label: this.labels[labelIndex],
      confidence: maxScore,
      isConfident: maxScore >= this.CONFIDENCE_THRESHOLD,
      scores: {
        safe: scores[0],
        questionable: scores[1],
        unsafe: scores[2]
      }
    };
  }

  async loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  async classifyPage() {
    const images = document.querySelectorAll('img');
    const results = [];

    for (const img of images) {
      try {
        const result = await this.classifyImage(img.src);
        results.push({ element: img, ...result });

        // Blur unsafe content
        if (result.label === 'unsafe' && result.isConfident) {
          img.style.filter = 'blur(20px)';
          img.dataset.blurred = 'true';
        }
      } catch (error) {
        console.error('Classification failed:', error);
      }
    }

    return results;
  }
}

// Usage in content script
const classifier = new ContentClassifier();
await classifier.initialize();

// Classify on page load
const results = await classifier.classifyPage();
console.log(`Classified ${results.length} images`);

// Watch for new images
const observer = new MutationObserver(async (mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.tagName === 'IMG') {
        await classifier.classifyImage(node.src);
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
```

## Performance Optimization Tricks

### 1. Web Workers for Heavy Lifting

```javascript
// ml-worker.js
importScripts('tf.min.js');

let model = null;

self.addEventListener('message', async (e) => {
  const { type, data } = e.data;

  switch (type) {
    case 'load':
      model = await tf.loadGraphModel(data.modelUrl);
      self.postMessage({ type: 'loaded' });
      break;

    case 'predict':
      const tensor = tf.tensor(data.tensor, data.shape);
      const prediction = await model.predict(tensor);
      const result = await prediction.data();

      tensor.dispose();
      prediction.dispose();

      self.postMessage({ type: 'result', data: Array.from(result) });
      break;
  }
});
```

### 2. Model Sharding for Large Models

```javascript
// Split large model into chunks
async function loadShardedModel() {
  const baseUrl = chrome.runtime.getURL('models/');

  // Load metadata
  const metadata = await fetch(baseUrl + 'model.json').then(r => r.json());

  // Load weight shards in parallel
  const shards = await Promise.all(
    metadata.weightsManifest[0].paths.map(path =>
      fetch(baseUrl + path).then(r => r.arrayBuffer())
    )
  );

  // Combine and load
  const model = await tf.loadGraphModel(tf.io.fromMemory(metadata, shards));
  return model;
}
```

### 3. Progressive Loading UI

```javascript
// Show loading progress
async function loadWithProgress(onProgress) {
  const model = await tf.loadGraphModel(
    chrome.runtime.getURL('models/model.json'),
    {
      onProgress: (fraction) => {
        onProgress(Math.round(fraction * 100));
      }
    }
  );
  return model;
}

// In popup/UI
loadWithProgress((percent) => {
  document.getElementById('progress').style.width = percent + '%';
  document.getElementById('status').textContent = `Loading model... ${percent}%`;
});
```

## Debugging & Monitoring

### Performance Profiling

```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
  }

  async measure(name, fn) {
    const start = performance.now();
    const memBefore = tf.memory();

    try {
      const result = await fn();
      const duration = performance.now() - start;
      const memAfter = tf.memory();

      this.metrics.push({
        name,
        duration,
        tensorsBefore: memBefore.numTensors,
        tensorsAfter: memAfter.numTensors,
        tensorsLeaked: memAfter.numTensors - memBefore.numTensors,
        memoryUsed: (memAfter.numBytes - memBefore.numBytes) / 1024 / 1024
      });

      console.log(`${name}: ${duration.toFixed(2)}ms`);
      return result;
    } catch (error) {
      console.error(`${name} failed:`, error);
      throw error;
    }
  }

  getReport() {
    return {
      totalInferences: this.metrics.length,
      avgDuration: this.metrics.reduce((sum, m) => sum + m.duration, 0) / this.metrics.length,
      totalLeaked: this.metrics.reduce((sum, m) => sum + m.tensorsLeaked, 0),
      metrics: this.metrics
    };
  }
}

const monitor = new PerformanceMonitor();
const result = await monitor.measure('inference', () => model.predict(tensor));
```

## Lessons Learned

### 1. Quantization Is Non-Negotiable

Going from FP32 to INT8 reduced my model from 14MB to 3.5MB with only 3% accuracy loss. The speed improvement was 2-3x.

### 2. Batch When Possible

Processing 10 images sequentially: ~500ms
Processing 10 images in one batch: ~180ms

The overhead of calling the model is significant.

### 3. Don't Fight the Browser

I tried Web Workers, OffscreenCanvas, SharedArrayBuffer—most added complexity without gains. The main thread with proper batching and memory management worked best.

### 4. Users Don't Care About Your Model

They care about:
- Does it work?
- Is it fast?
- Does it drain my battery?

Ship the smallest model that meets the accuracy bar.

## What's Next?

The future of on-device ML in browsers is exciting:

- **WebGPU:** True GPU acceleration coming to browsers
- **WebNN:** Native neural network API
- **Smaller models:** Distillation techniques improving
- **Better tooling:** TensorFlow.js and ONNX.js maturing

## Resources

- **TensorFlow.js Documentation:** Essential reading
- **MediaPipe:** Pre-trained models ready to use
- **Model Zoo:** Collection of optimized models
- **Chrome DevTools:** Memory profiler is your friend

## Conclusion

Running ML in Chrome extensions is possible, practical, and powerful—if you respect the constraints. Privacy, speed, and offline capability make it worth the complexity.

Start small. Profile religiously. Optimize ruthlessly. Ship confidently.

---

*Questions? Code examples? Find me on [Twitter](https://x.com/AdityaPat_) or check out my [GitHub](https://github.com/AdityaP700).*
