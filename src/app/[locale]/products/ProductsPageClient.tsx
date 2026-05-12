'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@/data/products';
import { gcmsBatchIds } from '@/data/products';
import { getAllGcmsData } from '@/data/gcms';
import {
  moleculeData,
  getMoleculeCounts,
  getWeightedEdges,
  compoundToMolTag,
} from '@/components/molecules/MoleculeData';
import { MolecularExplorer3D } from '@/components/molecules/MolecularExplorer3D';
import { MolDetailPanel } from '@/components/molecules/MolDetailPanel';
import { MolComparePanel } from '@/components/molecules/MolComparePanel';
import { ChemicalSignature } from '@/components/molecules/ChemicalSignature';
import { ProductGridInner } from '@/components/products/ProductGridInner';
import {
  Search,
  X,
  FlaskConical,
  ArrowDown,
  Shield,
  Volume2,
  VolumeX,
  GitCompare,
  Beaker,
  LayoutGrid,
} from 'lucide-react';

export function ProductsPageClient({
  products,
  categories,
  locale,
}: {
  products: Product[];
  categories: string[];
  locale: string;
}) {
  const t = useTranslations('products');
  const [activeMol, setActiveMol] = useState('');
  const [hoveredMol, setHoveredMol] = useState<string | null>(null);
  const [molSearch, setMolSearch] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [compareMols, setCompareMols] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showChemSig, setShowChemSig] = useState(false);
  const [showIFRA, setShowIFRA] = useState(false);
  const [sonifier, setSonifier] = useState(false);
  const [viewMode, setViewMode] = useState<string>('split');

  // Build productMolecules lookup from products
  const productMols = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const p of products) {
      map[p.id] = p.molecules;
    }
    return map;
  }, [products]);

  const moleculeCounts = useMemo(
    () => getMoleculeCounts(productMols),
    [productMols],
  );

  const weightedEdges = useMemo(
    () => getWeightedEdges(productMols),
    [productMols],
  );

  const moleculeList = useMemo(() => {
    const seen = new Set<string>();
    for (const p of products) {
      for (const m of p.molecules) seen.add(m);
    }
    return Array.from(seen).sort((a, b) => {
      const na = moleculeData[a]?.name || a;
      const nb = moleculeData[b]?.name || b;
      return na.localeCompare(nb);
    });
  }, [products]);

  const filteredMolSearch = useMemo(() => {
    const q = molSearch.toLowerCase().trim();
    if (!q) return moleculeList;
    return moleculeList.filter((tag) => {
      const info = moleculeData[tag];
      return (info?.name || tag).toLowerCase().includes(q);
    });
  }, [molSearch, moleculeList]);

  const activeMolInfo = activeMol ? moleculeData[activeMol] : null;
  const productsWithMol = activeMol
    ? products.filter((p) => p.molecules.includes(activeMol))
    : [];

  // GCMS concentration lookup
  const gcmsDb = useMemo(() => getAllGcmsData(), []);

  // Mol tag to product slug to concentration
  const molConc = useMemo(() => {
    const result: Record<string, Record<string, number>> = {};
    for (const [slug, batchId] of Object.entries(gcmsBatchIds)) {
      const entry = gcmsDb[batchId];
      if (!entry) continue;
      for (const comp of entry.compounds) {
        const tag = compoundToMolTag[comp.name];
        if (!tag) continue;
        if (!result[tag]) result[tag] = {};
        result[tag][slug] = comp.percentage;
      }
    }
    return result;
  }, [gcmsDb]);

  const handleSelectMol = (tag: string) => {
    setActiveMol(tag === activeMol ? '' : tag);
    if (tag) setShowDetail(true);
  };

  const handleHoverMol = (tag: string | null) => {
    setHoveredMol(tag);
  };

  const handleCompare = (tag: string) => {
    if (!compareMols.includes(tag)) {
      setCompareMols([...compareMols, tag].slice(0, 3));
    }
    setShowCompare(true);
  };

  const handleRemoveCompare = (tag: string) => {
    const next = compareMols.filter((t) => t !== tag);
    setCompareMols(next);
    if (next.length === 0) setShowCompare(false);
  };

  const isGridOnly = viewMode === 'grid';

  return (
    <>
      {/* Molecular Atlas — Hero Section */}
      {!isGridOnly && (
        <section className="relative pt-20 pb-0 px-6 overflow-hidden">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(191,111,0,0.1)] border border-[rgba(191,111,0,0.2)] text-[var(--color-primary)] text-[0.625rem] font-bold uppercase tracking-[0.12em] mb-4">
                <FlaskConical size={12} />
                Molecular Atlas
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4rem)] leading-[1.04] tracking-[-0.02em] mb-3">
                The Geometry of Scent
              </h1>
              <p className="text-sm text-[var(--color-muted)] max-w-[560px] mx-auto leading-relaxed">
                Every oil is a constellation of molecules. Explore the interactive map — click a node or filter below to discover which oils contain it.
              </p>
            </div>

            {/* 3D Explorer */}
            <div className="mb-6">
              <MolecularExplorer3D
                selectedMol={activeMol || null}
                onSelectMol={handleSelectMol}
                hoveredMol={hoveredMol}
                onHoverMol={handleHoverMol}
                moleculeCounts={moleculeCounts}
                weightedEdges={weightedEdges}
                molTags={moleculeList}
                showIFRA={showIFRA}
                sonifierEnabled={sonifier}
              />
            </div>

            {/* Molecule search + pills */}
            <div className="pb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1 max-w-[300px]">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" />
                  <input
                    type="text"
                    value={molSearch}
                    onChange={(e) => setMolSearch(e.target.value)}
                    placeholder="Search molecules..."
                    className="w-full h-9 pl-8 pr-8 rounded-full bg-[var(--color-surface-1)] border border-[var(--color-border)] text-xs text-[var(--color-text-main)] placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                  {molSearch && (
                    <button onClick={() => setMolSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-text-main)]">
                      <X size={12} />
                    </button>
                  )}
                </div>
                {activeMol && (
                  <button
                    onClick={() => { setActiveMol(''); setShowDetail(false); }}
                    className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text-main)] underline underline-offset-2 transition-colors"
                  >
                    Clear filter
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {filteredMolSearch.map((tag) => {
                  const info = moleculeData[tag];
                  const color = info?.color || '#888';
                  const isActive = activeMol === tag;
                  const count = moleculeCounts[tag] || 0;
                  return (
                    <button
                      key={tag}
                      onClick={() => handleSelectMol(tag)}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5"
                      style={{
                        borderColor: isActive ? color : 'var(--color-border)',
                        backgroundColor: isActive ? `${color}20` : 'transparent',
                        color: isActive ? color : 'var(--color-muted)',
                        borderWidth: 1,
                        borderStyle: 'solid',
                      }}
                    >
                      {info?.name || tag}
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{
                          background: isActive ? `${color}30` : 'var(--color-surface-1)',
                          opacity: 0.8,
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Toolbar */}
      {!isGridOnly && (
        <div className="flex items-center gap-2 px-6 py-2 border-y border-[var(--color-border)] bg-[var(--color-surface-1)]/50">
          <div className="max-w-[1200px] mx-auto w-full flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-bold mr-2">
              Tools
            </span>

            {/* Sonifier */}
            <button
              onClick={() => setSonifier(!sonifier)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                sonifier
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'border border-[var(--color-border)] text-[var(--color-muted)]'
              }`}
            >
              {sonifier ? <Volume2 size={11} /> : <VolumeX size={11} />}
              Sonifier
            </button>

            {/* IFRA */}
            <button
              onClick={() => setShowIFRA(!showIFRA)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                showIFRA
                  ? 'bg-[var(--color-brand-red)] text-white'
                  : 'border border-[var(--color-border)] text-[var(--color-muted)]'
              }`}
            >
              <Shield size={11} />
              IFRA
            </button>

            {/* Chemical Signature */}
            <button
              onClick={() => setShowChemSig(!showChemSig)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                showChemSig
                  ? 'bg-[var(--color-accent-green)] text-white'
                  : 'border border-[var(--color-border)] text-[var(--color-muted)]'
              }`}
            >
              <Beaker size={11} />
              Chem Sig
            </button>

            {/* Compare (show count if active) */}
            <button
              onClick={() => setShowCompare(!showCompare)}
              disabled={compareMols.length === 0}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                showCompare
                  ? 'bg-[var(--color-secondary)] text-white'
                  : 'border border-[var(--color-border)] text-[var(--color-muted)] disabled:opacity-30'
              }`}
            >
              <GitCompare size={11} />
              Compare
              {compareMols.length > 0 && (
                <span className="ml-0.5">({compareMols.length})</span>
              )}
            </button>

            <span className="text-[var(--color-border)] mx-1">|</span>

            {/* View modes */}
            <button
              onClick={() => setViewMode('split')}
              className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                viewMode === 'split'
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-muted)]'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('immersive')}
              className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                viewMode === 'immersive'
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-muted)]'
              }`}
            >
              Immersive
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-muted)]'
              }`}
            >
              <LayoutGrid size={11} />
              Grid
            </button>
          </div>
        </div>
      )}

      {/* Active molecule context bar */}
      {activeMolInfo && !isGridOnly && (
        <div className="sticky top-0 z-20 px-6 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-base)]/90 backdrop-blur-lg">
          <div className="max-w-[1200px] mx-auto flex items-center gap-4">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: activeMolInfo.color }} />
            <span className="text-sm font-bold">{activeMolInfo.name}</span>
            <span className="text-xs text-[var(--color-muted)] hidden sm:block">
              {activeMolInfo.therapeutic}
            </span>
            <span className="text-xs text-[var(--color-primary)] ml-auto">
              {productsWithMol.length} oil{productsWithMol.length !== 1 ? 's' : ''} • Viewing filtered results
            </span>
            <button
              onClick={() => { setActiveMol(''); setShowDetail(false); }}
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text-main)] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3 px-6 py-4 text-[0.625rem] text-[var(--color-muted)] font-bold uppercase tracking-[0.12em]">
        <span>Browse all oils</span>
        <ArrowDown size={12} />
      </div>

      {/* Product Grid */}
      <ProductGridInner
        products={products}
        categories={categories}
        locale={locale}
        activeMol={activeMol}
        onClearMol={() => { setActiveMol(''); setShowDetail(false); }}
        highlightMol={hoveredMol || activeMol || null}
      />

      {/* Detail Panel (slide-out) */}
      {activeMol && showDetail && (
        <MolDetailPanel
          molTag={activeMol}
          products={products}
          gcmsBatchIds={gcmsBatchIds}
          onClose={() => setShowDetail(false)}
          onCompare={handleCompare}
        />
      )}

      {/* Compare Panel (modal) */}
      {showCompare && compareMols.length > 0 && (
        <MolComparePanel
          compareMols={compareMols}
          products={products}
          gcmsBatchIds={gcmsBatchIds}
          onRemove={handleRemoveCompare}
          onClose={() => setShowCompare(false)}
        />
      )}

      {/* Chemical Signature Panel (modal) */}
      {showChemSig && (
        <ChemicalSignature
          products={products}
          gcmsBatchIds={gcmsBatchIds}
          onClose={() => setShowChemSig(false)}
        />
      )}
    </>
  );
}
