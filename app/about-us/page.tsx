import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "About Us — Popwars Collectables",
  description: "The story behind Popwars Collectables and what we stand for.",
};

export default function AboutUsPage() {
  return (
    <div className="product-page">
      <SiteNav />

      <div className="static-page-wrap">
        <div className="static-page-card">
          <p className="eyebrow">Our Story</p>
          <h1>About Popwars Collectables</h1>

          <p>
            Popwars Collectables was built for one kind of person: the collector who remembers exactly
            where they were when they found the piece that completed their shelf.
          </p>

          <p>
            We deal in Funko Pops, anime figures, action figures, and premium 3D-printed collectables —
            the kind of pieces that turn a room into a story worth telling.
          </p>

          <p>
            Our vault is home to collectables from the worlds fans love most. Whether you&apos;re hunting
            characters from <strong>Marvel, DC, Star Wars, Naruto, One Piece, Dragon Ball Z, Demon Slayer,
            Jujutsu Kaisen, Attack on Titan, My Hero Academia</strong>, or many more universes, we focus on
            bringing together figures that collectors genuinely want to own. From everyday favourites to
            exclusives and limited releases, every item is carefully selected with collectors in mind.
          </p>

          <h2>What We Care About</h2>
          <p>Presentation and trust.</p>
          <p>
            Every order is packed the way we&apos;d want to receive one ourselves — protected, carefully
            secured, and worthy of what&apos;s inside. We&apos;d rather take a little extra time to ensure
            your collectable arrives safely than rush a shipment and risk your collection.
          </p>

          <h2>How We Sell</h2>
          <p>Popwars is built around a WhatsApp-first shopping experience.</p>
          <p>
            Browse the vault, message us about the piece you&apos;re interested in, and we&apos;ll
            personally guide you through availability, pricing, and delivery. No impersonal checkout, no
            automated replies — just real conversations with fellow collectors who understand the hobby.
          </p>

          <h2>Join the Vault</h2>
          <p>
            New arrivals, exclusive drops, limited releases, and restocks are always announced first
            through our WhatsApp community and Instagram.
          </p>
          <p>
            If you want the best chance of securing your next grail before it&apos;s gone, that&apos;s
            where you&apos;ll want to be.
          </p>

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
