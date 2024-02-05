import React, { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const phrases = [
  "Responsive design",
  "Pixel perfect obsession",
  "Clean code",
  "Team player",
  "Positive attitude :)",
];

export default function Description() {
  return (
    <div
      style={{
        fontSize: "clamp(1.5rem, 5vw, 4rem)",
      }}
      className="relative ml-[10vw] pb-[25vh] uppercase"
    >
      {phrases.map((phrase, index) => {
        return <AnimatedText key={index}>{phrase}</AnimatedText>;
      })}
    </div>
  );
}

function AnimatedText({ children }: { children: React.ReactNode }) {
  const text = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(text.current, {
      scrollTrigger: {
        trigger: text.current,
        scrub: true,
        start: "0px bottom",
        end: "bottom+=200px bottom",
      },
      opacity: 0,
      x: "-200px",
      ease: "power3.Out",
    });
  }, []);

  return (
    <p ref={text} className="relative m-0 will-change-transform">
      {children}
    </p>
  );
}
