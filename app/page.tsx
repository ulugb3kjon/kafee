"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "@/components/Loader";
import SidebarNav from "@/components/SidebarNav";
import Hero from "@/components/Hero";
import CoffeeShowcase from "@/components/CoffeeShowcase";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Promotions from "@/components/Promotions";
import Branches from "@/components/Branches";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import { CartItem, MenuItem } from "@/types";
import { getCart, addToCart, removeFromCart, updateQuantity } from "@/lib/cart";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
    const timer = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item: MenuItem, category: string) => {
    const updated = addToCart(item, category);
    setCartItems([...updated]);
    setCartOpen(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Loader />}</AnimatePresence>
      <ScrollProgress />

      <Cart
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdate={(name, qty) => setCartItems([...updateQuantity(name, qty)])}
        onRemove={(name) => setCartItems([...removeFromCart(name)])}
        onCheckout={() => {
          setCartOpen(false);
          router.push("/order");
        }}
      />

      <SidebarNav
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        onClose={() => setSidebarOpen(false)}
        cartItems={cartItems}
        onCartClick={() => {
          setSidebarOpen(false);
          setCartOpen(true);
        }}
      />

      {/* Main content shifts left when sidebar opens */}
      <motion.div
        animate={{ x: sidebarOpen ? "-33vw" : 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      >
        <main>
          <Hero />
          <CoffeeShowcase />
          <About />
          <Promotions />
          <Menu onAddToCart={handleAddToCart} />
          <Branches />
          <Gallery />
          <Reviews />
          <Contact />
        </main>

        <Footer />
      </motion.div>

      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
