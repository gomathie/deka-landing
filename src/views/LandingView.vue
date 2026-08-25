<template>
  <div class="landing-view">
    <AppHeader />
    <main>
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <ModulesSection />
      <BenefitsSection />
      <MultiCompanySection />
      <PricingSection />
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
import ModulesSection from '../components/ModulesSection.vue'
import BenefitsSection from '../components/BenefitsSection.vue'
import MultiCompanySection from '../components/MultiCompanySection.vue'
import DeploymentSection from '../components/DeploymentSection.vue'
import PricingSection from '../components/PricingSection.vue'
import CtaSection from '../components/CtaSection.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<style scoped>
.landing-view {
  min-height: 100vh;
}
</style>
