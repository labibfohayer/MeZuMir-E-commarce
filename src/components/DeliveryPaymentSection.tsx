import React from 'react';
import { Truck, Clock, ShieldCheck, Wallet, Check } from 'lucide-react';
import { BRAND_INFO } from '../data/products';
import { Reveal } from './ui/Reveal';

export const DeliveryPaymentSection: React.FC = () => {
  return (
    <section id="delivery-payment" className="py-12 sm:py-16 bg-gradient-to-b from-[#faf8f2] to-brand-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-green-700 font-bold text-xs uppercase tracking-wider bg-brand-green-100 border border-brand-green-200 px-3 py-1 rounded-full">
              সহজ ও স্পষ্ট শর্তাবলী
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
              ডেলিভারি ও পেমেন্ট তথ্য
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              মিরসরাই এলাকায় নিরাপদে ও সুনির্দিষ্ট নিয়মে আমাদের খাবার আপনার দোরগোড়ায় পৌঁছে দেওয়া হয়।
            </p>
          </div>
        </Reveal>

        {/* Feature Cards Grid with Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Minimum Order */}
          <Reveal delay={0}>
            <div className="bg-white p-6 rounded-2xl border border-brand-green-100 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-red-50 text-brand-red-600 border border-brand-red-100 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  ন্যূনতম অর্ডার {BRAND_INFO.minOrderText}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  মিরসরাইয়ের যেকোনো প্রান্ত থেকে অর্ডার নিশ্চিত করতে সর্বনিম্ন ৩০০ টাকার খাবার অর্ডার করতে হবে।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-brand-green-800 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-brand-green-600" />
                <span>কার্টে স্বয়ংক্রিয় প্রগ্রেস বার সংযুক্ত</span>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Free Delivery */}
          <Reveal delay={100}>
            <div className="bg-white p-6 rounded-2xl border border-brand-green-100 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  ডেলিভারি চার্জ ফ্রি
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  ডেলিভারি চার্জ ফ্রি — <span className="bg-amber-50 text-amber-900 font-semibold px-2 py-0.5 rounded border border-amber-200 text-xs">[প্রযোজ্য এলাকা নিশ্চিত করুন]</span>।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-stone-500 font-medium">
                * মিরসরাই পৌরসভা ও নিকটবর্তী বাজারসমূহের জন্য প্রযোজ্য।
              </div>
            </div>
          </Reveal>

          {/* Card 3: 24h Order Taking */}
          <Reveal delay={200}>
            <div className="bg-white p-6 rounded-2xl border border-brand-green-100 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  ২৪ ঘণ্টা অর্ডার গ্রহণ
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  অর্ডার ২৪ ঘণ্টা পাঠানো যাবে। খাবার প্রস্তুত ও পৌঁছানোর সম্ভাব্য সময় অর্ডার নিশ্চিত করার সময় জানিয়ে দেওয়া হবে।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-stone-500 font-medium">
                * তাজা খাবার তৈরি ও পাঠাতে প্রয়োজনীয় সময় বিবেচনা করা হয়।
              </div>
            </div>
          </Reveal>
        </div>

        {/* Payment Policy & bKash Information Box with Reveal */}
        <Reveal delay={250}>
          <div className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border-2 border-brand-green-200 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-pink-700 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full text-xs font-bold">
                <Wallet className="w-4 h-4" />
                <span>নিরাপদ পেমেন্ট গাইডলাইন</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                bKash পেমেন্ট নম্বর: <span className="text-pink-600">{BRAND_INFO.bkashNumber}</span>
              </h3>
              <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-green-600 mt-2 shrink-0"></span>
                  <span><strong>অর্ডারের আগে কোনো টাকা পাঠাবেন না:</strong> মোট দাম ও পেমেন্ট নির্দেশনা নিশ্চিত হওয়ার আগে গ্রাহককে পেমেন্ট করতে বলা হয় না।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-green-600 mt-2 shrink-0"></span>
                  <span><strong>ক্যাশ অন ডেলিভারি:</strong> খাবার হাতে পাওয়ার পর নগদে পরিশোধের সুবিধাও বিদ্যমান।</span>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-auto bg-pink-50/80 p-5 rounded-2xl border border-pink-200 text-center shrink-0">
              <div className="text-xs text-pink-800 font-bold uppercase tracking-wider mb-1">
                বিকাশ পার্সোনাল / মার্চেন্ট
              </div>
              <div className="text-2xl font-mono font-black text-pink-700 tracking-wider">
                {BRAND_INFO.bkashNumber}
              </div>
              <div className="text-[11px] text-pink-800 mt-2 bg-white/80 py-1 px-3 rounded-lg border border-pink-200">
                রেফারেন্স হিসেবে আপনার নাম দিন
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
};
