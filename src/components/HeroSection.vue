<template>
  <section class="hero" id="hero">
    <div class="container hero__inner">
      <div class="hero__content">
        <div class="badge animate-in">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Built for growing businesses
        </div>

        <h1 class="hero__title animate-in animate-in-delay-1">
          One system.<br />
          Every operation.<br />
          <span class="text-gradient">Total clarity.</span>
        </h1>

        <p class="hero__subtitle animate-in animate-in-delay-2">
          DEKA ERP unifies sales, purchasing, inventory, manufacturing,
          accounting, and HR into a single platform — so your team stops
          re-keying data and starts running the business.
        </p>

        <div class="hero__actions btn-row animate-in animate-in-delay-3">
          <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--large" id="hero-cta-primary">
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="https://cloud.dekaerp.com/admin/login" class="btn btn--secondary btn--large" id="hero-cta-secondary">
            Sign In
          </a>
        </div>

        <div class="hero__meta animate-in animate-in-delay-4">
          <div class="hero__meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Hosted or self-hosted</span>
          </div>
          <div class="hero__meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span>5 languages</span>
          </div>
          <div class="hero__meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span>Multi-company built in</span>
          </div>
        </div>
      </div>

      <div class="hero__visual animate-in animate-in-delay-2">
        <div class="hero__graphic">
          <div class="hero__hex-grid">
            <!-- Abstract hexagonal ERP module visualization -->
            <div class="hero__hex hero__hex--sell">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span>Sell</span>
            </div>
            <div class="hero__hex hero__hex--buy">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span>Buy</span>
            </div>
            <div class="hero__hex hero__hex--make">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <span>Make &amp; Move</span>
            </div>
            <div class="hero__hex hero__hex--run">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>Run</span>
            </div>
          </div>
          <!-- Central DEKA logo -->
          <div class="hero__center-logo">
            <img src="/logos/logo.svg" alt="" width="48" height="48" />
          </div>
          <!-- Connecting lines (decorative) -->
          <div class="hero__pulse-ring hero__pulse-ring--1"></div>
          <div class="hero__pulse-ring hero__pulse-ring--2"></div>
          <div class="hero__pulse-ring hero__pulse-ring--3"></div>
        </div>
      </div>
    </div>

    <!-- Subtle gradient divider -->
    <div class="hero__divider"></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: calc(var(--header-height) + var(--space-16));
  padding-bottom: var(--space-20);
  overflow: hidden;
  background: linear-gradient(
    180deg,
    var(--color-off-white) 0%,
    var(--color-sand-light) 100%
  );
}

@media (prefers-color-scheme: dark) {
  .hero {
    background: linear-gradient(
      180deg,
      var(--color-off-white) 0%,
      #1A2028 100%
    );
  }
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.hero__content {
  max-width: 560px;
}

.hero__title {
  font-size: var(--text-6xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-6);
  letter-spacing: -0.02em;
}

.hero__subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-8);
  max-width: 480px;
}

.hero__actions {
  gap: var(--space-4);
  margin-bottom: var(--space-10);
}

.hero__meta {
  display: flex;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.hero__meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* ── Hero Visual ── */
.hero__visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__graphic {
  position: relative;
  width: 400px;
  height: 400px;
}

.hero__hex-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--space-6);
  padding: var(--space-10);
}

.hero__hex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  transition: all var(--duration-normal) var(--ease-out);
  cursor: default;
}

.hero__hex:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.hero__hex--sell {
  background: linear-gradient(135deg, #FFF5E6 0%, #FFE8CC 100%);
  color: #B36B00;
  border: 1px solid rgba(255, 159, 28, 0.2);
}

.hero__hex--buy {
  background: linear-gradient(135deg, #E8F4F0 0%, #D1EAE3 100%);
  color: #1A6B50;
  border: 1px solid rgba(26, 107, 80, 0.15);
}

.hero__hex--make {
  background: linear-gradient(135deg, #EBE8F4 0%, #D8D2EA 100%);
  color: #4A3B7C;
  border: 1px solid rgba(74, 59, 124, 0.15);
}

.hero__hex--run {
  background: linear-gradient(135deg, #E6F0F8 0%, #CCE1F0 100%);
  color: #1A4B6B;
  border: 1px solid rgba(26, 75, 107, 0.15);
}

@media (prefers-color-scheme: dark) {
  .hero__hex--sell {
    background: linear-gradient(135deg, #2A2316 0%, #332A1A 100%);
    color: #FFB84D;
    border-color: rgba(255, 159, 28, 0.25);
  }
  .hero__hex--buy {
    background: linear-gradient(135deg, #162320 0%, #1A2D27 100%);
    color: #5FBFA0;
    border-color: rgba(26, 107, 80, 0.25);
  }
  .hero__hex--make {
    background: linear-gradient(135deg, #1E1A28 0%, #272033 100%);
    color: #9B8CC8;
    border-color: rgba(74, 59, 124, 0.25);
  }
  .hero__hex--run {
    background: linear-gradient(135deg, #161F28 0%, #1A2733 100%);
    color: #5BA0CC;
    border-color: rgba(26, 75, 107, 0.25);
  }
}

.hero__center-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  z-index: 2;
  border: 2px solid var(--color-amber-glow);
}

.hero__center-logo img {
  width: 40px;
  height: 40px;
}

/* Pulse rings */
.hero__pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(255, 159, 28, 0.12);
  animation: pulse-ring 4s ease-out infinite;
}

.hero__pulse-ring--1 { width: 120px; height: 120px; animation-delay: 0s; }
.hero__pulse-ring--2 { width: 200px; height: 200px; animation-delay: 1s; }
.hero__pulse-ring--3 { width: 300px; height: 300px; animation-delay: 2s; }

@keyframes pulse-ring {
  0% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.8); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
}

.hero__divider {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-sand), transparent);
}

@media (max-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__content {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero__subtitle {
    max-width: 520px;
  }

  .hero__actions {
    justify-content: center;
    align-items: center;
  }

  .hero__actions > .btn {
    max-width: 340px;
  }

  .hero__meta {
    justify-content: center;
  }

  .hero__visual {
    order: -1;
  }

  .hero__graphic {
    width: 320px;
    height: 320px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding-top: calc(var(--header-height) + var(--space-10));
    padding-bottom: var(--space-12);
  }

  .hero__title {
    font-size: var(--text-4xl);
  }

  .hero__actions {
    flex-direction: column;
    width: 100%;
  }

  .hero__actions .btn {
    width: 100%;
  }

  .hero__graphic {
    width: 280px;
    height: 280px;
  }

  .hero__hex-grid {
    padding: var(--space-6);
    gap: var(--space-3);
  }

  .hero__hex {
    padding: var(--space-3);
    font-size: var(--text-xs);
  }
}
</style>
