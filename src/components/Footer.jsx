import React from "react";
import { SiteFooter } from "./SiteFooter";

// Every page closes with the same footer. `BigFooter` keeps its old name and
// props so existing pages do not need to change.
export const BigFooter = () => <SiteFooter />;

export const StandardFooterContent = () => null;
