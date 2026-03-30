import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qonsjunanuiitvujhkmv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbnNqdW5hbnVpaXR2dWpoa212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0Mzc5MzcsImV4cCI6MjA5MDAxMzkzN30.S9WGR70uAzgQ81qxJiltLjrULo-m3mTeWCWPRBHeTlU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
