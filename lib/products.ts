export interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  emoji: string;
  image?: string;
  badge?: string;
  badgeClass?: string;
  status: string;
  statusClass: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 'naruto-sage-mode-funko',
    name: 'Naruto Uzumaki (Sage Mode) Funko Pop',
    category: 'Funko Pops',
    collection: 'Naruto',
    price: 1899,
    emoji: '🍥',
    badge: 'Exclusive',
    badgeClass: 'gold',
    status: '⚡ In stock',
    statusClass: 'in-stock',
    description: 'A premium collector pop capturing the Sage Mode glow with a matte-finish base.'
  },
  {
    id: 'luffy-gear5-funko',
    name: 'Monkey D. Luffy (Gear 5) Funko Pop',
    category: 'Funko Pops',
    collection: 'One Piece',
    price: 1999,
    emoji: '👒',
    badge: 'New',
    badgeClass: 'ash',
    status: '⚡ In stock',
    statusClass: 'in-stock',
    description: 'Fresh drop featuring the iconic Gear 5 white hair and oversized grin sculpt.'
  },
  {
    id: 'tanjiro-water-funko',
    name: 'Tanjiro Kamado (Water Breathing) Funko Pop',
    category: 'Funko Pops',
    collection: 'Demon Slayer',
    price: 1799,
    emoji: '💧',
    badge: 'Limited',
    badgeClass: 'gold',
    status: '🔥 Few left in the Vault',
    statusClass: 'limited',
    description: 'A dynamic Water Breathing pose finished with a translucent effect base.'
  },
  {
    id: 'gojo-infinity-funko',
    name: 'Gojo Satoru (Infinity) Funko Pop',
    category: 'Funko Pops',
    collection: 'Jujutsu Kaisen',
    price: 2099,
    emoji: '👁️',
    badge: 'Exclusive',
    badgeClass: 'gold',
    status: '⚡ Claimed by another Traveler',
    statusClass: 'claimed',
    description: 'Blindfold-off variant with a striking six-eyes paint application.'
  },
  {
    id: 'goku-ultra-instinct-funko',
    name: 'Goku (Ultra Instinct) Funko Pop',
    category: 'Funko Pops',
    collection: 'Dragon Ball Z',
    price: 2199,
    emoji: '⚡',
    badge: 'Pre-order',
    badgeClass: 'ember',
    status: '🛍 Pre-order',
    statusClass: 'preorder',
    description: 'Silver-haired Ultra Instinct sculpt with a metallic-flake finish.'
  },
  {
    id: 'levi-figure',
    name: 'Levi Ackerman Figure',
    category: 'Anime Figures',
    collection: 'Attack on Titan',
    price: 4500,
    emoji: '⚔️',
    badge: 'New',
    badgeClass: 'ash',
    status: '⚡ In stock',
    statusClass: 'in-stock',
    description: 'A premium articulated figure with ODM gear detailing and a display base.'
  },
  {
    id: 'nezuko-figure',
    name: 'Nezuko Kamado Figure',
    category: 'Anime Figures',
    collection: 'Demon Slayer',
    price: 4200,
    emoji: '🌸',
    badge: 'Exclusive',
    badgeClass: 'gold',
    status: '🏛 Sealed in the Vault',
    statusClass: 'sealed',
    description: 'Hand-painted figure with a bamboo-muzzle accessory and diorama-style base.'
  },
  {
    id: 'all-might-figure',
    name: 'All Might Figure',
    category: 'Anime Figures',
    collection: 'My Hero Academia',
    price: 3800,
    emoji: '💪',
    badge: 'New',
    badgeClass: 'ash',
    status: '⚡ In stock',
    statusClass: 'in-stock',
    description: 'Museum-grade Symbol of Peace figure with dynamic cape sculpting.'
  },
  {
    id: 'itachi-3d-print',
    name: 'Itachi Uchiha 3D Print Bust',
    category: '3D Prints',
    collection: 'Naruto',
    price: 1500,
    emoji: '🌀',
    badge: 'New',
    badgeClass: 'ash',
    status: '⚡ In stock',
    statusClass: 'in-stock',
    description: 'High-resolution resin print with hand-finished paintwork and Sharingan detail.'
  },
  {
    id: 'thousand-sunny-3d-print',
    name: 'Thousand Sunny 3D Print Model',
    category: '3D Prints',
    collection: 'One Piece',
    price: 2200,
    emoji: '⛵',
    badge: 'Limited',
    badgeClass: 'gold',
    status: '🔥 Few left in the Vault',
    statusClass: 'limited',
    description: 'A detailed desk-scale print of the Straw Hats’ ship with a weathered paint job.'
  },
  {
    id: 'nichirin-sword-3d-print',
    name: 'Nichirin Sword 3D Print Replica',
    category: '3D Prints',
    collection: 'Demon Slayer',
    price: 1200,
    emoji: '🗡️',
    badge: 'Pre-order',
    badgeClass: 'ember',
    status: '🛍 Pre-order',
    statusClass: 'preorder',
    description: 'A display-scale replica print with a colour-shift blade finish.'
  }
];
