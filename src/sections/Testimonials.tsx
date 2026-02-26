import { useEffect, useRef, useState } from 'react';
import { Quote, Star, MessageCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Azizbek Karimov',
    location: 'Toshkent',
    text: 'Tandir ajoyib ishlaydi! Non juda mazali chiqdi. Yetkazib berish tez va sifatli. Katta rahmat!',
    rating: 5,
    avatar: 'A',
  },
  {
    id: 2,
    name: 'Gulnora Rahimova',
    location: 'Samarqand',
    text: '2 oy oldin sotib oldim, hali muammo yo\'q. Issiqlikni yaxshi saqlaydi. Tavsiya qilaman!',
    rating: 5,
    avatar: 'G',
  },
  {
    id: 3,
    name: 'Bobur Aliyev',
    location: 'Buxoro',
    text: 'Restoranim uchun 3 ta tandir oldim. Mijozlar juda mamnun. Sifatga gap yo\'q!',
    rating: 5,
    avatar: 'B',
  },
  {
    id: 4,
    name: 'Nodira Xusanova',
    location: 'Farg\'ona',
    text: 'Oila davrasida juda qulay. Somsa va non ajoyib pishadi. Yetkazib berish bepul!',
    rating: 5,
    avatar: 'N',
  },
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: "60px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-12 md:py-16 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b] via-tandir-medium/20 to-[#1a120b]" />

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tandir-gold/20 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-tandir-gold" />
            <span className="text-tandir-text-secondary text-sm">Mijozlar fikri</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-tandir-text mb-4">
            Biz haqimizda <span className="text-tandir-gold">nima deyishadi?</span>
          </h2>
          <p className="text-tandir-text-secondary text-lg max-w-2xl mx-auto">
            Haqiqiy mijozlarning haqiqiy fikrlari
          </p>
        </motion.div>

        {/* Testimonials Grid (no carousel) */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.05 + index * 0.05 }}
                className="h-full"
              >
                <div className="relative h-full glass-card rounded-2xl p-4 sm:p-5 flex flex-col overflow-visible">
                  {/* Verified badge in top-right corner (simple pill) */}
                  <div className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/40 shadow-md absolute top-3 right-3">
                    <CheckCircle className="w-3 h-3 text-green-300" />
                    <span className="text-green-200 text-[10px] font-medium whitespace-nowrap">
                      Tasdiqlangan xarid
                    </span>
                  </div>

                  <div className="text-tandir-gold/30 mb-3">
                    <Quote className="w-6 h-6" />
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-tandir-gold text-tandir-gold" />
                    ))}
                  </div>

                  <p className="text-tandir-text text-sm sm:text-base leading-relaxed line-clamp-4 flex-grow">
                    "{testimonial.text}"
                  </p>

                  <div className="pt-4 mt-3 border-t border-tandir-gold/15 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tandir-gold to-tandir-orange flex items-center justify-center text-tandir-dark font-display text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="text-tandir-text text-sm font-medium">
                          {testimonial.name}
                        </h4>
                        <p className="text-tandir-text-muted text-xs">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
            <div className="flex -space-x-2">
              {['A', 'G', 'B', 'N', 'J'].map((letter, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-tandir-gold to-tandir-orange flex items-center justify-center text-tandir-dark text-xs font-medium border-2 border-tandir-dark">
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-tandir-text-secondary text-sm">+5000 mamnun mijoz</span>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-tandir-gold text-tandir-gold" />
              ))}
            </div>
            <span className="text-tandir-text-secondary text-sm">4.9/5 baho</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
