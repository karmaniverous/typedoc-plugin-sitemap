> **PARTIALLY DEPRECATED!** Typedoc's [`hostedBaseUrl`](https://typedoc.org/options/output/#hostedbaseurl) option now generates a sitemap natively. Only use this plugin if you need more control over the sitemap generation process.

<!-- TYPEDOC_EXCLUDE -->

> [API Documentation](https://karmaniverous.github.io/typedoc-plugin-sitemap) • [CHANGELOG](https://github.com/karmaniverous/typedoc-plugin-sitemap/tree/main/CHANGELOG.md)

<!-- /TYPEDOC_EXCLUDE -->

# TypeDoc Sitemap Plugin

Automagically generate a sitemap for your [TypeDoc](https://typedoc.org/) documentation site!

To install:

```bash
npm install -D @karmaniverous/typedoc-plugin-sitemap
```

In your `typedoc.json` configuration file, add the following:

```json
{
  "plugins": ["@karmaniverous/typedoc-plugin-sitemap"],
  "sitemap": {
    "baseUrl": "https://docs.karmanivero.us/typedoc-plugin-sitemap",
    "filename": "sitemap.xml",
    "changeFreq": "weekly",
    "priority": 0.5
  }
}
```

Now run [TypeDoc](https://typedoc.org/) however you usually run it, and your site map will be generated in the root of your output directory!

## Options

| Option       | Type                                                                        | Default         | Description                                                   |
| ------------ | --------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------- |
| `baseUrl`    | `string`                                                                    | _required_      | The base URL of your documentation site.                      |
| `filename`   | `string`                                                                    | `'sitemap.xml'` | The name of the sitemap file.                                 |
| `changeFreq` | `'always' ⏐ 'hourly' ⏐ 'daily' ⏐ 'weekly' ⏐ 'monthly' ⏐ 'yearly' ⏐ 'never'` | `'weekly'`      | How frequently the page is likely to change.                  |
| `priority`   | `number`                                                                    | `0.5`           | The priority of this URL relative to other URLs on your site. |

---

Built for you with ❤️ on Bali! Find more great tools & templates on [my GitHub Profile](https://github.com/karmaniverous).
