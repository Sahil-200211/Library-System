import React, { useEffect, useState } from 'react';
import './MouseTrail.css';

const MouseTrail: React.FC = () => {
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([]);
  const dotIdRef = React.useRef(0);

  const emojis = ['✨', '💫', '🌟'];
  const sparkle = emojis[Math.floor(Math.random() * emojis.length)];


  // Handle mouse move and create new dots
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newDot = { x: e.clientX, y: e.clientY, id: dotIdRef.current };
      setDots((prevDots) => [...prevDots, newDot]);

      dotIdRef.current += 1;

      // Clean up dots after 1 second
      setTimeout(() => {
        setDots((prevDots) => prevDots.filter(dot => dot.id !== newDot.id));
      }, 1000); // Remove dot after 1 second
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="mouse-trail">
      {dots.map((dot) => (
        <span
        key={dot.id}
        className="mouse-trail-sparkle"
        style={{
          left: dot.x + 'px',
          top: dot.y + 'px',
        }}
      >
        {sparkle}
      </span>           
      ))}
    </div>
  );
};

export default MouseTrail;
