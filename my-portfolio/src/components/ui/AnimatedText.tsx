"use client";

import React, { useEffect, useRef, useState } from "react";
import { Special_Elite } from "next/font/google";

const typewriterFont = Special_Elite({
  subsets: ["latin"],
  weight: "400",
});

export default function AnimatedName() {
  const originalText = "Aditya";
  const altTexts = ["noob coder", "ngmi dev", "mad coder", "vibecoder"];

  // total time per phase (ms)
  const TOTAL_TYPING_TIME = 1000; // total time to fully type a word
  const TOTAL_DELETING_TIME = 800; // total time to fully delete a word
  const HOLD_AFTER_TYPE = 1500; // pause after typing
  const MIN_PAUSE = 1000; // pause before next alt text

  const [displayedText, setDisplayedText] = useState<string>(originalText);
  const altIndexRef = useRef<number>(0);
  const timersRef = useRef<number[]>([]);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    scheduleNextAlt(MIN_PAUSE);
    return () => {
      isMountedRef.current = false;
      clearAllTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearAllTimers() {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }

  function scheduleNextAlt(delay = 0) {
    const t = window.setTimeout(() => {
      if (!isMountedRef.current) return;
      const word = altTexts[altIndexRef.current % altTexts.length];
      typeWord(word, 1);
    }, delay);
    timersRef.current.push(t);
  }

  function typeWord(word: string, pos: number) {
    if (!isMountedRef.current) return;

    const typingSpeed = Math.max(TOTAL_TYPING_TIME / word.length, 20); // per char

    if (pos <= word.length) {
      setDisplayedText(word.slice(0, pos));
      const t = window.setTimeout(() => typeWord(word, pos + 1), typingSpeed);
      timersRef.current.push(t);
    } else {
      const t = window.setTimeout(
        () => deleteWord(word.length, word.length),
        HOLD_AFTER_TYPE
      );
      timersRef.current.push(t);
    }
  }

  function deleteWord(remaining: number, wordLength: number) {
    if (!isMountedRef.current) return;

    const deletingSpeed = Math.max(TOTAL_DELETING_TIME / wordLength, 20); // per char

    if (remaining > 0) {
      setDisplayedText((prev) => prev.slice(0, -1));
      const t = window.setTimeout(
        () => deleteWord(remaining - 1, wordLength),
        deletingSpeed
      );
      timersRef.current.push(t);
    } else {
      setDisplayedText(originalText);
      altIndexRef.current += 1;
      scheduleNextAlt(MIN_PAUSE);
    }
  }

  return (
    <div
      className={`inline-block select-none ${typewriterFont.className}`}
      aria-label="Animated name"
    >
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
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
