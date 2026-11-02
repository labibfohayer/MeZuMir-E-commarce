import React from 'react';
import { Phone, MessageCircle, MapPin, Wallet, Clock } from 'lucide-react';
import { FacebookIcon } from './icons/FacebookIcon';
import { BRAND_INFO } from '../data/products';

interface FooterProps {
  onOpenChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChecklist }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-24 md:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-green-500 bg-white p-0.5">
                <img
                  src="/images/logo.png"
                  alt="MeZuMir"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-black text-2xl tracking-tight text-white">
                <span className="text-emerald-400">MeZu</span>
                <span className="text-red-500 ml-0.5">Mir</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 font-medium">
              {BRAND_INFO.tagline}
            </p>
            <p className="text-xs text-stone-500 leading-relaxed">
              মিরসরাইয়ের খাঁটি দেশি খাবার, দুগ্ধজাত পণ্য, স্ন্যাক্স ও পানীয়ের নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-emerald-400 transition">
                  আজকের মেনু তালিকা
                </a>
              </li>
              <li>
                <a href="#order-steps" className="hover:text-emerald-400 transition">
                  অর্ডার করার পদ্ধতি
                </a>
              </li>
              <li>
                <a href="#delivery-payment" className="hover:text-emerald-400 transition">
                  ডেলিভারি ও বিকাশ তথ্য
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-emerald-400 transition">
                  স্বচ্ছতা ও বিশ্বাসযোগ্যতা
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition">
                  সচরাচর জিজ্ঞাসা (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              যোগাযোগ ও সেবা
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>হটলাইন: {BRAND_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: {BRAND_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Wallet className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>bKash: {BRAND_INFO.bkashNumber}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>অর্ডার: ২৪ ঘণ্টা গ্রহণ</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>সেবা এলাকা: মিরসরাই, চট্টগ্রাম</span>
              </li>
            </ul>
          </div>

          {/* Verification Audit Card for Owner */}
          <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700 space-y-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between">
              <span>সাইট অডিট</span>
              <span className="text-[10px] bg-brand-green-900 text-emerald-300 px-1.5 py-0.5 rounded">
                বেস রেডি
              </span>
            </h4>
            <p className="text-[11px] text-stone-400 leading-tight">
              সাইটটি প্রকাশের পূর্বে ৭টি নির্দিষ্ট তথ্য যাচাই ও এডিট করতে নিচের বাটনটি চাপুন।
            </p>
            <button
              onClick={onOpenChecklist}
              className="w-full mt-2 bg-brand-green-800 hover:bg-brand-green-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition"
            >
              যাচাইকরণ চেকলিস্ট খুলুন
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} MeZuMir. সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div className="flex items-center gap-4">
            <a
              href={BRAND_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-blue-400 transition flex items-center gap-1"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
              <span>Facebook Page</span>
            </a>
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-emerald-400 transition flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
