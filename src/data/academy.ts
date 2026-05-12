export interface AcademyArticle {
  id: string;
  title: string;
  tag: string;
  desc: string;
  img: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ArticleSection {
  h: string;
  b: string;
}

export interface ArticleContent {
  heroImg: string;
  author: string;
  date: string;
  readTime: string;
  sections: ArticleSection[];
}

const articleImages: Record<string, string> = {
  lavender: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
  formulation: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=500&fit=crop',
  lab: 'https://images.unsplash.com/photo-1581092795360-fd01ca4f0952?w=800&h=500&fit=crop',
};

export const academyArticles: AcademyArticle[] = [
  { id: 'a1', title: 'How to Choose a Trusted Essential Oil Supplier', tag: 'supplier', desc: 'What to ask about samples, COA, GC/MS reports, MOQ, and aftersales support.', img: articleImages.lavender, difficulty: 'beginner' },
  { id: 'a2', title: 'Essential Oils 101: Purity, Quality & Safety', tag: 'quality', desc: 'A beginner-friendly guide to grades, dilution, storage, and quality checks.', img: articleImages.formulation, difficulty: 'beginner' },
  { id: 'a3', title: 'From Lab to Product: Our Quality Process', tag: 'quality', desc: 'How sourcing, testing, packaging, and documentation work together.', img: articleImages.lab, difficulty: 'intermediate' },
  { id: 'a4', title: 'Understanding Terpene Profiles', tag: 'terpene', desc: 'Why terpene ratios matter for fragrance, therapeutic efficacy, and batch consistency.', img: articleImages.lab, difficulty: 'advanced' },
  { id: 'a5', title: 'Carrier Oil Chemistry for Formulators', tag: 'carrier', desc: 'Fatty acid profiles, oxidative stability, and how to select the right carrier base.', img: articleImages.formulation, difficulty: 'beginner' },
  { id: 'a6', title: 'Citrus Oil Phototoxicity & Safety', tag: 'citrus', desc: 'Bergaptene content, furocoumarins, and safe usage levels for lemon, bergamot, and lime.', img: articleImages.lavender, difficulty: 'intermediate' },
  { id: 'a7', title: 'GC/MS Analysis Explained for Buyers', tag: 'gcms', desc: 'How to read a gas chromatography report and what the numbers mean for your formulation.', img: articleImages.lab, difficulty: 'beginner' },
  { id: 'a8', title: 'Eucalyptus 1,8-Cineole: Therapeutic Thresholds', tag: 'cineole', desc: 'Why high-cineole eucalyptus oils command premium pricing in respiratory product manufacturing.', img: articleImages.lab, difficulty: 'intermediate' },
];

const sections_a1: ArticleSection[] = [
  { h: 'The Cost of Choosing Wrong', b: 'Every procurement decision in the essential oils supply chain carries downstream risk. A single batch of adulterated lavender oil can compromise an entire skincare line. A mislabeled eucalyptus batch can trigger regulatory scrutiny that stalls production for weeks. For formulation chemists, procurement officers, and brand founders, supplier selection is not a purchasing decision—it is a quality-control gate.' },
  { h: '1. GC/MS — Your First Filter', b: 'Gas Chromatography/Mass Spectrometry (GC/MS) is the gold standard for essential oil analysis. A genuine report includes a chromatogram showing retention times and peak areas, a mass spectrum library match for each compound, and batch-specific data. At TS Aromatics, each batch is tested at an ISO 17025-accredited lab and assigned a unique batch ID that ties directly to the GC/MS file, the COA, and the Safety Data Sheet.' },
  { h: '2. Traceability Beyond the Certificate', b: 'A COA is only as reliable as the chain of custody behind it. Suppliers who source from third-party aggregators often cannot identify the farm, region, or distillation date. Manufacturers should demand botanical name verification, country of origin documentation, batch-level traceability, and clear protocols for organic and ethically wildcrafted claims.' },
  { h: '3. MOQ Strategy for Growing Brands', b: 'Minimum order quantities reveal a supplier\'s operational philosophy. A supplier oriented toward partnership offers a graduated path: sample (100–500 g) for formulation testing, small bulk (1–5 kg) for pilot production, and full bulk (25–200 kg) for commercial scaling.' },
  { h: '4. Documentation Readiness', b: 'Modern procurement teams require more than a COA and MSDS. Allergen declarations per EU CosIng, IFRA 51st Amendment compliance, organic certification, heavy metal analysis, and vegan/cruelty-free declarations are increasingly non-negotiable.' },
  { h: '5. Aftersales as a Service', b: 'The best suppliers do not disappear after payment. Aftersales support should include sample matching, formulation guidance from in-house chemists, and regulatory updates when IFRA, EU, or FDA guidelines shift.' },
  { h: 'Building the Partnership', b: 'Schedule annual supplier reviews, rotate GC/MS testing to a third-party lab for spot-checking, and maintain a supplier scorecard tracking on-time delivery, documentation accuracy, and batch consistency.' },
];

const sections_a2: ArticleSection[] = [
  { h: 'What Makes an Oil "Pure"?', b: 'Purity is not a marketing claim—it is a measurable property. For Lavandula angustifolia, purity is the linalyl acetate to linalool ratio. For Melaleuca alternifolia, it is Terpinen-4-ol meeting ISO 4730. For Citrus limon, it is the absence of phototoxic furocoumarins above safe thresholds.' },
  { h: 'Essential Oil Grades: What the Labels Mean', b: 'Therapeutic grade is not a regulated term. Fragrance grade oils are often extended with solvents. Organic certification verifies pesticide-free growing but not chemical profile. The safest approach is to specify botanical name and chemical marker ranges, verified against GC/MS data.' },
  { h: 'Adulteration: The Hidden Risk', b: 'Common methods include extension with synthetic isolates, cross-contamination with cheaper species, carrier oil dilution, and synthetic terpene re-blending. Detection requires high-resolution GC/MS with chiral column analysis and IRMS for botanical origin verification.' },
  { h: 'Dilution Math for Formulators', b: 'General guideline: 0.5–2% for leave-on skincare, 2–4% for rinse-off, 3–5% for therapeutic massage, up to 10% for acute topical applications under professional guidance. Always use weight-based measurements.' },
  { h: 'Storage Protocols', b: 'Essential oils degrade above 25°C, with oxidation rates doubling per 10°C increase. Store in amber glass, 18–22°C, with argon blanketing for bulk. Shelf life: citrus 1–2 years, floral 2–3 years, wood 4–6 years.' },
];

const sections_a3: ArticleSection[] = [
  { h: 'From Harvest to Hydrodiffusion', b: 'Once harvested, enzymatic degradation begins immediately. For lavender, linalyl acetate declines within 4 hours if not processed. At TS Aromatics, distillers operate on-site or within a 2-hour transport window. The result is raw oil with full chemical potential intact.' },
  { h: 'GC/MS: The Analytical Gate', b: 'Every inbound batch is tested at an ISO 17025-accredited lab. The GC separates compounds by boiling point; the MS identifies each by fragmentation pattern. Key markers are quantified against certified reference standards.' },
  { h: 'The COA and Batch Traceability System', b: 'Each batch receives a unique alphanumeric ID tracking through sourcing region, distillation, lab analysis, packaging, and dispatch. The COA includes chemical profile, physicochemical properties, purity score, and pass/fail determination.' },
  { h: 'Packaging That Preserves', b: 'Aluminum-lined drums with airtight seals, amber glass with poly-seal caps, nitrogen flushing of headspace, and oxygen barrier bags for temperature-sensitive oils. Each container labeled with batch ID, botanical name, and production date.' },
  { h: 'Continuous Improvement', b: 'Customer feedback and retesting data feed back into supplier qualification. If a marker shows >5% RSD batch-to-batch, the sourcing protocol is reviewed. Quality is a closed-loop system that improves with every batch.' },
];

const sections_a4: ArticleSection[] = [
  { h: 'What Are Terpenes?', b: 'Terpenes are aromatic hydrocarbons produced by plants as secondary metabolites. In essential oils, they determine fragrance, therapeutic activity, and synergy between constituents. Over 30,000 terpenes have been identified, with 100+ commonly found in commercial essential oils.' },
  { h: 'Monoterpenes vs Sesquiterpenes', b: 'Monoterpenes (C10H16) are volatile, evaporate quickly, and dominate citrus and conifer oils. Sesquiterpenes (C15H24) are heavier with higher boiling points, contributing depth and longevity. Examples: limonene (monoterpene) vs caryophyllene (sesquiterpene).' },
  { h: 'Why Ratios Matter', b: 'ISO and pharmacopoeia standards define acceptable ranges for key markers. A lavender oil with linalool <25% and linalyl acetate >45% may fail ISO 3515. These ratios directly impact therapeutic efficacy and batch consistency.' },
];

const sections_a5: ArticleSection[] = [
  { h: 'Fatty Acid Chemistry', b: 'Carrier oils are composed primarily of triglycerides. Saturated fatty acids (lauric, palmitic) provide stability and shelf life. Unsaturated acids (oleic, linoleic, linolenic) offer skin-nourishing properties but oxidize faster.' },
  { h: 'Selecting the Right Carrier', b: 'Jojoba (wax ester, closest to human sebum), fractionated coconut (light, long shelf life), sweet almond (classic massage base), and grapeseed (non-greasy, fast-absorbing) are the most versatile bases for formulation work.' },
  { h: 'Oxidative Stability', b: 'Oils high in polyunsaturated fatty acids (grapeseed, rosehip) require antioxidant protection (tocopherols) and refrigeration. Monounsaturated-rich oils (olive, avocado, almond) have moderate stability. Saturated oils (coconut, babassu) are highly stable.' },
];

const sections_a6: ArticleSection[] = [
  { h: 'Understanding Phototoxicity', b: 'Phototoxicity occurs when furocoumarins in citrus oils react with UV light, causing burns or hyperpigmentation. Bergamot oil contains the highest bergaptene levels, followed by lime, lemon, and grapefruit.' },
  { h: 'Safe Usage Levels', b: 'IFRA restricts bergaptene to 0.0015% in leave-on products exposed to sunlight. For cold-pressed citrus oils, use at ≤0.5% of the total formulation for leave-on, ≤2% for rinse-off. Furocoumarin-free (FCF) bergamot is available for phototoxic-free formulations.' },
];

const sections_a7: ArticleSection[] = [
  { h: 'How GC/MS Works', b: 'A gas chromatograph separates the oil into individual compounds. The mass spectrometer ionizes each compound and measures its mass-to-charge ratio, creating a unique fragmentation pattern. The NIST library matches these patterns to identify each compound.' },
  { h: 'Reading the Report', b: 'Key sections: retention time (when each compound elutes), peak area percentage (relative concentration), and match quality (how well the spectrum matches the library). Primary markers should show >95% match quality. Total identified compounds should exceed 95% of the total peak area.' },
  { h: 'Red Flags', b: 'Missing batch reference, only top 3-5 compounds listed, no chromatogram image, data over 12 months old, or the presence of unexpected compounds (plasticizers, synthetic antioxidants). These indicate incomplete or potentially fabricated data.' },
];

const sections_a8: ArticleSection[] = [
  { h: 'What Is 1,8-Cineole?', b: '1,8-Cineole (eucalyptol) is the primary active compound in Eucalyptus globulus and Eucalyptus radiata. It gives eucalyptus its characteristic fresh, penetrating aroma and is responsible for most of its therapeutic actions—expectorant, anti-inflammatory, and antimicrobial.' },
  { h: 'Therapeutic Thresholds', b: 'Therapeutic eucalyptus oil requires ≥70% 1,8-Cineole (ISO 7708). At this level, the oil effectively loosens phlegm, reduces bronchial inflammation, and provides measurable relief in respiratory conditions when used in steam inhalation or chest rubs.' },
  { h: 'Market Implications', b: 'High-cineole eucalyptus (>80%) commands a 30–50% premium over standard grades and is preferred by pharmaceutical and FMCG brands for clinical-grade respiratory products.' },
];

const content: Record<string, ArticleContent> = {
  a1: { heroImg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop', author: 'TS Aromatics Quality Team', date: 'May 2026', readTime: '9 min read', sections: sections_a1 },
  a2: { heroImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=600&fit=crop', author: 'TS Aromatics Quality Team', date: 'May 2026', readTime: '10 min read', sections: sections_a2 },
  a3: { heroImg: 'https://images.unsplash.com/photo-1581092795360-fd01ca4f0952?w=1200&h=600&fit=crop', author: 'TS Aromatics Operations Team', date: 'May 2026', readTime: '8 min read', sections: sections_a3 },
  a4: { heroImg: 'https://images.unsplash.com/photo-1581092795360-fd01ca4f0952?w=1200&h=600&fit=crop', author: 'TS Aromatics Scientific Team', date: 'May 2026', readTime: '6 min read', sections: sections_a4 },
  a5: { heroImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=600&fit=crop', author: 'TS Aromatics Formulation Team', date: 'May 2026', readTime: '7 min read', sections: sections_a5 },
  a6: { heroImg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop', author: 'TS Aromatics Safety Team', date: 'May 2026', readTime: '5 min read', sections: sections_a6 },
  a7: { heroImg: 'https://images.unsplash.com/photo-1581092795360-fd01ca4f0952?w=1200&h=600&fit=crop', author: 'TS Aromatics Lab Team', date: 'May 2026', readTime: '7 min read', sections: sections_a7 },
  a8: { heroImg: 'https://images.unsplash.com/photo-1581092795360-fd01ca4f0952?w=1200&h=600&fit=crop', author: 'TS Aromatics Scientific Team', date: 'May 2026', readTime: '5 min read', sections: sections_a8 },
};

export function getAllArticles(): AcademyArticle[] {
  return academyArticles;
}

export function getArticleById(id: string): AcademyArticle | undefined {
  return academyArticles.find((a) => a.id === id);
}

export function getArticleContent(id: string): ArticleContent | undefined {
  return content[id];
}
