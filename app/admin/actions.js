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

export async function gantiPassword(prevState, formData) {
  let data = formData;
  if (!data && prevState instanceof FormData) {
    data = prevState;
  }

  const passwordBaru = data?.get("password_baru");
  const konfirmasiPassword = data?.get("konfirmasi_password");

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi password wajib diisi." };
  }

  if (String(passwordBaru).length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak sama dengan password baru." };
  }

  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi Anda telah berakhir. Silakan login kembali." };
  }

  const { error } = await supabase.auth.updateUser({
    password: String(passwordBaru),
  });

  if (error) {
    return { error: error.message || "Gagal mengganti password." };
  }

  return { success: "Password berhasil diperbarui." };
}

export { logout as keluar, gantiPassword as updatePassword };
