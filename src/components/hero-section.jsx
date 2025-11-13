"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SplitText from "./SplitText";
import { motion } from "framer-motion";

export function HeroSection() {
  const titles = [
    "FULL STACK DEVELOPER",
    "FRONTEND ENGINEER",
    "AGENTIC AI ENGINEER",
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 200 : 1000;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentTitle) {
        // Finished typing, start deleting after pause
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayedText === "") {
        // Finished deleting, move to next title
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      } else if (isDeleting) {
        // Continue deleting
        setDisplayedText(currentTitle.substring(0, displayedText.length - 1));
      } else {
        // Continue typing
        setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex, titles]);

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden particles-container"
      style={{
        background: `
          linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #000000 50%, #0d0d0d 75%, #000000 100%),
          radial-gradient(circle at 20% 80%, rgba(0, 123, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(111, 0, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 50px 50px",
      }}
    >
      {/* Enhanced Visual Effects */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 123, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(111, 0, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500/20 rounded-full blur-sm float-animation"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-400/15 rounded-full blur-sm float-animation" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-indigo-500/25 rounded-full blur-sm float-animation" style={{ animationDelay: "4s" }}></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-purple-500/10 rounded-full blur-sm float-animation" style={{ animationDelay: "6s" }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-blue-900/10"></div>

      <div className="relative z-10 container mx-auto pt-10 p-25 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl text-white lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {"Hey, I'm ".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    style={{
                      display: char === " " ? "inline" : "inline-block",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                {"Sai".split("").map((char, index) => (
                  <motion.span
                    key={index + 10}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: (index + 10) * 0.08,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      textShadow: "0 0 20px rgba(0, 123, 255, 0.8)",
                      transition: { duration: 0.3 },
                    }}
                    className="text-transparent bg-clip-text bg-gradient-to-br from-[#007BFF] via-[#6F00FF] to-[#7A00FF] drop-shadow-2xl"
                    style={{
                      display: "inline-block",
                      filter: "drop-shadow(0 0 10px rgba(0, 123, 255, 0.6))",
                      textShadow: "0 0 30px rgba(111, 0, 255, 0.6)",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Location */}
            <motion.div
              className="flex items-center space-x-2 text-blue-400"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <motion.svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4, ease: "backOut" }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </motion.svg>
              <span className="text-lg text-blue-400">
                {"Andhra Pradesh, India".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.7 + index * 0.025,
                      ease: "easeOut",
                    }}
                    style={{
                      display: char === " " ? "inline" : "inline-block",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </motion.div>

            {/* Animated Title */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-wider min-h-[3rem] flex items-center">
                {displayedText}
                <span className="animate-pulse ml-1 text-blue-400">|</span>
              </h2>
            </motion.div>

            {/* Social Icons and Resume Button */}
            <motion.div
              className="flex items-center space-x-6 pt-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
            >
              {/* Social Icons */}
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                {/* GitHub */}
                <motion.a
                  href="https://github.com/MSVVSSAINADH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.1, duration: 0.5, ease: "backOut" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://www.linkedin.com/in/msvvssainadh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.2, duration: 0.5, ease: "backOut" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </motion.div>

              {/* Resume Button */}
              <motion.a
                href="https://drive.google.com/file/d/1rFUztRWi1Qol9hcYU0YyBQq5jltDIktb/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-gradient-to-r from-[#007BFF] to-[#6F00FF] hover:from-[#6F00FF] hover:to-[#007BFF] px-8 py-3 rounded-full font-semibold shadow-[0_0_20px_#007BFF80] hover:shadow-[0_0_30px_#6F00FF80] transition-all duration-300 flex items-center space-x-2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6, ease: "backOut" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 2.0 }}
                />
                <span>Resume</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "backOut" }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Main container with multiple layers */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #007BFF, #6F00FF, #7A00FF, #007BFF)",
                    padding: "4px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "linear",
                    delay: 1.5,
                  }}
                >
                  <div className="w-full h-full rounded-full bg-black" />
                </motion.div>

                {/* Glass morphism border */}
                <motion.div
                  className="absolute inset-2 rounded-full backdrop-blur-sm border border-white/20"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                    boxShadow:
                      "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 25px 50px rgba(0, 0, 0, 0.5)",
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "backOut" }}
                />

                {/* Professional shadow base */}
                <motion.div
                  className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />

                {/* Main image container */}
                <motion.div
                  className="absolute inset-6 rounded-full overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #007BFF, #6F00FF, #7A00FF)",
                    padding: "3px",
                    boxShadow: "0 20px 60px rgba(0, 123, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                  }}
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
                  whileHover={{
                    boxShadow: "0 30px 80px rgba(111, 0, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                    y: -8,
                  }}
                >
                  <motion.div
                    className="w-full h-full rounded-full overflow-hidden relative"
                    style={{
                      boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.2)",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: "backOut" }}
                  >
                    <Image
                      src="/portfolio image.jpg"
                      alt="Sayan Adhikary Profile Picture"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      priority
                    />
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 rounded-full" />
                  </motion.div>
                </motion.div>

                {/* Floating particles */}
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full opacity-80"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    delay: 2,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute -bottom-3 -left-3 w-4 h-4 bg-indigo-400 rounded-full opacity-70"
                  animate={{
                    y: [0, 15, 0],
                    x: [0, -8, 0],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    delay: 2.5,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute top-1/4 -left-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  animate={{
                    y: [0, -10, 0],
                    x: [0, -5, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    delay: 3,
                    ease: "easeInOut",
                  }}
                />

                {/* Professional skill indicators */}
                <motion.div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                >
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          delay: i * 0.2 + 2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Tech stack indicator */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.6 }}
                >
                  <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-blue-300 font-medium">
                      Available
                    </span>
                  </div>
                </motion.div>

                {/* Orbiting elements */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "linear",
                    delay: 2,
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute -top-3 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-70" />
                    <div className="absolute top-1/2 -right-3 w-1 h-1 bg-purple-400 rounded-full opacity-60" />
                    <div className="absolute -bottom-3 left-1/2 w-2 h-2 bg-green-400 rounded-full opacity-50" />
                    <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-65" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(255, 255, 255, 0.05)"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,90.7C1248,75,1344,53,1392,42.7L1440,32L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
          />
        </svg>
      </div>
    </section>
  );
}
