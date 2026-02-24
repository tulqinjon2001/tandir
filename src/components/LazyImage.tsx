import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface LazyImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  alt: string;
  /** Framer-motion props (whileHover, transition, etc.) — agar berilsa motion.img ishlatiladi */
  motionProps?: Record<string, unknown>;
  /** Tashqi wrapper div uchun class (masalan absolute inset-0) */
  wrapperClassName?: string;
}

/**
 * Viewport ga kirganda yuklanadigan rasm. Placeholder ko'rsatadi, yuklangach silliq chiqadi.
 * Sayt tezroq ochilishi va rasmlar sekin emas, ketma-ket yuklanishi uchun.
 */
const LazyImage = ({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  motionProps,
  ...imgProps
}: LazyImageProps) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { rootMargin: "80px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseProps = {
    src: isInView ? src : undefined,
    alt,
    className: `${className} ${hasLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`,
    onLoad: () => setHasLoaded(true),
    loading: "lazy" as const,
    decoding: "async" as const,
  };

  return (
    <div ref={containerRef} className={`relative w-full h-full ${wrapperClassName}`.trim()}>
      {!hasLoaded && (
        <div
          className="absolute inset-0 bg-tandir-dark/60 animate-pulse rounded"
          aria-hidden
        />
      )}
      {motionProps ? (
        <motion.img
          {...baseProps}
          {...motionProps}
          style={imgProps.style}
        />
      ) : (
        <img {...baseProps} {...imgProps} />
      )}
    </div>
  );
};

export default LazyImage;
