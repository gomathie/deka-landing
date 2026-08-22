const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Paths
const REPO_DIR = path.join(process.env.USERPROFILE, '.gemini/antigravity-ide/brain/fd146ec7-c9b7-4867-9f90-f5121c75e409/scratch/user-guide');
const ROUTES_FILE = path.join(REPO_DIR, '.vitepress/routes/master.ts');
const SRC_DIR = path.join(REPO_DIR, 'src');
const OUTPUT_FILE = path.join(__dirname, 'src/data/aureusGuides.js');

function parseRoutes() {
  const content = fs.readFileSync(ROUTES_FILE, 'utf-8');
  const arrayString = content.replace('const routes = ', '').replace('export default routes', '').trim();
  // Evaluate the string to get the JS array
  let routes;
  try {
    routes = eval('(' + arrayString + ')');
  } catch (e) {
    console.error("Failed to parse routes array");
    process.exit(1);
  }
  return routes;
}

function processMarkdown(content) {
  // Strip images: ![alt](url)
  let cleanContent = content.replace(/!\[.*?\]\(.*?\)/g, '');
  // Strip HTML images: <img ... />
  cleanContent = cleanContent.replace(/<img[^>]*>/g, '');
  // Strip custom ImagePopup components
  cleanContent = cleanContent.replace(/<ImagePopup[^>]*>/g, '');
  // Strip closing ImagePopup if any
  cleanContent = cleanContent.replace(/<\/ImagePopup>/g, '');
  
  // Replace Aureus ERP with DEKA ERP
  cleanContent = cleanContent.replace(/Aureus ERP/g, 'DEKA ERP');
  cleanContent = cleanContent.replace(/Aureus/gi, 'DEKA');
  
  // Strip frontmatter if any (--- ... ---)
  cleanContent = cleanContent.replace(/^---\n([\s\S]*?)\n---\n/, '');
  
  return marked.parse(cleanContent);
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const ICONS = [
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
];

function flattenItems(items) {
  let flat = [];
  for (let item of items) {
    if (item.items) {
      flat = flat.concat(flattenItems(item.items));
    } else if (item.link) {
      flat.push(item);
    }
  }
  return flat;
}

function generateGuideData() {
  const routes = parseRoutes();
  
  let guideCategories = [];
  let iconIndex = 0;
  
  for (let category of routes) {
    const categoryId = slugify(category.text);
    const categoryIcon = ICONS[iconIndex % ICONS.length];
    iconIndex++;
    
    let items = [];
    
    // Flatten nested items since our UI supports one level of items under a category
    const flatLinks = flattenItems(category.items);
    
    for (let linkObj of flatLinks) {
      // linkObj.link is something like '/master/invoice/customers/products'
      // Actual file might be 'src/master/invoice/customers/products.md' or '.../products/index.md'
      
      let filePath = path.join(SRC_DIR, linkObj.link + '.md');
      if (!fs.existsSync(filePath)) {
        filePath = path.join(SRC_DIR, linkObj.link, 'index.md');
      }
      
      if (fs.existsSync(filePath)) {
        const mdContent = fs.readFileSync(filePath, 'utf-8');
        const htmlContent = processMarkdown(mdContent);
        
        items.push({
          id: slugify(linkObj.text) + '-' + Math.random().toString(36).substr(2, 5),
          title: linkObj.text,
          readTime: '3 min read',
          htmlContent: htmlContent
        });
      } else {
        console.warn('File not found:', filePath);
      }
    }
    
    if (items.length > 0) {
      guideCategories.push({
        id: categoryId,
        name: category.text,
        icon: categoryIcon,
        items: items
      });
    }
  }
  
  const jsOutput = `export const guideCategories = ${JSON.stringify(guideCategories, null, 2)};`;
  fs.writeFileSync(OUTPUT_FILE, jsOutput);
  console.log('Successfully generated guideData.js');
}

generateGuideData();
