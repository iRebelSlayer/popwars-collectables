export interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  emoji: string;
  images?: string[];
  badge?: string;
  badgeClass?: string;
  status: string;
  statusClass: string;
  description: string;
}

// Sample catalog removed — real products are added via /admin and exported into this file.
export const products: Product[] = [];
