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
  "email-strategist",
  "email-designer",
  "klaviyo-ai-strategist",
  "klaviyo-ai-ops",
  "shopify-ai-strategist",
  "shopify-ai-ops",
];

export default async function DemoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/demo/login");
  }

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  const htmlPath = join(process.cwd(), "content", "demos", `${slug}.html`);
  let html: string;
  try {
    html = readFileSync(htmlPath, "utf-8");
  } catch {
    notFound();
  }

  return <DemoViewer html={html} slug={slug} />;
}
