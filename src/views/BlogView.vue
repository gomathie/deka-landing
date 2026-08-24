<template>
  <div class="blog-view">
    <AppHeader />

    <main class="blog-main">
      <div class="container">
        <header class="blog-hero">
          <span class="section-label">Blog</span>
          <h1 class="blog-hero__title">Notes on running an operation</h1>
          <p class="blog-hero__lead">
            Practical writing on the parts of a business an ERP touches — orders, stock,
            money, and the handovers between them. No jargon, no vendor theatre.
          </p>
        </header>

        <!-- Category filter -->
        <nav class="blog-filters" aria-label="Filter posts by category">
          <button
            class="blog-filter"
            :class="{ 'blog-filter--active': activeCategory === 'all' }"
            @click="activeCategory = 'all'"
          >
            All posts
            <span class="blog-filter__count">{{ sortedPosts.length }}</span>
          </button>
          <button
            v-for="cat in usedCategories"
            :key="cat.id"
            class="blog-filter"
            :class="{ 'blog-filter--active': activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            {{ cat.label }}
            <span class="blog-filter__count">{{ cat.count }}</span>
          </button>
        </nav>

        <!-- Featured post, only on the unfiltered view -->
        <router-link
          v-if="featured && activeCategory === 'all'"
          :to="`/blog/${featured.slug}`"
          class="blog-featured surface surface--interactive"
          v-reveal
        >
          <div class="blog-featured__body">
            <div class="blog-card__meta">
              <span class="blog-tag" :style="tagStyle(featured.category)">{{ categoryLabel(featured.category) }}</span>
              <span class="blog-card__date">{{ formatDate(featured.date) }}</span>
            </div>
            <h2 class="blog-featured__title">{{ featured.title }}</h2>
            <p class="blog-featured__excerpt">{{ featured.excerpt }}</p>
            <span class="blog-card__more">
              Read article
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
          <div class="blog-featured__aside" aria-hidden="true">
            <span class="blog-featured__flag">Featured</span>
            <span class="blog-featured__time">{{ featured.readTime }}</span>
          </div>
        </router-link>

        <!-- Post grid -->
        <div class="blog-grid" v-reveal.children :key="activeCategory">
          <router-link
            v-for="post in visiblePosts"
            :key="post.slug"
            :to="`/blog/${post.slug}`"
            class="blog-card surface surface--interactive"
          >
            <div class="blog-card__meta">
              <span class="blog-tag" :style="tagStyle(post.category)">{{ categoryLabel(post.category) }}</span>
              <span class="blog-card__date">{{ formatDate(post.date) }}</span>
            </div>
            <h2 class="blog-card__title">{{ post.title }}</h2>
            <p class="blog-card__excerpt">{{ post.excerpt }}</p>
            <div class="blog-card__footer">
              <span class="blog-card__time">{{ post.readTime }}</span>
              <span class="blog-card__more">
                Read
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </router-link>
        </div>

        <!-- Closing CTA -->
        <aside class="blog-cta" v-reveal>
          <h2 class="blog-cta__title">Reading about it is the easy part</h2>
          <p class="blog-cta__text">
            Every process described here is something DEKA ERP does out of the box.
            Start a workspace and try it against your own numbers.
          </p>
          <div class="blog-cta__actions btn-row">
            <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--large">Get started</a>
            <router-link to="/guide" class="btn btn--secondary btn--large">Read the user guide</router-link>
          </div>
        </aside>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { sortedPosts, categories, formatDate } from '../data/blogPosts.js'

const activeCategory = ref('all')

const featured = computed(() => sortedPosts.find((post) => post.featured) || sortedPosts[0])

const visiblePosts = computed(() => {
  const list =
    activeCategory.value === 'all'
      ? sortedPosts.filter((post) => post.slug !== featured.value?.slug)
      : sortedPosts.filter((post) => post.category === activeCategory.value)
  return list
})

// Only offer filters that actually have posts behind them.
const usedCategories = computed(() =>
  Object.entries(categories)
    .map(([id, meta]) => ({
      id,
      label: meta.label,
      count: sortedPosts.filter((post) => post.category === id).length,
    }))
    .filter((cat) => cat.count > 0)
)

const categoryLabel = (id) => categories[id]?.label || id

const tagStyle = (id) => {
  const color = categories[id]?.color || 'var(--color-amber)'
  return { color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }
}

onMounted(() => {
  document.title = 'Blog — DEKA ERP'
})

onUnmounted(() => {
  document.title = 'DEKA ERP'
})
</script>

<style scoped>
.blog-view {
  min-height: 100vh;
  background-color: var(--color-off-white);
}

.blog-main {
  padding-top: calc(var(--header-height) + var(--space-16));
  padding-bottom: var(--space-24);
}

/* ── Hero ── */
.blog-hero {
  max-width: 720px;
  margin-bottom: var(--space-12);
}

.blog-hero__title {
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-4);
}

.blog-hero__lead {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

/* ── Filters ── */
.blog-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-10);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-sand);
}

.blog-filter {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.25rem;
  padding: 0 var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-sand);
  background: var(--color-white);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-secondary);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

@media (hover: hover) {
  .blog-filter:hover {
    border-color: var(--color-amber);
    color: var(--color-amber-hover);
  }
}

.blog-filter--active {
  background: var(--color-charcoal);
  border-color: var(--color-charcoal);
  color: var(--color-sand-light);
}

.blog-filter__count {
  font-size: 11px;
  opacity: 0.65;
}

@media (prefers-color-scheme: dark) {
  .blog-filter--active {
    background: var(--color-amber);
    border-color: var(--color-amber);
    color: var(--color-charcoal);
  }
}

/* ── Shared card bits ── */
.blog-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.blog-tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.blog-card__date {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.blog-card__more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-amber-hover);
}

/* ── Featured ── */
.blog-featured {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: var(--space-8);
  padding: var(--space-8);
  margin-bottom: var(--space-8);
}

.blog-featured__title {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-3);
}

.blog-featured__excerpt {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-5);
  max-width: 62ch;
}

.blog-featured__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  border-left: 1px solid var(--color-sand);
  padding-left: var(--space-6);
}

.blog-featured__flag {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-amber);
}

.blog-featured__time {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

/* ── Grid ── */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.blog-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
}

.blog-card__title {
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-3);
}

.blog-card__excerpt {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-6);
}

.blog-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-sand);
}

.blog-card__time {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

/* ── Closing CTA ── */
.blog-cta {
  margin-top: var(--space-16);
  padding: var(--space-12) var(--space-8);
  border-radius: var(--radius-2xl);
  background: linear-gradient(135deg, var(--color-charcoal) 0%, #2A3642 100%);
  color: var(--text-on-dark);
  text-align: center;
}

.blog-cta__title {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-3);
}

.blog-cta__text {
  color: var(--text-on-dark-muted);
  max-width: 52ch;
  margin: 0 auto var(--space-8);
  line-height: var(--leading-normal);
}

.blog-cta__actions {
  justify-content: center;
}

/* The CTA panel is always dark, so the outline button uses the on-dark palette. */
.blog-cta .btn--secondary {
  --btn-border: rgba(255, 255, 255, 0.22);
  --btn-bg: rgba(255, 255, 255, 0.04);
  --btn-fg: var(--text-on-dark);
  --btn-ring: rgba(255, 159, 28, 0.35);
}

@media (hover: hover) {
  .blog-cta .btn--secondary:hover {
    --btn-border: var(--color-amber);
    --btn-fg: var(--color-amber);
    --btn-bg: rgba(255, 159, 28, 0.12);
  }
}

/* ── Responsive ── */
@media (max-width: 820px) {
  .blog-hero__title {
    font-size: var(--text-4xl);
  }

  .blog-featured {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
  }

  .blog-featured__aside {
    flex-direction: row;
    align-items: center;
    border-left: none;
    border-top: 1px solid var(--color-sand);
    padding-left: 0;
    padding-top: var(--space-4);
  }

  .blog-featured__title {
    font-size: var(--text-2xl);
  }
}

@media (max-width: 560px) {
  .blog-main {
    padding-top: calc(var(--header-height) + var(--space-10));
  }

  .blog-hero__title {
    font-size: var(--text-3xl);
  }

  .blog-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .blog-cta {
    padding: var(--space-10) var(--space-6);
  }

  .blog-cta__title {
    font-size: var(--text-2xl);
  }
}
</style>
