<template>
  <div class="about-view">
    <AppHeader solid />

    <main>
      <!-- Intro -->
      <section class="about-hero">
        <div class="about-hero__backdrop" aria-hidden="true">
          <div class="about-hero__glow"></div>
        </div>

        <div class="container about-hero__inner">
          <span class="section-label">About DEKA ERP</span>
          <h1 class="about-hero__title">
            One system for the whole operation,<br />
            <span class="text-gradient">assembled from the parts you need.</span>
          </h1>
          <p class="about-hero__lead">
            DEKA ERP brings sales, purchasing, inventory, manufacturing, accounting and HR
            onto a single platform, so a record created once is the same record everywhere.
            It is modular by design — install what your business does, and leave the rest.
          </p>

          <div class="about-hero__points">
            <div v-for="point in points" :key="point.title" class="about-point">
              <span class="about-point__icon" v-html="point.icon"></span>
              <div>
                <h2 class="about-point__title">{{ point.title }}</h2>
                <p class="about-point__text">{{ point.text }}</p>
              </div>
            </div>
          </div>

          <div class="about-hero__actions btn-row">
            <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--large">Get started</a>
            <router-link to="/guide" class="btn btn--secondary btn--large">Read the user guide</router-link>
          </div>
        </div>
      </section>

      <TrustStrip />

      <!-- The two sections this page exists to hold -->
      <ModulesSection />
      <MultiCompanySection />

      <CtaSection />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import TrustStrip from '../components/TrustStrip.vue'
import ModulesSection from '../components/ModulesSection.vue'
import MultiCompanySection from '../components/MultiCompanySection.vue'
import CtaSection from '../components/CtaSection.vue'

const icon = (paths) =>
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`

const points = [
  {
    title: 'Built for the messy middle',
    text: 'Past spreadsheets, short of an enterprise rollout. The stage where the process exists but nothing enforces it.',
    icon: icon('<path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path>'),
  },
  {
    title: 'Modular, not monolithic',
    text: 'Fourteen modules in four groups. A business that does not manufacture never sees Manufacturing.',
    icon: icon('<rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect>'),
  },
  {
    title: 'Yours to run, wherever',
    text: 'Our managed cloud or your own servers, running the same application either way. Your data stays portable.',
    icon: icon('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>'),
  },
]

onMounted(() => {
  document.title = 'About — DEKA ERP'
})

onUnmounted(() => {
  document.title = 'DEKA ERP'
})
</script>

<style scoped>
.about-view {
  min-height: 100vh;
  background-color: var(--color-off-white);
}

/* ── Intro ── */
.about-hero {
  position: relative;
  overflow: hidden;
  padding: calc(var(--header-height) + var(--space-20)) 0 var(--space-20);
  background: linear-gradient(180deg, var(--color-off-white) 0%, var(--color-sand-light) 100%);
}

@media (prefers-color-scheme: dark) {
  .about-hero {
    background: linear-gradient(180deg, var(--color-off-white) 0%, #1A2028 100%);
  }
}

.about-hero__backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.about-hero__glow {
  position: absolute;
  top: -22%;
  right: -6%;
  width: 44vw;
  max-width: 620px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 159, 28, 0.24) 0%, transparent 70%);
  filter: blur(90px);
}

@media (prefers-color-scheme: dark) {
  .about-hero__glow {
    background: radial-gradient(circle, rgba(255, 159, 28, 0.16) 0%, transparent 70%);
  }
}

.about-hero__inner {
  position: relative;
}

.about-hero__title {
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-5);
  max-width: 18ch;
}

.about-hero__lead {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  max-width: 62ch;
  margin-bottom: var(--space-12);
}

.about-hero__points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

.about-point {
  display: flex;
  gap: var(--space-4);
}

.about-point__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background: var(--color-amber-glow);
  color: var(--color-amber-hover);
}

.about-point__title {
  font-size: var(--text-base);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-1);
}

.about-point__text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

/* ── Responsive ── */
@media (max-width: 820px) {
  .about-hero {
    padding-top: calc(var(--header-height) + var(--space-12));
  }

  .about-hero__title {
    font-size: var(--text-4xl);
    max-width: none;
  }
}

@media (max-width: 560px) {
  .about-hero__title {
    font-size: var(--text-3xl);
  }

  .about-hero__lead {
    font-size: var(--text-base);
    margin-bottom: var(--space-10);
  }

  .about-hero__points {
    gap: var(--space-6);
  }
}
</style>
