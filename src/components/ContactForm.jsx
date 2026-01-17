"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Auto-hide success/error message after 5 seconds
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setResult(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setResult({ success: true, message: "Message sent successfully!" });
        form.current.reset();
      })
      .catch(() => {
        setResult({
          success: false,
          message: "Failed to send message. Please try again later.",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-6">
      
      {/* Honeypot field (anti-spam) */}
      <input
        type="text"
        name="company"
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />

      <div>
        <label className="block text-white font-medium mb-2">Name</label>
        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF]/60 transition-colors"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF]/60 transition-colors"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Subject</label>
        <input
          name="title"
          type="text"
          required
          placeholder="Subject"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF]/60 transition-colors"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project..."
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#007BFF]/60 transition-colors resize-none"
        />
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-gradient-to-r from-[#007BFF] via-[#6F00FF] to-[#7A00FF] text-white font-semibold rounded-lg hover:opacity-90 shadow-[0_0_20px_rgba(0,123,255,0.6)] transition-all duration-300"
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
