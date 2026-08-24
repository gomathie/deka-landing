<template>
  <div class="notfound-view">
    <AppHeader />
    <main class="notfound-main">
      <div class="notfound-content">
        <!-- Animated 404 Illustration -->
        <div class="notfound-illustration">
          <div class="notfound-orb notfound-orb--1"></div>
          <div class="notfound-orb notfound-orb--2"></div>
          <div class="notfound-orb notfound-orb--3"></div>
          <div class="notfound-code">
            <span class="notfound-digit">4</span>
            <span class="notfound-digit notfound-digit--accent">
              <svg class="notfound-logo-icon" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="var(--color-amber-glow)" />
                <path d="M24 10L14 28h8v10l10-18h-8V10z" fill="var(--color-amber)" stroke="var(--color-amber-hover)" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="notfound-digit">4</span>
          </div>
        </div>

        <!-- Copy -->
        <h1 class="notfound-title">Page not found</h1>
        <p class="notfound-desc">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <!-- Actions -->
        <div class="notfound-actions btn-row">
          <router-link to="/" class="btn btn--primary btn--large notfound-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Back to Home
          </router-link>
          <router-link to="/guide" class="btn btn--secondary btn--large notfound-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            User Guide
          </router-link>
        </div>

        <!-- Helpful Links -->
        <div class="notfound-links">
          <p class="notfound-links__title">Quick Links</p>
          <div class="notfound-links__grid">
            <router-link to="/#features" class="notfound-link-card">
              <div class="notfound-link-card__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
              <span class="notfound-link-card__label">Features</span>
              <span class="notfound-link-card__arrow">→</span>
            </router-link>
            <a href="https://cloud.dekaerp.com" class="notfound-link-card">
              <div class="notfound-link-card__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </div>
              <span class="notfound-link-card__label">Open Cloud App</span>
              <span class="notfound-link-card__arrow">→</span>
            </a>
            <a href="https://cloud.dekaerp.com/admin/login" class="notfound-link-card">
              <div class="notfound-link-card__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
              </div>
              <span class="notfound-link-card__label">Sign In</span>
              <span class="notfound-link-card__arrow">→</span>
            </a>
            <router-link to="/privacy" class="notfound-link-card">
              <div class="notfound-link-card__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span class="notfound-link-card__label">Privacy Policy</span>
              <span class="notfound-link-card__arrow">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
</script>

<style scoped>
.notfound-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-off-white);
}

.notfound-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--header-height) + var(--space-8)) var(--space-6) var(--space-16);
}

.notfound-content {
  text-align: center;
  max-width: 580px;
  width: 100%;
}

/* ── Animated Illustration ── */
.notfound-illustration {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-8);
  height: 180px;
}

.notfound-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.5;
  animation: orbFloat 6s ease-in-out infinite;
}

.notfound-orb--1 {
  width: 160px;
  height: 160px;
  background: var(--color-amber-glow);
  top: -10px;
  left: calc(50% - 130px);
  animation-delay: 0s;
}

.notfound-orb--2 {
  width: 120px;
  height: 120px;
  background: rgba(255, 159, 28, 0.1);
  top: 20px;
  right: calc(50% - 130px);
  animation-delay: -2s;
}

.notfound-orb--3 {
  width: 80px;
  height: 80px;
  background: var(--color-amber-glow);
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: -4s;
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}

.notfound-code {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  z-index: 1;
}

.notfound-digit {
  font-family: var(--font-heading);
  font-size: 7rem;
  font-weight: var(--weight-bold);
  color: var(--color-charcoal);
  line-height: 1;
  letter-spacing: -0.04em;
  opacity: 0.15;
}

@media (prefers-color-scheme: dark) {
  .notfound-digit {
    color: var(--text-on-dark);
    opacity: 0.12;
  }
}

.notfound-digit--accent {
  opacity: 1;
  display: flex;
  align-items: center;
}

.notfound-logo-icon {
  width: 72px;
  height: 72px;
  animation: pulse404 2.5s ease-in-out infinite;
}

@keyframes pulse404 {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

/* ── Copy ── */
.notfound-title {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-3);
}

.notfound-desc {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  max-width: 440px;
  margin: 0 auto var(--space-8);
}

/* ── Actions ── */
.notfound-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.notfound-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

/* ── Quick Links Grid ── */
.notfound-links {
  border-top: 1px solid var(--color-sand);
  padding-top: var(--space-8);
}

.notfound-links__title {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.notfound-links__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.notfound-link-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-white);
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-out);
  text-align: left;
}

.notfound-link-card:hover {
  border-color: var(--color-amber);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.notfound-link-card__icon {
  width: 36px;
  height: 36px;
  background: var(--color-amber-glow);
  color: var(--color-amber);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notfound-link-card__label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-primary);
  flex: 1;
}

.notfound-link-card__arrow {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  transition: transform var(--duration-fast) var(--ease-out);
}

.notfound-link-card:hover .notfound-link-card__arrow {
  transform: translateX(3px);
  color: var(--color-amber);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .notfound-digit {
    font-size: 4.5rem;
  }

  .notfound-logo-icon {
    width: 52px;
    height: 52px;
  }

  .notfound-illustration {
    height: 130px;
  }

  .notfound-title {
    font-size: var(--text-3xl);
  }

  .notfound-actions {
    flex-direction: column;
  }

  .notfound-links__grid {
    grid-template-columns: 1fr;
  }
}
</style>
