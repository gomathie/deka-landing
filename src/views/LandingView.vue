<template>
  <div class="landing-view">
    <AppHeader />
    <main>
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <BenefitsSection />

      <!--
        The module list and the multi-company section live on /about, which is
        where the nav, footer and site map now point. This band keeps a route
        to them from the landing page rather than leaving them nav-only.
      -->
      <section class="landing-explore section">
        <div class="container landing-explore__inner" v-reveal>
          <div>
            <span class="section-label">Fourteen modules</span>
            <h2 class="landing-explore__title">Install only what you use</h2>
            <p class="landing-explore__text">
              Sell, buy, make and move, run the business — plus multi-company built into
              the platform rather than sold as an add-on. See the full breakdown.
            </p>
          </div>
          <div class="landing-explore__actions btn-row">
            <router-link to="/about#features" class="btn btn--primary btn--large">
              Explore the modules
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </router-link>
            <router-link to="/about#multi-company" class="btn btn--secondary btn--large">
              Multi-company
            </router-link>
          </div>
        </div>
      </section>

      <DeploymentSection />
      <CtaSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import TrustStrip from '../components/TrustStrip.vue'
import ProblemSection from '../components/ProblemSection.vue'
import BenefitsSection from '../components/BenefitsSection.vue'
import DeploymentSection from '../components/DeploymentSection.vue'
import CtaSection from '../components/CtaSection.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<style scoped>
.landing-view {
  min-height: 100vh;
}

.landing-explore {
  background-color: var(--color-off-white);
}

.landing-explore__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-10);
  padding: var(--space-10) var(--space-8);
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-2xl);
  background: var(--color-white);
}

.landing-explore__title {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-3);
}

.landing-explore__text {
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  max-width: 52ch;
}

.landing-explore__actions {
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .landing-explore__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-8);
  }

  .landing-explore__actions {
    width: 100%;
  }
}

@media (max-width: 560px) {
  .landing-explore__inner {
    padding: var(--space-8) var(--space-5);
  }

  .landing-explore__title {
    font-size: var(--text-2xl);
  }
}
</style>
