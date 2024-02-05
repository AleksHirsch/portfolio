import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import "@/styles/locomotiveScroll.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Cursor } from "@/components/cursor";

const font = Montserrat({ subsets: ["latin"], weight: ["100", "400", "600"] });

export const metadata: Metadata = {
  title: "Aleks Hirsch",
  description: "Aleks Hirsch's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Cursor />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
