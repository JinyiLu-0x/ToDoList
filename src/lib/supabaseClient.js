import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dasdxugvmymyehkgotmm.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_cXMeD2bn0TcEIr0hWXxRRA_UbxlxFfd';

export const supabase = createClient(supabaseUrl, supabaseKey);
