import { createClient } from "@supabase/supabase-js";

export function createServerClient(options = {}) {
  let supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY harus diatur di environment variable."
    );
  }

  // Normalisasi URL jika pengguna menyalin URL REST atau menambahkan trailing slash
  supabaseUrl = supabaseUrl.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    ...options,
  });
}

