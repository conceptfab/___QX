import Link from 'next/link';
import { getCatalogList, getGlobalConfig } from '@/lib/catalog-loader';

export default async function HomePage() {
  const [catalogs, globalConfig] = await Promise.all([
    getCatalogList(),
    getGlobalConfig(),
  ]);

  return (
    <main className="variant-list-page mx-auto max-w-[1440px] px-6 py-16 sm:px-8">
      <header className="mb-12">
        <h1 className="font-display text-4xl">{globalConfig.siteTitle}</h1>
        <p className="mt-3 text-muted-foreground">{globalConfig.siteSubtitle}</p>
        <h2 className="mt-12 font-display text-xl uppercase tracking-widest">
          {globalConfig.catalogListTitle}
        </h2>
      </header>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {catalogs.map((catalog) => (
          <li key={catalog.id}>
            <Link
              href={`/catalog/${catalog.id}`}
              className={`variant-tile variant-tile-${catalog.meta.theme ?? 'qx0'} block p-6`}
            >
              <p className="variant-tile-meta">{catalog.meta.collectionName}</p>
              <h3 className="variant-tile-title mt-2">{catalog.meta.title}</h3>
              <p className="variant-tile-cta mt-4 text-sm">
                {catalog.meta.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="mt-24 text-xs uppercase tracking-widest text-muted-foreground/60">
        {globalConfig.footerText}
      </footer>
    </main>
  );
}
