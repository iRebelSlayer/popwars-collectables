export interface Review {
  id: string;
  image: string;
  caption?: string;
}

// No sample reviews — real ones are added via /admin as screenshot links.
export const reviews: Review[] = [];
