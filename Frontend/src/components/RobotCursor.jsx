import React, { useState, useEffect } from 'react';

const RobotCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show the robot cursor when the mouse is inside the chat window
    const handleMouseMove = (e) => {
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow) {
        const rect = chatWindow.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          setVisible(true);
          setPosition({ x: e.clientX, y: e.clientY });
        } else {
          setVisible(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="robot-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease-out',
      }}
    >
      <img 
        src="/robot.svg" 
        alt="Robot cursor" 
        style={{ 
          width: '40px', 
          height: '40px',
          animation: 'robotFloat 2s ease-in-out infinite'
        }} 
      />
    </div>
  );
};

export default RobotCursor;