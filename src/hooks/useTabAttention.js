import { useEffect } from "react";

const useTabAttention = (defaultTitle) => {
  useEffect(() => {
    let interval;

    const messages = [
      { text: "Missing you already!", emoji: "👀" },
      { text: "Come back for new deals!", emoji: "💥" },
      { text: "Don't miss this!", emoji: "🔥" },
      { text: "We have something for you!", emoji: "🚀" }
    ];

    const updateFavicon = (emoji) => {
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;
      }
    };

    const originalFavicon = document.querySelector("link[rel~='icon']")?.href;

    const handleVisibilityChange = () => {

      if (document.hidden) {

        let i = 0;

        interval = setInterval(() => {
          const currentMessage = messages[i % messages.length];
          document.title = currentMessage.text;
          updateFavicon(currentMessage.emoji);
          i++;
        }, 2000);

      } else {

        clearInterval(interval);
        document.title = defaultTitle;
        const link = document.querySelector("link[rel~='icon']");
        if (link && originalFavicon) {
          link.href = originalFavicon;
        }

      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      clearInterval(interval);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [defaultTitle]);
};

export default useTabAttention;
