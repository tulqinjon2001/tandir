import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Flame } from "lucide-react";
import { motion } from "framer-motion";
import OrderModal from "../components/OrderModal";
import LazyImage from "../components/LazyImage";

interface Product {
  id: string;
  size: string;
  price: string;
  image: string;
  featured?: boolean;
}

const products: Product[] = [
  // Temir bilan o'ralgan (premium) modellari
  {
    id: "m-60",
    size: "60 sm",
    price: "2 000 000",
    image: "/images/tandir-mosaic-60.png",
    featured: false,
  },
  {
    id: "m-70",
    size: "70 sm",
    price: "2 500 000",
    image: "/images/tandir-mosaic-70.png",
    featured: true,
  },
  {
    id: "m-80",
    size: "80 sm",
    price: "3 000 000",
    image: "/images/tandir-mosaic-80.png",
    featured: false,
  },
  // Oddiy klassik modellari
  {
    id: "s-60",
    size: "60 sm",
    price: "500 000",
    image: "/images/tandir-simple-60.png",
  },
  {
    id: "s-70",
    size: "70 sm",
    price: "800 000",
    image: "/images/tandir-simple-70.png",
  },
  {
    id: "s-80",
    size: "80 sm",
    price: "1 000 000",
    image: "/images/tandir-simple-80.png",
  },
  {
    id: "s-90",
    size: "90 sm",
    price: "1 300 000",
    image: "/images/tandir-simple-90.png",
  },
  {
    id: "s-110",
    size: "110 sm",
    price: "2 000 000",
    image: "/images/tandir-simple-110.png",
  },
];

const Tandirs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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

  const handleOrderClick = (product: Product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="tandirs"
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
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-tandir-text mb-4">
            Tandirlar
          </h2>
          <p className="text-tandir-text-secondary text-lg max-w-2xl mx-auto">
            Turli o&apos;lchamdagi, issiqlikni yaxshi saqlaydigan, 1000°C da
            pishirilgan tandirlar ro&apos;yxati.
          </p>
        </motion.div>

        {/* Products - all in one list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1200">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              className={`relative group ${product.featured ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {product.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-tandir-gold text-tandir-dark px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-gold">
                    <Flame className="w-4 h-4" />
                    Eng mashhur
                  </div>
                </div>
              )}

              <div
                className={`relative h-full glass-card rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-tandir-gold/50 group-hover:shadow-gold ${product.featured ? "ring-2 ring-tandir-gold/50" : ""}`}
              >
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 opacity-50 group-hover:opacity-80 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212, 140, 41, 0.5) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />

                <div className="relative h-60 sm:h-64 overflow-hidden p-6 bg-tandir-dark/60">
                  <LazyImage
                    src={product.image}
                    alt={`Tandir ${product.size}`}
                    className="w-full h-full object-contain"
                    motionProps={{ whileHover: { scale: 1.08 }, transition: { duration: 0.4 } }}
                  />
                </div>

                <div className="p-5 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl text-tandir-text">
                      {product.size}
                    </h3>
                    <div className="text-right">
                      <span className="font-display text-2xl price-gradient">
                        {product.price}
                      </span>
                      <span className="text-tandir-text-muted text-sm ml-1">
                        so'm
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-tandir-text-muted">
                    <Flame className="w-4 h-4 text-tandir-gold" />
                    <span>1000°C da pishirilgan • 100% kafolat</span>
                  </div>

                  <button
                    onClick={() => handleOrderClick(product)}
                    className="w-full mt-3 py-3 bg-tandir-light/50 hover:bg-gradient-to-r hover:from-tandir-gold hover:to-tandir-orange text-tandir-text hover:text-tandir-dark rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm btn-shine border border-tandir-gold/20 hover:border-transparent"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buyurtma berish
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Common note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-tandir-text-muted text-sm">
            * Barcha tandirlar 1000°C da pishirilgan va 100% kafolatlangan
          </p>
        </motion.div>
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        productLabel={
          selectedProduct
            ? `Tandir ${selectedProduct.size} — ${selectedProduct.price} so'm`
            : undefined
        }
      />
    </section>
  );
};

export default Tandirs;
