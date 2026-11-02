import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, CheckCircle, Wallet, Copy, Check, AlertTriangle } from 'lucide-react';

export const OrderSteps: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sampleMessage = `MeZuMir-এ অর্ডার করতে চাই।
নাম: [আপনার নাম]
ফোন: [আপনার মোবাইল নম্বর]
ঠিকানা/এলাকা: [মিরসরাইয়ের নির্দিষ্ট এলাকা]
খাবার ও পরিমাণ: [যেমন: দুধের মাঠা ১ বোতল, দই ১ কেজি]
পেমেন্ট পদ্ধতি: বিকাশ / ক্যাশ অন ডেলিভারি
অর্ডারের প্রাপ্যতা ও সম্ভাব্য ডেলিভারি সময় জানাবেন।`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const steps = [
    {
      num: 'ধাপ ১',
      title: 'খাবার ও পরিমাণ বেছে নিন',
      desc: 'আমাদের মেনু তালিকা থেকে আপনার পছন্দের খাবার এবং পরিমাণ নির্বাচন করুন।',
      icon: ShoppingBag,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      num: 'ধাপ ২',
      title: 'WhatsApp-এ তথ্য পাঠান',
      desc: 'WhatsApp-এ আপনার নাম, ফোন নম্বর, এলাকা/ঠিকানা, নির্বাচিত খাবার ও পরিমাণ লিখে পাঠান।',
      icon: MessageSquare,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      num: 'ধাপ ৩',
      title: 'প্রাপ্যতা ও ডেলিভারি সময় নিশ্চিতকরণ',
      desc: 'MeZuMir-এর কাছ থেকে আইটেমের প্রাপ্যতা, মোট দাম, পেমেন্ট এবং সম্ভাব্য ডেলিভারি সময় নিশ্চিত করুন।',
      icon: CheckCircle,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      num: 'ধাপ ৪',
      title: 'পেমেন্ট ও অর্ডার গ্রহণ',
      desc: 'নিশ্চিতকরণ পাওয়ার পর bKash-এ পেমেন্ট করুন অথবা ক্যাশে ডেলিভারি বুঝে নিন।',
      icon: Wallet,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
  ];

  return (
    <section id="order-steps" className="py-12 sm:py-16 bg-white border-y border-brand-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-green-700 font-bold text-xs uppercase tracking-wider bg-brand-green-50 border border-brand-green-200 px-3 py-1 rounded-full">
            সহজ ও নিরাপদ প্রক্রিয়া
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 tracking-tight">
            মাত্র কয়েক ধাপে অর্ডার করুন
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            কোনো জটিলতা নেই — সরাসরি আমাদের সাথে যোগাযোগ করে আপনার খাবার অর্ডার করুন।
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-brand-cream/60 rounded-2xl p-6 border border-brand-green-100/80 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black tracking-wide text-brand-green-800 bg-brand-green-100 px-2.5 py-1 rounded-md">
                      {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Warning Notice */}
        <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 font-medium">
            <strong>জরুরি নোট:</strong> MeZuMir-এর নিশ্চিতকরণ না পাওয়া পর্যন্ত অর্ডার চূড়ান্ত হয়েছে ধরে নেবেন না। নিশ্চিতকরণের পরই কেবল পেমেন্ট সম্পন্ন করুন।
          </div>
        </div>

        {/* Sample WhatsApp Template Box */}
        <div className="mt-10 bg-brand-green-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-brand-green-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                WhatsApp বার্তার নমুনা
              </h3>
              <p className="text-xs text-brand-green-300 mt-1">
                আপনি চাইলে নিচের মেসেজটি কপি করে অথবা আমাদের অর্ডার ফর্ম ব্যবহার করে সরাসরি পাঠাতে পারেন।
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 bg-brand-green-800 hover:bg-brand-green-700 text-brand-green-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition active:scale-95 border border-brand-green-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>নমুনা বার্তা কপি করুন</span>
                </>
              )}
            </button>
          </div>

          <pre className="font-sans text-xs sm:text-sm text-emerald-100 whitespace-pre-wrap leading-relaxed bg-brand-green-900/60 p-4 rounded-xl border border-brand-green-800/80">
            {sampleMessage}
          </pre>
        </div>
      </div>
    </section>
  );
};
