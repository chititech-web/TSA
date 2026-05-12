export interface Product {
  id: string;
  name: string;
  botanicalName: string;
  category: string;
  description: string;
  origin: string;
  extraction: string;
  aroma: string;
  solubility: string;
  refractiveIndex: string;
  opticalRotation: string;
  purity: string;
  image?: string;
  compounds: { name: string; percentage: string }[];
}

export interface Batch {
  id: string;
  productId: string;
  batchRef: string;
  analysisDate: string;
  purityScore: string;
  compounds: { name: string; percentage: string }[];
  status: 'current' | 'recent' | 'archive';
}

export interface GcmsAnalysis {
  batchId: string;
  oil: string;
  compounds: { compound: string; percentage: string }[];
  analysisDate: string;
}

export interface AcademyArticle {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  sections: { heading: string; body: string }[];
  keyTakeaways: string[];
}

export interface CartItem {
  id: string;
  name: string;
  quantity?: number;
}

export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  items: CartItem[];
  quantity?: string;
  message?: string;
  source: string;
}
