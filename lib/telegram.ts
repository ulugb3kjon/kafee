import { OrderData } from "@/types";
import { formatPrice } from "./cart";
import { CAFE_CONFIG } from "@/config/cafe.config";

export function buildOrderMessage(order: OrderData): string {
  const lines: string[] = [
    `🍽️ Yangi buyurtma — ${CAFE_CONFIG.name}`,
    `━━━━━━━━━━━━━━━━━━`,
    `👤 Ism: ${order.name}`,
    `📞 Telefon: ${order.phone}`,
    ``,
    order.type === "delivery"
      ? `🚚 Yetkazib berish\n📍 Manzil: ${order.address}${order.landmark ? `\n🏠 Mo'ljal: ${order.landmark}` : ""}`
      : `🏪 O'zim olib ketaman\n📍 Filial: ${order.branch}${order.pickupTime ? `\n⏰ Vaqt: ${order.pickupTime}` : ""}`,
    ``,
    `📋 Buyurtma:`,
    ...order.items.map(
      (item) =>
        `  • ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    ),
    ``,
    `💰 Mahsulotlar: ${formatPrice(order.total)}`,
  ];

  if (order.type === "delivery") {
    const delivery =
      order.total >= CAFE_CONFIG.delivery.freeDeliveryFrom
        ? 0
        : CAFE_CONFIG.delivery.deliveryFee;
    lines.push(`🚚 Yetkazib berish: ${delivery === 0 ? "Bepul" : formatPrice(delivery)}`);
    lines.push(`💵 Jami: ${formatPrice(order.total + delivery)}`);
  } else {
    lines.push(`💵 Jami: ${formatPrice(order.total)}`);
  }

  if (order.note) lines.push(`\n📝 Izoh: ${order.note}`);
  lines.push(`━━━━━━━━━━━━━━━━━━`);

  return lines.join("\n");
}

export function buildWhatsAppLink(order: OrderData): string {
  const message = buildOrderMessage(order);
  const phone = CAFE_CONFIG.contacts.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export async function sendTelegramOrder(order: OrderData): Promise<boolean> {
  const { botToken, chatId } = CAFE_CONFIG.orderChannel;
  if (botToken === "MOCK_TOKEN") {
    console.log("Mock Telegram order:", buildOrderMessage(order));
    return true;
  }
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildOrderMessage(order),
          parse_mode: "HTML",
        }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}
