"use client";

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { ResponsiveNavbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import LogoLoop from "@/components/LogoLoop";
import { ProjectFollowingPointer } from "@/components/ProjectFollowingPointer";
import { motion } from "framer-motion";
import {
  IconCode,
  IconDatabase,
  IconBrandReact,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandJavascript,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandTailwind,
  IconBrandMongodb,
  IconBrandFirebase,
  IconBrandTypescript,
  IconBrandGit,
  IconDeviceDesktop,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconExternalLink,
  IconDownload,
  IconMapPin,
  IconPhone,
  IconSchool,
  IconCertificate,
  IconCalendar,
  IconTrophy,
  IconApi,
  IconFlask,
  IconBrandRedux,
  IconChartBar,
  IconChartLine,
  IconTerminal,
  IconBrandNextjs,
  IconDatabase as IconPostgreSQL,
  IconBrandSocketIo,
  IconBrandDocker,
  IconBrandStripe,
  IconServer,
  IconWorldWww,
  IconBolt,
} from "@tabler/icons-react";
import { Highlighter } from "@/components/ui/highlighter";

export default function Home() {
  // Function to get tech icon and color
  const getTechIconAndColor = (tech) => {
    const techMap = {
      React: { icon: IconBrandReact, color: "text-cyan-400" },
      "Next.js": { icon: IconBrandNextjs, color: "text-white" },
      "Node.js": { icon: IconBrandNodejs, color: "text-green-500" },
      JavaScript: { icon: IconBrandJavascript, color: "text-yellow-400" },
      TypeScript: { icon: IconBrandTypescript, color: "text-blue-500" },
      Python: { icon: IconBrandPython, color: "text-blue-400" },
      "Tailwind CSS": { icon: IconBrandTailwind, color: "text-cyan-400" },
      MongoDB: { icon: IconBrandMongodb, color: "text-green-500" },
      PostgreSQL: { icon: IconPostgreSQL, color: "text-blue-600" },
      Firebase: { icon: IconBrandFirebase, color: "text-yellow-500" },
      "Redux Toolkit": { icon: IconBrandRedux, color: "text-purple-500" },
      "Chart.js": { icon: IconChartBar, color: "text-pink-400" },
      RapidAPI: { icon: IconApi, color: "text-blue-400" },
      "Socket.io": { icon: IconBrandSocketIo, color: "text-white" },
      Prisma: { icon: IconDatabase, color: "text-gray-300" },
      Flask: { icon: IconFlask, color: "text-gray-300" },
      TensorFlow: { icon: IconBolt, color: "text-blue-500" },
      "TensorFlow.js": { icon: IconBolt, color: "text-blue-400" },
      Docker: { icon: IconBrandDocker, color: "text-blue-400" },
      Express: { icon: IconServer, color: "text-gray-300" },
      Stripe: { icon: IconBrandStripe, color: "text-indigo-500" },
      JWT: { icon: IconWorldWww, color: "text-gray-400" },
      OpenAI: { icon: IconBolt, color: "text-green-400" },
      "Framer Motion": { icon: IconBolt, color: "text-pink-500" },
      Pandas: { icon: IconChartBar, color: "text-blue-400" },
      Matplotlib: { icon: IconChartLine, color: "text-green-400" },
      argparse: { icon: IconTerminal, color: "text-gray-400" },
      Streamlit: { icon: IconBolt, color: "text-red-500" },
      LangChain: { icon: IconBolt, color: "text-green-500" },
      Ollama: { icon: IconBolt, color: "text-purple-500" },
    };

    return techMap[tech] || { icon: IconCode, color: "text-gray-400" };
  };

  const skills = [
    { name: "Frontend Development", icon: IconBrandReact, level: 90 },
    { name: "Backend Development", icon: IconBrandNodejs, level: 85 },
    { name: "Database Management", icon: IconDatabase, level: 80 },
    { name: "Python Programming", icon: IconBrandPython, level: 88 },
    { name: "JavaScript/TypeScript", icon: IconBrandJavascript, level: 92 },
    { name: "UI/UX Design", icon: IconDeviceDesktop, level: 75 },
  ];

  const skillLogos = [
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 glass-effect px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-cyan-400/30 glow-box group hover:border-cyan-400/50 transition-all duration-300">
          <IconBrandReact
            className="text-cyan-400 glow-text group-hover:scale-110 transition-transform duration-300"
            size={24}
          />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            React
          </span>
        </div>
      ),
      alt: "React",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 glass-effect px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-green-500/30 glow-box group hover:border-green-500/50 transition-all duration-300">
          <IconBrandMongodb
            className="text-green-500 glow-text group-hover:scale-110 transition-transform duration-300"
            size={24}
          />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            MongoDB
          </span>
        </div>
      ),
      alt: "MongoDB",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconBrandHtml5 className="text-blue-500" size={24} /> 
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            HTML
          </span>
        </div>
      ),
      alt: "HTML",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconBrandCss3 className="text-blue-500" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            CSS
          </span>
        </div>
      ),
      alt: "CSS",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconBrandTailwind className="text-teal-400" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            Tailwind CSS
          </span>
        </div>
      ),
      alt: "Tailwind CSS",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconBrandNodejs className="text-green-600" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            Node.js
          </span>
        </div>
      ),
      alt: "Node.js",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconCode className="text-gray-400" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            Express.js
          </span>
        </div>
      ),
      alt: "Express.js",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconApi className="text-blue-400" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            Postman
          </span>
        </div>
      ),
      alt: "Postman",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconBrandFirebase className="text-yellow-500" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            Firebase
          </span>
        </div>
      ),
      alt: "Firebase",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconBrandPython className="text-blue-400" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            Python
          </span>
        </div>
      ),
      alt: "Python",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconFlask className="text-gray-300" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            Flask
          </span>
        </div>
      ),
      alt: "Flask",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 glass-effect px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-yellow-400/30 glow-box group hover:border-yellow-400/50 transition-all duration-300">
          <IconBrandJavascript
            className="text-yellow-400 glow-text group-hover:scale-110 transition-transform duration-300"
            size={24}
          />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            JavaScript
          </span>
        </div>
      ),
      alt: "JavaScript",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconBrandTypescript className="text-blue-600" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            TypeScript
          </span>
        </div>
      ),
      alt: "TypeScript",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconBrandGithub className="text-white" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            GitHub
          </span>
        </div>
      ),
      alt: "GitHub",
    },
    {
      node: (
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/30">
          <IconBrandGit className="text-red-500" size={24} />
          <span className="text-white font-medium sm:font-semibold text-sm sm:text-base">
            Git
          </span>
        </div>
      ),
      alt: "Git",
    },
  ];

  const projects = [
    {
      title: "Crypto Verse – Digital Assets Hub",
      description:
        "• Built a cryptocurrency tracking platform that consolidated live prices, market stats, and news into one dashboard, reducing information lookup time by 40%. • Integrated CoinRanking API & News API via RapidAPI, improving data accuracy and enabling real-time updates within 2s latency. • Optimized state management with Redux Toolkit, cutting redundant API calls by 30% and boosting app responsiveness.",
      image: "/Screenshot 2025-10-01 232803.png", // Updated to use the actual uploaded image filename
      tech: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Redux Toolkit",
        "Chart.js",
        "RapidAPI",
      ],
      github: "https://github.com/sayanadhi03/Crypto-Verse",
      live: "https://crypto-verse-kappa.vercel.app/",
    },
    {
      title: "AI Thief Detection System",
      description:
        "• Built a real-time object detection security system using TensorFlow.js (COCO-SSD) for browser-based AI inference. • Implemented person detection with bounding boxes and audio alerts, running entirely on the client-side for privacy. • Integrated React Webcam and Canvas API for live monitoring, achieving detection updates every 100ms.",
      image: "/Screenshot 2025-10-02 094800.png", // Using the uploaded AI Thief Detection image
      tech: ["Next.js", "TensorFlow.js", "React", "Tailwind CSS"],
      github: "https://github.com/sayanadhi03/AI-Thief-Detector",
      live: "https://ai-thief-detector-gamma.vercel.app/",
    },
    {
      title: "Weather App 🌤️",
      description:
        "• Built a modern weather application providing real-time weather data, 5-day forecasts, and AQI information for cities worldwide. • Integrated Air Quality Index with health insights and multi-city weather tracking for comprehensive environmental monitoring. • Developed dark mode UI with smooth Framer Motion animations and temperature toggle (Celsius/Fahrenheit) for enhanced user experience.",
      image: "/Screenshot 2025-10-14 220531.png", // Updated to use the new Weather App screenshot
      tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/sayanadhi03/weather-app",
      live: "https://weather-app-eight-livid-25.vercel.app/",
    },
    {
      title: "Car Rental System",
      description:
        "• Developed a full-stack Car Rental System where users can browse cars, check availability, and make bookings with automated pricing and billing. • Implemented secure authentication, role-based access (Admin & Customer), and complete workflows for car management, booking approvals, and rental history tracking. • Built responsive dashboards and real-time availability updates, improving operational efficiency and reducing manual processes by 60%.",
        image: "/Screenshot 2025-09-11 112027.png",
        tech: ["Python", "Django", "SQLite / PostgreSQL", "HTML", "CSS", "JavaScript"],
        github: "https://github.com/sayanadhi03/car-rental-system",   
        live: "https://car-rental-system-demo.vercel.app",            

    },
    {
      title: "Hospital Management System",
      description:
        "• Developed and containerized a Hospital Management System and implemented a complete CI/CD pipeline using GitHub Actions for automated build, test, and deployment processes. • Set up Docker-based environments and automated workflows for code quality checks, unit testing, and seamless deployment to staging and production servers. • Improved deployment reliability and reduced release time by 80% through automated pipeline triggers, versioning, and environment-specific configuration management.",
      image: "/HMS.png", 
      tech: ["Python", "Django", "Docker", "GitHub Actions", "CI/CD", "PostgreSQL"],
      github: "https://github.com/sayanadhi03/hospital-management-cicd",  
      live: "https://hospital-management-cicd-demo.vercel.app",           
    },
  ];

  const education = [
    {
      degree: "B.Tech. in Computer Science & Engineering",
      institution: "K L University",
      location: "Green Fields, Vaddeswaram",
      period: "2024 - 2027",
      grade: "8.94 CGPA",
      icon: IconSchool,
      achievements: [
        "Maintaining excellent academic performance.",
        "Working on various software development projects.",
      ],
    },
    {
      degree: "Diploma in Computer Science",
      institution: "Chirala Engineering College",
      location: "Ramapuram",
      period: "2021 - 2023",
      grade: "89%",
      icon: IconCertificate,
      achievements: [
        "Specialized in Computer Science and Mathematics.",
        "Achieved outstanding results in Computer Science in board examinations.",
      ],
    },
  ];

  return (
    <>
      <ResponsiveNavbar />
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <section
          id="about"
          className="py-20 px-4 relative overflow-hidden particles-container"
        >
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,150,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(50,100,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,150,255,0.05),transparent_70%)]" />

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-500/30 rounded-full blur-sm float-animation"></div>
          <div
            className="absolute top-32 right-20 w-3 h-3 bg-blue-400/20 rounded-full blur-sm float-animation"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-1 h-1 bg-blue-600/40 rounded-full blur-sm float-animation"
            style={{ animationDelay: "3s" }}
          ></div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  Me
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                  Passionate Full-Stack Developer
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Final-year Computer Science student skilled in full-stack web
                  development (
                  <strong className="text-white font-bold">React</strong>,{" "}
                  <strong className="text-white font-bold">Node.js</strong>,{" "}
                  <strong className="text-white font-bold">MongoDB</strong>)
                  with project experience in AI-based applications. Passionate
                  about problem-solving, clean code, and currently exploring{" "}
                  <strong className="text-white font-bold">Agentic AI</strong>{" "}
                  for building intelligent, autonomous systems.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  My expertise spans across frontend frameworks like{" "}
                  <strong className="text-white font-bold">React</strong> and
                  <strong className="text-white font-bold">Next.js</strong>,
                  backend technologies including{" "}
                  <strong className="text-white font-bold">Node.js</strong>, and
                  database management with{" "}
                  <strong className="text-white font-bold">MongoDB</strong>.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <IconMapPin size={20} />
                    <span>Andhra Pradesh, India</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <IconMail size={20} />
                    <span>Available for hire</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {[
                  { number: "10+", label: "Projects Completed" },
                  { number: "3+", label: "Years Experience" },
                  { number: "20+", label: "Happy Clients" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-gray-700/30"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                      {stat.number}
                    </h4>
                    <p className="text-gray-300 mt-2 text-sm sm:text-base">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-4 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,140,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(80,100,255,0.1),transparent_50%)]" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  Education
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                My{" "}
                <Highlighter action="underline" color="#FF9800">
                  academic journey
                </Highlighter>{" "}
                and continuous{" "}
                <Highlighter action="highlight" color="#87CEFA">
                  learning path
                </Highlighter>{" "}
                in technology
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-6" />
            </motion.div>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row gap-6 lg:gap-8 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Education Card */}
                  <div className="flex-1">
                    <motion.div
                      className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 group"
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4 sm:gap-6">
                        <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl">
                          <edu.icon
                            size={28}
                            className="text-blue-400 sm:w-8 sm:h-8"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                              {edu.degree}
                            </h3>
                            <div className="flex items-center gap-2 text-blue-400 mt-2 lg:mt-0">
                              <IconCalendar size={18} />
                              <span className="font-medium">{edu.period}</span>
                            </div>
                          </div>

                          <div className="space-y-3 mb-6">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                              <h4 className="text-base sm:text-lg font-semibold text-gray-200">
                                {edu.institution}
                              </h4>
                              <span className="text-sm sm:text-base text-gray-400">
                                • {edu.location}
                              </span>
                            </div>
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 px-4 py-2 rounded-full border border-blue-500/30">
                              <IconTrophy
                                size={16}
                                className="text-green-400"
                              />
                              <span className="text-green-300 font-medium">
                                {edu.grade}
                              </span>
                            </div>
                          </div>

                          <div>
                            <h5 className="text-gray-300 font-medium mb-3">
                              Key Achievements:
                            </h5>
                            <ul className="space-y-2">
                              {edu.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  className="flex items-center gap-3 text-gray-300"
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: index * 0.2 + i * 0.1,
                                  }}
                                  viewport={{ once: true }}
                                >
                                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                                  <span>{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Connector */}
                  <div className="hidden lg:flex flex-col items-center">
                    <motion.div
                      className="w-4 h-4 border-4 border-blue-500 bg-black rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    />
                    {index < education.length - 1 && (
                      <motion.div
                        className="w-1 h-32 bg-gradient-to-b from-blue-500 to-transparent"
                        initial={{ height: 0 }}
                        whileInView={{ height: 128 }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                        viewport={{ once: true }}
                      />
                    )}
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,150,255,0.1),transparent_50%)]" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Technical{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  Skills
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                Here are the{" "}
                <Highlighter action="underline" color="#FF9800">
                  technologies
                </Highlighter>{" "}
                and tools I work with to bring{" "}
                <Highlighter action="highlight" color="#87CEFA">
                  ideas to life
                </Highlighter>
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full" />
            </motion.div>

            {/* LogoLoop Skills Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16"
            >
              {/* Mobile version */}
              <div className="block sm:hidden">
                <LogoLoop
                  logos={skillLogos}
                  speed={40}
                  direction="left"
                  logoHeight={40}
                  gap={24}
                  pauseOnHover={true}
                  fadeOut={true}
                  fadeOutColor="rgba(0, 0, 0, 1)"
                  scaleOnHover={true}
                  ariaLabel="Technical skills"
                  className="py-4"
                />
              </div>
              {/* Desktop version */}
              <div className="hidden sm:block">
                <LogoLoop
                  logos={skillLogos}
                  speed={60}
                  direction="left"
                  logoHeight={60}
                  gap={48}
                  pauseOnHover={true}
                  fadeOut={true}
                  fadeOutColor="rgba(0, 0, 0, 1)"
                  scaleOnHover={true}
                  ariaLabel="Technical skills"
                  className="py-8"
                />
              </div>
            </motion.div>

            {/* Reverse Direction Skills Loop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Mobile version */}
              <div className="block sm:hidden">
                <LogoLoop
                  logos={skillLogos.slice().reverse()}
                  speed={30}
                  direction="right"
                  logoHeight={35}
                  gap={20}
                  pauseOnHover={true}
                  fadeOut={true}
                  fadeOutColor="rgba(0, 0, 0, 1)"
                  scaleOnHover={true}
                  ariaLabel="Technical skills reverse"
                  className="py-3 opacity-75"
                />
              </div>
              {/* Desktop version */}
              <div className="hidden sm:block">
                <LogoLoop
                  logos={skillLogos.slice().reverse()}
                  speed={45}
                  direction="right"
                  logoHeight={50}
                  gap={40}
                  pauseOnHover={true}
                  fadeOut={true}
                  fadeOutColor="rgba(0, 0, 0, 1)"
                  scaleOnHover={true}
                  ariaLabel="Technical skills reverse"
                  className="py-6 opacity-75"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Interactive{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  Project Showcase
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
                Explore my{" "}
                <Highlighter action="underline" color="#FF9800">
                  portfolio projects
                </Highlighter>{" "}
                with interactive{" "}
                <Highlighter action="highlight" color="#87CEFA">
                  following pointer effects
                </Highlighter>
              </p>
              <p className="text-gray-400 text-sm">
                Hover over any card to experience the magic ✨
              </p>
            </motion.div>

            {/* Following Pointer Projects */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ProjectFollowingPointer
                projects={projects}
                getTechIconAndColor={getTechIconAndColor}
              />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Let&apos;s{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  Connect
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Ready to bring your{" "}
                <Highlighter action="underline" color="#FF9800">
                  ideas to life
                </Highlighter>
                ? Let&apos;s discuss your{" "}
                <Highlighter action="highlight" color="#87CEFA">
                  next project
                </Highlighter>
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                    Get in Touch
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 sm:gap-4 text-gray-300">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-lg">
                        <IconMail
                          size={18}
                          className="text-blue-400 sm:w-5 sm:h-5"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">
                          Email
                        </p>
                        <p className="text-blue-400 text-sm sm:text-base break-all">
                          macharlasainadh2506@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-300">
                      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-lg">
                        <IconPhone size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-blue-400">+91 79810 81512</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-300">
                      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-lg">
                        <IconMapPin size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-blue-400">
                          Mangalagiri, Andhra Pradesh, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href="https://www.linkedin.com/in/msvvssainadh/"
                    target="_blank"
                    className="p-3 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <IconBrandLinkedin size={24} className="text-blue-400" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/MSVVSSAINADH"
                    target="_blank"
                    className="p-3 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <IconBrandGithub size={24} className="text-blue-400" />
                  </motion.a>
                  <motion.a
                    href="sairesume.pdf"
                    target="_blank"
                    className="p-3 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <IconDownload size={24} className="text-blue-400" />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/30"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-gray-800">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="text-gray-400">
              © 2025 Sainadh Macharla. All rights reserved. Built with ❤️ using
              Next.js
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
