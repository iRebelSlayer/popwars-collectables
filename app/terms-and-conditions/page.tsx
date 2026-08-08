import ReactMarkdown from "react-markdown";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { getPageContent } from "@/lib/pagesApi";
import { PAGE_DEFAULTS } from "@/lib/pageDefaults";

export const metadata = {
  title: "Terms & Conditions — Popwars Collectables",
  description: "The terms that apply when you shop with Popwars Collectables.",
};

export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const content = (await getPageContent("terms-and-conditions")) ?? PAGE_DEFAULTS["terms-and-conditions"];

  return (
    <div className="product-page">
      <SiteNav />

      <main>
      <div className="static-page-wrap">
        <div className="static-page-card">
          <p className="eyebrow">Legal</p>
          <h1>Terms &amp; Conditions</h1>
          <p className="updated">Last updated: 2026</p>

          <ReactMarkdown>{content}</ReactMarkdown>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href="mailto:popwarscollectable@gmail.com">popwarscollectable@gmail.com</a> or via{" "}
            <a href="https://wa.me/919821318230" target="_blank" rel="noopener">WhatsApp</a>.
          </p>
        </div>
      </div>
      </main>

      <SiteFooter />

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
