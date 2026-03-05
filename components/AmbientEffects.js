'use client';

import { useEffect, useRef } from 'react';

export default function AmbientEffects() {
  const flare1Ref = useRef(null);
  const flare2Ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      if (flare1Ref.current) {
        flare1Ref.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
      if (flare2Ref.current) {
        flare2Ref.current.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
      }
    };

    // Only enable mouse tracking on non-touch devices
    const isTouchDevice = 'ontouchstart' in window;
    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="sunlight-overlay" />
      <div className="prism-flare flare-1" ref={flare1Ref} />
      <div className="prism-flare flare-2" ref={flare2Ref} />
    </>
  );
}
