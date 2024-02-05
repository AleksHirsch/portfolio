"use client";

import { MenuIcon } from "lucide-react";
import { Magnetic } from "./magnetic";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"],
  );

  return (
    <motion.nav
      className="fixed top-0 z-40"
      style={{
        background,
      }}
    >
      <div className="mx-auto flex items-center justify-end p-4">
        <Magnetic>
          <button data-cursor-hover="rotate" className="p-5">
            <MenuIcon size={48} />
          </button>
        </Magnetic>
      </div>
    </motion.nav>
  );
}
