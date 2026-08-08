import ReactMarkdown from "react-markdown";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { getPageContent } from "@/lib/pagesApi";
import { PAGE_DEFAULTS } from "@/lib/pageDefaults";

export const metadata = {
  title: "About Us — Popwars Collectables",
  description: "The story behind Popwars Collectables and what we stand for.",
};

export const dynamic = "force-dynamic";

export default async function AboutUsPage() {
  const content = (await getPageContent("about-us")) ?? PAGE_DEFAULTS["about-us"];

  return (
    <div className="product-page">
      <SiteNav />

      <main>
      <div className="static-page-wrap">
        <div className="static-page-card">
          <p className="eyebrow">Our Story</p>
          <h1>About Popwars Collectables</h1>

          <ReactMarkdown>{content}</ReactMarkdown>

          <div className="contact-methods">
            <a className="btn btn-whatsapp" href="https://chat.whatsapp.com/J1mwXMH6LH79bguu4PcaaM" target="_blank" rel="noopener">
              Join WhatsApp Community
            </a>
            <a className="btn btn-secondary" href="https://www.instagram.com/popwars_collectables/" target="_blank" rel="noopener">
              Follow on Instagram
            </a>
          </div>
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
