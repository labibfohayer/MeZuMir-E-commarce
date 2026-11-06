import React, { useState } from 'react';
import { X, CheckSquare, Square, FileEdit } from 'lucide-react';

interface PrePublishChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrePublishChecklistModal: React.FC<PrePublishChecklistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false, // bKash payment verification
    6: false,
    7: true, // real pictures added
  });

  if (!isOpen) return null;

  const checklist = [
    {
      id: 1,
      title: '১. ডেলিভারি এলাকার সুনির্দিষ্ট তালিকা',
      detail: 'মিরসরাইয়ের কোন কোন নির্দিষ্ট গ্রাম, বাজার বা পৌর এলাকায় খাবার পাঠানো যাবে তা চূড়ান্ত করুন।',
      fileHint: 'src/data/products.ts -> BRAND_INFO.suggestedAreas',
    },
    {
      id: 2,
      title: '২. ফ্রি ডেলিভারির প্রযোজ্য এলাকা',
      detail: 'ফ্রি ডেলিভারি কেবল কোন নির্দিষ্ট সীমানার মধ্যে কার্যকর হবে (যেমন: মিরসরাই বাজার সংলগ্ন এলাকা) তা নির্দিষ্ট করুন।',
      fileHint: 'src/data/products.ts -> BRAND_INFO.deliveryChargeText',
    },
    {
      id: 3,
      title: '৩. যেসব খাবারের পরিমাণ/একক দেওয়া নেই, সেগুলোর পরিমাণ',
      detail: 'স্পেশাল ঝাল খিচুড়ি, ছোলা, ফ্রাইড রাইস, বিফ হালিম, চটপটি ও ভর্তার প্লেট/বাটির নির্দিষ্ট গ্রাম/পরিমাণ চূড়ান্ত করুন।',
      fileHint: 'src/data/products.ts -> portionNote',
    },
    {
      id: 4,
      title: '৪. শীতকালীন পণ্যের বর্তমান প্রাপ্যতা',
      detail: 'শীতের পিঠা ও খেজুরের রস কি এখনই পাওয়া যাচ্ছে নাকি শীতের বিশেষ মৌসুমে পাওয়া যাবে তা নির্ধারণ করুন।',
      fileHint: 'src/data/products.ts -> winter category -> isOrderable',
    },
    {
      id: 5,
      title: '৫. bKash নম্বর ও পেমেন্ট পদ্ধতি',
      detail: 'পেমেন্ট ও অর্ডার সার্ভিস সাময়িকভাবে স্থগিত রাখা হয়েছে। সম্পূর্ণ সক্রিয় করতে কনফিগ আপডেট করুন।',
      fileHint: 'src/data/products.ts -> BRAND_INFO.bkashNumber',
    },
    {
      id: 6,
      title: '৬. ২৪ ঘণ্টা অর্ডার গ্রহণের উত্তর দেওয়ার সময় ও ডেলিভারি সময়',
      detail: 'রাতের বেলা অর্ডার করলে সকালে কখন রেসপন্স দেওয়া হবে এবং খাবার প্রস্তুত হতে কত সময় লাগে তা নির্ধারণ করুন।',
      fileHint: 'src/data/products.ts -> BRAND_INFO.deliveryTimeEstimate',
    },
    {
      id: 7,
      title: '৭. প্রতিটি পণ্যের বাস্তব ছবি ও নিশ্চিত উপকরণ',
      detail: 'সব পণ্যের আকর্ষণীয় ছবি যুক্ত রয়েছে। রান্নাঘরের নিজস্ব ছবি আরও থাকলে অনায়াসে পরিবর্তন করা যাবে।',
      fileHint: 'public/images/',
    },
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-brand-green-700 bg-brand-green-50 px-2.5 py-0.5 rounded-full border border-brand-green-200">
              অ্যাডমিন / এডিটর গার্ডরেল
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
              প্রকাশের আগে যাচাই করুন (৭টি পয়েন্ট)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="py-3">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1">
            <span>যাচাইকরণ প্রগ্রেস</span>
            <span>{completedCount} / 7 সম্পন্ন</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-green-600 h-full transition-all duration-300"
              style={{ width: `${(completedCount / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Checklist Content */}
        <div className="flex-1 overflow-y-auto space-y-3 py-2 pr-1">
          {checklist.map((item) => {
            const isDone = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-200 text-gray-800'
                    : 'bg-stone-50 border-stone-200 hover:border-brand-green-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-sm font-bold ${
                        isDone ? 'text-emerald-950 line-through opacity-80' : 'text-gray-900'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      {item.detail}
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-stone-500 bg-white/80 px-2 py-0.5 rounded border border-stone-200 inline-flex items-center gap-1">
                      <FileEdit className="w-3 h-3 text-stone-400" />
                      <span>{item.fileHint}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            * আপনি আমার সাথে যেকোনো পয়েন্ট এডিট করার নির্দেশ দিলে আমি সাথে সাথে সার্জিক্যালি পরিবর্তন করব।
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs rounded-xl shadow transition"
          >
            বুঝেছি, বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
