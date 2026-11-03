import React from 'react';
import { Utensils, MessageCircle, MapPin, Truck, ShieldCheck, Wallet } from 'lucide-react';
import { FacebookIcon } from './icons/FacebookIcon';
import { BRAND_INFO } from '../data/products';
import { Reveal } from './ui/Reveal';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 bg-gradient-to-b from-brand-green-50/60 via-amber-50/30 to-[#faf8f2]">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-brand-green-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 rounded-full bg-brand-red-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover Banner Card with Smooth Reveal */}
        <Reveal direction="scale" duration={800}>
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-brand-green-200/60 bg-white mb-8 sm:mb-10 group">
            <div className="w-full h-[270px] sm:h-[340px] md:h-[420px] relative">
              <img
                src="/images/cover.png"
                alt="MeZuMir Banner — দেশি খাবার ও ঘরোয়া যত্ন"
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
              />
              {/* Smooth transition from dark left to vibrant food on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent flex items-center">
                <div className="p-4 sm:p-8 md:p-12 max-w-sm sm:max-w-md lg:max-w-lg text-white">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-brand-green-600/90 backdrop-blur-md text-white text-[11px] sm:text-sm font-bold px-2.5 py-1 sm:px-3 rounded-full mb-2 sm:mb-3 shadow">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-300"></span>
                    Fresh • Local • Homemade
                  </div>
                  <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-md">
                    {BRAND_INFO.headline}
                  </h1>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-base md:text-lg font-medium text-emerald-100 drop-shadow">
                    {BRAND_INFO.subheadline}
                  </p>

                  <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      onClick={onScrollToMenu}
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-brand-green-600 hover:bg-brand-green-500 text-white text-xs sm:text-sm md:text-base font-bold px-3.5 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95"
                    >
                      <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      আজকের মেনু দেখুন
                    </button>
                    <a
                      href={BRAND_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 hover:bg-white text-brand-green-950 text-xs sm:text-sm md:text-base font-bold px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-xl shadow hover:shadow-lg transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                      WhatsApp-এ অর্ডার
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Detailed Brand Context & Info Section with Smooth Slide Up */}
        <Reveal delay={150}>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-brand-green-100 shadow-xl mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Brand Bio & Action Buttons */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-brand-green-800 bg-brand-green-50 border border-brand-green-200 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-brand-red-600"></span>
                ব্র্যান্ড পরিচিতি: {BRAND_INFO.identity}
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                মিরসরাইয়ের জন্য বিশেষ খাবার ও সহজ ডেলিভারি
              </h2>

              <p className="text-gray-700 text-sm sm:text-lg leading-relaxed">
                {BRAND_INFO.description}
              </p>

              {/* Three Main Action Buttons as mandated by user */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
                {/* 1. প্রধান বোতাম */}
                <button
                  onClick={onScrollToMenu}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition active:scale-95 text-sm sm:text-base"
                >
                  <Utensils className="w-5 h-5 text-brand-green-200" />
                  <span>আজকের মেনু দেখুন</span>
                </button>

                {/* 2. দ্বিতীয় বোতাম */}
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3.5 rounded-xl shadow-md hover:shadow-lg transition active:scale-95 text-sm sm:text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp-এ অর্ডার করুন</span>
                </a>

                {/* 3. Facebook বোতাম */}
                <a
                  href={BRAND_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-5 py-3.5 rounded-xl border border-blue-200 transition text-sm sm:text-base"
                >
                  <FacebookIcon className="w-5 h-5" />
                  <span>Facebook Page-এ যান</span>
                </a>
              </div>
            </div>

            {/* Right Column: Key Requirement Information Badges */}
            <div className="lg:col-span-5 bg-brand-green-50/70 rounded-2xl p-4 sm:p-6 border border-brand-green-200/80 space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-900 border-b border-brand-green-200 pb-2 flex items-center justify-between">
                <span>গুরুত্বপূর্ণ তথ্য-ব্যাজ</span>
                <span className="text-[11px] sm:text-xs font-normal text-brand-red-700 bg-brand-red-50 px-2 py-0.5 rounded border border-brand-red-200">
                  সতর্কতা ও স্বচ্ছতা
                </span>
              </h3>

              <div className="space-y-2.5 sm:space-y-3">
                {/* Badge 1: সেবা এলাকা */}
                <div className="flex items-start gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-brand-green-100 shadow-sm">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs text-gray-500 font-medium">সেবা এলাকা</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900 flex flex-wrap items-center gap-1.5 mt-0.5">
                      <span>মিরসরাইয়ে সেবা —</span>
                      <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[11px] font-semibold">[এলাকা নিশ্চিত করুন]</span>
                    </div>
                  </div>
                </div>

                {/* Badge 2: ডেলিভারি চার্জ ফ্রি */}
                <div className="flex items-start gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-brand-green-100 shadow-sm">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs text-gray-500 font-medium">ডেলিভারি চার্জ</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-700 flex flex-wrap items-center gap-1.5 mt-0.5">
                      <span>ডেলিভারি চার্জ ফ্রি —</span>
                      <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[11px] font-semibold">[প্রযোজ্য এলাকা নিশ্চিত করুন]</span>
                    </div>
                  </div>
                </div>

                {/* Badge 3: ন্যূনতম অর্ডার ৳৩০০ */}
                <div className="flex items-start gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-brand-green-100 shadow-sm">
                  <div className="p-2 rounded-lg bg-red-100 text-brand-red-700 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs text-gray-500 font-medium">অর্ডারের শর্ত</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                      ন্যূনতম অর্ডার <span className="text-brand-red-600 font-black">৳৩০০</span>
                    </div>
                  </div>
                </div>

                {/* Badge 4: bKash নম্বর */}
                <div className="flex items-start gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-brand-green-100 shadow-sm">
                  <div className="p-2 rounded-lg bg-pink-100 text-pink-700 shrink-0 mt-0.5">
                    <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs text-gray-500 font-medium">পেমেন্ট (bKash)</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-2">
                      <span>bKash:</span>
                      <code className="bg-pink-50 text-pink-800 font-mono font-bold px-2 py-0.5 rounded border border-pink-200">
                        {BRAND_INFO.bkashNumber}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] sm:text-[11px] text-gray-500 text-center pt-1 font-medium">
                * নিশ্চিতকরণের আগে কোনো অগ্রিম পেমেন্ট করবেন না।
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
};
