"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart, removeFromCart, updateCartQty, clearCart, cartCount, cartTotal } from "@/lib/cart";
import { checkoutViaWhatsApp } from "@/lib/checkout";

const HIDDEN_PREFIXES = ["/admin"];

export default function CartWidget() {
  const pathname = usePathname();
  const items = useCart();
  const [open, setOpen] = useState(false);

  const hidden = pathname === "/" || HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix));
  if (hidden) return null;

  const count = cartCount(items);
  const total = cartTotal(items);

  function handleCheckout() {
    if (items.length === 0) return;
    checkoutViaWhatsApp(items);
    clearCart();
  }

  return (
    <>
      <button className="cart-fab" type="button" onClick={() => setOpen(true)} aria-label="Open cart">
        🛒
        {count > 0 && <span className="cart-fab-badge">{count}</span>}
      </button>

      {open && (
        <div className="cart-drawer-backdrop" onClick={() => setOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-head">
              <h3>Your Cart</h3>
              <button type="button" className="cart-close" onClick={() => setOpen(false)} aria-label="Close cart">✕</button>
            </div>

            {items.length === 0 ? (
              <p className="admin-note">Your cart is empty — add a collectable to get started.</p>
            ) : (
              <div className="cart-items">
                {items.map((item) => (
                  <div className="cart-item" key={item.id}>
                    {item.image ? <img src={item.image} alt={item.name} /> : <div className="cart-item-noimg">📦</div>}
                    <div className="cart-item-body">
                      <div className="name">{item.name}</div>
                      <div className="price">₹{item.price.toLocaleString("en-IN")}</div>
                      <div className="cart-qty">
                        <button type="button" onClick={() => updateCartQty(item.id, item.qty - 1)}>−</button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => updateCartQty(item.id, item.qty + 1)}>+</button>
                      </div>
                    </div>
                    <button type="button" className="cart-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="cart-drawer-foot">
                <div className="cart-total-row">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <button className="btn btn-whatsapp cart-checkout-btn" type="button" onClick={handleCheckout}>
                  Checkout on WhatsApp
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
