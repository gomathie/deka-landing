<template>
  <section class="trust" aria-label="DEKA ERP at a glance">
    <div class="container">
      <dl class="trust__grid" v-reveal.children>
        <div v-for="stat in stats" :key="stat.label" class="trust__item">
          <dt class="trust__value" :class="{ 'trust__value--glyph': stat.glyph }">
            {{ stat.value }}<span v-if="stat.suffix" class="trust__suffix">{{ stat.suffix }}</span>
          </dt>
          <dd class="trust__label">{{ stat.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup>
// referencePages is regenerated with the documentation, so this figure can
// never drift from what the guide actually contains. The stats module is a
// few bytes — importing the corpus itself would drag it into this bundle.
import { referencePages } from '../data/guideStats.js'

const stats = [
  { value: '14', label: 'Modules, installed à la carte' },
  { value: Math.floor(referencePages / 10) * 10, suffix: '+', label: 'Step-by-step guides' },
  { value: '5', label: 'Interface languages' },
  { value: '∞', glyph: true, label: 'Companies, one installation' },
]
</script>

<style scoped>
.trust {
  padding: var(--space-10) 0;
  background: var(--color-white);
  border-block: 1px solid var(--color-sand);
}

.trust__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

.trust__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  text-align: center;
  padding: var(--space-2) var(--space-4);
}

/* Hairline separators between the figures, but not before the first. */
.trust__item + .trust__item {
  border-left: 1px solid var(--color-sand);
}

.trust__value {
  display: flex;
  align-items: baseline;
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

/* The infinity glyph has a much smaller cap height than the digits. */
.trust__value--glyph {
  font-size: calc(var(--text-4xl) * 1.35);
  line-height: 0.74;
}

.trust__suffix {
  color: var(--color-amber);
  margin-left: 1px;
}

.trust__label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-snug);
  max-width: 20ch;
}

@media (max-width: 860px) {
  .trust__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-8) var(--space-4);
  }

  /* Only the second column keeps a divider once the grid wraps. */
  .trust__item + .trust__item {
    border-left: none;
  }

  .trust__item:nth-child(2n) {
    border-left: 1px solid var(--color-sand);
  }

  .trust__value {
    font-size: var(--text-3xl);
  }

  .trust__value--glyph {
    font-size: calc(var(--text-3xl) * 1.35);
  }
}

@media (max-width: 420px) {
  .trust__label {
    font-size: var(--text-xs);
  }
}
</style>
