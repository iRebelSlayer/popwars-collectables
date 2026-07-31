import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Popwars Collectables",
  description: "How Popwars Collectables collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
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
          <p className="eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: 2026</p>

          <p>
            This policy explains what information Popwars Collectables collects when you browse the site
            or place an order, and how that information is used and protected.
          </p>

          <h2>What We Collect</h2>
          <p>
            When you place an order with us — typically over WhatsApp or through this site — we collect
            details like your name, phone number, delivery address, and email address where provided.
            We may also automatically collect basic technical information (such as browser type and
            approximate location) when you visit the site, to help us understand how it&apos;s being used.
          </p>

          <h2>How We Use It</h2>
          <p>
            We use your information to process and deliver your order, communicate with you about that
            order, and respond to questions you send us. With your permission, we may occasionally send
            updates about new drops, restocks, or offers. We do not sell your personal information to
            third parties.
          </p>

          <h2>Consent</h2>
          <p>
            By sending us your details to place an order — for example, over WhatsApp — you consent to us
            using that information to fulfil the order and get it to you. For anything beyond that, such
            as marketing updates, we&apos;ll ask separately or give you a clear way to opt out.
          </p>

          <h2>Withdrawing Consent</h2>
          <p>
            You can ask us to stop contacting you or to delete the information we hold about you at any
            time by emailing{" "}
            <a href="mailto:popwarscollectable@gmail.com">popwarscollectable@gmail.com</a>.
          </p>

          <h2>How Your Data Is Stored</h2>
          <p>
            This site is built on modern hosting and database infrastructure with industry-standard
            security practices. Order and payment details shared directly with us (for example, over
            WhatsApp) are handled by our team directly and are not stored on this website.
          </p>

          <h2>Cookies</h2>
          <p>
            Like most websites, Popwars Collectables may use basic cookies or local browser storage to
            keep the site working smoothly — for example, remembering that you&apos;ve already seen the
            entrance animation. These do not track you across other websites.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time as the site and our processes evolve. Changes
            take effect as soon as they&apos;re posted on this page.
          </p>

          <h2>Questions</h2>
          <p>
            If you have any questions about this policy, reach out at{" "}
            <a href="mailto:popwarscollectable@gmail.com">popwarscollectable@gmail.com</a> or via{" "}
            <a href="https://wa.me/919821318230" target="_blank" rel="noopener">WhatsApp</a>.
          </p>
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
