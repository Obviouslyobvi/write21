// Supabase Configuration
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// Initialize Supabase client
// The supabase-js library is loaded via CDN in the HTML files
let supabase;

function initSupabase() {
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    console.error('Supabase JS library not loaded. Make sure the CDN script is included.');
  }
  return supabase;
}
