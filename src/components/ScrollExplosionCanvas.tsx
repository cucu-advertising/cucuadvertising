import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;

export default function ScrollExplosionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrame = useRef(0);

  // Preload frames
  useEffect(() => {
    const imgArray: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/cucu_campaign_0001 (${i}).webp`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };

      imgArray.push(img);
    }

    setImages(imgArray);
  }, []);

  // Render frame helper
  const renderFrame = (index: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const img = images[index];
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // object-fit: cover
    const ratio = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;
    const imgCenterX = (img.width * ratio) / 2;
    const imgCenterY = (img.height * ratio) / 2;

    ctx.drawImage(
      img,
      canvasCenterX - imgCenterX,
      canvasCenterY - imgCenterY,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Draw first frame once loaded
  useEffect(() => {
    if (loaded && images.length > 0) {
      renderFrame(0);
    }
  }, [loaded, images]);

  // GSAP ScrollTrigger — pin + scrub
  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // 3x viewport of scroll distance while pinned
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const frameIdx = Math.min(
              Math.floor(self.progress * (TOTAL_FRAMES - 1)),
              TOTAL_FRAMES - 1
            );
            if (frameIdx !== currentFrame.current) {
              currentFrame.current = frameIdx;
              renderFrame(frameIdx);
            }
          },
        },
      });

      tlRef.current = tl;

      // Signal that Hero is ready and layout is stable
      (window as any).__CUCU_HERO_READY__ = true;
      window.dispatchEvent(new CustomEvent("cucu:heroReady"));
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [loaded, images]);

  // Resize canvas
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (loaded && images.length > 0) {
        renderFrame(currentFrame.current);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded, images]);

  return (
    <div ref={containerRef} className="h-screen relative bg-[#19463F]">
      <canvas
        ref={canvasRef}
        className="w-full h-screen z-10"
        style={{ display: "block" }}
      />
    </div>
  );
}
