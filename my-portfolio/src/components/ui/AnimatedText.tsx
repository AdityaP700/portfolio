"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AnimatedName() {
  const originalText = "Aditya";
  const altTexts = ["noob coder", "ngmi dev", "mad coder", "vibecoder"];

  // timings (ms)
const TYPING_SPEED = 100; // slower, more deliberate keystrokes
const DELETING_SPEED = 60; // still quick, but not instant
const HOLD_AFTER_TYPE = 2000; // hold the alt text for 2 seconds
const MIN_PAUSE = 6000;
const MAX_PAUSE = 9000;

  const [displayedText, setDisplayedText] = useState<string>(originalText);
  const altIndexRef = useRef<number>(0);
  const timersRef = useRef<number[]>([]);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
  // start first alt right away
  scheduleNextAlt(0);

  return () => {
    isMountedRef.current = false;
    clearAllTimers();
  };
}, []);


  function clearAllTimers() {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }

  function randomPause() {
    return Math.floor(Math.random() * (MAX_PAUSE - MIN_PAUSE + 1)) + MIN_PAUSE;
  }

  function scheduleNextAlt(delay = 0) {
    const t = window.setTimeout(() => {
      if (!isMountedRef.current) return;
      const word = altTexts[altIndexRef.current % altTexts.length];
      typeWord(word, 1); // start typing from 1 to show progressive typing
    }, delay);
    timersRef.current.push(t);
  }

  function typeWord(word: string, pos: number) {
    if (!isMountedRef.current) return;
    if (pos <= word.length) {
      setDisplayedText(word.slice(0, pos));
      const t = window.setTimeout(() => typeWord(word, pos + 1), TYPING_SPEED);
      timersRef.current.push(t);
    } else {
      // finished typing, hold then delete
      const t = window.setTimeout(() => deleteWord(word.length), HOLD_AFTER_TYPE);
      timersRef.current.push(t);
    }
  }

  function deleteWord(remaining: number) {
    if (!isMountedRef.current) return;
    if (remaining > 0) {
      setDisplayedText((prev) => prev.slice(0, -1));
      const t = window.setTimeout(() => deleteWord(remaining - 1), DELETING_SPEED);
      timersRef.current.push(t);
    } else {
      // after deleting the alt word completely, show original and schedule next alt
      setDisplayedText(originalText);
      altIndexRef.current += 1;
      scheduleNextAlt(randomPause());
    }
  }

  return (
    <div className="inline-block select-none" aria-label="Animated name">
      <span className="font-bold text-lg" style={{ whiteSpace: "nowrap" }}>
        {displayedText}
        <span
          style={{
            display: "inline-block",
            width: 10,
            marginLeft: 6,
            animation: "blink 1s step-end infinite",
          }}
        >
          |
        </span>
      </span>

      {/* CSS for blinking caret */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
