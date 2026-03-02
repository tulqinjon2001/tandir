import { useEffect, useRef, useState } from "react";
import { Phone, MapPin, Clock3 } from "lucide-react";
import { motion } from "framer-motion";

const OrderForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: "60px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="order"
      className="relative py-12 md:py-16 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b] via-tandir-medium/40 to-[#1a120b]" />

      {/* Decorative Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 140, 41, 0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-tandir-text mb-4">
            Buyurtma <span className="text-tandir-gold">uchun manzil</span>
          </h2>
          <p className="text-tandir-text-secondary text-lg max-w-2xl mx-auto">
            Ma&apos;lumotlarimizni saqlab qo&apos;ying, siz uchun qulay vaqtda
            qo&apos;ng&apos;iroq qilishingiz mumkin
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="w-full"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-2xl text-tandir-text mb-2">
                  Kontakt ma&apos;lumotlar
                </h3>
                <p className="text-tandir-text-secondary text-sm">
                  Tandirni ko&apos;rish yoki buyurtma qilish uchun quyidagi
                  ma&apos;lumotlar orqali bog&apos;lanishingiz mumkin.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-tandir-gold/15 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-tandir-gold" />
                  </div>
                  <div>
                    <p className="text-tandir-text text-sm font-medium">
                      Manzil
                    </p>
                    <p className="text-tandir-text-secondary text-sm">
                      Xorazm viloyati, Yangiariq tumani, Kattabog&apos;
                      qishlog&apos;i,
                    </p>
                    <p className="text-tandir-text-secondary text-sm">
                      Komiljon Otaniyozov ko&apos;chasi, 25-uy
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-tandir-gold/15 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-tandir-gold" />
                  </div>
                  <div>
                    <p className="text-tandir-text text-sm font-medium">
                      Telefon
                    </p>
                    <div className="flex flex-col gap-1">
                      <a
                        href="tel:+998995039352"
                        className="text-tandir-gold text-sm font-semibold hover:underline"
                      >
                        +998 99 503 93 52
                      </a>
                      <a
                        href="tel:+998945039352"
                        className="text-tandir-gold text-sm font-semibold hover:underline"
                      >
                        +998 94 503 93 52
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-tandir-gold/15 flex items-center justify-center">
                    <Clock3 className="w-5 h-5 text-tandir-gold" />
                  </div>
                  <div>
                    <p className="text-tandir-text text-sm font-medium">
                      Ish vaqti
                    </p>
                    <p className="text-tandir-text-secondary text-sm">
                      Har kuni 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Yandex Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            <div className="glass-card rounded-2xl p-3 sm:p-4 space-y-3">
              <div className="rounded-xl overflow-hidden shadow-lg aspect-[4/3] w-full">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=60.536771%2C41.382961&mode=search&oid=187987235853&ol=biz&z=17"
                  width="100%"
                  height="400"
                  style={{ border: "0", borderRadius: "12px" }}
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>

              {/* Koordinata badge */}
              <a
                href="https://yandex.uz/maps/-/CPqvEK5W"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-tandir-dark/60 hover:bg-tandir-dark/80 border border-tandir-gold/20 hover:border-tandir-gold/50 rounded-xl px-4 py-3 transition-all group"
              >
                <div className="relative shrink-0">
                  <span className="absolute inset-0 rounded-full bg-red-500/40 animate-ping" />
                  <div className="relative w-9 h-9 rounded-full bg-red-600 border-2 border-white/80 flex items-center justify-center shadow">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-tandir-text text-sm font-semibold">
                    Zamonaviy Tandirlar
                  </p>
                  <p className="text-tandir-text-secondary text-xs">
                    Xorazm viloyati, Yangiariq tumani, Kattabog&apos;
                  </p>
                </div>
                <MapPin className="w-4 h-4 text-tandir-gold shrink-0 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
