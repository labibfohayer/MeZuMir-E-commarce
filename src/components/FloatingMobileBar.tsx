import React from 'react';
import { ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { BRAND_INFO, IS_CONTACT_ACTIVE } from '../data/products';

interface FloatingMobileBarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
      <div className="bg-brand-green-950/95 backdrop-blur-md text-white p-2.5 rounded-2xl shadow-2xl border border-brand-green-800 flex items-center justify-between gap-2">
        {/* Cart status or Direct WhatsApp */}
        {cartCount > 0 ? (
          <div
            onClick={onOpenCart}
            className="flex-1 flex items-center justify-between cursor-pointer pl-2 pr-1"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-brand-green-800 flex items-center justify-center text-white">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 bg-brand-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-brand-green-950">
                  {cartCount}
                </span>
              </div>
              <div>
                <div className="text-[11px] text-brand-green-300 font-medium">কার্ট আইটেম: {cartCount} টি</div>
                <div className="text-sm font-black text-white">৳{cartTotal}</div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenCart();
              }}
              className="bg-brand-green-600 hover:bg-brand-green-500 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1 shadow"
            >
              <span>অর্ডার সম্পন্ন করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-between px-1 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-200 truncate">
                মিরসরাইয়ে ২৪ ঘণ্টা অর্ডার চলছে
              </span>
            </div>
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
              className={`bg-emerald-600 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 shadow shrink-0 transition ${
                !IS_CONTACT_ACTIVE ? 'opacity-60 cursor-not-allowed' : 'hover:bg-emerald-500 active:scale-95'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp অর্ডার</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
