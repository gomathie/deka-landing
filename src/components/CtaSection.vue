<template>
  <section class="cta section" id="contact">
    <div class="container">
      <div class="cta__inner">
        <div class="cta__glow"></div>
        <h2 class="cta__title">Ready to run your business<br />in one place?</h2>
        <p class="cta__subtitle">
          Get started with DEKA ERP today. No credit card required.
        </p>
        <div class="cta__actions">
          <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--large cta__btn" id="cta-primary">
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="https://cloud.dekaerp.com" class="btn btn--secondary btn--large cta__btn cta__btn--outline" id="cta-talk">
            Talk to Us
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: linear-gradient(135deg, var(--color-charcoal) 0%, #243040 100%);
  position: relative;
  overflow: hidden;
}

.cta__inner {
  text-align: center;
  position: relative;
  z-index: 1;
  padding: var(--space-8) 0;
}

.cta__glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(255, 159, 28, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.cta__title {
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  color: var(--text-on-dark);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.cta__subtitle {
  font-size: var(--text-lg);
  color: var(--text-on-dark-muted);
  margin-bottom: var(--space-8);
}

.cta__actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
}

.cta__btn--outline {
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--text-on-dark);
}

.cta__btn--outline:hover {
  border-color: var(--color-amber);
  color: var(--color-amber);
  background: rgba(255, 159, 28, 0.1);
}

@media (max-width: 640px) {
  .cta__title {
    font-size: var(--text-3xl);
  }

  .cta__actions {
    flex-direction: column;
    align-items: center;
  }

  .cta__btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
