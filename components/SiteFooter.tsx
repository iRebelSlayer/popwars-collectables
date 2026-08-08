import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div>
        <strong>Popwars Collectables</strong>
        <p>Every Shelf Tells a Story.</p>
      </div>
      <div>
        <a href="https://www.instagram.com/popwars_collectables/" target="_blank" rel="noopener">Instagram</a>
        <a href="https://chat.whatsapp.com/J1mwXMH6LH79bguu4PcaaM" target="_blank" rel="noopener">WhatsApp Community</a>
        <a href="mailto:popwarscollectable@gmail.com">Email Support</a>
      </div>
      <div>
        <Link href="/about-us">About Us</Link>
        <Link href="/contact-us">Contact Us</Link>
        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
