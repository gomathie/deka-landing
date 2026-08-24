<template>
  <section class="multicompany section" id="multi-company">
    <div class="container">
      <div class="multicompany__inner">
        <div class="multicompany__content" v-reveal>
          <span class="section-label">Differentiator</span>
          <h2 class="section-title">Multi-company is built in. Not bolted on.</h2>
          <p class="section-subtitle">
            Most systems at this level charge extra for multi-company — or don't offer it.
            DEKA ERP runs several legal entities from one installation, with complete data
            separation and a switcher to move between them.
          </p>

          <div class="multicompany__features">
            <div class="multicompany__feature">
              <div class="multicompany__feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <div>
                <h4 class="multicompany__feature-title">Per-company data separation</h4>
                <p class="multicompany__feature-desc">Each entity's data is isolated. Users see only what they're granted.</p>
              </div>
            </div>

            <div class="multicompany__feature">
              <div class="multicompany__feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
              </div>
              <div>
                <h4 class="multicompany__feature-title">One-click company switcher</h4>
                <p class="multicompany__feature-desc">Move between entities without logging out. One session, multiple companies.</p>
              </div>
            </div>

            <div class="multicompany__feature">
              <div class="multicompany__feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h4 class="multicompany__feature-title">Granular access control</h4>
                <p class="multicompany__feature-desc">Grant users access to specific companies. Roles and permissions per module.</p>
              </div>
            </div>
          </div>

          <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--large multicompany__cta" id="multicompany-cta">
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>

        <div class="multicompany__visual" v-reveal="{ delay: 120 }">
          <div class="multicompany__switcher">
            <div class="multicompany__switcher-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              <span>Switch Company</span>
            </div>
            <div class="multicompany__company multicompany__company--active">
              <div class="multicompany__company-avatar" style="background: var(--color-amber);">A</div>
              <div class="multicompany__company-info">
                <span class="multicompany__company-name">Apex BNN Company</span>
                <span class="multicompany__company-role">Admin</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="multicompany__company">
              <div class="multicompany__company-avatar" style="background: #3498DB;">S</div>
              <div class="multicompany__company-info">
                <span class="multicompany__company-name">Sankofa Manufacturing</span>
                <span class="multicompany__company-role">Manager</span>
              </div>
            </div>
            <div class="multicompany__company">
              <div class="multicompany__company-avatar" style="background: #2ECC71;">V</div>
              <div class="multicompany__company-info">
                <span class="multicompany__company-name">Volta Logistics</span>
                <span class="multicompany__company-role">Viewer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.multicompany {
  background: linear-gradient(135deg, var(--color-charcoal) 0%, #2A3642 100%);
  color: var(--text-on-dark);
}

.multicompany .section-label {
  color: var(--color-amber);
}

.multicompany .section-title {
  color: var(--text-on-dark);
}

.multicompany .section-subtitle {
  color: var(--text-on-dark-muted);
}

.multicompany__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.multicompany__features {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin: var(--space-10) 0;
}

.multicompany__feature {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}

.multicompany__feature-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: rgba(255, 159, 28, 0.12);
  color: var(--color-amber);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.multicompany__feature-title {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-1);
  color: var(--text-on-dark);
}

.multicompany__feature-desc {
  font-size: var(--text-sm);
  color: var(--text-on-dark-muted);
  line-height: var(--leading-normal);
}

/* ── Company Switcher Visual ── */
.multicompany__visual {
  display: flex;
  justify-content: center;
}

.multicompany__switcher {
  width: 320px;
  background: #233040;
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
}

.multicompany__switcher-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-on-dark-muted);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.multicompany__company {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  transition: background-color var(--duration-fast) var(--ease-out);
  cursor: default;
}

.multicompany__company:hover {
  background: rgba(255, 255, 255, 0.04);
}

.multicompany__company--active {
  background: rgba(255, 159, 28, 0.08);
}

.multicompany__company-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  color: white;
  flex-shrink: 0;
}

.multicompany__company-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.multicompany__company-name {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-on-dark);
}

.multicompany__company-role {
  font-size: var(--text-xs);
  color: var(--text-on-dark-muted);
}

@media (max-width: 1024px) {
  .multicompany__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .multicompany__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .multicompany__features {
    text-align: left;
    max-width: 480px;
  }
}

@media (max-width: 480px) {
  .multicompany__switcher {
    width: 100%;
  }
}
</style>
