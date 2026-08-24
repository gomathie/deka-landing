<template>
  <section class="problem section" id="problem">
    <div class="container">
      <div class="problem__header" v-reveal>
        <span class="section-label">The Problem</span>
        <h2 class="section-title">Spreadsheets don't scale.<br />Disconnected tools don't agree.</h2>
        <p class="section-subtitle">
          When your stock list says one thing, your accounting package says another,
          and month-end takes a week of reconciliation — the problem isn't your team. It's your tools.
        </p>
      </div>

      <div class="problem__grid" v-reveal.children>
        <div class="problem__card problem__card--before">
          <div class="problem__card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          </div>
          <h3 class="problem__card-title">Without DEKA</h3>
          <ul class="problem__list">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0392B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Data re-keyed across spreadsheets, email, and separate apps
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0392B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Stock figures that never match reality
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0392B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Month-end close takes days of reconciliation
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0392B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Approvals scattered across email threads
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0392B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Running multiple companies means multiple systems
            </li>
          </ul>
        </div>

        <div class="problem__card problem__card--after">
          <div class="problem__card-icon problem__card-icon--amber">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3 class="problem__card-title">With DEKA</h3>
          <ul class="problem__list">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              One system from quotation to payment — no re-keying
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Stock moves when orders are confirmed
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Month-end on real transactions, not reconciled spreadsheets
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Discussions and approvals on the record itself
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              All companies in one installation with a switcher
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem {
  background-color: var(--color-white);
}

.problem__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-16);
}

.problem__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  max-width: 900px;
  margin: 0 auto;
}

.problem__card {
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-sand);
  transition: all var(--duration-normal) var(--ease-out);
}

.problem__card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.problem__card--before {
  background: linear-gradient(135deg, #FDF2F2 0%, #FDEAEA 100%);
  border-color: rgba(192, 57, 43, 0.12);
}

.problem__card--after {
  background: linear-gradient(135deg, #FFF9EE 0%, #FFF3DD 100%);
  border-color: rgba(255, 159, 28, 0.2);
}

@media (prefers-color-scheme: dark) {
  .problem__card--before {
    background: linear-gradient(135deg, #251A1A 0%, #2A1C1C 100%);
    border-color: rgba(192, 57, 43, 0.2);
  }
  .problem__card--after {
    background: linear-gradient(135deg, #252016 0%, #2A2418 100%);
    border-color: rgba(255, 159, 28, 0.25);
  }
}

.problem__card-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
  background: rgba(192, 57, 43, 0.1);
  color: #C0392B;
}

.problem__card-icon--amber {
  background: var(--color-amber-glow);
  color: var(--color-amber);
}

.problem__card-title {
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-6);
}

.problem__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.problem__list li {
  display: flex;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-snug);
}

.problem__list li svg {
  flex-shrink: 0;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .problem__grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}
</style>
