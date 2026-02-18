import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DemoHub } from "./demo-hub";

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ profession?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/demo/login");
  }

  const { profession } = await searchParams;

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const isAdmin = adminEmails.includes(user.email?.toLowerCase() ?? "");

  return <DemoHub userEmail={user.email ?? ""} profession={profession} isAdmin={isAdmin} />;
}
