import React from "react";
import { MARK_PATH, MARK_SIZE } from "./logoPaths";

// The CUCU mark as inline SVG so it can take any colour and be animated.
export const CucuMark = ({ className, title, ...rest }) => (
  <svg
    className={className}
    viewBox={`0 0 ${MARK_SIZE} ${MARK_SIZE}`}
    fill="currentColor"
    role={title ? "img" : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    {...rest}
  >
    <path d={MARK_PATH} fillRule="evenodd" />
  </svg>
);
