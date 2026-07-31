import ReactMarkdown from "react-markdown";
import SiteNav from "@/components/SiteNav";
import { getPageContent } from "@/lib/pagesApi";
import { PAGE_DEFAULTS } from "@/lib/pageDefaults";

export const metadata = {
  title: "Privacy Policy — Popwars Collectables",
  description: "How Popwars Collectables collects, uses, and protects your information.",
};

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const content = (await getPageContent("privacy-policy")) ?? PAGE_DEFAULTS["privacy-policy"];

  return (
    <div className="product-page">
      <SiteNav />

      <div className="static-page-wrap">
        <div className="static-page-card">
          <p className="eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: 2026</p>

          <ReactMarkdown>{content}</ReactMarkdown>

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
