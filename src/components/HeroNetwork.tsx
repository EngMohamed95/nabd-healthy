import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

// Subtle "spider web" network: slowly drifting nodes linked by faint lines when close together
const LINK_DISTANCE = 150;
const NODE_DENSITY = 1 / 6500; // nodes per px²
const MAX_NODES = 200;
const SPEED = 0.18; // px per frame
const MOUSE_RADIUS = 240; // nodes inside this radius are pulled toward the cursor
const MOUSE_PULL = 0.07;
const MOUSE_CORE = 55; // inside this radius nodes are pushed back out so they don't collapse to a point
const MAX_SPEED = 2.2;

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
    let mouse: { x: number; y: number } | null = null;

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
            ctx.strokeStyle = `rgba(200, 216, 246, ${(1 - dist / LINK_DISTANCE) * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (mouse) {
        for (const n of nodes) {
          const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (dist < MOUSE_RADIUS) {
            ctx.strokeStyle = `rgba(214, 228, 252, ${(1 - dist / MOUSE_RADIUS) * 0.45})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = 'rgba(214, 228, 252, 0.55)';
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        if (mouse) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < MOUSE_RADIUS) {
            const force = dist > MOUSE_CORE ? MOUSE_PULL * (1 - dist / MOUSE_RADIUS) : -MOUSE_PULL;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }

        // Ease back toward the resting drift speed once the cursor lets go
        const speed = Math.hypot(n.vx, n.vy) || 1;
        const target = Math.min(MAX_SPEED, speed > SPEED ? speed * 0.97 : SPEED);
        n.vx = (n.vx / speed) * target;
        n.vy = (n.vy / speed) * target;

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

    // The canvas ignores pointer events so the hero stays clickable; track the cursor on the window instead
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
    };
    const clearMouse = () => {
      mouse = null;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', clearMouse);

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
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', clearMouse);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
