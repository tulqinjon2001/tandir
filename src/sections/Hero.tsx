import { useRef } from "react";
import { Check, Phone, Flame } from "lucide-react";
import { motion } from "framer-motion";
import LazyImage from "../components/LazyImage";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToOrder = () => {
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const bulletPoints = [
    "1000°C pechkada pishirilgan",
    "Temir bilan o'ralgan mustahkam korpus",
    "To'liq komplekt jihozlar bilan",
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background Image — LCP uchun lazy emas, WebP ixtiyoriy */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/hero-bg.webp" type="image/webp" />
          <img
            src="/images/hero-bg.jpg"
            alt="Tandir with fire"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a120b]/95 via-[#1a120b]/80 to-[#1a120b]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-transparent to-transparent" />
      </div>

      {/* Clay Texture Overlay */}
      <div className="absolute inset-0 z-[1] opacity-30 pointer-events-none texture-clay" />

      {/* Fire Glow Overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 60%, rgba(212, 140, 41, 0.2) 0%, rgba(230, 126, 34, 0.1) 30%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Creative Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-tandir-text leading-tight">
                  <span className="block text-tandir-gold">
                    Avlodlarga meros,
                  </span>
                  <span className="block">
                    olovda{" "}
                    <span className="text-gradient">toblangan sifat</span>
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-lg sm:text-xl text-tandir-text-secondary font-body">
                  Har xil o'lchamdagi tandirlar.{" "}
                  <span className="text-tandir-gold font-semibold">
                    100% kafolat.
                  </span>
                </p>
              </motion.div>

              {/* Bullet Points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-4"
              >
                {bulletPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-tandir-gold/20 flex items-center justify-center group-hover:bg-tandir-gold/40 transition-colors">
                      <Check className="w-4 h-4 text-tandir-gold" />
                    </div>
                    <span className="text-tandir-text-secondary group-hover:text-tandir-text transition-colors">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  ease: [0.68, -0.55, 0.265, 1.55],
                }}
              >
                <button
                  onClick={scrollToOrder}
                  className="btn-primary btn-shine fire-glow flex items-center gap-3 text-lg"
                >
                  <Phone className="w-5 h-5" />
                  Zayavka qoldirish
                </button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-tandir-medium/50 rounded-full border border-tandir-gold/30">
                  <span className="text-tandir-gold text-sm font-semibold">
                    100%
                  </span>
                  <span className="text-tandir-text-secondary text-sm">
                    Kafolat
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-tandir-medium/50 rounded-full border border-tandir-orange/30">
                  <Flame className="w-4 h-4 text-tandir-orange" />
                  <span className="text-tandir-text-secondary text-sm">
                    1000°C
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                {/* Heat Glow Effect Behind Tandir */}
                <div
                  className="absolute inset-0 animate-heat-pulse"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(212, 140, 41, 0.5) 0%, rgba(230, 126, 34, 0.3) 30%, transparent 70%)",
                    filter: "blur(60px)",
                    transform: "scale(1.5)",
                  }}
                />

                {/* Tandir Image */}
                <LazyImage
                  src="/images/hero-tandir.png"
                  alt="Premium Tandir"
                  className="relative z-10 w-full max-w-md drop-shadow-2xl"
                  motionProps={{
                    whileHover: { scale: 1.05, rotateY: 5 },
                    transition: { duration: 0.4 },
                  }}
                />

                {/* 1000°C Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1,
                    ease: [0.68, -0.55, 0.265, 1.55],
                  }}
                  className="absolute top-1/2 -left-8 z-20"
                >
                  <div className="bg-tandir-red text-white px-4 py-3 rounded-xl shadow-lg border-2 border-tandir-gold/50">
                    <div className="text-center">
                      <span className="font-display text-3xl">1000°</span>
                      <span className="block text-xs text-tandir-text-secondary">
                        C pechda pishirilgan
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Price Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20"
                >
                  <div className="glass px-6 py-3 rounded-xl">
                    <span className="price-gradient font-display text-3xl">
                      500 000
                    </span>
                    <span className="text-tandir-text-secondary text-sm ml-1">
                      so'mdan
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a120b] to-transparent z-10" />
    </section>
  );
};

export default Hero;
