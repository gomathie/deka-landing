<template>
  <section class="deploy section" id="deployment">
    <div class="container">
      <div class="deploy__header">
        <span class="section-label">Deployment</span>
        <h2 class="section-title">Your infrastructure, or ours</h2>
        <p class="section-subtitle">
          Run DEKA ERP on our managed cloud, or deploy it entirely on your own
          servers — critical where data residency matters.
        </p>
      </div>

      <div class="deploy__grid">
        <div class="deploy__card">
          <div class="deploy__card-badge">Popular</div>
          <div class="deploy__card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
          </div>
          <h3 class="deploy__card-title">Cloud Hosted</h3>
          <p class="deploy__card-desc">
            We run it. You use it. Managed infrastructure, automatic updates,
            and backups — focus on your business, not servers.
          </p>
          <ul class="deploy__features">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Managed infrastructure
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Automatic updates
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Daily backups
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Start in minutes
            </li>
          </ul>
          <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--large deploy__cta" id="deploy-cloud-cta">Get Started</a>
        </div>

        <div class="deploy__card deploy__card--outline">
          <div class="deploy__card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          </div>
          <h3 class="deploy__card-title">Self-Hosted</h3>
          <p class="deploy__card-desc">
            Deploy on your own servers. Full control over your data, your
            environment, and your compliance requirements.
          </p>
          <ul class="deploy__features">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Complete data sovereignty
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Your infrastructure, your rules
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Data residency compliance
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              REST API with token auth
            </li>
          </ul>
          <a href="https://cloud.dekaerp.com" class="btn btn--secondary btn--large deploy__cta" id="deploy-self-cta">Talk to Us</a>
        </div>
      </div>

      <!-- Language support note -->
      <div class="deploy__languages">
        <span class="deploy__languages-label">Available in 5 languages</span>
        <div class="deploy__lang-tags">
          <span class="deploy__lang-tag">English</span>
          <span class="deploy__lang-tag">العربية</span>
          <span class="deploy__lang-tag">Français</span>
          <span class="deploy__lang-tag">Español</span>
          <span class="deploy__lang-tag">Português (BR)</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.deploy {
  background-color: var(--color-white);
}

.deploy__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-16);
}

.deploy__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
  max-width: 840px;
  margin: 0 auto;
}

.deploy__card {
  position: relative;
  padding: var(--space-10);
  border-radius: var(--radius-2xl);
  background: linear-gradient(135deg, #FFF9EE 0%, #FFF5E0 100%);
  border: 1.5px solid rgba(255, 159, 28, 0.25);
  display: flex;
  flex-direction: column;
  transition: all var(--duration-normal) var(--ease-out);
}

.deploy__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.deploy__card--outline {
  background: var(--color-white);
  border-color: var(--color-sand);
}

@media (prefers-color-scheme: dark) {
  .deploy__card {
    background: linear-gradient(135deg, #252016 0%, #2A2418 100%);
    border-color: rgba(255, 159, 28, 0.3);
  }
  .deploy__card--outline {
    background: var(--color-white);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

.deploy__card-badge {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  background: var(--color-amber);
  color: var(--color-charcoal);
  border-radius: var(--radius-full);
}

.deploy__card-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-xl);
  background: var(--color-amber-glow);
  color: var(--color-amber);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-6);
}

.deploy__card-title {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-3);
}

.deploy__card-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-6);
}

.deploy__features {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
  flex: 1;
}

.deploy__features li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.deploy__features li svg {
  flex-shrink: 0;
}

.deploy__cta {
  width: 100%;
  text-align: center;
}

/* Languages */
.deploy__languages {
  margin-top: var(--space-16);
  text-align: center;
}

.deploy__languages-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-4);
}

.deploy__lang-tags {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.deploy__lang-tag {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  background: var(--color-sand-light);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .deploy__grid {
    grid-template-columns: 1fr;
  }
}
</style>
