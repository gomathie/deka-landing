/**
 * build-guide.cjs
 * ---------------------------------------------------------------
 * Imports the full AureusERP user-guide corpus (docs.aureuserp.com)
 * and emits `src/data/aureusGuides.js` rebranded for DEKA ERP.
 *
 * DEKA ERP is a fork of AureusERP, so the functional documentation
 * is identical — this script rewrites the branding, strips the
 * upstream screenshots, normalises the HTML to our design system
 * and produces stable, human-readable slugs.
 *
 * Usage:
 *   node scripts/build-guide.cjs                # clones/uses .docs-source
 *   node scripts/build-guide.cjs --src=<path>   # use an existing checkout
 *   node scripts/build-guide.cjs --refresh      # git pull before building
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { marked } = require('marked');

const PROJECT_ROOT = path.join(__dirname, '..');
const DEFAULT_SRC = path.join(PROJECT_ROOT, '.docs-source');
const UPSTREAM = 'https://github.com/aureuserp/user-guide.git';
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'src/data/aureusGuides.js');

const argv = process.argv.slice(2);
const srcArg = argv.find((a) => a.startsWith('--src='));
const REPO_DIR = srcArg ? path.resolve(srcArg.slice(6)) : DEFAULT_SRC;
const REFRESH = argv.includes('--refresh');

/* ─────────────────────────────────────────────
   1. Source checkout
   ───────────────────────────────────────────── */

function ensureSource() {
  if (!fs.existsSync(REPO_DIR)) {
    console.log(`Cloning upstream user guide into ${path.relative(PROJECT_ROOT, REPO_DIR)} ...`);
    execSync(`git clone --depth 1 ${UPSTREAM} "${REPO_DIR}"`, { stdio: 'inherit' });
  } else if (REFRESH) {
    console.log('Refreshing upstream user guide ...');
    execSync('git pull --ff-only', { cwd: REPO_DIR, stdio: 'inherit' });
  }
  if (!fs.existsSync(path.join(REPO_DIR, 'src'))) {
    console.error(`No 'src' directory found in ${REPO_DIR}`);
    process.exit(1);
  }
}

/* ─────────────────────────────────────────────
   2. Navigation tree
   ───────────────────────────────────────────── */

function parseRoutes() {
  const routesFile = path.join(REPO_DIR, '.vitepress/routes/master.ts');
  const content = fs.readFileSync(routesFile, 'utf-8');
  const arrayString = content
    .replace('const routes = ', '')
    .replace('export default routes', '')
    .trim();
  try {
    return eval('(' + arrayString + ')');
  } catch (e) {
    console.error('Failed to parse the upstream routes array:', e.message);
    process.exit(1);
  }
}

/**
 * Pages that exist upstream but were never wired into the sidebar.
 * Add genuine end-user documentation here as upstream fills it in.
 *
 * Deliberately excluded:
 *  - `advanced/chatter/*` — developer API docs, not end-user material.
 *  - `invoice/introduction` and `timeOff/reporting` — empty stubs
 *    upstream (a bare heading and an empty file respectively); the
 *    `MIN_CONTENT_WORDS` guard below would drop them anyway.
 */
const EXTRA_PAGES = {};

/** Pages thinner than this are upstream stubs and are not published. */
const MIN_CONTENT_WORDS = 40;

/* ─────────────────────────────────────────────
   3. Icons — one distinct glyph per module
   ───────────────────────────────────────────── */

const svg = (paths) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const ICONS = {
  invoices: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>'),
  sales: svg('<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>'),
  purchase: svg('<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>'),
  inventory: svg('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>'),
  manufacturing: svg('<path d="M2 20h20"></path><path d="M4 20V9l5 3.5V9l5 3.5V9l5 3.5V20"></path><path d="M4 9 3 4h3l-1 5"></path>'),
  maintenance: svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>'),
  contacts: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'),
  project: svg('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1"></rect><path d="M9 14l2 2 4-4"></path>'),
  website: svg('<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>'),
  employees: svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>'),
  recruitments: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>'),
  'time-off': svg('<rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16l2 2 4-4"></path>'),
};

const FALLBACK_ICON = svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>');

/* ─────────────────────────────────────────────
   4. Helpers
   ───────────────────────────────────────────── */

function slugify(text) {
  return String(text)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** '/master/invoice/customers/products' -> 'invoice-customers-products' */
function slugFromLink(link) {
  return slugify(link.replace(/^\/?master\//, '').replace(/\.(md|html)$/, ''));
}

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .trim();
}

function wordCount(html) {
  return stripTags(html).split(' ').filter(Boolean).length;
}

function readTimeFor(html) {
  return `${Math.max(2, Math.round(wordCount(html) / 200))} min read`;
}

function summaryFor(html) {
  const match = html.match(/<p>([\s\S]*?)<\/p>/);
  if (!match) return '';
  let text = stripTags(match[1]);
  if (text.length > 210) {
    text = text.slice(0, 210);
    text = text.slice(0, text.lastIndexOf(' ')) + '…';
  }
  return text;
}

/* ─────────────────────────────────────────────
   5. Rebranding
   ───────────────────────────────────────────── */

const BRAND_RULES = [
  // Domains first, so they are not caught by the product-name rules.
  [/demo\.aureuserp\.com/gi, 'cloud.dekaerp.com'],
  [/docs\.aureuserp\.com/gi, 'dekaerp.com/guide'],
  [/github\.com\/aureuserp\/aureuserp/gi, 'dekaerp.com'],
  [/(?:https?:\/\/)?(?:www\.)?aureuserp\.com/gi, 'dekaerp.com'],
  // Product name.
  [/Aureus\s*ERP/gi, 'DEKA ERP'],
  [/\bAureus\b/gi, 'DEKA'],
  [/\bWebkul\b/g, 'DEKA'],
  // Anything left is a bare lowercase identifier (repo/package names).
  [/\baureuserp\b/g, 'dekaerp'],
];

/** Typos carried over from the upstream copy. */
const COPY_FIXES = [
  [/Configuartions/g, 'Configurations'],
  [/\bdefeind\b/gi, 'defined'],
  [/\bthier\b/gi, 'their'],
  [/\brecieve/gi, 'receive'],
];

function rebrand(text) {
  const branded = BRAND_RULES.reduce((acc, [p, r]) => acc.replace(p, r), text);
  return COPY_FIXES.reduce((acc, [p, r]) => acc.replace(p, r), branded);
}

/* ─────────────────────────────────────────────
   6. Markdown → HTML
   ───────────────────────────────────────────── */

/** Phrases that only make sense next to the upstream screenshots we strip. */
const DANGLING_IMAGE_PHRASES = [
  /,?\s*as shown in the below image\b/gi,
  /,?\s*as shown in the image below\b/gi,
  /,?\s*as shown in below image\b/gi,
  /,?\s*as shown below\b/gi,
  /,?\s*refer to the image below\b/gi,
  /,?\s*see the image below\b/gi,
  /\s*\(see below image\)/gi,
];

function processMarkdown(content, linkMap, currentLink) {
  let md = content;
  const currentDir = path.posix.dirname(currentLink);

  // Frontmatter
  md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

  // Upstream screenshots carry Aureus branding, so they are dropped
  // rather than shipped under our theme.
  md = md.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  md = md.replace(/<ImagePopup[^>]*\/?>/g, '');
  md = md.replace(/<\/ImagePopup>/g, '');
  md = md.replace(/<img[^>]*\/?>/g, '');

  // Now that the images are gone, drop the sentences pointing at them.
  DANGLING_IMAGE_PHRASES.forEach((pattern) => {
    md = md.replace(pattern, '');
  });
  md = md.replace(/[ \t]+([.:,;])/g, '$1');

  // Internal cross-links -> our own guide routes. Targets are relative
  // to the file being processed, so they are resolved against its
  // directory before being matched to a slug.
  md = md.replace(/\]\(([^)\s]+?)\.(?:md|html)(#[^)]*)?\)/g, (full, target, hash) => {
    if (/^(?:https?:)?\/\//.test(target)) return full;
    const resolved = target.startsWith('/')
      ? target
      : path.posix.normalize(path.posix.join(currentDir, target));
    const slug = linkMap[slugFromLink(resolved)];
    return slug ? `](/guide/${slug}${hash || ''})` : full;
  });

  md = rebrand(md);

  // Collapse the blank lines left behind by the removed images
  md = md.replace(/\n{3,}/g, '\n\n');

  return marked.parse(md);
}

/* ─────────────────────────────────────────────
   7. HTML normalisation
   ───────────────────────────────────────────── */

/** Emoji the upstream copy uses to open a blockquote. */
const CALLOUT_MARKERS = [
  { test: /^(?:\u{1F4A1}|\u{2728})[️‍]*\s*/u, kind: 'tip', label: 'Tip' },
  { test: /^(?:\u{26A0}|\u{2757}|\u{1F6A8})[️‍]*\s*/u, kind: 'important', label: 'Important' },
  { test: /^(?:\u{1F6C8}|\u{2139}|\u{1F4DD}|\u{1F4CC}|\u{1F539}|\u{1F538})[️‍]*\s*/u, kind: 'note', label: 'Note' },
];

/**
 * The upstream copy also opens blockquotes with a bold lead-in
 * (`> **Why it's used:** …`). Those read far better as a labelled
 * callout than as a generic quote.
 */
const LABEL_KINDS = [
  { match: /^(tip|quick mental model|in simple words|pro tip)/i, kind: 'tip' },
  { match: /^(important|warning|caution|caveat)/i, kind: 'important' },
  { match: /^(next step|then|after this)/i, kind: 'next' },
  { match: /^(save changes|automatic|behind the scenes)/i, kind: 'note' },
];

function kindForLabel(label) {
  const found = LABEL_KINDS.find((entry) => entry.match.test(label.trim()));
  return found ? found.kind : 'note';
}

function callout(kind, label, body) {
  const heading = label ? `<span class="doc-callout__label">${label}</span>` : '';
  return `<div class="doc-callout doc-callout--${kind}">${heading}<div class="doc-callout__body">${body}</div></div>`;
}

/**
 * Turns raw marked output into markup that matches the DEKA design
 * system, and collects an "On this page" table of contents.
 */
function normaliseHtml(html) {
  let out = html;

  // The page title is already rendered by the guide header, so the
  // document's own <h1> would be a duplicate.
  out = out.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/, '');

  // Blockquotes become proper callouts, keyed off the emoji or bold
  // lead-in the upstream copy uses.
  out = out.replace(/<blockquote>\s*([\s\S]*?)\s*<\/blockquote>/g, (_full, inner) => {
    const body = inner.replace(/^\s*<p>\s*/, '<p>');

    const opening = body.replace(/^<p>/, '');
    for (const marker of CALLOUT_MARKERS) {
      if (marker.test.test(opening)) {
        // The emoji and any duplicated "Note:" lead-in are replaced by
        // the callout's own label.
        const stripped = opening
          .replace(marker.test, '')
          .replace(/^(?:Note|Tip|Important|Warning)\s*[:—-]\s*/i, '');
        return callout(marker.kind, marker.label, `<p>${stripped}`);
      }
    }

    const labelled = body.match(/^<p><strong>(?:<em>)?\s*([^<:]{2,60}?)\s*:?\s*(?:<\/em>)?<\/strong>\s*:?\s*/);
    if (labelled) {
      const label = labelled[1].trim();
      return callout(kindForLabel(label), label, `<p>${body.slice(labelled[0].length)}`);
    }

    return callout('quote', null, body);
  });

  // Anchors for the on-page navigation.
  const toc = [];
  const usedIds = new Set();
  out = out.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (full, level, inner) => {
    const text = stripTags(inner);
    const base = slugify(text) || 'section';
    let id = base;
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n++}`;
    usedIds.add(id);
    if (level === '2') toc.push({ id, text });
    return `<h${level} id="${id}" class="doc-heading doc-heading--h${level}">${inner}<a class="doc-anchor" href="#${id}" aria-label="Link to ${text}">#</a></h${level}>`;
  });

  // Wide tables need their own scroll container on mobile.
  out = out.replace(/<table>/g, '<div class="doc-table-wrap"><table>');
  out = out.replace(/<\/table>/g, '</table></div>');

  // Navigation strings (`Sales → Orders → Quotations`) read better as a
  // breadcrumb chip than as inline code.
  out = out.replace(/<code>([^<]*→[^<]*)<\/code>/g, '<span class="doc-path">$1</span>');

  return { html: out.trim(), toc };
}

/* ─────────────────────────────────────────────
   8. Build
   ───────────────────────────────────────────── */

/** Depth-first walk that keeps the sub-group a page sits under. */
function flattenItems(items, groupName = null) {
  let flat = [];
  for (const item of items) {
    if (item.items) {
      flat = flat.concat(flattenItems(item.items, item.text));
    } else if (item.link) {
      flat.push({ ...item, group: groupName });
    }
  }
  return flat;
}

function resolveFile(link) {
  const direct = path.join(REPO_DIR, 'src', link + '.md');
  if (fs.existsSync(direct)) return direct;
  const asIndex = path.join(REPO_DIR, 'src', link, 'index.md');
  if (fs.existsSync(asIndex)) return asIndex;
  return null;
}

function build() {
  ensureSource();
  const routes = parseRoutes();

  // Pass 1 — collect every page so cross-links can be resolved.
  const pages = [];
  for (const category of routes) {
    const links = flattenItems(category.items);
    for (const extra of EXTRA_PAGES[category.text] || []) {
      const entry = { text: extra.text, link: extra.link, group: null };
      if (typeof extra.position === 'number') links.splice(extra.position, 0, entry);
      else links.push(entry);
    }
    for (const link of links) {
      pages.push({ category, ...link, slug: slugFromLink(link.link) });
    }
  }

  const linkMap = {};
  pages.forEach((page) => {
    linkMap[slugFromLink(page.link)] = page.slug;
  });

  // Pass 2 — render.
  const guideCategories = [];
  let missing = 0;

  for (const category of routes) {
    const items = [];

    for (const page of pages.filter((p) => p.category === category)) {
      const filePath = resolveFile(page.link);
      if (!filePath) {
        console.warn(`  ! missing source for ${page.link}`);
        missing++;
        continue;
      }

      const rawHtml = processMarkdown(fs.readFileSync(filePath, 'utf-8'), linkMap, page.link);
      const { html, toc } = normaliseHtml(rawHtml);

      if (wordCount(html) < MIN_CONTENT_WORDS) {
        console.warn(`  ! skipping stub ${page.link} (${wordCount(html)} words)`);
        continue;
      }

      items.push({
        id: page.slug,
        title: rebrand(page.text),
        group: page.group ? rebrand(page.group) : null,
        module: rebrand(category.text),
        readTime: readTimeFor(html),
        summary: summaryFor(html),
        toc,
        htmlContent: html,
      });
    }

    if (items.length) {
      guideCategories.push({
        id: slugify(category.text),
        name: rebrand(category.text),
        icon: ICONS[slugify(category.text)] || FALLBACK_ICON,
        source: 'reference',
        items,
      });
    }
  }

  const total = guideCategories.reduce((sum, c) => sum + c.items.length, 0);
  const banner = [
    '// ─────────────────────────────────────────────────────────────',
    '// GENERATED FILE — do not edit by hand.',
    '// Run `npm run build:guide` to regenerate from the upstream docs.',
    `// ${guideCategories.length} modules, ${total} pages`,
    '// ─────────────────────────────────────────────────────────────',
    '',
  ].join('\n');

  fs.writeFileSync(
    OUTPUT_FILE,
    banner + `export const guideCategories = ${JSON.stringify(guideCategories, null, 2)};\n`
  );

  console.log(`\nWrote ${path.relative(PROJECT_ROOT, OUTPUT_FILE)}`);
  console.log(`  ${guideCategories.length} modules, ${total} pages${missing ? `, ${missing} missing` : ''}`);
  guideCategories.forEach((c) => console.log(`  - ${c.name} (${c.items.length})`));
}

build();
