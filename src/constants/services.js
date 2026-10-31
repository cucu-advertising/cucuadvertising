// Service list shared by the Services page and the home-page accordion.
import adFilmImg from "../assets/services/Ad film.webp";
import contentWritingImg from "../assets/services/content writing.webp";
import performanceMarketingImg from "../assets/services/performance marketing.webp";
import seoImg from "../assets/services/seo.webp";
import socialMediaImg from "../assets/services/social media marketing.webp";
import webDevImg from "../assets/services/web development.webp";

export const services = [
  {
    id: "social",
    title: "Social Media Marketing",
    headlineHighlight: "We create content and conversations",
    headlineRest: " that give people a reason to stick around.",
    cta: "Know more",
    image: socialMediaImg,
    thumb: socialMediaImg,
  },
  {
    id: "performance",
    title: "Performance Marketing",
    headlineHighlight: "We turn insights into targeted campaigns",
    headlineRest: " that help your business grow.",
    cta: "Know more",
    image: performanceMarketingImg,
    thumb: performanceMarketingImg,
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    headlineHighlight: "We help the right people find you",
    headlineRest: " when they're looking for what you offer.",
    cta: "Know more",
    image: seoImg,
    thumb: seoImg,
  },
  {
    id: "content",
    title: "Content Creation",
    headlineHighlight: "From words to visuals,",
    headlineRest: " we create content that gets your brand noticed and stays with people.",
    cta: "Know more",
    image: contentWritingImg,
    thumb: contentWritingImg,
  },
  {
    id: "adfilms",
    title: "Ad Films",
    headlineHighlight: "We bring your brand to life",
    headlineRest: " through films that capture attention and leave an impression.",
    cta: "Know more",
    image: adFilmImg,
    thumb: adFilmImg,
  },
  {
    id: "webdevelopment",
    title: "Web Experience",
    headlineHighlight: "We build digital experiences",
    headlineRest:
      " that look good, work smoothly and make it easier for people to connect with your business.",
    cta: "Know more",
    image: webDevImg,
    thumb: webDevImg,
  },
];
