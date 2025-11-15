// Central export file for all data
// Import everything you need from this single file

export * from './personal';
export * from './projects';
export * from './experience';
export * from './content';

// Quick access to commonly used data
export { personalInfo, techStack } from './personal';
export { projects, getFeaturedProjects } from './projects';
export { experiences, education, getCurrentExperiences } from './experience';
export { heroContent, sectionContent } from './content';
