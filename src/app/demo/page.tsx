import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DemoHub } from "./demo-hub";

export default async function DemoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/demo/login");
  }

  return <DemoHub userEmail={user.email ?? ""} />;
}
