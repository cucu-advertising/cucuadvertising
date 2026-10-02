// Maps a public cover image (e.g. "/Clientwork/x/y.webp") to its right-sized
// copy made by scripts/optimize-images.mjs. Anything else (imported assets,
// remote URLs, videos) is returned unchanged.
// Safety net: if a right-sized copy is missing (e.g. a new image was added and
// `npm run optimize-images` wasn't re-run), fall back to the original file.
if (typeof window !== "undefined" && !window.__optimizedFallback) {
  window.__optimizedFallback = true;
  window.addEventListener(
    "error",
    (e) => {
      const el = e.target;
      if (el?.tagName === "IMG" && /\/optimized\/w\d+\//.test(el.src) && !el.dataset.fellBack) {
        el.dataset.fellBack = "1";
        el.src = el.src.replace(/\/optimized\/w\d+\//, "/");
      }
    },
    true
  );
}

export const optimizedSrc = (src, width = 1200) => {
  if (typeof src !== "string") return src;
  // Remote image CDNs can resize on request — ask for the size we display.
  if (src.startsWith("https://images.unsplash.com/")) {
    const u = new URL(src);
    u.searchParams.set("w", String(width));
    u.searchParams.set("q", "75");
    u.searchParams.set("auto", "format");
    return u.toString();
  }
  if (src.startsWith("https://cdn.sanity.io/images/")) {
    const u = new URL(src);
    u.searchParams.set("w", String(width));
    u.searchParams.set("q", "78");
    u.searchParams.set("auto", "format");
    return u.toString();
  }
  if (!src.startsWith("/") || src.startsWith("/optimized/")) return src;
  if (!/\.(webp|jpe?g|png)$/i.test(src)) return src;
  return `/optimized/w${width}${src.replace(/\.(jpe?g|png)$/i, ".webp")}`;
};

// Image for a project shown in a list/grid/card: its small `thumb` if it has
// one, otherwise a right-sized copy of its cover.
export const projectThumb = (project, width = 1200) =>
  project?.thumb ?? optimizedSrc(project?.img ?? project?.image, width);
