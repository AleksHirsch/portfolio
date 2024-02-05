"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  transform,
  animate,
} from "framer-motion";

type TransformTemplateArgs = {
  rotate: string;
  scaleX: string;
  scaleY: string;
  x: string;
  y: string;
};

const transformTemplate = ({
  rotate,
  scaleX,
  scaleY,
  x,
  y,
}: TransformTemplateArgs) => {
  return `translateX(${x}) translateY(${y}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
};

const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

export const Cursor = () => {
  const [hasMoved, setHasMoved] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);
  const cursor = useRef(null);
  const cursorSize = useMemo(
    () =>
      hoveredEl
        ? { width: hoveredEl.offsetWidth, height: hoveredEl.offsetHeight }
        : { width: 32, height: 32 },
    [hoveredEl],
  );

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const rotate = useCallback((distance: { x: number; y: number }) => {
    const angle = Math.atan2(distance.y, distance.x);
    animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 });
  }, []);

  const manageMouseMove = useCallback(
    (e: MouseEvent) => {
      // do not run on mobile, check if touch device
      if (window.matchMedia("(pointer: coarse)").matches) return;

      if (!hasMoved) setHasMoved(true);

      const { clientX, clientY } = e;

      //center position of the stickyElement

      if (hoveredEl) {
        const { left, top, height, width } = hoveredEl.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        const distance = { x: clientX - center.x, y: clientY - center.y };

        if (hoveredEl.dataset.cursorHover === "rotate") {
          rotate(distance);
        }

        const absDistance = Math.max(
          Math.abs(distance.x),
          Math.abs(distance.y),
        );
        const newScaleX = transform(absDistance, [0, height / 2], [1, 1.2]);
        const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8]);
        scale.x.set(newScaleX);
        scale.y.set(newScaleY);

        //move mouse to center of stickyElement + slightly move it towards the mouse pointer
        mouse.x.set(center.x - cursorSize.width / 2 + distance.x * 0.1);
        mouse.y.set(center.y - cursorSize.height / 2 + distance.y * 0.1);
      } else {
        //move custom cursor to center of stickyElement
        mouse.x.set(clientX - cursorSize.width / 2);
        mouse.y.set(clientY - cursorSize.height / 2);
        animate(cursor.current, { rotate: "0rad" }, { duration: 0 });
      }
    },
    [cursorSize, hoveredEl],
  );

  const handleMouseOver = useCallback((e: Event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = e.currentTarget as HTMLElement;
    setHoveredEl(el);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setHoveredEl(null);
    animate(
      cursor.current,
      { scaleX: 1, scaleY: 1 },
      { duration: 0.2, type: "spring" },
    );
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);

    const allElements = document.querySelectorAll("[data-cursor-hover]");

    allElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);

      allElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [handleMouseLeave, handleMouseOver, manageMouseMove]);

  return (
    <motion.div
      transformTemplate={transformTemplate}
      style={{
        x: smoothMouse.x,
        y: smoothMouse.y,
        scaleX: scale.x,
        scaleY: scale.y,
      }}
      initial={{ opacity: 0 }}
      animate={{
        width: cursorSize.width,
        height: cursorSize.height,
        opacity: hasMoved ? 1 : 0,
      }}
      className="pointer-events-none fixed z-50 h-8 w-8 rounded-full bg-yellow-100 mix-blend-difference transition-opacity will-change-transform touchscreen:hidden"
      ref={cursor}
    />
  );
};
