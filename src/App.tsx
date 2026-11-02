import React, { useState, useEffect } from 'react';
import { productsData } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { OrderSteps } from './components/OrderSteps';
import { DeliveryPaymentSection } from './components/DeliveryPaymentSection';
import { TrustSection } from './components/TrustSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { PrePublishChecklistModal } from './components/PrePublishChecklistModal';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  // Routing state for /admin and /
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('/admin') || hash.includes('/admin')) {
      return '/admin';
    }
    return '/';
  });

  // Listen to popstate (browser back/forward or pushState changes)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/admin') || hash.includes('/admin')) {
        setCurrentRoute('/admin');
      } else {
        setCurrentRoute('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState(null, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Products state (loads from localStorage if updated by Admin, fallback to productsData)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mezumir_products');
      return saved ? JSON.parse(saved) : productsData;
    } catch {
      return productsData;
    }
  });

  // Sync products when returning from admin
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mezumir_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      }
    } catch (e) {
      console.warn(e);
    }
  }, [currentRoute]);

  const [cartState, setCartState] = useState<{ [productId: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  // Calculate cart counts and totals
  const cartItemsList: CartItem[] = Object.entries(cartState)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id)!;
      return { product, quantity: qty };
    })
    .filter((item) => item.product !== undefined);

  const cartTotalCount = cartItemsList.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cartItemsList.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleAddToCart = (product: Product) => {
    if (!product.isOrderable) return;
    setCartState((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartState((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const handleProductCardUpdate = (product: Product, delta: number) => {
    handleUpdateQuantity(product.id, delta);
  };

  const handleRemoveItem = (productId: string) => {
    setCartState((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleClearCart = () => {
    setCartState({});
  };

  const handleDirectOrder = (product: Product) => {
    if (!product.isOrderable) return;
    setCartState((prev) => {
      const current = prev[product.id] || 0;
      return {
        ...prev,
        [product.id]: current > 0 ? current : 1,
      };
    });
    setIsCartOpen(true);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on /admin route, render the Admin Panel
  if (currentRoute === '/admin') {
    return <AdminDashboard onNavigateHome={() => navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen bg-[#faf8f2] flex flex-col font-sans text-gray-900 selection:bg-brand-green-100 selection:text-brand-green-950">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        cartTotal={cartTotalPrice}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToMenu={scrollToMenu}
        />

        {/* Menu Section */}
        <MenuSection
          products={products}
          cartItems={cartState}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleProductCardUpdate}
          onDirectOrder={handleDirectOrder}
        />

        {/* Order Steps Section */}
        <OrderSteps />

        {/* Delivery & Payment Section */}
        <DeliveryPaymentSection />

        {/* Trust & Credibility Section */}
        <TrustSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Final Call to Action */}
        <CtaSection onScrollToMenu={scrollToMenu} />
      </main>

      {/* Footer */}
      <Footer
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onNavigateAdmin={() => navigateTo('/admin')}
      />

      {/* Interactive Cart Drawer & Order Checkout Form */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItemsList}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Owner Pre-Publish Checklist Modal */}
      <PrePublishChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      {/* Mobile Sticky Order Bar */}
      <FloatingMobileBar
        cartCount={cartTotalCount}
        cartTotal={cartTotalPrice}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
};

export default App;
