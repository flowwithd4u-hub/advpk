/**
 * Blog posts. Generated once via the Lovable AI gateway with topics relevant
 * to the chambers of Advocate Prabhat Kaushik (Faridabad / Supreme Court of India).
 * Edit titles/content here as the practice evolves.
 */
import postsJson from "./posts.generated.json";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readMinutes: number;
};

export const POSTS: BlogPost[] = postsJson as BlogPost[];

export const CATEGORIES = Array.from(
  new Set(POSTS.map((p) => p.category))
).sort();

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
