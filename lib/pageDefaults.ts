export const PAGE_SLUGS = ["about-us", "contact-us", "terms-and-conditions", "privacy-policy"] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];

export const PAGE_LABELS: Record<PageSlug, string> = {
  "about-us": "About Us",
  "contact-us": "Contact Us",
  "terms-and-conditions": "Terms & Conditions",
  "privacy-policy": "Privacy Policy",
};

export const PAGE_DEFAULTS: Record<PageSlug, string> = {
  "about-us": `Popwars Collectables was built for one kind of person: the collector who remembers exactly where they were when they found the piece that completed their shelf.

We deal in Funko Pops, action figures, and premium 3D-printed collectables — the kind of pieces that turn a room into a story worth telling.

Our vault is home to collectables from the worlds fans love most. Whether you're hunting characters from **Marvel, DC, Star Wars, Naruto, One Piece, Dragon Ball Z, Demon Slayer, Jujutsu Kaisen, Attack on Titan, My Hero Academia**, or many more universes, we focus on bringing together figures that collectors genuinely want to own. From everyday favourites to exclusives and limited releases, every item is carefully selected with collectors in mind.

## What We Care About

Presentation and trust.

Every order is packed the way we'd want to receive one ourselves — protected, carefully secured, and worthy of what's inside. We'd rather take a little extra time to ensure your collectable arrives safely than rush a shipment and risk your collection.

## How We Sell

Popwars is built around a WhatsApp-first shopping experience.

Browse the vault, message us about the piece you're interested in, and we'll personally guide you through availability, pricing, and delivery. No impersonal checkout, no automated replies — just real conversations with fellow collectors who understand the hobby.

## Join the Vault

New arrivals, exclusive drops, limited releases, and restocks are always announced first through our WhatsApp community and Instagram.

If you want the best chance of securing your next grail before it's gone, that's where you'll want to be.`,

  "contact-us": `Have a question about a product, need help with an order, or just want to talk about your collection? We'd love to hear from you. Popwars runs primarily over WhatsApp — it's the fastest way to reach a real person on the team.

## WhatsApp

The quickest way to ask about a product, check availability, or place an order.

## Email

For anything that's easier in writing, reach us at popwarscollectable@gmail.com.

## Instagram

Follow @popwars_collectables for new drops, restocks, and behind-the-scenes looks at the vault.`,

  "terms-and-conditions": `By browsing this site or placing an order with Popwars Collectables, you agree to the terms below. We may update these terms from time to time; continuing to use the site after a change means you accept the updated terms.

## Using This Site

You agree to provide accurate information when placing an order and not to use this site for any unlawful purpose, or to attempt to copy, resell, or exploit our content, product photos, or listings without permission.

## Products & Availability

We do our best to keep stock, pricing, and descriptions accurate, but availability can change quickly with collectables — a piece may be claimed by another traveler between browsing and checkout. Actual packaging may vary slightly from the photos shown. If an order can't be fulfilled as listed, we'll let you know before proceeding rather than substitute anything without your agreement.

## Orders & Payment

Most orders are placed and confirmed directly with our team over WhatsApp, where we'll confirm the item, price, and delivery details with you before anything is finalized. We reserve the right to decline or cancel an order at our discretion — for example, if an item turns out to be unavailable or if we suspect fraudulent activity.

## Shipping

Shipping costs, timelines, and coverage areas are confirmed with you directly at the time of order, since these can vary by item and location.

## Intellectual Property

All content on this site — including the Popwars Collectables name, logo, and site design — belongs to Popwars Collectables and may not be reproduced without permission. Product names, characters, and franchises referenced on this site (such as anime and pop-culture properties) belong to their respective owners; we are an independent retailer of licensed and collectable merchandise, not an official partner unless stated otherwise.

## No Warranties

This site and its listings are provided on an "as is" and "as available" basis. While we take care in how we describe and package every item, we don't guarantee the site will be free of errors or interruptions at all times.

## Limitation of Liability

To the extent permitted by law, Popwars Collectables is not liable for indirect or incidental damages arising from your use of this site or the products purchased through it, beyond the value of the order itself.

## Third-Party Links

This site may link to third-party platforms such as Instagram or WhatsApp. We aren't responsible for the content or practices of those external platforms.

## Governing Law

These terms are governed by the laws of India.`,

  "privacy-policy": `This policy explains what information Popwars Collectables collects when you browse the site or place an order, and how that information is used and protected.

## What We Collect

When you place an order with us — typically over WhatsApp or through this site — we collect details like your name, phone number, delivery address, and email address where provided. We may also automatically collect basic technical information (such as browser type and approximate location) when you visit the site, to help us understand how it's being used.

## How We Use It

We use your information to process and deliver your order, communicate with you about that order, and respond to questions you send us. With your permission, we may occasionally send updates about new drops, restocks, or offers. We do not sell your personal information to third parties.

## Consent

By sending us your details to place an order — for example, over WhatsApp — you consent to us using that information to fulfil the order and get it to you. For anything beyond that, such as marketing updates, we'll ask separately or give you a clear way to opt out.

## Withdrawing Consent

You can ask us to stop contacting you or to delete the information we hold about you at any time by emailing popwarscollectable@gmail.com.

## How Your Data Is Stored

This site is built on modern hosting and database infrastructure with industry-standard security practices. Order and payment details shared directly with us (for example, over WhatsApp) are handled by our team directly and are not stored on this website.

## Cookies

Like most websites, Popwars Collectables may use basic cookies or local browser storage to keep the site working smoothly — for example, remembering that you've already seen the entrance animation. These do not track you across other websites.

## Changes to This Policy

We may update this policy from time to time as the site and our processes evolve. Changes take effect as soon as they're posted on this page.`,
};
