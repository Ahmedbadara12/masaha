export type Bilingual = { ar: string; en: string };
export type Category = 'apartment' | 'office' | 'retail';
export interface Project {
  id: string;
  slug: string;
  title: Bilingual;
  category: Category;
  areaSqm: number;
  services: string[];
  estimatedDurationWeeks: number;
  description: Bilingual;
  cover: string;
  gallery: { src: string; alt: Bilingual }[];
  featured: boolean;
}
export const bi = (ar: string, en: string): Bilingual => ({ ar, en });
