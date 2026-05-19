export const CAFE_CONFIG = {
  name: "Sizning Kafeingiz",
  slogan: "Eng mazali qahva va shirinliklar",
  logo: "/images/logo.svg",

  theme: {
    primaryColor: "#8B4513",
    secondaryColor: "#F5DEB3",
    accentColor: "#D2691E",
  },

  about:
    "Sizning Kafeingiz — bu nafaqat qahva, balki issiq va do'stona muhit. 2020-yildan beri Toshkentning eng yaxshi kafe manzillaridan biri sifatida tanilganmiz. Har kuni toza, sifatli mahsulotlardan tayyorlangan taomlar va ichimliklar taqdim etamiz.",

  stats: [
    { label: "Mamnun mijozlar", value: 1000, suffix: "+" },
    { label: "Taom turlari", value: 50, suffix: "+" },
    { label: "Yillik tajriba", value: 5, suffix: "" },
    { label: "Filiallar", value: 3, suffix: "" },
  ],

  features: [
    {
      title: "Mazali qahva",
      description: "Arabika va robusta aralashmasi, har kuni yangi qovurilgan",
      icon: "Coffee",
    },
    {
      title: "Qulay muhit",
      description: "Dam olish va do'stlar bilan uchrashuv uchun ideal joy",
      icon: "Sofa",
    },
    {
      title: "Tez yetkazib berish",
      description: "30-60 daqiqa ichida eshigingizga yetkazamiz",
      icon: "Zap",
    },
    {
      title: "Toza mahsulotlar",
      description: "Faqat eng taza va sifatli ingredientlardan foydalanamiz",
      icon: "Leaf",
    },
  ],

  branches: [
    {
      name: "Chilonzor filiali",
      address: "Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi, 15-uy",
      phone: "+998 90 123 45 67",
      workHours: "09:00 - 23:00",
      mapLink: "https://yandex.uz/maps/10335/tashkent/?ll=69.240073,41.299496&z=16&pt=69.240073,41.299496",
      lat: 41.299496,
      lng: 69.240073,
    },
    {
      name: "Yunusobod filiali",
      address: "Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi, 108-uy",
      phone: "+998 91 234 56 78",
      workHours: "08:00 - 23:00",
      mapLink: "https://yandex.uz/maps/10335/tashkent/?ll=69.284264,41.337901&z=16&pt=69.284264,41.337901",
      lat: 41.337901,
      lng: 69.284264,
    },
    {
      name: "Mirzo Ulug'bek filiali",
      address: "Toshkent sh., Mirzo Ulug'bek tumani, Mustaqillik prospekti, 54-uy",
      phone: "+998 93 345 67 89",
      workHours: "09:00 - 22:00",
      mapLink: "https://yandex.uz/maps/10335/tashkent/?ll=69.313251,41.327324&z=16&pt=69.313251,41.327324",
      lat: 41.327324,
      lng: 69.313251,
    },
  ],

  menu: [
    {
      category: "Qahva",
      icon: "Coffee",
      items: [
        {
          name: "Espresso",
          description: "Klassik italyan qahvasi, kuchli va to'yimli",
          price: 15000,
          image:
            "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop",
        },
        {
          name: "Cappuccino",
          description: "Espresso, bug'langan sut va ko'pikdan tayyorlangan",
          price: 22000,
          image:
            "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
        },
        {
          name: "Latte",
          description: "Yumshoq va kremli, ko'p sut bilan",
          price: 24000,
          image:
            "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop",
        },
        {
          name: "Americano",
          description: "Espresso va issiq suv, yumshoq ta'm",
          price: 18000,
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
        },
        {
          name: "Flat White",
          description: "Kichik va kuchli, avstralik uslub",
          price: 26000,
          image:
            "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&h=300&fit=crop",
        },
        {
          name: "Cold Brew",
          description: "12 soat sovuq tayyorlangan, silliq va tatli",
          price: 28000,
          image:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
          isNew: true,
        },
      ],
    },
    {
      category: "Choy",
      icon: "Cup",
      items: [
        {
          name: "Ko'k choy",
          description: "Xitoy ko'k choy, antioksidantlarga boy",
          price: 12000,
          image:
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
        },
        {
          name: "Qora choy",
          description: "Klassik ingliz choy, sut bilan",
          price: 10000,
          image:
            "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop",
        },
        {
          name: "Mevali choy",
          description: "Yangi mevalar va o'tlardan, issiq yoki sovuq",
          price: 16000,
          image:
            "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=300&fit=crop",
        },
        {
          name: "Masala choy",
          description: "Hind ziravorlari bilan, issiq va hidli",
          price: 18000,
          image:
            "https://images.unsplash.com/photo-1593790019556-d49e1b2a4c0e?w=400&h=300&fit=crop",
        },
        {
          name: "Camomile choy",
          description: "Tinchlantiruvchi gul choy",
          price: 14000,
          image:
            "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      category: "Shirinliklar",
      icon: "Cake",
      items: [
        {
          name: "Tiramisu",
          description: "Klassik italyan shokoladli tort",
          price: 35000,
          image:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
          isNew: true,
        },
        {
          name: "Cheesecake",
          description: "Pishloq krem va limon bilan",
          price: 32000,
          image:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
        },
        {
          name: "Croissant",
          description: "Har kuni yangi pishirilgan, krema bilan",
          price: 18000,
          image:
            "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
        },
        {
          name: "Muffin",
          description: "Shaftoli va blueberry bilan",
          price: 15000,
          image:
            "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop",
        },
        {
          name: "Macaron",
          description: "Fransuz shirinligi, turli ranglarda",
          price: 8000,
          image:
            "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop",
        },
        {
          name: "Brownie",
          description: "Qoʻshimcha shokolad va yong'oq bilan",
          price: 20000,
          image:
            "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      category: "Salatlar",
      icon: "Salad",
      items: [
        {
          name: "Cezar salati",
          description: "Tovuq, krutonlar, parmezano peyniri, Cezar sousi",
          price: 45000,
          image:
            "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop",
        },
        {
          name: "Grek salati",
          description: "Tomat, bodring, zeytun, feta pishloq",
          price: 38000,
          image:
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
        },
        {
          name: "Tunets salati",
          description: "Konserva tunets, sabzavotlar, limon sousi",
          price: 42000,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        },
        {
          name: "Avokado salati",
          description: "Avokado, tomat, qoʻziqorin, yashil oʻtlar",
          price: 48000,
          image:
            "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop",
          isNew: true,
        },
      ],
    },
    {
      category: "Asosiy taomlar",
      icon: "UtensilsCrossed",
      items: [
        {
          name: "Qoʻzi kabob",
          description: "Lula kabob uslubida, lavash va sabzavot bilan",
          price: 65000,
          image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        },
        {
          name: "Tovuq grillda",
          description: "Ziravorlarda marinlangan tovuq, kartoshka bilan",
          price: 58000,
          image:
            "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
        },
        {
          name: "Pasta Carbonara",
          description: "Bacone, yumurtqa va parmezano bilan",
          price: 55000,
          image:
            "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=300&fit=crop",
          isNew: true,
        },
        {
          name: "Burger",
          description: "Mol go'shti, pishloq, tomat, xiyorpechal",
          price: 52000,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
        },
        {
          name: "Plov",
          description: "O'zbek osh, qo'zi go'shti bilan, an'anaviy retsept",
          price: 48000,
          image:
            "https://images.unsplash.com/photo-1645696301019-35adcc18fc2e?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      category: "Ichimliklar",
      icon: "GlassWater",
      items: [
        {
          name: "Apelsin sharbati",
          description: "Yangi siqilgan, 100% natural",
          price: 20000,
          image:
            "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        },
        {
          name: "Limonada",
          description: "Limon, yalpiz, gazli suv",
          price: 18000,
          image:
            "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&h=300&fit=crop",
        },
        {
          name: "Mango lassi",
          description: "Mango va yogurt aralashmasi",
          price: 22000,
          image:
            "https://images.unsplash.com/photo-1553530979-fbb9e4aee36f?w=400&h=300&fit=crop",
          isNew: true,
        },
        {
          name: "Smoothie",
          description: "Mavsumiy mevalar, sog'lom va to'yimli",
          price: 26000,
          image:
            "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop",
        },
        {
          name: "Koktey",
          description: "Shirin sut kokteyllari, turli ta'mda",
          price: 24000,
          image:
            "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
        },
      ],
    },
  ],

  delivery: {
    enabled: true,
    minOrder: 0,
    deliveryFee: 10000,
    freeDeliveryFrom: 150000,
    deliveryTime: "30-60 daqiqa",
    deliveryZones: ["Chilonzor", "Yunusobod", "Mirzo Ulug'bek", "Shayxontohur"],
  },

  contacts: {
    phone: "+998 90 123 45 67",
    instagram: "@sizning_kafe",
    telegram: "@sizning_kafe",
    whatsapp: "+998901234567",
    email: "info@sizningkafe.uz",
  },

  orderChannel: {
    type: "telegram" as const,
    botToken: "MOCK_TOKEN",
    chatId: "MOCK_CHAT_ID",
  },

  yandexMapsApiKey: "",

  promotions: [
    {
      badge: "Ertaga tugaydi",
      title: "Har 3 ta Cappuccinoga 1 tasi bepul!",
      description: "Faqat bugun va ertaga. Do'stlaringiz bilan birga keling!",
      bg: "from-amber-600 to-orange-500",
    },
    {
      badge: "Yangilik",
      title: "Ertalabki nonushta 20% chegirma",
      description: "09:00–11:00 orasida buyurtma bering — chegirma avtomatik qo'shiladi.",
      bg: "from-amber-800 to-amber-600",
    },
    {
      badge: "Tez yetkazish",
      title: "150 000 so'mdan buyurtmaga yetkazish bepul",
      description: "Toshkentning barcha tumanlariga 30–60 daqiqada yetkazamiz.",
      bg: "from-stone-700 to-amber-700",
    },
  ],

  reviews: [
    {
      name: "Aziz Karimov",
      rating: 5,
      text: "Juda yaxshi kafe! Qahvalari ajoyib, muhit juda yoqimli. Har hafta albatta kelaman.",
      date: "2026-04-12",
      avatar: "https://i.pravatar.cc/60?img=11",
    },
    {
      name: "Malika Yusupova",
      rating: 5,
      text: "Tiramisu va cappuccino kombinatsiyasi — bu hayot! Xodimlar ham juda samimiy.",
      date: "2026-03-28",
      avatar: "https://i.pravatar.cc/60?img=5",
    },
    {
      name: "Jasur Rahimov",
      rating: 5,
      text: "Yetkazib berish xizmati juda tez. 40 daqiqada ovqat eshigimga yetib keldi, hammasi issiq!",
      date: "2026-04-05",
      avatar: "https://i.pravatar.cc/60?img=3",
    },
    {
      name: "Dilorom Nazarova",
      rating: 4,
      text: "Plov va qoʻzi kabob juda mazali. Milliy taomlarni shu darajada pishirish — katta mahorat!",
      date: "2026-04-19",
      avatar: "https://i.pravatar.cc/60?img=9",
    },
    {
      name: "Bobur Toshmatov",
      rating: 5,
      text: "Bolalar bilan kelganimda ham, do'stlar bilan ham — har safar mamnun ketamiz. Tavsiya qilaman!",
      date: "2026-04-22",
      avatar: "https://i.pravatar.cc/60?img=7",
    },
    {
      name: "Gulnora Mirzaeva",
      rating: 5,
      text: "Interior juda chiroyli, fotolar uchun ideal joy. Qahvalari ham a'lo darajada!",
      date: "2026-05-01",
      avatar: "https://i.pravatar.cc/60?img=16",
    },
  ],

  gallery: [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
  ],
};
