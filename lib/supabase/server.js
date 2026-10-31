import { createClient } from "@supabase/supabase-js";
import { createServerClient as createClientSSR } from "@supabase/ssr";
import { cookies } from "next/headers";

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

export async function createSessionClient() {
  const cookieStore = await cookies();
  let supabaseUrl = process.env.SUPABASE_URL;
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY harus diatur di environment variable."
    );
  }

  supabaseUrl = supabaseUrl.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return createClientSSR(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Method `setAll` dipanggil dari Server Component.
          // Dapat diabaikan jika middleware/proxy menyegarkan sesi pengguna.
        }
      },
    },
  });
}
