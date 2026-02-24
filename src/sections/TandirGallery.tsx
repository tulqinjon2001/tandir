import { useEffect, useRef, useState } from "react";
import { X, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LazyImage from "../components/LazyImage";

// public/images/image – rasmlar 1.jpg, 2.jpg, 3.jpg, … formatida
const IMAGE_BASE = "/images/image";
const GALLERY_IMAGES = Array.from(
  { length: 20 },
  (_, i) => `${IMAGE_BASE}/${i + 1}.jpg`
);

const TandirGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 w-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b] via-tandir-medium/20 to-[#1a120b]" />

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tandir-gold/20 rounded-full mb-6">
            <ImageIcon className="w-4 h-4 text-tandir-gold" />
            <span className="text-tandir-text-secondary text-sm">
              Haqiqiy rasmlar
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-tandir-text mb-4">
            Tandirlar <span className="text-tandir-gold">katalogi</span>
          </h2>
          <p className="text-tandir-text-secondary text-lg max-w-2xl mx-auto">
            Bizning tandirlarimizning haqiqiy rasmlari. Rasm ustiga bosing –
            kattaroq ko‘rish uchun
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {GALLERY_IMAGES.map((src, index) => (
            <motion.button
              key={src}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              onClick={() => setLightboxImage(src)}
              className="w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] aspect-square rounded-xl overflow-hidden glass-card border border-tandir-gold/20 hover:border-tandir-gold/50 transition-all focus:outline-none focus:ring-2 focus:ring-tandir-gold/50 bg-tandir-medium/30"
            >
              <LazyImage
                src={src}
                alt={`Tandir ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-tandir-text hover:text-tandir-gold transition-colors z-10"
              aria-label="Yopish"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxImage}
              alt="Katta rasm"
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TandirGallery;
