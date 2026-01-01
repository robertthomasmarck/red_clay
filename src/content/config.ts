import { defineCollection, z } from 'astro:content';

const testimonialSchema = z.object({
  name: z.string(),
  company: z.string().optional(),
  title: z.string().optional(),
  quote: z.string(),
  portrait: z.string().optional(),
  order: z.number().optional(),
});

const commonSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date().optional(),
  thumbnail: z.string().optional(),
  templateKey: z.string().optional(),
  // Add other fields as discovered
  image: z.string().optional(),
  featuredimage: z.string().optional(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  number: z.number().optional(),
  pagetype: z.array(z.string()).optional(),
  logo: z.string().optional(),
  backgroundPosition: z.string().optional(),
}).partial();

const portfolio = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const sold = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const pages = defineCollection({
  type: 'content',
  schema: commonSchema,
});

const testimonials = defineCollection({
  type: 'content',
  schema: testimonialSchema,
});

export const collections = {
  portfolio,
  sold,
  pages,
  testimonials,
};
