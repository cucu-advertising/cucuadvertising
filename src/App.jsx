import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
// Components
import { Navbar } from "./components/Navbar";
import { ComingSoon } from "./components/UIComponents";
import Preloader from "./components/Preloader";

// Pages
import { HomePage } from "./pages/HomePage";
import { WorkPage } from "./pages/WorkPage";
import { ClientsPage } from "./pages/ClientsPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CareersPage } from "./pages/CareersPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

export default function App() {
  // Persistence Initialization
  const [page, setPage] = useState(() => {
    return localStorage.getItem("cta_current_page") || "home";
  });
  
  const [selectedProject, setSelectedProject] = useState(() => {
    const saved = localStorage.getItem("cta_current_project");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAppLoading, setIsAppLoading] = useState(true);

  // Persistence Hook
  useEffect(() => {
    localStorage.setItem("cta_current_page", page);
    if (selectedProject) {
      localStorage.setItem("cta_current_project", JSON.stringify(selectedProject));
    } else {
      localStorage.removeItem("cta_current_project");
    }
  }, [page, selectedProject]);

  // Preloader logic: Wait for all images
  useEffect(() => {
    const images = document.querySelectorAll("img");
    const totalImages = images.length;
    let loadedCount = 0;

    if (totalImages === 0) {
      setIsAppLoading(false);
      return;
    }

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        // Slight delay for smoothness
        setTimeout(() => setIsAppLoading(false), 500);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener("load", onImageLoad);
        img.addEventListener("error", onImageLoad); // Count errors too to avoid infinite loading
      }
    });

    // Fallback: Max 10 seconds loading
    const timer = setTimeout(() => setIsAppLoading(false), 10000);

    return () => {
      clearTimeout(timer);
      images.forEach((img) => {
        img.removeEventListener("load", onImageLoad);
        img.removeEventListener("error", onImageLoad);
      });
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="font-sans bg-[#050505] min-h-screen text-[#F0F0F0] selection:bg-[#8CF2C6] selection:text-[#050505] overflow-x-hidden noise">
      <Preloader isLoading={isAppLoading} />
      <Navbar activePage={page} setPage={setPage} />

      <AnimatePresence mode="wait">
        {page === "home" && (
          <HomePage
            key="home"
            setPage={setPage}
            setSelectedProject={setSelectedProject}
          />
        )}
        {page === "work" && (
          <WorkPage
            key="work"
            setPage={setPage}
            setSelectedProject={setSelectedProject}
          />
        )}
        {page === "services" && (
          <ServicesPage key="services" setPage={setPage} />
        )}
        {page === "about" && <AboutPage key="about" setPage={setPage} />}
        {page === "clients" && <ClientsPage key="clients" setPage={setPage} />}
        {page === "contact" && <ContactPage key="contact" setPage={setPage} />}
        {page === "team" && (
          <ComingSoon
            key="team"
            title="Our Team"
            onBack={() => setPage("home")}
          />
        )}
        {page === "careers" && <CareersPage key="careers" setPage={setPage} />}
        {page === "project-detail" && selectedProject && (
          <ProjectDetailPage
            key="project-detail"
            project={selectedProject}
            onBack={() => setPage("work")}
            setPage={setPage}
            setSelectedProject={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
