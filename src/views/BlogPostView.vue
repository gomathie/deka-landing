<template>
  <div class="post-view">
    <AppHeader />

    <main class="post-main" v-if="post">
      <div class="container container--narrow">
        <nav class="post-breadcrumb" aria-label="Breadcrumb">
          <router-link to="/">Home</router-link>
          <span class="post-breadcrumb__sep">/</span>
          <router-link to="/blog">Blog</router-link>
          <span class="post-breadcrumb__sep">/</span>
          <span class="post-breadcrumb__current">{{ post.title }}</span>
        </nav>

        <header class="post-header">
          <div class="post-header__meta">
            <span class="blog-tag" :style="tagStyle(post.category)">{{ categoryLabel(post.category) }}</span>
            <span class="post-header__dot"></span>
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span class="post-header__dot"></span>
            <span>{{ post.readTime }}</span>
          </div>

          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-lead">{{ post.excerpt }}</p>
        </header>

        <article class="post-body">
          <template v-for="(block, i) in post.body" :key="i">
            <h2 v-if="block.type === 'h2'" class="post-h2">{{ block.text }}</h2>

            <p v-else-if="block.type === 'p'" class="post-p" v-html="block.text"></p>

            <ul v-else-if="block.type === 'list'" class="post-list">
              <li v-for="(item, j) in block.items" :key="j" v-html="item"></li>
            </ul>

            <ol v-else-if="block.type === 'steps'" class="post-steps">
              <li v-for="(item, j) in block.items" :key="j" v-html="item"></li>
            </ol>

            <blockquote v-else-if="block.type === 'quote'" class="post-quote">
              {{ block.text }}
            </blockquote>

            <div
              v-else-if="block.type === 'callout'"
              class="post-callout"
              :class="`post-callout--${block.kind}`"
            >
              <span v-if="block.label" class="post-callout__label">{{ block.label }}</span>
              <p v-html="block.text"></p>
            </div>

            <div v-else-if="block.type === 'table'" class="post-table-wrap">
              <table class="post-table">
                <thead>
                  <tr>
                    <th v-for="col in block.columns" :key="col">{{ col }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, r) in block.rows" :key="r">
                    <td v-for="(cell, c) in row" :key="c" v-html="cell"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </article>

        <footer class="post-footer">
          <div class="post-author">
            <img src="/logos/logo.svg" alt="" width="30" height="30" class="post-author__mark" />
            <div>
              <span class="post-author__name">{{ post.author }}</span>
              <span class="post-author__role">Published {{ formatDate(post.date) }}</span>
            </div>
          </div>

          <router-link to="/blog" class="btn btn--secondary btn--sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            All posts
          </router-link>
        </footer>

        <aside class="post-cta">
          <div>
            <h2 class="post-cta__title">Put this into practice</h2>
            <p class="post-cta__text">DEKA ERP runs the whole flow — quotation to payment, one record throughout.</p>
          </div>
          <a href="https://cloud.dekaerp.com" class="btn btn--primary">Get started</a>
        </aside>

        <section v-if="related.length" class="post-related">
          <h2 class="post-related__title">Keep reading</h2>
          <div class="post-related__grid">
            <router-link
              v-for="item in related"
              :key="item.slug"
              :to="`/blog/${item.slug}`"
              class="post-related__card surface surface--interactive"
            >
              <span class="blog-tag" :style="tagStyle(item.category)">{{ categoryLabel(item.category) }}</span>
              <h3 class="post-related__name">{{ item.title }}</h3>
              <p class="post-related__excerpt">{{ item.excerpt }}</p>
            </router-link>
          </div>
        </section>
      </div>
    </main>

    <!-- Unknown slug -->
    <main class="post-main post-missing" v-else>
      <div class="container container--narrow">
        <h1 class="post-title">Post not found</h1>
        <p class="post-lead">That article does not exist, or its address has changed.</p>
        <router-link to="/blog" class="btn btn--primary">Browse all posts</router-link>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { findPost, relatedTo, categories, formatDate } from '../data/blogPosts.js'

const route = useRoute()

const post = computed(() => findPost(route.params.slug))
const related = computed(() => relatedTo(post.value))

const categoryLabel = (id) => categories[id]?.label || id

const tagStyle = (id) => {
  const color = categories[id]?.color || 'var(--color-amber)'
  return { color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }
}

watch(
  post,
  (value) => {
    document.title = value ? `${value.title} — DEKA ERP` : 'Post not found — DEKA ERP'
  },
  { immediate: true }
)

onUnmounted(() => {
  document.title = 'DEKA ERP'
})
</script>

<style scoped>
.post-view {
  min-height: 100vh;
  background-color: var(--color-off-white);
}

.post-main {
  padding-top: calc(var(--header-height) + var(--space-12));
  padding-bottom: var(--space-24);
}

/* ── Breadcrumb ── */
.post-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-bottom: var(--space-8);
}

.post-breadcrumb a {
  color: var(--text-secondary);
  transition: color var(--duration-fast) var(--ease-out);
}

.post-breadcrumb a:hover {
  color: var(--color-amber);
}

.post-breadcrumb__sep {
  opacity: 0.4;
}

.post-breadcrumb__current {
  color: var(--text-primary);
  font-weight: var(--weight-medium);
}

/* ── Header ── */
.post-header {
  padding-bottom: var(--space-8);
  margin-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-sand);
}

.post-header__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-bottom: var(--space-5);
}

.post-header__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-tertiary);
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

.post-title {
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-5);
}

.post-lead {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

/* ── Body ── */
.post-body {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--text-secondary);
}

.post-h2 {
  font-size: var(--text-2xl);
  color: var(--text-primary);
  margin: var(--space-12) 0 var(--space-4);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

.post-body > *:first-child {
  margin-top: 0;
}

.post-p {
  margin-bottom: var(--space-5);
}

.post-body :deep(strong) {
  color: var(--text-primary);
  font-weight: var(--weight-semibold);
}

.post-body :deep(code) {
  background: var(--color-sand-light);
  border: 1px solid var(--color-sand);
  padding: 0.1em 0.4em;
  border-radius: var(--radius-sm);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.875em;
  color: var(--text-primary);
}

.post-list,
.post-steps {
  margin: 0 0 var(--space-6);
  padding-left: var(--space-6);
  list-style: revert;
}

.post-steps {
  list-style: decimal;
}

.post-list li,
.post-steps li {
  margin-bottom: var(--space-3);
  padding-left: var(--space-1);
}

.post-list li::marker,
.post-steps li::marker {
  color: var(--color-amber);
  font-weight: var(--weight-semibold);
}

.post-quote {
  margin: var(--space-8) 0;
  padding: var(--space-2) 0 var(--space-2) var(--space-6);
  border-left: 3px solid var(--color-amber);
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
  color: var(--text-primary);
}

/* ── Callouts ── */
.post-callout {
  --callout-accent: var(--color-amber-hover);
  --callout-tint: var(--color-amber-glow);

  display: grid;
  gap: var(--space-1);
  margin: 0 0 var(--space-6);
  padding: var(--space-4) var(--space-5);
  background: var(--callout-tint);
  border-left: 3px solid var(--callout-accent);
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
}

.post-callout p {
  margin: 0;
}

.post-callout__label {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--callout-accent);
}

.post-callout--tip {
  --callout-accent: #2E9E6B;
  --callout-tint: rgba(46, 158, 107, 0.08);
}

.post-callout--important {
  --callout-accent: #D14343;
  --callout-tint: rgba(209, 67, 67, 0.08);
}

/* ── Tables ── */
.post-table-wrap {
  overflow-x: auto;
  margin: 0 0 var(--space-6);
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-lg);
  -webkit-overflow-scrolling: touch;
}

.post-table {
  width: 100%;
  min-width: 460px;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.post-table th {
  text-align: left;
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  background: var(--color-sand-light);
  padding: var(--space-3) var(--space-4);
  white-space: nowrap;
}

.post-table td {
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-sand);
  vertical-align: top;
}

/* ── Footer ── */
.post-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-12);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-sand);
}

.post-author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.post-author__mark {
  flex-shrink: 0;
}

.post-author__name,
.post-author__role {
  display: block;
  line-height: 1.35;
}

.post-author__name {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
}

.post-author__role {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

/* ── CTA ── */
.post-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  margin-top: var(--space-12);
  padding: var(--space-6) var(--space-8);
  border-radius: var(--radius-xl);
  background: var(--color-white);
  border: 1px solid var(--color-sand);
}

.post-cta__title {
  font-size: var(--text-lg);
  margin-bottom: var(--space-1);
}

.post-cta__text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* ── Related ── */
.post-related {
  margin-top: var(--space-16);
}

.post-related__title {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-5);
}

.post-related__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-5);
}

.post-related__card {
  padding: var(--space-5);
}

.post-related__name {
  font-size: var(--text-base);
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
  margin: var(--space-3) 0 var(--space-2);
}

.post-related__excerpt {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-snug);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-missing {
  text-align: center;
}

.post-missing .btn {
  margin-top: var(--space-6);
}

/* ── Responsive ── */
@media (max-width: 820px) {
  .post-title {
    font-size: var(--text-4xl);
  }

  .post-lead {
    font-size: var(--text-lg);
  }
}

@media (max-width: 560px) {
  .post-main {
    padding-top: calc(var(--header-height) + var(--space-8));
  }

  .post-title {
    font-size: var(--text-3xl);
  }

  .post-h2 {
    font-size: var(--text-xl);
    margin-top: var(--space-10);
  }

  .post-cta {
    padding: var(--space-5);
  }

  .post-cta .btn {
    width: 100%;
  }
}
</style>
