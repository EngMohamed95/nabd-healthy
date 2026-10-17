import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

// Minimal "spider web" network: a few slowly drifting nodes linked by faint lines when close together
const LINK_DISTANCE = 110;
const NODE_DENSITY = 1 / 26000; // nodes per px²
const MAX_NODES = 50;
const SPEED = 0.15; // px per frame

type Node = { x: number; y: number; vx: number; vy: number };

export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let visible = true;

    const seed = () => {
      const count = Math.min(MAX_NODES, Math.round(width * height * NODE_DENSITY));
      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * SPEED,
          vy: Math.sin(angle) * SPEED,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(200, 216, 246, ${(1 - dist / LINK_DISTANCE) * 0.14})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = 'rgba(214, 228, 252, 0.4)';
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) {
          n.vx *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
        }
        if (n.y < 0 || n.y > height) {
          n.vy *= -1;
          n.y = Math.max(0, Math.min(height, n.y));
        }
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (!reduceMotion && visible) frame = requestAnimationFrame(step);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pause the loop while the hero is scrolled out of view
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    intersectionObserver.observe(canvas);

    resize();
    start();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
