import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Hand } from 'lucide-react';
import { motion } from 'framer-motion';
import OrderModal from '../components/OrderModal';

interface Product {
  id: number;
  size: string;
  price: string;
  image: string;
}

const products: Product[] = [
  { id: 1, size: '60 sm', price: '500 000', image: '/images/tandir-simple-60.png' },
  { id: 2, size: '70 sm', price: '800 000', image: '/images/tandir-simple-70.png' },
  { id: 3, size: '80 sm', price: '1 000 000', image: '/images/tandir-simple-80.png' },
  { id: 4, size: '90 sm', price: '1 300 000', image: '/images/tandir-simple-90.png' },
  { id: 5, size: '110 sm', price: '2 000 000', image: '/images/tandir-simple-110.png' },
];

const SimpleTandirs = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="simple-tandirs"
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
            <Hand className="w-4 h-4 text-tandir-gold" />
            <span className="text-tandir-text-secondary text-sm">Qo'l ishlangan</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-tandir-text mb-4">
            Oddiy <span className="text-tandir-gold">tandirlar</span>
          </h2>
          <p className="text-tandir-text-secondary text-lg max-w-2xl mx-auto">
            An'anaviy uslubda qo'l bilan yasalgan, klassik dizayndagi tandirlar
          </p>
        </motion.div>

        {/* Products Grid - Single column on mobile for larger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group"
              style={{ transform: isVisible ? `translateY(${index % 2 === 0 ? '0' : '15px'})` : undefined }}
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full glass-card rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-tandir-gold/50 group-hover:shadow-gold group-hover:-translate-y-2">
                {/* Heat Glow */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-40 group-hover:opacity-70 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle, rgba(212, 140, 41, 0.4) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                  }}
                />

                {/* Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden p-6">
                  <motion.img
                    src={product.image}
                    alt={`Tandir ${product.size}`}
                    className="w-full h-full object-contain"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-3 relative">
                  {/* Size & Price Row */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl text-tandir-text">
                      {product.size}
                    </h3>
                    <div className="text-right">
                      <span className="font-display text-2xl price-gradient">
                        {product.price}
                      </span>
                      <span className="text-tandir-text-muted text-sm ml-1">so'm</span>
                    </div>
                  </div>

                  {/* CTA Button with Shine */}
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsOrderModalOpen(true);
                    }}
                    className="w-full py-3 bg-tandir-light/50 hover:bg-gradient-to-r hover:from-tandir-gold hover:to-tandir-orange text-tandir-text hover:text-tandir-dark rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm btn-shine border border-tandir-gold/20 hover:border-transparent"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buyurtma berish
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
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
            ? `Oddiy tandir ${selectedProduct.size} — ${selectedProduct.price} so'm`
            : undefined
        }
      />
    </section>
  );
};

export default SimpleTandirs;
