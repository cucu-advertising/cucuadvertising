// Careers — the single source of truth for the job board.
//
// TO ADD A ROLE: copy one object below, change the fields, set `open: true`.
// TO CLOSE A ROLE: set `open: false` (or delete the object).
// The Careers page, the filters, the job page at /careers/<slug>, the
// application form and the Google job listing data all read from this list.
//
// Fields
//   id               unique, never reused
//   slug             the URL: /careers/<slug>
//   title            job title
//   department       one of DEPARTMENTS (add to the list to create a new one)
//   type             one of TYPES
//   location         city, as people would say it
//   workMode         "On-site" | "Hybrid" | "Remote"
//   experience       optional, e.g. "1–2 years"
//   summary          one or two sentences shown under the title
//   description      paragraphs introducing the role
//   responsibilities bullet list
//   requirements     bullet list
//   applyUrl         null = use the built-in application form;
//                    or a full URL to send applicants somewhere else
//   datePosted       YYYY-MM-DD, used for the Google job listing
//   open             true = published, false = hidden everywhere

export const DEPARTMENTS = ["Design", "Development", "Marketing", "Strategy", "Content", "Films", "Operations"];
export const TYPES = ["Full-time", "Part-time", "Internship", "Contract"];

export const jobs = [
  // ---------------------------------------------------------------------
  // The four roles below came from the previous Careers page. They are
  // CLOSED (open: false) because they have not been confirmed as current
  // vacancies. The responsibilities and requirements are placeholder
  // wording — review and rewrite them before setting `open: true`.
  // ---------------------------------------------------------------------
  {
    id: "brand-solutions-manager",
    slug: "associate-brand-solutions-manager",
    title: "Associate Brand Solutions Manager",
    department: "Strategy",
    type: "Full-time",
    location: "Bangalore",
    workMode: "On-site",
    experience: "1–2 years",
    summary: "Build relationships with clients and turn what they need into work that gets noticed.",
    description: [
      "We are looking for a creative and strategic thinker to join our Brand Solutions team. You will be responsible for building relationships with clients and delivering innovative marketing solutions.",
    ],
    responsibilities: [
      "Be the day-to-day point of contact for a set of client accounts.",
      "Turn client conversations into clear briefs for the creative team.",
      "Keep projects moving: timelines, feedback and delivery.",
    ],
    requirements: [
      "1–2 years in an agency, brand or client-facing role.",
      "Clear writing and confident presenting.",
      "Curiosity about how brands grow.",
    ],
    applyUrl: null,
    datePosted: "2026-11-11",
    open: false,
  },
  {
    id: "graphic-designer",
    slug: "associate-graphic-designer",
    title: "Associate Graphic Designer",
    department: "Design",
    type: "Full-time",
    location: "Bangalore",
    workMode: "On-site",
    experience: "0–2 years",
    summary: "Design identities, campaigns and social content for brands that want to be remembered.",
    description: [
      "Join our design team to create stunning visuals for globally recognized brands. Experience with Adobe Creative Suite is a must.",
    ],
    responsibilities: [
      "Design across brand identity, campaigns and social content.",
      "Work with writers and strategists from the brief to the final file.",
      "Prepare artwork for print and digital production.",
    ],
    requirements: [
      "A portfolio that shows how you think, not only what you made.",
      "Working knowledge of Adobe Creative Suite.",
      "An eye for typography and layout.",
    ],
    applyUrl: null,
    datePosted: "2026-11-11",
    open: false,
  },
  {
    id: "group-head-copy",
    slug: "associate-group-head-copy",
    title: "Associate Group Head – Copy",
    department: "Content",
    type: "Full-time",
    location: "Bangalore",
    workMode: "On-site",
    experience: "6–8 years",
    summary: "Lead the copy team and shape the voice of the brands we work with.",
    description: [
      "Lead our creative copy team and craft compelling narratives that resonate with diverse audiences.",
    ],
    responsibilities: [
      "Lead and mentor a team of writers.",
      "Own the voice and the big idea on campaigns.",
      "Present and defend creative work with clients.",
    ],
    requirements: [
      "6–8 years of copywriting experience, some of it leading others.",
      "A portfolio of campaigns across film, digital and print.",
      "The patience to rewrite until it is right.",
    ],
    applyUrl: null,
    datePosted: "2026-11-11",
    open: false,
  },
  {
    id: "paid-media-specialist",
    slug: "paid-media-specialist",
    title: "Paid Media Specialist",
    department: "Marketing",
    type: "Full-time",
    location: "Mumbai",
    workMode: "On-site",
    experience: "2–4 years",
    summary: "Plan, run and improve paid campaigns that deliver results clients can measure.",
    description: [
      "Optimize digital ad campaigns across various platforms to drive measurable results for our clients.",
    ],
    responsibilities: [
      "Plan and run campaigns on Meta Ads and Google Ads.",
      "Test creative and audiences, and act on what the numbers say.",
      "Report results in plain language.",
    ],
    requirements: [
      "2–4 years of hands-on paid media experience.",
      "Comfort with analytics and attribution.",
      "A habit of testing before assuming.",
    ],
    applyUrl: null,
    datePosted: "2026-11-11",
    open: false,
  },
];

// Where the built-in form sends applications (the existing Laravel backend).
export const APPLICATION_ENDPOINT = "https://cucuadvertising.com/backend/public/api/career";

// The slug used for the general, no-specific-role application.
export const GENERAL_SLUG = "apply";

// --- Preview -------------------------------------------------------------
// Open any careers URL with ?preview once to see closed roles too, so a role
// can be reviewed before it is published. It lasts for the browser tab and
// can be switched off with ?preview=off. Closed roles never accept
// applications and are never announced to search engines.
const PREVIEW_KEY = "cucu-jobs-preview";

export const previewMode = () => {
  if (typeof window === "undefined") return false;
  try {
    const param = new URLSearchParams(window.location.search).get("preview");
    if (param === "off") sessionStorage.removeItem(PREVIEW_KEY);
    else if (param !== null) sessionStorage.setItem(PREVIEW_KEY, "1");
    return sessionStorage.getItem(PREVIEW_KEY) === "1";
  } catch {
    return false;
  }
};

export const visibleJobs = () => {
  const preview = previewMode();
  return jobs.filter((job) => job.open || preview);
};

export const findJob = (slug) => visibleJobs().find((job) => job.slug === slug) || null;

// Both filters together. "All" (or nothing) means no restriction.
export const filterJobs = (list, { department = "All", type = "All" } = {}) =>
  list.filter(
    (job) => (department === "All" || job.department === department) && (type === "All" || job.type === type),
  );

// Only offer filter options that at least one listed role actually has.
export const filterOptions = (list, key, order) => ["All", ...order.filter((value) => list.some((job) => job[key] === value))];

export const jobMeta = (job) => [job.type, job.department, job.location, job.workMode].filter(Boolean);
