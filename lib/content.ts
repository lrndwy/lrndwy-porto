// Type definitions
export type Contact = {
  email: string;
  phone: string;
  location: string;
  website?: string;
  socials?: { label: string; url: string }[];
};

export type Skill = { name: string; level: number };

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  githubUrl?: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

export type Achievement = { title: string; org: string; year: string };

export type Education = {
  school: string;
  period: string;
  program: string;
};

// Import data from JSON files
import profileData from './data/profile.json';
import contactData from './data/contact.json';
import skillsData from './data/skills.json';
import languagesData from './data/languages.json';
import projectsData from './data/projects.json';
import experiencesData from './data/experiences.json';
import achievementsData from './data/achievements.json';
import educationData from './data/education.json';
import stacksData from './data/stacks.json';

// Export data with proper typing
export const profile = profileData;
export const contact: Contact = contactData;
export const skills: Skill[] = skillsData;
export const languages = languagesData;
export const projects: Project[] = projectsData;
export const experiences: Experience[] = experiencesData;
export const achievements: Achievement[] = achievementsData;
export const education: Education[] = educationData;
export const stacks = stacksData;
