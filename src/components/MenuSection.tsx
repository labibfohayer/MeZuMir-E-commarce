import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Search, Sparkles, CheckCircle2, Grid2X2, Square } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface MenuSectionProps {
  products: Product[];
  cartItems: { [id: string]: number };
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (product: Product, delta: number) => void;
  onDirectOrder: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  products,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onDirectOrder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileView, setMobileView] = useState<'single' | 'grid'>('grid');

  const categories = [
    { id: 'all', label: 'সব খাবার', count: products.length },
    {
      id: 'available',
      label: 'বর্তমানে অর্ডার করা যাবে',
      count: products.filter((p) => p.category === 'available').length,
    },
    {
      id: 'seasonal',
      label: 'মৌসুমি / বিশেষ দিনে',
      count: products.filter((p) => p.category === 'seasonal').length,
    },
    {
      id: 'coming_soon',
      label: 'শিগগির আসছে',
      count: products.filter((p) => p.category === 'coming_soon').length,
    },
    {
      id: 'winter',
      label: 'শীতকালীন পণ্য',
      count: products.filter((p) => p.category === 'winter').length,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.bengaliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-12 sm:py-16 bg-[#faf8f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Subtitle with Reveal */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-green-100 text-brand-green-800 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full mb-3 border border-brand-green-200">
              <Sparkles className="w-4 h-4 text-brand-green-700" />
              তাজা দেশি খাবারের তালিকা
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              আজ অর্ডার করুন
            </h2>
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              মিরসরাইয়ের ঘরোয়া যত্ন ও খাঁটি স্বাদের মেনু। প্রতিটি পণ্যের স্পষ্ট মূল্য, পরিমাণ ও প্রাপ্যতা নিচে দেওয়া হলো।
            </p>
          </div>
        </Reveal>

        {/* Filter Tabs & Search Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-brand-green-100 shadow-md mb-6 sm:mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-brand-green-700 text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id
                      ? 'bg-brand-green-900 text-brand-green-100'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search box & Mobile View Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="খাবারের নাম খুঁজুন..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600 focus:bg-white"
              />
            </div>

            {/* Mobile View Toggle */}
            <div className="flex sm:hidden items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0">
              <button
                onClick={() => setMobileView('single')}
                className={`p-1.5 rounded-lg transition ${
                  mobileView === 'single'
                    ? 'bg-white text-brand-green-800 shadow-sm'
                    : 'text-stone-500'
                }`}
                title="১ কলাম বড় ভিউ"
                aria-label="১ কলাম ভিউ"
              >
                <Square className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileView('grid')}
                className={`p-1.5 rounded-lg transition ${
                  mobileView === 'grid'
                    ? 'bg-white text-brand-green-800 shadow-sm'
                    : 'text-stone-500'
                }`}
                title="২ কলাম গ্রিড ভিউ"
                aria-label="২ কলাম ভিউ"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Informational Guidance Alert */}
        <div className="mb-6 p-3 sm:p-3.5 bg-brand-green-50/80 rounded-xl border border-brand-green-200 text-xs sm:text-sm text-brand-green-900 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green-700 shrink-0" />
            <span>
              <strong>স্বচ্ছতার অঙ্গীকার:</strong> যেসব পণ্যের পরিবেশনের নির্দিষ্ট পরিমাণ পাওয়া যায়নি, সেখানে <strong>“[পরিমাণ নিশ্চিত করুন]”</strong> মার্ক করা আছে।
            </span>
          </div>
          <span className="text-brand-red-700 font-medium">ন্যূনতম অর্ডার ৳৩০০</span>
        </div>

        {/* Products Grid with Cascading Staggered Reveal */}
        {filteredProducts.length > 0 ? (
          <div className={`grid ${mobileView === 'grid' ? 'grid-cols-2 gap-3' : 'grid-cols-1 gap-5'} sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6`}>
            {filteredProducts.map((product, idx) => (
              <Reveal key={product.id} delay={(idx % 4) * 80}>
                <ProductCard
                  product={product}
                  cartQuantity={cartItems[product.id] || 0}
                  onAddToCart={onAddToCart}
                  onUpdateQuantity={onUpdateQuantity}
                  onDirectOrder={onDirectOrder}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
            <p className="text-gray-500 font-medium text-base">
              এই ক্যাটাগরিতে বা সার্চে কোনো খাবার পাওয়া যায়নি।
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-brand-green-700 text-white text-xs font-bold rounded-lg hover:bg-brand-green-800 transition"
            >
              সব খাবার দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
