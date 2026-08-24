/**
 * build-sitemap.mjs
 * ---------------------------------------------------------------
 * Regenerates public/sitemap.xml from the routes and the guide data,
 * so every documentation page is discoverable and the file can never
 * drift from what the site actually serves.
 *
 *   node scripts/build-sitemap.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { guideCategories } from '../src/data/guideData.js'
import { sortedPosts } from '../src/data/blogPosts.js'

const PROJECT_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = path.join(PROJECT_ROOT, 'public/sitemap.xml')
const ORIGIN = 'https://dekaerp.com'

const staticPages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/guide', changefreq: 'weekly', priority: '0.9' },
  { path: '/sitemap', changefreq: 'monthly', priority: '0.4' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
]

// Hand-written walkthroughs rank above the imported module reference.
const guidePages = guideCategories.flatMap((category) =>
  category.items.map((item) => ({
    path: `/guide/${item.id}`,
    changefreq: 'monthly',
    priority: category.source === 'reference' ? '0.6' : '0.7',
  }))
)

const urls = [...staticPages, ...guidePages]

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) =>
    [
      '  <url>',
      `    <loc>${ORIGIN}${url.path}</loc>`,
      `    <changefreq>${url.changefreq}</changefreq>`,
      `    <priority>${url.priority}</priority>`,
      '  </url>',
    ].join('\n')
  ),
  '</urlset>',
  '',
].join('\n')

fs.writeFileSync(OUTPUT, xml)
console.log(`Wrote public/sitemap.xml — ${urls.length} URLs (${guidePages.length} guide pages)`)
