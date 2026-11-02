import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  FileText
} from 'lucide-react';
import { CartItem, OrderFormData, RecordedOrder } from '../types';
import { BRAND_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    phone: '',
    areaAddress: '',
    paymentMethod: 'bKash',
    specialNotes: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const minOrderNeeded = BRAND_INFO.minOrderAmount;
  const isMinOrderMet = totalAmount >= minOrderNeeded;
  const progressPercent = Math.min(100, Math.round((totalAmount / minOrderNeeded) * 100));

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.customerName.trim()) {
      errors.customerName = 'অনুগ্রহ করে আপনার নাম লিখুন';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'অনুগ্রহ করে আপনার মোবাইল নম্বর লিখুন';
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01854840499)';
    }
    if (!formData.areaAddress.trim()) {
      errors.areaAddress = 'মিরসরাইয়ের এলাকা বা সম্পূর্ণ ঠিকানা লিখুন';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!validateForm()) return;

    // Build WhatsApp message strictly following prompt guidelines
    const itemsList = items
      .map(
        (it) =>
          `• ${it.product.bengaliName} (${it.product.unit}) x ${it.quantity} = ৳${
            it.product.price * it.quantity
          }`
      )
      .join('\n');

    const paymentText =
      formData.paymentMethod === 'bKash'
        ? `বিকাশ (bKash: ${BRAND_INFO.bkashNumber})`
        : 'ক্যাশ অন ডেলিভারি';

    const message = `MeZuMir-এ অর্ডার করতে চাই।
নাম: ${formData.customerName}
ফোন: ${formData.phone}
ঠিকানা/এলাকা: ${formData.areaAddress}
খাবার ও পরিমাণ:
${itemsList}

মোট মূল্য: ৳${totalAmount} (ন্যূনতম অর্ডার ৳৩০০, ডেলিভারি চার্জ ফ্রি - প্রযোজ্য এলাকা সাপেক্ষে)
পেমেন্ট পদ্ধতি: ${paymentText}${
      formData.specialNotes ? `\nঅতিরিক্ত নির্দেশনা: ${formData.specialNotes}` : ''
    }
অর্ডারের প্রাপ্যতা ও সম্ভাব্য ডেলিভারি সময় জানাবেন।`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/8801854840499?text=${encodedMessage}`;

    // Record order in local storage for Admin Panel
    try {
      const newOrder: RecordedOrder = {
        id: 'ORD-' + Date.now().toString().slice(-6),
        customerName: formData.customerName,
        phone: formData.phone,
        areaAddress: formData.areaAddress,
        paymentMethod: formData.paymentMethod,
        specialNotes: formData.specialNotes,
        items: items.map((it) => ({
          productId: it.product.id,
          productName: it.product.bengaliName,
          unit: it.product.unit,
          price: it.product.price,
          quantity: it.quantity,
        })),
        totalAmount,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      const existingOrders: RecordedOrder[] = JSON.parse(
        localStorage.getItem('mezumir_orders') || '[]'
      );
      localStorage.setItem('mezumir_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-brand-green-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-300" />
              <h2 className="font-bold text-lg">আপনার শপিং কার্ট ও অর্ডার</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-brand-green-700 text-white/80 hover:text-white transition"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success State */}
          {isSuccess ? (
            <div className="p-6 sm:p-8 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                WhatsApp-এ অর্ডার পাঠানো হয়েছে!
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                অর্ডার পাঠানোর পর MeZuMir আপনার সঙ্গে যোগাযোগ করে খাবার প্রাপ্যতা, মোট দাম ও সম্ভাব্য ডেলিভারি সময় নিশ্চিত করবে। নিশ্চিতকরণের পর bKash-এ পেমেন্ট সম্পন্ন করতে পারবেন।
              </p>
              <div className="bg-brand-green-50 p-4 rounded-xl border border-brand-green-200 text-xs text-brand-green-900 mb-6 text-left w-full space-y-1">
                <div><strong>bKash নম্বর:</strong> {BRAND_INFO.bkashNumber}</div>
                <div><strong>সহায়তা ফোন:</strong> {BRAND_INFO.phone}</div>
                <div><strong>সেবা এলাকা:</strong> মিরসরাই</div>
              </div>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClearCart();
                  onClose();
                }}
                className="w-full bg-brand-green-700 text-white font-bold py-3 rounded-xl hover:bg-brand-green-800 transition shadow"
              >
                নতুন মেনু ব্রাউজ করুন
              </button>
            </div>
          ) : (
            /* Main Cart Content */
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Minimum Order Threshold Bar */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-gray-700">ন্যূনতম অর্ডার লক্ষ্য: ৳৩০০</span>
                  <span className={isMinOrderMet ? 'text-emerald-700' : 'text-brand-red-600'}>
                    {isMinOrderMet ? '✓ ন্যূনতম অর্ডার পূর্ণ হয়েছে' : `আরও ৳${minOrderNeeded - totalAmount} প্রয়োজন`}
                  </span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isMinOrderMet ? 'bg-emerald-600' : 'bg-brand-red-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-800">
                    নির্বাচিত খাবারসমূহ ({items.reduce((s, i) => s + i.quantity, 0)})
                  </h3>
                  {items.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      সব মুছুন
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-10 bg-stone-50 rounded-xl border border-dashed border-stone-300">
                    <ShoppingBag className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                    <p className="text-sm text-stone-500 font-medium">কার্ট বর্তমানে খালি</p>
                    <p className="text-xs text-stone-400 mt-1">
                      মেনু থেকে খাবার যোগ করতে "কার্টে যোগ" চাপুন
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between p-3 bg-stone-50/80 rounded-xl border border-stone-200 gap-3"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.bengaliName}
                          className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate">
                            {item.product.bengaliName}
                          </h4>
                          <div className="text-xs text-gray-500">
                            {item.product.unit} • ৳{item.product.price}
                          </div>
                          <div className="text-xs font-bold text-brand-green-800 mt-0.5">
                            মোট: ৳{item.product.price * item.quantity}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 text-gray-600 hover:text-gray-900 active:scale-95"
                            aria-label="পরিমাণ কমান"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 text-brand-green-700 hover:text-brand-green-900 active:scale-95"
                            aria-label="পরিমাণ বাড়ান"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 text-stone-400 hover:text-red-600 transition"
                          title="সরান"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Form as requested by user prompt */}
              {items.length > 0 && (
                <form id="order-form" onSubmit={handleOrderSubmit} className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-green-700" />
                    গ্রাহক তথ্য ও ডেলিভারি ফর্ম
                  </h3>

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({ ...formData, customerName: e.target.value })
                        }
                        placeholder="যেমন: মো. আব্দুল করিম"
                        className={`w-full pl-9 pr-3 py-2 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                          formErrors.customerName
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-stone-300 focus:ring-brand-green-600 focus:bg-white'
                        }`}
                      />
                    </div>
                    {formErrors.customerName && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.customerName}</p>
                    )}
                  </div>

                  {/* Phone number field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="যেমন: 01854840499"
                        className={`w-full pl-9 pr-3 py-2 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                          formErrors.phone
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-stone-300 focus:ring-brand-green-600 focus:bg-white'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Address / Area field with Quick Mirsharai Area Chips */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      এলাকা / সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                      <textarea
                        rows={2}
                        value={formData.areaAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, areaAddress: e.target.value })
                        }
                        placeholder="মিরসরাইয়ের নির্দিষ্ট এলাকা, গ্রাম, বাজার বা সড়কের নাম লিখুন..."
                        className={`w-full pl-9 pr-3 py-2 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                          formErrors.areaAddress
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-stone-300 focus:ring-brand-green-600 focus:bg-white'
                        }`}
                      />
                    </div>
                    {formErrors.areaAddress && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.areaAddress}</p>
                    )}

                    {/* Quick Area Suggestion Chips */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="text-[11px] text-gray-500 py-0.5">দ্রুত বেছে নিন:</span>
                      {BRAND_INFO.suggestedAreas.slice(0, 5).map((area) => (
                        <button
                          type="button"
                          key={area}
                          onClick={() => {
                            const current = formData.areaAddress;
                            setFormData({
                              ...formData,
                              areaAddress: current ? `${current}, ${area}` : area,
                            });
                          }}
                          className="text-[11px] bg-stone-100 hover:bg-brand-green-100 text-stone-700 hover:text-brand-green-900 px-2 py-0.5 rounded-full transition"
                        >
                          + {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      পেমেন্ট পদ্ধতি
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label
                        className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                          formData.paymentMethod === 'bKash'
                            ? 'bg-pink-50/70 border-pink-400 text-pink-900 font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bKash"
                          checked={formData.paymentMethod === 'bKash'}
                          onChange={() =>
                            setFormData({ ...formData, paymentMethod: 'bKash' })
                          }
                          className="text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-xs">
                          বিকাশ ({BRAND_INFO.bkashNumber})
                        </span>
                      </label>

                      <label
                        className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition ${
                          formData.paymentMethod === 'Cash on Delivery'
                            ? 'bg-emerald-50/70 border-emerald-400 text-emerald-900 font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Cash on Delivery"
                          checked={formData.paymentMethod === 'Cash on Delivery'}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              paymentMethod: 'Cash on Delivery',
                            })
                          }
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-xs">ক্যাশ অন ডেলিভারি</span>
                      </label>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      * মোট দাম ও প্রাপ্যতা নিশ্চিত হওয়ার পূর্বে bKash পেমেন্ট করতে হবে না।
                    </p>
                  </div>

                  {/* Extra Instructions (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      অতিরিক্ত নির্দেশনা — <span className="font-normal text-gray-500">ঐচ্ছিক</span>
                    </label>
                    <input
                      type="text"
                      value={formData.specialNotes || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, specialNotes: e.target.value })
                      }
                      placeholder="যেমন: কম ঝাল, নির্দিষ্ট সময় বা ল্যান্ডমার্ক..."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                    />
                  </div>

                  {/* Form Submission Button & Mandatory Note as requested */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isMinOrderMet}
                      className={`w-full py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95 ${
                        isMinOrderMet
                          ? 'bg-brand-green-700 hover:bg-brand-green-800 text-white cursor-pointer'
                          : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>অর্ডার নিশ্চিত করতে পাঠান</span>
                    </button>

                    {/* Exact text mandated by user prompt under the button */}
                    <p className="text-[11px] text-gray-600 text-center mt-2 leading-tight">
                      অর্ডার পাঠানোর পর MeZuMir আপনার সঙ্গে যোগাযোগ করে প্রাপ্যতা, মোট দাম ও ডেলিভারি সময় নিশ্চিত করবে।
                    </p>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Footer Summary */}
          {!isSuccess && items.length > 0 && (
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">খাবারের মোট মূল্য:</span>
                <span className="font-bold text-gray-900">৳{totalAmount}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">ডেলিভারি চার্জ:</span>
                <span className="font-bold text-emerald-700">ফ্রি (শর্তসাপেক্ষ)</span>
              </div>
              <div className="flex items-center justify-between text-base font-black border-t border-stone-200 pt-2 text-brand-green-950">
                <span>সর্বমোট:</span>
                <span className="text-lg text-brand-green-800">৳{totalAmount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
