import { type Application, ParameterType, RendererEvent } from 'typedoc';

import { generateSitemap } from './generateSitemap';

/**
 * Sitemap Plugin for TypeDoc
 */
export const load = (app: Application) => {
  // Register the plugin's options
  app.options.addDeclaration({
    name: 'sitemap',
    type: ParameterType.Object,
    help: 'Configuration for sitemap generation',
    defaultValue: [
      {
        name: 'baseUrl',
        type: ParameterType.String,
        help: 'Base URL for the sitemap (e.g., https://yourdomain.com/docs)',
      },
      {
        name: 'filename',
        type: ParameterType.String,
        help: 'Filename for the generated sitemap (default: sitemap.xml)',
        defaultValue: 'sitemap.xml',
      },
      {
        name: 'changeFreq',
        type: ParameterType.String,
        help: 'Change frequency for sitemap entries (default: monthly)',
        defaultValue: 'monthly',
      },
      {
        name: 'priority',
        type: ParameterType.Number,
        help: 'Priority for sitemap entries (default: 0.5)',
        defaultValue: 0.5,
      },
    ],
  });

  // Hook into the 'end' event of the rendering process
  app.renderer.on(RendererEvent.END, (context: RendererEvent) => {
    generateSitemap(app, context);
  });
};
