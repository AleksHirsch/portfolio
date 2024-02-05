"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
};

export const Magnetic = ({ children }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const position = {
    x: useSpring(0, { stiffness: 300, damping: 20 }),
    y: useSpring(0, { stiffness: 300, damping: 20 }),
  };

  const handleMouse = (e: React.MouseEvent) => {
    if (ref.current === null) return;

    // do not run on mobile
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    position.x.set(middleX);
    position.y.set(middleY);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ x, y }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
};
