"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/products";
import { getAllProducts, addProduct, removeProduct } from "@/lib/productsApi";
import { Review } from "@/lib/reviews";
import { getAllReviews, addReview, removeReview } from "@/lib/reviewsApi";

const DEFAULT_EMOJI = "📦";

const BADGE_CLASS_BY_LABEL: Record<string, string> = {
  New: "ash",
  Exclusive: "gold",
  Limited: "gold",
  "Pre-order": "ember",
};

const STATUS_TEXT_BY_VALUE: Record<string, string> = {
  "in-stock": "⚡ In stock",
  limited: "🔥 Few left in the Vault",
  sealed: "🏛 Sealed in the Vault",
  preorder: "🛍 Pre-order",
  claimed: "⚡ Claimed by another Traveler",
};

const FRANCHISES = [
  "Naruto",
  "One Piece",
  "Dragon Ball Z",
  "Demon Slayer",
  "Jujutsu Kaisen",
  "Attack on Titan",
  "My Hero Academia",
  "One Punch Man",
];

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ProductCard({ product, onRemove }: { product: Product; onRemove: () => void }) {
  const thumb = product.images?.[0];
  return (
    <article className="p-card">
      <div className="p-thumb">
        {thumb ? <img src={thumb} alt={product.name} /> : product.emoji}
        {product.badge && <span className={`badge ${product.badgeClass}`}>{product.badge}</span>}
      </div>
      <div className="p-body">
        <span className={`status-pill ${product.statusClass}`}>{product.status}</span>
        <div className="name">{product.name}</div>
        <div className="price">₹{Number(product.price).toLocaleString("en-IN")}</div>
        <div className="meta">{product.category} · {product.collection}</div>
        <div className="p-actions">
          <button className="btn btn-secondary" type="button" onClick={onRemove}>Remove</button>
        </div>
      </div>
    </article>
  );
}

function ReviewCard({ review, onRemove }: { review: Review; onRemove: () => void }) {
  return (
    <article className="p-card">
      <div className="p-thumb">
        <img src={review.image} alt={review.caption || "Review screenshot"} />
      </div>
      <div className="p-body">
        {review.caption && <div className="name">{review.caption}</div>}
        <div className="p-actions">
          <button className="btn btn-secondary" type="button" onClick={onRemove}>Remove</button>
        </div>
      </div>
    </article>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"product" | "review">("product");

  const [dataLoading, setDataLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formError, setFormError] = useState("");

  const [reviewImage, setReviewImage] = useState("");
  const [reviewCaption, setReviewCaption] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Funko Pops");
  const [genre, setGenre] = useState(FRANCHISES[0]);
  const [genreOther, setGenreOther] = useState("");
  const [price, setPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [status, setStatus] = useState("in-stock");
  const [imagesText, setImagesText] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthChecked(true);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    // Fetch products/reviews from Supabase once logged in; not a render-derived value, so a plain effect is correct here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDataLoading(true);
    Promise.all([getAllProducts(), getAllReviews()]).then(([p, r]) => {
      setProducts(p);
      setReviews(r);
      setDataLoading(false);
    });
  }, [session]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoggingIn(false);
    if (error) {
      setLoginError(error.message);
      setPassword("");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function handleRemove(id: string) {
    const { error } = await removeProduct(id);
    if (error) { setFormError(error); return; }
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  async function handleRemoveReview(id: string) {
    const { error } = await removeReview(id);
    if (error) { setFormError(error); return; }
    setReviews((prev) => prev.filter((review) => review.id !== id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const collection = genre === "other" ? genreOther.trim() : genre;
    const priceNum = Number(price);
    if (!name.trim() || !collection || !priceNum) return;

    const images = imagesText
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    const product: Product = {
      id: `${slugify(name)}-${Date.now().toString(36)}`,
      name: name.trim(),
      category,
      collection,
      price: priceNum,
      emoji: DEFAULT_EMOJI,
      images: images.length > 0 ? images : undefined,
      badge: badge || undefined,
      badgeClass: badge ? BADGE_CLASS_BY_LABEL[badge] : undefined,
      status: STATUS_TEXT_BY_VALUE[status],
      statusClass: status,
      description: description.trim() || "A hand-picked addition to the vault.",
    };

    const { error } = await addProduct(product);
    if (error) { setFormError(error); return; }
    setProducts((prev) => [product, ...prev]);

    setName("");
    setPrice("");
    setBadge("");
    setStatus("in-stock");
    setImagesText("");
    setDescription("");
    setGenre(FRANCHISES[0]);
    setGenreOther("");
  }

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const image = reviewImage.trim();
    if (!image) return;

    const review: Review = {
      id: `review-${Date.now().toString(36)}`,
      image,
      caption: reviewCaption.trim() || undefined,
    };

    const { error } = await addReview(review);
    if (error) { setFormError(error); return; }
    setReviews((prev) => [review, ...prev]);

    setReviewImage("");
    setReviewCaption("");
  }

  if (!authChecked) return null;

  if (!session) {
    return (
      <div className="admin-lock">
        <div className="admin-lock-card">
          <p className="eyebrow">Popwars Admin</p>
          <h1>Log In</h1>
          <p className="admin-note">Sign in with your Popwars admin account to manage products and reviews.</p>
          <form className="lock-form" onSubmit={handleLogin} style={{ flexDirection: "column", gap: 10 }}>
            <input
              type="email"
              placeholder="Email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={loggingIn}>
              {loggingIn ? "Logging in…" : "Log In"}
            </button>
          </form>
          <p className="admin-error">{loginError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-app">
      <header className="site-header">
        <nav className="nav">
          <a className="brand" href="/home">
            <img className="brand-icon" src="/logo-icon.png" alt="" />
            <span className="brand-text">
              <span className="brand-title">POPWARS</span>
              <span className="brand-subtitle">Collectables</span>
            </span>
          </a>
          <div className="nav-actions">
            <a className="nav-pill" href="/home">Back to Shop</a>
            <button className="replay" type="button" onClick={handleLogout}>Log Out</button>
          </div>
        </nav>
      </header>

      <div className="section" style={{ paddingTop: 20 }}>
        <div className="franchise-chips">
          <button className={`chip ${activeTab === "product" ? "active" : ""}`} type="button" onClick={() => setActiveTab("product")}>
            Product
          </button>
          <button className={`chip ${activeTab === "review" ? "active" : ""}`} type="button" onClick={() => setActiveTab("review")}>
            Review
          </button>
        </div>
        {formError && <p className="admin-error">{formError}</p>}
      </div>

      {activeTab === "product" && (
      <>
      <main className="section admin-main">
        <div className="section-head">
          <h2>Add a Product</h2>
          <p>Saved straight to the live database — shows up for every visitor, on any device, immediately.</p>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-grid">
            <label>
              Product Name
              <input type="text" required placeholder="e.g. Zoro Funko Pop" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Product Category
              <select required value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Funko Pops">Funko Pops</option>
                <option value="Anime Figures">Anime Figures</option>
                <option value="3D Prints">3D Prints</option>
              </select>
            </label>

            <label>
              Genre / Franchise
              <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                {FRANCHISES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
                <option value="other">Other (type below)</option>
              </select>
            </label>

            {genre === "other" && (
              <label>
                Custom Genre / Franchise
                <input type="text" placeholder="e.g. Chainsaw Man" value={genreOther} onChange={(e) => setGenreOther(e.target.value)} />
              </label>
            )}

            <label>
              Price (₹)
              <input type="number" required min={0} step={1} placeholder="1999" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>

            <label>
              Badge
              <select value={badge} onChange={(e) => setBadge(e.target.value)}>
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Exclusive">Exclusive</option>
                <option value="Limited">Limited</option>
                <option value="Pre-order">Pre-order</option>
              </select>
            </label>

            <label>
              Stock Status
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="in-stock">In stock</option>
                <option value="limited">Few left in the Vault</option>
                <option value="sealed">Sealed in the Vault</option>
                <option value="preorder">Pre-order</option>
                <option value="claimed">Claimed by another Traveler</option>
              </select>
            </label>
          </div>

          <label className="admin-full">
            Image URLs (optional, one per line)
            <textarea
              rows={3}
              placeholder={"https://example.com/front.jpg\nhttps://example.com/back.jpg\n(leave blank to use the emoji thumbnail)"}
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
            />
          </label>

          <label className="admin-full">
            Description
            <textarea rows={3} placeholder="Short collector-facing description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          <button className="btn btn-primary" type="submit">Add Product</button>
        </form>
      </main>

      <section className="section">
        <div className="section-head">
          <h2>All Products</h2>
          <p>{dataLoading ? "Loading…" : `${products.length} product${products.length === 1 ? "" : "s"} live on the site.`}</p>
        </div>
        <div className="admin-list">
          {!dataLoading && products.length === 0 && <p className="admin-note">No products yet — use the form above.</p>}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onRemove={() => handleRemove(product.id)} />
          ))}
        </div>
      </section>
      </>
      )}

      {activeTab === "review" && (
      <>
      <main className="section admin-main">
        <div className="section-head">
          <h2>Add a Review</h2>
          <p>Paste a link to the review screenshot — same as product images, no file upload.</p>
        </div>

        <form className="admin-form" onSubmit={handleReviewSubmit}>
          <label className="admin-full">
            Screenshot Image URL
            <input
              type="text"
              required
              placeholder="https://... (link to the review screenshot)"
              value={reviewImage}
              onChange={(e) => setReviewImage(e.target.value)}
            />
          </label>

          <label className="admin-full">
            Caption (optional)
            <input
              type="text"
              placeholder="e.g. — Asha, Mumbai"
              value={reviewCaption}
              onChange={(e) => setReviewCaption(e.target.value)}
            />
          </label>

          <button className="btn btn-primary" type="submit">Add Review</button>
        </form>
      </main>

      <section className="section">
        <div className="section-head">
          <h2>All Reviews</h2>
          <p>{dataLoading ? "Loading…" : `${reviews.length} review${reviews.length === 1 ? "" : "s"} live on the site.`}</p>
        </div>
        <div className="admin-list">
          {!dataLoading && reviews.length === 0 && <p className="admin-note">No reviews yet — use the form above.</p>}
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onRemove={() => handleRemoveReview(review.id)} />
          ))}
        </div>
      </section>
      </>
      )}
    </div>
  );
}
