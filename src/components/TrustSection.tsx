import React from 'react';
import { ShieldCheck, Eye, BadgePercent, Clock, HelpCircle, Image as ImageIcon, HeartHandshake } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      title: 'মেনু ও দাম সম্পূর্ণ প্রকাশ্য',
      desc: 'প্রতিটি খাবারের স্পষ্ট নাম, বর্তমান দাম এবং পরিমাণ শুরুতেই উন্মুক্ত রাখা হয়েছে।',
      icon: Eye,
    },
    {
      title: 'ন্যূনতম অর্ডার ও ডেলিভারি চার্জ স্পষ্ট',
      desc: 'কোনো গোপন বা অপ্রত্যাশিত চার্জ নেই। ন্যূনতম ৳৩০০ ও ডেলিভারির এলাকা শুরুতেই উল্লেখিত।',
      icon: BadgePercent,
    },
    {
      title: 'অর্ডারের আগে প্রাপ্যতা ও সম্ভাব্য সময়',
      desc: 'অর্ডার নিশ্চিত করার পূর্বে আইটেম তৈরি আছে কি না এবং পৌঁছাতে সম্ভাব্য কত সময় লাগবে তা সরাসরি জানানো হবে।',
      icon: Clock,
    },
    {
      title: 'উপকরণ ও অ্যালার্জি বিষয়ক তথ্য',
      desc: 'যেকোনো খাবারের নির্দিষ্ট উপাদান বা অ্যালার্জি সংক্রান্ত প্রশ্ন থাকলে অর্ডারের আগে নিঃসঙ্কোচে জেনে নিতে পারেন।',
      icon: HelpCircle,
    },
    {
      title: 'বাস্তব খাবারের ছবি',
      desc: 'আমরা খাবার ও প্যাকেজিংয়ের বাস্তব ভিজ্যুয়াল উপস্থাপন করি। বিভ্রান্তিকর কোনো কৃত্রিম ছবি ব্যবহার করা হয় না।',
      icon: ImageIcon,
    },
    {
      title: 'গ্রাহকের সত্য মতামত',
      desc: 'আমরা কোনো ফেক বা কাল্পনিক রিভিউ প্রদর্শন করি না। কেবল গ্রাহকের প্রত্যক্ষ অনুমতি ও সত্য অভিজ্ঞতাই শেয়ার করা হয়।',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="trust" className="py-12 sm:py-16 bg-white border-b border-brand-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              স্বচ্ছ ও বিশ্বস্ত সেবা
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              অর্ডারের আগে সব তথ্য পরিষ্কার
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              আমরা কোনো বাড়াবাড়ি বা ভুয়া দাবি করি না — খাবার প্রস্তুত ও পৌঁছে দেওয়ার ক্ষেত্রে সততা ও আন্তরিকতা আমাদের মূল দর্শন।
            </p>
          </div>
        </Reveal>

        {/* 6 Trust Points Grid with Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Reveal key={index} delay={(index % 3) * 100}>
                <div
                  className="p-6 rounded-2xl bg-brand-cream/40 border border-brand-green-100/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Anti-Deception Statement */}
        <Reveal delay={200}>
          <div className="mt-10 p-4 bg-brand-green-50 rounded-2xl border border-brand-green-200 text-center max-w-2xl mx-auto text-xs text-brand-green-900">
            <span className="font-bold">MeZuMir অঙ্গীকার:</span> কোনো ভুয়া রিভিউ, অতিরঞ্জিত দাবি কিংবা তাৎক্ষণিক পৌঁছানোর অসম্ভব প্রতিশ্রুতি আমরা দিই না।
          </div>
        </Reveal>
      </div>
    </section>
  );
};
