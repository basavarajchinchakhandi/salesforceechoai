
import React from 'react';

export interface NavItem {
  name: string;
  path: string;
}

export interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  fullDescription: string;
  process: string[];
  timeline: string;
  pricing: string;
  benefits: string[];
}

export interface Testimonial {
  name: string;
  title: string;
  company: string;
  content: string;
  photo: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  photo: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: 'Strategy' | 'Technical' | 'AI & Innovation' | 'Platform Governance';
  tags: string[];
  isFeatured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Pricing' | 'Support';
}
