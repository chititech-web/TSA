export interface SpecsObject {
  extraction: string;
  constituents: string;
  refractiveIndex: string;
  opticalRotation: string;
}

export interface BadgeRule {
  compound: string;
  min: number;
  badge: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  imgKey: string;
  desc: string;
  badge: string;
  benefits: string[];
  uses: string[];
  tags: string[];
  img: string;
  botanicalName: string;
  specs: SpecsObject;
  gcmsBatchId: string | null;
  badgeRule: BadgeRule | null;
  molecules: string[];
  category: string;
}

export interface GcmsCompound {
  name: string;
  percentage: number;
  status: string;
}

export interface GcmsEntry {
  oil: string;
  analysis_date: string;
  purity_score: string;
  compounds: GcmsCompound[];
}

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

const images: Record<string, string> = {
  lavender: '/images/products/lavender-oil/botanical.svg',
  tea: '/images/products/tea-tree-oil/botanical.svg',
  mint: '/images/products/mint.svg',
  eucalyptus: '/images/products/eucalyptus-oil/botanical.svg',
  citrus: '/images/products/citrus.svg',
  spice: '/images/products/spice.svg',
  woods: '/images/products/woods.svg',
  carrier: '/images/products/carrier.svg',
  floral: '/images/products/floral.svg',
  coconut: '/images/products/extra-virgin-coconut-oil/product.jpg',
  avocado: '/images/products/avocado-oil/product.jpg',
  almond: '/images/products/sweet-almond-oil/product.jpg',
  jojoba: '/images/products/jojoba-oil-carrier/product.jpg',
  fallback: '/images/products/fallback.svg',
};

function defaultSpecs(tags: string[], id: string): SpecsObject {
  const specData: Record<string, SpecsObject> = {
    'lavender-oil': { extraction: 'Steam Distilled', constituents: 'Linalool 35%, Linalyl Acetate 40%', refractiveIndex: '1.458 \u2013 1.464', opticalRotation: '-11.0\u00b0 to -7.0\u00b0' },
    'tea-tree-oil': { extraction: 'Steam Distilled', constituents: 'Terpinen-4-ol >40%, \u03b3-Terpinene 20%', refractiveIndex: '1.475 \u2013 1.482', opticalRotation: '+5.0\u00b0 to +15.0\u00b0' },
    'peppermint-oil-bp': { extraction: 'Steam Distilled', constituents: 'Menthol 45%, Menthone 20%', refractiveIndex: '1.459 \u2013 1.465', opticalRotation: '-30.0\u00b0 to -10.0\u00b0' },
    'extra-virgin-coconut-oil': { extraction: 'Cold Pressed', constituents: 'Lauric Acid 49%, Caprylic Acid 8%', refractiveIndex: '1.448 \u2013 1.450', opticalRotation: '0.0\u00b0 (Inactive)' },
  };
  if (specData[id]) return specData[id];
  const t = tags.join(' ');
  if (t.includes('carrier')) return { extraction: 'Cold Pressed', constituents: 'Oleic Acid 55\u201385%, Linoleic Acid 3\u201330%', refractiveIndex: '1.465 \u2013 1.475', opticalRotation: '\u2014' };
  if (t.includes('citrus')) return { extraction: 'Cold Pressed', constituents: 'Limonene 50\u201395%', refractiveIndex: '1.473 \u2013 1.478', opticalRotation: '+55\u00b0 to +100\u00b0' };
  if (t.includes('butter')) return { extraction: 'Cold Pressed / Refined', constituents: 'Mixed Fatty Acids', refractiveIndex: '1.455 \u2013 1.470', opticalRotation: '\u2014' };
  if (t.includes('extract')) return { extraction: 'Solvent / Water Extraction', constituents: 'Varies by batch', refractiveIndex: '\u2014', opticalRotation: '\u2014' };
  if (t.includes('aloe')) return { extraction: 'Mechanical / Spray Dried', constituents: 'Polysaccharides >10%', refractiveIndex: '\u2014', opticalRotation: '\u2014' };
  if (t.includes('industrial')) return { extraction: 'Distillation', constituents: 'Terpene Hydrocarbons >95%', refractiveIndex: '1.460 \u2013 1.490', opticalRotation: 'Refer to COA' };
  return { extraction: 'Steam Distilled', constituents: 'Varies by batch \u2013 GC/MS report available', refractiveIndex: '1.460 \u2013 1.510', opticalRotation: 'Refer to COA' };
}

const botanicalNames: Record<string, string> = {
  'lavender-oil': 'Lavandula angustifolia',
  'tea-tree-oil': 'Melaleuca alternifolia',
  'peppermint-oil-bp': 'Mentha piperita',
  'peppermint-oil-ip': 'Mentha arvensis',
  'spearmint-oil': 'Mentha spicata',
  'spearmint-oil-alt': 'Mentha spicata',
  'mint-terpene': 'Mentha spp.',
  'menthol-crystals': 'Mentha arvensis',
  'dementholised-mint-oil': 'Mentha arvensis',
  'eucalyptus-oil': 'Eucalyptus globulus',
  'rosemary-oil': 'Rosmarinus officinalis',
  'lemongrass-oil': 'Cymbopogon flexuosus',
  'clove-oil': 'Eugenia caryophyllata',
  'citronella-oil': 'Cymbopogon nardus',
  'sandalwood-oil': 'Santalum album',
  'frankincense-oil': 'Boswellia serrata',
  'lemon-oil': 'Citrus limon',
  'orange-oil': 'Citrus sinensis',
  'bergamot-oil': 'Citrus bergamia',
  'cedarwood-oil': 'Juniperus virginiana',
  'patchouli-oil': 'Pogostemon cablin',
  'cinnamon-bark-oil': 'Cinnamomum zeylanicum',
  'ginger-oil': 'Zingiber officinale',
  'ylang-ylang-oil': 'Cananga odorata',
  'geranium-oil': 'Pelargonium graveolens',
  'chamomile-oil': 'Matricaria chamomilla',
  'basil-oil': 'Ocimum basilicum',
  'thyme-oil': 'Thymus vulgaris',
  'rose-oil': 'Rosa damascena',
  'jasmine-oil': 'Jasminum officinale',
  'palmarosa-oil': 'Cymbopogon martinii',
  'vetiver-oil': 'Vetiveria zizanioides',
  'juniper-berry-oil': 'Juniperus communis',
  'black-pepper-oil': 'Piper nigrum',
  'nutmeg-oil': 'Myristica fragrans',
  'cardamom-oil': 'Elettaria cardamomum',
  'grapefruit-oil': 'Citrus paradisi',
  'lime-oil': 'Citrus aurantifolia',
  'mandarin-oil': 'Citrus reticulata',
  'oregano-oil': 'Origanum vulgare',
  'wintergreen-oil': 'Gaultheria procumbens',
  'camphor-oil': 'Cinnamomum camphora',
  'pine-oil': 'Pinus sylvestris',
  'pine-oil-pumilio': 'Pinus mugo',
  'carrot-seed-oil': 'Daucus carota',
  'extra-virgin-olive-oil': 'Olea europaea',
  'extra-virgin-coconut-oil': 'Cocos nucifera',
  'jojoba-oil-carrier': 'Simmondsia chinensis',
  'sweet-almond-oil': 'Prunus amygdalus dulcis',
  'grapeseed-oil': 'Vitis vinifera',
  'neem-oil': 'Azadirachta indica',
  'argan-oil': 'Argania spinosa',
  'avocado-oil': 'Persea americana',
  'apricot-kernel-oil': 'Prunus armeniaca',
  'castor-oil': 'Ricinus communis',
  'moringa-oil': 'Moringa oleifera',
  'sesame-oil': 'Sesamum indicum',
  'shea-butter': 'Butyrospermum parkii',
  'mango-butter': 'Mangifera indica',
  'cocoa-butter': 'Theobroma cacao',
  'jojoba-butter': 'Simmondsia chinensis',
  'aloe-butter': 'Aloe barbadensis',
  'avocado-butter': 'Persea americana',
  'murumuru-butter': 'Astrocaryum murumuru',
  'aloe-vera-gel': 'Aloe barbadensis',
  'aloe-vera-white-gel': 'Aloe barbadensis',
  'aloe-extract-100x': 'Aloe barbadensis',
  'aloe-extract-200x': 'Aloe barbadensis',
  'aloe-leaf-powder': 'Aloe barbadensis',
  'aloe-butter-product': 'Aloe barbadensis',
  'alpha-terpineol': 'Pinus spp.',
  'camphor-synthetic': 'Cinnamomum camphora',
  'longifolene': 'Pinus spp.',
  'terpin-hydrate': 'Pinus spp.',
  'terpineol': 'Pinus spp.',
  'turpentine-oil': 'Pinus spp.',
  'terpinyl-acetate': 'Pinus spp.',
  'thymol': 'Thymus vulgaris',
};

export const gcmsBatchIds: Record<string, string> = {
  'lavender-oil': 'TSA-LAV-2026-042',
  'tea-tree-oil': 'TSA-TTO-2026-088',
  'peppermint-oil-bp': 'TSA-PEP-2026-031',
  'eucalyptus-oil': 'TSA-EUC-2026-017',
  'spearmint-oil': 'TSA-SPE-2026-045',
  'rosemary-oil': 'TSA-ROS-2026-033',
  'lemongrass-oil': 'TSA-LGR-2026-021',
  'clove-oil': 'TSA-CLO-2026-056',
  'sandalwood-oil': 'TSA-SAN-2026-078',
  'frankincense-oil': 'TSA-FRA-2026-064',
  'lemon-oil': 'TSA-LEM-2026-029',
  'orange-oil': 'TSA-ORA-2026-037',
  'bergamot-oil': 'TSA-BER-2026-012',
  'cedarwood-oil': 'TSA-CED-2026-019',
  'patchouli-oil': 'TSA-PAT-2026-073',
  'cinnamon-bark-oil': 'TSA-CIN-2026-014',
  'chamomile-oil': 'TSA-CHA-2026-025',
  'peppermint-oil-ip': 'TSA-PEP-2026-032',
  'grapeseed-oil': 'TSA-GRA-2026-041',
  'jojoba-oil-carrier': 'TSA-JOJ-2026-052',
  'sweet-almond-oil': 'TSA-ALM-2026-008',
  'extra-virgin-coconut-oil': 'TSA-COC-2026-015',
  'spearmint-oil-alt': 'TSA-SPA-2026-046',
  'citronella-oil': 'TSA-CIT-2026-018',
  'ginger-oil': 'TSA-GIN-2026-024',
  'basil-oil': 'TSA-BAS-2026-010',
  'thyme-oil': 'TSA-THY-2026-080',
  'oregano-oil': 'TSA-OREG-2026-062',
  'nutmeg-oil': 'TSA-NUT-2026-058',
  'black-pepper-oil': 'TSA-BLP-2026-011',
  'cardamom-oil': 'TSA-CRD-2026-016',
  'ylang-ylang-oil': 'TSA-YLA-2026-086',
  'geranium-oil': 'TSA-GER-2026-023',
  'rose-oil': 'TSA-ROE-2026-070',
  'jasmine-oil': 'TSA-JAS-2026-028',
  'palmarosa-oil': 'TSA-PAL-2026-065',
  'vetiver-oil': 'TSA-VET-2026-084',
  'juniper-berry-oil': 'TSA-JUN-2026-030',
  'grapefruit-oil': 'TSA-GRF-2026-022',
  'lime-oil': 'TSA-LIM-2026-038',
  'mandarin-oil': 'TSA-MAN-2026-040',
  'extra-virgin-olive-oil': 'TSA-OLI-2026-061',
  'argan-oil': 'TSA-ARG-2026-007',
  'avocado-oil': 'TSA-AVO-2026-009',
  'apricot-kernel-oil': 'TSA-APR-2026-006',
  'castor-oil': 'TSA-CAS-2026-013',
  'moringa-oil': 'TSA-MOR-2026-050',
  'sesame-oil': 'TSA-SES-2026-075',
  'neem-oil': 'TSA-NEE-2026-057',
  'wintergreen-oil': 'TSA-WIN-2026-085',
  'camphor-oil': 'TSA-CPH-2026-013',
  'pine-oil': 'TSA-PIN-2026-066',
  'carrot-seed-oil': 'TSA-CRS-2026-017',
  'menthol-crystals': 'TSA-MEN-2026-048',
  'dementholised-mint-oil': 'TSA-DMO-2026-026',
  'pine-oil-pumilio': 'TSA-PIP-2026-067',
  'mint-terpene': 'TSA-MTP-2026-049',
  'camphor-synthetic': 'TSA-CSY-2026-014',
  'turpentine-oil': 'TSA-TUR-2026-082',
  'thymol': 'TSA-THYL-2026-081',
  'shea-butter': 'TSA-SHB-2026-074',
  'mango-butter': 'TSA-MGB-2026-044',
  'cocoa-butter': 'TSA-COB-2026-016',
  'avocado-butter': 'TSA-AVB-2026-009',
  'murumuru-butter': 'TSA-MUR-2026-053',
};

const badgeRules: Record<string, BadgeRule> = {
  'lavender-oil': { compound: 'Linalyl Acetate', min: 30, badge: '\u2713 High Esters', color: '#9cd596' },
  'tea-tree-oil': { compound: 'Terpinen-4-ol', min: 40, badge: '\u2713 Pharmaceutical Grade', color: '#2F4F4F' },
  'peppermint-oil-bp': { compound: 'Menthol', min: 40, badge: '\u2713 High Menthol', color: '#2F4F4F' },
  'eucalyptus-oil': { compound: '1,8-Cineole', min: 70, badge: '\u2713 High-Cineole Therapeutic', color: '#2F4F4F' },
  'sandalwood-oil': { compound: '\u03b1-Santalol', min: 40, badge: '\u2713 High Santalol', color: '#BF6F00' },
  'frankincense-oil': { compound: '\u03b1-Pinene', min: 30, badge: '\u2713 High \u03b1-Pinene', color: '#BF6F00' },
};

const productMolecules: Record<string, string[]> = {
  'lavender-oil': ['linalool', 'linalyl_acetate', 'lavandulyl_acetate'],
  'tea-tree-oil': ['terpinen-4-ol', 'gamma-terpinene', 'alpha-terpinene', '1,8-cineole'],
  'peppermint-oil-bp': ['menthol', 'menthone', 'menthyl_acetate', '1,8-cineole'],
  'peppermint-oil-ip': ['menthol', 'menthone', '1,8-cineole'],
  'spearmint-oil': ['carvone', 'limonene', 'linalool'],
  'spearmint-oil-alt': ['carvone', 'limonene'],
  'eucalyptus-oil': ['1,8-cineole', 'alpha-pinene', 'limonene'],
  'rosemary-oil': ['1,8-cineole', 'camphor', 'alpha-pinene'],
  'lemongrass-oil': ['citral', 'geraniol', 'limonene'],
  'clove-oil': ['eugenol', 'beta-caryophyllene'],
  'citronella-oil': ['citronellal', 'geraniol', 'limonene'],
  'sandalwood-oil': ['alpha-santalol', 'beta-santalol'],
  'frankincense-oil': ['alpha-pinene', 'limonene', 'beta-caryophyllene'],
  'lemon-oil': ['limonene', 'beta-pinene', 'gamma-terpinene'],
  'orange-oil': ['limonene', 'myrcene'],
  'bergamot-oil': ['limonene', 'linalyl_acetate', 'linalool'],
  'cedarwood-oil': ['cedrene', 'cedrol', 'thujopsene'],
  'patchouli-oil': ['patchoulol', 'alpha-guaiene', 'alpha-bulnesene'],
  'cinnamon-bark-oil': ['cinnamaldehyde', 'eugenol'],
  'ginger-oil': ['zingiberene', 'beta-sesquiphellandrene'],
  'ylang-ylang-oil': ['linalool', 'geranyl_acetate', 'benzyl_benzoate'],
  'geranium-oil': ['citronellol', 'geraniol', 'linalool'],
  'chamomile-oil': ['chamazulene', 'alpha-bisabolol'],
  'basil-oil': ['linalool', 'methyl_chavicol', 'eugenol'],
  'thyme-oil': ['thymol', 'carvacrol', 'p-cymene'],
  'neem-oil': ['nimbin', 'azadirachtin'],
  'argan-oil': ['oleic_acid', 'linoleic_acid'],
  'avocado-oil': ['oleic_acid', 'palmitic_acid'],
  'apricot-kernel-oil': ['oleic_acid', 'linoleic_acid'],
  'castor-oil': ['ricinoleic_acid', 'oleic_acid'],
  'moringa-oil': ['oleic_acid', 'behenic_acid'],
  'sesame-oil': ['oleic_acid', 'linoleic_acid'],
  'rose-oil': ['citronellol', 'geraniol', 'nerol'],
  'jasmine-oil': ['benzyl_acetate', 'linalool', 'methyl_anthranilate'],
  'palmarosa-oil': ['geraniol', 'linalool'],
  'vetiver-oil': ['vetiverol', 'vetivone', 'khusimol'],
  'juniper-berry-oil': ['alpha-pinene', 'myrcene', 'limonene'],
  'black-pepper-oil': ['piperine', 'beta-caryophyllene', 'limonene'],
  'nutmeg-oil': ['sabinene', 'myristicin', 'alpha-pinene'],
  'cardamom-oil': ['alpha-terpinyl_acetate', '1,8-cineole', 'limonene'],
  'grapefruit-oil': ['limonene', 'myrcene', 'alpha-pinene'],
  'lime-oil': ['limonene', 'beta-pinene'],
  'mandarin-oil': ['limonene', 'gamma-terpinene'],
  'oregano-oil': ['carvacrol', 'thymol'],
  'wintergreen-oil': ['methyl_salicylate'],
  'camphor-oil': ['camphor', '1,8-cineole', 'alpha-pinene'],
  'pine-oil': ['alpha-pinene', 'beta-pinene', 'limonene'],
  'carrot-seed-oil': ['oleic_acid', 'petroselinic_acid', 'beta-caryophyllene'],
  'extra-virgin-olive-oil': ['oleic_acid', 'linoleic_acid'],
  'extra-virgin-coconut-oil': ['lauric_acid', 'caprylic_acid'],
  'jojoba-oil-carrier': ['eicosenoic_acid', 'erucic_acid'],
  'sweet-almond-oil': ['oleic_acid', 'linoleic_acid'],
  'grapeseed-oil': ['linoleic_acid', 'oleic_acid'],
  'menthol-crystals': ['menthol'],
  'dementholised-mint-oil': ['menthone', 'limonene'],
  'pine-oil-pumilio': ['alpha-pinene', 'limonene'],
  'mint-terpene': ['menthol', 'menthone', 'limonene'],
  'camphor-synthetic': ['camphor'],
  'turpentine-oil': ['alpha-pinene', 'limonene'],
  'thymol': ['thymol'],
  'shea-butter': ['oleic_acid', 'linoleic_acid'],
  'mango-butter': ['oleic_acid', 'linoleic_acid'],
  'cocoa-butter': ['oleic_acid', 'linoleic_acid'],
  'avocado-butter': ['oleic_acid', 'linoleic_acid'],
  'murumuru-butter': ['lauric_acid', 'oleic_acid'],
};

const categoryMap: Record<string, string> = {
  'lavender-oil': 'Floral',
  'tea-tree-oil': 'Wellness',
  'peppermint-oil-bp': 'Mint',
  'peppermint-oil-ip': 'Mint',
  'spearmint-oil': 'Mint',
  'mint-terpene': 'Industrial',
  'menthol-crystals': 'Industrial',
  'dementholised-mint-oil': 'Industrial',
  'rosemary-oil': 'Floral',
  'eucalyptus-oil': 'Wellness',
  'lemongrass-oil': 'Citrus',
  'clove-oil': 'Spice',
  'citronella-oil': 'Citrus',
  'sandalwood-oil': 'Woods',
  'frankincense-oil': 'Woods',
  'lemon-oil': 'Citrus',
  'orange-oil': 'Citrus',
  'bergamot-oil': 'Citrus',
  'cedarwood-oil': 'Woods',
  'patchouli-oil': 'Woods',
  'cinnamon-bark-oil': 'Spice',
  'ginger-oil': 'Spice',
  'ylang-ylang-oil': 'Floral',
  'geranium-oil': 'Floral',
  'chamomile-oil': 'Floral',
  'basil-oil': 'Floral',
  'thyme-oil': 'Floral',
  'rose-oil': 'Floral',
  'jasmine-oil': 'Floral',
  'palmarosa-oil': 'Floral',
  'vetiver-oil': 'Woods',
  'juniper-berry-oil': 'Woods',
  'black-pepper-oil': 'Spice',
  'nutmeg-oil': 'Spice',
  'cardamom-oil': 'Spice',
  'grapefruit-oil': 'Citrus',
  'lime-oil': 'Citrus',
  'mandarin-oil': 'Citrus',
  'oregano-oil': 'Floral',
  'spearmint-oil-alt': 'Mint',
  'wintergreen-oil': 'Mint',
  'camphor-oil': 'Wellness',
  'pine-oil': 'Wellness',
  'alpha-terpineol': 'Industrial',
  'camphor-synthetic': 'Industrial',
  'longifolene': 'Industrial',
  'pine-oil-pumilio': 'Wellness',
  'terpin-hydrate': 'Industrial',
  'terpineol': 'Industrial',
  'turpentine-oil': 'Industrial',
  'terpinyl-acetate': 'Industrial',
  'thymol': 'Industrial',
  'shea-butter': 'Butters',
  'mango-butter': 'Butters',
  'cocoa-butter': 'Butters',
  'jojoba-butter': 'Butters',
  'aloe-butter': 'Butters',
  'avocado-butter': 'Butters',
  'murumuru-butter': 'Butters',
  'kiwi-extract': 'Extracts',
  'blueberry-extract': 'Extracts',
  'ginseng-extract': 'Extracts',
  'black-tea-extract': 'Extracts',
  'ginkgo-biloba-extract': 'Extracts',
  'horsechestnut-extract': 'Extracts',
  'liquorice-extract': 'Extracts',
  'passion-flower-extract': 'Extracts',
  'raspberry-extract': 'Extracts',
  'watercress-extract': 'Extracts',
  'aloe-vera-gel': 'Aloe',
  'aloe-vera-white-gel': 'Aloe',
  'aloe-extract-100x': 'Aloe',
  'aloe-extract-200x': 'Aloe',
  'aloe-leaf-powder': 'Aloe',
  'aloe-butter-product': 'Aloe',
  'extra-virgin-olive-oil': 'Carrier Oils',
  'extra-virgin-coconut-oil': 'Carrier Oils',
  'jojoba-oil-carrier': 'Carrier Oils',
  'sweet-almond-oil': 'Carrier Oils',
  'grapeseed-oil': 'Carrier Oils',
  'neem-oil': 'Carrier Oils',
  'argan-oil': 'Carrier Oils',
  'avocado-oil': 'Carrier Oils',
  'apricot-kernel-oil': 'Carrier Oils',
  'castor-oil': 'Carrier Oils',
  'moringa-oil': 'Carrier Oils',
  'sesame-oil': 'Carrier Oils',
  'carrot-seed-oil': 'Carrier Oils',
};

const rawProducts: Omit<Product, 'img' | 'botanicalName' | 'specs' | 'gcmsBatchId' | 'badgeRule' | 'molecules' | 'category'>[] = [
  { id: 'lavender-oil', name: 'Lavender Oil', imgKey: 'lavender', desc: 'Soothing therapeutic grade for premium wellness products. Calming, floral oil for skincare, sleep, and aromatherapy.', badge: 'Best Seller', benefits: ['Promotes relaxation', 'Supports restful sleep', 'Soothes skin irritation', 'Natural anti-inflammatory'], uses: ['Aromatherapy', 'Skincare formulations', 'Sleep sprays', 'Massage blends'], tags: ['essential', 'best', 'aromatherapy', 'wellness', 'cosmetic'] },
  { id: 'tea-tree-oil', name: 'Tea Tree Oil', imgKey: 'tea', desc: 'Potent antibacterial essential oil for acne care, scalp products, and antimicrobial blends.', badge: 'Best Seller', benefits: ['Natural antiseptic', 'Treats acne & blemishes', 'Supports scalp health', 'Effective against fungi'], uses: ['Acne creams', 'Hair care', 'First-aid blends', 'Disinfectants'], tags: ['essential', 'best', 'cosmetic', 'wellness'] },
  { id: 'peppermint-oil-bp', name: 'Peppermint Oil BP (Mentha Piperita)', imgKey: 'mint', desc: 'Cooling menthol-rich oil for invigorating blends, balms, and pharmaceutical preparations.', badge: '', benefits: ['Relieves tension headaches', 'Boosts energy & focus', 'Eases digestive discomfort', 'Cooling sensation'], uses: ['Headache balms', 'Energy blends', 'Digestive aids', 'Hair growth formulas'], tags: ['essential', 'aromatherapy', 'wellness'] },
  { id: 'peppermint-oil-ip', name: 'Peppermint Oil IP (Mentha Arvensis)', imgKey: 'mint', desc: 'Indian mint oil for oral care, pain relief, and industrial applications.', badge: '', benefits: ['High menthol content', 'Cooling & refreshing', 'Natural analgesic', 'Oral care support'], uses: ['Toothpastes', 'Chest rubs', 'Confectionery', 'Pharmaceuticals'], tags: ['essential', 'wellness', 'industrial'] },
  { id: 'spearmint-oil', name: 'Spearmint Oil', imgKey: 'mint', desc: 'Lighter, sweeter mint oil for oral care, digestive blends, and confectionery.', badge: '', benefits: ['Gentle mint aroma', 'Supports digestion', 'Freshens breath', 'Calming effect'], uses: ['Chewing gum', 'Toothpaste', 'Lip balms', 'Aromatherapy'], tags: ['essential', 'aromatherapy', 'cosmetic'] },
  { id: 'mint-terpene', name: 'Mint Terpene', imgKey: 'mint', desc: 'High-purity terpene fraction from mint \u2013 used for flavour, fragrance, and synthesis.', badge: '', benefits: ['Concentrated aroma', 'Versatile base note', 'Cost-effective', 'Consistent profile'], uses: ['Flavour manufacturing', 'Fragrance compounds', 'Industrial synthesis'], tags: ['industrial', 'flavour'] },
  { id: 'menthol-crystals', name: 'Menthol Crystals IP/BP/USP', imgKey: 'mint', desc: 'Natural crystalline menthol derived from mint oil \u2013 pharmaceutical grade.', badge: 'Premium', benefits: ['Strong cooling effect', 'Natural analgesic', 'Pharmaceutical grade', 'Long shelf life'], uses: ['Topical balms', 'Cough drops', 'Pain relief creams', 'Tobacco products'], tags: ['premium', 'wellness', 'industrial'] },
  { id: 'dementholised-mint-oil', name: 'Dementholised Mint Oil', imgKey: 'mint', desc: 'Mint oil with menthol removed \u2013 rich in other terpenes for flavour and fragrance.', badge: '', benefits: ['Mild mint character', 'High in menthone', 'Stable flavour base', 'Cost-effective'], uses: ['Chewing gum', 'Fragrances', 'Pharmaceutical intermediates'], tags: ['industrial', 'flavour'] },
  { id: 'rosemary-oil', name: 'Rosemary Oil', imgKey: 'floral', desc: 'Revitalising essence for hair care, memory enhancement, and pain relief.', badge: '', benefits: ['Stimulates hair growth', 'Improves memory', 'Reduces muscle pain', 'Antioxidant'], uses: ['Hair oils', 'Scalp treatments', 'Focus blends', 'Pain relief rubs'], tags: ['essential', 'cosmetic', 'wellness'] },
  { id: 'eucalyptus-oil', name: 'Eucalyptus Oil', imgKey: 'eucalyptus', desc: 'Strong camphoraceous oil for respiratory health, cleaning, and spa products.', badge: '', benefits: ['Clears nasal congestion', 'Natural disinfectant', 'Soothes joint pain', 'Fresh aroma'], uses: ['Chest rubs', 'Vaporisers', 'Cleaning products', 'Muscle balms'], tags: ['essential', 'wellness', 'homecare', 'aromatherapy'] },
  { id: 'lemongrass-oil', name: 'Lemongrass Oil', imgKey: 'citrus', desc: 'Fresh citrus-scented oil with astringent and insect-repellent properties.', badge: '', benefits: ['Natural insect repellent', 'Tightens skin pores', 'Reduces dandruff', 'Uplifts mood'], uses: ['Insect sprays', 'Skincare toners', 'Deodorants', 'Cleaning solutions'], tags: ['essential', 'cosmetic', 'homecare'] },
  { id: 'clove-oil', name: 'Clove Oil', imgKey: 'spice', desc: 'Rich, warm oil for dental care, pain relief, and pharmaceutical preparations.', badge: '', benefits: ['Analgesic for toothaches', 'Antimicrobial', 'Supports digestion', 'Potent antioxidant'], uses: ['Dental products', 'Pain relief balms', 'Mouthwashes', 'Spice blends'], tags: ['essential', 'wellness'] },
  { id: 'citronella-oil', name: 'Citronella Oil', imgKey: 'citrus', desc: 'Grassy oil \u2013 the natural choice for insect repellents and outdoor products.', badge: '', benefits: ['Repels mosquitoes', 'Deodorises', 'Calms aggressive behaviour', 'Antifungal'], uses: ['Insect repellent sprays', 'Candles', 'Soaps', 'Deodorants'], tags: ['essential', 'homecare'] },
  { id: 'sandalwood-oil', name: 'Sandalwood Oil', imgKey: 'woods', desc: 'Premium woody-aromatic oil for luxury perfumery, meditation, and skincare.', badge: 'Premium', benefits: ['Promotes mental clarity', 'Reduces anxiety', 'Natural astringent', 'Fixative for fragrances'], uses: ['Luxury perfumes', 'Incense', 'Skincare serums', 'Meditation oils'], tags: ['essential', 'premium', 'aromatherapy', 'cosmetic'] },
  { id: 'frankincense-oil', name: 'Frankincense Oil', imgKey: 'woods', desc: 'Earthy, resinous oil \u2013 anti-aging and spiritually grounding.', badge: 'Premium', benefits: ['Reduces signs of ageing', 'Supports immune system', 'Induces deep relaxation', 'Protects skin'], uses: ['Anti-ageing creams', 'Meditation blends', 'Soap making', 'Massage oils'], tags: ['essential', 'premium', 'aromatherapy', 'cosmetic'] },
  { id: 'lemon-oil', name: 'Lemon Oil', imgKey: 'citrus', desc: 'Bright citrus oil for cleaning, freshening, and cheerful aromatherapy blends.', badge: 'Best Seller', benefits: ['Bright aroma', 'Deodorising', 'Fresh top note', 'Uplifting'], uses: ['Cleaners', 'Diffuser blends', 'Soaps', 'Body care'], tags: ['essential', 'best', 'homecare', 'aromatherapy'] },
  { id: 'orange-oil', name: 'Orange Oil', imgKey: 'citrus', desc: 'Sweet citrus oil for soaps, candles, and mood blends.', badge: '', benefits: ['Sweet top note', 'Freshens formulas', 'Cost-effective', 'Cheerful aroma'], uses: ['Soaps', 'Candles', 'Cleaners', 'Aromatherapy'], tags: ['essential', 'homecare', 'aromatherapy'] },
  { id: 'bergamot-oil', name: 'Bergamot Oil', imgKey: 'citrus', desc: 'Refined citrus floral note for perfumery, wellness, and body products.', badge: 'Premium', benefits: ['Elegant citrus note', 'Premium aroma', 'Blending versatility', 'Calming'], uses: ['Perfume', 'Body oils', 'Diffusers', 'Skincare'], tags: ['essential', 'premium', 'aromatherapy', 'cosmetic'] },
  { id: 'cedarwood-oil', name: 'Cedarwood Oil', imgKey: 'woods', desc: 'Dry woody oil for scalp care, masculine blends, and grounding aromas.', badge: '', benefits: ['Woody base note', 'Scalp care story', 'Grounding profile', 'Natural preservative'], uses: ['Hair care', 'Perfume', 'Meditation blends', 'Insect repellent'], tags: ['essential', 'cosmetic', 'aromatherapy'] },
  { id: 'patchouli-oil', name: 'Patchouli Oil', imgKey: 'woods', desc: 'Earthy, long-lasting oil for perfumery, incense, and skincare blends.', badge: 'Premium', benefits: ['Strong base note', 'Long-lasting aroma', 'Luxury positioning', 'Grounding'], uses: ['Perfume', 'Incense', 'Body oils', 'Skincare'], tags: ['essential', 'premium', 'aromatherapy', 'cosmetic'] },
  { id: 'cinnamon-bark-oil', name: 'Cinnamon Bark Oil', imgKey: 'spice', desc: 'Warm spice oil for fragrance, seasonal blends, and specialty products.', badge: '', benefits: ['Warm note', 'Seasonal profile', 'High-impact aroma', 'Antimicrobial'], uses: ['Candles', 'Perfume', 'Soaps', 'Diffusers'], tags: ['essential', 'homecare', 'aromatherapy'] },
  { id: 'ginger-oil', name: 'Ginger Oil', imgKey: 'spice', desc: 'Warm, fresh spice oil for massage, wellness, and aromatherapy blends.', badge: '', benefits: ['Warming profile', 'Fresh spice aroma', 'Massage story', 'Digestive support'], uses: ['Massage oils', 'Diffusers', 'Balms', 'Wellness blends'], tags: ['essential', 'wellness', 'aromatherapy'] },
  { id: 'ylang-ylang-oil', name: 'Ylang Ylang Oil', imgKey: 'floral', desc: 'Exotic floral oil for premium fragrance, hair care, and relaxation blends.', badge: 'Premium', benefits: ['Rich floral note', 'Luxury positioning', 'Relaxing aroma', 'Hair shine'], uses: ['Perfume', 'Hair care', 'Diffusers', 'Body oils'], tags: ['essential', 'premium', 'cosmetic', 'aromatherapy'] },
  { id: 'geranium-oil', name: 'Geranium Oil', imgKey: 'floral', desc: 'Rosy-green floral oil for skincare, perfumery, and balancing blends.', badge: '', benefits: ['Floral green note', 'Skincare story', 'Blending bridge', 'Balancing'], uses: ['Face oils', 'Perfume', 'Diffusers', 'Body care'], tags: ['essential', 'cosmetic', 'aromatherapy'] },
  { id: 'chamomile-oil', name: 'Chamomile Oil', imgKey: 'floral', desc: 'Soft botanical oil for calming skincare and premium wellness products.', badge: 'Premium', benefits: ['Calming story', 'Gentle positioning', 'Soft aroma', 'Anti-inflammatory'], uses: ['Skincare', 'Sleep blends', 'Baby-care', 'Aromatherapy'], tags: ['essential', 'premium', 'cosmetic', 'wellness'] },
  { id: 'basil-oil', name: 'Basil Oil', imgKey: 'floral', desc: 'Fresh herbal oil for focus, massage, and specialty aromatherapy blends.', badge: '', benefits: ['Herbal profile', 'Focus aroma', 'Fresh green note', 'Uplifting'], uses: ['Diffusers', 'Massage blends', 'Spa products', 'Wellness'], tags: ['essential', 'aromatherapy', 'wellness'] },
  { id: 'thyme-oil', name: 'Thyme Oil', imgKey: 'floral', desc: 'Strong herbal oil for cleansing, wellness, and functional blends.', badge: '', benefits: ['Herbal potency', 'Cleansing story', 'Sharp aroma', 'Antimicrobial'], uses: ['Cleaners', 'Wellness blends', 'Soaps', 'Diffusers'], tags: ['essential', 'homecare', 'wellness'] },
  { id: 'rose-oil', name: 'Rose Oil', imgKey: 'floral', desc: 'Luxury floral oil for perfume, skincare, and emotional wellness blends.', badge: 'Premium', benefits: ['Iconic floral note', 'Luxury positioning', 'Skincare story', 'Romantic aroma'], uses: ['Perfume', 'Serums', 'Diffusers', 'Body oils'], tags: ['essential', 'premium', 'cosmetic', 'aromatherapy'] },
  { id: 'jasmine-oil', name: 'Jasmine Oil', imgKey: 'floral', desc: 'Rich floral absolute-style aroma for fine fragrance and premium body care.', badge: 'Premium', benefits: ['Rich floral note', 'Fine fragrance story', 'Premium blends', 'Uplifting'], uses: ['Perfume', 'Body oils', 'Candles', 'Skincare'], tags: ['essential', 'premium', 'cosmetic', 'aromatherapy'] },
  { id: 'palmarosa-oil', name: 'Palmarosa Oil', imgKey: 'floral', desc: 'Rosy-grassy oil for skincare, soaps, and elegant aromatherapy blends.', badge: '', benefits: ['Rosy profile', 'Skincare positioning', 'Fresh floral note', 'Hydrating'], uses: ['Soaps', 'Skincare', 'Diffusers', 'Deodorants'], tags: ['essential', 'cosmetic', 'aromatherapy'] },
  { id: 'vetiver-oil', name: 'Vetiver Oil', imgKey: 'woods', desc: 'Deep earthy base note for perfumery, grounding blends, and meditation oils.', badge: 'Premium', benefits: ['Deep base note', 'Grounding profile', 'Long-lasting aroma', 'Calming'], uses: ['Perfume', 'Meditation oils', 'Incense', 'Diffusers'], tags: ['essential', 'premium', 'aromatherapy'] },
  { id: 'juniper-berry-oil', name: 'Juniper Berry Oil', imgKey: 'woods', desc: 'Crisp woody oil for spa, detox-positioned blends, and body care.', badge: '', benefits: ['Crisp woody note', 'Spa positioning', 'Fresh aroma', 'Detox support'], uses: ['Massage', 'Spa blends', 'Diffusers', 'Body care'], tags: ['essential', 'wellness', 'aromatherapy'] },
  { id: 'black-pepper-oil', name: 'Black Pepper Oil', imgKey: 'spice', desc: 'Warm spice oil for massage, sports-care, and masculine fragrance blends.', badge: '', benefits: ['Warm profile', 'Sports-care story', 'Spicy note', 'Circulation support'], uses: ['Massage oils', 'Balms', 'Perfume', 'Wellness blends'], tags: ['essential', 'wellness', 'aromatherapy'] },
  { id: 'nutmeg-oil', name: 'Nutmeg Oil', imgKey: 'spice', desc: 'Sweet warm spice oil for seasonal fragrance and wellness blends.', badge: '', benefits: ['Sweet spice note', 'Seasonal profile', 'Warm aroma', 'Calming'], uses: ['Candles', 'Diffusers', 'Soaps', 'Massage'], tags: ['essential', 'homecare', 'aromatherapy'] },
  { id: 'cardamom-oil', name: 'Cardamom Oil', imgKey: 'spice', desc: 'Premium spice oil for perfumery, wellness, and specialty flavour-aroma blends.', badge: 'Premium', benefits: ['Elegant spice note', 'Premium positioning', 'Warm fresh profile', 'Uplifting'], uses: ['Perfume', 'Diffusers', 'Spa products', 'Flavours'], tags: ['essential', 'premium', 'aromatherapy'] },
  { id: 'grapefruit-oil', name: 'Grapefruit Oil', imgKey: 'citrus', desc: 'Sparkling citrus oil for bright body care, cleaning, and diffuser blends.', badge: '', benefits: ['Sparkling top note', 'Freshens products', 'Bright aroma', 'Uplifting'], uses: ['Body care', 'Cleaners', 'Diffusers', 'Soaps'], tags: ['essential', 'homecare', 'aromatherapy'] },
  { id: 'lime-oil', name: 'Lime Oil', imgKey: 'citrus', desc: 'Zesty citrus oil for soaps, cleaners, fragrance, and energizing blends.', badge: '', benefits: ['Zesty top note', 'Clean profile', 'Fresh aroma', 'Energising'], uses: ['Soaps', 'Cleaners', 'Perfume', 'Diffusers'], tags: ['essential', 'homecare', 'aromatherapy'] },
  { id: 'mandarin-oil', name: 'Mandarin Oil', imgKey: 'citrus', desc: 'Soft sweet citrus oil for family-friendly wellness and body products.', badge: '', benefits: ['Soft sweet note', 'Gentle positioning', 'Happy aroma', 'Kid-friendly'], uses: ['Diffusers', 'Body care', 'Soaps', 'Sleep blends'], tags: ['essential', 'cosmetic', 'aromatherapy'] },
  { id: 'oregano-oil', name: 'Oregano Oil', imgKey: 'floral', desc: 'Powerful herbal oil for functional wellness and cleansing products.', badge: '', benefits: ['Strong herbal profile', 'Functional story', 'High-impact aroma', 'Antimicrobial'], uses: ['Wellness blends', 'Cleaners', 'Soaps', 'Diffusers'], tags: ['essential', 'wellness', 'homecare'] },
  { id: 'spearmint-oil-alt', name: 'Spearmint Oil', imgKey: 'mint', desc: 'Gentle mint oil for oral care, confectionery, and refreshing blends.', badge: '', benefits: ['Gentle cooling', 'Sweet mint profile', 'Breath freshening', 'Calming'], uses: ['Chewing gum', 'Toothpaste', 'Lip care', 'Aromatherapy'], tags: ['essential', 'cosmetic', 'aromatherapy'] },
  { id: 'wintergreen-oil', name: 'Wintergreen Oil', imgKey: 'mint', desc: 'Strong cooling oil for balms, sports-care, and massage products.', badge: '', benefits: ['Cooling sensation', 'Sports-care positioning', 'Strong aroma', 'Analgesic'], uses: ['Balms', 'Massage oils', 'Pain-relief formulations', 'Sports care'], tags: ['essential', 'wellness'] },
  { id: 'camphor-oil', name: 'Camphor Oil', imgKey: 'eucalyptus', desc: 'Sharp cooling oil for respiratory-style, balm, and cleansing applications.', badge: '', benefits: ['Sharp clearing aroma', 'Cooling profile', 'Functional blends', 'Decongestant'], uses: ['Balms', 'Vaporizers', 'Cleaners', 'Massage'], tags: ['essential', 'wellness', 'homecare'] },
  { id: 'pine-oil', name: 'Pine Oil', imgKey: 'eucalyptus', desc: 'Fresh forest oil for cleaning, diffuser, and masculine fragrance products.', badge: '', benefits: ['Forest aroma', 'Cleaning profile', 'Fresh woody note', 'Disinfectant'], uses: ['Cleaners', 'Diffusers', 'Perfume', 'Industrial formulations'], tags: ['essential', 'homecare', 'aromatherapy'] },
  { id: 'alpha-terpineol', name: 'Alpha Terpineol', imgKey: 'woods', desc: 'Terpene alcohol with lilac-like aroma \u2013 used in fragrances and as a solvent.', badge: '', benefits: ['Pleasant floral note', 'Solvent properties', 'Versatile intermediate', 'Stable compound'], uses: ['Fragrances', 'Industrial solvents', 'Flavours', 'Cleaning products'], tags: ['industrial', 'fragrance'] },
  { id: 'camphor-synthetic', name: 'Camphor', imgKey: 'eucalyptus', desc: 'White crystalline compound with strong penetrating aroma \u2013 pharmaceutical grade.', badge: '', benefits: ['Decongestant', 'Anti-inflammatory', 'Cooling sensation', 'Preservative'], uses: ['Chest rubs', 'Pain balms', 'Pooja camphor', 'Industrial moth repellent'], tags: ['industrial', 'wellness', 'homecare'] },
  { id: 'longifolene', name: 'Longifolene', imgKey: 'woods', desc: 'Sesquiterpene hydrocarbon with woody odour \u2013 used in fragrance and as a bio-solvent.', badge: '', benefits: ['Woody scent', 'Biodegradable solvent', 'Stable compound', 'Fixative property'], uses: ['Fragrance compound', 'Industrial solvent', 'Flavours', 'Agrochemicals'], tags: ['industrial', 'fragrance'] },
  { id: 'pine-oil-pumilio', name: 'Pine Oil (Pumilio)', imgKey: 'eucalyptus', desc: 'Mountain pine oil with sharper, more medicinal aroma \u2013 derived from Pinus mugo.', badge: '', benefits: ['Medicinal pine note', 'Strong disinfectant', 'Respiratory support', 'Fresh forest scent'], uses: ['Medicinal baths', 'Inhalants', 'Cleaning products', 'Massage blends'], tags: ['essential', 'wellness', 'homecare'] },
  { id: 'terpin-hydrate', name: 'Terpin Hydrate', imgKey: 'mint', desc: 'Terpene derivative used as an expectorant and cough suppressant.', badge: '', benefits: ['Expectorant action', 'Cough relief', 'Pharmaceutical grade', 'Well-tolerated'], uses: ['Cough syrups', 'Expectorant preparations', 'Pharmaceutical intermediates'], tags: ['industrial', 'wellness'] },
  { id: 'terpineol', name: 'Terpineol', imgKey: 'woods', desc: 'Floral terpene alcohol widely used in perfumery and as a solvent.', badge: '', benefits: ['Lilac-like aroma', 'Excellent fixative', 'Solvent for resins', 'Biodegradable'], uses: ['Perfumes', 'Flavours', 'Industrial cleaners', 'Paints & coatings'], tags: ['industrial', 'fragrance'] },
  { id: 'turpentine-oil', name: 'Turpentine Oil', imgKey: 'woods', desc: 'Distilled from pine resin \u2013 traditional solvent and thinning agent for paints.', badge: '', benefits: ['Powerful solvent', 'Natural origin', 'Penetrating aroma', 'Antiseptic properties'], uses: ['Paint thinner', 'Varnish production', 'Industrial cleaning', 'Traditional medicine'], tags: ['industrial', 'homecare'] },
  { id: 'terpinyl-acetate', name: 'Terpinyl Acetate', imgKey: 'woods', desc: 'Ester with sweet floral, lavender-like aroma \u2013 used in fine fragrances.', badge: '', benefits: ['Sweet floral note', 'Blending agent', 'Stable compound', 'Fixative property'], uses: ['Perfumery', 'Flavours', 'Cosmetic formulations', 'Aromatherapy'], tags: ['industrial', 'fragrance', 'cosmetic'] },
  { id: 'thymol', name: 'Thymol', imgKey: 'spice', desc: 'Natural biocide derived from thyme oil \u2013 used in mouthwashes and disinfectants.', badge: '', benefits: ['Powerful antimicrobial', 'Antifungal', 'Fresh medicinal aroma', 'Preservative'], uses: ['Mouthwashes', 'Disinfectants', 'Veterinary products', 'Pesticides'], tags: ['industrial', 'wellness', 'homecare'] },
  { id: 'shea-butter', name: 'Shea Butter', imgKey: 'carrier', desc: 'Rich, nourishing butter for creams, soaps, and hair conditioners.', badge: 'Best Seller', benefits: ['Deep moisturisation', 'Anti-inflammatory', 'Vitamin-rich', 'Skin barrier repair'], uses: ['Body butters', 'Hair conditioners', 'Soaps', 'Lip balms'], tags: ['butter', 'best', 'cosmetic'] },
  { id: 'mango-butter', name: 'Mango Butter', imgKey: 'carrier', desc: 'Light, non-greasy butter with high oxidative stability \u2013 ideal for lotions and lip care.', badge: '', benefits: ['Soft texture', 'Quick absorption', 'Antioxidant properties', 'Non-comedogenic'], uses: ['Lip balms', 'Body lotions', 'Hair butters', 'Soap making'], tags: ['butter', 'cosmetic'] },
  { id: 'cocoa-butter', name: 'Cocoa Butter', imgKey: 'carrier', desc: 'Classic emollient with rich chocolate aroma \u2013 used in body care and confectionery.', badge: '', benefits: ['Deep moisture', 'Natural antioxidant', 'Skin elasticity', 'Pleasant aroma'], uses: ['Chocolate', 'Body balms', 'Lip care', 'Stretch mark creams'], tags: ['butter', 'cosmetic'] },
  { id: 'jojoba-butter', name: 'Jojoba Butter', imgKey: 'carrier', desc: 'Hydrogenated jojoba oil \u2013 a solid butter with excellent skincare properties.', badge: '', benefits: ['Waxy texture', 'Long shelf life', 'Non-greasy feel', 'Mimics skin sebum'], uses: ['Lip balms', 'Solid lotions', 'Hair pomades', 'Soap making'], tags: ['butter', 'cosmetic'] },
  { id: 'aloe-butter', name: 'Aloe Butter', imgKey: 'carrier', desc: 'Soothing butter combining aloe vera with vegetable oils \u2013 ideal for sensitive skin.', badge: '', benefits: ['Calming effect', 'Hydration', 'Anti-inflammatory', 'Light texture'], uses: ['After-sun care', 'Sensitive skin creams', 'Baby products', 'Soaps'], tags: ['butter', 'cosmetic', 'wellness'] },
  { id: 'avocado-butter', name: 'Avocado Butter', imgKey: 'carrier', desc: 'Rich, creamy butter from avocado oil \u2013 deep nourishment for very dry skin.', badge: '', benefits: ['Deeply moisturising', 'Rich in vitamins A & E', 'Repairs dry skin', 'Soft texture'], uses: ['Cracked heel creams', 'Hair masks', 'Body butters', 'Soap superfatting'], tags: ['butter', 'cosmetic'] },
  { id: 'murumuru-butter', name: 'Murumuru Butter', imgKey: 'carrier', desc: 'Amazonian butter with high lauric content \u2013 known for its softening properties.', badge: '', benefits: ['Natural softening', 'High absorption', 'Restorative', 'Sustainable source'], uses: ['Hair conditioners', 'Curl defining creams', 'Body balms', 'Soap base'], tags: ['butter', 'cosmetic', 'premium'] },
  { id: 'kiwi-extract', name: 'Kiwi Extract', imgKey: 'citrus', desc: 'Water-soluble extract rich in vitamin C and antioxidants \u2013 for brightening formulations.', badge: '', benefits: ['Brightening effect', 'Antioxidant protection', 'Exfoliating enzymes', 'Natural origin'], uses: ['Face serums', 'Creams', 'Body lotions', 'Shampoos'], tags: ['extract', 'cosmetic'] },
  { id: 'blueberry-extract', name: 'Blueberry Extract', imgKey: 'floral', desc: 'Potent antioxidant extract for anti-aging and protective skincare.', badge: '', benefits: ['High in anthocyanins', 'Anti-aging', 'Protects from oxidative stress', 'Natural colour'], uses: ['Anti-aging creams', 'Masks', 'Lip balms', 'Body scrubs'], tags: ['extract', 'cosmetic'] },
  { id: 'ginseng-extract', name: 'Ginseng Extract', imgKey: 'floral', desc: 'Traditional adaptogen extract for energising and revitalising skincare.', badge: '', benefits: ['Energising', 'Improves elasticity', 'Stimulates circulation', 'Adaptogenic'], uses: ['Face creams', 'Hair tonics', 'Eye serums', 'Wellness drinks'], tags: ['extract', 'cosmetic', 'wellness'] },
  { id: 'black-tea-extract', name: 'Black Tea Extract', imgKey: 'floral', desc: 'Fermented tea extract with polyphenols \u2013 for mattifying and anti-inflammatory products.', badge: '', benefits: ['Mattifying', 'Anti-inflammatory', 'Rich in tannins', 'Antioxidant'], uses: ['Toners', 'Masks', 'Oily skin products', 'Shampoos'], tags: ['extract', 'cosmetic'] },
  { id: 'ginkgo-biloba-extract', name: 'Ginkgo Biloba Leaf Extract', imgKey: 'floral', desc: 'Standardised extract for vascular health and anti-aging formulations.', badge: '', benefits: ['Improves microcirculation', 'Antioxidant', 'Protects skin', 'Boosts scalp health'], uses: ['Anti-ageing serums', 'Hair growth tonics', 'Eye creams', 'Wellness supplements'], tags: ['extract', 'cosmetic', 'wellness'] },
  { id: 'horsechestnut-extract', name: 'Horsechestnut Extract', imgKey: 'floral', desc: 'Extract rich in aescin \u2013 widely used for leg care and anti-cellulite products.', badge: '', benefits: ['Strengthens capillaries', 'Reduces swelling', 'Anti-cellulite', 'Soothing'], uses: ['Leg gels', 'Anti-cellulite creams', 'Varicose vein care', 'Body lotions'], tags: ['extract', 'cosmetic', 'wellness'] },
  { id: 'liquorice-extract', name: 'Liquorice Extract', imgKey: 'floral', desc: 'Soothing, brightening extract for hyperpigmentation and sensitive skin.', badge: '', benefits: ['Brightening', 'Anti-inflammatory', 'Calms redness', 'Natural sweetener'], uses: ['Brightening serums', 'Soothing creams', 'Lip balms', 'Oral care'], tags: ['extract', 'cosmetic'] },
  { id: 'passion-flower-extract', name: 'Passion Flower Extract', imgKey: 'floral', desc: 'Calming extract for stress-relief and soothing skincare.', badge: '', benefits: ['Calming', 'Antioxidant', 'Suppresses cortisol', 'Soothing'], uses: ['Sleep masks', 'Calming creams', 'Bath oils', 'Aromatherapy'], tags: ['extract', 'cosmetic', 'wellness'] },
  { id: 'raspberry-extract', name: 'Raspberry Extract', imgKey: 'floral', desc: 'Fruit extract with natural vitamins and gentle exfoliating properties.', badge: '', benefits: ['Vitamin-rich', 'Gentle exfoliation', 'Antioxidant', 'Fruity aroma'], uses: ['Lip balms', 'Face masks', 'Body scrubs', 'Natural colourant'], tags: ['extract', 'cosmetic'] },
  { id: 'watercress-extract', name: 'Watercress Extract', imgKey: 'floral', desc: 'Mineral-rich extract for strengthening hair and scalp formulations.', badge: '', benefits: ['Strengthens hair', 'Mineral content', 'Detoxifying', 'Scalp health'], uses: ['Shampoos', 'Conditioners', 'Scalp tonics', 'Hair masks'], tags: ['extract', 'cosmetic'] },
  { id: 'aloe-vera-gel', name: 'Aloe Vera Gel (Scented Yellow/Pink/Blue)', imgKey: 'floral', desc: 'Versatile gel for post-sun, skincare, and haircare formulations \u2013 available in natural and scented variants.', badge: '', benefits: ['Hydrating', 'Soothing', 'Cooling effect', 'Versatile base'], uses: ['After-sun gels', 'Face masks', 'Hair gels', 'Body lotions'], tags: ['aloe', 'cosmetic'] },
  { id: 'aloe-vera-white-gel', name: 'Aloe Vera White Gel', imgKey: 'floral', desc: 'Clean, colourless gel with preserved aloe properties \u2013 ideal for elegant formulations.', badge: '', benefits: ['Colourless', 'Clear base', 'Hydrating', 'Non-staining'], uses: ['Luxury skincare', 'Serums', 'Eye gels', 'Clear masks'], tags: ['aloe', 'cosmetic', 'premium'] },
  { id: 'aloe-extract-100x', name: 'Aloe Extract 100x (Spray Dried)', imgKey: 'floral', desc: 'Highly concentrated aloe powder \u2013 100 times concentrated. Easy to dose.', badge: '', benefits: ['High concentration', 'Long shelf life', 'Easy storage', 'Consistent quality'], uses: ['Cosmetic powders', 'Tablets', 'Capsules', 'Dry blends'], tags: ['aloe', 'cosmetic', 'wellness'] },
  { id: 'aloe-extract-200x', name: 'Aloe Extract 200x (Spray Dried Nature)', imgKey: 'floral', desc: 'Ultra-concentrated aloe powder \u2013 200 times. Premium grade for high-end applications.', badge: 'Premium', benefits: ['Maximum concentration', 'Superior purity', 'Excellent solubility', 'Premium grade'], uses: ['High-end skincare', 'Nutraceuticals', 'Advanced formulations', 'Professional products'], tags: ['aloe', 'cosmetic', 'premium', 'wellness'] },
  { id: 'aloe-leaf-powder', name: 'Aloe Leaf Powder', imgKey: 'floral', desc: 'Finely ground dried aloe leaves \u2013 rich in fibres and natural constituents.', badge: '', benefits: ['High fibre', 'Natural polysaccharides', 'Exfoliating texture', 'Wholesome profile'], uses: ['Body scrubs', 'Face powders', 'Natural cleansers', 'Detox blends'], tags: ['aloe', 'cosmetic'] },
  { id: 'aloe-butter-product', name: 'Aloe Butter', imgKey: 'carrier', desc: 'Aloe vera infused butter for soothing, moisturising solid formulations.', badge: '', benefits: ['Solid but melts on contact', 'Deep hydration', 'Soothing effect', 'Easy to handle'], uses: ['Lip balms', 'Stick conditioners', 'Solid lotions', 'Baby care'], tags: ['aloe', 'butter', 'cosmetic'] },
  { id: 'extra-virgin-olive-oil', name: 'Extra Virgin Olive Oil', imgKey: 'carrier', desc: 'Cold-pressed carrier oil rich in antioxidants for massage and body care.', badge: '', benefits: ['Rich skin feel', 'Antioxidant story', 'Good glide', 'Vitamin-rich'], uses: ['Massage oils', 'Body oils', 'Balms', 'Skincare'], tags: ['carrier', 'cosmetic', 'wellness'] },
{ id: 'extra-virgin-coconut-oil', name: 'Extra Virgin Coconut Oil', imgKey: 'coconut', desc: 'Fractionated, light carrier oil for skincare, hair oils, and massage blends.', badge: '', benefits: ['Light texture', 'Hair care base', 'Neutral carrier profile', 'Antimicrobial'], uses: ['Hair oils', 'Massage blends', 'Skincare', 'Body oils'], tags: ['carrier', 'cosmetic', 'wellness'] },

  { id: 'jojoba-oil-carrier', name: 'Jojoba Oil', imgKey: 'jojoba', desc: 'Premium wax-like carrier for facial oils and serum bases.', badge: 'Premium', benefits: ['Elegant skin feel', 'Facial care base', 'Stable carrier', 'Mimics sebum'], uses: ['Serums', 'Face oils', 'Beard oils', 'Lip care'], tags: ['carrier', 'premium', 'cosmetic'] },

  { id: 'sweet-almond-oil', name: 'Sweet Almond Oil', imgKey: 'almond', desc: 'Classic nourishing carrier for massage, body oils, and baby-care formulations.', badge: '', benefits: ['Soft glide', 'Nourishing story', 'Mild aroma', 'Vitamin E rich'], uses: ['Massage', 'Body oils', 'Creams', 'Baby care'], tags: ['carrier', 'cosmetic', 'wellness'] },
  { id: 'grapeseed-oil', name: 'Grapeseed Oil', imgKey: 'carrier', desc: 'Lightweight carrier for fast-absorbing skincare and hair formulations.', badge: '', benefits: ['Light finish', 'Good slip', 'Blending base', 'Non-greasy'], uses: ['Serums', 'Massage oils', 'Hair oils', 'Facial mists'], tags: ['carrier', 'cosmetic'] },
  { id: 'neem-oil', name: 'Neem Oil', imgKey: 'carrier', desc: 'Traditional botanical carrier for hair, scalp, and skin-care formulations.', badge: '', benefits: ['Scalp positioning', 'Traditional botanical story', 'Rich texture', 'Antimicrobial'], uses: ['Hair oils', 'Scalp products', 'Skin care', 'Soaps'], tags: ['carrier', 'cosmetic', 'wellness'] },
  { id: 'argan-oil', name: 'Argan Oil', imgKey: 'carrier', desc: 'Premium carrier for luxury hair, beard, and facial care products.', badge: 'Premium', benefits: ['Luxury carrier', 'Hair shine story', 'Facial care base', 'Vitamin-rich'], uses: ['Hair serums', 'Face oils', 'Beard oils', 'Nail care'], tags: ['carrier', 'premium', 'cosmetic'] },
  { id: 'avocado-oil', name: 'Avocado Oil', imgKey: 'avocado', desc: 'Rich, nourishing carrier for creams, body oils, and premium skincare.', badge: '', benefits: ['Rich skin feel', 'Nourishing positioning', 'Body care base', 'Deep penetration'], uses: ['Creams', 'Body oils', 'Massage', 'Hair masks'], tags: ['carrier', 'cosmetic', 'wellness'] },
  { id: 'apricot-kernel-oil', name: 'Apricot Kernel Oil', imgKey: 'carrier', desc: 'Light carrier for facial oils, body care, and massage products.', badge: '', benefits: ['Light glide', 'Facial care base', 'Soft texture', 'Quick absorption'], uses: ['Face oils', 'Massage', 'Body care', 'Lip care'], tags: ['carrier', 'cosmetic'] },
  { id: 'castor-oil', name: 'Castor Oil', imgKey: 'carrier', desc: 'Dense carrier for hair growth positioning, balms, and specialty blends.', badge: 'Best Seller', benefits: ['Thick texture', 'Hair care story', 'Protective feel', 'Shine enhancer'], uses: ['Hair oils', 'Balms', 'Brows and lashes', 'Lip gloss'], tags: ['carrier', 'best', 'cosmetic'] },
  { id: 'moringa-oil', name: 'Moringa Oil', imgKey: 'carrier', desc: 'Stable, premium carrier for facial oils, hair care, and luxury skincare.', badge: 'Premium', benefits: ['Stable carrier', 'Luxury story', 'Silky feel', 'Antioxidant rich'], uses: ['Face oils', 'Hair oils', 'Serums', 'High-end cosmetics'], tags: ['carrier', 'premium', 'cosmetic'] },
  { id: 'sesame-oil', name: 'Sesame Oil', imgKey: 'carrier', desc: 'Traditional carrier for massage, ayurvedic positioning, and body blends.', badge: '', benefits: ['Massage glide', 'Traditional story', 'Warm skin feel', 'Ayurvedic heritage'], uses: ['Massage', 'Body oils', 'Wellness blends', 'Oil pulling'], tags: ['carrier', 'wellness', 'cosmetic'] },
  { id: 'carrot-seed-oil', name: 'Carrot Seed Oil', imgKey: 'carrier', desc: 'Specialty botanical oil for facial care, mature-skin positioning, and serums.', badge: 'Premium', benefits: ['Serum positioning', 'Specialty botanical story', 'Premium carrier', 'Rich in carotene'], uses: ['Face oils', 'Serums', 'Creams', 'Anti-aging formulations'], tags: ['carrier', 'premium', 'cosmetic'] },
];

export function getAllProducts(): Product[] {
  return rawProducts.map((p) => ({
    ...p,
    img: images[p.imgKey] || images.fallback,
    botanicalName: botanicalNames[p.id] || '',
    specs: defaultSpecs(p.tags, p.id),
    gcmsBatchId: gcmsBatchIds[p.id] || null,
    badgeRule: badgeRules[p.id] || null,
    molecules: productMolecules[p.id] || [],
    category: categoryMap[p.id] || 'Other',
  }));
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.id === slug);
}

export function getCategories(): string[] {
  const cats = new Set(getAllProducts().map((p) => p.category));
  return Array.from(cats).sort();
}
