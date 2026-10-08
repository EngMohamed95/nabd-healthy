import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type UseScrollOptions } from 'motion/react';

type ScrollOffset = NonNullable<UseScrollOptions['offset']>;

interface ScrollRevealProps {
  children: ReactNode;
  /** Scroll range over which the section enters from the bottom of the viewport. */
  enterOffset?: ScrollOffset;
  /** Whether the section animates in; disable for sections already in view below the hero. */
  enter?: boolean;
  /** Whether the section also animates out as it leaves through the top of the viewport. */
  exit?: boolean;
}

/**
 * Scroll-linked section wrapper: the animation is driven directly by scroll position,
 * so it plays forward while scrolling down and reverses while scrolling up.
 */
export default function ScrollReveal({
  children,
  enterOffset = ['start end', 'start 0.6'],
  enter: animateEnter = true,
  exit = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: enterProgress } = useScroll({ target: ref, offset: enterOffset });
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ['end 0.4', 'end start'] });

  const opacity = useTransform([enterProgress, leave], ([p, b]: number[]) => Math.min(animateEnter ? p : 1, exit ? 1 - b : 1));
  const y = useTransform([enterProgress, leave], ([p, b]: number[]) => (animateEnter ? 1 - p : 0) * 80 - (exit ? b * 80 : 0));
  const scale = useTransform([enterProgress, leave], ([p, b]: number[]) => 1 - (animateEnter ? 1 - p : 0) * 0.06 - (exit ? b * 0.06 : 0));

  return (
    <motion.div ref={ref} style={reduceMotion ? undefined : { opacity, y, scale }} className="w-full">
      {children}
    </motion.div>
  );
}
