import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { readFileSync } from "fs";
import { join } from "path";
import { DemoViewer } from "./demo-viewer";

const VALID_SLUGS = [
  "customer-agents",
  "document-intelligence",
  "workflow-automation",
  "knowledge-systems",
];

export default async function DemoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/demo/login");
  }

  const htmlPath = join(process.cwd(), "content", "demos", `${slug}.html`);
  const html = readFileSync(htmlPath, "utf-8");

  return <DemoViewer html={html} slug={slug} />;
}
