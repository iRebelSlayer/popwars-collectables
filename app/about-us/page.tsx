import Link from "next/link";

export const metadata = {
  title: "About Us — Popwars Collectables",
  description: "The story behind Popwars Collectables and what we stand for.",
};

export default function AboutUsPage() {
  return (
    <div className="product-page">
      <nav className="nav">
        <Link className="brand" href="/home">
          <img className="brand-icon" src="/logo-icon.png" alt="" />
          <span className="brand-text">
            <span className="brand-title">POPWARS</span>
            <span className="brand-subtitle">Collectables</span>
          </span>
        </Link>
        <div className="nav-actions">
          <Link className="nav-pill" href="/home">Back to Shop</Link>
        </div>
      </nav>

      <div className="static-page-wrap">
        <div className="static-page-card">
          <p className="eyebrow">Our Story</p>
          <h1>About Popwars Collectables</h1>

          <p>
            Popwars Collectables was built for one kind of person: the collector who remembers exactly
            where they were when they found the piece that completed their shelf. We deal in Funko Pops,
            anime figures, and 3D-printed collectables — the things that turn a room into a story worth
            telling.
          </p>

          <p>
            We work with the pieces fans actually chase — figures from Naruto, One Piece, Dragon Ball Z,
            Demon Slayer, Jujutsu Kaisen, Attack on Titan, My Hero Academia, and beyond, alongside
            exclusive and limited-run Funko Pops. Every item that reaches the vault is chosen because
            we&apos;d want it on our own shelf first.
          </p>

          <h2>What We Care About</h2>
          <p>
            Presentation and trust. Every order is packed the way we&apos;d want to receive one ourselves —
            protected, careful, and worthy of what&apos;s inside. We&apos;d rather move a little slower and get a
            box to you intact than rush it and gamble with your collection.
          </p>

          <h2>How We Sell</h2>
          <p>
            Popwars runs on WhatsApp-first ordering. Browse the vault, message us about the piece you
            want, and we&apos;ll walk you through availability, pricing, and delivery directly — no
            impersonal checkout, just a real conversation with the people running the store.
          </p>

          <h2>Join the Vault</h2>
          <p>
            New drops, exclusives, and restocks get announced first to our WhatsApp community and
            Instagram followers. If you want first access before a piece is claimed by another traveler,
            that&apos;s where to be.
          </p>

          <div className="contact-methods">
            <a className="btn btn-whatsapp" href="https://chat.whatsapp.com/J1mwXMH6LH79bguu4PcaaM" target="_blank" rel="noopener">
              Join WhatsApp Community
            </a>
            <a className="btn btn-secondary" href="https://www.instagram.com/popwars_collectables/" target="_blank" rel="noopener">
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>

      <a
        className="wa-float"
        href="https://wa.me/919821318230?text=Hello%20Popwars%20Collectables%2C%20I%20would%20like%20to%20know%20more."
        target="_blank"
        rel="noopener"
        title="Order on WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
