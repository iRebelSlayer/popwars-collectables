"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Product } from "@/lib/products";
import { getAllProducts } from "@/lib/productsApi";
import { addToCart } from "@/lib/cart";
import { checkoutViaWhatsApp } from "@/lib/checkout";

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
      <SiteNav />

      <main>
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
            <button
              className="btn btn-whatsapp"
              type="button"
              disabled={product.statusClass === "sold-out"}
              onClick={() =>
                checkoutViaWhatsApp([{ id: product.id, name: product.name, price: product.price, image: images[0], qty: 1 }])
              }
            >
              {product.statusClass === "sold-out" ? "Sold Out" : "Buy on WhatsApp"}
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              disabled={product.statusClass === "sold-out"}
              onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: images[0] })}
            >
              Add to Cart
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
      </main>

      <SiteFooter />

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
