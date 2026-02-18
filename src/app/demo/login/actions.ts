"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PROFESSIONS } from "@/lib/professions";

const VALID_PROFESSION_SLUGS = PROFESSIONS.map((p) => p.slug);

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  const profession = formData.get("profession") as string | null;
  const redirectUrl =
    profession && VALID_PROFESSION_SLUGS.includes(profession)
      ? `/demo?profession=${profession}`
      : "/demo";

  revalidatePath("/demo", "layout");
  redirect(redirectUrl);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/demo", "layout");
  redirect("/demo/login");
}
