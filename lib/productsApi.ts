import { supabase } from './supabase';
import { Product } from './products';

interface ProductRow {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  emoji: string;
  images: string[] | null;
  badge: string | null;
  badge_class: string | null;
  status: string;
  status_class: string;
  description: string;
}

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    collection: row.collection,
    price: Number(row.price),
    emoji: row.emoji,
    images: row.images ?? undefined,
    badge: row.badge ?? undefined,
    badgeClass: row.badge_class ?? undefined,
    status: row.status,
    statusClass: row.status_class,
    description: row.description,
  };
}

function productToRow(product: Product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    collection: product.collection,
    price: product.price,
    emoji: product.emoji,
    images: product.images ?? null,
    badge: product.badge ?? null,
    badge_class: product.badgeClass ?? null,
    status: product.status,
    status_class: product.statusClass,
    description: product.description,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Failed to load products:', error.message);
    return [];
  }
  return (data as ProductRow[]).map(rowToProduct);
}

export async function addProduct(product: Product): Promise<{ error: string | null }> {
  const { error } = await supabase.from('products').insert(productToRow(product));
  return { error: error?.message ?? null };
}

export async function removeProduct(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  return { error: error?.message ?? null };
}
