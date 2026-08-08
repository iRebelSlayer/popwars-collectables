"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Product } from "@/lib/products";
import { getAllProducts } from "@/lib/productsApi";
import { Review } from "@/lib/reviews";
import { getAllReviews } from "@/lib/reviewsApi";
import { addToCart } from "@/lib/cart";

const CATEGORY_CARDS: { label: string; filter: string; c1: string; logo?: string; image?: string }[] = [
  { label: "Funko Pops", filter: "Funko Pops", c1: "#7A1F24", logo: "https://i.ibb.co/PZhgBTRP/Funkologo.jpg" },
  {
    label: "Action Figures",
    filter: "Action Figures",
    c1: "#1f2a4d",
    image: "https://i.ibb.co/gMhwvBGs/Whats-App-Image-2026-08-08-at-6-03-13-PM.jpg",
  },
  { label: "3D Prints", filter: "3D Prints", c1: "#3a2e14", logo: "https://i.ibb.co/xccw9jR/3-D-print-logo.jpg" },
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

const PRODUCTS_PER_PAGE = 8;

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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [activeChip, setActiveChip] = useState("");
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const productsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([getAllProducts(), getAllReviews()]).then(([products, fetchedReviews]) => {
      setAllProducts(products);
      setReviews(fetchedReviews);
      setLoading(false);
    });
  }, []);

  const categoryImages = useMemo(() => {
    const map: Record<string, string | undefined> = {};
    CATEGORY_CARDS.forEach((card) => {
      map[card.filter] =
        card.image ?? allProducts.find((p) => p.category === card.filter && p.images?.[0])?.images?.[0];
    });
    return map;
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    const needle = filter.toLowerCase();
    return allProducts.filter((product) =>
      `${product.name} ${product.category} ${product.collection} ${product.description}`
        .toLowerCase()
        .includes(needle)
    );
  }, [allProducts, filter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const pagedProducts = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  useEffect(() => {
    // Reset to page 1 whenever the search/filter changes so stale pagination doesn't hide results.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [filter]);

  function goToPage(next: number) {
    setPage(next);
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function applyFilter(value: string) {
    setFilter(value);
    setActiveChip(value);
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div id="homepage">
      <header className="site-header">
        <SiteNav />
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <img className="hero-logo" src="/logo-transparent.png" alt="Popwars Collectables" />
            <p className="hero-tagline">Every Shelf Tells a Story</p>
            <p className="hero-description">Funko Pops, action figures, and 3D prints — claimed one traveler at a time.</p>
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
            <p>Funko Pops lead the vault, backed by premium action figures and 3D prints.</p>
          </div>
          <div className="collections categories">
            {CATEGORY_CARDS.map((card) => {
              const image = categoryImages[card.filter];
              if (card.logo) {
                return (
                  <button
                    key={card.filter}
                    className="coll-card coll-card-logo-bg"
                    onClick={() => applyFilter(card.filter)}
                  >
                    <img className="coll-card-logo" src={card.logo} alt={card.label} />
                    <span className="coll-card-caption">{card.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={card.filter}
                  className="coll-card"
                  style={{
                    ["--c1" as string]: card.c1,
                    ["--c2" as string]: "#131110",
                    ...(image
                      ? {
                          backgroundImage: `linear-gradient(160deg, rgba(19,17,16,.2), rgba(19,17,16,.85)), url(${image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {}),
                  }}
                  onClick={() => applyFilter(card.filter)}
                >
                  {card.label}
                </button>
              );
            })}
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
            {loading && (
              <p className="section-head" style={{ gridColumn: "1 / -1" }}>Loading the vault…</p>
            )}
            {!loading && filteredProducts.length === 0 && (
              <p className="section-head" style={{ gridColumn: "1 / -1" }}>No collectables match your search yet.</p>
            )}
            {pagedProducts.map((product) => (
              <article className="p-card" key={product.id}>
                <ProductThumb product={product} />
                <div className="p-body">
                  <span className={`status-pill ${product.statusClass}`}>{product.status}</span>
                  <div className="name">{product.name}</div>
                  <div className="price">₹{product.price.toLocaleString("en-IN")}</div>
                  <div className="meta">{product.category} · {product.collection}</div>
                  <div className="p-actions">
                    <Link className="btn btn-secondary" href={`/product/${product.id}`}>View</Link>
                    <button
                      className="btn btn-primary"
                      type="button"
                      disabled={product.statusClass === "sold-out"}
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images?.[0],
                        })
                      }
                    >
                      {product.statusClass === "sold-out" ? "Sold Out" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredProducts.length > PRODUCTS_PER_PAGE && (
            <div className="pagination">
              <button type="button" disabled={page <= 1} onClick={() => goToPage(page - 1)}>← Prev</button>
              <span className="page-status">Page {page} of {totalPages}</span>
              <button type="button" disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>Next →</button>
            </div>
          )}
        </section>

        {reviews.length > 0 && (
          <section className="section" id="reviews">
            <div className="section-head">
              <h2>Collector Reviews</h2>
              <p>Trusted by first-time buyers and seasoned vault hunters.</p>
            </div>
            <div className="review-marquee">
              <div className="review-marquee-track">
                {[...reviews, ...reviews].map((review, index) => (
                  <article className="review-shot-card" key={`${review.id}-${index}`}>
                    <img src={review.image} alt={review.caption || "Collector review screenshot"} />
                    {review.caption && <p className="review-caption">{review.caption}</p>}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

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
              <p>New drops, restocks, and collector stories are announced first on WhatsApp.</p>
            </div>
            <a
              className="btn btn-whatsapp"
              href="https://chat.whatsapp.com/J1mwXMH6LH79bguu4PcaaM"
              target="_blank"
              rel="noopener"
            >
              Join WhatsApp Community
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />

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
