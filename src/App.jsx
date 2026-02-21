import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
// Components
import { Navbar } from "./components/Navbar";
import { ComingSoon } from "./components/UIComponents";

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
  const [page, setPage] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="font-sans bg-[#050505] min-h-screen text-[#F0F0F0] selection:bg-[#8CF2C6] selection:text-[#050505] overflow-x-hidden noise">
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}
