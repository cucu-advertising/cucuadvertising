import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BigFooter } from "../components/Footer";
import {
  X,
  MapPin,
  Briefcase,
  Clock,
  ChevronRight,
  Upload,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";

const heroContent = {
  MAFIA: {
    title: "MAFIA",
    text: "Since we value individuality, creativity, originality and a lil bit of a lot of quirkiness, we promise we will value that... at times more than we value you!",
  },
  HOW: {
    title: "HOW",
    text: "Would you be the good old Thakur who's remembered only in Gabbar's dialogues or would you rather be Gabbar himself whose name is scary enough to put children to sleep, and whose iconic character is sought after by heroes even till date?",
  },
  WHY: {
    title: "WHY",
    text: "Cause we know how frustrating it is to sit for long hours in boring corporate office cubicles, doing the same thing over and over again, and still going unnoticed, forget getting recognition!",
  },
  WHAT: {
    title: "WHAT",
    text: "If you don't want to be a dead fish going with the flow, why won't you drop us a mail? We will get back to you and see what you have got to show.",
  },
};

const jobOpenings = [
  {
    id: 1,
    title: "Associate Brand Solutions Manager",
    location: "Bangalore",
    type: "Permanent",
    department: "Brand Solutions",
    experience: "1-2 years",
    description:
      "We are looking for a creative and strategic thinker to join our Brand Solutions team. You will be responsible for building relationships with clients and delivering innovative marketing solutions.",
  },
  {
    id: 2,
    title: "Associate Graphic Designer",
    location: "Bangalore",
    type: "Permanent",
    department: "Art",
    experience: "0-2 years",
    description:
      "Join our design team to create stunning visuals for globally recognized brands. Experience with Adobe Creative Suite is a must.",
  },
  {
    id: 3,
    title: "Associate Group Head - Copy",
    location: "Bangalore",
    type: "Permanent",
    department: "Copy",
    experience: "6-8 years",
    description:
      "Lead our creative copy team and craft compelling narratives that resonate with diverse audiences.",
  },
  {
    id: 4,
    title: "Paid Media Specialist",
    location: "Mumbai",
    type: "Permanent",
    department: "Performance Marketing",
    experience: "2-4 years",
    description:
      "Optimize digital ad campaigns across various platforms to drive measurable results for our clients.",
  },
  {
    id: 5,
    title: "Frontend Developer (React)",
    location: "Gurgaon",
    type: "Permanent",
    department: "Tech",
    experience: "3-5 years",
    description:
      "Build high-performance, cinematic web experiences using React and modern CSS frameworks.",
  },
];

const locations = ["Bangalore", "Gurgaon", "Mumbai"];

export const CareersPage = ({ setPage }) => {
  const [activeLocation, setActiveLocation] = useState("Bangalore");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeWord, setActiveWord] = useState("MAFIA");

  const filteredJobs = jobOpenings.filter(
    (job) => job.location === activeLocation,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen font-sans"
    >
      {/* Navbar Spacer */}
      <div className="h-[100px] md:h-[30px]" />

      {/* Hero Section - Bold Yellow Styling */}
      <section className="bg-[#ffffff] py-24 md:py-37 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col">
              {Object.keys(heroContent).map((word) => (
                <motion.div
                  key={word}
                  onMouseEnter={() => setActiveWord(word)}
                  className="cursor-pointer group relative"
                >
                  <h2
                    className={`text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase transition-all duration-500 ${
                      activeWord === word ? "text-black" : "text-transparent"
                    }`}
                    style={{
                      WebkitTextStroke:
                        activeWord === word ? "none" : "2px black",
                    }}
                  >
                    {word}
                  </h2>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.div
              key={activeWord}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#197C48] p-8 md:p-12 rounded-[3.5rem] relative shadow-2xl min-h-[300px] flex items-center"
            >
              {/* Speech bubble arrow */}
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#FFD200] rotate-45 hidden md:block" />

              <AnimatePresence mode="wait">
                <motion.p
                  key={activeWord}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xl md:text-2xl font-medium leading-relaxed text-[#ffffff]"
                >
                  {heroContent[activeWord].text}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#197C48]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black mb-12">
              Current Openings
            </h2>

            {/* Location Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setActiveLocation(loc)}
                  className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                    activeLocation === loc
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4 max-w-5xl mx-auto">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-[#f8f9fa] hover:bg-white p-8 md:p-10 rounded-[2rem] border border-transparent hover:border-gray-100 hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-black mb-2 group-hover:text-[#197C48] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-gray-400 text-xs font-black uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} /> {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        ({job.experience})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="bg-[#FFD200] hover:bg-black hover:text-white text-black px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2">
                      View Details <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-[3rem]">
                <p className="text-gray-400 italic">
                  No openings currently in {activeLocation}. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal - Job Details & Application */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedJob(null);
                setShowForm(false);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setShowForm(false);
                }}
                className="absolute top-8 right-8 z-10 p-2 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-all"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-16 overflow-y-auto custom-scrollbar">
                {!showForm ? (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 text-[#197C48] font-black text-xs uppercase tracking-[.2em] mb-4">
                        <Briefcase size={14} /> Open Position
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-4">
                        {selectedJob.title}
                      </h2>
                      <div className="flex gap-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
                        <span>{selectedJob.location}</span>
                        <span>•</span>
                        <span>{selectedJob.type}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-widest text-[#197C48] mb-4">
                            Position Overview
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {selectedJob.description}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-widest text-[#197C48] mb-4">
                            Experience Required
                          </h4>
                          <p className="text-gray-600 leading-relaxed font-bold">
                            {selectedJob.experience}
                          </p>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-gray-100">
                        <h4 className="text-xs font-black uppercase tracking-widest text-black mb-6 italic">
                          Why CUCU Advertising?
                        </h4>
                        <p className="text-gray-500 italic leading-relaxed">
                          We are a team of passionate thinkers, creators, and
                          strategists who thrive on turning 'ideas' into
                          reality. Join us if you want to push boundaries and
                          build something that matters.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-[#197C48] hover:bg-black text-white py-6 rounded-2xl text-sm font-black uppercase tracking-widest transition-all"
                    >
                      Apply for this Job
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                      <h2 className="text-3xl font-black uppercase tracking-tight text-black">
                        Apply for the Job
                      </h2>
                    </div>

                    <form className="space-y-8">
                      <div className="space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-black">
                          Resume <span className="text-red-500">*</span>
                        </p>
                        <div className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#197C48] transition-all cursor-pointer group">
                          <Upload className="mx-auto mb-4 text-gray-400 group-hover:text-[#197C48] transition-colors" />
                          <p className="text-sm font-bold text-gray-500">
                            Choose File
                          </p>
                          <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
                            PDF, DOC, DOCX | MAX 5MB
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-100 focus:border-[#197C48] py-2 outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-100 focus:border-[#197C48] py-2 outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Email ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            className="w-full border-b-2 border-gray-100 focus:border-[#197C48] py-2 outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Mobile Number{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            className="w-full border-b-2 border-gray-100 focus:border-[#197C48] py-2 outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            LinkedIn ID
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-100 focus:border-[#197C48] py-2 outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Portfolio Link
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-100 focus:border-[#197C48] py-2 outline-none transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div className="pt-8 flex flex-col md:flex-row gap-4">
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 py-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();
                            alert("Application sent!");
                          }}
                          className="flex-[2] bg-[#197C48] hover:bg-black text-white py-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
