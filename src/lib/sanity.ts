import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "el8ex8qy",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// Image URL builder for applying crop/hotspot
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper to fetch all blog posts
export async function getBlogPosts() {
  return sanityClient.fetch(`
    *[_type == "blogPost"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      author,
      description,
      "thumbnailUrl": thumbnail.asset->url,
      body
    }
  `);
}

// Helper to fetch a single blog post by slug
export async function getBlogPost(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      date,
      author,
      description,
      "thumbnailUrl": thumbnail.asset->url,
      body
    }
  `,
    { slug }
  );
}

// Helper to get all slugs for static generation
export async function getBlogPostSlugs() {
  return sanityClient.fetch(`
    *[_type == "blogPost"] {
      "slug": slug.current
    }
  `);
}

// Helper to fetch blog settings (sidebar content)
export async function getBlogSettings() {
  return sanityClient.fetch(`
    *[_type == "blogSettings"][0] {
      sidebarImage,
      sidebarText
    }
  `);
}
