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
