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

// Draws a clean order-summary receipt from scratch rather than screenshotting the page —
// product thumbnails are hosted on imgbb.com without CORS headers, which would taint an
// html2canvas-style capture and silently fail, so we render text/shapes only.
function drawOrderImage(items: CartItem[]): Promise<Blob | null> {
  return new Promise((resolve) => {
    const width = 640;
    const headerHeight = 110;
    const rowHeight = 40;
    const footerHeight = 100;
    const height = headerHeight + items.length * rowHeight + footerHeight;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) { resolve(null); return; }

    ctx.fillStyle = "#ECE3D1";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#7A1F24";
    ctx.fillRect(0, 0, width, headerHeight);
    ctx.fillStyle = "#ECE3D1";
    ctx.font = "700 26px sans-serif";
    ctx.fillText("Popwars Collectables", 24, 46);
    ctx.font = "400 15px sans-serif";
    ctx.fillText("Order Request", 24, 72);
    ctx.font = "400 12px sans-serif";
    ctx.fillText(new Date().toLocaleString("en-IN"), 24, 94);

    let y = headerHeight + 30;
    items.forEach((item) => {
      ctx.fillStyle = "#131110";
      ctx.font = "600 15px sans-serif";
      const label = `${item.qty} × ${item.name}`;
      ctx.fillText(label.length > 52 ? `${label.slice(0, 49)}…` : label, 24, y);
      const priceText = `₹${(item.price * item.qty).toLocaleString("en-IN")}`;
      const textWidth = ctx.measureText(priceText).width;
      ctx.fillText(priceText, width - 24 - textWidth, y);
      y += rowHeight;
    });

    ctx.strokeStyle = "rgba(19,17,16,.2)";
    ctx.beginPath();
    ctx.moveTo(24, y - 10);
    ctx.lineTo(width - 24, y - 10);
    ctx.stroke();

    ctx.fillStyle = "#131110";
    ctx.font = "700 19px sans-serif";
    ctx.fillText("Total", 24, y + 22);
    const totalText = `₹${cartTotal(items).toLocaleString("en-IN")}`;
    const totalWidth = ctx.measureText(totalText).width;
    ctx.fillText(totalText, width - 24 - totalWidth, y + 22);

    ctx.fillStyle = "#4e463e";
    ctx.font = "400 12px sans-serif";
    ctx.fillText("Sent from popwarscollectables.in", 24, y + 54);

    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

export interface CheckoutResult {
  shared: boolean;
  downloaded: boolean;
}

// WhatsApp click-to-chat links only support pre-filled text, not attachments, so the best
// we can automate is: (a) mobile — hand the image + text to the native Share sheet so the
// customer can pick WhatsApp and send both together, or (b) desktop/unsupported — download
// the order image and open the WhatsApp text chat, and the customer attaches it manually.
export async function checkoutViaWhatsApp(items: CartItem[]): Promise<CheckoutResult> {
  const message = buildMessage(items);
  const blob = await drawOrderImage(items);

  if (blob) {
    const file = new File([blob], `popwars-order-${Date.now()}.png`, { type: "image/png" });
    const nav = navigator as Navigator & {
      canShare?: (data: { files?: File[] }) => boolean;
      share?: (data: { files?: File[]; text?: string; title?: string }) => Promise<void>;
    };

    if (nav.share && nav.canShare && nav.canShare({ files: [file] })) {
      try {
        await nav.share({ files: [file], text: message, title: "Popwars Collectables Order" });
        return { shared: true, downloaded: false };
      } catch {
        // User backed out of the share sheet or it failed — fall through to the download fallback.
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 4000);

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    return { shared: false, downloaded: true };
  }

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  return { shared: false, downloaded: false };
}
