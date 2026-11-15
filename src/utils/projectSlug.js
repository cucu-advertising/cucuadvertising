// The URL of a project page is built from its title: "ARK Group" -> /project/ark-group
export const projectSlug = (title) =>
  (title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// A project can name its own address with `slug` (used where the title has
// punctuation, e.g. "Harry’s New York" -> /project/harrys-new-york).
export const projectPath = (project) => `/project/${project?.slug || projectSlug(project?.title)}`;
