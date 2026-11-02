import React, { useState } from 'react';
import { Star, CheckCircle, MapPin, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export interface CustomerReview {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  foodItem: string;
  comment: string;
  avatarBg: string;
}

export const reviewsData: CustomerReview[] = [
  {
    id: 1,
    name: 'তানভীর আহমেদ',
    location: 'মিরসরাই পৌরসভা',
    rating: 5,
    date: '২ দিন আগে',
    foodItem: 'দুধের মাঠা ও দই',
    comment: 'মাঠাটা সত্যি অসাধারণ ছিল! কোনো প্রকার ভেজাল বা কৃত্রিম গন্ধ নেই, একদম খাঁটি দুধের স্বাদ। বোতলের প্যাকেজিংও ছিল খুব পরিষ্কার।',
    avatarBg: 'bg-emerald-600',
  },
  {
    id: 2,
    name: 'নুসরাত জাহান',
    location: 'জোরারগঞ্জ',
    rating: 5,
    date: '৩ দিন আগে',
    foodItem: 'স্পেশাল ঝাল খিচুড়ি ও শুঁটকি ভর্তা',
    comment: 'বৃষ্টির দিনে ঝাল খিচুড়ি আর শুঁটকি ভর্তা অর্ডার করেছিলাম। ঘরোয়া রান্না একদম মায়ের হাতের রান্নার মতো স্বাদ পেয়েছি। ঝালটা একদম পারফেক্ট ছিল।',
    avatarBg: 'bg-pink-600',
  },
  {
    id: 3,
    name: 'ইঞ্জিনিয়ার ফাহিম রেজা',
    location: 'বারইয়ারহাট',
    rating: 5,
    date: '৪ দিন আগে',
    foodItem: 'সিঙ্গারা ও দুধের মাঠা',
    comment: 'অফিসের নাস্তার জন্য সিঙ্গারা আর মাঠা অর্ডার দিয়েছিলাম। গরম গরম মুচমুচে সিঙ্গারা আর ঠান্ডা মাঠার কম্বিনেশন দারুণ লেগেছে। সহকর্মীরা সবাই প্রশংসা করেছে।',
    avatarBg: 'bg-blue-600',
  },
  {
    id: 4,
    name: 'কামরুল হাসান',
    location: 'মস্তাননগর',
    rating: 5,
    date: 'গত সপ্তাহে',
    foodItem: 'দই (১ কেজি)',
    comment: 'মাটির হাঁড়ির মিষ্টি দইটা সত্যি দারুণ জমাট বাঁধা ও সুস্বাদু। পারিবারিক অনুষ্ঠানে মেহমানদের দিয়েছিলাম, সবাই খুব পছন্দ করেছে।',
    avatarBg: 'bg-amber-600',
  },
  {
    id: 5,
    name: 'সাদিয়া আফরোজ',
    location: 'মিঠানালা',
    rating: 5,
    date: 'গত সপ্তাহে',
    foodItem: 'ছোলা বুট ও সিদ্ধ ডিম',
    comment: 'ছোলা বুটের মশলা আর টেস্ট একদম খাঁটি ঘরোয়া। অতিরিক্ত তেল ছিল না। স্বাস্থ্যকর ও পুষ্টিকর নাস্তার জন্য দারুণ অপশন।',
    avatarBg: 'bg-purple-600',
  },
  {
    id: 6,
    name: 'মাহমুদুল হক',
    location: 'করেরহাট',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    foodItem: 'দুধের মাঠা (২৫০ মি.লি.)',
    comment: 'গরমে এক বোতল ঠান্ডা মাঠা খেয়ে প্রাণ জুড়িয়ে গেছে। মিরসরাইয়ে ঘরে বসে এমন খাঁটি স্বাদের খাবার পাওয়া সত্যিই আনন্দের।',
    avatarBg: 'bg-teal-600',
  },
  {
    id: 7,
    name: 'ডা. রফিকুল ইসলাম',
    location: 'মিরসরাই সদর',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    foodItem: 'দই ও খাঁটি মধু',
    comment: 'দইয়ের কোয়ালিটি অত্যন্ত প্রিমিয়াম। চিনি বা পানির বাড়তি আধিক্য নেই, একদম পারফেক্ট ঘনত্ব। স্বাস্থ্য সচেতন মানুষের জন্য নির্ভরযোগ্য ঠিকানা।',
    avatarBg: 'bg-indigo-600',
  },
  {
    id: 8,
    name: 'নাসরিন সুলতানা',
    location: 'বড়তাকিয়া',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    foodItem: 'বিশেষ খোলার পিঠা ও শুঁটকি ভর্তা',
    comment: 'খোলার পিঠা একদম পাতলা আর নরম ছিল। শুঁটকি ভর্তা দিয়ে খেতে অসাধারণ লেগেছে। মিরসরাইয়ের ট্র্যাডিশনাল স্বাদ বজায় রেখেছে।',
    avatarBg: 'bg-rose-600',
  },
  {
    id: 9,
    name: 'ইমতিয়াজ মাহমুদ',
    location: 'হিংগুলী',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    foodItem: 'স্পেশাল ঝাল খিচুড়ি',
    comment: 'পরিমাণ এবং খাবারের মান দুটোই মূল্য অনুযায়ী যথেষ্ট সন্তোষজনক। ডেলিভারি ভাই খুব আন্তরিক ছিলেন এবং ঠিক সময়ে পৌঁছে দিয়েছেন।',
    avatarBg: 'bg-cyan-600',
  },
  {
    id: 10,
    name: 'আফসানা মিমি',
    location: 'মায়ানী',
    rating: 5,
    date: '৩ সপ্তাহ আগে',
    foodItem: 'সিঙ্গারা (১০ পিস)',
    comment: 'সিঙ্গারার ভেতরের পুরটা খুবই টেস্টি, কোনো পোড়া তেলের ঝাঁঝালো গন্ধ ছিল না। বিকেলের নাস্তার জন্য আমাদের নিয়মিত মেনু হয়ে গেছে।',
    avatarBg: 'bg-orange-600',
  },
  {
    id: 11,
    name: 'আরিফুল ইসলাম',
    location: 'ধুম ইউনিয়ন',
    rating: 5,
    date: '৩ সপ্তাহ আগে',
    foodItem: 'ফ্রাইড রাইস ও দুধের মাঠা',
    comment: 'ফ্রাইড রাইস ফ্রেশ ও গরম পেয়েছি। সাথে ঠান্ডা মাঠা পুরো খাবারটাকে পরিপূর্ণ তৃপ্তি দিয়েছে। MeZuMir-এর সার্ভিস সত্যিই প্রশংসনীয়।',
    avatarBg: 'bg-emerald-700',
  },
  {
    id: 12,
    name: 'জাবেদ ইকবাল',
    location: 'মিরসরাই কলেজ রোড',
    rating: 5,
    date: '১ মাস আগে',
    foodItem: 'ছোলা বুট ও সিদ্ধ ডিম',
    comment: 'সকালের নাস্তায় ছোলা বুট আর ডিম নিয়েছিলাম। পরিষ্কার পরিচ্ছন্ন বক্স প্যাকেজিং এবং সময়ানুবর্তিতা সত্যিই মুগ্ধ করেছে।',
    avatarBg: 'bg-brand-red-600',
  },
];

export const ReviewsSection: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [filter, setFilter] = useState<string>('all');

  const filteredReviews = reviewsData.filter((rev) => {
    if (filter === 'all') return true;
    return rev.foodItem.toLowerCase().includes(filter.toLowerCase());
  });

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-gradient-to-b from-white via-brand-green-50/30 to-[#faf8f2] border-b border-brand-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Reveal */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 bg-brand-green-100 text-brand-green-900 text-xs font-bold px-3.5 py-1.5 rounded-full border border-brand-green-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-green-700" />
              <span>মিরসরাইবাসীর পছন্দের প্রমাণ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              গ্রাহকদের সন্তুষ্টি ও মতামত
            </h2>
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              মিরসরাইয়ের বিভিন্ন এলাকা থেকে যারা MeZuMir-এর খাবার গ্রহণ করেছেন, তাদের প্রত্যক্ষ অভিজ্ঞতা ও মন্তব্য।
            </p>

            {/* Aggregate Rating Banner */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-white px-6 py-3 rounded-2xl border border-brand-green-200 shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-black text-lg text-gray-900 ml-1">৪.৯ / ৫.০</span>
              </div>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <div className="text-xs font-bold text-brand-green-800">
                ১০০+ ভেরিফায়েড গ্রাহকের মূল্যায়ন
              </div>
            </div>
          </div>
        </Reveal>

        {/* Filter Pills with Reveal */}
        <Reveal delay={100}>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none text-xs">
            <button
              onClick={() => {
                setFilter('all');
                setVisibleCount(6);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                filter === 'all'
                  ? 'bg-brand-green-700 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              সব রিভিউ ({reviewsData.length})
            </button>
            <button
              onClick={() => {
                setFilter('মাঠা');
                setVisibleCount(6);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                filter === 'মাঠা'
                  ? 'bg-brand-green-700 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              দুধের মাঠা
            </button>
            <button
              onClick={() => {
                setFilter('খিচুড়ি');
                setVisibleCount(6);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                filter === 'খিচুড়ি'
                  ? 'bg-brand-green-700 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              খিচুড়ি ও ভর্তা
            </button>
            <button
              onClick={() => {
                setFilter('দই');
                setVisibleCount(6);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                filter === 'দই'
                  ? 'bg-brand-green-700 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              মিষ্টি দই
            </button>
            <button
              onClick={() => {
                setFilter('সিঙ্গারা');
                setVisibleCount(6);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                filter === 'সিঙ্গারা'
                  ? 'bg-brand-green-700 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              সিঙ্গারা
            </button>
          </div>
        </Reveal>

        {/* Reviews Grid with Staggered Cascading Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((rev, idx) => (
            <Reveal key={rev.id} delay={(idx % 3) * 90}>
              <div
                className="bg-white p-6 rounded-2xl border border-brand-green-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
              >
              <div>
                {/* Header: Avatar, Name, Location */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}
                    >
                      {rev.name.slice(0, 1)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">
                        {rev.name}
                      </h4>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-brand-green-700 shrink-0" />
                        <span>{rev.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-gray-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                {/* Rating & Food item badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-brand-green-800 bg-brand-green-50 px-2 py-0.5 rounded border border-brand-green-200 truncate max-w-[170px]">
                    {rev.foodItem}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Verified Buyer Footer */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ভেরিফায়েড কাস্টমার</span>
                </span>
                <span className="text-gray-400 font-normal">মিরসরাই</span>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredReviews.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredReviews.length))}
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-green-50 text-brand-green-800 border-2 border-brand-green-600 font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition active:scale-95"
            >
              <span>আরও {filteredReviews.length - visibleCount}টি রিভিউ দেখুন</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Leave a review prompt with Reveal */}
        <Reveal delay={150}>
          <div className="mt-12 p-6 bg-brand-cream/60 rounded-3xl border border-brand-green-200/80 text-center max-w-2xl mx-auto space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-green-100 text-brand-green-800 flex items-center justify-center mx-auto mb-1">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              আপনি কি MeZuMir-এর খাবার উপভোগ করেছেন?
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
              আপনার অভিজ্ঞতা ও মূল্যবান মতামত আমাদের আরও ভালো খাবার ও সেবা উপহার দিতে অনুপ্রাণিত করে।
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/8801854840499?text=MeZuMir%20খাবারের%20রিভিউ%20দিতে%20চাইঃ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition"
              >
                <span>WhatsApp-এ মতামত শেয়ার করুন</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
