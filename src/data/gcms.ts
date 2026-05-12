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

const gcmsDatabase: Record<string, GcmsEntry> = {
  'TSA-LAV-2026-042': {
    oil:'Lavender Oil', analysis_date:'2026-03-15', purity_score:'99.8%',
    compounds:[
      {name:'Linalyl Acetate', percentage:42.1, status:'Premium'},
      {name:'Linalool', percentage:34.5, status:'Premium'},
      {name:'Lavandulyl Acetate', percentage:3.2, status:'Trace'},
      {name:'1,8-Cineole', percentage:0.8, status:'Low (Desired)'}
    ]
  },
  'TSA-TTO-2026-088': {
    oil:'Tea Tree Oil', analysis_date:'2026-04-01', purity_score:'100%',
    compounds:[
      {name:'Terpinen-4-ol', percentage:44.2, status:'High-Therapeutic'},
      {name:'gamma-Terpinene', percentage:19.5, status:'Standard'},
      {name:'alpha-Terpinene', percentage:9.2, status:'Standard'},
      {name:'1,8-Cineole', percentage:2.1, status:'Low (Non-Irritant)'}
    ]
  },
  'TSA-PEP-2026-031': {
    oil:'Peppermint Oil BP', analysis_date:'2026-02-20', purity_score:'99.5%',
    compounds:[
      {name:'Menthol', percentage:45.3, status:'Premium'},
      {name:'Menthone', percentage:19.8, status:'Standard'},
      {name:'Menthyl Acetate', percentage:5.1, status:'Trace'},
      {name:'1,8-Cineole', percentage:3.2, status:'Low'}
    ]
  },
  'TSA-EUC-2026-017': {
    oil:'Eucalyptus Oil', analysis_date:'2026-01-10', purity_score:'99.9%',
    compounds:[
      {name:'1,8-Cineole', percentage:82.4, status:'High-Therapeutic'},
      {name:'alpha-Pinene', percentage:6.8, status:'Standard'},
      {name:'Limonene', percentage:3.1, status:'Trace'},
      {name:'p-Cymene', percentage:1.5, status:'Trace'}
    ]
  },
  'TSA-SPE-2026-045': {
    oil:'Spearmint Oil', analysis_date:'2026-03-22', purity_score:'99.2%',
    compounds:[
      {name:'Carvone', percentage:67.8, status:'High-Therapeutic'},
      {name:'Limonene', percentage:14.2, status:'Standard'},
      {name:'Linalool', percentage:1.2, status:'Trace'}
    ]
  },
  'TSA-ROS-2026-033': {
    oil:'Rosemary Oil', analysis_date:'2026-02-14', purity_score:'99.4%',
    compounds:[
      {name:'1,8-Cineole', percentage:45.6, status:'High-Therapeutic'},
      {name:'Camphor', percentage:14.8, status:'Standard'},
      {name:'alpha-Pinene', percentage:12.3, status:'Standard'}
    ]
  },
  'TSA-LGR-2026-021': {
    oil:'Lemongrass Oil', analysis_date:'2026-04-05', purity_score:'98.9%',
    compounds:[
      {name:'Citral', percentage:76.2, status:'High-Therapeutic'},
      {name:'Geraniol', percentage:4.8, status:'Trace'},
      {name:'Limonene', percentage:2.1, status:'Trace'}
    ]
  },
  'TSA-CLO-2026-056': {
    oil:'Clove Oil', analysis_date:'2026-01-28', purity_score:'99.7%',
    compounds:[
      {name:'Eugenol', percentage:84.3, status:'High-Therapeutic'},
      {name:'beta-Caryophyllene', percentage:8.6, status:'Standard'}
    ]
  },
  'TSA-SAN-2026-078': {
    oil:'Sandalwood Oil', analysis_date:'2026-05-10', purity_score:'99.6%',
    compounds:[
      {name:'alpha-Santalol', percentage:48.2, status:'Premium'},
      {name:'beta-Santalol', percentage:22.7, status:'Standard'}
    ]
  },
  'TSA-FRA-2026-064': {
    oil:'Frankincense Oil', analysis_date:'2026-04-18', purity_score:'99.1%',
    compounds:[
      {name:'alpha-Pinene', percentage:38.4, status:'High-Therapeutic'},
      {name:'Limonene', percentage:9.2, status:'Standard'},
      {name:'beta-Caryophyllene', percentage:3.6, status:'Trace'}
    ]
  },
  'TSA-LEM-2026-029': {
    oil:'Lemon Oil', analysis_date:'2026-03-01', purity_score:'99.3%',
    compounds:[
      {name:'Limonene', percentage:68.5, status:'High-Therapeutic'},
      {name:'beta-Pinene', percentage:12.4, status:'Standard'},
      {name:'gamma-Terpinene', percentage:6.8, status:'Standard'}
    ]
  },
  'TSA-ORA-2026-037': {
    oil:'Orange Oil', analysis_date:'2026-02-25', purity_score:'99.5%',
    compounds:[
      {name:'Limonene', percentage:94.2, status:'Premium'},
      {name:'Myrcene', percentage:2.1, status:'Trace'}
    ]
  },
  'TSA-BER-2026-012': {
    oil:'Bergamot Oil', analysis_date:'2026-04-12', purity_score:'98.8%',
    compounds:[
      {name:'Limonene', percentage:38.6, status:'Standard'},
      {name:'Linalyl Acetate', percentage:29.4, status:'Standard'},
      {name:'Linalool', percentage:12.1, status:'Standard'}
    ]
  },
  'TSA-CED-2026-019': {
    oil:'Cedarwood Oil', analysis_date:'2026-01-05', purity_score:'99.0%',
    compounds:[
      {name:'Cedrene', percentage:32.8, status:'Standard'},
      {name:'Cedrol', percentage:18.4, status:'Standard'},
      {name:'Thujopsene', percentage:14.2, status:'Standard'}
    ]
  },
  'TSA-PAT-2026-073': {
    oil:'Patchouli Oil', analysis_date:'2026-05-22', purity_score:'99.2%',
    compounds:[
      {name:'Patchoulol', percentage:34.5, status:'Standard'},
      {name:'alpha-Guaiene', percentage:16.8, status:'Standard'},
      {name:'alpha-Bulnesene', percentage:12.4, status:'Standard'}
    ]
  },
  'TSA-CIN-2026-014': {
    oil:'Cinnamon Bark Oil', analysis_date:'2026-03-30', purity_score:'99.4%',
    compounds:[
      {name:'Cinnamaldehyde', percentage:72.6, status:'High-Therapeutic'},
      {name:'Eugenol', percentage:8.4, status:'Standard'}
    ]
  },
  'TSA-CHA-2026-025': {
    oil:'Chamomile Oil', analysis_date:'2026-04-20', purity_score:'98.5%',
    compounds:[
      {name:'Chamazulene', percentage:12.8, status:'Therapeutic'},
      {name:'alpha-Bisabolol', percentage:9.6, status:'Standard'}
    ]
  },
  'TSA-PEP-2026-032': {
    oil:'Peppermint Oil IP', analysis_date:'2026-04-08', purity_score:'99.1%',
    compounds:[
      {name:'Menthol', percentage:38.2, status:'Standard'},
      {name:'Menthone', percentage:22.6, status:'Standard'},
      {name:'1,8-Cineole', percentage:3.8, status:'Low'}
    ]
  },
  'TSA-GRA-2026-041': {
    oil:'Grapeseed Oil', analysis_date:'2026-02-10', purity_score:'99.7%',
    compounds:[
      {name:'Linoleic Acid', percentage:71.5, status:'High-Therapeutic'},
      {name:'Oleic Acid', percentage:16.8, status:'Standard'}
    ]
  },
  'TSA-JOJ-2026-052': {
    oil:'Jojoba Oil', analysis_date:'2026-03-05', purity_score:'99.8%',
    compounds:[
      {name:'Eicosenoic Acid', percentage:68.4, status:'Premium'},
      {name:'Erucic Acid', percentage:14.2, status:'Standard'}
    ]
  },
  'TSA-ALM-2026-008': {
    oil:'Sweet Almond Oil', analysis_date:'2026-01-15', purity_score:'99.6%',
    compounds:[
      {name:'Oleic Acid', percentage:72.8, status:'High-Therapeutic'},
      {name:'Linoleic Acid', percentage:19.4, status:'Standard'}
    ]
  },
  'TSA-COC-2026-015': {
    oil:'Extra Virgin Coconut Oil', analysis_date:'2026-04-25', purity_score:'99.9%',
    compounds:[
      {name:'Lauric Acid', percentage:48.6, status:'Premium'},
      {name:'Caprylic Acid', percentage:9.2, status:'Standard'}
    ]
  },
  'TSA-SPA-2026-046': {
    oil:'Spearmint Oil (Alt)', analysis_date:'2026-03-28', purity_score:'99.1%',
    compounds:[
      {name:'Carvone', percentage:68.2, status:'High-Therapeutic'},
      {name:'Limonene', percentage:12.5, status:'Standard'}
    ]
  },
  'TSA-CIT-2026-018': {
    oil:'Citronella Oil', analysis_date:'2026-02-10', purity_score:'98.8%',
    compounds:[
      {name:'Citronellal', percentage:36.8, status:'Standard'},
      {name:'Geraniol', percentage:18.4, status:'Standard'},
      {name:'Limonene', percentage:4.2, status:'Trace'}
    ]
  },
  'TSA-GIN-2026-024': {
    oil:'Ginger Oil', analysis_date:'2026-03-15', purity_score:'99.3%',
    compounds:[
      {name:'Zingiberene', percentage:32.5, status:'Standard'},
      {name:'beta-Sesquiphellandrene', percentage:18.6, status:'Standard'}
    ]
  },
  'TSA-BAS-2026-010': {
    oil:'Basil Oil', analysis_date:'2026-04-02', purity_score:'99.2%',
    compounds:[
      {name:'Linalool', percentage:48.6, status:'Premium'},
      {name:'Methyl Chavicol', percentage:22.4, status:'Standard'},
      {name:'Eugenol', percentage:6.8, status:'Standard'}
    ]
  },
  'TSA-THY-2026-080': {
    oil:'Thyme Oil', analysis_date:'2026-01-20', purity_score:'99.4%',
    compounds:[
      {name:'Thymol', percentage:52.8, status:'High-Therapeutic'},
      {name:'Carvacrol', percentage:14.2, status:'Standard'},
      {name:'p-Cymene', percentage:8.4, status:'Standard'}
    ]
  },
  'TSA-OREG-2026-062': {
    oil:'Oregano Oil', analysis_date:'2026-02-28', purity_score:'99.5%',
    compounds:[
      {name:'Carvacrol', percentage:68.4, status:'High-Therapeutic'},
      {name:'Thymol', percentage:12.6, status:'Standard'}
    ]
  },
  'TSA-NUT-2026-058': {
    oil:'Nutmeg Oil', analysis_date:'2026-03-10', purity_score:'99.0%',
    compounds:[
      {name:'Sabinene', percentage:32.5, status:'Standard'},
      {name:'Myristicin', percentage:14.8, status:'Standard'},
      {name:'alpha-Pinene', percentage:8.2, status:'Standard'}
    ]
  },
  'TSA-BLP-2026-011': {
    oil:'Black Pepper Oil', analysis_date:'2026-04-15', purity_score:'99.1%',
    compounds:[
      {name:'Piperine', percentage:38.6, status:'Standard'},
      {name:'beta-Caryophyllene', percentage:24.2, status:'Standard'},
      {name:'Limonene', percentage:6.8, status:'Trace'}
    ]
  },
  'TSA-CRD-2026-016': {
    oil:'Cardamom Oil', analysis_date:'2026-03-22', purity_score:'99.3%',
    compounds:[
      {name:'alpha-Terpinyl Acetate', percentage:38.4, status:'Standard'},
      {name:'1,8-Cineole', percentage:22.6, status:'Standard'},
      {name:'Limonene', percentage:5.2, status:'Trace'}
    ]
  },
  'TSA-YLA-2026-086': {
    oil:'Ylang Ylang Oil', analysis_date:'2026-04-28', purity_score:'98.6%',
    compounds:[
      {name:'Linalool', percentage:22.4, status:'Standard'},
      {name:'Geranyl Acetate', percentage:18.6, status:'Standard'},
      {name:'Benzyl Benzoate', percentage:12.8, status:'Standard'}
    ]
  },
  'TSA-GER-2026-023': {
    oil:'Geranium Oil', analysis_date:'2026-02-18', purity_score:'99.0%',
    compounds:[
      {name:'Citronellol', percentage:32.4, status:'Standard'},
      {name:'Geraniol', percentage:22.8, status:'Standard'},
      {name:'Linalool', percentage:4.2, status:'Trace'}
    ]
  },
  'TSA-ROE-2026-070': {
    oil:'Rose Oil', analysis_date:'2026-05-05', purity_score:'99.2%',
    compounds:[
      {name:'Citronellol', percentage:42.6, status:'High-Therapeutic'},
      {name:'Geraniol', percentage:18.4, status:'Standard'},
      {name:'Nerol', percentage:12.2, status:'Standard'}
    ]
  },
  'TSA-JAS-2026-028': {
    oil:'Jasmine Oil', analysis_date:'2026-03-12', purity_score:'98.4%',
    compounds:[
      {name:'Benzyl Acetate', percentage:28.6, status:'Standard'},
      {name:'Linalool', percentage:18.4, status:'Standard'},
      {name:'Methyl Anthranilate', percentage:8.2, status:'Standard'}
    ]
  },
  'TSA-PAL-2026-065': {
    oil:'Palmarosa Oil', analysis_date:'2026-04-08', purity_score:'99.4%',
    compounds:[
      {name:'Geraniol', percentage:72.4, status:'Premium'},
      {name:'Linalool', percentage:6.8, status:'Trace'}
    ]
  },
  'TSA-VET-2026-084': {
    oil:'Vetiver Oil', analysis_date:'2026-02-25', purity_score:'98.9%',
    compounds:[
      {name:'Vetiverol', percentage:38.2, status:'Standard'},
      {name:'Vetivone', percentage:22.6, status:'Standard'},
      {name:'Khusimol', percentage:12.4, status:'Standard'}
    ]
  },
  'TSA-JUN-2026-030': {
    oil:'Juniper Berry Oil', analysis_date:'2026-01-30', purity_score:'99.5%',
    compounds:[
      {name:'alpha-Pinene', percentage:38.6, status:'High-Therapeutic'},
      {name:'Myrcene', percentage:18.4, status:'Standard'},
      {name:'Limonene', percentage:6.2, status:'Trace'}
    ]
  },
  'TSA-GRF-2026-022': {
    oil:'Grapefruit Oil', analysis_date:'2026-03-18', purity_score:'99.3%',
    compounds:[
      {name:'Limonene', percentage:88.6, status:'Premium'},
      {name:'Myrcene', percentage:4.2, status:'Trace'},
      {name:'alpha-Pinene', percentage:2.8, status:'Trace'}
    ]
  },
  'TSA-LIM-2026-038': {
    oil:'Lime Oil', analysis_date:'2026-02-08', purity_score:'99.1%',
    compounds:[
      {name:'Limonene', percentage:62.4, status:'High-Therapeutic'},
      {name:'beta-Pinene', percentage:14.8, status:'Standard'}
    ]
  },
  'TSA-MAN-2026-040': {
    oil:'Mandarin Oil', analysis_date:'2026-04-22', purity_score:'99.4%',
    compounds:[
      {name:'Limonene', percentage:72.6, status:'High-Therapeutic'},
      {name:'gamma-Terpinene', percentage:6.8, status:'Standard'}
    ]
  },
  'TSA-OLI-2026-061': {
    oil:'Extra Virgin Olive Oil', analysis_date:'2026-01-12', purity_score:'99.7%',
    compounds:[
      {name:'Oleic Acid', percentage:68.4, status:'High-Therapeutic'},
      {name:'Linoleic Acid', percentage:12.8, status:'Standard'}
    ]
  },
  'TSA-ARG-2026-007': {
    oil:'Argan Oil', analysis_date:'2026-04-30', purity_score:'99.6%',
    compounds:[
      {name:'Oleic Acid', percentage:46.8, status:'Standard'},
      {name:'Linoleic Acid', percentage:34.2, status:'Standard'}
    ]
  },
  'TSA-AVO-2026-009': {
    oil:'Avocado Oil', analysis_date:'2026-03-25', purity_score:'99.5%',
    compounds:[
      {name:'Oleic Acid', percentage:62.4, status:'High-Therapeutic'},
      {name:'Palmitic Acid', percentage:18.6, status:'Standard'}
    ]
  },
  'TSA-APR-2026-006': {
    oil:'Apricot Kernel Oil', analysis_date:'2026-02-14', purity_score:'99.3%',
    compounds:[
      {name:'Oleic Acid', percentage:64.8, status:'High-Therapeutic'},
      {name:'Linoleic Acid', percentage:26.4, status:'Standard'}
    ]
  },
  'TSA-CAS-2026-013': {
    oil:'Castor Oil', analysis_date:'2026-05-08', purity_score:'99.8%',
    compounds:[
      {name:'Ricinoleic Acid', percentage:86.4, status:'Premium'},
      {name:'Oleic Acid', percentage:6.8, status:'Trace'}
    ]
  },
  'TSA-MOR-2026-050': {
    oil:'Moringa Oil', analysis_date:'2026-01-22', purity_score:'99.4%',
    compounds:[
      {name:'Oleic Acid', percentage:72.4, status:'High-Therapeutic'},
      {name:'Behenic Acid', percentage:7.2, status:'Standard'}
    ]
  },
  'TSA-SES-2026-075': {
    oil:'Sesame Oil', analysis_date:'2026-04-05', purity_score:'99.2%',
    compounds:[
      {name:'Oleic Acid', percentage:42.6, status:'Standard'},
      {name:'Linoleic Acid', percentage:38.4, status:'Standard'}
    ]
  },
  'TSA-NEE-2026-057': {
    oil:'Neem Oil', analysis_date:'2026-02-20', purity_score:'98.5%',
    compounds:[
      {name:'Nimbin', percentage:28.6, status:'Standard'},
      {name:'Azadirachtin', percentage:18.4, status:'Standard'}
    ]
  },
  'TSA-WIN-2026-085': {
    oil:'Wintergreen Oil', analysis_date:'2026-03-08', purity_score:'99.9%',
    compounds:[
      {name:'Methyl Salicylate', percentage:98.4, status:'Premium'}
    ]
  },
  'TSA-CPH-2026-013': {
    oil:'Camphor Oil', analysis_date:'2026-04-18', purity_score:'99.0%',
    compounds:[
      {name:'Camphor', percentage:48.6, status:'High-Therapeutic'},
      {name:'1,8-Cineole', percentage:22.4, status:'Standard'},
      {name:'alpha-Pinene', percentage:8.2, status:'Standard'}
    ]
  },
  'TSA-PIN-2026-066': {
    oil:'Pine Oil', analysis_date:'2026-02-05', purity_score:'99.2%',
    compounds:[
      {name:'alpha-Pinene', percentage:48.6, status:'High-Therapeutic'},
      {name:'beta-Pinene', percentage:22.4, status:'Standard'},
      {name:'Limonene', percentage:6.8, status:'Trace'}
    ]
  },
  'TSA-CRS-2026-017': {
    oil:'Carrot Seed Oil', analysis_date:'2026-05-15', purity_score:'99.1%',
    compounds:[
      {name:'Oleic Acid', percentage:42.6, status:'Standard'},
      {name:'Petroselinic Acid', percentage:28.4, status:'Standard'},
      {name:'beta-Caryophyllene', percentage:4.2, status:'Trace'}
    ]
  },
  'TSA-MEN-2026-048': {
    oil:'Menthol Crystals', analysis_date:'2026-04-12', purity_score:'99.9%',
    compounds:[
      {name:'Menthol', percentage:99.5, status:'Premium'}
    ]
  },
  'TSA-DMO-2026-026': {
    oil:'Dementholised Mint Oil', analysis_date:'2026-03-05', purity_score:'99.0%',
    compounds:[
      {name:'Menthone', percentage:42.6, status:'Standard'},
      {name:'Limonene', percentage:8.4, status:'Trace'},
      {name:'Menthol', percentage:2.8, status:'Trace'}
    ]
  },
  'TSA-PIP-2026-067': {
    oil:'Pine Oil Pumilio', analysis_date:'2026-02-18', purity_score:'99.2%',
    compounds:[
      {name:'alpha-Pinene', percentage:42.8, status:'High-Therapeutic'},
      {name:'Limonene', percentage:12.6, status:'Standard'},
      {name:'beta-Pinene', percentage:8.2, status:'Standard'}
    ]
  },
  'TSA-MTP-2026-049': {
    oil:'Mint Terpene', analysis_date:'2026-04-15', purity_score:'99.3%',
    compounds:[
      {name:'Menthol', percentage:35.2, status:'Standard'},
      {name:'Menthone', percentage:28.6, status:'Standard'},
      {name:'Limonene', percentage:6.4, status:'Trace'}
    ]
  },
  'TSA-CSY-2026-014': {
    oil:'Camphor Synthetic', analysis_date:'2026-01-25', purity_score:'99.8%',
    compounds:[
      {name:'Camphor', percentage:99.2, status:'Premium'}
    ]
  },
  'TSA-TUR-2026-082': {
    oil:'Turpentine Oil', analysis_date:'2026-03-20', purity_score:'99.0%',
    compounds:[
      {name:'alpha-Pinene', percentage:58.4, status:'High-Therapeutic'},
      {name:'Limonene', percentage:12.8, status:'Standard'}
    ]
  },
  'TSA-THYL-2026-081': {
    oil:'Thymol (Pure)', analysis_date:'2026-05-02', purity_score:'99.9%',
    compounds:[
      {name:'Thymol', percentage:99.6, status:'Premium'}
    ]
  },
  'TSA-SHB-2026-074': {
    oil:'Shea Butter', analysis_date:'2026-02-28', purity_score:'99.4%',
    compounds:[
      {name:'Oleic Acid', percentage:48.6, status:'Standard'},
      {name:'Linoleic Acid', percentage:6.2, status:'Trace'}
    ]
  },
  'TSA-MGB-2026-044': {
    oil:'Mango Butter', analysis_date:'2026-03-12', purity_score:'99.1%',
    compounds:[
      {name:'Oleic Acid', percentage:46.8, status:'Standard'},
      {name:'Linoleic Acid', percentage:4.8, status:'Trace'}
    ]
  },
  'TSA-COB-2026-016': {
    oil:'Cocoa Butter', analysis_date:'2026-04-08', purity_score:'99.3%',
    compounds:[
      {name:'Oleic Acid', percentage:34.2, status:'Standard'},
      {name:'Linoleic Acid', percentage:3.2, status:'Trace'}
    ]
  },
  'TSA-AVB-2026-009': {
    oil:'Avocado Butter', analysis_date:'2026-01-18', purity_score:'99.2%',
    compounds:[
      {name:'Oleic Acid', percentage:56.4, status:'High-Therapeutic'},
      {name:'Linoleic Acid', percentage:8.6, status:'Standard'}
    ]
  },
  'TSA-MUR-2026-053': {
    oil:'Murumuru Butter', analysis_date:'2026-05-20', purity_score:'99.0%',
    compounds:[
      {name:'Lauric Acid', percentage:44.8, status:'Standard'},
      {name:'Oleic Acid', percentage:12.6, status:'Standard'}
    ]
  }
};

export function getGcmsData(batchId: string): GcmsEntry | undefined {
  return gcmsDatabase[batchId];
}

export function getAllGcmsData(): Record<string, GcmsEntry> {
  return gcmsDatabase;
}
