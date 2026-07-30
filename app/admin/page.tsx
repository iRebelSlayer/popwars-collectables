"use client";

import { useEffect, useState } from "react";
import { products as baseProducts, Product } from "@/lib/products";
import { getCustomProducts, saveCustomProducts } from "@/lib/customProducts";

const ADMIN_PASSCODE = "iRebelPacman@123";
const ADMIN_UNLOCKED_KEY = "popwars-admin-unlocked";
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

function ProductCard({ product, onRemove }: { product: Product; onRemove?: () => void }) {
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
        {onRemove && (
          <div className="p-actions">
            <button className="btn btn-secondary" type="button" onClick={onRemove}>Remove</button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [lockError, setLockError] = useState("");

  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [exportText, setExportText] = useState("");

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
    // One-time read of a browser-only API (sessionStorage) to restore the unlocked state; no external subscription to set up.
    if (sessionStorage.getItem(ADMIN_UNLOCKED_KEY) === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    // One-time hydration from localStorage once unlocked; no external subscription to maintain.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (unlocked) setCustomProducts(getCustomProducts());
  }, [unlocked]);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (passcodeInput === ADMIN_PASSCODE) {
      sessionStorage.setItem(ADMIN_UNLOCKED_KEY, "true");
      setLockError("");
      setUnlocked(true);
    } else {
      setLockError("Incorrect passcode.");
      setPasscodeInput("");
    }
  }

  function handleLock() {
    sessionStorage.removeItem(ADMIN_UNLOCKED_KEY);
    setUnlocked(false);
    setPasscodeInput("");
  }

  function handleRemove(id: string) {
    const remaining = customProducts.filter((product) => product.id !== id);
    saveCustomProducts(remaining);
    setCustomProducts(remaining);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

    const updated = [...customProducts, product];
    saveCustomProducts(updated);
    setCustomProducts(updated);

    setName("");
    setPrice("");
    setBadge("");
    setStatus("in-stock");
    setImagesText("");
    setDescription("");
    setGenre(FRANCHISES[0]);
    setGenreOther("");
  }

  function handleExport() {
    const all = [...baseProducts, ...customProducts];
    const entries = all.map((product) => JSON.stringify(product, null, 2)).join(",\n");
    const fileText = `window.popwarsProducts = [\n${entries}\n];\n`;
    setExportText(fileText);

    const blob = new Blob([fileText], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  if (!unlocked) {
    return (
      <div className="admin-lock">
        <div className="admin-lock-card">
          <p className="eyebrow">Popwars Admin</p>
          <h1>Enter Passcode</h1>
          <p className="admin-note">
            This is a local screen lock only — it lives in this page&apos;s code and is not real security. Do not rely on it
            to protect the page if this site is hosted publicly without further protection.
          </p>
          <form className="lock-form" onSubmit={handleUnlock}>
            <input
              type="password"
              placeholder="Passcode"
              autoComplete="off"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Unlock</button>
          </form>
          <p className="admin-error">{lockError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-app">
      <header className="site-header">
        <nav className="nav">
          <a className="brand" href="/home">POPWARS</a>
          <div className="nav-actions">
            <a className="nav-pill" href="/home">Back to Shop</a>
            <button className="replay" type="button" onClick={handleLock}>Lock</button>
          </div>
        </nav>
      </header>

      <main className="section admin-main">
        <div className="section-head">
          <h2>Add a Product</h2>
          <p>New products are saved to this browser and merged live into the shop while you work.</p>
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
          <h2>Your Added Products</h2>
          <p>Stored locally in this browser. Export below to make them live for every visitor.</p>
        </div>
        <div className="admin-list">
          {customProducts.length === 0 && <p className="admin-note">No products added yet — use the form above.</p>}
          {customProducts.map((product) => (
            <ProductCard key={product.id} product={product} onRemove={() => handleRemove(product.id)} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Export to products.js</h2>
          <p>
            Additions above only appear in this browser until they&apos;re published. Download the file below and replace{" "}
            <code>products.js</code> in the project, then redeploy the site.
          </p>
        </div>
        <button className="btn btn-secondary" type="button" onClick={handleExport}>Download updated products.js</button>
        <textarea
          className="admin-export"
          readOnly
          rows={10}
          value={exportText}
          placeholder="Click 'Download updated products.js' to also preview the file contents here for copy-paste."
        />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Base Catalog (reference)</h2>
          <p>Built into the site&apos;s code. Edit these directly in <code>lib/products.ts</code> — not manageable from here.</p>
        </div>
        <div className="admin-list admin-list-readonly">
          {baseProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
