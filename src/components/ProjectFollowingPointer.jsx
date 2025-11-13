"use client";

import { FollowerPointerCard } from "./ui/following-pointer";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandGithub,
  IconExternalLink,
  IconX,
  IconZoomIn,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

// Image Modal Component
const ImageModal = ({ isOpen, onClose, imageSrc, projectTitle }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      // Add escape key listener
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Full-screen backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer" />

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-8 right-8 z-10 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#007BFF] to-[#00C2FF] hover:from-[#009EFF] hover:to-[#00DFFF] shadow-[0_0_25px_#00C2FF80] rounded-full text-white transition-all duration-300 hover:scale-110 shadow-2xl"
        >
          <IconX size={28} />
        </motion.button>

        {/* Image Container */}
        <div className="absolute inset-0 flex items-center justify-center p-12 pointer-events-none">
          <motion.img
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              duration: 0.6,
            }}
            src={imageSrc}
            alt={projectTitle}
            className="max-w-[75vw] max-h-[75vh] object-contain rounded-lg shadow-2xl border border-[#00C2FF]/30 shadow-[0_0_40px_#00C2FF60] pointer-events-none"
          />
        </div>

        {/* Project Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-8 left-8 z-10"
        >
          <div className="bg-gradient-to-r from-[#007BFF]/90 to-[#00C2FF]/90 ... border border-[#00C2FF]/30 shadow-[0_0_20px_#00C2FF80]">
            <h3 className="text-white text-xl font-bold">{projectTitle}</h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, getTechIconAndColor, onImageClick }) => {
  const TitleComponent = ({ title, avatar }) => (
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#007BFF] to-[#00C2FF] flex items-center justify-center">
        <span className="text-white text-xs font-bold">{title.charAt(0)}</span>
      </div>
      <p className="text-white font-medium">{title}</p>
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={project.title.split(" ")[0]}
            avatar={project.image}
          />
        }
      >
        <motion.div
          className="group relative h-full overflow-hidden rounded-xl sm:rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md transition duration-300 hover:shadow-2xl hover:shadow-[#00C2FF]/30 hover:border-[#00C2FF]/50"
          whileHover={{ y: -8, rotateX: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Project Image */}
          <div
            className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-gray-800 cursor-pointer"
            onClick={() => onImageClick(project.image, project.title)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40" />

            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00C2FF]/0 via-[#00C2FF]/0 to-[#00C2FF]/0 group-hover:from-[#00C2FF]/15 group-hover:via-[#00C2FF]/8 group-hover:to-[#00C2FF]/0 transition-all duration-300" />

            {/* Click to Expand Indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center gap-1 px-2 py-1 bg-gradient-to-r from-[#007BFF] to-[#00C2FF] hover:from-[#009EFF] hover:to-[#00DFFF] ... border border-[#00C2FF]/30 shadow-[0_0_10px_#00C2FF80]"
              >
                <IconZoomIn size={12} />
                <span className="text-xs font-medium">Expand</span>
              </motion.div>
            </div>

            {/* Permanent Click Hint (Small Icon) */}
            <div className="absolute top-3 right-3 z-10">
              <div className="flex items-center justify-center w-8 h-8 bg-black/60 hover:bg-[#007BFF]/80 rounded-full text-white/80 hover:text-white transition-all duration-300 border border-white/20">
                <IconZoomIn size={16} />
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="p-6">
            {/* Project Title */}
            <h2 className="mb-3 text-xl font-bold text-white group-hover:text-[#00C2FF] transition-colors duration-300">
              {project.title}
            </h2>

            {/* Project Description */}
            <div className="mb-4 text-sm text-gray-300 leading-relaxed">
              <div className="space-y-2">
                {project.description
                  .split("•")
                  .filter((item) => item.trim())
                  .slice(0, 2)
                  .map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00C2FF] rounded-full mt-2 flex-shrink-0" />
                      <span className="line-clamp-2">{item.trim()}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => {
                  const { icon: Icon, color } = getTechIconAndColor(tech);
                  return (
                    <motion.div
                      key={techIndex}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 rounded-full border border-gray-600/30 hover:bg-gray-600/50 hover:border-[#00C2FF]/40 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: techIndex * 0.05 }}
                    >
                      <Icon size={14} className={color} />
                      <span className="text-gray-300 text-xs font-medium">
                        {tech}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 text-xs font-medium text-gray-300 hover:text-white transition-all duration-300 border border-gray-600/30 hover:border-[#00C2FF]/50"
              >
                <IconBrandGithub size={14} />
                Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#007BFF] to-[#00C2FF] hover:from-[#009EFF] hover:to-[#00DFFF] shadow-[0_0_15px_#00C2FF80] px-4 py-2 text-xs font-bold text-white transition-all duration-300"
              >
                <IconExternalLink size={14} />
                Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </FollowerPointerCard>
    </div>
  );
};

export function ProjectFollowingPointer({ projects, getTechIconAndColor }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectsPerPage = 3; // Show 3 projects per page

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to top of projects section
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleImageClick = (imageSrc, projectTitle) => {
    setSelectedImage(imageSrc);
    setSelectedTitle(projectTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setSelectedTitle("");
  };

  return (
    <motion.div
      className="w-full"
      id="projects-section"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Pagination Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-[#8ECFFF] text-sm">
          Showing {startIndex + 1}-{Math.min(endIndex, projects.length)} of{" "}
          {projects.length} projects
        </p>
      </motion.div>

      {/* Grid Layout */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto min-h-[400px] sm:min-h-[600px] px-4 sm:px-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {currentProjects.map((project, index) => (
          <motion.div
            key={`${currentPage}-${index}`}
            initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -5,
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <ProjectCard
              project={project}
              getTechIconAndColor={getTechIconAndColor}
              onImageClick={handleImageClick}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 mb-8"
        >
          <Pagination className="justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  className={`
                    cursor-pointer transition-all duration-300
                    ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed text-gray-500"
                        : "hover:bg-[#00C2FF]/20 hover:text-[#00C2FF] hover:border-[#00C2FF]/50 text-gray-300"
                    }
                  `}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={currentPage === pageNumber}
                      className={`
                        cursor-pointer transition-all duration-300
                        ${
                          currentPage === pageNumber
                            ? "bg-gradient-to-r from-[#007BFF] to-[#00C2FF] text-white border-[#00C2FF] shadow-lg shadow-[#00C2FF]/30"
                            : "hover:bg-[#00C2FF]/20 hover:text-[#00C2FF] hover:border-[#00C2FF]/50 text-gray-300 border-gray-600"
                        }
                      `}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  className={`
                    cursor-pointer transition-all duration-300
                    ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed text-gray-500"
                        : "hover:bg-[#00C2FF]/20 hover:text-[#00C2FF] hover:border-[#00C2FF]/50 text-gray-300"
                    }
                  `}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      )}

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8"
      >
        <p className="text-[#8ECFFF] text-sm mb-4">
          Hover over any project card to see the following pointer effect
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="w-2 h-2 bg-[#00C2FF] rounded-full animate-pulse"></div>
          <span className="text-gray-500 text-xs">Interactive Experience</span>
          <div className="w-2 h-2 bg-[#00C2FF] rounded-full animate-pulse delay-75"></div>
        </div>
      </motion.div>

      {/* Global Image Modal - Renders outside of any card containers */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={selectedImage}
        projectTitle={selectedTitle}
      />
    </motion.div>
  );
}
