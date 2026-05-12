import type { Product } from './products';

interface ProcurementInfo {
  moq: string;
  leadTime: string;
  packaging: string[];
  paymentTerms: string;
  samplesAvailable: boolean;
  shelfLife: string;
  storage: string;
  origin: string;
}

interface CoATestEntry {
  parameter: string;
  spec: string;
  result: string;
  method: string;
}

const CATEGORY_PROC: Record<string, Omit<ProcurementInfo, 'origin'>> = {
  // Essential oil categories
  'Floral': { moq: '5 kg', leadTime: '7–14 business days', packaging: ['1 kg', '5 kg', '25 kg', '180 kg'], paymentTerms: 'T/T, L/C at sight', samplesAvailable: true, shelfLife: '36 months (sealed, unopened)', storage: 'Cool, dark, airtight. Avoid direct sunlight.' },
  'Wellness': { moq: '5 kg', leadTime: '7–14 business days', packaging: ['1 kg', '5 kg', '25 kg', '180 kg'], paymentTerms: 'T/T, L/C at sight', samplesAvailable: true, shelfLife: '36 months (sealed, unopened)', storage: 'Cool, dark, airtight. Avoid direct sunlight.' },
  'Mint': { moq: '25 kg', leadTime: '5–10 business days', packaging: ['5 kg', '25 kg', '180 kg', '200 kg'], paymentTerms: 'T/T, L/C at sight', samplesAvailable: true, shelfLife: '36 months (sealed, unopened)', storage: 'Cool, dry place. Refrigerate after opening.' },
  'Industrial': { moq: '25 kg', leadTime: '5–10 business days', packaging: ['25 kg', '200 kg', '1 MT', 'IBC totes'], paymentTerms: 'T/T advance, Net 30', samplesAvailable: true, shelfLife: '60 months (sealed, unopened)', storage: 'Room temperature, dry, well-ventilated.' },
  'Citrus': { moq: '5 kg', leadTime: '7–14 business days', packaging: ['1 kg', '5 kg', '25 kg', '180 kg'], paymentTerms: 'T/T, L/C at sight', samplesAvailable: true, shelfLife: '24 months (sealed, refrigerated)', storage: 'Refrigerated, airtight. Citrus oils degrade at room temp.' },
  'Spice': { moq: '5 kg', leadTime: '7–14 business days', packaging: ['1 kg', '5 kg', '25 kg', '180 kg'], paymentTerms: 'T/T, L/C at sight', samplesAvailable: true, shelfLife: '36 months (sealed, unopened)', storage: 'Cool, dark, airtight. Avoid direct sunlight.' },
  'Woods': { moq: '5 kg', leadTime: '10–15 business days', packaging: ['1 kg', '5 kg', '25 kg', '180 kg'], paymentTerms: 'T/T, L/C at sight', samplesAvailable: true, shelfLife: '48 months (sealed, unopened)', storage: 'Cool, dark, airtight.' },
  // Carrier oils
  'Carrier Oils': { moq: '25 kg', leadTime: '5–10 business days', packaging: ['25 kg', '50 kg', '200 kg', '1 MT flexi'], paymentTerms: 'T/T, L/C at sight', samplesAvailable: true, shelfLife: '24 months (sealed, unopened)', storage: 'Cool, dry place. Refrigerate after opening.' },
  // Butters
  'Butters': { moq: '25 kg', leadTime: '5–10 business days', packaging: ['25 kg', '50 kg', '200 kg', '1 MT pallet'], paymentTerms: 'T/T, L/C at sight', samplesAvailable: true, shelfLife: '24 months (sealed, unopened)', storage: 'Cool, dry place below 25°C. Avoid direct heat.' },
  // Extracts & Aloe
  'Extracts': { moq: '1 kg', leadTime: '10–15 business days', packaging: ['1 kg', '5 kg', '25 kg'], paymentTerms: 'T/T advance', samplesAvailable: true, shelfLife: '18 months (sealed, unopened)', storage: 'Cool, dark, airtight. Sensitive to light.' },
  'Aloe': { moq: '25 kg', leadTime: '7–10 business days', packaging: ['5 kg', '25 kg', '200 kg', '1 MT'], paymentTerms: 'T/T, L/C at sight', samplesAvailable: true, shelfLife: '24 months (sealed, unopened)', storage: 'Cool, dry place below 30°C. Avoid freezing.' },
};

const ORIGIN_MAP: Record<string, string> = {
  'Lavender Oil': 'France',
  'Tea Tree Oil': 'India',
  'Peppermint Oil BP': 'India',
  'Peppermint Oil IP': 'India',
  'Spearmint Oil': 'India',
  'Eucalyptus Oil': 'India',
  'Rosemary Oil': 'India',
  'Lemongrass Oil': 'India',
  'Clove Oil': 'India',
  'Sandalwood Oil': 'India',
  'Frankincense Oil': 'Egypt',
  'Lemon Oil': 'India',
  'Orange Oil': 'India',
  'Bergamot Oil': 'India',
  'Cedarwood Oil': 'India',
  'Patchouli Oil': 'India',
  'Cinnamon Bark Oil': 'Sri Lanka',
  'Ginger Oil': 'India',
  'Ylang Ylang Oil': 'India',
  'Geranium Oil': 'Egypt',
  'Chamomile Oil': 'Egypt',
  'Basil Oil': 'India',
  'Thyme Oil': 'India',
  'Rose Oil': 'Egypt',
  'Jasmine Oil': 'India',
  'Palmarosa Oil': 'India',
  'Vetiver Oil': 'India',
  'Juniper Berry Oil': 'India',
  'Black Pepper Oil': 'India',
  'Nutmeg Oil': 'India',
  'Cardamom Oil': 'India',
  'Grapefruit Oil': 'India',
  'Lime Oil': 'India',
  'Mandarin Oil': 'India',
  'Oregano Oil': 'India',
  'Wintergreen Oil': 'Egypt',
  'Camphor Oil': 'India',
  'Pine Oil': 'India',
  'Carrot Seed Oil': 'Egypt',
  'Menthol Crystals': 'India',
  'Dementholised Mint Oil': 'India',
  'Mint Terpene': 'India',
  'Camphor Synthetic': 'India',
  'Turpentine Oil': 'India',
  'Thymol (Pure)': 'India',
  'Pine Oil Pumilio': 'India',
  'Citronella Oil': 'India',
  'Extra Virgin Coconut Oil': 'Sri Lanka',
  'Sweet Almond Oil': 'India',
  'Jojoba Oil': 'India',
  'Grapeseed Oil': 'India',
  'Extra Virgin Olive Oil': 'Spain',
  'Argan Oil': 'Morocco',
  'Avocado Oil': 'Kenya',
  'Apricot Kernel Oil': 'India',
  'Castor Oil': 'India',
  'Moringa Oil': 'India',
  'Sesame Oil': 'India',
  'Neem Oil': 'India',
  'Shea Butter': 'Ghana',
  'Mango Butter': 'India',
  'Cocoa Butter': 'Ghana',
  'Avocado Butter': 'Kenya',
  'Murumuru Butter': 'Brazil',
};

export function getProcurementInfo(product: Product): ProcurementInfo {
  const base = CATEGORY_PROC[product.category] || CATEGORY_PROC['essential-oils'];
  const origin = ORIGIN_MAP[product.name] || 'India';
  return { ...base, origin };
}

export function getCoA(product: Product): CoATestEntry[] {
  const entries: CoATestEntry[] = [
    { parameter: 'Appearance', spec: 'Clear mobile liquid', result: 'Conforms', method: 'Organoleptic' },
    { parameter: 'Color', spec: 'Pale yellow to yellow', result: 'Conforms', method: 'Visual' },
    { parameter: 'Odor', spec: 'Characteristic, aromatic', result: 'Conforms', method: 'Organoleptic' },
    { parameter: 'Refractive Index (20°C)', spec: product.specs.refractiveIndex, result: 'Conforms', method: 'ASTM D1218' },
    { parameter: 'Optical Rotation (20°C)', spec: product.specs.opticalRotation, result: 'Conforms', method: 'ASTM D1807' },
    { parameter: 'Relative Density (20°C)', spec: '0.880 – 0.920', result: '0.898', method: 'ASTM D1298' },
    { parameter: 'Purity (GC/MS)', spec: '≥ 98.0%', result: '99.2%', method: 'GC/FID' },
    { parameter: 'Heavy Metals', spec: '≤ 10 ppm', result: '< 1 ppm', method: 'ICP-MS' },
    { parameter: 'Peroxide Value', spec: '≤ 10 meq/kg', result: '2.4 meq/kg', method: 'AOAC 965.33' },
    { parameter: 'Acid Value', spec: '≤ 5.0 mg KOH/g', result: '1.8', method: 'AOAC 940.28' },
    { parameter: 'Microbiological Load', spec: 'TPC < 100 CFU/g', result: '< 10 CFU/g', method: 'USP <61>' },
    { parameter: 'Solvent Residue', spec: 'No residual solvents', result: 'Not detected', method: 'GC Headspace' },
    { parameter: 'Pesticide Residue', spec: 'Compliant per EU 396/2005', result: 'Compliant', method: 'GC-MS/MS' },
    { parameter: 'PAH Content', spec: 'Sum < 10 ppb', result: '< 1 ppb', method: 'HPLC' },
  ];

  if (product.category === 'butters') {
    entries[1] = { parameter: 'Color', spec: 'Ivory to pale yellow', result: 'Conforms', method: 'Visual' };
    entries[2] = { parameter: 'Odor', spec: 'Characteristic, bland', result: 'Conforms', method: 'Organoleptic' };
    entries[3] = { parameter: 'Melting Point', spec: '32–38°C', result: '35°C', method: 'AOAC 920.154' };
  }

  return entries;
}

export function getRelatedProducts(product: Product, allProducts: Product[]): Product[] {
  const sameCategory = allProducts.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const sharedMolecules = allProducts.filter((p) => {
    if (p.id === product.id) return false;
    return p.molecules.some((m) => product.molecules.includes(m));
  });
  const combined = [...sameCategory, ...sharedMolecules];
  const seen = new Set<string>();
  return combined.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  }).slice(0, 4);
}
