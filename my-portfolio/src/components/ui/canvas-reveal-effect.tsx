"use client";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  /**
   * 0.1 - slower
   * 1.0 - faster
   */
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          shader={`
              float animation_speed_factor = ${animationSpeed.toFixed(1)};
              float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
              opacity *= step(intro_offset, u_time * animation_speed_factor);
              opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            `}
          center={["x", "y"]}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
  center = ["x", "y"],
}) => {
  const uniforms = React.useMemo<UniformsMap>(() => {
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
    ];
    if (colors.length === 2) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1],
      ];
    } else if (colors.length === 3) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ];
    }

    // Map into tuple types: [number,number,number][]
    const colorTuples = colorsArray.map(
      (color) =>
        [color[0] / 255, color[1] / 255, color[2] / 255] as [
          number,
          number,
          number
        ]
    );

    return {
      u_colors: { type: "uniform3fv", value: colorTuples },
      u_opacities: { type: "uniform1fv", value: opacities },
      u_total_size: { type: "uniform1f", value: totalSize },
      u_dot_size: { type: "uniform1f", value: dotSize },
    };
  }, [colors, opacities, totalSize, dotSize]);
  return (
    <Shader
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;
        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
        void main() {
            vec2 st = fragCoord.xy;
            ${
              center.includes("x")
                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            ${
              center.includes("y")
                ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
      float opacity = step(0.0, st.x);
      opacity *= step(0.0, st.y);

      vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

      float frequency = 5.0;
      float show_offset = random(st2);
      float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
      opacity *= u_opacities[int(rand * 10.0)];
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

      vec3 color = u_colors[int(show_offset * 6.0)];

      ${shader}

      fragColor = vec4(color, opacity);
      fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
      maxFps={60}
    />
  );
};

type UniformDef =
  | { type: "uniform1f"; value: number }
  | { type: "uniform1fv"; value: number[] }
  | { type: "uniform2f"; value: [number, number] }
  | { type: "uniform3f"; value: [number, number, number] }
  | { type: "uniform3fv"; value: [number, number, number][] };

type UniformsMap = Record<string, UniformDef>;
/** Prepared uniforms that will be fed into THREE.ShaderMaterial */
const ShaderMaterial = ({
  source,
  uniforms,
  maxFps = 60,
}: {
  source: string;
  hovered?: boolean;
  maxFps?: number;
  uniforms: UniformsMap;
}) => {
  const { size } = useThree();
  const ref = useRef<THREE.Mesh | null>(null);
  let lastFrameTime = 0;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();
    if (timestamp - lastFrameTime < 1 / (maxFps ?? 60)) return;
    lastFrameTime = timestamp;

    const material = ref.current.material as THREE.ShaderMaterial | undefined;
    if (!material || !material.uniforms) return;

    const matUniforms = material.uniforms as Record<
      string,
      { value: number | THREE.Vector2 | THREE.Vector3 | unknown }
    >;

    if ("u_time" in matUniforms) {
      const uTime = matUniforms.u_time;
      if (typeof uTime.value === "number") {
        uTime.value = timestamp;
      }
    }
  });

  // Convert our app UniformsMap -> THREE's runtime uniform shape
  const getUniformsAsThree = (): Record<string, THREE.IUniform> => {
    const prepared: Record<string, THREE.IUniform> = {};

    for (const name of Object.keys(uniforms)) {
      const u = uniforms[name];
      switch (u.type) {
        case "uniform1f":
          prepared[name] = { value: u.value as number };
          break;
        case "uniform1fv":
          prepared[name] = { value: (u.value as number[]).slice() };
          break;
        case "uniform2f": {
          const v = u.value as [number, number];
          prepared[name] = { value: new THREE.Vector2(v[0], v[1]) };
          break;
        }
        case "uniform3f": {
          const v = u.value as [number, number, number];
          prepared[name] = { value: new THREE.Vector3(v[0], v[1], v[2]) };
          break;
        }
        case "uniform3fv": {
          const arr = u.value as [number, number, number][];
          prepared[name] = {
            value: arr.map((v) => new THREE.Vector3(v[0], v[1], v[2])),
          };
          break;
        }
        default:
          const _exhaustiveCheck: never = u;
          // Use it so it is "read" (e.g. pass to console.log or void it)
          void _exhaustiveCheck;
          break;
      }
    }

    // runtime uniforms
    prepared["u_time"] = { value: 0 };
    prepared["u_resolution"] = {
      value: new THREE.Vector2(size.width * 2, size.height * 2),
    };

    return prepared;
  };

  // Create the ShaderMaterial using the properly-typed three uniform object
  const material = useMemo(() => {
    const materialObject = new THREE.ShaderMaterial({
      vertexShader: `
        precision mediump float;
        in vec2 coordinates;
        uniform vec2 u_resolution;
        out vec2 fragCoord;
        void main(){
          float x = position.x;
          float y = position.y;
          gl_Position = vec4(x, y, 0.0, 1.0);
          fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
          fragCoord.y = u_resolution.y - fragCoord.y;
        }
      `,
      fragmentShader: source,
      uniforms: getUniformsAsThree(), // <-- call the correct function
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });

    return materialObject;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    size.width,
    size.height,
    source /* note: uniforms are read in getUniformsAsThree which uses the 'uniforms' variable */,
  ]);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};
interface ShaderProps {
  source: string;
  uniforms: UniformsMap;
  maxFps?: number;
}

const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
  return (
    <Canvas className="absolute inset-0  h-full w-full">
      <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
    </Canvas>
  );
};
