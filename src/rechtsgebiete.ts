import type { CollectionEntry } from 'astro:content';

// Kategorie ohne eigenes Rechtsgebiet: kein Eintrag unter "Themen", keine Themenseite
const KEIN_RECHTSGEBIET = 'In eigener Sache';

export interface Rechtsgebiet {
	name: string;
	slug: string;
	posts: CollectionEntry<'blog'>[];
}

/** URL-Teil aus dem Namen: "Zivilprozessrecht" → "zivilprozessrecht", Umlaute ausgeschrieben */
export function themaSlug(name: string): string {
	return name
		.toLowerCase()
		.replace(/ä/g, 'ae')
		.replace(/ö/g, 'oe')
		.replace(/ü/g, 'ue')
		.replace(/ß/g, 'ss')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export const themaUrl = (name: string) => `/blog/thema/${themaSlug(name)}/`;

/** Ob eine Kategorie ein Rechtsgebiet mit eigener Themenseite ist */
export const istRechtsgebiet = (name: string) => name !== KEIN_RECHTSGEBIET;

/** Rechtsgebiete aus den Post-Kategorien — meistbeschriebene zuerst, Beiträge jeweils neueste zuerst */
export function getRechtsgebiete(posts: CollectionEntry<'blog'>[]): Rechtsgebiet[] {
	const neuesteZuerst = [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	const nachGebiet = new Map<string, CollectionEntry<'blog'>[]>();
	for (const post of neuesteZuerst) {
		const name = post.data.category;
		if (!name || !istRechtsgebiet(name)) continue;
		nachGebiet.set(name, [...(nachGebiet.get(name) ?? []), post]);
	}
	return [...nachGebiet]
		.map(([name, posts]) => ({ name, slug: themaSlug(name), posts }))
		.sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name, 'de'));
}
