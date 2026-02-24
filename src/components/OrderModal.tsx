import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productLabel?: string;
}

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as
  | string
  | undefined;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID as
  | string
  | undefined;

const OrderModal = ({ isOpen, onClose, productLabel }: OrderModalProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      setError("Iltimos, ism familiya va telefon raqamingizni kiriting.");
      return;
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      setError(
        "Telegram sozlamalarida xatolik. Administrator bilan bog'laning.",
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const textLines = [
      "🆕 Yangi buyurtma",
      productLabel ? `📦 Mahsulot: ${productLabel}` : "",
      `👤 Ism familiya: ${fullName}`,
      `📞 Telefon: ${phone}`,
      note.trim() ? `📝 Izoh: ${note.trim()}` : "",
    ].filter(Boolean);

    const message = textLines.join("\n");

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Telegram API error");
      }

      setIsSuccess(true);
      setFullName("");
      setPhone("");
      setNote("");

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(
        "Xatolik yuz berdi. Iltimos, birozdan so'ng qayta urinib ko'ring.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md mx-4 rounded-2xl glass px-6 py-6 sm:px-8 sm:py-8 border border-tandir-gold/30"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 text-tandir-text-muted hover:text-tandir-text transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <h3 className="font-display text-2xl text-tandir-text mb-1">
                Buyurtma qoldirish
              </h3>
              {productLabel && (
                <div className="mt-3 rounded-xl bg-tandir-medium/70 border border-tandir-gold/30 px-4 py-3 shadow-inner">
                  <p className="text-[11px] uppercase tracking-wide text-tandir-text-muted mb-1">
                    Tanlangan tandir
                  </p>
                  <p className="text-sm sm:text-base text-tandir-gold font-display leading-snug">
                    {productLabel}
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="block text-sm text-tandir-text-secondary">
                  Ism familiya
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-tandir-medium/60 border border-tandir-medium/80 focus:border-tandir-gold focus:outline-none text-tandir-text text-sm"
                  placeholder="Aliyev Ali"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-tandir-text-secondary">
                  Telefon raqami
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-tandir-medium/60 border border-tandir-medium/80 focus:border-tandir-gold focus:outline-none text-tandir-text text-sm"
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-tandir-text-secondary">
                  Xabar (ixtiyoriy)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full min-h-[70px] px-3 py-2 rounded-lg bg-tandir-medium/60 border border-tandir-medium/80 focus:border-tandir-gold focus:outline-none text-tandir-text text-sm resize-y"
                  placeholder="Qo'shimcha savollaringiz."
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              {isSuccess && (
                <p className="text-sm text-green-400">
                  Buyurtmangiz yuborildi!
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-tandir-gold to-tandir-orange text-tandir-dark rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden btn-shine disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Yuborilmoqda..." : "Buyurtma yuborish"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
