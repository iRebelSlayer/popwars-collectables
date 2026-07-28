export const WHATSAPP_NUMBER = '919821318230';

export function openWhatsAppOrder(productName: string, price: number) {
  const message = `Hello Popwars Collectables,%0A%0A I would like to purchase:%0A%0AProduct: ${encodeURIComponent(productName)}%0APrice: ₹${price}%0A%0APlease let me know if it is available.%0A%0AThank you.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener');
}
