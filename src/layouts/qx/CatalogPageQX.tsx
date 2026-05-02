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

interface Props {
  catalog: CatalogData;
  globalConfig: GlobalConfig;
}

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
        </main>
      </CatalogMotion>
    </div>
  );
}
