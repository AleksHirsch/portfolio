"use client";

import About from "@/components/about";
import Description from "@/components/description";
import Intro from "@/components/intro";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <>
      <Intro />
      <Description />
      {/* <About /> */}
    </>
  );
}
