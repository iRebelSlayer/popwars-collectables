import { supabase } from './supabase';

export async function getPageContent(slug: string): Promise<string | null> {
  const { data, error } = await supabase.from('pages').select('content').eq('slug', slug).maybeSingle();
  if (error || !data) return null;
  return data.content;
}

export async function getAllPageContent(slugs: string[]): Promise<Record<string, string | null>> {
  const { data, error } = await supabase.from('pages').select('slug, content').in('slug', slugs);
  const result: Record<string, string | null> = {};
  slugs.forEach((slug) => { result[slug] = null; });
  if (error || !data) return result;
  data.forEach((row: { slug: string; content: string }) => { result[row.slug] = row.content; });
  return result;
}

export async function savePageContent(slug: string, content: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('pages').upsert({ slug, content, updated_at: new Date().toISOString() });
  return { error: error?.message ?? null };
}
