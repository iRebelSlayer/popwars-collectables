"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products as baseProducts, Product } from "@/lib/products";
import { getAllProducts } from "@/lib/customProducts";
import { openWhatsAppOrder } from "@/lib/whatsapp";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const [allProducts, setAllProducts] = useState<Product[]>(baseProducts);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // One-time hydration from localStorage (unavailable during server render), merging in admin-added products.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllProducts(getAllProducts());
  }, []);

  const product = allProducts.find((entry) => entry.id === params.id) || allProducts[0];
  const related = allProducts.filter((entry) => entry.id !== product?.id).slice(0, 3);
  const images = product?.images || [];

  useEffect(() => {
    // Reset the gallery selection when navigating to a different product.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveImage(0);
  }, [product?.id]);

  if (!product) return null;

  return (
    <div className="product-page">
      <nav className="nav">
        <Link className="brand" href="/home">POPWARS</Link>
        <div className="nav-actions">
          <Link className="nav-pill" href="/home">Back to Shop</Link>
          <a className="nav-pill btn-whatsapp" href="https://wa.me/919821318230" target="_blank" rel="noopener">Order on WhatsApp</a>
        </div>
      </nav>

      <section className="product-hero">
        <div>
          <div className="product-gallery">
            {images.length > 0 ? <img src={images[activeImage]} alt={product.name} /> : product.emoji}
          </div>
          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  className={`gallery-thumb ${index === activeImage ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={src} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="product-details">
          <p className="eyebrow">Collector spotlight</p>
          <h1>{product.name}</h1>
          <div className="product-meta">
            <span className={`status-pill ${product.statusClass}`}>{product.status}</span>
            <span>{product.category} · {product.collection}</span>
          </div>
          <p>{product.description}</p>
          <div className="price">₹{product.price.toLocaleString("en-IN")}</div>
          <div className="p-actions" style={{ marginTop: 16 }}>
            <button className="btn btn-whatsapp" type="button" onClick={() => openWhatsAppOrder(product.name, product.price)}>
              Buy on WhatsApp
            </button>
            <Link className="btn btn-secondary" href="/home">Browse More</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Related Collectables</h2>
        </div>
        <div className="related-grid">
          {related.map((entry) => (
            <article className="p-card" key={entry.id}>
              <Link className="p-thumb" href={`/product/${entry.id}`}>{entry.images?.[0] ? <img src={entry.images[0]} alt={entry.name} /> : entry.emoji}</Link>
              <div className="p-body">
                <div className="name">{entry.name}</div>
                <div className="price">₹{entry.price.toLocaleString("en-IN")}</div>
                <Link className="btn btn-secondary" href={`/product/${entry.id}`}>View</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
