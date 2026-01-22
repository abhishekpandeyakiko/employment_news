import { useEffect, useRef } from "react";
import ExternalLinkOpener from "./ExternalLinkOpener";

export default function LogoCarousel({ logos, footerUrl }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pausedRef = useRef(false);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ✅ Clone enough logos to cover visible width
    const containerWidth = container.offsetWidth;
    const logosWidth = container.scrollWidth;

    if (logosWidth < containerWidth * 2) {
      // clone the logos until width >= 2x container width
      const cloneCount = Math.ceil(containerWidth / (logosWidth / logos.length));
      const clones = Array.from(container.children)
        .slice(0, cloneCount)
        .map((node) => node.cloneNode(true));
      clones.forEach((clone) => container.appendChild(clone));
    }

    let scrollPos = 0;
    const speed = 0.5; // adjust for faster/slower scroll

    const scroll = () => {
      if (!pausedRef.current) {
        scrollPos += speed;
        if (scrollPos >= container.scrollWidth / 2) {
          scrollPos = 0;
        }
        container.scrollLeft = scrollPos;
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="overflow-hidden py-4 sm:py-8 bg-white">
      <h2 className="sr-only">Other Important Sites</h2>
      <div
        ref={containerRef}
        className="flex gap-8 sm:gap-28 whitespace-nowrap overflow-hidden"
        style={{ minWidth: "max-content" }}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocus={() => (pausedRef.current = true)}
        onBlur={() => (pausedRef.current = false)}
        tabIndex="0"
        aria-label="Scrolling list of important sites, tab or hover to pause"
      >
        {logos.map((src, idx) => (
          <ExternalLinkOpener
            url={footerUrl[idx]}
            text={<img key={idx} src={src} alt={`Logo ${idx + 1}`} className="h-6 sm:h-16" />}

          />

        ))}
      </div>
    </div>
  );
}
