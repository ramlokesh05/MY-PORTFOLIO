import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className = '', blur = true }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.reveal-word');
    
    gsap.fromTo(words, 
      { opacity: 0.2, ...(blur ? { filter: 'blur(4px)' } : {}), y: 10 }, 
      {
        opacity: 1,
        ...(blur ? { filter: 'blur(0px)' } : {}),
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        }
      }
    );
  }, [blur]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
