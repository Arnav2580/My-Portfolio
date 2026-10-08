import type { MetadataRoute } from "next";
import { chapters, getPosts } from "@/lib/content-loader";
import { projects } from "@/content/data/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/about/story",
    "/projects",
    "/experience",
    "/honors",
    "/blog",
    "/contact",
    ...chapters.map((c) => "/about/story/" + c.slug),
    ...projects.map((p) => "/projects/" + p.slug),
    ...getPosts().map((p) => "/blog/" + p.slug),
  ].map((route) => ({ url: "https://arnavgoyal.com" + route }));
}
