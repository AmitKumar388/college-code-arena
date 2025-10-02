import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://xbdjjmjosncfrtvyprto.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZGpqbWpvc25jZnJ0dnlwcnRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDYyMjAsImV4cCI6MjA3MTEyMjIyMH0.QL7WM9E-IaRkSz3y-z0x7jvW-SRDcS8JGWDh8trCwYI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});