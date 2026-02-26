import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import LazyImage from "../components/LazyImage";

interface Benefit {
  id: number;
  title: string;
  description: string;
  image: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: "1000°C texnologiya",
    description:
      "Zamonaviy pechlar yordamida maksimal mustahkamlik va sifat kafolati",
    image: "/images/icon-temp.png",
  },
  {
    id: 2,
    title: "Yuqori sifat",
    description: "Qo'l bilan tayyorlangan, har bir detalga e'tibor qaratilgan",
    image: "/images/icon-quality.png",
  },
  {
    id: 3,
    title: "Ko'chma model",
    description:
      "Oson ko'chirish va o'rnatish imkoniyati - xoh uyingizda, xoh bog'ingizda",
    image: "/images/icon-portable.png",
  },
  {
    id: 4,
    title: "Uzoq muddat xizmat qiladi",
    description: "Yillar davomida ishonchli ishlash - 10 yillik kafolat",
    image: "/images/icon-durable.png",
  },
];

const Benefits = () => {
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
      id="benefits"
      className="relative py-24 w-full overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(212, 140, 41, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(212, 140, 41, 0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(212, 140, 41, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(212, 140, 41, 0.1) 75%)`,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tandir-gold/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-tandir-gold" />
            <span className="text-tandir-text-secondary text-sm">
              Bizning afzalliklarimiz
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-tandir-text mb-4">
            Nima uchun{" "}
            <span className="text-tandir-gold">bizni tanlashadi?</span>
          </h2>
          <p className="text-tandir-text-secondary text-lg max-w-2xl mx-auto">
            Minglab mijozlar bizga ishonishadi - sabablari shunday
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
              whileHover={{ y: -10, rotateX: 5 }}
              className="group"
              style={{
                transform: isVisible
                  ? `translateY(${index % 2 === 0 ? "0" : "15px"})`
                  : undefined,
              }}
            >
              <div className="relative h-full glass-card rounded-2xl p-6 transition-all duration-500 group-hover:border-tandir-gold/50 group-hover:shadow-gold">
                {/* Icon */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-tandir-gold/20 rounded-full blur-lg group-hover:bg-tandir-gold/30 transition-colors" />
                  <LazyImage
                    src={benefit.image}
                    alt={benefit.title}
                    className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-display text-xl text-tandir-text mb-3 group-hover:text-tandir-gold transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-tandir-text-secondary text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-tandir-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "5000+", label: "Mamnun mijozlar" },
            { value: "10", label: "Yillik tajriba" },
            { value: "100%", label: "Kafolat" },
            { value: "24/7", label: "Qo'llab-quvvatlash" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center glass rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="font-display text-3xl sm:text-4xl text-tandir-gold mb-1">
                {stat.value}
              </div>
              <div className="text-tandir-text-secondary text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
