<template>
  <div class="guide-layout">
    <AppHeader solid />

    <!-- Documentation toolbar, below the site navigation -->
    <div class="guide-header">
      <div class="guide-header__left">
        <!-- A panel icon and a label, deliberately not a second hamburger:
             the site header already owns one directly above this row. -->
        <button
          class="btn btn--secondary btn--sm guide-mobile-menu-btn"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="guide-sidebar"
        >
          <svg v-if="!isMobileMenuOpen" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
          <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          {{ isMobileMenuOpen ? 'Close' : 'Contents' }}
        </button>
        <span class="guide-header__badge">Documentation</span>
      </div>

      <!-- Search Bar -->
      <div class="guide-header__search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="search"
          v-model="searchQuery"
          placeholder="Search the documentation…"
          ref="searchInputRef"
          aria-label="Search User Guide"
        />
        <span v-if="searchQuery.trim()" class="guide-header__count">{{ resultCount }}</span>
        <kbd v-else class="guide-header__kbd">Ctrl K</kbd>
      </div>

      <div class="guide-header__right">
        <span class="guide-header__scope">{{ totalGuides }} guides</span>
        <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--sm guide-header__cta">Open cloud app</a>
      </div>
    </div>

    <!-- Main Container: Sidebar + Content + On-page ToC -->
    <div class="guide-body">
      <!-- Backdrop for mobile drawer -->
      <div
        class="guide-sidebar-backdrop"
        :class="{ 'guide-sidebar-backdrop--visible': isMobileMenuOpen }"
        @click="isMobileMenuOpen = false"
      ></div>

      <!-- Left Sidebar: Categories & Guides -->
      <aside id="guide-sidebar" class="guide-sidebar" :class="{ 'guide-sidebar--open': isMobileMenuOpen }">
        <div class="guide-sidebar__header">
          <span class="guide-sidebar__title">DEKA ERP Documentation</span>
          <span class="guide-sidebar__subtitle">{{ totalGuides }} guides across {{ guideCategories.length }} modules</span>
        </div>

        <nav class="guide-sidebar__nav">
          <div v-for="category in filteredCategories" :key="category.id" class="guide-category">
            <button
              class="guide-category__header"
              :class="{ 'guide-category__header--collapsed': !isCategoryOpen(category) }"
              :aria-expanded="isCategoryOpen(category)"
              @click="toggleCategory(category.id)"
            >
              <span class="guide-category__icon" v-html="category.icon"></span>
              <span class="guide-category__title">{{ category.name }}</span>
              <span class="guide-category__count">{{ category.items.length }}</span>
              <svg class="guide-category__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <ul v-show="isCategoryOpen(category)" class="guide-category__list">
              <template v-for="entry in groupItems(category.items)" :key="entry.key">
                <li v-if="entry.type === 'group'" class="guide-group-label">{{ entry.name }}</li>
                <li v-else>
                  <button
                    class="guide-nav-item"
                    :class="{ 'guide-nav-item--active': activeSectionId === entry.item.id, 'guide-nav-item--nested': entry.item.group }"
                    @click="selectSection(entry.item.id)"
                  >
                    <span class="guide-nav-item__text">{{ entry.item.title }}</span>
                    <span v-if="entry.item.badge" class="guide-nav-item__badge">{{ entry.item.badge }}</span>
                  </button>
                </li>
              </template>
            </ul>
          </div>

          <div v-if="filteredCategories.length === 0" class="guide-sidebar__empty">
            <p>No guides match “{{ searchQuery }}”.</p>
            <button class="btn btn--ghost btn--sm" @click="searchQuery = ''">Clear search</button>
          </div>
        </nav>
      </aside>

      <!-- Central Content Pane -->
      <main class="guide-content">
        <div class="guide-content__inner" v-if="currentGuide">
          <!-- Breadcrumb -->
          <nav class="guide-breadcrumb" aria-label="Breadcrumb">
            <router-link to="/">Home</router-link>
            <span class="guide-breadcrumb__sep">/</span>
            <router-link to="/guide">User Guide</router-link>
            <span class="guide-breadcrumb__sep">/</span>
            <span class="guide-breadcrumb__category">{{ currentCategoryName }}</span>
            <template v-if="currentGuide.group">
              <span class="guide-breadcrumb__sep">/</span>
              <span class="guide-breadcrumb__category">{{ currentGuide.group }}</span>
            </template>
            <span class="guide-breadcrumb__sep">/</span>
            <span class="guide-breadcrumb__current">{{ currentGuide.title }}</span>
          </nav>

          <!-- Guide Header Banner -->
          <header class="guide-doc-header">
            <div class="guide-doc-header__tags">
              <span class="badge">{{ currentCategoryName }}</span>
              <span class="guide-read-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {{ currentGuide.readTime || '6 min read' }}
              </span>
            </div>

            <h1 class="guide-doc-title">{{ currentGuide.title }}</h1>
            <p class="guide-doc-lead">{{ currentGuide.summary }}</p>

            <!-- Workflow Summary Bar -->
            <div v-if="currentGuide.workflow && currentGuide.workflow.length" class="guide-workflow-bar">
              <div class="guide-workflow-bar__label">Workflow Pipeline:</div>
              <div class="guide-workflow-steps">
                <div
                  v-for="(wfStep, idx) in currentGuide.workflow"
                  :key="idx"
                  class="guide-wf-step"
                >
                  <span class="guide-wf-step__num">{{ idx + 1 }}</span>
                  <span class="guide-wf-step__name">{{ wfStep }}</span>
                  <span v-if="idx < currentGuide.workflow.length - 1" class="guide-wf-step__arrow">→</span>
                </div>
              </div>
            </div>
          </header>

          <!-- Step-by-Step Sections -->
          <div class="guide-doc-body">
            
            <!-- Render raw HTML from Aureus docs -->
            <div
              v-if="currentGuide.htmlContent"
              class="guide-raw-html"
              v-html="currentGuide.htmlContent"
              @click="handleContentClick"
            ></div>
            <template v-if="currentGuide.steps">
              <section
                v-for="(step, stepIndex) in currentGuide.steps"
              :key="stepIndex"
              :id="`step-${stepIndex + 1}`"
              class="guide-step-section"
            >
              <div class="guide-step-header">
                <span class="guide-step-num" aria-hidden="true">{{ stepIndex + 1 }}</span>
                <h2 class="guide-step-title">{{ step.title }}</h2>
              </div>

              <div class="guide-step-content">
                <p class="guide-step-desc">{{ step.description }}</p>

                <!-- Detailed Sub-actions -->
                <div v-if="step.instructions && step.instructions.length" class="guide-instructions-card">
                  <div class="guide-instructions-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span>Action Checklist</span>
                  </div>
                  <ul class="guide-checklist">
                    <li v-for="(inst, iIdx) in step.instructions" :key="iIdx">
                      <span class="guide-check-bullet">{{ iIdx + 1 }}.</span>
                      <div class="guide-check-text" v-html="inst"></div>
                    </li>
                  </ul>
                </div>

                <!-- Admin UI Mockup Box -->
                <div v-if="step.uiPreview" class="guide-ui-preview">
                  <div class="guide-ui-preview__bar">
                    <div class="guide-ui-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <span class="guide-ui-title">{{ step.uiPreview.title || 'DEKA ERP Admin Panel' }}</span>
                    <span class="guide-ui-pill">{{ step.uiPreview.module || 'Dashboard' }}</span>
                  </div>
                  <div class="guide-ui-preview__body">
                    <div class="guide-ui-mock-header">
                      <div class="guide-ui-mock-search">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <span>{{ step.uiPreview.searchPlaceholder || 'Search records...' }}</span>
                      </div>
                      <div class="guide-ui-mock-actions">
                        <span v-for="action in step.uiPreview.topActions" :key="action" class="guide-ui-action-btn">{{ action }}</span>
                      </div>
                    </div>
                    <!-- Mock Data Table or Form -->
                    <div v-if="step.uiPreview.fields" class="guide-ui-fields-grid">
                      <div v-for="field in step.uiPreview.fields" :key="field.label" class="guide-ui-field-item">
                        <label>{{ field.label }}</label>
                        <div class="guide-ui-input-box" :class="{ 'guide-ui-input-box--highlight': field.highlight }">{{ field.value }}</div>
                      </div>
                    </div>
                    <div v-if="step.uiPreview.table" class="guide-ui-table-wrap">
                      <table class="guide-ui-table">
                        <thead>
                          <tr>
                            <th v-for="col in step.uiPreview.table.columns" :key="col">{{ col }}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(row, rIdx) in step.uiPreview.table.rows" :key="rIdx">
                            <td v-for="(cell, cIdx) in row" :key="cIdx">
                              <span :class="getCellClass(cell)">{{ cell }}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- Pro-Tip / Important Callout -->
                <div v-if="step.tip" class="guide-callout guide-callout--tip">
                  <div class="guide-callout__icon">💡</div>
                  <div class="guide-callout__body">
                    <strong>Pro Tip:</strong> {{ step.tip }}
                  </div>
                </div>

                <div v-if="step.note" class="guide-callout guide-callout--note">
                  <div class="guide-callout__icon">ℹ️</div>
                  <div class="guide-callout__body">
                    <strong>Note:</strong> {{ step.note }}
                  </div>
                </div>

                <div v-if="step.important" class="guide-callout guide-callout--important">
                  <div class="guide-callout__icon">⚠️</div>
                  <div class="guide-callout__body">
                    <strong>Important:</strong> {{ step.important }}
                  </div>
                </div>
              </div>
            </section>
            </template>
          </div>

          <!-- Bottom Navigation (Prev / Next Guide) -->
          <footer class="guide-footer-nav">
            <button
              v-if="prevGuide"
              class="guide-nav-btn guide-nav-btn--prev"
              @click="selectSection(prevGuide.id)"
            >
              <svg class="guide-nav-btn__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span class="guide-nav-btn__text">
                <span class="guide-nav-btn__dir">Previous</span>
                <span class="guide-nav-btn__name">{{ prevGuide.title }}</span>
              </span>
            </button>
            <div v-else class="guide-nav-btn-spacer"></div>

            <button
              v-if="nextGuide"
              class="guide-nav-btn guide-nav-btn--next"
              @click="selectSection(nextGuide.id)"
            >
              <span class="guide-nav-btn__text">
                <span class="guide-nav-btn__dir">Next</span>
                <span class="guide-nav-btn__name">{{ nextGuide.title }}</span>
              </span>
              <svg class="guide-nav-btn__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </footer>

          <!-- On phones the sidebar CTA and the header actions are both
               hidden, so the page would otherwise offer no way into the app. -->
          <aside class="guide-mobile-cta">
            <p class="guide-mobile-cta__text">Ready to try these steps on your own DEKA instance?</p>
            <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--block">Open DEKA Cloud</a>
          </aside>
        </div>
      </main>

      <!-- Right Table of Contents (On this page) -->
      <aside class="guide-toc">
        <div class="guide-toc__inner">
          <template v-if="pageOutline.length">
            <h4 class="guide-toc__title">On This Page</h4>
            <ul class="guide-toc__list">
              <li v-for="entry in pageOutline" :key="entry.id">
                <a
                  :href="`#${entry.id}`"
                  class="guide-toc__link"
                  :class="{ 'guide-toc__link--active': activeHeading === entry.id }"
                  @click.prevent="jumpTo(entry.id)"
                >{{ entry.text }}</a>
              </li>
            </ul>
          </template>

          <div class="guide-toc__cloud-box">
            <div class="guide-toc__cloud-title">Live application</div>
            <p class="guide-toc__cloud-desc">Ready to try these steps on your own DEKA instance?</p>
            <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--block guide-toc__cloud-btn">Open DEKA Cloud</a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { guideCategories } from '../data/guideData.js'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const isMobileMenuOpen = ref(false)
const searchInputRef = ref(null)

// Flattened list of all guides for easy lookup and prev/next navigation
const allGuides = computed(() => {
  const list = []
  guideCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      list.push({ ...item, categoryName: cat.name })
    })
  })
  return list
})

const totalGuides = computed(() => allGuides.value.length)

// Initialize active section from URL param or default to first guide
const activeSectionId = ref(
  (route.params.section || (allGuides.value[0] && allGuides.value[0].id))
)

watch(
  () => route.params.section,
  (newSec) => {
    if (newSec) {
      activeSectionId.value = newSec
    }
  }
)

const selectSection = (id) => {
  activeSectionId.value = id
  isMobileMenuOpen.value = false
  router.push(`/guide/${id}`)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const currentGuide = computed(() => {
  return allGuides.value.find((g) => g.id === activeSectionId.value) || allGuides.value[0]
})

const currentCategory = computed(() =>
  guideCategories.find((c) => c.items.some((item) => item.id === currentGuide.value?.id))
)

const currentCategoryName = computed(() => currentCategory.value?.name || 'Guides')

/* ── Sidebar: collapsible modules with sub-group headings ── */

// Start with every module folded away — the watcher below opens the one
// holding the current page. With ~80 pages an all-open sidebar is unusable.
const collapsedCategories = ref(new Set(guideCategories.map((c) => c.id)))

const isCategoryOpen = (category) => {
  // While searching, everything with a hit stays open.
  if (searchQuery.value.trim()) return true
  return !collapsedCategories.value.has(category.id)
}

const toggleCategory = (id) => {
  const next = new Set(collapsedCategories.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  collapsedCategories.value = next
}

/**
 * Imported reference pages carry the sub-section they live under
 * (Invoices > Customers > Products). Emit a heading row whenever that
 * sub-section changes so the sidebar mirrors the product's own menu.
 */
const groupItems = (items) => {
  const rows = []
  let lastGroup = null
  items.forEach((item) => {
    if (item.group && item.group !== lastGroup) {
      rows.push({ type: 'group', name: item.group, key: `g-${item.group}-${item.id}` })
    }
    lastGroup = item.group || null
    rows.push({ type: 'item', item, key: item.id })
  })
  return rows
}

/* ── On-page outline ── */

const pageOutline = computed(() => {
  const guide = currentGuide.value
  if (!guide) return []
  if (guide.toc && guide.toc.length) return guide.toc
  if (guide.steps && guide.steps.length) {
    return guide.steps.map((step, idx) => ({
      id: `step-${idx + 1}`,
      text: `Step ${idx + 1}: ${step.title}`,
    }))
  }
  return []
})

// Site header (72) + documentation toolbar (56) + breathing room.
const SCROLL_OFFSET = 152

const activeHeading = ref('')

const jumpTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
  history.replaceState(null, '', `#${id}`)
}

const syncActiveHeading = () => {
  let current = ''
  for (const entry of pageOutline.value) {
    const el = document.getElementById(entry.id)
    if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET + 40) current = entry.id
  }
  activeHeading.value = current || (pageOutline.value[0]?.id ?? '')
}

const currentGuideIndex = computed(() => {
  return allGuides.value.findIndex((g) => g.id === activeSectionId.value)
})

const prevGuide = computed(() => {
  const idx = currentGuideIndex.value
  return idx > 0 ? allGuides.value[idx - 1] : null
})

const nextGuide = computed(() => {
  const idx = currentGuideIndex.value
  return idx >= 0 && idx < allGuides.value.length - 1 ? allGuides.value[idx + 1] : null
})

// Filter guides by search query
const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) return guideCategories

  const q = searchQuery.value.toLowerCase().trim()
  return guideCategories
    .map((cat) => {
      const filteredItems = cat.items.filter((item) => {
        const inTitle = item.title.toLowerCase().includes(q)
        const inGroup = item.group && item.group.toLowerCase().includes(q)
        const inSummary = item.summary && item.summary.toLowerCase().includes(q)
        const inSteps =
          item.steps &&
          item.steps.some(
            (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
          )
        const inHeadings = item.toc && item.toc.some((t) => t.text.toLowerCase().includes(q))
        const inBody = item.htmlContent && item.htmlContent.toLowerCase().includes(q)
        return inTitle || inGroup || inSummary || inSteps || inHeadings || inBody
      })
      return { ...cat, items: filteredItems }
    })
    .filter((cat) => cat.items.length > 0)
})

const resultCount = computed(() =>
  filteredCategories.value.reduce((sum, cat) => sum + cat.items.length, 0)
)

// Keyboard shortcut (Ctrl+K or Cmd+K) to focus search
const handleKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchInputRef.value?.focus()
    searchInputRef.value?.select()
    return
  }
  if (e.key === 'Escape') {
    if (isMobileMenuOpen.value) isMobileMenuOpen.value = false
    else if (document.activeElement === searchInputRef.value) searchInputRef.value.blur()
  }
}

// Stop the page behind the drawer from scrolling on touch devices.
watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// Expand whichever module holds the page being viewed.
watch(
  currentCategory,
  (cat) => {
    if (!cat) return
    const next = new Set(collapsedCategories.value)
    next.delete(cat.id)
    collapsedCategories.value = next
  },
  { immediate: true }
)

watch(
  currentGuide,
  (guide) => {
    if (guide) document.title = `${guide.title} — DEKA ERP User Guide`
    activeHeading.value = pageOutline.value[0]?.id ?? ''
    nextTick(syncActiveHeading)
  },
  { immediate: true }
)

// Intercept clicks on links inside imported documentation so cross-references
// between guides stay client-side.
const handleContentClick = (e) => {
  const anchor = e.target.closest('a')
  if (!anchor) return
  const href = anchor.getAttribute('href') || ''
  if (href.startsWith('/guide/')) {
    e.preventDefault()
    selectSection(href.replace('/guide/', '').split('#')[0])
  } else if (href.startsWith('#')) {
    e.preventDefault()
    jumpTo(href.slice(1))
  } else if (/^https?:/.test(href)) {
    anchor.target = '_blank'
    anchor.rel = 'noopener noreferrer'
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('scroll', syncActiveHeading, { passive: true })
  if (route.params.section) {
    activeSectionId.value = route.params.section
  }
  nextTick(syncActiveHeading)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('scroll', syncActiveHeading)
  document.body.style.overflow = ''
  document.title = 'DEKA ERP'
})

const getCellClass = (cellValue) => {
  if (typeof cellValue !== 'string') return ''
  const lower = cellValue.toLowerCase()
  if (lower === 'confirmed' || lower === 'active' || lower === 'paid' || lower === 'available') {
    return 'guide-badge--success'
  }
  if (lower === 'pending' || lower === 'draft' || lower === 'quotation') {
    return 'guide-badge--warning'
  }
  if (lower === 'cancelled' || lower === 'out of stock') {
    return 'guide-badge--danger'
  }
  return ''
}
</script>

<style scoped>
.guide-layout {
  /* The site header is fixed, the documentation toolbar sticks below it.
     Everything that pins itself measures from the two together. */
  --guide-toolbar: 56px;
  --guide-chrome: calc(var(--header-height) + var(--guide-toolbar));

  min-height: 100vh;
  padding-top: var(--header-height);
  background-color: var(--color-off-white);
  display: flex;
  flex-direction: column;
}

/* ── Documentation toolbar ── */
.guide-header {
  position: sticky;
  top: var(--header-height);
  z-index: 50;
  height: var(--guide-toolbar);
  background: rgba(245, 246, 248, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-sand);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-8);
  gap: var(--space-6);
}

@media (prefers-color-scheme: dark) {
  .guide-header {
    background: rgba(21, 27, 33, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
}

.guide-header__left {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-shrink: 0;
}

.guide-header__badge {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--color-amber-glow);
  color: var(--color-amber-hover);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
}

.guide-header__search {
  position: relative;
  max-width: 480px;
  width: 100%;
  display: flex;
  align-items: center;
}

.guide-header__search svg {
  position: absolute;
  left: var(--space-3);
  color: var(--text-tertiary);
  pointer-events: none;
}

.guide-header__search input {
  width: 100%;
  padding: var(--space-2) var(--space-10) var(--space-2) calc(var(--space-8) + 4px);
  font-size: var(--text-sm);
  font-family: inherit;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-sand);
  background: var(--color-white);
  color: var(--text-primary);
  outline: none;
  transition: all var(--duration-fast) var(--ease-out);
}

.guide-header__search input:focus {
  border-color: var(--color-amber);
  box-shadow: 0 0 0 3px var(--color-amber-glow);
}

.guide-header__kbd,
.guide-header__count {
  position: absolute;
  right: var(--space-3);
  font-size: 11px;
  font-weight: var(--weight-semibold);
  padding: 3px 7px;
  background: var(--color-sand);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  letter-spacing: 0.02em;
  pointer-events: none;
}

.guide-header__count {
  background: var(--color-amber-glow);
  color: var(--color-amber-hover);
}

/* Chrome/Safari draw their own clear button on type=search. */
.guide-header__search input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.guide-header__scope {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  white-space: nowrap;
}

.guide-header__right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

.guide-mobile-menu-btn {
  display: none;
}

/* ── Guide Body Grid ── */
/* The rails anchor to the viewport edges rather than sitting inside a capped
   container — a centred grid leaves the sidebar floating in a grey gutter.
   The reading column is centred within its own track instead. */
.guide-body {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr) 264px;
  width: 100%;
  min-height: calc(100vh - var(--guide-chrome));
}

.guide-sidebar-backdrop {
  display: none;
}

/* ── Left Sidebar ── */
.guide-sidebar {
  position: sticky;
  top: var(--guide-chrome);
  height: calc(100vh - var(--guide-chrome));
  overflow-y: auto;
  border-right: 1px solid var(--color-sand);
  /* Extra padding on the outer edge — this rail now meets the viewport. */
  padding: var(--space-6) var(--space-4) var(--space-12) var(--space-6);
  background: var(--color-white);
}

@media (prefers-color-scheme: dark) {
  .guide-sidebar {
    background: #182028;
    border-right-color: rgba(255, 255, 255, 0.08);
  }
}

.guide-sidebar__header {
  padding: 0 var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-sand);
  margin-bottom: var(--space-4);
}

.guide-sidebar__title {
  display: block;
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-amber);
}

.guide-sidebar__subtitle {
  display: block;
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-top: 2px;
}

.guide-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.guide-category {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.guide-category__header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  transition: background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.guide-category__header:hover {
  background: var(--color-sand-light);
  color: var(--text-secondary);
}

.guide-category__icon {
  display: flex;
  align-items: center;
  color: var(--color-amber);
}

.guide-category__title {
  flex: 1;
  text-align: left;
}

.guide-category__count {
  font-size: 10px;
  font-weight: var(--weight-semibold);
  color: var(--text-tertiary);
  background: var(--color-sand-light);
  border-radius: var(--radius-full);
  padding: 1px 6px;
  letter-spacing: 0;
}

.guide-category__chevron {
  color: var(--text-tertiary);
  transition: transform var(--duration-normal) var(--ease-out);
}

.guide-category__header--collapsed .guide-category__chevron {
  transform: rotate(-90deg);
}

.guide-category__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: var(--space-3);
  margin-left: var(--space-4);
  border-left: 1px solid var(--color-sand);
}

/* Sub-section heading inside a module (Invoices > Customers > …) */
.guide-group-label {
  padding: var(--space-3) var(--space-3) var(--space-1);
  font-size: 10px;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
}

.guide-nav-item {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  text-align: left;
  font-size: var(--text-sm);
  line-height: 1.35;
  color: var(--text-secondary);
  transition: background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.guide-nav-item:hover {
  color: var(--text-primary);
  background: var(--color-sand-light);
}

.guide-nav-item--active {
  background: var(--color-amber-glow);
  color: var(--color-amber-hover);
  font-weight: var(--weight-semibold);
}

.guide-nav-item--active::before {
  content: '';
  position: absolute;
  left: calc(var(--space-3) * -1 - 1px);
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 18px;
  border-radius: var(--radius-full);
  background: var(--color-amber);
}

.guide-nav-item__badge {
  font-size: 10px;
  background: var(--color-amber);
  color: var(--color-charcoal);
  padding: 1px 6px;
  border-radius: var(--radius-full);
  font-weight: var(--weight-bold);
}

.guide-sidebar__empty {
  padding: var(--space-6) var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  text-align: center;
}

/* ── Central Main Content ── */
/* 720px less 40px of padding each side gives roughly 80 characters per line —
   the previous 880px column ran to nearly 100, which is past comfortable
   reading. Centred so the leftover space is even on both sides. */
.guide-content {
  width: 100%;
  max-width: 720px;
  margin-inline: auto;
  padding: var(--space-8) var(--space-10) var(--space-24);
  min-width: 0;
}

.guide-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}

.guide-breadcrumb a {
  color: var(--text-secondary);
  transition: color var(--duration-fast) var(--ease-out);
}

.guide-breadcrumb a:hover {
  color: var(--color-amber);
}

.guide-breadcrumb__sep {
  opacity: 0.4;
}

.guide-breadcrumb__current {
  color: var(--text-primary);
  font-weight: var(--weight-medium);
}

.guide-doc-header {
  margin-bottom: var(--space-10);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-sand);
}

.guide-doc-header__tags {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.guide-read-time {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.guide-doc-title {
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.guide-doc-lead {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

/* Workflow Pipeline Bar */
.guide-workflow-bar {
  margin-top: var(--space-6);
  padding: var(--space-4);
  background: var(--color-white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-sand);
}

.guide-workflow-bar__label {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-2);
}

.guide-workflow-steps {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.guide-wf-step {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
}

.guide-wf-step__num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-amber);
  color: var(--color-charcoal);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--weight-bold);
  font-size: 10px;
}

.guide-wf-step__name {
  color: var(--text-primary);
}

.guide-wf-step__arrow {
  color: var(--text-tertiary);
  font-size: 14px;
}

/* ── Step Section ── */
.guide-step-section {
  margin-bottom: var(--space-12);
  padding-top: var(--space-4);
}

.guide-step-header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

/* A fixed-size numbered badge. The old "STEP 1" pill wrapped its own label
   onto two lines on narrow screens, which collapsed the rounded shape. */
.guide-step-num {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-lg);
  background: var(--color-amber);
  color: var(--color-charcoal);
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  line-height: 1;
  /* Optically centres the digit against the title's first line. */
  margin-top: 1px;
}

.guide-step-title {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
  min-width: 0;
}

.guide-step-desc {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-5);
}

/* Checklist / Action box */
.guide-instructions-card {
  background: var(--color-white);
  border: 1px solid var(--color-sand);
  border-left: 3px solid var(--color-amber);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  margin-bottom: var(--space-6);
}

.guide-instructions-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.guide-checklist {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.guide-checklist li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-snug);
}

.guide-check-bullet {
  font-weight: var(--weight-bold);
  color: var(--color-amber-hover);
  flex-shrink: 0;
}

.guide-check-text strong {
  color: var(--text-primary);
}

/* ── UI Preview Mockup Box ── */
.guide-ui-preview {
  background: #1B2228;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  margin: var(--space-6) 0;
  box-shadow: var(--shadow-lg);
}

.guide-ui-preview__bar {
  background: #151A1F;
  padding: var(--space-2) var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.guide-ui-dots {
  display: flex;
  gap: 5px;
}

.guide-ui-dots span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}

.guide-ui-title {
  font-size: 11px;
  color: var(--text-on-dark-muted);
}

.guide-ui-pill {
  font-size: 10px;
  background: var(--color-amber-glow);
  color: var(--color-amber);
  padding: 1px 6px;
  border-radius: var(--radius-sm);
}

.guide-ui-preview__body {
  padding: var(--space-4);
}

.guide-ui-mock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
  gap: var(--space-3);
}

.guide-ui-mock-search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: #232B33;
  padding: 4px var(--space-3);
  border-radius: var(--radius-md);
  font-size: 11px;
  color: var(--text-on-dark-muted);
  width: 160px;
}

.guide-ui-mock-actions {
  display: flex;
  gap: var(--space-2);
}

.guide-ui-action-btn {
  font-size: 11px;
  background: var(--color-amber);
  color: var(--color-charcoal);
  font-weight: var(--weight-bold);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}

.guide-ui-fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.guide-ui-field-item label {
  display: block;
  font-size: 10px;
  color: var(--text-on-dark-muted);
  margin-bottom: 2px;
  text-transform: uppercase;
}

.guide-ui-input-box {
  background: #232B33;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  font-size: 12px;
  color: var(--text-on-dark);
}

.guide-ui-input-box--highlight {
  border-color: var(--color-amber);
  background: rgba(255, 159, 28, 0.08);
}

.guide-ui-table-wrap {
  overflow-x: auto;
}

.guide-ui-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  color: var(--text-on-dark);
}

.guide-ui-table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  background: #151A1F;
  color: var(--text-on-dark-muted);
  font-weight: var(--weight-semibold);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.guide-ui-table td {
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.guide-badge--success {
  color: #2ECC71;
  background: rgba(46, 204, 113, 0.15);
  padding: 1px 6px;
  border-radius: var(--radius-sm);
}

.guide-badge--warning {
  color: var(--color-amber);
  background: var(--color-amber-glow);
  padding: 1px 6px;
  border-radius: var(--radius-sm);
}

.guide-badge--danger {
  color: #E74C3C;
  background: rgba(231, 76, 60, 0.15);
  padding: 1px 6px;
  border-radius: var(--radius-sm);
}

/* ── Callout Banners ── */
.guide-callout {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  margin: var(--space-4) 0;
}

.guide-callout--tip {
  background: #FFF9EE;
  border: 1px solid rgba(255, 159, 28, 0.3);
  color: #7A4E00;
}

.guide-callout--note {
  background: #EBF5FB;
  border: 1px solid rgba(52, 152, 219, 0.3);
  color: #1B4F72;
}

.guide-callout--important {
  background: #FDF2E9;
  border: 1px solid rgba(230, 126, 34, 0.3);
  color: #7E3800;
}

@media (prefers-color-scheme: dark) {
  .guide-callout--tip {
    background: #2B2316;
    color: #FFB84D;
  }
  .guide-callout--note {
    background: #162430;
    color: #85C1E9;
  }
  .guide-callout--important {
    background: #2C1D13;
    color: #F8C471;
  }
}

/* ── Bottom Pagination ── */
.guide-footer-nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: var(--space-3);
  margin-top: var(--space-16);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-sand);
}

.guide-nav-btn {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 0;
  padding: var(--space-4) var(--space-5);
  background: var(--color-white);
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-xl);
  transition:
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
  cursor: pointer;
  user-select: none;
  text-align: left;
}

.guide-nav-btn__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.guide-nav-btn__icon {
  flex-shrink: 0;
  color: var(--color-amber);
}

@media (prefers-color-scheme: dark) {
  .guide-nav-btn {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

@media (hover: hover) {
  .guide-nav-btn:hover {
    border-color: var(--color-amber);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
}

.guide-nav-btn:active {
  transform: translateY(0) scale(0.985);
}

.guide-nav-btn--next {
  text-align: right;
  justify-content: flex-end;
}

.guide-nav-btn__dir {
  font-size: 11px;
  font-weight: var(--weight-bold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-amber);
}

.guide-nav-btn__name {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  line-height: var(--leading-snug);
}

/* Only shown where the sidebar CTA and header actions are hidden. */
.guide-mobile-cta {
  display: none;
  margin-top: var(--space-10);
  padding: var(--space-6);
  background: var(--color-white);
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-xl);
  text-align: center;
}

.guide-mobile-cta__text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

/* ── Right Table of Contents ── */
.guide-toc {
  position: sticky;
  top: var(--guide-chrome);
  height: calc(100vh - var(--guide-chrome));
  overflow-y: auto;
  border-left: 1px solid var(--color-sand);
  /* Extra padding on the outer edge — this rail now meets the viewport. */
  padding: var(--space-8) var(--space-8) var(--space-8) var(--space-6);
  font-size: var(--text-xs);
}

@media (prefers-color-scheme: dark) {
  .guide-toc {
    border-left-color: rgba(255, 255, 255, 0.08);
  }
}

.guide-toc__title {
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.guide-toc__list {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-8);
}

/* ──────────────────────────────────────────────
   Imported reference documentation

   This markup is injected with v-html, so it never carries the
   scoped-style attribute — every rule below has to go through
   :deep() to reach it.
   ────────────────────────────────────────────── */

.guide-raw-html {
  color: var(--text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
  min-width: 0;
  overflow-wrap: break-word;
}

.guide-raw-html :deep(> *:first-child) {
  margin-top: 0;
}

/* ── Headings ── */

.guide-raw-html :deep(.doc-heading) {
  position: relative;
  color: var(--text-primary);
  scroll-margin-top: calc(var(--guide-chrome) + var(--space-6));
}

.guide-raw-html :deep(.doc-heading--h2) {
  font-size: var(--text-2xl);
  margin: var(--space-12) 0 var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-sand);
}

.guide-raw-html :deep(.doc-heading--h3) {
  font-size: var(--text-lg);
  margin: var(--space-8) 0 var(--space-3);
}

.guide-raw-html :deep(h4) {
  font-size: var(--text-base);
  color: var(--text-primary);
  margin: var(--space-6) 0 var(--space-2);
}

.guide-raw-html :deep(.doc-anchor) {
  position: absolute;
  margin-left: var(--space-2);
  color: var(--color-amber);
  font-weight: var(--weight-normal);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.guide-raw-html :deep(.doc-heading:hover .doc-anchor),
.guide-raw-html :deep(.doc-anchor:focus-visible) {
  opacity: 1;
}

/* ── Body copy ── */

.guide-raw-html :deep(p) {
  margin: 0 0 var(--space-4);
}

.guide-raw-html :deep(strong) {
  color: var(--text-primary);
  font-weight: var(--weight-semibold);
}

.guide-raw-html :deep(a) {
  color: var(--color-amber-hover);
  font-weight: var(--weight-medium);
  text-decoration: underline;
  text-decoration-color: var(--color-amber-glow);
  text-underline-offset: 3px;
  transition: text-decoration-color var(--duration-fast) var(--ease-out);
}

.guide-raw-html :deep(a:hover) {
  text-decoration-color: currentColor;
}

.guide-raw-html :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-sand);
  margin: var(--space-10) 0;
}

/* ── Lists ── */

.guide-raw-html :deep(ul),
.guide-raw-html :deep(ol) {
  margin: 0 0 var(--space-4);
  padding-left: var(--space-6);
  list-style: revert;
}

.guide-raw-html :deep(li) {
  margin-bottom: var(--space-2);
  padding-left: var(--space-1);
}

.guide-raw-html :deep(li::marker) {
  color: var(--color-amber);
  font-weight: var(--weight-semibold);
}

.guide-raw-html :deep(li > ul),
.guide-raw-html :deep(li > ol) {
  margin-top: var(--space-2);
}

/* ── Code & navigation paths ── */

.guide-raw-html :deep(code) {
  background: var(--color-sand-light);
  border: 1px solid var(--color-sand);
  padding: 0.1em 0.4em;
  border-radius: var(--radius-sm);
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
  font-size: 0.875em;
  color: var(--text-primary);
}

.guide-raw-html :deep(pre) {
  background: var(--color-charcoal);
  color: var(--color-sand-light);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  overflow-x: auto;
  margin: 0 0 var(--space-4);
  font-size: var(--text-sm);
}

.guide-raw-html :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
}

/* `Sales → Orders → Quotations` — a menu path, not code. It has to be
   allowed to wrap: these paths are long enough to blow out a phone. */
.guide-raw-html :deep(.doc-path) {
  display: inline;
  background: var(--color-amber-glow);
  color: var(--color-amber-hover);
  padding: 0.15em 0.6em;
  border-radius: var(--radius-md);
  font-size: 0.9em;
  font-weight: var(--weight-semibold);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

/* ── Callouts ── */

.guide-raw-html :deep(.doc-callout) {
  --callout-accent: var(--color-warm-gray);
  --callout-tint: var(--color-sand-light);

  display: grid;
  gap: var(--space-1);
  margin: 0 0 var(--space-5);
  padding: var(--space-4) var(--space-5);
  background: var(--callout-tint);
  border-left: 3px solid var(--callout-accent);
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
}

.guide-raw-html :deep(.doc-callout > *:last-child > *:last-child) {
  margin-bottom: 0;
}

.guide-raw-html :deep(.doc-callout__label) {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--callout-accent);
}

.guide-raw-html :deep(.doc-callout--tip) {
  --callout-accent: #2E9E6B;
  --callout-tint: rgba(46, 158, 107, 0.08);
}

.guide-raw-html :deep(.doc-callout--important) {
  --callout-accent: #D14343;
  --callout-tint: rgba(209, 67, 67, 0.08);
}

.guide-raw-html :deep(.doc-callout--note),
.guide-raw-html :deep(.doc-callout--next) {
  --callout-accent: var(--color-amber-hover);
  --callout-tint: var(--color-amber-glow);
}

/* ── Tables ── */

.guide-raw-html :deep(.doc-table-wrap) {
  overflow-x: auto;
  margin: 0 0 var(--space-6);
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-lg);
  -webkit-overflow-scrolling: touch;
}

.guide-raw-html :deep(table) {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.guide-raw-html :deep(th) {
  text-align: left;
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  background: var(--color-sand-light);
  padding: var(--space-3) var(--space-4);
  white-space: nowrap;
}

.guide-raw-html :deep(td) {
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-sand);
  vertical-align: top;
}

.guide-toc__link {
  display: block;
  padding: var(--space-1) 0 var(--space-1) var(--space-3);
  border-left: 2px solid var(--color-sand);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-snug);
  transition: color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.guide-toc__link:hover {
  color: var(--color-amber);
  border-left-color: var(--color-amber-light);
}

.guide-toc__link--active {
  color: var(--color-amber-hover);
  border-left-color: var(--color-amber);
  font-weight: var(--weight-semibold);
}

.guide-toc__cloud-box {
  background: var(--color-white);
  padding: var(--space-5);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-sand);
}

.guide-toc__cloud-title {
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-2);
}

.guide-toc__cloud-desc {
  color: var(--text-tertiary);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-4);
}

.guide-toc__cloud-btn {
  --btn-font-size: var(--text-xs);
}

/* ── Responsive ── */
@media (max-width: 1200px) {
  .guide-body {
    grid-template-columns: 260px minmax(0, 1fr);
  }

  /* The on-page outline goes, and with it the only in-page CTA. */
  .guide-toc {
    display: none;
  }

  .guide-mobile-cta {
    display: block;
  }
}

/* Below this width the sidebar turns into a drawer — the same breakpoint
   that reveals the hamburger, so the button is never inert. */
@media (max-width: 860px) {
  .guide-header {
    padding: 0 var(--space-4);
    gap: var(--space-3);
  }

  .guide-header__search {
    flex: 1;
    max-width: unset;
  }

  .guide-header__scope,
  .guide-header__cta,
  .guide-header__kbd {
    display: none;
  }

  .guide-mobile-menu-btn {
    display: inline-flex;
  }

  .guide-body {
    grid-template-columns: minmax(0, 1fr);
  }

  .guide-sidebar {
    position: fixed;
    top: var(--guide-chrome);
    left: 0;
    width: min(320px, 85vw);
    height: calc(100dvh - var(--guide-chrome));
    z-index: 90;
    transform: translateX(-100%);
    transition: transform var(--duration-normal) var(--ease-out);
    box-shadow: var(--shadow-xl);
    overscroll-behavior: contain;
  }

  .guide-sidebar--open {
    transform: translateX(0);
  }

  .guide-sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    top: var(--guide-chrome);
    background: rgba(21, 27, 33, 0.5);
    backdrop-filter: blur(2px);
    z-index: 80;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--duration-normal) var(--ease-out), visibility var(--duration-normal);
  }

  .guide-sidebar-backdrop--visible {
    opacity: 1;
    visibility: visible;
  }

  .guide-content {
    padding: var(--space-6) var(--space-6) var(--space-16);
  }
}

@media (max-width: 620px) {
  /* Side by side these two squeeze guide titles into three-word columns. */
  .guide-footer-nav {
    grid-template-columns: minmax(0, 1fr);
  }

  .guide-nav-btn-spacer {
    display: none;
  }

  /* Both read left to right once stacked; the chevron keeps to its edge. */
  .guide-nav-btn--next {
    justify-content: space-between;
    text-align: left;
  }
}

@media (max-width: 500px) {
  .guide-header__badge {
    display: none;
  }

  .guide-content {
    padding: var(--space-5) var(--space-4) var(--space-16);
  }

  .guide-step-title {
    font-size: var(--text-xl);
  }

  .guide-step-num {
    width: 30px;
    height: 30px;
    font-size: var(--text-base);
  }

  .guide-doc-title {
    font-size: var(--text-3xl);
  }

  .guide-ui-fields-grid {
    grid-template-columns: 1fr;
  }

  .guide-raw-html :deep(.doc-heading--h2) {
    font-size: var(--text-xl);
    margin-top: var(--space-10);
  }

  .guide-raw-html :deep(.doc-callout) {
    padding: var(--space-3) var(--space-4);
  }

  .guide-raw-html :deep(ul),
  .guide-raw-html :deep(ol) {
    padding-left: var(--space-5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .guide-sidebar,
  .guide-sidebar-backdrop,
  .guide-category__chevron {
    transition-duration: 1ms;
  }
}
</style>
