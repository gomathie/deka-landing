/**
 * Pricing data.
 *
 * ⚠️  THE NUMBERS BELOW ARE PLACEHOLDERS. Replace `currency`, `symbol` and each
 * tier's `monthly` figure with your real commercial terms before launch.
 * Annual pricing is derived, not stored: `ANNUAL_MONTHS_CHARGED` months are
 * billed for twelve months of service.
 *
 * Everything the pricing page renders comes from this file, so a price change
 * is a one-line edit rather than a hunt through the template.
 */

export const currency = 'USD'
export const symbol = '$'

/** Twelve months of service for this many months of fee. */
export const ANNUAL_MONTHS_CHARGED = 10

export const monthsFree = 12 - ANNUAL_MONTHS_CHARGED

export const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'One company, one team, the essentials working properly.',
    monthly: 29,
    cta: 'Start free trial',
    ctaHref: 'https://cloud.dekaerp.com',
    highlights: [
      '1 company',
      'Up to 5 users',
      'Sales, Invoicing and Contacts',
      'Inventory and Products',
      'Customer portal',
      'Daily backups',
      'Email support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Every module, several entities, and the API to tie it together.',
    monthly: 79,
    popular: true,
    cta: 'Start free trial',
    ctaHref: 'https://cloud.dekaerp.com',
    highlights: [
      'Up to 3 companies',
      'Up to 25 users',
      'All 14 modules, including Manufacturing',
      'Multi-company switcher and per-company access',
      'REST API and spreadsheet import/export',
      'Custom fields across nine modules',
      'Priority support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Unlimited scale, your infrastructure if you want it, an SLA behind it.',
    monthly: null, // null renders as "Custom"
    cta: 'Talk to us',
    ctaHref: 'https://cloud.dekaerp.com',
    highlights: [
      'Unlimited companies',
      'Unlimited users',
      'Self-hosted deployment option',
      'Advanced roles and permissions',
      'Guided migration and onboarding',
      'Uptime SLA',
      'Dedicated support contact',
    ],
  },
]

/**
 * Detailed comparison. `true` renders a tick, `false` a dash, a string renders
 * verbatim. Keep the group order aligned with the module groups on /about.
 */
export const comparison = [
  {
    group: 'Scale',
    rows: [
      { label: 'Companies', starter: '1', business: '3', enterprise: 'Unlimited' },
      { label: 'Users', starter: '5', business: '25', enterprise: 'Unlimited' },
      { label: 'Modules included', starter: 'Core 5', business: 'All 14', enterprise: 'All 14' },
    ],
  },
  {
    group: 'Sell',
    rows: [
      { label: 'Sales — quotations and orders', starter: true, business: true, enterprise: true },
      { label: 'Invoicing, credit notes and refunds', starter: true, business: true, enterprise: true },
      { label: 'Contacts — customers and vendors', starter: true, business: true, enterprise: true },
      { label: 'Customer portal', starter: true, business: true, enterprise: true },
    ],
  },
  {
    group: 'Buy',
    rows: [
      { label: 'Purchasing — RFQs and orders', starter: true, business: true, enterprise: true },
      { label: 'Accounting — chart of accounts and journals', starter: false, business: true, enterprise: true },
      { label: 'Payments and reconciliation', starter: false, business: true, enterprise: true },
    ],
  },
  {
    group: 'Make & Move',
    rows: [
      { label: 'Inventory and warehouses', starter: true, business: true, enterprise: true },
      { label: 'Barcode scanning', starter: false, business: true, enterprise: true },
      { label: 'Lots and serial numbers', starter: false, business: true, enterprise: true },
      { label: 'Manufacturing and bills of materials', starter: false, business: true, enterprise: true },
    ],
  },
  {
    group: 'Run the business',
    rows: [
      { label: 'Projects and timesheets', starter: false, business: true, enterprise: true },
      { label: 'Employees and departments', starter: false, business: true, enterprise: true },
      { label: 'Time off and recruitment', starter: false, business: true, enterprise: true },
      { label: 'Maintenance and equipment', starter: false, business: true, enterprise: true },
    ],
  },
  {
    group: 'Platform',
    rows: [
      { label: 'Command palette (Ctrl+K)', starter: true, business: true, enterprise: true },
      { label: 'Five interface languages', starter: true, business: true, enterprise: true },
      { label: 'Spreadsheet import and export', starter: true, business: true, enterprise: true },
      { label: 'REST API with token auth', starter: false, business: true, enterprise: true },
      { label: 'Custom fields', starter: false, business: true, enterprise: true },
      { label: 'Per-company access control', starter: false, business: true, enterprise: true },
      { label: 'Single sign-on', starter: false, business: false, enterprise: true },
    ],
  },
  {
    group: 'Hosting & support',
    rows: [
      { label: 'Managed cloud hosting', starter: true, business: true, enterprise: true },
      { label: 'Daily backups', starter: true, business: true, enterprise: true },
      { label: 'Self-hosted deployment', starter: false, business: false, enterprise: true },
      { label: 'Support', starter: 'Email', business: 'Priority', enterprise: 'Dedicated' },
      { label: 'Guided onboarding', starter: false, business: false, enterprise: true },
      { label: 'Uptime SLA', starter: false, business: false, enterprise: true },
    ],
  },
]

export const faqs = [
  {
    q: 'Can I change plan later?',
    a: 'Yes, in either direction and at any point. Moving up takes effect immediately and is prorated; moving down applies at your next renewal so you do not lose time you have already paid for.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'It stays yours. Export any list view to a spreadsheet, or pull everything through the REST API, before or after you cancel. We keep your instance recoverable for 30 days, then delete it.',
  },
  {
    q: 'Do you charge per company?',
    a: 'No. Multi-company is part of the platform, not an add-on — the plan sets how many entities you can run, and adding one costs nothing extra within that limit.',
  },
  {
    q: 'What counts as a user?',
    a: 'Anyone who signs in to the admin interface. Customers using the customer portal are not users and are never counted.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — start a workspace with no card. Load real data, run a month end to end, and decide afterwards.',
  },
  {
    q: 'Can I self-host instead?',
    a: 'On Enterprise, yes. It is the same application we run on the cloud, deployed on your infrastructure, which matters where data residency is contractual rather than optional.',
  },
]

export const priceFor = (tier, annual) => {
  if (tier.monthly === null) return null
  return annual ? Math.round((tier.monthly * ANNUAL_MONTHS_CHARGED) / 12) : tier.monthly
}
