import { supabase } from './supabase';
import { Review } from './reviews';

interface ReviewRow {
  id: string;
  image: string;
  caption: string | null;
}

function rowToReview(row: ReviewRow): Review {
  return {
    id: row.id,
    image: row.image,
    caption: row.caption ?? undefined,
  };
}

export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Failed to load reviews:', error.message);
    return [];
  }
  return (data as ReviewRow[]).map(rowToReview);
}

export async function addReview(review: Review): Promise<{ error: string | null }> {
  const { error } = await supabase.from('reviews').insert({
    id: review.id,
    image: review.image,
    caption: review.caption ?? null,
  });
  return { error: error?.message ?? null };
}

export async function removeReview(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  return { error: error?.message ?? null };
}
