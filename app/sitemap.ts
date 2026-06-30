import { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/data/products";
import { BLOG_POSTS } from "@/lib/data/misc";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hswatches.example.com";
  const staticPages = ["", "/shop", "/about", "/contact", "/blog", "/wishlist", "/compare"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  const productPages = PRODUCTS.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(p.createdAt),
  }));
  const blogPages = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...staticPages, ...productPages, ...blogPages];
}
