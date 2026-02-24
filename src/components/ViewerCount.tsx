import { useState, useEffect } from 'react';
import { Eye, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewerCount = () => {
  const [viewerCount, setViewerCount] = useState(12);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate viewer count changes
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(8, Math.min(25, newCount));
      });
    }, 5000);

    // Hide after 10 seconds, then show again periodically
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, []);

  // Show notification periodically
  useEffect(() => {
    const showInterval = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 8000);
    }, 30000);

    return () => clearInterval(showInterval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 left-4 sm:left-6 z-40"
        >
          <div className="glass px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg border border-tandir-gold/20">
            <div className="relative">
              <div className="w-10 h-10 bg-tandir-gold/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-tandir-gold" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            
            <div>
              <p className="text-tandir-text text-sm font-medium">
                Hozirda <span className="text-tandir-gold font-display text-lg">{viewerCount}</span> kishi
              </p>
              <p className="text-tandir-text-muted text-xs">
                ushbu tandirlarni tomosha qilmoqda
              </p>
            </div>

            <Eye className="w-4 h-4 text-tandir-text-muted ml-2" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewerCount;
