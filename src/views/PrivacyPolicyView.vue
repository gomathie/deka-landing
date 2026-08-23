<template>
  <div class="privacy-view">
    <AppHeader />
    <main class="privacy-main">
      <div class="container privacy-container">
        <!-- Hero Banner -->
        <header class="privacy-hero">
          <span class="privacy-hero__badge">Legal</span>
          <h1 class="privacy-hero__title">Privacy Policy</h1>
          <p class="privacy-hero__lead">
            Your trust matters. This policy explains how DEKA ERP collects, uses, and protects your information.
          </p>
          <p class="privacy-hero__date">Last updated: {{ lastUpdated }}</p>
        </header>

        <!-- Table of Contents -->
        <nav class="privacy-toc" aria-label="Table of Contents">
          <h2 class="privacy-toc__title">Contents</h2>
          <ol class="privacy-toc__list">
            <li v-for="section in sections" :key="section.id">
              <a :href="`#${section.id}`" class="privacy-toc__link">{{ section.title }}</a>
            </li>
          </ol>
        </nav>

        <!-- Policy Sections -->
        <article class="privacy-body">
          <section
            v-for="section in sections"
            :key="section.id"
            :id="section.id"
            class="privacy-section"
          >
            <div class="privacy-section__header">
              <span class="privacy-section__num">{{ section.num }}</span>
              <h2 class="privacy-section__title">{{ section.title }}</h2>
            </div>
            <div class="privacy-section__content" v-html="section.content"></div>
          </section>
        </article>

        <!-- Contact Card -->
        <div class="privacy-contact">
          <div class="privacy-contact__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          <div>
            <h3 class="privacy-contact__title">Questions about your privacy?</h3>
            <p class="privacy-contact__text">
              Contact our Data Protection team at
              <a href="mailto:privacy@dekaerp.com" class="privacy-contact__link">privacy@dekaerp.com</a>
            </p>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

const lastUpdated = 'August 24, 2026'

const sections = [
  {
    id: 'information-we-collect',
    num: '01',
    title: 'Information We Collect',
    content: `
      <p>We collect information that you provide directly when using DEKA ERP services:</p>
      <ul>
        <li><strong>Account Information:</strong> Name, email address, company name, phone number, and billing details when you create an account or subscribe to our services.</li>
        <li><strong>Business Data:</strong> Records you create within DEKA ERP, including customer data, invoices, purchase orders, inventory records, and accounting entries. This data belongs to you and is processed solely to deliver the service.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited, features used, session duration, and performance metrics.</li>
        <li><strong>Device & Technical Data:</strong> Browser type, operating system, IP address, and device identifiers collected automatically through cookies and similar technologies.</li>
        <li><strong>Support Communications:</strong> Messages, files, and information shared when you contact our support team.</li>
      </ul>
    `
  },
  {
    id: 'how-we-use',
    num: '02',
    title: 'How We Use Your Information',
    content: `
      <p>We use collected information for the following purposes:</p>
      <ul>
        <li><strong>Service Delivery:</strong> To provide, maintain, and improve DEKA ERP, including processing your business data, generating reports, and enabling multi-company management.</li>
        <li><strong>Account Management:</strong> To manage your subscription, authenticate access, and provide customer support.</li>
        <li><strong>Security:</strong> To detect and prevent fraud, unauthorized access, and other security threats. All sessions are tokenized with full audit logging.</li>
        <li><strong>Communication:</strong> To send service-related notifications, updates, and, with your consent, marketing communications.</li>
        <li><strong>Product Improvement:</strong> To analyze usage patterns and improve the platform's features and performance.</li>
      </ul>
    `
  },
  {
    id: 'data-storage',
    num: '03',
    title: 'Data Storage & Security',
    content: `
      <p>DEKA ERP employs industry-standard security measures to protect your data:</p>
      <ul>
        <li><strong>Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.</li>
        <li><strong>Cloud Infrastructure:</strong> Our cloud instances run on SOC 2 Type II compliant infrastructure with automated backups and disaster recovery.</li>
        <li><strong>Self-Hosted Options:</strong> For organizations choosing on-premises deployment, data remains entirely within your infrastructure. DEKA ERP does not access self-hosted instances unless explicitly authorized for support purposes.</li>
        <li><strong>Access Controls:</strong> Role-based access controls (RBAC) ensure users can only access data appropriate to their permissions within your organization.</li>
        <li><strong>Data Isolation:</strong> In multi-company configurations, strict data separation ensures that each legal entity's records are independently isolated.</li>
      </ul>
    `
  },
  {
    id: 'data-sharing',
    num: '04',
    title: 'Data Sharing & Third Parties',
    content: `
      <p>We do not sell your personal or business data. We may share information only in these limited circumstances:</p>
      <ul>
        <li><strong>Service Providers:</strong> Trusted third-party providers who assist in hosting, analytics, payment processing, and customer support, bound by strict data processing agreements.</li>
        <li><strong>Legal Compliance:</strong> When required by law, court order, or governmental authority.</li>
        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale, your data may be transferred. You will be notified of any such change.</li>
        <li><strong>With Your Consent:</strong> Any other sharing of your data requires your explicit consent.</li>
      </ul>
    `
  },
  {
    id: 'cookies',
    num: '05',
    title: 'Cookies & Tracking',
    content: `
      <p>DEKA ERP uses cookies and similar technologies to:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Maintain your authenticated session and security tokens. These cannot be disabled.</li>
        <li><strong>Functional Cookies:</strong> Remember your preferences, including language selection (English, Arabic, French, Spanish, Portuguese) and interface settings.</li>
        <li><strong>Analytics Cookies:</strong> Understand platform usage to improve features and performance. These can be managed through your browser settings.</li>
      </ul>
      <p>We do not use advertising or cross-site tracking cookies.</p>
    `
  },
  {
    id: 'your-rights',
    num: '06',
    title: 'Your Rights',
    content: `
      <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
      <ul>
        <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
        <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
        <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
        <li><strong>Data Portability:</strong> Export your business data in standard formats (CSV, Excel, PDF) at any time from within the DEKA ERP application.</li>
        <li><strong>Objection:</strong> Object to certain types of data processing, including direct marketing.</li>
        <li><strong>Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time.</li>
      </ul>
      <p>To exercise any of these rights, contact us at <a href="mailto:privacy@dekaerp.com">privacy@dekaerp.com</a>. We will respond within 30 days.</p>
    `
  },
  {
    id: 'data-retention',
    num: '07',
    title: 'Data Retention',
    content: `
      <p>We retain your data only for as long as necessary:</p>
      <ul>
        <li><strong>Active Accounts:</strong> Your business data is retained for the duration of your active subscription.</li>
        <li><strong>After Cancellation:</strong> Following account cancellation, your data is retained for 90 days to allow for reactivation, after which it is permanently deleted.</li>
        <li><strong>Legal Obligations:</strong> Certain financial and transaction records may be retained longer as required by applicable tax and accounting laws.</li>
        <li><strong>Backups:</strong> Encrypted backups are automatically purged on a rolling schedule in accordance with our retention policy.</li>
      </ul>
    `
  },
  {
    id: 'international-transfers',
    num: '08',
    title: 'International Data Transfers',
    content: `
      <p>If your data is transferred outside your country of residence, we ensure appropriate safeguards are in place, including:</p>
      <ul>
        <li>Standard Contractual Clauses (SCCs) approved by relevant authorities.</li>
        <li>Data Processing Agreements (DPAs) with all sub-processors.</li>
        <li>Compliance with local data protection regulations, including GDPR, CCPA, and applicable regional frameworks.</li>
      </ul>
    `
  },
  {
    id: 'children',
    num: '09',
    title: 'Children\'s Privacy',
    content: `
      <p>DEKA ERP is a business software platform and is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.</p>
    `
  },
  {
    id: 'changes',
    num: '10',
    title: 'Changes to This Policy',
    content: `
      <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes:</p>
      <ul>
        <li>We will update the "Last updated" date at the top of this page.</li>
        <li>For significant changes, we will provide prominent notice within the DEKA ERP application or via email.</li>
        <li>Your continued use of the service after changes take effect constitutes acceptance of the updated policy.</li>
      </ul>
    `
  }
]
</script>

<style scoped>
.privacy-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.privacy-main {
  flex: 1;
  padding-top: calc(var(--header-height) + var(--space-12));
  padding-bottom: var(--space-24);
  background: var(--color-off-white);
}

.privacy-container {
  max-width: var(--container-narrow);
}

/* ── Hero ── */
.privacy-hero {
  text-align: center;
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-10);
  border-bottom: 1px solid var(--color-sand);
}

.privacy-hero__badge {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: var(--color-amber-glow);
  color: var(--color-amber-hover);
  padding: var(--space-1) var(--space-4);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-4);
}

.privacy-hero__title {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  letter-spacing: -0.03em;
  line-height: var(--leading-tight);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

.privacy-hero__lead {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 540px;
  margin: 0 auto var(--space-4);
  line-height: var(--leading-normal);
}

.privacy-hero__date {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

/* ── Table of Contents ── */
.privacy-toc {
  background: var(--color-white);
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-xl);
  padding: var(--space-6) var(--space-8);
  margin-bottom: var(--space-12);
}

.privacy-toc__title {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.privacy-toc__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2) var(--space-8);
  counter-reset: toc;
  padding-left: 0;
  list-style: none;
}

.privacy-toc__list li {
  counter-increment: toc;
}

.privacy-toc__link {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  transition: color var(--duration-fast) var(--ease-out);
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.privacy-toc__link::before {
  content: counter(toc, decimal-leading-zero) '.';
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  color: var(--color-amber);
  flex-shrink: 0;
}

.privacy-toc__link:hover {
  color: var(--color-amber);
}

/* ── Policy Sections ── */
.privacy-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.privacy-section {
  scroll-margin-top: calc(var(--header-height) + var(--space-6));
}

.privacy-section__header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.privacy-section__num {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  background: var(--color-charcoal);
  color: var(--color-white);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (prefers-color-scheme: dark) {
  .privacy-section__num {
    background: var(--color-amber);
    color: var(--color-charcoal);
  }
}

.privacy-section__title {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
}

.privacy-section__content {
  padding-left: calc(28px + var(--space-3));
}

.privacy-section__content :deep(p) {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-4);
}

.privacy-section__content :deep(ul) {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.privacy-section__content :deep(ul li) {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  padding-left: var(--space-5);
  position: relative;
}

.privacy-section__content :deep(ul li)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-amber);
}

.privacy-section__content :deep(ul li strong) {
  color: var(--text-primary);
}

.privacy-section__content :deep(a) {
  color: var(--color-amber);
  font-weight: var(--weight-medium);
  transition: color var(--duration-fast) var(--ease-out);
}

.privacy-section__content :deep(a:hover) {
  color: var(--color-amber-hover);
}

/* ── Contact Card ── */
.privacy-contact {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  margin-top: var(--space-16);
  padding: var(--space-6) var(--space-8);
  background: var(--color-white);
  border: 1px solid var(--color-sand);
  border-left: 4px solid var(--color-amber);
  border-radius: var(--radius-xl);
}

.privacy-contact__icon {
  width: 48px;
  height: 48px;
  background: var(--color-amber-glow);
  color: var(--color-amber);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.privacy-contact__title {
  font-size: var(--text-base);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.privacy-contact__text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.privacy-contact__link {
  color: var(--color-amber);
  font-weight: var(--weight-semibold);
  transition: color var(--duration-fast) var(--ease-out);
}

.privacy-contact__link:hover {
  color: var(--color-amber-hover);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .privacy-hero__title {
    font-size: var(--text-4xl);
  }

  .privacy-toc {
    padding: var(--space-4) var(--space-5);
  }

  .privacy-toc__list {
    grid-template-columns: 1fr;
  }

  .privacy-section__content {
    padding-left: 0;
  }

  .privacy-contact {
    flex-direction: column;
    text-align: center;
    padding: var(--space-5);
  }
}
</style>
