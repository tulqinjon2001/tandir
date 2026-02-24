import { useEffect, useRef, useState } from 'react';
import { Flame, Thermometer, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Process1000C = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [heatLevel, setHeatLevel] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate heat level
          let level = 0;
          const timer = setInterval(() => {
            level += 20;
            if (level >= 1000) {
              level = 1000;
              clearInterval(timer);
            }
            setHeatLevel(level);
          }, 50);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Thermometer, label: 'Harorat', value: '1000°C' },
    { icon: Clock, label: 'Vaqt', value: '24 soat' },
    { icon: Shield, label: 'Mustahkamlik', value: '100%' },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b] via-tandir-medium/30 to-[#1a120b]" />

      {/* Heat Glow Background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212, 140, 41, 0.4) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tandir-red/20 rounded-full mb-6">
            <Flame className="w-4 h-4 text-tandir-red" />
            <span className="text-tandir-text-secondary text-sm">Ishlab chiqarish jarayoni</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-tandir-text mb-4">
            <span className="text-tandir-gold">1000°C</span> jarayoni
          </h2>
          <p className="text-tandir-text-secondary text-lg max-w-2xl mx-auto">
            Zamonaviy Xitoy elektr pechlarida pishirilgan - maksimal sifat kafolati
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="font-display text-2xl text-tandir-gold">
                Xitoy elektr pechi texnologiyasi
              </h3>
              
              <p className="text-tandir-text-secondary leading-relaxed">
                Bizning tandirlarimiz maxsus Xitoy elektr pechlarida 1000°C haroratda 
                24 soat davomida pishiriladi. Bu jarayon tandirning ichki tuzilmasini 
                maksimal mustahkam qilib, uzoq yillar xizmat qilishini ta'minlaydi.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="text-center p-4 bg-tandir-dark/50 rounded-xl"
                  >
                    <feature.icon className="w-6 h-6 text-tandir-gold mx-auto mb-2" />
                    <p className="text-tandir-text-muted text-xs">{feature.label}</p>
                    <p className="text-tandir-gold font-display text-lg">{feature.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Heat Progress */}
              <div className="pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-tandir-text-secondary">Pech harorati</span>
                  <span className="text-tandir-gold font-display text-xl">{heatLevel}°C</span>
                </div>
                <div className="h-3 bg-tandir-dark rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-tandir-orange via-tandir-gold to-tandir-orange"
                    initial={{ width: 0 }}
                    animate={{ width: `${(heatLevel / 1000) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Furnace Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Furnace Glow */}
              <motion.div 
                className="absolute inset-0 rounded-3xl"
                animate={{ 
                  boxShadow: [
                    '0 0 60px rgba(212, 140, 41, 0.3)',
                    '0 0 100px rgba(212, 140, 41, 0.5)',
                    '0 0 60px rgba(212, 140, 41, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Furnace Container */}
              <div className="relative w-full h-full glass-card rounded-3xl overflow-hidden border-2 border-tandir-gold/30">
                {/* Inner Fire Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-tandir-red/40 via-tandir-orange/20 to-transparent" />
                
                {/* Animated Fire Particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-tandir-gold rounded-full"
                      style={{
                        left: `${20 + i * 10}%`,
                        bottom: '20%',
                      }}
                      animate={{
                        y: [0, -150, -200],
                        opacity: [1, 0.5, 0],
                        scale: [1, 0.5, 0],
                      }}
                      transition={{
                        duration: 2 + i * 0.2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </div>

                {/* Tandir in Furnace */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <img
                    src="/images/hero-tandir.png"
                    alt="Tandir in furnace"
                    className="w-3/4 h-auto opacity-90"
                    style={{
                      filter: 'drop-shadow(0 0 30px rgba(212, 140, 41, 0.6))',
                    }}
                  />
                </motion.div>

                {/* Temperature Display */}
                <div className="absolute top-4 right-4 glass px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-tandir-red animate-pulse" />
                    <span className="text-tandir-gold font-display text-lg">{heatLevel}°C</span>
                  </div>
                </div>

                {/* Furnace Label */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="glass inline-block px-4 py-2 rounded-full">
                    <span className="text-tandir-text-secondary text-sm">Xitoy elektr pechi</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process1000C;
