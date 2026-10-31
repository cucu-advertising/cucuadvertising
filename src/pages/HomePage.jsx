import React from "react";
import { motion } from "framer-motion";
import useTabAttention from "../hooks/useTabAttention";

import { WebsiteHome } from "../components/website/WebsiteHome";

// Homepage mirrors cucu-website's app/page.tsx (see components/website/).
export const HomePage = () => {
  useTabAttention("Cucu Advertising | Home");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
     <WebsiteHome />
    </motion.div>
  );
};
