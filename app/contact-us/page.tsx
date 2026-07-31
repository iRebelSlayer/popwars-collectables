import Link from "next/link";

export const metadata = {
  title: "Contact Us — Popwars Collectables",
  description: "Get in touch with Popwars Collectables for orders, questions, or support.",
};

export default function ContactUsPage() {
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
          <p className="eyebrow">Get In Touch</p>
          <h1>Contact Us</h1>

          <p>
            Have a question about a product, need help with an order, or just want to talk about your
            collection? We&apos;d love to hear from you. Popwars runs primarily over WhatsApp — it&apos;s the
            fastest way to reach a real person on the team.
          </p>

          <h2>WhatsApp</h2>
          <p>The quickest way to ask about a product, check availability, or place an order.</p>

          <h2>Email</h2>
          <p>
            For anything that&apos;s easier in writing, reach us at{" "}
            <a href="mailto:popwarscollectable@gmail.com">popwarscollectable@gmail.com</a>.
          </p>

          <h2>Instagram</h2>
          <p>
            Follow{" "}
            <a href="https://www.instagram.com/popwars_collectables/" target="_blank" rel="noopener">
              @popwars_collectables
            </a>{" "}
            for new drops, restocks, and behind-the-scenes looks at the vault.
          </p>

          <div className="contact-methods">
            <a
              className="btn btn-whatsapp"
              href="https://wa.me/919821318230?text=Hello%20Popwars%20Collectables%2C%20I%20have%20a%20question."
              target="_blank"
              rel="noopener"
            >
              💬 Message on WhatsApp
            </a>
            <a className="btn btn-secondary" href="mailto:popwarscollectable@gmail.com">
              Email Us
            </a>
          </div>
        </div>
      </div>

      <a
        className="wa-float"
        href="https://wa.me/919821318230?text=Hello%20Popwars%20Collectables%2C%20I%20have%20a%20question."
        target="_blank"
        rel="noopener"
        title="Order on WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
