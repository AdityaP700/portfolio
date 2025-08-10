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
        timeZoneName: 'short',
      };
      const timeString = now.toLocaleTimeString([], options);
      setTime(timeString);
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

return <div className="pixelated-font text-sm mt-2">{time}</div>;
}

export default PixelatedClock;
