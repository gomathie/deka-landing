<template>
  <footer class="footer" id="site-footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <router-link to="/" aria-label="DEKA ERP Home">
          <img src="/logos/logo.svg" alt="DEKA" class="footer__logo" width="32" height="32" />
        </router-link>
        <p class="footer__tagline">The all-in-one ERP for growing businesses.</p>
      </div>

      <div class="footer__links">
        <div class="footer__col">
          <h4 class="footer__col-title">Product</h4>
          <a href="/#features" class="footer__link">Features</a>
          <a href="/#benefits" class="footer__link">Benefits</a>
          <a href="/#multi-company" class="footer__link">Multi-Company</a>
          <a href="/#deployment" class="footer__link">Deployment</a>
          <router-link to="/blog" class="footer__link">Blog</router-link>
        </div>
        <div class="footer__col">
          <h4 class="footer__col-title">Documentation</h4>
          <router-link to="/guide/overview" class="footer__link">Platform Overview</router-link>
          <router-link to="/guide/multi-company-guide" class="footer__link">Multi-Company Guide</router-link>
          <router-link to="/guide/quotations-orders" class="footer__link">Sales &amp; Orders</router-link>
          <router-link to="/guide/inventory-operations" class="footer__link">Inventory &amp; Barcode</router-link>
          <router-link to="/guide" class="footer__link footer__link--highlight">Full User Guide →</router-link>
        </div>
        <div class="footer__col">
          <h4 class="footer__col-title">Access</h4>
          <a href="https://cloud.dekaerp.com" class="footer__link">Get Started</a>
          <a href="https://cloud.dekaerp.com" class="footer__link">Sign In</a>
        </div>
        <div class="footer__col">
          <h4 class="footer__col-title">Legal</h4>
          <router-link to="/privacy" class="footer__link">Privacy Policy</router-link>
          <router-link to="/sitemap" class="footer__link">Site Map</router-link>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">&copy; {{ currentYear }} DEKA ERP. All rights reserved.</p>
        <p class="footer__tech">
          Built with
          <a href="https://laravel.com" target="_blank" rel="noopener noreferrer" class="footer__tech-link">Laravel</a>
          &amp;
          <a href="https://filamentphp.com" target="_blank" rel="noopener noreferrer" class="footer__tech-link">Filament</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: var(--color-charcoal);
  color: var(--text-on-dark-muted);
  padding: var(--space-16) 0 var(--space-8);
}

.footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__logo {
  width: 32px;
  height: 32px;
}

.footer__tagline {
  font-size: var(--text-sm);
  color: var(--text-on-dark-muted);
  max-width: 280px;
}

.footer__links {
  display: flex;
  gap: var(--space-16);
  flex-wrap: wrap;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__col-title {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-on-dark-muted);
  margin-bottom: var(--space-1);
}

.footer__link {
  font-size: var(--text-sm);
  color: rgba(240, 237, 231, 0.65);
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__link:hover {
  color: var(--color-amber);
}

.footer__link--highlight {
  color: var(--color-amber);
  font-weight: var(--weight-semibold);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-8);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.footer__copy {
  font-size: var(--text-xs);
  color: rgba(240, 237, 231, 0.4);
}

.footer__tech {
  font-size: var(--text-xs);
  color: rgba(240, 237, 231, 0.3);
}

.footer__tech-link {
  color: rgba(240, 237, 231, 0.5);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__tech-link:hover {
  color: var(--color-amber);
}

@media (max-width: 640px) {
  .footer__links {
    gap: var(--space-8);
  }

  .footer__bottom {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>
