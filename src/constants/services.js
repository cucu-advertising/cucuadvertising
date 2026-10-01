// Service list shared by the Services page and the home-page accordion.
import adFilmImg from "../assets/services/Ad film.webp";
import videoEditingImg from "../assets/services/Video Editing and motion graphics.webp";
import contentWritingImg from "../assets/services/content writing.webp";
import performanceMarketingImg from "../assets/services/performance marketing.webp";
import seoImg from "../assets/services/seo.webp";
import socialMediaImg from "../assets/services/social media marketing.webp";
import webDevImg from "../assets/services/web development.webp";

export const services = [
  {
    id: "social",
    title: "Social Media Marketing",
    headlineHighlight: "Building digital communities",
    headlineRest:
      " through authentic conversations and data-driven engagement strategies.",
    description:
      "Content that sparks interaction.\nTurn casual followers into lifelong brand advocates.",
    cta: "Know more",
    image: socialMediaImg,
    thumb: socialMediaImg,
  },
  {
    id: "performance",
    title: "Performance Marketing",
    headlineHighlight: "Maximizing your ROI",
    headlineRest: " with data-driven growth and precision targeting.",
    description:
      "Data is our compass.\nWe scale your business with precision and targeted action.",
    cta: "Know more",
    image: performanceMarketingImg,
    thumb: performanceMarketingImg,
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    headlineHighlight: "Dominating search",
    headlineRest: " with ethical strategies and high-ranking authority.",
    description:
      "Visibility meets relevance.\nWe build authority that converts searchers into loyal customers.",
    cta: "Know more",
    image: seoImg,
    thumb: seoImg,
  },
  {
    id: "content",
    title: "Content Creation",
    headlineHighlight: "Storytelling that connects",
    headlineRest: " and drives emotional action through every platform.",
    description:
      "From compelling copy to stunning visuals.\nWe craft narratives that people want to consume.",
    cta: "Know more",
    image: contentWritingImg,
    thumb: contentWritingImg,
  },
  {
    id: "adfilms",
    title: "Ad Films",
    headlineHighlight: "Cinematic impact",
    headlineRest: " designed to tell your brand's unique visual story.",
    description:
      "High-end production meets strategy.\nWe create visual experiences that leave a lasting mark.",
    cta: "Know more",
    image: adFilmImg,
    thumb: adFilmImg,
  },
  {
    id: "videoediting",
    title: "Video Editing & Motion Graphics",
    headlineHighlight: "Dynamic visuals",
    headlineRest: " that capture attention and bring your narrative to life.",
    description:
      "Seamless motion and high-impact graphics.\nCreating compelling visual experiences for your brand.",
    cta: "Know more",
    image: videoEditingImg,
    thumb: videoEditingImg,
  },
  {
    id: "webdevelopment",
    title: "Web Development",
    headlineHighlight: "Digital architectures",
    headlineRest: " built for scale, performance, and seamless experiences.",
    description:
      "Future-ready web solutions.\nBridging the gap between complex functionality and sleek design.",
    cta: "Know more",
    image: webDevImg,
    thumb: webDevImg,
  },
];
