import { Review, reviews } from './reviews';

const CUSTOM_REVIEWS_KEY = 'popwars-custom-reviews';

export function getCustomReviews(): Review[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_REVIEWS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCustomReviews(customReviews: Review[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CUSTOM_REVIEWS_KEY, JSON.stringify(customReviews));
}

export function getAllReviews(): Review[] {
  return [...reviews, ...getCustomReviews()];
}
