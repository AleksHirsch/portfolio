import React, { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function About() {
  return (
    <div className="container relative grid h-d-screen place-items-center overflow-x-clip py-16">
      <div>
        <AnimatedText>
          <span className="text-3xl">About me</span>
        </AnimatedText>
        <AnimatedText>
          <span className="text-lg">
            I am a self-taught, but also quite experienced, software developer,
            open-minded and methodical person. I love solving the challenges
            that coding provides - it&apos;s never boring, just like photography
            which is my primary hobby.
          </span>
        </AnimatedText>
      </div>
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
        end: "bottom+=400px bottom",
      },
      opacity: 0,
      x: "-200px",
      ease: "power3.Out",
    });
  }, []);

  return (
    <p ref={text} className="relative">
      {children}
    </p>
  );
}
