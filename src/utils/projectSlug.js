// The URL of a project page is built from its title: "ARK Group" -> /project/ark-group
export const projectSlug = (title) =>
  (title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const projectPath = (project) => `/project/${projectSlug(project?.title)}`;
