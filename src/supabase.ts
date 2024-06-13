import { createClient, SupabaseClient } from '@supabase/supabase-js';

export let supabase: SupabaseClient = null as any;

export function setSupabase(supabaseUrl, supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    return supabase;
}