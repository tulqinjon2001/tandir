import { useEffect, useRef, useState } from "react";
import { MessageCircle, Instagram, Send, Phone } from "lucide-react";
import { motion } from "framer-motion";

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
      { threshold: 0.05, rootMargin: "60px" },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      icon: MessageCircle,
      label: "Telegram",
      href: "https://t.me/tandir_uz",
      color: "hover:bg-blue-500",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/tandir.uz",
      color: "hover:bg-pink-500",
    },
    {
      icon: Send,
      label: "Facebook",
      href: "https://facebook.com/tandir.uz",
      color: "hover:bg-blue-600",
    },
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
          background:
            "linear-gradient(90deg, transparent, #d48c29, #e67e22, #d48c29, transparent)",
          animation: "fireFlicker 2s ease-in-out infinite",
        }}
      />

      {/* Clay Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none texture-clay" />

      {/* Main Footer Content */}
      <div className="relative bg-gradient-to-b from-[#1a120b] to-[#0f0a06] py-12">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo.png"
                  alt="Zamonaviy Tandirlar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-display text-xl text-tandir-text">
                  ZAMONAVIY TANDIRLAR
                </span>
              </div>
              <p className="text-tandir-text-secondary text-sm leading-relaxed">
                Sifatli ko'chma tandirlar ishlab chiqaruvchi. 1000°C da
                pishirilgan, 100% kafolatlangan.
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
              <h3 className="font-display text-xl text-tandir-text">
                Tezkor havolalar
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "Bosh sahifa", href: "#hero" },
                  { label: "Tandirlar", href: "#tandirs" },
                  { label: "Komplektatsiya", href: "#komplektatsiya" },
                  { label: "Buyurtma berish", href: "#order" },
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
            className="mt-8 pt-6 border-t border-tandir-gold/10 flex flex-col items-center gap-3 text-center"
          >
            <p className="text-tandir-text-muted text-sm">
              © 2025 Zamonaviy Tandirlar. Barcha huquqlar himoyalangan.
            </p>
            <p className="text-tandir-text-muted text-sm">
              <a
                href="https://pinmap.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tandir-gold hover:text-tandir-orange transition-colors font-medium"
              >
                PinMap.uz
              </a>{" "}
              tomonidan yaratildi
            </p>
          </motion.div>
        </div>
      </div>

      {/* Qo'ng'iroq qilish tugmasi */}
      <motion.a
        href="tel:+998995039352"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Telefon qilish"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-tandir-gold rounded-full animate-ping opacity-20" />
          <div className="relative w-14 h-14 bg-tandir-gold hover:bg-tandir-orange rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
            <Phone className="w-7 h-7 text-tandir-dark" />
          </div>
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-tandir-dark text-sm rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            +998 99 503 93 52
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white rotate-45" />
          </div>
        </div>
      </motion.a>
    </footer>
  );
};

export default Footer;
