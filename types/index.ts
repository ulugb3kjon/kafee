export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  isNew?: boolean;
}

export interface MenuCategory {
  category: string;
  icon: string;
  items: MenuItem[];
}

export interface Branch {
  name: string;
  address: string;
  phone: string;
  workHours: string;
  mapLink: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  category: string;
}

export interface OrderData {
  type: "delivery" | "pickup";
  name: string;
  phone: string;
  address?: string;
  landmark?: string;
  note?: string;
  branch?: string;
  pickupTime?: string;
  items: CartItem[];
  total: number;
}
