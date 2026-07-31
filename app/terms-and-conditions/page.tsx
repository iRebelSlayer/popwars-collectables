import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "Terms & Conditions — Popwars Collectables",
  description: "The terms that apply when you shop with Popwars Collectables.",
};

export default function TermsPage() {
  return (
    <div className="product-page">
      <SiteNav />

      <div className="static-page-wrap">
        <div className="static-page-card">
          <p className="eyebrow">Legal</p>
          <h1>Terms &amp; Conditions</h1>
          <p className="updated">Last updated: 2026</p>

          <p>
            By browsing this site or placing an order with Popwars Collectables, you agree to the terms
            below. We may update these terms from time to time; continuing to use the site after a change
            means you accept the updated terms.
          </p>

          <h2>Using This Site</h2>
          <p>
            You agree to provide accurate information when placing an order and not to use this site for
            any unlawful purpose, or to attempt to copy, resell, or exploit our content, product photos,
            or listings without permission.
          </p>

          <h2>Products &amp; Availability</h2>
          <p>
            We do our best to keep stock, pricing, and descriptions accurate, but availability can change
            quickly with collectables — a piece may be claimed by another traveler between browsing and
            checkout. Actual packaging may vary slightly from the photos shown. If an order can&apos;t be
            fulfilled as listed, we&apos;ll let you know before proceeding rather than substitute anything
            without your agreement.
          </p>

          <h2>Orders &amp; Payment</h2>
          <p>
            Most orders are placed and confirmed directly with our team over WhatsApp, where we&apos;ll
            confirm the item, price, and delivery details with you before anything is finalized. We
            reserve the right to decline or cancel an order at our discretion — for example, if an item
            turns out to be unavailable or if we suspect fraudulent activity.
          </p>

          <h2>Shipping</h2>
          <p>
            Shipping costs, timelines, and coverage areas are confirmed with you directly at the time of
            order, since these can vary by item and location.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this site — including the Popwars Collectables name, logo, and site design —
            belongs to Popwars Collectables and may not be reproduced without permission. Product names,
            characters, and franchises referenced on this site (such as anime and pop-culture properties)
            belong to their respective owners; we are an independent retailer of licensed and collectable
            merchandise, not an official partner unless stated otherwise.
          </p>

          <h2>No Warranties</h2>
          <p>
            This site and its listings are provided on an &quot;as is&quot; and &quot;as available&quot;
            basis. While we take care in how we describe and package every item, we don&apos;t guarantee
            the site will be free of errors or interruptions at all times.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the extent permitted by law, Popwars Collectables is not liable for indirect or incidental
            damages arising from your use of this site or the products purchased through it, beyond the
            value of the order itself.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            This site may link to third-party platforms such as Instagram or WhatsApp. We aren&apos;t
            responsible for the content or practices of those external platforms.
          </p>

          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of India.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
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
