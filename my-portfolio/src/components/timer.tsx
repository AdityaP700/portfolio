"use client"
import React, { useEffect, useState } from 'react';

function PixelatedClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      };
      setTime(now.toLocaleTimeString([], options).replace(/:([^:]*)$/, '<span class="opacity-50">:$1</span>'));
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="font-mono text-[0.65rem] tracking-[0.15em] font-medium text-foreground/80 tabular-nums select-none leading-none"
      dangerouslySetInnerHTML={{ __html: time }}
    />
  );
}
export default PixelatedClock;