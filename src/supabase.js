import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gvlgcfxspivxjgfcrrft.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bGdjZnhzcGl2eGpnZmNycmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU1Njk2ODQsImV4cCI6MTk3MTE0NTY4NH0.mQ4TYgaR3SYP9GmP5N4_QrO5QZn443mLi2y9w5UfJd4"
);

export { supabase };
