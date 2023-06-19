import React, { useState, useEffect } from 'react';

const LongPressButton = ({ onPress, onLongPress, onRelease, delay = 500, children }) => {
  const [longPressTimer, setLongPressTimer] = useState(null);

  useEffect(() => {
    return () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
    };
  }, [longPressTimer]);

  const handlePressStart = () => {
    const timer = setTimeout(() => {
      onLongPress();
      setLongPressTimer(null);
    }, delay);

    setLongPressTimer(timer);
  };

  const handlePressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
      onPress();
    } else {
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault(); // Evita que aparezca el menú contextual
  };

  return (
    <button
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onContextMenu={handleContextMenu} // Agrega el controlador de contextmenu
      style={{
        backgroundColor: 'white',
        border: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {children}
    </button>
  );
};

export default LongPressButton;
