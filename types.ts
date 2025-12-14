import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  fullDescription?: string; // New: Detailed description for modal
  features?: string[];      // New: List of benefits/features
  duration?: string;        // New: Duration info
}

export interface Benefit {
  title: string;
  description: string;
  image: string;
}

export interface Trainer {
  name: string;
  role: string;
  bio: string; // Short bio for card
  image: string;
  education: string;
  location: string;
  phone: string;
  email: string;
  motto: string;
  achievements?: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export interface Sponsor {
  name: string;
  logo: string;
  url?: string;
}