import { CartItem, MenuItem } from "@/types";

const CART_KEY = "kafe_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: MenuItem, category: string): CartItem[] {
  const cart = getCart();
  const existing = cart.find((c) => c.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1, category });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(name: string): CartItem[] {
  const cart = getCart().filter((c) => c.name !== name);
  saveCart(cart);
  return cart;
}

export function updateQuantity(name: string, quantity: number): CartItem[] {
  const cart = getCart();
  if (quantity <= 0) return removeFromCart(name);
  const item = cart.find((c) => c.name === name);
  if (item) item.quantity = quantity;
  saveCart(cart);
  return cart;
}

export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
}
