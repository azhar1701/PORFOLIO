

// FIX: Import React to make React types like React.ReactNode available.
import React from 'react';

export interface ExpertiseItem {
  iconName: string;
  title: string;
  tools: string;
}

export type ProjectCategory = 'All' | 'Hydraulic Modeling' | 'GIS & Mapping' | 'Stormwater' | 'Environmental';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  imageUrl: string;
  year: number;
  kpis?: {
    label: string;
    value: string;
  }[];
  description: string;
  technologies?: string[];
  coordinates: [number, number];
  caseStudyUrl?: string;
  chartTitle?: string;
  chartData?: {
    name: string;
    value: number;
    unit?: string;
  }[];
}

export interface Credential {
    name: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  link: string;
  metaDescription: string;
  ogImage: string;
}

export interface PortfolioData {
  projects: Project[];
  expertiseItems: ExpertiseItem[];
  credentials: Credential[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
}