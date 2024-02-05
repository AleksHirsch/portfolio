"use client";
import { Variants, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

const titleVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
} as const satisfies Variants;

const nameVariants: Variants = {
  ...titleVariants,
  visible: {
    ...titleVariants.visible,
    transition: {
      ...titleVariants.visible.transition,
      delay: 0.3,
    },
  },
};

const positionVariants: Variants = {
  ...titleVariants,
  visible: {
    ...titleVariants.visible,
    transition: {
      ...titleVariants.visible.transition,
      delayChildren: 0.3,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const positionLetterVariants: Variants = {
  ...letterVariants,
  hidden: {
    ...letterVariants.hidden,
    color: "rgb(255, 255, 255)",
  },
  visible: {
    ...letterVariants.visible,
    color: "rgb(254, 240, 138)",
  },
};

const name = "Aleks Hirsch";
const jobPosition = "Frontend Developer";

export default function Intro() {
  const backgroundRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top",
        end: "+=300px",
      },
    });

    timeline.from(backgroundRef.current, {
      clipPath: `inset(20%)`,
      autoAlpha: 0,
    });
  }, []);

  return (
    <div className="relative flex justify-center">
      <div
        className="invisible absolute h-[130vh] w-full brightness-50 will-change-[clip-path,_opacity]"
        ref={backgroundRef}
      >
        <Image
          src={"/images/intro-background.webp"}
          fill={true}
          alt="background image"
          className="gradient-mask object-cover"
          priority={true}
        />
      </div>
      <div className="flex h-d-screen select-none flex-col items-center justify-center">
        <motion.h1
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          data-scroll
          data-scroll-speed="0.7"
          className="relative z-[3] flex whitespace-pre-wrap text-[7vw] font-semibold uppercase"
          style={{
            textShadow: "7px 7px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          {name.split("").map((letter, idx) => (
            <motion.span
              key={`name-${letter}-${idx}`}
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h2
          variants={positionVariants}
          initial="hidden"
          animate="visible"
          className=" relative flex whitespace-pre-wrap text-[3vw] font-thin uppercase"
          data-scroll
          data-scroll-speed="1"
        >
          {jobPosition.split("").map((letter, idx) => (
            <motion.span
              key={`position-${letter}-${idx}`}
              variants={positionLetterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </div>
  );
}
