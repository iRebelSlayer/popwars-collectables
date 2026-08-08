"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SiteNav() {
  const router = useRouter();
  const pathname = usePathname();
  const showReplay = pathname === "/home";

  return (
    <nav className="nav">
      <Link className="brand" href="/home">
        <img className="brand-icon" src="/logo-icon.png" alt="" />
        <span className="brand-text">
          <span className="brand-title">POPWARS</span>
          <span className="brand-subtitle">Collectables</span>
        </span>
      </Link>
      <div className="links">
        <a href="/home#collections">Collections</a>
        <a href="/home#products">Products</a>
        <a href="/home#reviews">Reviews</a>
        <a href="/home#community">Community</a>
        <Link href="/contact-us">Contact</Link>
      </div>
      <div className="nav-actions">
        <a
          className="nav-pill btn-whatsapp"
          href="https://wa.me/919821318230?text=Hello%20Popwars%20Collectables%2C%20I%20would%20like%20to%20place%20an%20order."
          target="_blank"
          rel="noopener"
        >
          Order on WhatsApp
        </a>
        {showReplay && (
          <button
            className="replay"
            type="button"
            onClick={() => {
              localStorage.removeItem("popwars-intro-seen");
              router.push("/");
            }}
          >
            Replay Entrance
          </button>
        )}
      </div>
    </nav>
  );
}
