import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (currentIndex < text.length) {
      timer = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, speed, text]);

  return <span>{currentText}</span>;
};

export default TypingEffect;
