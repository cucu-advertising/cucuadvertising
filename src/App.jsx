import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
// Components
import { Navbar } from "./components/Navbar";
import { Intro } from "./components/Intro";
import { onIntroDone } from "./motion/core";
import { ComingSoon } from "./components/UIComponents";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allProjects } from "./constants/projects";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Pages (Lazy Loaded for Speed)
const HomePage = React.lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const WorkPage = React.lazy(() => import("./pages/WorkPage").then(m => ({ default: m.WorkPage })));
const ShowcasePage = React.lazy(() => import("./pages/ShowcasePage").then(m => ({ default: m.ShowcasePage })));
const ClientsPage = React.lazy(() => import("./pages/ClientsPage").then(m => ({ default: m.ClientsPage })));
const ServicesPage = React.lazy(() => import("./pages/ServicesPage").then(m => ({ default: m.ServicesPage })));
const AboutPage = React.lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const CareersPage = React.lazy(() => import("./pages/CareersPage").then(m => ({ default: m.CareersPage })));
const JobPage = React.lazy(() => import("./pages/JobPage").then(m => ({ default: m.JobPage })));
const ProjectDetailPage = React.lazy(() => import("./pages/ProjectDetailPage").then(m => ({ default: m.ProjectDetailPage })));

const createSlug = (title) => {
  if (!title) return "";
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

function ProjectRouteWrapper({ setPage, setSelectedProject, latestProjectRef }) {
  const { slug } = useParams();
  const project = allProjects.find(p => createSlug(p.title) === slug);

  useEffect(() => {
    if (project) {
      latestProjectRef.current = project;
      setSelectedProject(project);
    }
  }, [project, setSelectedProject, latestProjectRef]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <ProjectDetailPage
      project={project}
      onBack={() => setPage("work")}
      setPage={setPage}
      setSelectedProject={setSelectedProject}
    />
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedProject, setSelectedProject] = useState(() => {
    const saved = localStorage.getItem("cta_current_project");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const latestProjectRef = useRef(selectedProject);
  const handleSetSelectedProject = (proj) => {
    latestProjectRef.current = proj;
    setSelectedProject(proj);
  };

  // Map active location back to semantic 'page' strings for Navbar active triggers
  let page = "home";
  const path = location.pathname;
  if (path.startsWith("/work")) page = "work";
  else if (path.startsWith("/showcase")) page = "showcase";
  else if (path.startsWith("/services")) page = "services";
  else if (path.startsWith("/about")) page = "about";
  else if (path.startsWith("/clients")) page = "clients";
  else if (path.startsWith("/contact")) page = "contact";
  else if (path.startsWith("/careers")) page = "careers";
  else if (path.startsWith("/team")) page = "team";
  else if (path.startsWith("/project")) page = "project-detail";

  // Persistence Hook
  useEffect(() => {
    localStorage.setItem("cta_current_page", page);
    if (selectedProject) {
      localStorage.setItem("cta_current_project", JSON.stringify(selectedProject));
    } else {
      localStorage.removeItem("cta_current_project");
    }
  }, [page, selectedProject]);

  // Intercept setPage navigation triggers cleanly
  const setPage = (targetPage) => {
    if (targetPage === "home") navigate("/");
    else if (targetPage === "work") navigate("/work");
    else if (targetPage === "showcase") navigate("/showcase");
    else if (targetPage === "services") navigate("/services");
    else if (targetPage === "about") navigate("/about");
    else if (targetPage === "clients") navigate("/clients");
    else if (targetPage === "contact") navigate("/contact");
    else if (targetPage === "careers") navigate("/careers");
    else if (targetPage === "team") navigate("/team");
    else if (targetPage === "project-detail") {
      const proj = latestProjectRef.current;
      if (proj) {
        navigate(`/project/${createSlug(proj.title)}`);
      } else {
        navigate("/work");
      }
    } else {
      navigate(`/${targetPage}`);
    }
  };

  // 1. Lenis Smooth Scrolling Initialization with GSAP Sync
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Store lenis on window for global access (useful for scroll locking in components)
    window.lenis = lenis;

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis's RAF loop
    const tick = (time) => lenis.raf(time * 1000); // convert to milliseconds
    gsap.ticker.add(tick);

    // The opening sequence holds the page still until its curtain lifts.
    if (document.documentElement.classList.contains("intro-lock")) lenis.stop();

    // Optional: Reset ScrollTrigger on refresh
    ScrollTrigger.refresh();

    // Lenis wants lag smoothing off, but while the opening plays a busy main
    // thread must not make its timeline jump ahead — so switch once it is done.
    const offIntro = onIntroDone(() => gsap.ticker.lagSmoothing(0));

    return () => {
      offIntro();
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Set loaded state immediately
  useEffect(() => {
    window.__cucuLoaded = true;
    window.dispatchEvent(new Event("cucu:loaded"));
  }, []);

  // Every new page starts at the top. Lenis keeps its own scroll target, so a
  // plain window.scrollTo isn't enough if the old page was still gliding —
  // stop Lenis and jump it to 0 too. Runs on the route change and again once
  // the old page has finished fading out and the new one is mounted.
  const scrollToTop = useCallback(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [location.pathname, scrollToTop]);

  return (
    <div className="font-sans bg-[#050505] min-h-screen text-[#F0F0F0] selection:bg-[#8CF2C6] selection:text-[#050505] overflow-x-clip">
      <Intro />
      <Navbar />

      <div id="main">
      <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
        <React.Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage setPage={setPage} setSelectedProject={handleSetSelectedProject} />} />
            <Route path="/work" element={<WorkPage setPage={setPage} setSelectedProject={handleSetSelectedProject} />} />
            <Route path="/showcase" element={<ShowcasePage key="showcase" setPage={setPage} />} />
            <Route path="/services" element={<ServicesPage key="services" setPage={setPage} />} />
            <Route path="/about" element={<AboutPage key="about" setPage={setPage} />} />
            <Route path="/clients" element={<ClientsPage key="clients" setPage={setPage} />} />
            <Route path="/contact" element={<ContactPage key="contact" setPage={setPage} />} />
            <Route path="/team" element={<ComingSoon key="team" title="Our Team" onBack={() => setPage("home")} />} />
            <Route path="/careers" element={<CareersPage key="careers" setPage={setPage} />} />
            <Route path="/careers/:slug" element={<JobPage />} />
            <Route path="/project/:slug" element={<ProjectRouteWrapper setPage={setPage} setSelectedProject={handleSetSelectedProject} latestProjectRef={latestProjectRef} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
