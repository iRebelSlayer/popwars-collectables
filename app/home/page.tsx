"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products as baseProducts, Product } from "@/lib/products";
import { getAllProducts } from "@/lib/customProducts";
import { openWhatsAppOrder } from "@/lib/whatsapp";

const CATEGORY_CARDS = [
  { label: "Funko Pops", filter: "Funko Pops", c1: "#7A1F24" },
  { label: "Anime Figures", filter: "Anime Figures", c1: "#1f2a4d" },
  { label: "3D Prints", filter: "3D Prints", c1: "#3a2e14" },
];

const FRANCHISE_CHIPS = [
  "Naruto",
  "One Piece",
  "Dragon Ball Z",
  "Demon Slayer",
  "Jujutsu Kaisen",
  "Attack on Titan",
  "My Hero Academia",
];

const REVIEWS = [
  { stars: "★★★★★", quote: "The packaging felt museum-grade and the product arrived exactly as promised.", author: "— Asha, Mumbai" },
  { stars: "★★★★★", quote: "The WhatsApp ordering flow is so smooth — I got my figure in a day.", author: "— Rohan, Pune" },
  { stars: "★★★★★", quote: "The curation feels premium, like walking through a private collectors’ vault.", author: "— Nisha, Bengaluru" },
];

function ProductThumb({ product }: { product: Product }) {
  const thumb = product.images?.[0];
  return (
    <Link className="p-thumb" href={`/product/${product.id}`}>
      {thumb ? <img src={thumb} alt={product.name} /> : product.emoji}
      {product.badge && <span className={`badge ${product.badgeClass}`}>{product.badge}</span>}
    </Link>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>(baseProducts);
  const [filter, setFilter] = useState("");
  const [activeChip, setActiveChip] = useState("");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [countdown, setCountdown] = useState<{ days: number; hours: number; mins: number } | null>(null);
  const targetRef = useRef<Date | null>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // One-time hydration from localStorage (unavailable during server render), merging in admin-added products.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllProducts(getAllProducts());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((i) => (i + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!targetRef.current) {
      const target = new Date();
      target.setDate(target.getDate() + 12);
      target.setHours(18, 0, 0, 0);
      targetRef.current = target;
    }
    const update = () => {
      const diff = targetRef.current!.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, mins: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
      });
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = useMemo(() => {
    const needle = filter.toLowerCase();
    return allProducts.filter((product) =>
      `${product.name} ${product.category} ${product.collection} ${product.description}`
        .toLowerCase()
        .includes(needle)
    );
  }, [allProducts, filter]);

  function applyFilter(value: string) {
    setFilter(value);
    setActiveChip(value);
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div id="homepage">
      <header className="site-header">
        <nav className="nav">
          <Link className="brand" href="/home">
            <img className="brand-icon" src="/logo-icon.png" alt="" />
            POPWARS
          </Link>
          <div className="links">
            <a href="#collections">Collections</a>
            <a href="#products">Products</a>
            <a href="#reviews">Reviews</a>
            <a href="#community">Community</a>
            <a href="mailto:popwarscollectable@gmail.com">Contact</a>
          </div>
          <div className="nav-actions">
            <a className="nav-pill" href="https://wa.me/919821318230?text=Hello%20Popwars%20Collectables%2C%20I%20would%20like%20to%20place%20an%20order." target="_blank" rel="noopener">
              Order on WhatsApp
            </a>
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
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <img className="hero-logo" src="/logo-transparent.png" alt="Popwars Collectables" />
            <p className="hero-tagline">Every Shelf Tells a Story</p>
            <p className="hero-description">Funko Pops, anime figures, and 3D prints — claimed one traveler at a time.</p>
            <form
              className="search"
              onSubmit={(e) => {
                e.preventDefault();
                productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <input
                type="text"
                placeholder="What are you hunting today?"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
            <div className="trust-badges">
              <span className="trust-badge">⚡ Fast WhatsApp Ordering</span>
              <span className="trust-badge">📦 Secure Packaging</span>
              <span className="trust-badge">⭐ Collector-First Service</span>
            </div>
          </div>
        </section>

        <section className="section" id="collections">
          <div className="section-head">
            <h2>Shop by Category</h2>
            <p>Funko Pops lead the vault, backed by premium anime figures and 3D prints.</p>
          </div>
          <div className="collections categories">
            {CATEGORY_CARDS.map((card) => (
              <button
                key={card.filter}
                className="coll-card"
                style={{ ["--c1" as string]: card.c1, ["--c2" as string]: "#131110" }}
                onClick={() => applyFilter(card.filter)}
              >
                {card.label}
              </button>
            ))}
          </div>
          <div className="franchise-chips">
            {FRANCHISE_CHIPS.map((name) => (
              <button
                key={name}
                className={`chip ${activeChip === name ? "active" : ""}`}
                type="button"
                onClick={() => applyFilter(name)}
              >
                {name}
              </button>
            ))}
            <button className={`chip ${activeChip === "" ? "active" : ""}`} type="button" onClick={() => applyFilter("")}>
              Show All
            </button>
          </div>
        </section>

        <section className="section" id="products" ref={productsSectionRef}>
          <div className="section-head">
            <h2>Trending Collectables</h2>
            <p>Instantly filtered for your current obsession.</p>
          </div>
          <div className="product-grid">
            {filteredProducts.length === 0 && (
              <p className="section-head" style={{ gridColumn: "1 / -1" }}>No collectables match your search yet.</p>
            )}
            {filteredProducts.map((product) => (
              <article className="p-card" key={product.id}>
                <ProductThumb product={product} />
                <div className="p-body">
                  <span className={`status-pill ${product.statusClass}`}>{product.status}</span>
                  <div className="name">{product.name}</div>
                  <div className="price">₹{product.price.toLocaleString("en-IN")}</div>
                  <div className="meta">{product.category} · {product.collection}</div>
                  <div className="p-actions">
                    <Link className="btn btn-secondary" href={`/product/${product.id}`}>View</Link>
                    <button className="btn btn-primary" type="button" onClick={() => openWhatsAppOrder(product.name, product.price)}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section coming-soon">
          <div className="coming-card">
            <div>
              <p className="eyebrow">Coming Soon</p>
              <h2>New drops land every week.</h2>
              <p>From limited-edition exclusives to sealed premium statues, the vault keeps opening.</p>
            </div>
            {countdown && (
              <div className="countdown">
                <div className="unit"><strong>{countdown.days}</strong><span>Days</span></div>
                <div className="unit"><strong>{countdown.hours}</strong><span>Hours</span></div>
                <div className="unit"><strong>{countdown.mins}</strong><span>Mins</span></div>
              </div>
            )}
            <div className="cta-row">
              <a className="btn btn-primary" href="https://chat.whatsapp.com/J1mwXMH6LH79bguu4PcaaM" target="_blank" rel="noopener">
                Join WhatsApp Group
              </a>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() =>
                  window.open(
                    "https://wa.me/919821318230?text=Hello%20Popwars%20Collectables%2C%20please%20notify%20me%20about%20upcoming%20drops.",
                    "_blank",
                    "noopener"
                  )
                }
              >
                Notify Me
              </button>
            </div>
          </div>
        </section>

        <section className="section" id="reviews">
          <div className="section-head">
            <h2>Collector Reviews</h2>
            <p>Trusted by first-time buyers and seasoned vault hunters.</p>
          </div>
          <div className="review-slider">
            <button className="slider-btn" type="button" aria-label="Previous review" onClick={() => setReviewIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}>
              ←
            </button>
            <div className="review-track">
              {REVIEWS.map((review, index) => (
                <article className={`review-card ${index === reviewIndex ? "active" : ""}`} key={review.author}>
                  <div className="review-stars">{review.stars}</div>
                  <p>“{review.quote}”</p>
                  <strong>{review.author}</strong>
                </article>
              ))}
            </div>
            <button className="slider-btn" type="button" aria-label="Next review" onClick={() => setReviewIndex((i) => (i + 1) % REVIEWS.length)}>
              →
            </button>
          </div>
        </section>

        <section className="section" id="gallery">
          <div className="section-head">
            <h2>Instagram Gallery</h2>
            <p>Latest arrivals, unboxings, and collector moments.</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-card">🧿 <span>New arrival spotlight</span></div>
            <div className="gallery-card">⚡ <span>Lightning drop</span></div>
            <div className="gallery-card">🏛 <span>Vault reveal</span></div>
            <div className="gallery-card">🦸 <span>Exclusive panels</span></div>
          </div>
        </section>

        <section className="section community" id="community">
          <div className="community-card">
            <div>
              <p className="eyebrow">Community</p>
              <h2>Join the vault and get first access.</h2>
              <p>Subscribe for new release alerts and collector stories straight to your inbox.</p>
            </div>
            <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>Popwars Collectables</strong>
          <p>Every Shelf Tells a Story.</p>
        </div>
        <div>
          <a href="https://www.instagram.com/popwars_collectables/" target="_blank" rel="noopener">Instagram</a>
          <a href="https://chat.whatsapp.com/J1mwXMH6LH79bguu4PcaaM" target="_blank" rel="noopener">WhatsApp Community</a>
          <a href="mailto:popwarscollectable@gmail.com">Email Support</a>
        </div>
      </footer>

      <a
        className="wa-float"
        href="https://wa.me/919821318230?text=Hello%20Popwars%20Collectables%2C%20I%20would%20like%20to%20order%20a%20collectable."
        target="_blank"
        rel="noopener"
        title="Order on WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
