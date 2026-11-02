import React from 'react';
import { MessageCircle, Utensils, Heart } from 'lucide-react';
import { FacebookIcon } from './icons/FacebookIcon';
import { BRAND_INFO } from '../data/products';
import { Reveal } from './ui/Reveal';

interface CtaSectionProps {
  onScrollToMenu: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onScrollToMenu }) => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-green-900 via-brand-green-950 to-brand-green-900 text-white relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-green-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-brand-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Reveal>
          <div className="inline-flex items-center gap-1.5 bg-brand-green-800/80 border border-brand-green-700 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
            <Heart className="w-3.5 h-3.5 fill-brand-red-500 text-brand-red-500" />
            ঘরোয়া যত্নে তৈরি দেশি খাবারের স্বাদ
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            আজকের পছন্দের খাবারটি অর্ডার করুন
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            মেনু দেখুন, আপনার এলাকা নিশ্চিত করুন, তারপর WhatsApp-এ অর্ডার পাঠান।
          </p>

          {/* Buttons as commanded */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* বোতাম ১: WhatsApp-এ অর্ডার করুন */}
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-brand-green-950 font-black text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-xl hover:shadow-2xl transition transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-brand-green-950 fill-brand-green-950" />
              <span>WhatsApp-এ অর্ডার করুন</span>
            </a>

            {/* বোতাম ২: Facebook Page-এ যান */}
            <a
              href={BRAND_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-white/20 transition backdrop-blur-sm"
            >
              <FacebookIcon className="w-5 h-5" />
              <span>Facebook Page-এ যান</span>
            </a>

            {/* Additional Menu scroll shortcut */}
            <button
              onClick={onScrollToMenu}
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-200 hover:text-white px-4 py-2 transition"
            >
              <Utensils className="w-4 h-4" />
              <span>পুনরায় মেনু দেখতে স্ক্রল করুন</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
