"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewProducts from "@/components/NewProducts";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Promotions from "@/components/Promotions";
import Order from "@/components/Order";
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
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <ScrollProgress />

      <Cart
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdate={(name, qty) => setCartItems([...updateQuantity(name, qty)])}
        onRemove={(name) => setCartItems([...removeFromCart(name)])}
        onCheckout={() => {
          setCartOpen(false);
          document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <Header cartItems={cartItems} onCartClick={() => setCartOpen(true)} />

      <main>
        <Hero />
        <NewProducts onAddToCart={handleAddToCart} />
        <About />
        <Promotions />
        <Menu onAddToCart={handleAddToCart} />
        <Order cartItems={cartItems} onOrderComplete={() => { setCartItems([]); setCartOpen(false); }} />
        <Branches />
        <Gallery />
        <Reviews />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
