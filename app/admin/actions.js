"use server";

import { createSessionClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  let data = formData;
  if (!data && prevState instanceof FormData) {
    data = prevState;
  }

  const email = data?.get("email");
  const password = data?.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (error) {
    if (error.message?.toLowerCase().includes("invalid login credentials")) {
      return { error: "Email atau password salah. Silakan coba lagi." };
    }
    return {
      error:
        error.message ||
        "Gagal masuk. Silakan periksa kembali email dan password Anda.",
    };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export { logout as keluar };

