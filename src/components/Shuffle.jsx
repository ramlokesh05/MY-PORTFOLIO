import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Shuffle.css';

/**
 * Shuffle — character-shuffle text reveal animation.
 * Uses only open-source gsap (no SplitText / ScrollTrigger club plugins needed).
 * Triggers via IntersectionObserver and optionally re-plays on hover.
 */
const Shuffle = ({
  text = '',
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  ease = 'power3.out',
  stagger = 0.03,
  threshold = 0.1,
  animationMode = 'evenodd',
  shuffleTimes = 1,
  loop = false,
  loopDelay = 0,
  triggerOnce = true,
  triggerOnHover = true,
  respectReducedMotion = true,
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
}) => {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const playingRef = useRef(false);
  const hasPlayedRef = useRef(false);
  const tlRef = useRef(null);

  const getRandomChar = () => {
    const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const play = () => {
    const el = containerRef.current;
    if (!el) return;

    if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }

    // ── Step 1: render plain text to measure single char widths ──────────
    el.innerHTML = '';
    const chars = text.split('');

    // Create a hidden measurement pass using a temp span
    const measureSpan = document.createElement('span');
    measureSpan.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;';
    measureSpan.className = className; // inherit same font classes
    el.appendChild(measureSpan);

    // Measure each character individually
    const charWidths = [];
    const charHeights = [];
    chars.forEach(ch => {
      measureSpan.textContent = ch === ' ' ? '\u00A0' : ch;
      const rect = measureSpan.getBoundingClientRect();
      charWidths.push(rect.width || 12);
      charHeights.push(rect.height || 20);
    });
    el.removeChild(measureSpan);

    // ── Step 2: build DOM with measured widths ────────────────────────────
    el.innerHTML = '';
    const rolls = Math.max(1, shuffleTimes);
    const strips = [];

    chars.forEach((ch, idx) => {
      const charW = charWidths[idx];
      const charH = charHeights[idx];

      if (ch === ' ') {
        const sp = document.createElement('span');
        sp.style.cssText = `display:inline-block;width:${charW}px;`;
        el.appendChild(sp);
        return;
      }

      // Outer clip wrapper — exactly one character wide
      const wrap = document.createElement('span');
      wrap.style.cssText = `display:inline-block;overflow:hidden;width:${charW}px;height:${charH}px;vertical-align:bottom;`;

      // Inner sliding strip
      const inner = document.createElement('span');
      inner.style.cssText = `display:inline-block;white-space:nowrap;will-change:transform;`;

      // Build roll sequence
      const allChars = [];
      if (shuffleDirection === 'right') {
        // Strip: [real, ...randoms, real] — start showing last (real), slide to first (real)
        allChars.push(ch);
        for (let i = 0; i < rolls; i++) allChars.push(getRandomChar());
        allChars.push(ch);
      } else {
        // Strip: [...randoms, real] — start showing last (real), slide left to reveal
        for (let i = 0; i < rolls; i++) allChars.push(getRandomChar());
        allChars.push(ch);
      }

      allChars.forEach(c => {
        const span = document.createElement('span');
        span.style.cssText = `display:inline-block;width:${charW}px;text-align:center;`;
        span.textContent = c;
        inner.appendChild(span);
      });

      wrap.appendChild(inner);
      el.appendChild(wrap);

      const totalChars = allChars.length;
      const startX = shuffleDirection === 'right' ? -(totalChars - 1) * charW : 0;
      const endX   = shuffleDirection === 'right' ? 0 : -(totalChars - 1) * charW;

      // Position off-screen BEFORE making visible
      gsap.set(inner, { x: startX, force3D: true });
      strips.push({ el: inner, to: endX });
    });

    // ── Step 3: make visible now that strips are positioned ───────────────
    playingRef.current = true;
    setIsReady(true);

    // ── Step 4: animate ───────────────────────────────────────────────────
    const tl = gsap.timeline({
      repeat: loop ? -1 : 0,
      repeatDelay: loopDelay,
      onComplete: () => {
        playingRef.current = false;
        onShuffleComplete?.();
      },
    });

    if (animationMode === 'evenodd') {
      const odd  = strips.filter((_, i) => i % 2 === 1);
      const even = strips.filter((_, i) => i % 2 === 0);
      const oddDur = odd.length ? duration + (odd.length - 1) * stagger : 0;

      const animateGroup = (group, at) => {
        group.forEach((s, i) => {
          tl.to(s.el, { x: s.to, duration, ease, force3D: true }, at + i * stagger);
        });
      };
      animateGroup(odd, 0);
      animateGroup(even, oddDur * 0.65);
    } else {
      strips.forEach((s, i) => {
        tl.to(s.el, { x: s.to, duration, ease, force3D: true }, i * stagger);
      });
    }

    tlRef.current = tl;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !text) return;

    // Show plain text immediately if reduced motion preferred
    if (respectReducedMotion && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      setIsReady(true);
      return;
    }

    const trigger = () => {
      if (triggerOnce && hasPlayedRef.current) return;
      hasPlayedRef.current = true;
      play();
    };

    // Show static text until animation triggers (so it's never invisible)
    el.textContent = text;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          if (triggerOnce) observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);

    // Hover re-trigger
    let hoverHandler = null;
    if (triggerOnHover) {
      hoverHandler = () => {
        if (playingRef.current) return;
        play();
      };
      el.addEventListener('mouseenter', hoverHandler);
    }

    return () => {
      observer.disconnect();
      if (hoverHandler) el.removeEventListener('mouseenter', hoverHandler);
      tlRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const Tag = tag || 'p';
  return React.createElement(Tag, {
    ref: containerRef,
    className: `${className}`,
    style: { textAlign, ...style },
  });
};

export default Shuffle;
