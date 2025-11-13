"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ResponsiveNavbar() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <motion.div
      className={cn(
        "fixed top-4 inset-x-0 max-w-6xl mx-auto z-50 dark",
        className
      )}
      initial={{ opacity: 0, y: -100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <motion.div
        className="flex items-center justify-between glass-effect rounded-full shadow-2xl px-4 py-2 md:px-8 md:py-3 glow-box"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(26, 26, 26, 0.8) 50%, rgba(0, 0, 0, 0.9) 100%)",
          border: "1px solid rgba(0, 123, 255, 0.3)",
        }}
        initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
        animate={{ backdropFilter: "blur(20px)", opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 0 40px rgba(0, 123, 255, 0.4), 0 0 80px rgba(111, 0, 255, 0.2)",
        }}
      >
        {/* Brand Name on the left */}
        <motion.div
          className="text-white font-bold text-lg md:text-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          SAINADH MACHARLA
        </motion.div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white focus:outline-none ml-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <motion.div
          className={
            menuOpen
              ? "absolute top-16 left-0 w-full flex flex-col items-center bg-black/95 rounded-b-2xl py-4 space-y-4 md:static md:flex-row md:space-x-8 md:space-y-0 md:bg-transparent md:rounded-none md:py-0"
              : "hidden md:flex items-center space-x-8"
          }
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {["Home", "About", "Education", "Skills", "Projects", "Contact"].map(
            (item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-[#007BFF] transition-colors cursor-pointer text-lg md:text-base"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </motion.a>
            )
          )}
        </motion.div>

        {/* Let's Talk button on the right */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block"
        >
          <a
            href="#contact"
            className="btn-enhanced text-white px-6 py-2 rounded-full font-medium text-sm relative overflow-hidden"
          >
            Let's Talk
          </a>
        </motion.div>
      </motion.div>
      {/* Mobile Let's Talk button */}
      {menuOpen && (
        <div className="md:hidden w-full flex justify-center pb-4">
          <a
            href="#contact"
            className="btn-enhanced text-white px-8 py-3 rounded-full font-medium text-sm relative overflow-hidden"
            onClick={() => setMenuOpen(false)}
          >
            Let's Talk
          </a>
        </div>
      )}
    </motion.div>
  );
}
