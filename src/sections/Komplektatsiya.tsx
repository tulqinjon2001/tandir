import { useEffect, useRef, useState } from "react";
import { Package, Check } from "lucide-react";
import { motion } from "framer-motion";
import LazyImage from "../components/LazyImage";

interface Accessory {
  id: number;
  name: string;
  image: string;
}

const accessories: Accessory[] = [
  { id: 1, name: "3 litrli kuza", image: "/images/icon-kuza.png" },
  { id: 2, name: "Non yopish rapidasi", image: "/images/icon-rapida.png" },
  { id: 3, name: "Somsa uzgich", image: "/images/icon-somsa-tool.png" },
  {
    id: 4,
    name: "Steak va baliq dimlash setkasi",
    image: "/images/icon-grill.png",
  },
  { id: 5, name: "Somsa kosalari", image: "/images/icon-plates.png" },
];

const Komplektatsiya = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="komplektatsiya"
      className="relative py-24 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b] via-tandir-medium/20 to-[#1a120b]" />

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tandir-gold/20 rounded-full mb-6">
            <Package className="w-4 h-4 text-tandir-gold" />
            <span className="text-tandir-text-secondary text-sm">
              To'liq komplekt
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-tandir-text mb-4">
            Komplekt ichida{" "}
            <span className="text-tandir-gold">nimalar bor?</span>
          </h2>
          <p className="text-tandir-text-secondary text-lg max-w-2xl mx-auto">
            Barcha kerakli jihozlar to'plamga kiritilgan - qo'shimcha xarajatlar
            yo'q
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Center Tandir Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative">
              {/* Heat Glow Effect */}
              <div
                className="absolute inset-0 animate-heat-pulse"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212, 140, 41, 0.4) 0%, transparent 70%)",
                  filter: "blur(50px)",
                  transform: "scale(1.3)",
                }}
              />

              {/* Tandir Image */}
              <LazyImage
                src="/images/hero-tandir.png"
                alt="Tandir with complete kit"
                className="relative z-10 w-full max-w-sm drop-shadow-2xl"
                motionProps={{
                  whileHover: { scale: 1.05, rotateY: 5 },
                  transition: { duration: 0.4 },
                }}
              />
            </div>
          </motion.div>

          {/* Right - Accessories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {accessories.map((accessory, index) => (
              <motion.div
                key={accessory.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="h-full"
              >
                <div className="relative h-full glass-card rounded-xl p-4 transition-all duration-300 hover:border-tandir-gold/50 text-center group flex flex-col justify-between">
                  {/* Icon */}
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <div className="absolute inset-0 bg-tandir-gold/20 rounded-full blur-md group-hover:bg-tandir-gold/30 transition-colors" />
                    <LazyImage
                      src={accessory.image}
                      alt={accessory.name}
                      className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  {/* Name */}
                  <h3 className="text-tandir-text text-sm font-medium leading-tight">
                    {accessory.name}
                  </h3>
                  {/* Checkmark */}
                  <div className="absolute top-2 right-2 w-5 h-5 bg-tandir-gold/20 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-tandir-gold" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Komplektatsiya;
