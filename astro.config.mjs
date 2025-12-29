// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com', // TODO: Update with actual site URL
    output: 'static',
    adapter: vercel(),
    integrations: [
        react(),
        sitemap(),
        sanity({
            projectId: 'el8ex8qy',
            dataset: 'production',
            useCdn: false, // for real-time updates in Studio
            studioBasePath: '/studio',
        }),
    ],
});
