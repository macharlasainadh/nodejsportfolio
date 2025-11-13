"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  IconBrandGithub,
  IconExternalLink,
  IconCode,
  IconX,
} from "@tabler/icons-react";

const ProjectCircularGallery = ({ projects, getTechIconAndColor }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleStart = (e) => {
      isDown = true;
      setIsScrolling(true);
      startX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
    };

    const handleMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleEnd = () => {
      isDown = false;
      setTimeout(() => setIsScrolling(false), 150);

      // Snap to nearest card
      const cardWidth = container.clientWidth * 0.8;
      const scrollPosition = container.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setCurrentIndex(Math.min(Math.max(newIndex, 0), projects.length - 1));

      container.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const cardWidth = container.clientWidth * 0.8;
      const delta = e.deltaY > 0 ? 1 : -1;
      const newIndex = Math.min(
        Math.max(currentIndex + delta, 0),
        projects.length - 1
      );

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        container.scrollTo({
          left: newIndex * cardWidth,
          behavior: "smooth",
        });
      }
    };

    container.addEventListener("mousedown", handleStart);
    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseup", handleEnd);
    container.addEventListener("mouseleave", handleEnd);
    container.addEventListener("touchstart", handleStart);
    container.addEventListener("touchmove", handleMove);
    container.addEventListener("touchend", handleEnd);
    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("mousedown", handleStart);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseup", handleEnd);
      container.removeEventListener("mouseleave", handleEnd);
      container.removeEventListener("touchstart", handleStart);
      container.removeEventListener("touchmove", handleMove);
      container.removeEventListener("touchend", handleEnd);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, projects.length]);

  const handleImageClick = (imageSrc, title) => {
    setModalImage({ src: imageSrc, title });
    setShowImageModal(true);
  };

  const closeModal = () => {
    setShowImageModal(false);
    setModalImage(null);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Circular Gallery Container */}
      <div
        ref={containerRef}
        className="flex items-center h-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
      >
        {projects.map((project, index) => {
          const isActive = index === currentIndex;
          const distance = Math.abs(index - currentIndex);
          const scale = isActive ? 1 : Math.max(0.7, 1 - distance * 0.1);
          const opacity = isActive ? 1 : Math.max(0.4, 1 - distance * 0.2);
          const rotateY = (index - currentIndex) * 15;
          const translateZ = isActive ? 0 : -distance * 50;

          return (
            <motion.div
              key={project.title}
              className="flex-shrink-0 px-4"
              style={{
                width: "80vw",
                maxWidth: "500px",
                minWidth: "350px",
              }}
              animate={{
                scale,
                opacity,
                rotateY,
                z: translateZ,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              {/* Your existing project card styling */}
              <motion.div
                className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800/60 group hover:border-[#007BFF]/40 transition-all duration-300 overflow-hidden h-[550px] flex flex-col shadow-[0_0_25px_rgba(0,123,255,0.2)] hover:shadow-[0_0_45px_rgba(111,0,255,0.35)]"
                whileHover={{
                  y: -8,
                  scale: isActive ? 1.02 : scale * 1.02,
                  rotateY: rotateY * 0.5,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Project Image */}
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => handleImageClick(project.image, project.title)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Click to enlarge indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <IconExternalLink className="w-5 h-5 text-gray-800" />
                    </div>
                  </div>

                  {/* Project Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#7A5FFF] transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex-1 flex flex-col p-6">
                  {/* Project Description */}
                  <div className="mb-4 flex-1">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {project.description
                        .split("• ")
                        .filter(Boolean)
                        .map((sentence, i) => (
                          <span key={i} className="flex items-start gap-2 mb-2">
                            <span className="w-1.5 h-1.5 bg-[#007BFF] rounded-full mt-2 flex-shrink-0"></span>
                            <span>{sentence.trim()}</span>
                          </span>
                        ))}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => {
                        const { icon: TechIcon, color } =
                          getTechIconAndColor(tech);
                        return (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.1 + techIndex * 0.05,
                            }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-lg text-xs font-medium border border-gray-700/40 hover:border-gray-600/60 hover:bg-gray-700/60 transition-all duration-300 group/tech"
                          >
                            <TechIcon
                              size={14}
                              className={`${color} group-hover/tech:scale-110 transition-transform duration-200`}
                            />
                            <span className="text-gray-300 group-hover/tech:text-white transition-colors duration-200">
                              {tech}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Links - Fixed at bottom */}
                  <div className="mt-auto pt-4 border-t border-gray-800/60">
                    <div className="flex items-center justify-center gap-6">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg border border-gray-700/40 hover:border-[#007BFF]/40 transition-all duration-300 group/link"
                        title="View Code"
                      >
                        <IconBrandGithub
                          size={16}
                          className="text-gray-400 group-hover/link:text-[#7A5FFF] transition-colors"
                        />
                        <span className="text-gray-300 group-hover/link:text-white text-sm font-medium">
                          GitHub
                        </span>
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg border border-gray-700/40 hover:border-[#007BFF]/40 transition-all duration-300 group/link"
                        title="Live Demo"
                      >
                        <IconExternalLink
                          size={16}
                          className="text-gray-400 group-hover/link:text-[#7A5FFF] transition-colors"
                        />
                        <span className="text-gray-300 group-hover/link:text-white text-sm font-medium">
                          Live Demo
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              const cardWidth = containerRef.current.clientWidth * 0.8;
              containerRef.current.scrollTo({
                left: index * cardWidth,
                behavior: "smooth",
              });
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
              ? "bg-[#007BFF] w-6 shadow-[0_0_10px_rgba(0,123,255,0.8)]"
              : "bg-gray-600 hover:bg-[#6F00FF]"
            }`}
          />
        ))}
      </div>

      {/* Side Navigation */}
      <button
        onClick={() => {
          const newIndex = Math.max(currentIndex - 1, 0);
          setCurrentIndex(newIndex);
          const cardWidth = containerRef.current.clientWidth * 0.8;
          containerRef.current.scrollTo({
            left: newIndex * cardWidth,
            behavior: "smooth",
          });
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 p-3 rounded-full border border-gray-700/40 hover:border-[#007BFF]/40 transition-all duration-300"
        disabled={currentIndex === 0}
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() => {
          const newIndex = Math.min(currentIndex + 1, projects.length - 1);
          setCurrentIndex(newIndex);
          const cardWidth = containerRef.current.clientWidth * 0.8;
          containerRef.current.scrollTo({
            left: newIndex * cardWidth,
            behavior: "smooth",
          });
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 p-3 rounded-full border border-gray-700/40 hover:border-[#007BFF]/40 transition-all duration-300"
        disabled={currentIndex === projects.length - 1}
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-4 -right-4 z-10 bg-[#007BFF] hover:bg-[#6F00FF] text-white p-2 rounded-full shadow-[0_0_20px_rgba(111,0,255,0.5)] transition-all duration-300"
              >
                <IconX className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <img
                src={modalImage.src}
                alt={modalImage.title}
                className="w-full h-full object-contain rounded-lg shadow-[0_0_40px_rgba(0,123,255,0.25)]"
              />

              {/* Image Title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A2A]/90 via-transparent to-transparent p-6 rounded-b-lg">
                <h3 className="text-xl font-bold text-white">
                  {modalImage.title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  Click anywhere outside to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCircularGallery;
