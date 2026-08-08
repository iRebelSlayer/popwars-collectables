import ReactMarkdown from "react-markdown";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { getPageContent } from "@/lib/pagesApi";
import { PAGE_DEFAULTS } from "@/lib/pageDefaults";

export const metadata = {
  title: "Contact Us — Popwars Collectables",
  description: "Get in touch with Popwars Collectables for orders, questions, or support.",
};

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const content = (await getPageContent("contact-us")) ?? PAGE_DEFAULTS["contact-us"];

  return (
    <div className="product-page">
      <SiteNav />

      <main>
      <div className="static-page-wrap">
        <div className="static-page-card">
          <p className="eyebrow">Get In Touch</p>
          <h1>Contact Us</h1>

          <ReactMarkdown>{content}</ReactMarkdown>

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
      </main>

      <SiteFooter />

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
