import { notFound } from 'next/navigation';
import {
  loadCatalog,
  getGlobalConfig,
  getCatalogList,
} from '@/lib/catalog-loader';
import type { Metadata } from 'next';
import CatalogNav from '@/components/catalog/CatalogNav';
import HeroSection from '@/components/catalog/HeroSection';
import OverviewSection from '@/components/catalog/OverviewSection';
import GallerySection from '@/components/catalog/GallerySection';
import VariantsSection from '@/components/catalog/VariantsSection';
import DimensionsSection from '@/components/catalog/DimensionsSection';
import MaterialsSection from '@/components/catalog/MaterialsSection';
import FeaturesSection from '@/components/catalog/FeaturesSection';
import AssemblySection from '@/components/catalog/AssemblySection';
import PackshotsSection from '@/components/catalog/PackshotsSection';
import CatalogMotion from '@/components/catalog/CatalogMotion';

export async function generateStaticParams() {
  const catalogs = await getCatalogList();
  return catalogs.map((catalog) => ({
    catalogId: catalog.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ catalogId: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const catalog = await loadCatalog(resolvedParams.catalogId);
  if (!catalog) return {};

  const variantName = resolvedParams.catalogId
    ? resolvedParams.catalogId.toUpperCase()
    : '';
  return {
    title: `${variantName} - ${catalog.meta.title}`,
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ catalogId: string }>;
}) {
  const resolvedParams = await params;
  const catalogId = resolvedParams.catalogId;
  const [catalog, globalConfig] = await Promise.all([
    loadCatalog(catalogId),
    getGlobalConfig(),
  ]);

  if (!catalog) {
    notFound();
  }

  const themeClassName = catalog.meta.theme
    ? `catalog-${catalog.meta.theme}`
    : undefined;
  const pageClassName = [themeClassName, 'catalog-motion-slow']
    .filter(Boolean)
    .join(' ');
  const navVariant = catalog.meta.theme === 'qx0' ? 'qx0' : 'default';
  const normalizedCatalogId = catalogId?.toUpperCase();
  const isQx0 = normalizedCatalogId === 'QX';

  return (
    <div className={pageClassName}>
      <CatalogMotion>
        <a href="#overview" className="skip-link">
          Skip to main content
        </a>

        <CatalogNav
          sections={catalog.sections}
          brandLabel={(
            globalConfig?.brandName ?? catalog.hero.brandLabel
          ).toUpperCase()}
          brandLogoSrc={isQx0 ? '/catalogs/QX/metro_logo.svg' : undefined}
          variant={navVariant}
        />

        <main id="main-content" lang="en">
          <HeroSection data={catalog.hero} catalogId={catalogId} />
          <OverviewSection data={catalog.overview} />
          <GallerySection data={catalog.gallery} />
          <VariantsSection data={catalog.variants} />
          {catalog.packshots && <PackshotsSection data={catalog.packshots} />}
          <DimensionsSection data={catalog.dimensions} />
          <MaterialsSection data={catalog.materials} />
          <FeaturesSection data={catalog.features} />
          <AssemblySection data={catalog.assembly} />
        </main>
      </CatalogMotion>
    </div>
  );
}
