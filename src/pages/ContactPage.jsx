import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";

import facebookIcon from "../assets/footbar/facebook-icon.svg";
import instagramIcon from "../assets/footbar/instagram-icon.svg";
import linkedinIcon from "../assets/footbar/linkedin-icon.svg";
import whatsappIcon from "../assets/footbar/whatsapp-icon.svg";

export const ContactPage = ({ setPage }) => {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business_mobile: "",
    company_name: "",
    about_business: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(
        "https://cucuadvertising.com/backend/public/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            business_mobile: formData.business_mobile,
            company_name: formData.company_name,
            about_business: formData.about_business,
          }),
        },
      );

      if (response.ok) {
        setStatus("success");
        Swal.fire({
          title: "Received!",
          text: "Thank you for reaching out! We will get back to you shortly.",
          icon: "success",
          background: "#ffffff",
          confirmButtonColor: "#197C48",
          customClass: {
            popup: "rounded-[2rem]",
            confirmButton:
              "rounded-xl font-bold uppercase tracking-widest px-8 py-3",
          },
        });
        setFormData({
          name: "",
          email: "",
          business_mobile: "",
          company_name: "",
          about_business: "",
        });
      } else {
        const errorData = await response.json();
        setStatus("error");

        // Format detailed validation errors
        let errorHint = "Something went wrong. Please try again.";
        if (errorData.errors) {
          errorHint = Object.values(errorData.errors).flat().join("\n");
        } else if (errorData.message) {
          errorHint = errorData.message;
        }

        Swal.fire({
          title: "Note",
          text: errorHint,
          icon: "error",
          background: "#ffffff",
          confirmButtonColor: "#197C48",
          customClass: {
            popup: "rounded-[2rem]",
            confirmButton:
              "rounded-xl font-bold uppercase tracking-widest px-8 py-3",
          },
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      Swal.fire({
        title: "Error",
        text: "Could not connect to the server. Please check your connection.",
        icon: "error",
        background: "#ffffff",
        confirmButtonColor: "#197C48",
        customClass: {
          popup: "rounded-[2rem]",
          confirmButton:
            "rounded-xl font-bold uppercase tracking-widest px-8 py-3",
        },
      });
    }
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
          <h1 className="text-[12vw] font-black uppercase leading-none mb-12 tracking-tighter text-[#197C48]">
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
                <a
                  href="mailto:coffee@cucuadvertising.com"
                  className="text-2xl font-light text-black/60 hover:text-[#197C48] transition-colors"
                >
                  coffee@cucuadvertising.com
                </a>
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
                <a
                  href="tel:+919440417034"
                  className="text-2xl font-light text-black/60 hover:text-[#197C48] transition-colors"
                >
                  +91 94404 17034
                </a>
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
                  Hyderabad • Mumbai
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#197C48]/5 p-8 md:p-16 rounded-[4rem] border border-[#197C48]/10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-[#197C48]">
                  What's your name?
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl focus:border-[#197C48] outline-none transition-all placeholder:text-slate-300"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-[#197C48]">
                  Your Email?
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl focus:border-[#197C48] outline-none transition-all placeholder:text-slate-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-[#197C48]">
                  Mobile Number
                </label>
                <input
                  required
                  type="tel"
                  name="business_mobile"
                  value={formData.business_mobile}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl focus:border-[#197C48] outline-none transition-all placeholder:text-slate-300"
                  placeholder="+91 00000 00000"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-[#197C48]">
                  Company Name
                </label>
                <input
                  required
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl focus:border-[#197C48] outline-none transition-all placeholder:text-slate-300"
                  placeholder="CUCU Advertising"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-[#197C48]">
                Tell us about your project
              </label>
              <textarea
                required
                rows={4}
                name="about_business"
                value={formData.about_business}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl focus:border-[#197C48] outline-none transition-all resize-none placeholder:text-slate-300"
                placeholder="I want to build..."
              />
            </div>
            <button
              disabled={status === "submitting"}
              className="w-full bg-[#197C48] text-white font-black uppercase py-8 text-xl tracking-widest hover:bg-black transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 group"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="animate-spin text-[#40F996]" />
                  <span className="text-[#40F996]">Sending...</span>
                </>
              ) : (
                <>
                  Send Message
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <CheckCircle className="text-[#40F996]" />
                  </motion.div>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-40 grid md:grid-cols-2 gap-12">
        <div className="flex flex-col md:flex-row gap-8 md:items-center">
          <div className="w-1 h-16 bg-[#FFBD12] hidden md:block" />
          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-2 bg-[#197C48] px-4 py-1 inline-block">
              New Business
            </h4>
            <a
              href="mailto:coffee@cucuadvertising.com"
              className="text-2xl text-black font-bold hover:text-[#197C48] transition-colors cursor-pointer block"
            >
              coffee@cucuadvertising.com
            </a>
          </div>
        </div>
        {/* <div className="flex flex-col md:flex-row gap-8 md:items-center">
          <div className="w-1 h-16 bg-[#FFBD12] hidden md:block" />
          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-2 bg-[#197C48] px-4 py-1 inline-block">
              Career Opportunities
            </h4>
            <p className="text-2xl text-black font-bold hover:text-[#197C48] transition-colors cursor-pointer">
              coffee@cucuadvertising.com
            </p>
          </div>
        </div> */}
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
              © 2026 Cucu Advertising
            </p>
            <p className="font-mono text-sm uppercase opacity-70 text-white">
              Hyderabad • Mumbai
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
