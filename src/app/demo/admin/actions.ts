"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const VALID_STATUSES = ["new", "contacted", "qualified", "converted", "archived"];

export async function updateSubmissionStatus(id: string, status: string) {
  if (!VALID_STATUSES.includes(status)) {
    return { error: "Invalid status" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!user || !adminEmails.includes(user.email?.toLowerCase() ?? "")) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/demo/admin");
  return { success: true };
}
