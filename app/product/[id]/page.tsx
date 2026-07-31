"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Product } from "@/lib/products";
import { getAllProducts } from "@/lib/productsApi";
import { openWhatsAppOrder } from "@/lib/whatsapp";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    getAllProducts().then((products) => {
      setAllProducts(products);
      setLoading(false);
    });
  }, []);

  const product = allProducts.find((entry) => entry.id === params.id) || allProducts[0];
  const related = allProducts.filter((entry) => entry.id !== product?.id).slice(0, 3);
  const images = product?.images || [];

  useEffect(() => {
    // Reset the gallery selection when navigating to a different product.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveImage(0);
  }, [product?.id]);

  if (loading) return null;
  if (!product) return null;

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
          <a className="nav-pill btn-whatsapp" href="https://wa.me/919821318230" target="_blank" rel="noopener">Order on WhatsApp</a>
        </div>
      </nav>

      <div className="product-hero-wrap">
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
      </div>

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

      <a
        className="wa-float"
        href={`https://wa.me/919821318230?text=${encodeURIComponent(`Hello Popwars Collectables, I would like to know more about ${product.name}.`)}`}
        target="_blank"
        rel="noopener"
        title="Order on WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
