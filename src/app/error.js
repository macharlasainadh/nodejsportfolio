"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconHome, IconRefresh, IconBugOff } from "@tabler/icons-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen relative overflow-hidden particles-container">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #000000 50%, #0d0d0d 75%, #000000 100%),
            radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(247, 147, 30, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-red-500/20 rounded-full blur-sm float-animation"></div>
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-red-400/15 rounded-full blur-sm float-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-3 h-3 bg-red-600/25 rounded-full blur-sm float-animation"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-5 h-5 bg-red-500/10 rounded-full blur-sm float-animation"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Error Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-6xl md:text-7xl font-bold mb-4"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-red-600 glow-text">
                Oops!
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              <IconBugOff size={64} className="text-red-500/60 glow-text" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 glow-text">
              Something Went Wrong
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-2">
              Don&apos;t worry, it&apos;s not you, it&apos;s us! We&apos;re
              working on fixing this.
            </p>
            <p className="text-base text-gray-400">
              Please try refreshing the page or go back home. 🛠️
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => reset()}
              className="btn-enhanced text-white px-8 py-3 rounded-full font-medium text-base relative overflow-hidden flex items-center gap-2 group"
            >
              <IconRefresh
                size={20}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              Try Again
            </motion.button>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-effect text-white px-8 py-3 rounded-full font-medium text-base border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 flex items-center gap-2 group"
              >
                <IconHome
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                Go Home
              </motion.button>
            </Link>
          </motion.div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === "development" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 glass-effect p-6 rounded-2xl border border-red-500/20 max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                🐛 Debug Info
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed break-words">
                {error?.message || "An unexpected error occurred"}
              </p>
            </motion.div>
          )}

          {/* Animated Decoration */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-20 right-20 w-16 h-16 border-2 border-red-500/20 rounded-full hidden md:block"
          />

          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 0.8, 1],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-20 left-20 w-12 h-12 border-2 border-red-400/20 rounded-full hidden md:block"
          />
        </div>
      </div>
    </div>
  );
}
