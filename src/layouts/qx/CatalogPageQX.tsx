import Link from 'next/link';
import type { CatalogData } from '@/types/catalog';
import type { GlobalConfig } from '@/lib/catalog-loader';
import CatalogNav from '@/components/catalog/CatalogNav';
import CatalogMotion from '@/components/catalog/CatalogMotion';
import HeroQX from './HeroQX';
import OverviewQX from './OverviewQX';
import GalleryQX from './GalleryQX';
import VariantsQX from './VariantsQX';
import DimensionsQX from './DimensionsQX';
import MaterialsQX from './MaterialsQX';
import FeaturesQX from './FeaturesQX';
import AssemblyQX from './AssemblyQX';
import PackshotsQX from './PackshotsQX';
import ProductCodesQX from './ProductCodesQX';

interface Props {
  catalog: CatalogData;
  globalConfig: GlobalConfig;
}

const FOOTER_CATALOG_LINKS = Array.from({ length: 8 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    href: `/catalog/QX-${number}`,
    label: `Catalog ${number}`,
  };
});

export default function CatalogPageQX({ catalog, globalConfig }: Props) {
  const themeClassName = catalog.meta.theme
    ? `catalog-${catalog.meta.theme}`
    : undefined;
  const pageClassName = [themeClassName, 'catalog-motion-slow']
    .filter(Boolean)
    .join(' ');

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
          brandLogoSrc="/catalogs/QX/metro_logo.svg"
          variant="qx0"
        />

        <main
          id="main-content"
          lang="en"
          className="[&>section+section]:mt-[240px]"
        >
          <HeroQX data={catalog.hero} />
          <OverviewQX data={catalog.overview} />
          <GalleryQX data={catalog.gallery} />
          <VariantsQX
            data={catalog.variants}
            configurator={catalog.materials.configurator}
          />
          {catalog.packshots && <PackshotsQX data={catalog.packshots} />}
          <DimensionsQX data={catalog.dimensions} />
          <MaterialsQX data={catalog.materials} />
          <FeaturesQX data={catalog.features} />
          <AssemblyQX data={catalog.assembly} />
          <ProductCodesQX data={catalog.assembly} />
        </main>

        <footer className="h-[240px] bg-[#f4f4f4]">
          <nav
            aria-label="Other catalogues"
            className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-2 gap-3 px-5 py-10 sm:grid-cols-4 sm:px-8 lg:grid-cols-8 lg:px-0"
          >
            {FOOTER_CATALOG_LINKS.map((catalogLink) => (
              <Link
                key={catalogLink.href}
                href={catalogLink.href}
                className="flex h-full min-h-0 items-center justify-center border border-black/10 bg-white/55 px-3 text-center font-display text-sm font-bold uppercase text-foreground/65 transition-colors hover:border-black/30 hover:bg-white hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                {catalogLink.label}
              </Link>
            ))}
          </nav>
        </footer>
      </CatalogMotion>
    </div>
  );
}
