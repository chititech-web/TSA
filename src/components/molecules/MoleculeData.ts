export interface MoleculeNode {
  name: string;
  tag: string;
  desc: string;
  therapeutic: string;
  foundIn: string[];
  color: string;
}

export const moleculeData: Record<string, MoleculeNode> = {
  linalool: {
    name:'Linalool', tag:'linalool',
    desc:'The Peace-Seeker. A delicate dance of floral notes and calm.',
    therapeutic:'Anti-inflammatory, sedative, anxiolytic',
    foundIn:['lavender-oil','bergamot-oil','ylang-ylang-oil','basil-oil','geranium-oil','palmarosa-oil','jasmine-oil','spearmint-oil'],
    color:'#9CD596'
  },
  linalyl_acetate: {
    name:'Linalyl Acetate', tag:'linalyl_acetate',
    desc:'The Soother. A fruity-floral ester that defines lavender grade.',
    therapeutic:'Anti-inflammatory, analgesic, calming',
    foundIn:['lavender-oil','bergamot-oil'],
    color:'#A8D8B9'
  },
  'terpinen-4-ol': {
    name:'Terpinen-4-ol', tag:'terpinen-4-ol',
    desc:'The Guardian. The potent, earthy shield within Tea Tree Oil.',
    therapeutic:'Antimicrobial, anti-inflammatory, Acne-fighting',
    foundIn:['tea-tree-oil'],
    color:'#6DB56D'
  },
  menthol: {
    name:'Menthol', tag:'menthol',
    desc:'The Arctic Current. Crisp, sharp, and revitalizing.',
    therapeutic:'Analgesic, cooling, decongestant',
    foundIn:['peppermint-oil-bp','peppermint-oil-ip','spearmint-oil'],
    color:'#A8D8E8'
  },
  '1,8-cineole': {
    name:'1,8-Cineole', tag:'1,8-cineole',
    desc:'The Clearing Force. The defining molecule of respiratory wellness.',
    therapeutic:'Expectorant, anti-inflammatory, antimicrobial',
    foundIn:['eucalyptus-oil','rosemary-oil','tea-tree-oil','peppermint-oil-bp','peppermint-oil-ip','cardamom-oil','camphor-oil'],
    color:'#7FC8E8'
  },
  'alpha-pinene': {
    name:'alpha-Pinene', tag:'alpha-pinene',
    desc:'The Forest Foundation. A terpene that grounds every blend.',
    therapeutic:'Anti-inflammatory, bronchodilator, memory aid',
    foundIn:['eucalyptus-oil','rosemary-oil','frankincense-oil','pine-oil','juniper-berry-oil','grapefruit-oil','camphor-oil','nutmeg-oil'],
    color:'#6BA36B'
  },
  limonene: {
    name:'Limonene', tag:'limonene',
    desc:'The Sunshine Molecule. The bright signature of citrus oils.',
    therapeutic:'Antioxidant, mood-elevating, digestive support',
    foundIn:['lemon-oil','orange-oil','bergamot-oil','grapefruit-oil','lime-oil','mandarin-oil','lemongrass-oil','citronella-oil','frankincense-oil','black-pepper-oil','spearmint-oil','pine-oil','juniper-berry-oil','cardamom-oil','eucalyptus-oil'],
    color:'#F0D060'
  },
  citral: {
    name:'Citral', tag:'citral',
    desc:'The Bright Spark. A lemony aldehyde that defines Lemongrass Oil.',
    therapeutic:'Antimicrobial, anti-inflammatory, uplifting',
    foundIn:['lemongrass-oil'],
    color:'#F0E060'
  },
  geraniol: {
    name:'Geraniol', tag:'geraniol',
    desc:'The Rosy Bridge. A floral-terpene that connects citrus and floral oils.',
    therapeutic:'Antioxidant, mosquito-repellent, uplifting',
    foundIn:['geranium-oil','palmarosa-oil','rose-oil','citronella-oil','lemongrass-oil'],
    color:'#F0A0C0'
  },
  eugenol: {
    name:'Eugenol', tag:'eugenol',
    desc:'The Warm Spice. The fiery heart of Clove Oil and Cinnamon.',
    therapeutic:'Analgesic, antiseptic, antioxidant',
    foundIn:['clove-oil','cinnamon-bark-oil','basil-oil'],
    color:'#D08040'
  },
  'beta-caryophyllene': {
    name:'beta-Caryophyllene', tag:'beta-caryophyllene',
    desc:'The Spicy Healer. A sesquiterpene that binds to CB2 receptors.',
    therapeutic:'Anti-inflammatory, gastroprotective, pain relief',
    foundIn:['clove-oil','frankincense-oil','black-pepper-oil','carrot-seed-oil'],
    color:'#C07050'
  },
  'alpha-santalol': {
    name:'alpha-Santalol', tag:'alpha-santalol',
    desc:'The Wood Heart. The prized sesquiterpene that gives Sandalwood its creamy depth.',
    therapeutic:'Anti-inflammatory, antiviral, calming',
    foundIn:['sandalwood-oil'],
    color:'#C8B090'
  },
  thymol: {
    name:'Thymol', tag:'thymol',
    desc:'The Purifier. The dominant phenol in Thyme Oil with potent antimicrobial action.',
    therapeutic:'Antimicrobial, antifungal, antioxidant',
    foundIn:['thyme-oil','oregano-oil'],
    color:'#A06040'
  },
  chamazulene: {
    name:'Chamazulene', tag:'chamazulene',
    desc:'The Blue Healer. A sesquiterpene formed during distillation that gives Chamomile its deep blue color.',
    therapeutic:'Anti-inflammatory, antiallergic',
    foundIn:['chamomile-oil'],
    color:'#4060C0'
  },
  'oleic_acid': {
    name:'Oleic Acid', tag:'oleic_acid',
    desc:'The Silky Monounsaturate. A skin-nourishing omega-9 found in most carrier oils.',
    therapeutic:'Moisturizing, anti-inflammatory, skin barrier support',
    foundIn:['extra-virgin-olive-oil','sweet-almond-oil','grapeseed-oil','argan-oil','avocado-oil','apricot-kernel-oil','castor-oil','moringa-oil','sesame-oil','carrot-seed-oil','neem-oil'],
    color:'#E8E0D0'
  },
};

export function getAllMolecules(): MoleculeNode[] {
  return Object.values(moleculeData);
}

export function getMolecule(tag: string): MoleculeNode | undefined {
  return moleculeData[tag];
}

type Edge = [string, string];

export function getConstellationEdges(): Edge[] {
  const tags = Object.keys(moleculeData);
  const edges: Edge[] = [];
  for (let i = 0; i < tags.length; i++) {
    for (let j = i + 1; j < tags.length; j++) {
      const a = moleculeData[tags[i]];
      const b = moleculeData[tags[j]];
      const shared = a.foundIn.some((oil) => b.foundIn.includes(oil));
      if (shared) edges.push([tags[i], tags[j]]);
    }
  }
  return edges;
}

export interface WeightedEdge {
  a: string;
  b: string;
  weight: number;
}

export function getWeightedEdges(productMolecules: Record<string, string[]>): WeightedEdge[] {
  const tags = Object.keys(moleculeData);
  const cooc = new Map<string, number>();
  const productList = Object.entries(productMolecules);
  for (const [, mols] of productList) {
    for (let i = 0; i < mols.length; i++) {
      for (let j = i + 1; j < mols.length; j++) {
        const key = [mols[i], mols[j]].sort().join('::');
        cooc.set(key, (cooc.get(key) || 0) + 1);
      }
    }
  }
  const edges: WeightedEdge[] = [];
  for (let i = 0; i < tags.length; i++) {
    for (let j = i + 1; j < tags.length; j++) {
      const key = [tags[i], tags[j]].sort().join('::');
      const w = cooc.get(key) || 0;
      if (w > 0) edges.push({ a: tags[i], b: tags[j], weight: w });
    }
  }
  return edges;
}

export function getMoleculeCounts(productMolecules: Record<string, string[]>): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [, mols] of Object.entries(productMolecules)) {
    for (const m of mols) counts[m] = (counts[m] || 0) + 1;
  }
  return counts;
}

export interface IfraInfo {
  max: string;
  restriction: 'none' | 'low' | 'moderate' | 'strict';
}

export const ifraLimits: Record<string, IfraInfo> = {
  linalool: { max: '20%', restriction: 'low' },
  linalyl_acetate: { max: 'None', restriction: 'none' },
  'terpinen-4-ol': { max: 'None', restriction: 'none' },
  menthol: { max: '5%', restriction: 'moderate' },
  '1,8-cineole': { max: '10%', restriction: 'moderate' },
  'alpha-pinene': { max: 'None', restriction: 'none' },
  limonene: { max: 'None', restriction: 'none' },
  citral: { max: '0.5%', restriction: 'strict' },
  geraniol: { max: '1%', restriction: 'strict' },
  eugenol: { max: '0.5%', restriction: 'strict' },
  'beta-caryophyllene': { max: 'None', restriction: 'none' },
  'alpha-santalol': { max: 'None', restriction: 'none' },
  thymol: { max: '0.1%', restriction: 'strict' },
  chamazulene: { max: 'None', restriction: 'none' },
  oleic_acid: { max: 'None', restriction: 'none' },
};

export const compoundToMolTag: Record<string, string> = {
  Linalool: 'linalool',
  'Linalyl Acetate': 'linalyl_acetate',
  'Terpinen-4-ol': 'terpinen-4-ol',
  Menthol: 'menthol',
  '1,8-Cineole': '1,8-cineole',
  'alpha-Pinene': 'alpha-pinene',
  Limonene: 'limonene',
  Citral: 'citral',
  Geraniol: 'geraniol',
  Eugenol: 'eugenol',
  'beta-Caryophyllene': 'beta-caryophyllene',
  'alpha-Santalol': 'alpha-santalol',
  Thymol: 'thymol',
  Chamazulene: 'chamazulene',
  'Oleic Acid': 'oleic_acid',
  Carvone: 'carvone',
  Camphor: 'camphor',
  Cedrene: 'cedrene',
  Cedrol: 'cedrol',
  'Linoleic Acid': 'linoleic_acid',
  'Lauric Acid': 'lauric_acid',
  'Ricinoleic Acid': 'ricinoleic_acid',
  Myrcene: 'myrcene',
  'gamma-Terpinene': 'gamma-terpinene',
  'beta-Pinene': 'beta-pinene',
};
