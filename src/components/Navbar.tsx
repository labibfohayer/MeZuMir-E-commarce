import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { FacebookIcon } from './icons/FacebookIcon';
import { BRAND_INFO, IS_CONTACT_ACTIVE } from '../data/products';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenChecklist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenChecklist,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-green-100 shadow-sm transition-all">
      {/* Top Banner Notice */}
      <div className="bg-brand-green-800 text-white text-xs sm:text-sm py-1.5 px-3 sm:px-4 font-medium overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile Ticker (No text cut off, seamless smooth scroll) */}
          <div className="sm:hidden w-full overflow-hidden whitespace-nowrap flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-red-500 animate-ping shrink-0 mr-2"></span>
            <div className="animate-mobile-ticker">
              <span className="mr-8">
                মিরসরাইয়ে খাবার সেবা • ২৪ ঘণ্টা অর্ডার গ্রহণ • ফ্রি ডেলিভারি প্রযোজ্য এলাকায় • ন্যূনতম অর্ডার {BRAND_INFO.minOrderText} • bKash: {BRAND_INFO.bkashNumber}
              </span>
              <span className="mr-8">
                মিরসরাইয়ে খাবার সেবা • ২৪ ঘণ্টা অর্ডার গ্রহণ • ফ্রি ডেলিভারি প্রযোজ্য এলাকায় • ন্যূনতম অর্ডার {BRAND_INFO.minOrderText} • bKash: {BRAND_INFO.bkashNumber}
              </span>
            </div>
          </div>

          {/* Desktop Static Notice */}
          <div className="hidden sm:flex items-center space-x-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-red-500 animate-ping"></span>
            <span className="truncate">
              মিরসরাইয়ে খাবার সেবা • ২৪ ঘণ্টা অর্ডার গ্রহণ • ফ্রি ডেলিভারি প্রযোজ্য এলাকায়
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span>ন্যূনতম অর্ডার: {BRAND_INFO.minOrderText}</span>
            <span className="border-l border-brand-green-600 pl-4">bKash: {BRAND_INFO.bkashNumber}</span>
            <button
              onClick={onOpenChecklist}
              className="inline-flex items-center gap-1 bg-brand-green-700 hover:bg-brand-green-600 px-2 py-0.5 rounded text-brand-green-100 text-xs transition"
              title="মালিকের যাচাইকরণ চেকলিস্ট"
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
              যাচাই চেকলিস্ট
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-brand-green-600 p-0.5 bg-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/images/logo.png"
                alt="MeZuMir Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center font-black tracking-tight text-xl sm:text-3xl leading-none">
                <span className="text-brand-green-800">MeZu</span>
                <span className="text-brand-red-600 ml-0.5">Mir</span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 font-medium hidden xs:block sm:block">
                মিরসরাইয়ের চেনা স্বাদ, সহজ অনলাইন অর্ডারে
              </p>
            </div>
          </a>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <a href="#menu" className="hover:text-brand-green-700 transition">
              আজকের মেনু
            </a>
            <a href="#order-steps" className="hover:text-brand-green-700 transition">
              অর্ডার পদ্ধতি
            </a>
            <a href="#delivery-payment" className="hover:text-brand-green-700 transition">
              ডেলিভারি ও পেমেন্ট
            </a>
            <a href="#trust" className="hover:text-brand-green-700 transition">
              বিশ্বাসযোগ্যতা
            </a>
            <a href="#reviews" className="hover:text-brand-green-700 transition">
              গ্রাহকের রিভিউ
            </a>
            <a href="#faq" className="hover:text-brand-green-700 transition">
              প্রশ্নোত্তর
            </a>
          </nav>

          {/* Quick Actions & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Facebook button */}
            <a
              href={BRAND_INFO.facebookUrl}
              onClick={(e) => {
                if (!IS_CONTACT_ACTIVE) {
                  e.preventDefault();
                  alert('ফেসবুক পেজ লিংক সাময়িকভাবে বন্ধ আছে।');
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 sm:px-3 sm:py-2 text-xs font-semibold rounded-lg border border-blue-200 text-blue-700 bg-blue-50/60 flex items-center gap-1.5 transition shrink-0 ${
                !IS_CONTACT_ACTIVE ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-100'
              }`}
              title={IS_CONTACT_ACTIVE ? "Facebook Page" : "সাময়িকভাবে স্থগিত"}
            >
              <FacebookIcon className="w-4 h-4" />
              <span className="hidden sm:inline">ফেসবুক পেজ</span>
            </a>

            {/* WhatsApp direct button */}
            <a
              href={BRAND_INFO.whatsappUrl}
              onClick={(e) => {
                if (!IS_CONTACT_ACTIVE) {
                  e.preventDefault();
                  alert('WhatsApp অর্ডার সেবা সাময়িকভাবে বন্ধ আছে।');
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white flex items-center gap-1.5 shadow-sm transition shrink-0 ${
                !IS_CONTACT_ACTIVE ? 'opacity-60 cursor-not-allowed' : 'hover:bg-emerald-700'
              }`}
              title={IS_CONTACT_ACTIVE ? "WhatsApp Message" : "সাময়িকভাবে স্থগিত"}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp অর্ডার</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-brand-green-700 hover:bg-brand-green-800 text-white px-2.5 sm:px-4 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition active:scale-95 shrink-0"
              aria-label="শপিং কার্ট"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-red-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block text-xs leading-tight">
                <span className="block text-brand-green-200 text-[10px]">কার্ট</span>
                <span>৳{cartTotal}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
