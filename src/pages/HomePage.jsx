import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useTabAttention from "../hooks/useTabAttention";

import { Hero } from "../components/sections/Hero";
import { Mission } from "../components/sections/Mission";
import { ProcessSection } from "../components/sections/ProcessSection";
import { AreasOfExpertise } from "../components/sections/AreasOfExpertise";
import { ProjectsColumns } from "../components/sections/ProjectsColumns";
import { StickyProject } from "../components/sections/StickyProject";
import { FAQ } from "../components/UIComponents";
import { BigFooter } from "../components/Footer";

export const HomePage = ({ setPage, setSelectedProject }) => {
  useTabAttention("Cucu Advertising | Home");

  const [modal, setModal] = useState({ active: false, index: null });
  const modalContainer = useRef(null);
  const projects = [
    {
      title: "Arbor Road",
      category: "Eco-Luxury",
      img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Neon Bank",
      category: "Fintech",
      img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Vortex",
      category: "Web3",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
    },
  ];

  const services = [
    {
      title: "Strategy",
      items: ["Brand Identity", "Content", "SEO", "Market Research"],
    },
    { title: "Design", items: ["UI/UX", "Motion", "3D", "Art Direction"] },
    { title: "Tech", items: ["React", "WebGL", "Native Apps", "E-Commerce"] },
  ];

  useEffect(() => {
    const moveContainerX = (x) => {
      if (modalContainer.current) modalContainer.current.style.left = `${x}px`;
    };
    const moveContainerY = (y) => {
      if (modalContainer.current) modalContainer.current.style.top = `${y}px`;
    };
    const handleMove = (e) => {
      moveContainerX(e.clientX);
      moveContainerY(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const [expandedService, setExpandedService] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setPage("project-detail");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero setPage={setPage} />
      <Mission />
      {/* <AreasOfExpertise /> */}
      <ProcessSection />
      <ProjectsColumns />
      <FAQ />
      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
