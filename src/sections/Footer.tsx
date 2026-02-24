import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Instagram, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { icon: MessageCircle, label: 'Telegram', href: 'https://t.me/tandir_uz', color: 'hover:bg-blue-500' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/tandir.uz', color: 'hover:bg-pink-500' },
    { icon: Send, label: 'Facebook', href: 'https://facebook.com/tandir.uz', color: 'hover:bg-blue-600' },
  ];

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full overflow-hidden"
    >
      {/* Fire Divider */}
      <div 
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, #d48c29, #e67e22, #d48c29, transparent)',
          animation: 'fireFlicker 2s ease-in-out infinite',
        }}
      />

      {/* Clay Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none texture-clay" />

      {/* Main Footer Content */}
      <div className="relative bg-gradient-to-b from-[#1a120b] to-[#0f0a06] py-16">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            {/* Brand Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-tandir-gold to-tandir-orange rounded-lg flex items-center justify-center">
                  <span className="font-display text-tandir-dark text-xl">T</span>
                </div>
                <span className="font-display text-2xl text-tandir-text">Tandir.uz</span>
              </div>
              <p className="text-tandir-text-secondary text-sm leading-relaxed">
                Sifatli ko'chma tandirlar ishlab chiqaruvchi. 1000°C da pishirilgan, 100% kafolatlangan.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 glass rounded-lg flex items-center justify-center text-tandir-text-secondary transition-all duration-300 ${social.color} hover:text-white hover:-translate-y-1`}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="font-display text-xl text-tandir-text">Tezkor havolalar</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Bosh sahifa', href: '#hero' },
                  { label: 'Tandirlar', href: '#tandirs' },
                  { label: 'Komplektatsiya', href: '#komplektatsiya' },
                  { label: 'Buyurtma berish', href: '#order' },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-tandir-text-secondary text-sm hover:text-tandir-gold transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="w-1.5 h-1.5 bg-tandir-light rounded-full group-hover:bg-tandir-gold transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-tandir-gold/10 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p className="text-tandir-text-muted text-sm text-center sm:text-left">
              © 2024 Tandir.uz. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-tandir-text-muted text-sm hover:text-tandir-gold transition-colors">
                Maxfiylik siyosati
              </a>
              <a href="#" className="text-tandir-text-muted text-sm hover:text-tandir-gold transition-colors">
                Foydalanish shartlari
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/998995039352"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Pulse Effect */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
          
          {/* Button */}
          <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
            <svg 
              className="w-7 h-7 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-tandir-dark text-sm rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp orqali yozing
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white rotate-45" />
          </div>
        </div>
      </motion.a>
    </footer>
  );
};

export default Footer;
