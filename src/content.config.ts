import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			category: z.string().optional(),
			// Nur bei Rechtsprechungsanalysen: Steckbrief der besprochenen Entscheidung.
			// Beiträge mit diesem Feld bilden die Rubrik "Rechtsprechung" (/rechtsprechung/).
			entscheidung: z
				.object({
					gericht: z.string(), // z. B. "BVerfG (2. Kammer des Ersten Senats)"
					art: z.string(), // "Urteil" oder "Beschluss"
					datum: z.coerce.date(),
					aktenzeichen: z.string(), // mehrere mit Komma trennen
					url: z.string().url().optional(), // frei zugänglicher amtlicher Volltext
				})
				.optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };
