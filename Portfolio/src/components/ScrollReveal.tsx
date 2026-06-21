import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

import './ScrollReveal.css';

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  baseOpacity: number;
  enableBlur: boolean;
  blurStrength: number;
}

const Word = ({ children, progress, range, enableBlur, blurStrength }: WordProps) => {
  const blur = useTransform(progress, range, [enableBlur ? blurStrength : 0, 0]);
  const filter = useTransform(blur, (v) => v > 0 ? `blur(${v}px)` : 'none');

  return (
    <motion.span style={{ filter }} className="word">
      {children}
    </motion.span>
  );
};

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = false,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
}: any) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start end", "end center"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [baseRotation, 0]);

  const words = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/);
  }, [children]);

  const nonWhitespaceWordsCount = useMemo(() => {
    return words.filter(word => !word.match(/^\s+$/)).length;
  }, [words]);

  const splitText = useMemo(() => {
    let wordIndex = 0;
    return words.map((word, index) => {
      if (word.match(/^\s+$/)) return word;

      const i = wordIndex;
      wordIndex++;

      // Calculate range for this word with slight overlap
      const step = 1 / Math.max(1, nonWhitespaceWordsCount);
      const start = i * step * 0.9;
      const end = Math.min(1, start + step * 1.5);

      return (
        <Word
          key={index}
          progress={scrollYProgress}
          range={[start, end]}
          baseOpacity={baseOpacity}
          enableBlur={enableBlur}
          blurStrength={blurStrength}
        >
          {word}
        </Word>
      );
    });
  }, [words, nonWhitespaceWordsCount, scrollYProgress, baseOpacity, enableBlur, blurStrength]);

  return (
    <motion.h2 
      ref={containerRef} 
      style={{ rotate, transformOrigin: '0% 50%' }}
      className={`scroll-reveal ${containerClassName}`}
    >
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </motion.h2>
  );
};

export default ScrollReveal;
