"use client";

import { CartItem, cartTotal } from "./cart";
import { WHATSAPP_NUMBER } from "./whatsapp";

function buildMessage(items: CartItem[]): string {
  const lines = items.map(
    (item) => `${item.qty} x ${item.name} — ₹${(item.price * item.qty).toLocaleString("en-IN")}`
  );
  const total = cartTotal(items);
  return [
    "Hello Popwars Collectables, I would like to order:",
    "",
    ...lines,
    "",
    `Total: ₹${total.toLocaleString("en-IN")}`,
    "",
    "Please let me know if it's available. Thank you!",
  ].join("\n");
}

// wa.me links open a chat directly with our number (no contact save needed) but only support
// pre-filled text, not attachments — the OS share sheet was tried for handing over an order
// image too, but it hands off to a contact picker instead of our fixed number, defeating the
// point. Keep this a plain, synchronous text link so it always opens the right chat.
export function checkoutViaWhatsApp(items: CartItem[]) {
  const message = buildMessage(items);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}
