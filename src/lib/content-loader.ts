import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { chapters } from "@/content/data/story-chapters";
export { chapters } from "@/content/data/story-chapters";
export function getChapter(slug: string) {
  const info = chapters.find((c) => c.slug === slug);
  if (!info) return null;
  const content = fs.readFileSync(
    path.join(process.cwd(), "src/content/story", slug + ".md"),
    "utf8",
  );
  return {
    ...info,
    content,
    minutes: Math.ceil(content.split(/\s+/).length / 200),
  };
}
export async function markdown(content: string) {
  return (await remark().use(html).process(content)).toString();
}
export function getPosts() {
  const dir = path.join(process.cwd(), "src/content/posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .flatMap((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(dir, file), "utf8"),
      );
      if (
        data.draft !== false ||
        typeof data.title !== "string" ||
        typeof data.date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(data.date)
      )
        return [];
      return [
        {
          slug: file.replace(/\.md$/, ""),
          title: data.title as string,
          date: data.date as string,
          updated:
            typeof data.updated === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(data.updated)
              ? data.updated
              : undefined,
          excerpt: String(data.excerpt || ""),
          content,
        },
      ];
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
