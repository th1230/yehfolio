import { PROJECTS } from '@/data/projects';

import type { Project } from '@/data/types';

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(project => project.slug === slug);
}

/** The project after this one, wrapping around to the first. */
export function getNextProject(slug: string): Project {
  const index = PROJECTS.findIndex(project => project.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.slice(0, 3);
}

export const screenImage = (name: string) => `/images/screens/${name}.webp`;
export const screenImageLarge = (name: string) => `/images/screens/${name}-large.webp`;

export const coverImage = (project: Project) => `/images/covers/${project.slug}.webp`;

export function categoryLabel(project: Project) {
  return project.category === 'personal' ? 'PERSONAL PROJECT' : 'COMMERCIAL PROJECT';
}
