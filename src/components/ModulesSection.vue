<template>
  <section class="modules section" id="features">
    <div class="container">
      <div class="modules__header" v-reveal>
        <span class="section-label">Modules</span>
        <h2 class="section-title">Install only what you use</h2>
        <p class="section-subtitle">
          A business that doesn't manufacture never sees Manufacturing.
          Pick the modules your team needs — add more as you grow.
        </p>
      </div>

      <div class="modules__grid" v-reveal.children>
        <div
          v-for="(group, index) in moduleGroups"
          :key="group.name"
          class="modules__card"
          :class="`modules__card--${group.id}`"
        >
          <div class="modules__card-header">
            <div class="modules__card-icon" v-html="group.icon"></div>
            <h3 class="modules__card-name">{{ group.name }}</h3>
          </div>
          <ul class="modules__list">
            <li v-for="mod in group.modules" :key="mod.name">
              <span class="modules__mod-name">{{ mod.name }}</span>
              <span class="modules__mod-desc">{{ mod.desc }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const moduleGroups = [
  {
    id: 'sell',
    name: 'Sell',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    modules: [
      { name: 'Sales', desc: 'Quotations, sales orders, order templates' },
      { name: 'Invoicing', desc: 'Invoices, credit notes, refunds, payment terms' },
      { name: 'Contacts', desc: 'Customers, vendors, bank accounts, industries' },
      { name: 'Customer Portal', desc: 'Customers view their own orders and documents' },
    ]
  },
  {
    id: 'buy',
    name: 'Buy',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    modules: [
      { name: 'Purchasing', desc: 'RFQs, purchase orders, vendor bills, pricelists' },
      { name: 'Accounting', desc: 'Chart of accounts, journals, taxes, reporting' },
      { name: 'Payments', desc: 'Methods, registration, reconciliation against invoices' },
    ]
  },
  {
    id: 'make',
    name: 'Make & Move',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    modules: [
      { name: 'Inventory', desc: 'Warehouses, receipts, deliveries, lots, serial numbers, barcode' },
      { name: 'Manufacturing', desc: 'Bills of materials, work orders, work centres, availability' },
      { name: 'Products', desc: 'Variants, categories, attributes, units, pricelists' },
    ]
  },
  {
    id: 'run',
    name: 'Run the Business',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    modules: [
      { name: 'Projects & Timesheets', desc: 'Projects, tasks, milestones, time tracking' },
      { name: 'Employees', desc: 'Records, departments, contracts, documents' },
      { name: 'Time Off & Recruitment', desc: 'Leave requests, job postings, applicants' },
      { name: 'Maintenance', desc: 'Equipment, requests, teams, scheduling' },
    ]
  },
]
</script>

<style scoped>
.modules {
  background-color: var(--color-off-white);
}

.modules__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--space-16);
}

.modules__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.modules__card {
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--color-white);
  border: 1px solid var(--color-sand);
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.modules__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
}

.modules__card--sell::before { background: var(--color-amber); }
.modules__card--buy::before { background: #2ECC71; }
.modules__card--make::before { background: #8E44AD; }
.modules__card--run::before { background: #3498DB; }

@media (hover: hover) {
  .modules__card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: transparent;
  }
}

.modules__card-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.modules__card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modules__card--sell .modules__card-icon {
  background: rgba(255, 159, 28, 0.12);
  color: var(--color-amber);
}
.modules__card--buy .modules__card-icon {
  background: rgba(46, 204, 113, 0.12);
  color: #2ECC71;
}
.modules__card--make .modules__card-icon {
  background: rgba(142, 68, 173, 0.12);
  color: #8E44AD;
}
.modules__card--run .modules__card-icon {
  background: rgba(52, 152, 219, 0.12);
  color: #3498DB;
}

.modules__card-name {
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
}

.modules__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.modules__list li {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-sand);
  transition: border-color var(--duration-fast) var(--ease-out);
}

.modules__card--sell .modules__list li:hover { border-color: var(--color-amber); }
.modules__card--buy .modules__list li:hover { border-color: #2ECC71; }
.modules__card--make .modules__list li:hover { border-color: #8E44AD; }
.modules__card--run .modules__list li:hover { border-color: #3498DB; }

.modules__mod-name {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
}

.modules__mod-desc {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .modules__grid {
    grid-template-columns: 1fr;
  }
}
</style>
