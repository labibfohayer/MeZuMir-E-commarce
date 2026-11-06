import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { BRAND_INFO, IS_CONTACT_ACTIVE } from '../data/products';
import { Reveal } from './ui/Reveal';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'সব খাবার কি সব সময় পাওয়া যায়?',
      a: 'না। কিছু খাবার মৌসুমি বা শিগগির আসছে। বর্তমান মেনুর অবস্থা দেখে অর্ডারের আগে প্রাপ্যতা নিশ্চিত করুন।',
    },
    {
      q: 'ডেলিভারি কি ফ্রি?',
      a: 'ডেলিভারি চার্জ ফ্রি। [কোন কোন এলাকায় প্রযোজ্য তা এখানে লিখুন — যেমন: মিরসরাই পৌরসভা ও সংলগ্ন বাজারসমূহ]।',
    },
    {
      q: 'ন্যূনতম অর্ডার কত?',
      a: '৳৩০০ (তিনশত টাকা)।',
    },
    {
      q: '২৪ ঘণ্টা অর্ডার করলে কি সঙ্গে সঙ্গে খাবার পৌঁছাবে?',
      a: '২৪ ঘণ্টা অর্ডার পাঠানো যাবে। খাবার প্রস্তুত ও পৌঁছানোর সম্ভাব্য সময় অর্ডার নিশ্চিত করার সময় জানানো হবে।',
    },
    {
      q: 'কীভাবে পেমেন্ট করব?',
      a: `bKash নম্বর ${BRAND_INFO.bkashNumber}। পেমেন্টের আগে অর্ডারের মোট টাকা ও নির্দেশনা নিশ্চিত করুন। নগদ ক্যাশেও ডেলিভারি নেওয়া যাবে।`,
    },
    {
      q: 'আমার এলাকায় ডেলিভারি হয় কি?',
      a: `[নিশ্চিত ডেলিভারি এলাকার তালিকা লিখুন — যেমন: মিরসরাই পৌরসভা, জোরারগঞ্জ, মস্তাননগর, মিঠানালা, বারইয়ারহাট]। তালিকায় আপনার এলাকা না থাকলে অর্ডারের আগে সরাসরি WhatsApp-এ যোগাযোগ করুন।`,
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-[#faf8f2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-brand-green-100 text-brand-green-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-brand-green-200">
              <HelpCircle className="w-4 h-4 text-brand-green-700" />
              সাধারণ জিজ্ঞাসা
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              অর্ডারের পূর্বে আপনার মনের সাধারণ প্রশ্নের স্পষ্ট উত্তর নিচে দেওয়া হলো।
            </p>
          </div>
        </Reveal>

        {/* Accordions with Staggered Reveal */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 60}>
                <div
                  className="bg-white rounded-2xl border border-brand-green-100/90 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-brand-green-700 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-stone-100 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-brand-green-100 text-brand-green-800' : 'text-gray-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-stone-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Support helper with Reveal */}
        <Reveal delay={200}>
          <div className="mt-10 p-6 bg-white rounded-2xl border border-brand-green-200 shadow-sm text-center">
          <p className="text-sm text-gray-700 font-medium">
            অন্য কোনো প্রশ্ন বা বিশেষ খাবারের চাহিদা আছে?
          </p>
          <a
            href={BRAND_INFO.whatsappUrl}
            onClick={(e) => {
              if (!IS_CONTACT_ACTIVE) {
                e.preventDefault();
                alert('WhatsApp সাপোর্ট সেবা সাময়িকভাবে বন্ধ আছে।');
              }
            }}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow transition ${
              !IS_CONTACT_ACTIVE ? 'opacity-60 cursor-not-allowed' : 'hover:bg-emerald-700'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp-এ সরাসরি কথা বলুন</span>
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
};
