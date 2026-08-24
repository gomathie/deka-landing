<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }" id="site-header">
    <div class="container header__inner">
      <router-link to="/" class="header__logo" aria-label="DEKA ERP Home">
        <img src="/logos/logo-full-light.svg" alt="DEKA ERP" class="header__logo-img header__logo-img--light" width="126" height="35" />
      </router-link>

      <nav class="header__nav" :class="{ 'header__nav--open': menuOpen }" id="main-nav" aria-label="Main navigation">
        <a :href="isHomePage ? '#features' : '/#features'" class="header__link" @click="closeMenu">Features</a>
        <a :href="isHomePage ? '#benefits' : '/#benefits'" class="header__link" @click="closeMenu">Benefits</a>
        <a :href="isHomePage ? '#multi-company' : '/#multi-company'" class="header__link" @click="closeMenu">Multi-Company</a>
        <a :href="isHomePage ? '#deployment' : '/#deployment'" class="header__link" @click="closeMenu">Deployment</a>
        <router-link to="/blog" class="header__link" @click="closeMenu">Blog</router-link>
        <router-link to="/guide" class="header__link header__link--guide" @click="closeMenu">
          <span>User Guide</span>
          <span class="header__guide-pill">Docs</span>
        </router-link>
      </nav>

      <div class="header__actions">
        <a href="https://cloud.dekaerp.com" class="btn btn--ghost header__signin" id="header-signin">Sign In</a>
        <a href="https://cloud.dekaerp.com" class="btn btn--primary header__cta" id="header-cta">Get Started</a>
      </div>

      <button
        class="header__burger"
        :class="{ 'header__burger--open': menuOpen }"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-controls="main-nav"
        aria-label="Toggle navigation menu"
        id="menu-toggle"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile overlay -->
    <div class="header__overlay" :class="{ 'header__overlay--visible': menuOpen }" @click="closeMenu">
      <nav class="header__mobile-nav" @click.stop>
        <a :href="isHomePage ? '#features' : '/#features'" class="header__mobile-link" @click="closeMenu">Features</a>
        <a :href="isHomePage ? '#benefits' : '/#benefits'" class="header__mobile-link" @click="closeMenu">Benefits</a>
        <a :href="isHomePage ? '#multi-company' : '/#multi-company'" class="header__mobile-link" @click="closeMenu">Multi-Company</a>
        <a :href="isHomePage ? '#deployment' : '/#deployment'" class="header__mobile-link" @click="closeMenu">Deployment</a>
        <router-link to="/blog" class="header__mobile-link" @click="closeMenu">Blog</router-link>
        <router-link to="/guide" class="header__mobile-link header__mobile-link--guide" @click="closeMenu">
          📖 User Guide &amp; Feature Walkthroughs
        </router-link>
        <div class="header__mobile-actions">
          <a href="https://cloud.dekaerp.com" class="btn btn--secondary btn--large" @click="closeMenu">Sign In</a>
          <a href="https://cloud.dekaerp.com" class="btn btn--primary btn--large" @click="closeMenu">Get Started</a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const menuOpen = ref(false)

const isHomePage = computed(() => route.path === '/')

const closeMenu = () => {
  menuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  transition: all var(--duration-normal) var(--ease-out);
  background-color: transparent;
}

.header--scrolled {
  background-color: rgba(245, 246, 248, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(31, 41, 51, 0.06);
}

@media (prefers-color-scheme: dark) {
  .header--scrolled {
    background-color: rgba(21, 27, 33, 0.85);
  }
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: var(--space-8);
}

.header__logo {
  flex-shrink: 0;
}

.header__logo-img {
  height: 28px;
  width: auto;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  white-space: nowrap;
}

/* Five links plus two buttons stop fitting well before the burger appears,
   so the gap tightens through the middle of the range. */
@media (max-width: 1080px) {
  .header__nav {
    gap: var(--space-5);
  }
}

.header__link {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-secondary);
  transition: color var(--duration-fast) var(--ease-out);
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.header__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-amber);
  border-radius: var(--radius-full);
  transition: width var(--duration-normal) var(--ease-out);
}

.header__link:hover {
  color: var(--text-primary);
}

.header__link:hover::after {
  width: 100%;
}

.header__guide-pill {
  font-size: 10px;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  background: var(--color-amber-glow);
  color: var(--color-amber-hover);
  padding: 1px 6px;
  border-radius: var(--radius-full);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.header__burger {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  margin-right: calc(var(--space-2) * -1);
  border-radius: var(--radius-lg);
  z-index: 110;
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.header__burger:active {
  background-color: var(--color-sand-light);
}

.header__burger span {
  display: block;
  width: 20px;
  height: 2px;
  background-color: var(--text-primary);
  border-radius: var(--radius-full);
  transition:
    transform var(--duration-normal) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out);
  transform-origin: center;
}

.header__burger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header__burger--open span:nth-child(2) {
  opacity: 0;
}

.header__burger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.header__overlay {
  display: none;
}

/* Raised from 768px: the nav now carries five links, and below this width
   the links and the action buttons compete for the same space. */
@media (max-width: 900px) {
  .header__nav,
  .header__actions {
    display: none;
  }

  .header__burger {
    display: flex;
  }

  .header__overlay {
    display: block;
    position: fixed;
    inset: 0;
    background-color: rgba(21, 27, 33, 0.6);
    backdrop-filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    transition: all var(--duration-normal) var(--ease-out);
    z-index: 99;
  }

  .header__overlay--visible {
    opacity: 1;
    visibility: visible;
  }

  .header__mobile-nav {
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background-color: var(--color-white);
    padding: calc(var(--header-height) + var(--space-8)) var(--space-6) var(--space-8);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    transform: translateX(100%);
    transition: transform var(--duration-slow) var(--ease-out);
  }

  .header__overlay--visible .header__mobile-nav {
    transform: translateX(0);
  }

  .header__mobile-link {
    display: block;
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-lg);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
    border-radius: var(--radius-md);
    transition: background-color var(--duration-fast) var(--ease-out);
  }

  .header__mobile-link--guide {
    color: var(--color-amber-hover);
    font-weight: var(--weight-bold);
    background: var(--color-amber-glow);
  }

  .header__mobile-link:hover {
    background-color: var(--color-sand);
  }

  .header__mobile-actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-top: auto;
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-sand);
  }
}
</style>
