<template>
  <div class="pricing" id="pricing">
    <div>
      <!-- Header + billing toggle -->
      <section class="pricing-hero">
        <div class="container pricing-hero__inner">
          <span class="section-label">Pricing</span>
          <h2 class="pricing-hero__title">Priced by what you run, not per module</h2>
          <p class="pricing-hero__lead">
            Every plan includes multi-company, the full user guide and daily backups.
            No setup fee, no per-module upsell, and no charge for customers using the portal.
          </p>

          <div class="billing-toggle" role="group" aria-label="Billing period">
            <button
              class="billing-toggle__option"
              :class="{ 'billing-toggle__option--active': !annual }"
              :aria-pressed="!annual"
              @click="annual = false"
            >
              Monthly
            </button>
            <button
              class="billing-toggle__option"
              :class="{ 'billing-toggle__option--active': annual }"
              :aria-pressed="annual"
              @click="annual = true"
            >
              Annual
              <span class="billing-toggle__save">{{ monthsFree }} months free</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Tiers -->
      <section class="pricing-tiers">
        <div class="container">
          <div class="tier-grid" v-reveal.children>
            <div
              v-for="tier in tiers"
              :key="tier.id"
              class="tier"
              :class="{ 'tier--popular': tier.popular }"
            >
              <span v-if="tier.popular" class="tier__flag">Most popular</span>

              <h2 class="tier__name">{{ tier.name }}</h2>
              <p class="tier__tagline">{{ tier.tagline }}</p>

              <div class="tier__price">
                <template v-if="priceFor(tier, annual) !== null">
                  <span class="tier__amount">{{ symbol }}{{ priceFor(tier, annual) }}</span>
                  <span class="tier__period">/month</span>
                </template>
                <span v-else class="tier__amount tier__amount--custom">Custom</span>
              </div>
              <p class="tier__billing">
                <template v-if="priceFor(tier, annual) !== null">
                  {{ annual ? `Billed annually in ${currency}` : `Billed monthly in ${currency}` }}
                </template>
                <template v-else>Priced on your scale and support needs</template>
              </p>

              <a :href="tier.ctaHref" class="btn btn--block tier__cta" :class="tier.popular ? 'btn--primary' : 'btn--secondary'">
                {{ tier.cta }}
              </a>

              <ul class="tier__list">
                <li v-for="item in tier.highlights" :key="item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>

          <p class="pricing-note">
            Prices exclude any local taxes. Need more users or entities than Business allows?
            Enterprise scales without a per-seat cliff.
          </p>
        </div>
      </section>

      <!-- Comparison -->
      <section class="section pricing-compare">
        <div class="container">
          <div class="pricing-compare__header" v-reveal>
            <span class="section-label">Compare</span>
            <h2 class="section-title">What each plan includes</h2>
          </div>

          <div class="compare-wrap">
            <table class="compare">
              <thead>
                <tr>
                  <th scope="col" class="compare__feature-head">Feature</th>
                  <th v-for="tier in tiers" :key="tier.id" scope="col" :class="{ 'compare__col--popular': tier.popular }">
                    {{ tier.name }}
                  </th>
                </tr>
              </thead>
              <tbody v-for="section in comparison" :key="section.group">
                <tr class="compare__group">
                  <th scope="colgroup" :colspan="tiers.length + 1">{{ section.group }}</th>
                </tr>
                <tr v-for="row in section.rows" :key="row.label">
                  <th scope="row">{{ row.label }}</th>
                  <td v-for="tier in tiers" :key="tier.id" :class="{ 'compare__col--popular': tier.popular }">
                    <span v-if="row[tier.id] === true" class="compare__yes" aria-label="Included">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span v-else-if="row[tier.id] === false" class="compare__no" aria-label="Not included">—</span>
                    <span v-else class="compare__text">{{ row[tier.id] }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Self-hosting -->
      <section class="section pricing-selfhost">
        <div class="container pricing-selfhost__inner" v-reveal>
          <div>
            <span class="section-label">Self-hosted</span>
            <h2 class="pricing-selfhost__title">Would rather run it yourself?</h2>
            <p class="pricing-selfhost__text">
              Enterprise includes a self-hosted deployment — the same application we run on
              our cloud, on your infrastructure. Sensible where data residency is a contractual
              obligation rather than a preference.
            </p>
          </div>
          <div class="btn-row pricing-selfhost__actions">
            <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--large">Talk to us</a>
            <router-link to="/blog/cloud-or-self-hosted" class="btn btn--secondary btn--large">
              Cloud or self-hosted?
            </router-link>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="section pricing-faq">
        <div class="container container--narrow">
          <div class="pricing-faq__header" v-reveal>
            <span class="section-label">Questions</span>
            <h2 class="section-title">Before you commit</h2>
          </div>

          <div class="faq-list" v-reveal.children>
            <details v-for="(faq, i) in faqs" :key="i" class="faq">
              <summary class="faq__q">
                {{ faq.q }}
                <svg class="faq__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p class="faq__a">{{ faq.a }}</p>
            </details>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  tiers,
  comparison,
  faqs,
  currency,
  symbol,
  monthsFree,
  priceFor,
} from '../data/pricing.js'

// Annual is the default because it is the cheaper option — showing the higher
// monthly figure first would misrepresent the price most customers pay.
const annual = ref(true)
</script>

<style scoped>
.pricing {
  background-color: var(--color-off-white);
  scroll-margin-top: var(--header-height);
}

/* ── Header ── */
.pricing-hero {
  padding: var(--space-20) 0 var(--space-12);
  background: linear-gradient(180deg, var(--color-off-white) 0%, var(--color-sand-light) 100%);
}

@media (prefers-color-scheme: dark) {
  .pricing-hero {
    background: linear-gradient(180deg, var(--color-off-white) 0%, #1A2028 100%);
  }
}

.pricing-hero__inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pricing-hero__title {
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-4);
  max-width: 18ch;
}

.pricing-hero__lead {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  max-width: 62ch;
  margin-bottom: var(--space-8);
}

/* ── Billing toggle ── */
.billing-toggle {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: var(--radius-full);
  background: var(--color-white);
  border: 1px solid var(--color-sand);
}

.billing-toggle__option {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.5rem;
  padding: 0 var(--space-5);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-secondary);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.billing-toggle__option--active {
  background: var(--color-charcoal);
  color: var(--color-sand-light);
}

@media (prefers-color-scheme: dark) {
  .billing-toggle__option--active {
    background: var(--color-amber);
    color: var(--color-charcoal);
  }
}

.billing-toggle__save {
  font-size: 11px;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background: var(--color-amber-glow);
  color: var(--color-amber-hover);
}

.billing-toggle__option--active .billing-toggle__save {
  background: rgba(255, 255, 255, 0.16);
  color: inherit;
}

/* ── Tiers ── */
.pricing-tiers {
  padding-bottom: var(--space-16);
  background: linear-gradient(180deg, var(--color-sand-light) 0%, var(--color-off-white) 140px);
}

@media (prefers-color-scheme: dark) {
  .pricing-tiers {
    background: linear-gradient(180deg, #1A2028 0%, var(--color-off-white) 140px);
  }
}

.tier-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-6);
  align-items: start;
}

.tier {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--color-white);
  border: 1px solid var(--color-sand);
}

.tier--popular {
  border-color: var(--color-amber);
  box-shadow: var(--shadow-lg);
}

.tier__flag {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  background: var(--color-amber);
  color: var(--color-charcoal);
  font-size: 11px;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.tier__name {
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-2);
}

.tier__tagline {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-6);
  min-height: 2.6em;
}

.tier__price {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}

.tier__amount {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--text-primary);
}

.tier__amount--custom {
  font-size: var(--text-4xl);
}

.tier__period {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.tier__billing {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin: var(--space-2) 0 var(--space-6);
  min-height: 1.4em;
}

.tier__cta {
  margin-bottom: var(--space-6);
}

.tier__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.tier__list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  line-height: var(--leading-snug);
}

.tier__list svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-amber);
}

.pricing-note {
  margin-top: var(--space-8);
  text-align: center;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

/* ── Comparison table ── */
.pricing-compare__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-10);
}

.compare-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-xl);
  background: var(--color-white);
  -webkit-overflow-scrolling: touch;
}

.compare {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.compare th,
.compare td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
}

.compare thead th {
  position: sticky;
  top: 0;
  background: var(--color-sand-light);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  white-space: nowrap;
}

.compare thead th:not(.compare__feature-head) {
  text-align: center;
}

.compare__feature-head {
  min-width: 260px;
}

.compare__group th {
  background: var(--color-sand-light);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-amber-hover);
}

.compare tbody tr:not(.compare__group) th {
  font-weight: var(--weight-normal);
  color: var(--text-secondary);
  border-top: 1px solid var(--color-sand);
}

.compare tbody tr:not(.compare__group) td {
  text-align: center;
  border-top: 1px solid var(--color-sand);
}

.compare__col--popular {
  background: var(--color-amber-glow);
}

.compare__yes {
  display: inline-flex;
  color: #2E9E6B;
}

.compare__no {
  color: var(--text-tertiary);
}

.compare__text {
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
}

/* ── Self-hosting ── */
.pricing-selfhost__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-10);
  padding: var(--space-10) var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--color-white);
  border: 1px solid var(--color-sand);
}

.pricing-selfhost__title {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-3);
}

.pricing-selfhost__text {
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  max-width: 54ch;
}

.pricing-selfhost__actions {
  flex-shrink: 0;
}

/* ── FAQ ── */
.pricing-faq__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-10);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.faq {
  background: var(--color-white);
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
}

.faq__q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  cursor: pointer;
  list-style: none;
}

.faq__q::-webkit-details-marker {
  display: none;
}

.faq__chevron {
  flex-shrink: 0;
  color: var(--color-amber);
  transition: transform var(--duration-normal) var(--ease-out);
}

.faq[open] .faq__chevron {
  transform: rotate(180deg);
}

.faq__a {
  margin-top: var(--space-3);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  font-size: var(--text-sm);
}

/* ── Responsive ── */
@media (max-width: 960px) {
  .tier-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-8);
  }

  .tier__tagline,
  .tier__billing {
    min-height: 0;
  }

  .pricing-selfhost__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-8);
  }

  .pricing-selfhost__actions {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .pricing-hero {
    padding-top: var(--space-12);
  }

  .pricing-hero__title {
    font-size: var(--text-3xl);
  }

  .pricing-hero__lead {
    font-size: var(--text-base);
  }

  .billing-toggle {
    width: 100%;
  }

  .billing-toggle__option {
    flex: 1;
    justify-content: center;
    padding: 0 var(--space-3);
  }

  .billing-toggle__save {
    display: none;
  }

  .tier,
  .pricing-selfhost__inner {
    padding: var(--space-6);
  }

  .pricing-selfhost__title {
    font-size: var(--text-2xl);
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq__chevron {
    transition: none;
  }
}
</style>
