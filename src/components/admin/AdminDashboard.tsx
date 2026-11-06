import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingBag,
  Settings,
  CheckSquare,
  LogOut,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  Lock,
  ArrowLeft,
  Save,
  RotateCcw
} from 'lucide-react';
import { Product, RecordedOrder, OrderStatus, ProductCategory } from '../../types';
import { productsData as defaultProductsData, BRAND_INFO as defaultBrandInfo, PRODUCTS_DATA_VERSION } from '../../data/products';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mezumir_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings' | 'checklist'>('orders');

  // Products state (stored in localStorage with fallback to defaultProductsData)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const storedVersion = localStorage.getItem('mezumir_products_version');
      if (storedVersion !== PRODUCTS_DATA_VERSION) {
        localStorage.setItem('mezumir_products_version', PRODUCTS_DATA_VERSION);
        localStorage.setItem('mezumir_products', JSON.stringify(defaultProductsData));
        return defaultProductsData;
      }
      const saved = localStorage.getItem('mezumir_products');
      return saved ? JSON.parse(saved) : defaultProductsData;
    } catch {
      return defaultProductsData;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<RecordedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('mezumir_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Settings state
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('mezumir_settings');
      return saved ? JSON.parse(saved) : defaultBrandInfo;
    } catch {
      return defaultBrandInfo;
    }
  });

  // Modals & form state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Persist products
  useEffect(() => {
    localStorage.setItem('mezumir_products', JSON.stringify(products));
  }, [products]);

  // Persist orders
  useEffect(() => {
    localStorage.setItem('mezumir_orders', JSON.stringify(orders));
  }, [orders]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('mezumir_settings', JSON.stringify(settings));
  }, [settings]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Password: LabibSadiya
    if (pinInput.trim() === 'LabibSadiya' || pinInput.trim().toLowerCase() === 'labibsadiya') {
      setIsAuthenticated(true);
      localStorage.setItem('mezumir_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('ভুল পাসওয়ার্ড! সঠিক অ্যাডমিন পাসওয়ার্ড দিন');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mezumir_admin_auth');
  };

  // Product actions
  const handleToggleProductOrderable = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOrderable: !p.isOrderable } : p))
    );
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`আপনি কি সত্যিই "${name}" খাবারটি তালিকা থেকে মুছে ফেলতে চান?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSaveProduct = (updated: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === updated.id);
      if (exists) {
        return prev.map((p) => (p.id === updated.id ? updated : p));
      } else {
        return [updated, ...prev];
      }
    });
    setEditingProduct(null);
    setIsAddProductOpen(false);
    showNotice('পণ্য সফলভাবে সংরক্ষিত হয়েছে!');
  };

  const handleResetDefaultProducts = () => {
    if (window.confirm('সতর্কতা: এটি সব খাবারকে ডিফল্ট তালিকায় রিসেট করবে। এগিয়ে যাবেন?')) {
      setProducts(defaultProductsData);
      showNotice('ডিফল্ট মেনু পুনরুদ্ধার করা হয়েছে!');
    }
  };

  // Order actions
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showNotice('অর্ডারের স্ট্যাটাস আপডেট করা হয়েছে!');
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('আপনি কি এই অর্ডারটি মুছে ফেলতে চান?')) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    }
  };

  const handleAddSampleOrder = () => {
    const sample: RecordedOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customerName: 'মো. তৌহিদুল ইসলাম',
      phone: '01854840499',
      areaAddress: 'মিরসরাই পৌরসভা, থানা রোড',
      paymentMethod: 'bKash',
      specialNotes: 'মাঠা ঠান্ডা হতে হবে এবং সাথে এক্সট্রা কাঁচামরিচ দিবেন।',
      items: [
        {
          productId: 'matha-250ml',
          productName: 'দুধের মাঠা',
          unit: '২৫০ মি.লি. বোতল',
          price: 50,
          quantity: 2,
        },
        {
          productId: 'doi-1kg',
          productName: 'দই',
          unit: '১ কেজি',
          price: 350,
          quantity: 1,
        },
      ],
      totalAmount: 450,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [sample, ...prev]);
    showNotice('টেস্ট অর্ডার যোগ করা হয়েছে!');
  };

  const showNotice = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.phone.includes(orderSearchQuery) ||
      o.areaAddress.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase());

    const matchesStatus =
      orderStatusFilter === 'all' || o.status === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtered products
  const filteredProducts = products.filter((p) =>
    p.bengaliName.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
    p.name.toLowerCase().includes(productSearchQuery.toLowerCase())
  );

  // Status badge styling
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full text-xs font-bold">🟡 নতুন অর্ডার</span>;
      case 'confirmed':
        return <span className="bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 rounded-full text-xs font-bold">🔵 নিশ্চিত</span>;
      case 'preparing':
        return <span className="bg-purple-100 text-purple-900 border border-purple-300 px-2 py-0.5 rounded-full text-xs font-bold">🟣 প্রস্তুত হচ্ছে</span>;
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-bold">🟢 ডেলিভারি সম্পন্ন</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-900 border border-red-300 px-2 py-0.5 rounded-full text-xs font-bold">🔴 বাতিল</span>;
    }
  };

  // If NOT authenticated, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-stone-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-green-600 mx-auto mb-3 shadow-md">
              <img src="/images/logo.png" alt="MeZuMir Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">
              MeZu<span className="text-brand-red-600">Mir</span> অ্যাডমিন প্যানেল
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              দোকান পরিচালনা, মেনু আপডেট ও অর্ডার ম্যানেজমেন্ট
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                অ্যাডমিন পাসওয়ার্ড / পিন
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন..."
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                  autoFocus
                />
              </div>
              {pinError && <p className="text-xs text-red-600 mt-1 font-medium">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold rounded-xl shadow-lg transition active:scale-95 text-sm"
            >
              লগইন করুন
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>নিরাপত্তা: <strong className="text-brand-green-800 font-medium">পাসওয়ার্ড সুরক্ষিত</strong></span>
            <button
              onClick={onNavigateHome}
              className="text-brand-green-700 hover:underline flex items-center gap-1 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ওয়েবসাইটে ফিরুন</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Quick Stats
  const totalOrdersCount = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const activeProductsCount = products.filter((p) => p.isOrderable).length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'new' || o.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-gray-900">
      {/* Top Header */}
      <header className="bg-brand-green-950 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-green-500 bg-white">
                <img src="/images/logo.png" alt="MeZuMir" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight">
                  <span className="text-emerald-400">MeZu</span>
                  <span className="text-brand-red-500 ml-0.5">Mir</span>
                  <span className="text-xs ml-2 text-stone-300 font-normal px-2 py-0.5 bg-brand-green-800 rounded">
                    অ্যাডমিন কন্ট্রোল
                  </span>
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-1.5 bg-brand-green-800 hover:bg-brand-green-700 text-brand-green-100 px-3 py-1.5 rounded-lg text-xs font-bold transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">লাইভ ওয়েবসাইটে যান</span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 bg-red-900/80 hover:bg-red-800 text-red-200 px-2.5 py-1.5 rounded-lg text-xs font-bold transition"
                title="লগআউট"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">লগআউট</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-brand-green-900 border-t border-brand-green-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                activeTab === 'orders'
                  ? 'bg-white text-brand-green-950 shadow-sm'
                  : 'text-brand-green-200 hover:bg-brand-green-800 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>অর্ডার সমূহ ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                activeTab === 'products'
                  ? 'bg-white text-brand-green-950 shadow-sm'
                  : 'text-brand-green-200 hover:bg-brand-green-800 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>খাবার ও মেনু ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                activeTab === 'settings'
                  ? 'bg-white text-brand-green-950 shadow-sm'
                  : 'text-brand-green-200 hover:bg-brand-green-800 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>দোকান সেটিংস</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                activeTab === 'checklist'
                  ? 'bg-white text-brand-green-950 shadow-sm'
                  : 'text-brand-green-200 hover:bg-brand-green-800 hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>যাচাইকরণ চেকলিস্ট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Save/Alert Banner */}
      {saveSuccessMsg && (
        <div className="bg-emerald-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-bold shadow-lg animate-fade-in fixed top-28 right-4 z-50 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">মোট অর্ডার</div>
            <div className="text-2xl font-black text-gray-900 mt-1">{totalOrdersCount} টি</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">পেন্ডিং ডেলিভারি</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{pendingOrdersCount} টি</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">মোট বিক্রয় হিসাব</div>
            <div className="text-2xl font-black text-brand-green-800 mt-1">৳{totalRevenue}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">সক্রিয় খাবার</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{activeProductsCount} টি</div>
          </div>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  placeholder="গ্রাহকের নাম, মোবাইল নম্বর বা এলাকা দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                >
                  <option value="all">সব অর্ডার ({orders.length})</option>
                  <option value="new">🟡 নতুন অর্ডার</option>
                  <option value="confirmed">🔵 নিশ্চিত</option>
                  <option value="preparing">🟣 প্রস্তুত হচ্ছে</option>
                  <option value="delivered">🟢 ডেলিভারি সম্পন্ন</option>
                  <option value="cancelled">🔴 বাতিল</option>
                </select>

                <button
                  onClick={handleAddSampleOrder}
                  className="bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-800 border border-brand-green-300 font-bold px-3 py-2 rounded-xl text-xs whitespace-nowrap transition"
                >
                  + টেস্ট অর্ডার যোগ
                </button>
              </div>
            </div>

            {/* Orders list */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800">কোনো অর্ডার পাওয়া যায়নি</h3>
                <p className="text-xs text-gray-500 mt-1">
                  গ্রাহকরা যখন ওয়েবসাইট থেকে কার্টে অর্ডার পাঠাবেন, তখন সরাসরি এখানে অর্ডারগুলো দৃশ্যমান হবে।
                </p>
                <button
                  onClick={handleAddSampleOrder}
                  className="mt-4 px-4 py-2 bg-brand-green-700 text-white font-bold text-xs rounded-xl hover:bg-brand-green-800 transition shadow"
                >
                  নমুনা টেস্ট অর্ডার তৈরি করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Top Order header */}
                      <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-brand-green-900 bg-brand-green-50 px-2 py-0.5 rounded border border-brand-green-200">
                              {order.id}
                            </span>
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(order.createdAt).toLocaleString('bn-BD')}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-gray-500">মোট মূল্য:</span>
                          <div className="text-lg font-black text-brand-green-800">
                            ৳{order.totalAmount}
                          </div>
                        </div>
                      </div>

                      {/* Customer info */}
                      <div className="mt-3 bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5 text-xs">
                        <div className="font-bold text-gray-900 flex items-center justify-between">
                          <span>{order.customerName}</span>
                          <span className="text-[11px] font-normal text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                            পেমেন্ট: {order.paymentMethod}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-stone-600">
                          <a
                            href={`tel:${order.phone}`}
                            className="flex items-center gap-1 text-blue-700 hover:underline"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{order.phone}</span>
                          </a>
                          <a
                            href={`https://wa.me/88${order.phone.replace(/[\s-]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-emerald-700 hover:underline font-bold"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp চ্যাট</span>
                          </a>
                        </div>
                        <div className="text-stone-700 flex items-start gap-1">
                          <MapPin className="w-3 h-3 shrink-0 text-red-500 mt-0.5" />
                          <span>{order.areaAddress}</span>
                        </div>
                        {order.specialNotes && (
                          <div className="text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200 italic">
                            নোট: {order.specialNotes}
                          </div>
                        )}
                      </div>

                      {/* Ordered items list */}
                      <div className="mt-3">
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          অর্ডারের খাবার তালিকা:
                        </div>
                        <ul className="divide-y divide-stone-100 text-xs">
                          {order.items.map((it, idx) => (
                            <li key={idx} className="py-1.5 flex items-center justify-between">
                              <span className="text-gray-800">
                                • {it.productName} ({it.unit}) x {it.quantity}
                              </span>
                              <span className="font-bold text-gray-900">
                                ৳{it.price * it.quantity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Order action controls */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-gray-600">স্ট্যাটাস:</span>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-green-600"
                        >
                          <option value="new">নতুন</option>
                          <option value="confirmed">নিশ্চিত</option>
                          <option value="preparing">প্রস্তুত হচ্ছে</option>
                          <option value="delivered">ডেলিভারি সম্পন্ন</option>
                          <option value="cancelled">বাতিল</option>
                        </select>
                      </div>

                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition"
                        title="অর্ডারটি মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS & MENU */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  placeholder="খাবারের নাম লিখে খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingProduct({
                      id: 'custom-' + Date.now(),
                      name: '',
                      bengaliName: '',
                      price: 50,
                      unit: 'প্লেট',
                      category: 'available',
                      image: '/images/singara.jpg',
                      statusBadge: 'বর্তমানে পাওয়া যাচ্ছে',
                      isOrderable: true,
                    });
                    setIsAddProductOpen(true);
                  }}
                  className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন খাবার যোগ</span>
                </button>

                <button
                  onClick={handleResetDefaultProducts}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  title="ডিফল্ট ২০টি খাবার রিস্টোর করুন"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ডিফল্ট রিস্টোর</span>
                </button>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-sm flex flex-col justify-between transition ${
                    p.isOrderable ? 'border-stone-200' : 'border-red-200 bg-red-50/20'
                  }`}
                >
                  <div className="relative aspect-video w-full bg-stone-100 overflow-hidden">
                    <img src={p.image} alt={p.bengaliName} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur">
                        {p.statusBadge}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-brand-green-900/90 text-white font-bold text-xs px-2.5 py-0.5 rounded-lg">
                      ৳{p.price}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-sm text-gray-900">{p.bengaliName}</h4>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">একক: {p.unit}</div>
                      {p.portionNote && (
                        <div className="text-[11px] text-amber-700 bg-amber-50 p-1 rounded mt-1">
                          {p.portionNote}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleProductOrderable(p.id)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg transition ${
                          p.isOrderable
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                        }`}
                      >
                        {p.isOrderable ? 'সক্রিয় (চালু)' : 'বন্ধ (আউট অফ স্টক)'}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsAddProductOpen(true);
                          }}
                          className="p-1.5 text-stone-600 hover:text-brand-green-800 rounded-lg hover:bg-stone-100 transition"
                          title="এডিট করুন"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.bengaliName)}
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-100 transition"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-green-700" />
                দোকানের তথ্য ও পলিসি কনফিগারেশন
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                এখানে দেওয়া তথ্যগুলো ওয়েবসাইটের শীর্ষ ব্যানার, ডেলিভারি ও ফুটার অংশে তাৎক্ষণিকভাবে কার্যকর হবে।
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">bKash পেমেন্ট নম্বর</label>
                  <input
                    type="text"
                    value={settings.bkashNumber}
                    onChange={(e) => setSettings({ ...settings, bkashNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp ও হেল্পলাইন নম্বর</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ন্যূনতম অর্ডার (টাকা)</label>
                  <input
                    type="number"
                    value={settings.minOrderAmount}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        minOrderAmount: Number(e.target.value) || 0,
                        minOrderText: `৳${e.target.value}`,
                      })
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ডেলিভারি চার্জ বিবরণ</label>
                  <input
                    type="text"
                    value={settings.deliveryChargeText}
                    onChange={(e) => setSettings({ ...settings, deliveryChargeText: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সেবা এলাকা বিবরণ</label>
                <input
                  type="text"
                  value={settings.serviceArea}
                  onChange={(e) => setSettings({ ...settings, serviceArea: e.target.value })}
                  placeholder="যেমন: মিরসরাই — মিরসরাই পৌরসভা, জোরারগঞ্জ, মস্তাননগর"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ফেসবুক পেজ লিংক</label>
                <input
                  type="text"
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">* পরিবর্তনগুলো স্বয়ংক্রিয়ভাবে সংরক্ষিত হচ্ছে।</span>
                <button
                  onClick={() => showNotice('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!')}
                  className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow transition"
                >
                  <Save className="w-4 h-4" />
                  <span>সেটিংস সেভ করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRE-PUBLISH CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="max-w-3xl bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-bold text-brand-green-700 bg-brand-green-50 px-2.5 py-0.5 rounded-full border border-brand-green-200">
                মালিকের জন্য চেকলিস্ট
              </span>
              <h3 className="text-xl font-black text-gray-900 mt-1">
                প্রকাশের আগে যাচাই করুন (৭টি পয়েন্ট)
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-xs text-gray-900 block">১. ডেলিভারি এলাকার সুনির্দিষ্ট তালিকা:</strong>
                <p className="text-xs text-gray-600 mt-0.5">মিরসরাইয়ের কোন কোন গ্রাম/বাজারে খাবার যাবে তা নির্দিষ্ট রাখা হয়েছে।</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-xs text-gray-900 block">২. ফ্রি ডেলিভারির প্রযোজ্য এলাকা:</strong>
                <p className="text-xs text-gray-600 mt-0.5">মিরসরাই পৌরসভা ও নিকটবর্তী বাজারসমূহের জন্য ফ্রি প্রযোজ্য।</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-xs text-gray-900 block">৩. যেসব খাবারের পরিমাণ/একক নিশ্চিত করা প্রয়োজন:</strong>
                <p className="text-xs text-gray-600 mt-0.5">যেগুলোর নির্দিষ্ট পরিবেশন পরিমাণ জানা নেই সেগুলোতে “[পরিমাণ নিশ্চিত করুন]” দেখানো আছে।</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-xs text-gray-900 block">৪. শীতকালীন পণ্যের বর্তমান প্রাপ্যতা:</strong>
                <p className="text-xs text-gray-600 mt-0.5">শীতের পিঠা ও খেজুরের রস "মৌসুমে পাওয়া যাবে" হিসেবে অর্ডার বন্ধ রাখা হয়েছে।</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                <strong className="text-xs block">৫. bKash নম্বর ও পেমেন্ট পদ্ধতি:</strong>
                <p className="text-xs mt-0.5">bKash নম্বর 01854840499 সম্পূর্ণ সক্রিয় ও ভেরিফায়েড।</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-xs text-gray-900 block">৬. ২৪ ঘণ্টা অর্ডার গ্রহণ ও ডেলিভারি সময়:</strong>
                <p className="text-xs text-gray-600 mt-0.5">অর্ডার ২৪ ঘণ্টা পাঠানো যাবে, খাবার প্রস্তুতের সম্ভাব্য সময় অর্ডার নিশ্চিত করার সময় জানানো হবে।</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                <strong className="text-xs block">৭. বাস্তব খাবারের ছবি ও উপকরণ:</strong>
                <p className="text-xs mt-0.5">দুধের মাঠা, দই, খিচুড়ি, ছোলা বুট, সিঙ্গারা, সিদ্ধ ডিম ও কলার আসল পোস্টার ছবি সফলভাবে সংযুক্ত করা হয়েছে।</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit/Add Product Modal */}
      {isAddProductOpen && editingProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              {editingProduct.id.startsWith('custom-') ? 'নতুন খাবার যুক্ত করুন' : 'খাবার তথ্য এডিট করুন'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">খাবারের বাংলা নাম *</label>
                <input
                  type="text"
                  value={editingProduct.bengaliName}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, bengaliName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">মূল্য (টাকা) *</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">একক (যেমন: ১ প্লেট / ২৫০ মি.লি.) *</label>
                  <input
                    type="text"
                    value={editingProduct.unit}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, unit: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">ক্যাটাগরি</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value as ProductCategory,
                    })
                  }
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                >
                  <option value="available">বর্তমানে অর্ডার করা যাবে</option>
                  <option value="seasonal">মৌসুমি বা বিশেষ দিনে</option>
                  <option value="coming_soon">শিগগির আসছে</option>
                  <option value="winter">শীতকালীন পণ্য</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">ছবির লিঙ্ক / পাথ</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, image: e.target.value })
                  }
                  placeholder="/images/singara.jpg"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">পরিবেশনের নোট (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={editingProduct.portionNote || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, portionNote: e.target.value })
                  }
                  placeholder="যেমন: [পরিমাণ নিশ্চিত করুন]"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isOrderableCheck"
                  checked={editingProduct.isOrderable}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, isOrderable: e.target.checked })
                  }
                  className="w-4 h-4 text-brand-green-600 rounded"
                />
                <label htmlFor="isOrderableCheck" className="font-bold text-gray-800">
                  বর্তমানে এই খাবারটির অর্ডার গ্রহণ চালু থাকবে
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddProductOpen(false);
                }}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold rounded-xl text-xs transition"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={() => handleSaveProduct(editingProduct)}
                className="px-5 py-2 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold rounded-xl text-xs shadow transition"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
