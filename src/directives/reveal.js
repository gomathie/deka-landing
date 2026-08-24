/**
 * v-reveal — fades an element up as it scrolls into view.
 *
 *   <div v-reveal>…</div>
 *   <div v-reveal="{ delay: 120 }">…</div>
 *   <div v-reveal.children>…</div>   staggers the direct children instead
 *
 * Everything is applied as inline style and cleared again once the element
 * has arrived. Cards style their own `transition`, and a class-based reveal
 * would either lose the stagger to that shorthand or leave its delay behind
 * on the card's hover transition.
 *
 * Honours prefers-reduced-motion, and no-ops where IntersectionObserver is
 * unavailable so content is never left invisible.
 */

const DURATION = 600
const STAGGER = 90
const DISTANCE = '20px'

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

let observer = null

function settle(el, delay) {
  el.style.opacity = ''
  el.style.transform = ''
  window.setTimeout(() => {
    el.style.transition = ''
    el.style.willChange = ''
  }, delay + DURATION + 50)
}

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        settle(entry.target, Number(entry.target.dataset.revealDelay || 0))
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  )
  return observer
}

function hide(el, delay) {
  const timing = `${DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
  el.dataset.revealDelay = String(delay)
  el.style.opacity = '0'
  el.style.transform = `translateY(${DISTANCE})`
  el.style.transition = `opacity ${timing}, transform ${timing}`
  el.style.willChange = 'opacity, transform'
  getObserver().observe(el)
}

function targetsOf(el, binding) {
  return binding.modifiers.children ? Array.from(el.children) : [el]
}

export const reveal = {
  mounted(el, binding) {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return

    const base = Number(binding.value?.delay ?? 0)
    targetsOf(el, binding).forEach((node, i) => {
      hide(node, base + (binding.modifiers.children ? i * STAGGER : 0))
    })
  },

  unmounted(el, binding) {
    if (!observer) return
    targetsOf(el, binding).forEach((node) => observer.unobserve(node))
  },
}
