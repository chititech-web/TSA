import { PrismaClient } from '@prisma/client';
import { getAllProducts } from '../src/data/products';
import { getAllGcmsData } from '../src/data/gcms';

const prisma = new PrismaClient();

function parseConstituents(constituents: string): { name: string; percentage: string }[] {
  if (!constituents || constituents.startsWith('Varies') || constituents === 'Mixed Fatty Acids') {
    return [];
  }

  return constituents.split(', ').map((part) => {
    const m = part.match(/^(.+?)\s+([\d><+\-–\s]+%?)$/);
    return m
      ? { name: m[1].trim(), percentage: m[2].trim() }
      : { name: part.trim(), percentage: '' };
  });
}

async function main() {
  console.log('Seeding database...');

  const products = getAllProducts();
  const allGcms = getAllGcmsData();

  for (const p of products) {
    console.log(`  Product: ${p.name}`);

    const product = await prisma.product.upsert({
      where: { slug: p.id },
      update: {
        name: p.name,
        botanicalName: p.botanicalName,
        category: p.category,
        description: p.desc,
        extraction: p.specs.extraction,
        refractiveIdx: p.specs.refractiveIndex,
        opticalRot: p.specs.opticalRotation,
        image: p.img,
      },
      create: {
        slug: p.id,
        name: p.name,
        botanicalName: p.botanicalName,
        category: p.category,
        description: p.desc,
        extraction: p.specs.extraction,
        refractiveIdx: p.specs.refractiveIndex,
        opticalRot: p.specs.opticalRotation,
        image: p.img,
      },
    });

    await prisma.productCompound.deleteMany({ where: { productId: product.id } });

    const comps = parseConstituents(p.specs.constituents);
    if (comps.length > 0) {
      await prisma.productCompound.createMany({
        data: comps.map((c) => ({
          productId: product.id,
          name: c.name,
          percentage: c.percentage,
        })),
      });
    }

    if (p.gcmsBatchId) {
      const gcms = allGcms[p.gcmsBatchId];
      if (!gcms) continue;

      let batch = await prisma.batch.findFirst({ where: { batchRef: p.gcmsBatchId } });

      if (batch) {
        batch = await prisma.batch.update({
          where: { id: batch.id },
          data: {
            productId: product.id,
            analysisDate: new Date(gcms.analysis_date),
            purityScore: gcms.purity_score,
          },
        });
      } else {
        batch = await prisma.batch.create({
          data: {
            productId: product.id,
            batchRef: p.gcmsBatchId,
            analysisDate: new Date(gcms.analysis_date),
            purityScore: gcms.purity_score,
          },
        });
      }

      await prisma.batchCompound.deleteMany({ where: { batchId: batch.id } });
      await prisma.batchCompound.createMany({
        data: gcms.compounds.map((c) => ({
          batchId: batch.id,
          name: c.name,
          percentage: String(c.percentage),
        })),
      });

      let analysis = await prisma.gcmsAnalysis.findFirst({
        where: { batchId: batch.id, oil: gcms.oil },
      });

      if (analysis) {
        analysis = await prisma.gcmsAnalysis.update({
          where: { id: analysis.id },
          data: { analysisDate: new Date(gcms.analysis_date) },
        });
      } else {
        analysis = await prisma.gcmsAnalysis.create({
          data: {
            batchId: batch.id,
            oil: gcms.oil,
            analysisDate: new Date(gcms.analysis_date),
          },
        });
      }

      await prisma.gcmsCompound.deleteMany({ where: { analysisId: analysis.id } });
      await prisma.gcmsCompound.createMany({
        data: gcms.compounds.map((c) => ({
          analysisId: analysis.id,
          compound: c.name,
          percentage: String(c.percentage),
        })),
      });
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
