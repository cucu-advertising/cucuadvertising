import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";

import facebookIcon from "../assets/footbar/facebook-icon.svg";
import instagramIcon from "../assets/footbar/instagram-icon.svg";
import linkedinIcon from "../assets/footbar/linkedin-icon.svg";
import whatsappIcon from "../assets/footbar/whatsapp-icon.svg";

export const ContactPage = ({ setPage }) => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-40 pb-24 bg-white text-black px-6 md:px-12"
    >
      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-24">
        <div>
          <h1 className="text-[12vw] font-black uppercase leading-none mb-12 tracking-tighter">
            Let's <br /> Build.
          </h1>
          <div className="space-y-12">
            <div className="flex gap-8 items-start">
              <div className="bg-[#197C48] p-4 rounded-2xl text-black">
                <Mail size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold uppercase tracking-widest mb-2">
                  Email Us
                </h4>
                <p className="text-2xl font-light text-black/60">
                  hello@cucuadvertising.com
                </p>
              </div>
            </div>
            <div className="flex gap-8 items-start">
              <div className="bg-[#197C48] p-4 rounded-2xl text-black">
                <Phone size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold uppercase tracking-widest mb-2">
                  Call Us
                </h4>
                <p className="text-2xl font-light text-black/60">
                  +91 94404 17034
                </p>
              </div>
            </div>
            <div className="flex gap-8 items-start">
              <div className="bg-[#197C48] p-4 rounded-2xl text-black">
                <MapPin size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold uppercase tracking-widest mb-2">
                  Visit Us
                </h4>
                <p className="text-2xl font-light text-black/60">
                  Bangalore • Mumbai • Hyderabad
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#197C48]/5 p-8 md:p-16 rounded-[4rem] border border-[#197C48]/10 shadow-sm">
          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-20"
            >
              <div className="w-24 h-24 bg-[#40F996] rounded-full flex items-center justify-center text-black mb-8">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-4xl font-black uppercase mb-4">Received.</h2>
              <p className="text-xl opacity-70">
                We'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50">
                    What's your name?
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl focus:border-[#197C48] outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50">
                    Your Email?
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl focus:border-[#197C48] outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-50">
                  Tell us about your project
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl focus:border-[#197C48] outline-none transition-colors resize-none"
                  placeholder="I want to build..."
                />
              </div>
              <button
                disabled={status === "submitting"}
                className="w-full bg-[#40F996] text-black font-black uppercase py-8 text-xl tracking-widest hover:bg-[#197C48] transition-all disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-40 grid md:grid-cols-2 gap-12">
        <div className="flex flex-col md:flex-row gap-8 md:items-center">
          <div className="w-1 h-16 bg-[#FFBD12] hidden md:block" />
          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-2 bg-[#197C48] px-4 py-1 inline-block">
              New Business
            </h4>
            <p className="text-2xl text-black font-bold hover:text-[#197C48] transition-colors cursor-pointer">
              hello@cucuadvertising.com
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:items-center">
          <div className="w-1 h-16 bg-[#FFBD12] hidden md:block" />
          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-2 bg-[#197C48] px-4 py-1 inline-block">
              Career Opportunities
            </h4>
            <p className="text-2xl text-black font-bold hover:text-[#197C48] transition-colors cursor-pointer">
              coffee@cucuadvertising.com
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-black leading-tight">
          Ready to start? <br />
          <span className="text-[#197C48]">
            Because once we do, there's no looking back.
          </span>
        </h2>
      </div>

      <div className="bg-[#197C48] p-8 md:p-16 border-t border-black/10 mt-12 rounded-3xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full">
          <div className="flex flex-wrap gap-12 mb-8 md:mb-0">
            {[
              {
                label: "Facebook",
                href: "https://www.facebook.com/profile.php?id=61551579710039",
                icon: facebookIcon,
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/cucuadvertising/",
                icon: instagramIcon,
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/cucuadvertsing/",
                icon: linkedinIcon,
              },
              {
                label: "WhatsApp",
                href: "https://api.whatsapp.com/send?phone=919440417034",
                icon: whatsappIcon,
              },
            ].map((link) => (
              <motion.div
                key={link.label}
                className="relative flex flex-col items-center"
                initial="initial"
                whileHover="hover"
              >
                <motion.span
                  variants={{
                    initial: { opacity: 0, y: 10 },
                    hover: { opacity: 1, y: -45 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute pointer-events-none"
                >
                  <img
                    src={link.icon}
                    alt={link.label}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                </motion.span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
          </div>
          <div className="text-right">
            <p className="font-mono text-sm uppercase font-bold text-white">
              © 2023 Cucu Advertising
            </p>
            <p className="font-mono text-sm uppercase opacity-70 text-white">
              Bangalore • Mumbai • Hyderabad
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
