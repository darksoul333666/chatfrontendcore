import React, { useState, useEffect } from "react";

const TypingText = () => {
  const [text, setText] = useState("");
  const message = "Escribe tu mensaje aquí...";
  const typingSpeed = 100; // Velocidad de escritura (en milisegundos)
  const erasingSpeed = 50; // Velocidad de borrado (en milisegundos)

  useEffect(() => {
    let timerId;
    let charIndex = 0;
    let isErasing = false;

    const startTyping = () => {
      if (charIndex < message.length) {
        setText((prevText) => prevText + message.charAt(charIndex));
        charIndex++;
        timerId = setTimeout(startTyping, typingSpeed);
      } else {
        isErasing = true;
        timerId = setTimeout(startErasing, typingSpeed);
      }
    };

    const startErasing = () => {
      if (charIndex > 0) {
        setText((prevText) => prevText.slice(0, -1));
        charIndex--;
        timerId = setTimeout(startErasing, erasingSpeed);
      } else {
        isErasing = false;
        timerId = setTimeout(startTyping, typingSpeed);
      }
    };

    timerId = setTimeout(startTyping, typingSpeed);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default TypingText;
