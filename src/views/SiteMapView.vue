<template>
  <div class="sitemap-page">
    <div class="container section">
      <div class="sitemap-header animate-in">
        <h1 class="sitemap-title">Site Map</h1>
        <p class="sitemap-subtitle">Navigate through DEKA ERP's features, documentation, and resources.</p>
      </div>

      <div class="sitemap-grid animate-in animate-in-delay-1">
        <!-- Product Section -->
        <div class="sitemap-card">
          <div class="sitemap-card__header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sitemap-icon">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <h2>Product</h2>
          </div>
          <ul class="sitemap-list">
            <li><router-link to="/" class="sitemap-link">Home</router-link></li>
            <li><router-link to="/about" class="sitemap-link">About</router-link></li>
            <li><router-link to="/about#features" class="sitemap-link">Features &amp; Modules</router-link></li>
            <li><router-link to="/about#multi-company" class="sitemap-link">Multi-Company</router-link></li>
            <li><router-link to="/pricing" class="sitemap-link">Pricing</router-link></li>
            <li><router-link to="/#benefits" class="sitemap-link">Benefits</router-link></li>
            <li><router-link to="/#deployment" class="sitemap-link">Deployment Options</router-link></li>
          </ul>
        </div>

        <!-- Blog -->
        <div class="sitemap-card">
          <div class="sitemap-card__header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sitemap-icon">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9h4"></path>
              <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"></path>
            </svg>
            <h2>Blog</h2>
          </div>
          <ul class="sitemap-list">
            <li><router-link to="/blog" class="sitemap-link">All posts</router-link></li>
            <li v-for="post in sortedPosts" :key="post.slug">
              <router-link :to="`/blog/${post.slug}`" class="sitemap-link">{{ post.title }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Documentation Section -->
        <div class="sitemap-card">
          <div class="sitemap-card__header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sitemap-icon">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <h2>Documentation</h2>
          </div>
          <ul class="sitemap-list">
            <li><router-link to="/guide" class="sitemap-link">User Guide Home</router-link></li>
            <li><router-link to="/guide/overview" class="sitemap-link">Platform Overview</router-link></li>
            <li><router-link to="/guide/multi-company-guide" class="sitemap-link">Multi-Company Guide</router-link></li>
            <li><router-link to="/guide/quotations-orders" class="sitemap-link">Sales &amp; Orders</router-link></li>
            <li><router-link to="/guide/inventory-operations" class="sitemap-link">Inventory &amp; Barcode</router-link></li>
          </ul>
        </div>

        <!-- Module reference — generated from the documentation itself -->
        <div class="sitemap-card sitemap-card--wide">
          <div class="sitemap-card__header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sitemap-icon">
              <rect x="3" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1"></rect>
            </svg>
            <h2>Module Reference</h2>
          </div>
          <div class="sitemap-modules">
            <div v-for="module in referenceIndex" :key="module.id" class="sitemap-module">
              <h3 class="sitemap-module__name">{{ module.name }}</h3>
              <ul class="sitemap-list">
                <li v-for="page in module.pages" :key="page.id">
                  <router-link :to="`/guide/${page.id}`" class="sitemap-link">
                    <span v-if="page.group" class="sitemap-link__group">{{ page.group }} ·</span>
                    {{ page.title }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Access Section -->
        <div class="sitemap-card">
          <div class="sitemap-card__header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sitemap-icon">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <h2>Platform Access</h2>
          </div>
          <ul class="sitemap-list">
            <li><a href="https://cloud.dekaerp.com" class="sitemap-link">Get Started (Register)</a></li>
            <li><a href="https://cloud.dekaerp.com" class="sitemap-link">Sign In</a></li>
          </ul>
        </div>

        <!-- Legal Section -->
        <div class="sitemap-card">
          <div class="sitemap-card__header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sitemap-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <h2>Legal</h2>
          </div>
          <ul class="sitemap-list">
            <li><router-link to="/privacy" class="sitemap-link">Privacy Policy</router-link></li>
            <li><router-link to="/sitemap" class="sitemap-link">Site Map</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// A title-only index generated alongside the guide — a few kilobytes, so the
// page can list every module without loading the documentation itself.
import { referenceIndex } from '../data/guideIndex.js'
import { sortedPosts } from '../data/blogPosts.js'
</script>

<style scoped>
.sitemap-page {
  min-height: calc(100vh - var(--header-height));
  background-color: var(--color-off-white);
}

@media (prefers-color-scheme: dark) {
  .sitemap-page {
    background-color: var(--color-dark-bg);
  }
}

.sitemap-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto var(--space-12);
}

.sitemap-title {
  font-size: var(--text-5xl);
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  color: var(--color-charcoal);
  margin-bottom: var(--space-4);
}

.sitemap-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

@media (prefers-color-scheme: dark) {
  .sitemap-title {
    color: var(--text-on-dark);
  }
  .sitemap-subtitle {
    color: var(--text-on-dark-muted);
  }
}

.sitemap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
}

.sitemap-card {
  background: var(--color-white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  border: 1px solid var(--color-sand);
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out);
}

/* The module reference is long — give it the full row. */
.sitemap-card--wide {
  grid-column: 1 / -1;
}

.sitemap-modules {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-6) var(--space-8);
}

.sitemap-module__name {
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-amber);
  margin-bottom: var(--space-3);
}

.sitemap-link__group {
  color: var(--text-tertiary);
  font-size: var(--text-xs);
}

.sitemap-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-amber-glow);
}

@media (prefers-color-scheme: dark) {
  .sitemap-card {
    background: rgba(255, 255, 255, 0.02);
    border-color: rgba(255, 255, 255, 0.08);
  }
  .sitemap-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 159, 28, 0.3);
  }
}

.sitemap-card__header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-sand);
}

@media (prefers-color-scheme: dark) {
  .sitemap-card__header {
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }
}

.sitemap-icon {
  color: var(--color-amber);
}

.sitemap-card__header h2 {
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
}

.sitemap-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.sitemap-link {
  font-size: var(--text-base);
  color: var(--text-secondary);
  transition: color var(--duration-fast) var(--ease-out);
  display: inline-block;
}

.sitemap-link:hover {
  color: var(--color-amber);
  text-decoration: underline;
  text-decoration-color: var(--color-amber-glow);
  text-underline-offset: 4px;
}
</style>
