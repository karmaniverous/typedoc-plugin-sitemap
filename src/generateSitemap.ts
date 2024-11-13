import fs from 'fs-extra';
import path from 'path';
import type { Application, RendererEvent } from 'typedoc';

import type { SitemapPluginOptions } from './PluginOptions';

const changeFreqValues = [
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
];

/**
 * Generates the sitemap.xml file
 * @param app - TypeDoc Application instance
 * @param context - RendererEvent context
 */
export const generateSitemap = (app: Application, context: RendererEvent) => {
  const {
    baseUrl,
    filename = 'sitemap.xml',
    changeFreq = 'weekly',
    priority = 0.5,
  } = app.options.getValue('sitemap') as SitemapPluginOptions;

  if (!baseUrl) {
    app.logger.warn(
      "'sitemap.baseUrl' is not set. Skipping sitemap generation.",
    );
    return;
  }

  if (!changeFreqValues.includes(changeFreq)) {
    app.logger.warn(
      "'sitemap.changeFreq' is not valid. Skipping sitemap generation.",
    );
    return;
  }

  const outputDir = context.outputDirectory;

  if (!outputDir) {
    app.logger.warn(
      'Output directory is not defined. Skipping sitemap generation.',
    );
    return;
  }

  const urls: { loc: string; lastmod: string }[] = [];

  /**
   * Recursively walks through the directory to find .html files.
   * @param currentDir - The directory to traverse.
   */
  function walk(currentDir: string) {
    const files = fs.readdirSync(currentDir);
    files.forEach((file: string) => {
      const filePath: string = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walk(filePath);
      } else if (file.toLowerCase().endsWith('.html')) {
        const relativePath = path
          .relative(outputDir, filePath)
          .split(path.sep)
          .join('/'); // Ensure URL uses forward slashes

        // Skip index.html as it typically maps to the base URL
        if (relativePath === 'index.html') {
          urls.push({ loc: baseUrl, lastmod: stat.mtime.toISOString() });
        } else {
          const url = `${baseUrl}/${relativePath.replace(/\.html$/, '')}`;
          const lastModified = stat.mtime.toISOString();
          urls.push({ loc: url, lastmod: lastModified });
        }
      }
    });
  }

  walk(outputDir);

  if (urls.length === 0) {
    app.logger.warn('No HTML files found. Sitemap will not be generated.');
    return;
  }

  // Generate XML sitemap content
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(({ loc, lastmod }) => {
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority.toString()}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  // Write sitemap.xml to the output directory
  const sitemapPath = path.join(outputDir, filename);
  try {
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    app.logger.info(`Sitemap generated successfully at ${sitemapPath}`);
  } catch (err) {
    app.logger.error(`Failed to write sitemap: ${err as Error}`);
  }
};
