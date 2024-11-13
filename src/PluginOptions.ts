/**
 * Plugin congiguration.
 */
export interface SitemapPluginOptions {
  /**
   * The base URL of the documentation site (e.g., https://yourdomain.com/docs)
   */
  baseUrl: string;

  /**
   * The filename for the sitemap. Defaults to 'sitemap.xml'
   */
  filename?: string;

  /**
   * The frequency at which the content changes. Defaults to 'weekly'
   */
  changeFreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';

  /**
   * The priority of the pages. Defaults to 0.5
   */
  priority?: number;
}
