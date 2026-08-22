<template>
  <section class="benefits section" id="benefits">
    <div class="container">
      <div class="benefits__header">
        <span class="section-label">Benefits</span>
        <h2 class="section-title">Outcomes, not features</h2>
        <p class="section-subtitle">
          What changes when your entire operation runs on one system.
        </p>
      </div>

      <div class="benefits__grid">
        <div v-for="benefit in benefits" :key="benefit.title" class="benefits__card">
          <div class="benefits__card-icon" v-html="benefit.icon"></div>
          <h3 class="benefits__card-title">{{ benefit.title }}</h3>
          <p class="benefits__card-desc">{{ benefit.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  {
    title: 'Quotation to payment, zero re-keying',
    desc: 'One system from the first quotation through delivery, invoice, and payment — no copying data between tools.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
  },
  {
    title: 'Stock that matches reality',
    desc: `Inventory moves the moment orders are confirmed. What the system says is in the warehouse is what's actually there.`,
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
  },
  {
    title: 'Month-end on real data',
    desc: 'Close the month on actual transactions instead of reconciled spreadsheets. Your numbers are already there.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
  },
  {
    title: 'Conversations on the record',
    desc: 'Every discussion, mention, and file attachment sits on the invoice or order it relates to — not scattered across email.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
  },
  {
    title: 'Visibility across the group',
    desc: 'See all companies from one installation. No separate systems, no separate logins, no separate data.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
  },
  {
    title: 'Staff see only what they should',
    desc: 'Roles and permissions controlled per module. Everyone has access to exactly what their job requires.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
  },
]
</script>

<style scoped>
.benefits {
  background-color: var(--color-sand-light);
}

@media (prefers-color-scheme: dark) {
  .benefits {
    background-color: var(--color-sand);
  }
}

.benefits__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-16);
}

.benefits__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.benefits__card {
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--color-white);
  border: 1px solid transparent;
  transition: all var(--duration-normal) var(--ease-out);
}

.benefits__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-amber-glow);
}

.benefits__card-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: var(--color-amber-glow);
  color: var(--color-amber);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-5);
}

.benefits__card-title {
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-3);
  line-height: var(--leading-snug);
}

.benefits__card-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

@media (max-width: 1024px) {
  .benefits__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .benefits__grid {
    grid-template-columns: 1fr;
  }
}
</style>
