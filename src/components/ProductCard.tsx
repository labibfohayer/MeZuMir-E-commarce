import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (product: Product, delta: number) => void;
  onDirectOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  onAddToCart,
  onUpdateQuantity,
  onDirectOrder,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  // Badge coloring
  const getBadgeClass = (category: Product['category']) => {
    switch (category) {
      case 'available':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'seasonal':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'coming_soon':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'winter':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.bengaliName}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!imgLoaded && (
          <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center text-stone-400 text-xs">
            ছবি লোড হচ্ছে...
          </div>
        )}

        {/* Category / Status badge */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5">
          <span
            className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border shadow-sm backdrop-blur-md ${getBadgeClass(
              product.category
            )}`}
          >
            {product.statusBadge}
          </span>
        </div>

        {/* Price Tag in Image */}
        <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 bg-brand-green-900/90 backdrop-blur-md text-white font-black text-xs sm:text-sm px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl shadow-md border border-white/20">
          ৳{product.price}
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-1.5 sm:gap-2">
            <h3 className="text-sm sm:text-lg font-bold text-gray-900 group-hover:text-brand-green-700 transition leading-snug">
              {product.bengaliName}
            </h3>
          </div>

          {/* Unit / Portion */}
          <div className="mt-1 flex flex-wrap items-center gap-1 text-[11px] sm:text-xs text-gray-600">
            <span className="bg-stone-100 text-stone-700 px-1.5 sm:px-2 py-0.5 rounded font-medium">
              একক: {product.unit}
            </span>

            {/* If portion note is required (e.g. [পরিমাণ নিশ্চিত করুন]) */}
            {product.portionNote && (
              <span className="bg-amber-50 text-amber-800 border border-amber-200 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold">
                {product.portionNote}
              </span>
            )}
          </div>

          {/* Seasonal / Special Notes */}
          {product.seasonalNote && (
            <p className="mt-2 text-xs text-stone-500 italic bg-stone-50 p-2 rounded-lg border border-stone-200">
              ℹ️ {product.seasonalNote}
            </p>
          )}

          {/* Strictly verified item details (only show if confirmed, never guess) */}
          {product.details && Object.keys(product.details).length > 0 && (
            <div className="mt-3 text-xs bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 space-y-1">
              {product.details.ingredients && (
                <div className="text-gray-700">
                  <span className="font-semibold text-emerald-900">উপকরণ:</span>{' '}
                  {product.details.ingredients}
                </div>
              )}
              {product.details.tasteLevel && (
                <div className="text-gray-700">
                  <span className="font-semibold text-emerald-900">স্বাদের মাত্রা:</span>{' '}
                  {product.details.tasteLevel}
                </div>
              )}
              {product.details.portion && (
                <div className="text-gray-700">
                  <span className="font-semibold text-emerald-900">পরিবেশনের পরিমাণ:</span>{' '}
                  {product.details.portion}
                </div>
              )}
              {product.details.allergenInfo && (
                <div className="text-gray-700">
                  <span className="font-semibold text-emerald-900">অ্যালার্জি তথ্য:</span>{' '}
                  {product.details.allergenInfo}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-gray-100">
          {product.isOrderable ? (
            <div className="space-y-2">
              {cartQuantity === 0 ? (
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full inline-flex items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-brand-green-800 border border-brand-green-300 font-bold py-2 sm:py-2 px-1.5 sm:px-2.5 rounded-xl text-xs sm:text-sm transition active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5 shrink-0" />
                    <span>কার্টে যোগ</span>
                  </button>
                  <button
                    onClick={() => onDirectOrder(product)}
                    className="w-full inline-flex items-center justify-center gap-1 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold py-2 sm:py-2 px-1.5 sm:px-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                    <span>অর্ডার করুন</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between bg-brand-green-50 rounded-xl p-1 border border-brand-green-200">
                    <button
                      onClick={() => onUpdateQuantity(product, -1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-white text-brand-green-800 shadow-sm hover:bg-gray-100 active:scale-95 transition"
                      aria-label="কমান"
                    >
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <span className="text-xs sm:text-sm font-bold text-brand-green-900">
                      {cartQuantity} টি যোগ হয়েছে
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product, 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-brand-green-700 text-white shadow-sm hover:bg-brand-green-800 active:scale-95 transition"
                      aria-label="বাড়ান"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onDirectOrder(product)}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-brand-green-800 hover:bg-brand-green-900 text-white font-bold py-2 sm:py-1.5 px-3 rounded-xl sm:rounded-lg text-xs transition"
                  >
                    এখনই অর্ডার নিশ্চিত করুন
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-stone-100 rounded-xl p-2.5 text-center text-xs text-stone-600 font-medium border border-stone-200">
              {product.category === 'coming_soon' && (
                <span className="text-blue-700 font-bold block">
                  ⏳ খুব শিগগির মেনুতে আসছে
                </span>
              )}
              {product.category === 'winter' && (
                <span className="text-purple-700 font-bold block">
                  ❄️ শীত মৌসুমে পাওয়া যাবে
                </span>
              )}
              <span className="text-[11px] text-gray-500">
                (বর্তমানে অর্ডার গ্রহণ বন্ধ রয়েছে)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
