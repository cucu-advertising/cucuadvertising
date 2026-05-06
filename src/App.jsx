import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
// Components
import { Navbar } from "./components/Navbar";
import { ComingSoon } from "./components/UIComponents";
import Preloader from "./components/Preloader";

// Pages (Lazy Loaded for Speed)
const HomePage = React.lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const WorkPage = React.lazy(() => import("./pages/WorkPage").then(m => ({ default: m.WorkPage })));
const ClientsPage = React.lazy(() => import("./pages/ClientsPage").then(m => ({ default: m.ClientsPage })));
const ServicesPage = React.lazy(() => import("./pages/ServicesPage").then(m => ({ default: m.ServicesPage })));
const AboutPage = React.lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const CareersPage = React.lazy(() => import("./pages/CareersPage").then(m => ({ default: m.CareersPage })));
const ProjectDetailPage = React.lazy(() => import("./pages/ProjectDetailPage").then(m => ({ default: m.ProjectDetailPage })));

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

  // 1. Lenis Smooth Scrolling Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger if possible
    lenis.on('scroll', () => {
      // ScrollTrigger.update();
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Optimized Preloader logic
  useEffect(() => {
    const images = document.querySelectorAll("img");
    const totalImages = images.length;
    let loadedCount = 0;

    // Minimum display time for preloader (for branding)
    const minLoadingTime = 1500;
    const startTime = Date.now();

    const finishLoading = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      setTimeout(() => setIsAppLoading(false), remainingTime);
    };

    if (totalImages === 0) {
      finishLoading();
      return;
    }

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        finishLoading();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener("load", onImageLoad);
        img.addEventListener("error", onImageLoad);
      }
    });

    // Fallback: Max 4 seconds loading for better UX
    const timer = setTimeout(finishLoading, 4000);

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
        <React.Suspense fallback={null}>
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
        </React.Suspense>
      </AnimatePresence>
    </div>
  );
}
