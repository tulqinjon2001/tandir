import { useEffect, useRef, useState } from "react";
import { Shield, ShoppingCart, Flame } from "lucide-react";
import { motion } from "framer-motion";
import OrderModal from "../components/OrderModal";
import LazyImage from "../components/LazyImage";

interface Product {
  id: number;
  size: string;
  price: string;
  image: string;
  popular?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    size: "60 sm",
    price: "2 000 000",
    image: "/images/tandir-mosaic-60.jpg",
  },
  {
    id: 2,
    size: "70 sm",
    price: "2 500 000",
    image: "/images/tandir-mosaic-70.png",
    popular: true,
  },
  {
    id: 3,
    size: "80 sm",
    price: "3 000 000",
    image: "/images/tandir-mosaic-80.png",
  },
];

const getImageSrcSet = (img: string) => {
  const base = img.replace(/\.(png|jpg|jpeg)$/i, "");
  return `${base}-320.webp 320w, ${base}.webp 640w`;
};

const MosaicTandirs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPrices, setAnimatedPrices] = useState<string[]>(
    products.map(() => "0"),
  );
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate prices
          products.forEach((product, index) => {
            const targetPrice = parseInt(product.price.replace(/\s/g, ""));
            let currentPrice = 0;
            const increment = targetPrice / 50;
            const timer = setInterval(() => {
              currentPrice += increment;
              if (currentPrice >= targetPrice) {
                currentPrice = targetPrice;
                clearInterval(timer);
              }
              setAnimatedPrices((prev) => {
                const newPrices = [...prev];
                newPrices[index] =
                  Math.floor(currentPrice).toLocaleString("ru-RU");
                return newPrices;
              });
            }, 30);
          });
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
      id="mosaic-tandirs"
      className="relative py-12 md:py-16 w-full overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 140, 41, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tandir-gold/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-tandir-gold" />
            <span className="text-tandir-text-secondary text-sm">
              Maksimal mustahkamlik
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-tandir-text mb-4">
            Temir bilan <span className="text-tandir-gold">o'ralgan</span>{" "}
            tandirlar
          </h2>
          <p className="text-tandir-text-secondary text-lg max-w-2xl mx-auto">
            Maksimal mustahkamlik va issiqlik saqlash uchun maxsus temir
            qoplamali tandirlar
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6 perspective-1200">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.05 + index * 0.05 }}
              className={`relative group ${product.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {/* Popular Badge */}
              {product.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-tandir-gold text-tandir-dark px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-gold">
                    <Flame className="w-4 h-4" />
                    Eng mashhur
                  </div>
                </div>
              )}

              {/* Glassmorphism Card */}
              <div
                className={`relative h-full glass-card rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-tandir-gold/50 group-hover:shadow-gold ${product.popular ? "ring-2 ring-tandir-gold/50" : ""}`}
              >
                {/* Heat Glow Behind Image */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-60 group-hover:opacity-80 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212, 140, 41, 0.5) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />

                {/* Image Container */}
                <div className="relative h-64 sm:h-72 overflow-hidden p-6">
                  <LazyImage
                    src={product.image}
                    alt={`Tandir ${product.size}`}
                    className="w-full h-full object-contain"
                    sizes="(max-width: 640px) 50vw, 280px"
                    srcSet={getImageSrcSet(product.image)}
                    width={280}
                    height={336}
                    motionProps={{
                      whileHover: { scale: 1.1, rotateY: 5 },
                      transition: { duration: 0.4 },
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 relative">
                  {/* Size */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-tandir-text">
                      {product.size}
                    </h3>
                    <div className="flex items-center gap-1 text-tandir-gold">
                      <Flame className="w-4 h-4" />
                      <span className="text-xs">1000°C</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-tandir-gold/20 rounded text-xs text-tandir-text-secondary border border-tandir-gold/20">
                      1000°C da pishirilgan
                    </span>
                    <span className="px-2 py-1 bg-tandir-gold/10 rounded text-xs text-tandir-text-secondary border border-tandir-gold/10">
                      100% kafolat
                    </span>
                  </div>

                  {/* Price - Larger with Golden Gradient */}
                  <div className="pt-4 border-t border-tandir-gold/20">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl price-gradient">
                        {animatedPrices[index]}
                      </span>
                      <span className="text-tandir-text-secondary">so'm</span>
                    </div>
                  </div>

                  {/* CTA Button with Shine Animation */}
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsOrderModalOpen(true);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-tandir-gold to-tandir-orange text-tandir-dark rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden btn-shine hover:shadow-gold hover:scale-[1.02]"
                  >
                    <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    Buyurtma berish
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Limited Stock Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full">
            <div className="w-2 h-2 bg-tandir-red rounded-full animate-pulse" />
            <span className="text-tandir-text-secondary text-sm">
              Cheklangan zaxira! Faqat{" "}
              <span className="text-tandir-gold font-semibold">15 ta</span>{" "}
              tandir qoldi
            </span>
          </div>
        </motion.div>
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        productLabel={
          selectedProduct
            ? `Temir bilan o'ralgan tandir ${selectedProduct.size} — ${selectedProduct.price} so'm`
            : undefined
        }
      />
    </section>
  );
};

export default MosaicTandirs;
