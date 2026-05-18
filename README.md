# Kafe Landing Page — Sizning Kafeingiz

Universal kafe landing page shabloni. Barcha ma'lumotlar bitta config fayldan boshqariladi.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:3000` ni oching.

---

## Kafe nomini o'zgartirish

`config/cafe.config.ts` faylini oching va `name` maydonini o'zgartiring:

```ts
export const CAFE_CONFIG = {
  name: "Mening Kafem",        // ← shu yerda
  slogan: "Eng mazali qahva",  // ← va shu yerda
  ...
}
```

Saytning hamma joyida avtomatik yangilanadi.

---

## Ranglarni o'zgartirish

`theme` bo'limini o'zgartiring:

```ts
theme: {
  primaryColor: "#8B4513",    // asosiy rang (jigarrang)
  secondaryColor: "#F5DEB3",  // ikkinchi rang (krem)
  accentColor: "#D2691E",     // aksent rang
},
```

---

## Menyu qo'shish / o'chirish

`menu` massivida kategoriyalar va mahsulotlar bor:

```ts
menu: [
  {
    category: "Qahva",
    icon: "Coffee",
    items: [
      {
        name: "Yangi ichimlik",
        description: "Tavsif",
        price: 25000,
        image: "/images/menu/yangi.jpg", // yoki Unsplash URL
      },
    ],
  },
],
```

Yangi kategoriya qo'shish uchun massivga yangi ob'ekt qo'shing.

---

## Filial qo'shish

```ts
branches: [
  ...
  {
    name: "Yangi filial",
    address: "Toshkent, ...",
    phone: "+998 90 000 00 00",
    workHours: "09:00 - 22:00",
    mapLink: "https://maps.google.com/?q=...",
  },
],
```

---

## Telegram botga ulash

1. `@BotFather` dan bot yarating, token oling
2. Bot chat ID ni oling
3. `config/cafe.config.ts` da o'zgartiring:

```ts
orderChannel: {
  type: "telegram",
  botToken: "1234567890:AAH...",  // haqiqiy token
  chatId: "-1001234567890",        // haqiqiy chat ID
},
```

---

## Vercel'ga deploy qilish

```bash
# Vercel CLI o'rnatish
npm install -g vercel

# Deploy
vercel

# Yoki GitHub'ga push qilib, vercel.com da import qiling
```

---

## Loyiha strukturasi

```
kafe-landing/
├── app/
│   ├── layout.tsx      — HTML wrapper, meta teglari
│   ├── page.tsx        — Asosiy sahifa
│   ├── globals.css     — Global stilllar
│   └── sitemap.ts      — SEO sitemap
├── components/
│   ├── Header.tsx      — Navigatsiya
│   ├── Hero.tsx        — Birinchi bo'lim
│   ├── About.tsx       — Biz haqimizda
│   ├── Menu.tsx        — Menyu
│   ├── Order.tsx       — Buyurtma formasi
│   ├── Cart.tsx        — Savat
│   ├── Branches.tsx    — Filiallar
│   ├── Gallery.tsx     — Galereya
│   ├── Contact.tsx     — Kontakt
│   ├── Footer.tsx      — Footer
│   └── Loader.tsx      — Yuklash ekrani
├── config/
│   └── cafe.config.ts  — ASOSIY CONFIG FAYL
├── lib/
│   ├── cart.ts         — Savat funksiyalari
│   └── telegram.ts     — Buyurtma yuborish
└── types/
    └── index.ts        — TypeScript tiplari
```

---

## Build qilish

```bash
npm run build
npm run start
```
