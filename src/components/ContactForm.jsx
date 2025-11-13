"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Auto-hide success/error message after 5 seconds
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setResult(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const now = new Date();
    const time = now.toLocaleString();

    emailjs
      .sendForm(
        "service_iyxzbhk",
        "template_m5o8jdg",
        form.current,
        "h2vl_PxAEuqqadanv",
        { time }
      )
      .then(
        () => {
          setResult({ success: true, message: "Message sent successfully!" });
          form.current.reset();
        },
        () => {
          setResult({
            success: false,
            message: "Failed to send message. Please try again.",
          });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">Name</label>
        <input
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF]/60
 transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-white font-medium mb-2">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF]/60
 transition-colors"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label className="block text-white font-medium mb-2">Subject</label>
        <input
          name="title"
          type="text"
          required
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF]/60
 transition-colors"
          placeholder="Subject"
        />
      </div>
      <div>
        <label className="block text-white font-medium mb-2">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF]/60
 transition-colors resize-none"
          placeholder="Tell me about your project..."
        />
      </div>
      <motion.button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-[#007BFF] via-[#6F00FF] to-[#7A00FF] text-white font-semibold rounded-lg hover:opacity-90 shadow-[0_0_20px_rgba(0,123,255,0.6)] transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Message"}
      </motion.button>
      {result && (
        <div
          className={`mt-4 text-center font-medium ${
            result.success ? "text-[#00FFFF]" : "text-[#FF4B91]"
          }`}
        >
          {result.message}
        </div>
      )}
    </form>
  );
}
