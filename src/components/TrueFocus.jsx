import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './TrueFocus.css';

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  loop = true,
  className = ''
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  // Ref to the auto-cycle interval so we can cancel it on manual click
  const intervalRef = useRef(null);
  const [userTook, setUserTook] = useState(false); // true once user clicks

  useEffect(() => {
    if (manualMode) return;

    let count = 0;
    const interval = setInterval(() => {
      // If user has taken manual control, stop auto-cycle
      if (userTook) { clearInterval(interval); return; }

      count++;
      setCurrentIndex(prev => {
        const next = (prev + 1) % words.length;
        if (!loop && count >= words.length) {
          clearInterval(interval);
          return prev;
        }
        return next;
      });
      if (!loop && count >= words.length - 1) {
        clearInterval(interval);
      }
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length, loop, userTook]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length]);

  // Click / tap — move focus to tapped word, stop auto-cycle
  const handleClick = (index) => {
    setUserTook(true);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    // Toggle: if already focused on this word, move to the other
    if (index === currentIndex && words.length === 2) {
      setCurrentIndex(index === 0 ? 1 : 0);
    } else {
      setCurrentIndex(index);
    }
  };

  const handleMouseEnter = index => {
    if (manualMode) { setLastActiveIndex(index); setCurrentIndex(index); }
  };

  const handleMouseLeave = () => {
    if (manualMode) setCurrentIndex(lastActiveIndex);
  };

  return (
    <div className={`focus-container ${className}`} ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => (wordRefs.current[index] = el)}
            className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              '--border-color': borderColor,
              '--glow-color': glowColor,
              transition: `filter ${animationDuration}s ease`,
              cursor: 'pointer'
            }}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{ duration: animationDuration }}
        style={{
          '--border-color': borderColor,
          '--glow-color': glowColor
        }}
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.div>
    </div>
  );
};

export default TrueFocus;
