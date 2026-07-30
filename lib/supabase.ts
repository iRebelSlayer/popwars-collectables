import { createClient } from '@supabase/supabase-js';

// The anon key is safe to expose in client code by design — it can only do what
// the database's Row Level Security policies allow (public read, authenticated-only write).
const SUPABASE_URL = 'https://gvxgeuwzohmyzmmqsked.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eGdldXd6b2hteXptbXFza2VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0MjY0MjQsImV4cCI6MjEwMTAwMjQyNH0.VLE11NFl9u5Op6fiujEfKRDe95KfH8UkEO12E0U4h6A';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
