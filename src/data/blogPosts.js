/**
 * Blog content.
 *
 * Bodies are block arrays rather than raw HTML so the article template
 * controls the typography. `text` fields accept inline markup only
 * (<strong>, <em>, <code>, <a>) — these are authored here, not user input.
 *
 * Block types: h2 | p | list | steps | callout | quote | table
 */

export const categories = {
  operations: { label: 'Operations', color: '#FF9F1C' },
  finance: { label: 'Finance', color: '#2E9E6B' },
  inventory: { label: 'Inventory', color: '#8E44AD' },
  growth: { label: 'Growth', color: '#3498DB' },
  platform: { label: 'Platform', color: '#D14343' },
}

export const posts = [
  {
    slug: 'deka-erp-1-5',
    title: 'DEKA ERP 1.5: every company, one login — and 60 fewer papercuts',
    excerpt:
      'Multi-company is now part of the platform rather than a wish. Add a command palette, native barcode scanning, a Maintenance module, custom fields across nine modules, PostgreSQL support and two security patches, and 1.5 is the largest release so far.',
    category: 'platform',
    date: '2026-08-24',
    readTime: '10 min read',
    author: 'DEKA ERP Team',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'Version 1.5 is out, and it is the biggest release the platform has had. The headline is multi-company support that reaches all the way down into the data model, but there is a lot behind it: a keyboard-driven command palette, native barcode scanning, a new Maintenance module, custom fields you can add yourself, PostgreSQL as a first-class database, and two security fixes.',
      },
      {
        type: 'p',
        text: 'Almost none of it requires a developer. Here is what changed and, more usefully, what it changes about your day.',
      },

      { type: 'h2', text: 'Multi-company, all the way down' },
      {
        type: 'p',
        text: 'Plenty of systems claim multi-company and deliver a filter on a list view. This release does the harder version. Records are scoped to a company, users are granted an explicit set of companies they may access, and transfers that would cross from one entity into another are guarded rather than quietly permitted.',
      },
      {
        type: 'list',
        items: [
          '<strong>Company scoping</strong> — records belong to an entity rather than being tagged with one.',
          '<strong>Allowed-companies access control</strong> — a user sees the entities they are granted and nothing else. Your accountant might get all of them; a branch salesperson gets one.',
          '<strong>Cross-company transfer guards</strong> — stock belonging to one entity cannot drift into another by accident.',
          '<strong>Company switcher</strong> — change entity from the dashboard in one click. No reload, no second login.',
        ],
      },
      {
        type: 'p',
        text: 'Before this, running two businesses meant two installations: two sets of credentials, the same customer typed in twice, and no way to see the group at once. That is now one installation and one login.',
      },
      {
        type: 'callout',
        kind: 'note',
        label: 'Why it matters',
        text: 'This is the difference between a group system and two systems sharing a login screen. One installation, one set of credentials, strictly separate books. Walk through the setup in the <a href="/guide/multi-company-guide">multi-company guide</a>.',
      },

      { type: 'h2', text: 'A command palette for people who hate clicking' },
      {
        type: 'p',
        text: 'Press <code>Ctrl</code> + <code>K</code> — or <code>Cmd</code> + <code>K</code> on a Mac — anywhere in the interface. Search a customer, open any page, or fire an action without touching the mouse. It is a small feature that quietly rewires how power users work: the people entering forty orders a day stop navigating menus entirely.',
      },
      {
        type: 'quote',
        text: 'The fastest interface is the one you stop looking at.',
      },

      { type: 'h2', text: 'The warehouse gets faster' },
      {
        type: 'p',
        text: 'Inventory got the deepest set of changes in the release, and they compound rather than sitting side by side.',
      },
      {
        type: 'table',
        columns: ['Addition', 'What it does', 'Where it pays off'],
        rows: [
          [
            '<strong>Native barcode scanning</strong>',
            'Scan products directly in the app instead of typing codes',
            'Receipts and deliveries — the highest-volume, highest-error moments',
          ],
          [
            '<strong>Putaway rules</strong>',
            'Set the rule once; incoming stock routes to its own location',
            'Multi-location warehouses, where “where does this go?” is asked all day',
          ],
          [
            '<strong>Next-transfer shortcuts</strong>',
            'Jump straight to the following step in a receive → store → deliver chain',
            'Anywhere warehouse work runs as a sequence',
          ],
          [
            '<strong>Bulk lot and serial creation</strong>',
            'Generate tracking numbers in batches',
            'Tracked goods arriving by the pallet',
          ],
          [
            '<strong>Dashboard widgets</strong>',
            'Stock health on the dashboard rather than buried in a report',
            'The morning check that used to mean running three reports',
          ],
          [
            '<strong>Reporting view and UOM categories</strong>',
            'A deeper view of stock, and cleaner unit-of-measure handling',
            'Anyone selling in one unit and buying in another',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Together these turn receiving from a data-entry task into a confirmation task. Scan, accept the suggested location, move on.',
      },

      { type: 'h2', text: 'A Maintenance module' },
      {
        type: 'p',
        text: 'Equipment now has a home. Register machines, vehicles and assets, raise maintenance requests against them, route those requests through teams and stages, and see the schedule on a calendar. Repairs get logged with a full history, in the same system as your stock and your sales.',
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'Getting started',
        text: 'The <a href="/guide/maintenance-operations-maintenance-requests">maintenance requests guide</a> covers requests, equipment, teams and stages end to end.',
      },

      { type: 'h2', text: 'Chatter stops being somewhere you have to check' },
      {
        type: 'p',
        text: 'Chatter — the comment and activity feed attached to every record — now pushes rather than waits. Mention someone, assign them something, or update a record they follow, and they get an alert both in the app and by email.',
      },
      {
        type: 'p',
        text: 'It sounds minor until you notice how much of a working day is spent refreshing a page to see whether anything happened.',
      },

      { type: 'h2', text: 'Custom fields, without a developer' },
      {
        type: 'p',
        text: 'Every business tracks something the software did not anticipate — a licence number, an internal reference, a note that matters only to you. You can now add your own fields across Accounting, Products, Projects, Recruitment, Sales, Security, Time Off, Timesheets and Website.',
      },
      {
        type: 'callout',
        kind: 'note',
        label: 'The quiet significance',
        text: 'This is the feature that decides whether a system bends to your process or your process bends to the system. Nine modules is most of the surface area.',
      },

      { type: 'h2', text: 'Customer portal accounts, without a support ticket' },
      {
        type: 'p',
        text: 'Portal access is now managed from the admin panel. Grant a customer access, revoke it, reset a password or send them a reset link — all from the interface, none of it requiring someone technical.',
      },

      { type: 'h2', text: 'Fewer surprises' },
      {
        type: 'p',
        text: 'A cluster of consistency work landed that will not make a screenshot but removes a steady drip of small confusions.',
      },
      {
        type: 'list',
        items: [
          '<strong>Settings pages share one layout.</strong> Learn where things are once and the knowledge transfers.',
          '<strong>The product screen is the same everywhere</strong> — Sales, Purchase or Inventory, it behaves identically.',
          '<strong>Orders now hold their own sub-records.</strong> Deliveries, invoices, receipts and bills sit under the order they belong to, instead of being hunted down in other menus.',
        ],
      },

      { type: 'h2', text: 'PostgreSQL, and a production Docker setup' },
      {
        type: 'p',
        text: 'PostgreSQL is now supported alongside MySQL. If your team already runs Postgres for everything else, self-hosting no longer means adopting a second database engine to keep happy.',
      },
      {
        type: 'p',
        text: 'The Docker setup also got simpler and is now aimed at production rather than just local development — a meaningful cut in the bespoke server work a self-hosted deployment demands.',
      },

      { type: 'h2', text: 'Languages, branding and date ranges' },
      {
        type: 'list',
        items: [
          'Spanish tidied into a single consolidated locale.',
          'Brazilian Portuguese added.',
          'Arabic extended to the plugins screen.',
          'Per-panel branding, so each panel can carry your own look.',
          'A date-range filter on dashboards, for looking at exactly the period you care about.',
        ],
      },

      { type: 'h2', text: 'Two security fixes worth reading twice' },
      {
        type: 'p',
        text: 'This release patches two issues, and both are reasons to upgrade rather than wait for a convenient weekend.',
      },
      {
        type: 'steps',
        items: [
          'A <strong>publicly reachable database admin tool</strong> (<code>adminer.php</code>) sat in a public folder, where anyone who guessed the address could in principle have reached it. Removed entirely.',
          'An <strong>insecure direct object reference</strong> in chatter let some users view or edit messages that were not theirs. Closed.',
        ],
      },
      {
        type: 'callout',
        kind: 'important',
        label: 'If you self-host',
        text: 'Upgrade promptly — on an older version, these two fixes alone justify it. Managed cloud instances on cloud.dekaerp.com are already patched; there is nothing for you to do.',
      },

      { type: 'h2', text: 'Under the hood' },
      {
        type: 'list',
        items: [
          'The core framework was upgraded.',
          'Uninstalling a plugin is now blocked when another plugin still depends on it — a small guardrail against quietly breaking something.',
          'Caches refresh automatically on plugin install and uninstall, so menus no longer go stale after a change.',
          'Test coverage grew across Accounting and Inventory.',
          'General performance work throughout.',
          '<strong>60+</strong> individual issues resolved.',
        ],
      },
      {
        type: 'p',
        text: 'That last line is the one that will not make a headline but will make your week. The long tail of small fixes is where a release stops feeling like a demo and starts feeling like software.',
      },

      { type: 'h2', text: 'Should you upgrade?' },
      {
        type: 'p',
        text: 'If you run more than one company, want PostgreSQL, or spend your day in the warehouse, 1.5 is an easy yes. If none of those apply, the two security fixes still make it worth doing sooner rather than at a convenient moment.',
      },
      {
        type: 'steps',
        items: [
          'On the managed cloud, you are already running 1.5 — no action needed.',
          'Self-hosting: take a backup and <em>restore it somewhere</em> to confirm it works before you begin.',
          'Pull the release, run the dependency install and the database migrations.',
          'Clear and rebuild caches, then verify company access for a user in each entity.',
        ],
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'Multi-company first',
        text: 'If you have been running one entity per installation to keep books separate, 1.5 is the release that lets you consolidate. Start with the entity you understand best and migrate the rest once the access model is set up the way you want it.',
      },
    ],
    related: ['multi-company-without-multi-systems', 'stock-that-matches-reality', 'cloud-or-self-hosted'],
  },

  {
    slug: 'outgrowing-spreadsheets',
    title: 'Five signs your business has outgrown spreadsheets',
    excerpt:
      'Spreadsheets scale beautifully until the day they do not. Here is how to tell the difference between a workbook that needs tidying and an operation that needs a system.',
    category: 'growth',
    date: '2026-07-14',
    readTime: '6 min read',
    author: 'DEKA ERP Team',
    body: [
      {
        type: 'p',
        text: 'Nearly every business we meet started in a spreadsheet, and there is nothing wrong with that. A workbook is free, instant, and infinitely flexible. The problem is that flexibility has no memory: nothing stops two people entering the same order twice, and nothing tells you that the stock figure in one tab stopped matching the warehouse three weeks ago.',
      },
      {
        type: 'p',
        text: 'The switch to a real system is rarely triggered by one dramatic failure. It creeps up. Here are the five signals we see most often, and what each one actually costs you.',
      },

      { type: 'h2', text: '1. The same number lives in three places' },
      {
        type: 'p',
        text: 'A customer calls to ask what they owe. You check the invoices workbook, then the payments workbook, then your bank statement — and you get three answers. The moment a figure is stored in more than one place, someone has to reconcile it, and that someone is usually your most senior person.',
      },
      {
        type: 'callout',
        kind: 'note',
        label: 'What it costs',
        text: 'Reconciliation is invisible work. It never appears on a job description, but in most small operations it quietly consumes several days a month.',
      },

      { type: 'h2', text: '2. Month-end takes longer than a week' },
      {
        type: 'p',
        text: 'If closing the books means chasing colleagues for their versions of files, your accounts are not being <em>recorded</em> — they are being <em>reconstructed</em>. A month-end that runs long is a symptom of transactions that were never captured at the point they happened.',
      },
      {
        type: 'p',
        text: 'In a connected system, the invoice, the stock movement, and the journal entry are all the same event seen from different angles. Closing the month becomes a review rather than an excavation.',
      },

      { type: 'h2', text: '3. Nobody can answer “where is that order?”' },
      {
        type: 'p',
        text: 'Ask five people the status of a specific order and count how many places they have to look. A quotation in someone’s email, a confirmation in WhatsApp, a delivery note in a folder, a payment in the bank app. The information exists; it just is not assembled.',
      },
      {
        type: 'list',
        items: [
          'Sales knows what was promised.',
          'The warehouse knows what left the building.',
          'Finance knows what was paid.',
          'Nobody knows all three at once.',
        ],
      },

      { type: 'h2', text: '4. Stock figures are treated as suggestions' },
      {
        type: 'p',
        text: 'This is the clearest signal of all. When your team stops trusting the stock number and walks to the shelf to check, the spreadsheet has already stopped being the system of record — the shelf is. You are now maintaining a document that nobody believes.',
      },
      {
        type: 'quote',
        text: 'The test is simple: if a stock figure and a physical count disagree, which one does your team assume is right?',
      },

      { type: 'h2', text: '5. Growth makes things worse, not better' },
      {
        type: 'p',
        text: 'A healthy operation gets more efficient as it grows — fixed effort spread across more transactions. If every new customer, product, or branch makes your admin load grow just as fast, you do not have a process, you have a headcount problem waiting to happen.',
      },
      {
        type: 'p',
        text: 'This is especially sharp for businesses running more than one legal entity. Two companies in spreadsheets is not twice the work; it is closer to three times, because now you also have to keep them separate.',
      },

      { type: 'h2', text: 'What to do about it' },
      {
        type: 'p',
        text: 'Do not try to fix everything at once. The businesses that migrate successfully almost always start with the flow that hurts most — usually quotation through to payment — and add modules as each one earns its place.',
      },
      {
        type: 'steps',
        items: [
          'Pick the single process that causes the most re-keying today.',
          'Move only that process, end to end, so one flow is genuinely unbroken.',
          'Migrate your master data — customers, vendors, products — once, properly.',
          'Add the next module only when the first one is being used without workarounds.',
        ],
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'Start narrow',
        text: 'DEKA ERP is modular for exactly this reason. A business that does not manufacture never has to see Manufacturing. Install what you use, add the rest when you need it.',
      },
    ],
    related: ['quotation-to-cash', 'stock-that-matches-reality'],
  },

  {
    slug: 'one-platform-fourteen-jobs',
    title: 'One platform, fourteen jobs: a tour of DEKA ERP',
    excerpt:
      '“ERP” is a category name, not a description. Here is the plain-English version of what the system actually covers — sell, buy, make and move, run — and which parts you can safely ignore until you need them.',
    category: 'operations',
    date: '2026-07-21',
    readTime: '8 min read',
    author: 'DEKA ERP Team',
    body: [
      {
        type: 'p',
        text: '“Enterprise resource planning” is one of those phrases that manages to be both accurate and useless. It tells you the software is large. It does not tell you what happens when you sit down in front of it on a Tuesday.',
      },
      {
        type: 'p',
        text: 'So here is the concrete version. DEKA ERP is organised into fourteen modules across four groups, and you install only the ones you need. This is what each group actually does.',
      },
      {
        type: 'table',
        columns: ['Group', 'Modules', 'The question it answers'],
        rows: [
          ['<strong>Sell</strong>', 'Sales, Invoicing, Contacts, Customer Portal', 'What did we promise, and have we been paid?'],
          ['<strong>Buy</strong>', 'Purchasing, Accounting, Payments', 'What did we order, and what do we owe?'],
          ['<strong>Make &amp; Move</strong>', 'Inventory, Manufacturing, Products', 'What do we have, and where is it?'],
          ['<strong>Run</strong>', 'Projects, Employees, Time Off &amp; Recruitment, Maintenance', 'Who is doing what, and with which equipment?'],
        ],
      },

      { type: 'h2', text: 'Sell' },
      {
        type: 'p',
        text: 'The revenue side, and usually the first thing a business moves off spreadsheets. A <a href="/guide/sales-orders-quotations">quotation</a> becomes a sales order on acceptance, the order drives a delivery, and the <a href="/guide/invoice-customers-invoices">invoice</a> bills what was actually delivered rather than what was originally ordered.',
      },
      {
        type: 'list',
        items: [
          '<strong>Sales</strong> — quotations, orders, order templates, optional upsell lines.',
          '<strong>Invoicing</strong> — invoices, credit notes, refunds, payment terms.',
          '<strong>Contacts</strong> — <a href="/guide/contact-contacts">customers and vendors</a> in one address book, with bank details and tax registration.',
          '<strong>Customer Portal</strong> — customers view their own orders and documents instead of emailing you for copies.',
        ],
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'Start here',
        text: 'If you only move one process into the system, move this one. It is where re-keying costs the most, and the flow is covered end to end in <a href="/blog/quotation-to-cash">quotation to cash</a>.',
      },

      { type: 'h2', text: 'Buy' },
      {
        type: 'p',
        text: 'The mirror image of Sell, and structurally almost identical: a request for quotation goes out, becomes a <a href="/guide/purchase-orders-purchase-orders">purchase order</a>, the goods arrive against it, and the vendor bill is checked against what actually turned up.',
      },
      {
        type: 'list',
        items: [
          '<strong>Purchasing</strong> — RFQs, purchase orders, long-term agreements, vendor pricelists.',
          '<strong>Accounting</strong> — chart of accounts, journals, taxes, reporting.',
          '<strong>Payments</strong> — methods, registration, and reconciliation against invoices and bills.',
        ],
      },
      {
        type: 'p',
        text: 'The accounting module is the one people expect to be painful and usually is not, because the entries are a by-product of the documents rather than a separate exercise. More on that in <a href="/blog/closing-the-month">closing the month</a>.',
      },

      { type: 'h2', text: 'Make & Move' },
      {
        type: 'p',
        text: 'Everything physical. <a href="/guide/inventories-operations-transfers">Transfers</a> record stock moving between locations, warehouses, vendors and customers; adjustments handle the reality of damage, returns and miscounts. If you assemble anything, <a href="/guide/manufacturing-operations-manufacturing-orders">manufacturing orders</a> consume components against a bill of materials and produce finished goods.',
      },
      {
        type: 'list',
        items: [
          '<strong>Inventory</strong> — warehouses, receipts, deliveries, lots and serial numbers, barcode scanning.',
          '<strong>Manufacturing</strong> — bills of materials, work orders, work centres, component availability.',
          '<strong>Products</strong> — variants, categories, attributes, units of measure, pricelists.',
        ],
      },
      {
        type: 'callout',
        kind: 'note',
        label: 'Skip what you do not do',
        text: 'A business that does not manufacture never installs Manufacturing and never sees the menu. That is the point of modules — the system should not be a tour of features you will never use.',
      },

      { type: 'h2', text: 'Run the business' },
      {
        type: 'p',
        text: 'The internal half: people, work, and the equipment that does it.',
      },
      {
        type: 'list',
        items: [
          '<strong>Projects</strong> — <a href="/guide/project-projects">projects and tasks</a> with stages, milestones and time tracking.',
          '<strong>Employees</strong> — <a href="/guide/employees-employees">records</a>, departments, contracts and documents.',
          '<strong>Time Off &amp; Recruitment</strong> — <a href="/guide/time-off-my-time">leave requests</a> and approvals, job postings, <a href="/guide/recruitment-applications">applicant pipelines</a>.',
          '<strong>Maintenance</strong> — <a href="/guide/maintenance-operations-maintenance-requests">equipment, requests, teams</a> and a maintenance calendar.',
        ],
      },
      {
        type: 'p',
        text: 'Recruitment and Time Off are worth calling out because they are the two most commonly run in a separate tool, and the two where a separate tool causes the most confusion — a person hired in one system and given leave in another is a person nobody can report on.',
      },

      { type: 'h2', text: 'The part that is easy to miss' },
      {
        type: 'p',
        text: 'Read that list again and it looks like fourteen applications sold together. It is not, and the difference is the whole reason to run an ERP rather than four good point tools.',
      },
      {
        type: 'steps',
        items: [
          'Confirming a sales order <strong>reserves stock</strong> in Inventory.',
          'Validating the delivery <strong>moves that stock</strong> and records what actually shipped.',
          'Invoicing the order <strong>posts to the ledger</strong> in Accounting.',
          'Registering the payment <strong>updates the customer balance</strong> everywhere at once.',
        ],
      },
      {
        type: 'quote',
        text: 'Four departments, one record. Nobody re-types anything, because there is nothing to re-type.',
      },
      {
        type: 'p',
        text: 'Every record also carries its own discussion thread and file attachments, so the conversation about an invoice lives on the invoice rather than in somebody’s inbox.',
      },

      { type: 'h2', text: 'What sits underneath all of it' },
      {
        type: 'list',
        items: [
          '<strong>Multi-company</strong> — several legal entities in one installation, with separate books and a switcher.',
          '<strong>Roles and permissions</strong> — access granted per module and per company.',
          '<strong>Five interface languages</strong>, including right-to-left support.',
          '<strong>REST API and spreadsheet import/export</strong> on every list view.',
          '<strong>Cloud or self-hosted</strong>, running the same application either way.',
        ],
      },

      { type: 'h2', text: 'Where to start' },
      {
        type: 'p',
        text: 'Not everywhere. The failed ERP projects are almost always the ones that tried to switch the whole business over one weekend.',
      },
      {
        type: 'steps',
        items: [
          'Pick the process that causes the most duplicate typing today — usually orders and invoices.',
          'Migrate the master data behind it: customers, vendors, products.',
          'Run that one flow end to end until nobody is using a workaround.',
          'Add the next module only then.',
        ],
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'Have a look first',
        text: 'Every module above has a step-by-step walkthrough with the real screens in the <a href="/guide">user guide</a> — worth ten minutes before you decide what to switch on.',
      },
    ],
    related: ['quotation-to-cash', 'outgrowing-spreadsheets', 'multi-company-without-multi-systems'],
  },

  {
    slug: 'quotation-to-cash',
    title: 'Quotation to cash: what an unbroken order flow looks like',
    excerpt:
      'Most order problems are not order problems — they are handover problems. A walk through the five documents every sale produces, and why they should all be the same record.',
    category: 'operations',
    date: '2026-07-28',
    readTime: '7 min read',
    author: 'DEKA ERP Team',
    body: [
      {
        type: 'p',
        text: 'Every sale you make produces roughly the same chain of documents, whether you sell cement, consultancy, or cold drinks. A customer asks what it costs. You quote. They accept. You deliver. You invoice. They pay.',
      },
      {
        type: 'p',
        text: 'Five steps, and in most businesses each one lives in a different tool. That is where the errors come from — not from the steps themselves, but from the handovers between them.',
      },

      { type: 'h2', text: 'The chain, and where it usually breaks' },
      {
        type: 'table',
        columns: ['Stage', 'Document', 'Typical break'],
        rows: [
          ['Enquiry', 'Quotation', 'Priced in a spreadsheet, sent from email, never recorded'],
          ['Acceptance', 'Sales order', 'Re-typed from the quotation, sometimes with different figures'],
          ['Fulfilment', 'Delivery note', 'Written by hand; stock adjusted later, or not at all'],
          ['Billing', 'Invoice', 'Re-typed again, from the delivery note or from memory'],
          ['Settlement', 'Payment', 'Matched to the invoice manually, weeks later'],
        ],
      },
      {
        type: 'p',
        text: 'Notice how often the words <strong>re-typed</strong> appear. Each re-typing is an opportunity for a figure to change, and every changed figure eventually becomes a conversation with a customer you would rather not have.',
      },

      { type: 'h2', text: 'One record, five views' },
      {
        type: 'p',
        text: 'In a connected system the quotation does not get copied into an order — it <em>becomes</em> one. The same is true down the chain. What you are really doing is changing the state of a single record and letting each department see the view it needs.',
      },
      {
        type: 'steps',
        items: [
          'Create the quotation once, with the customer, products, quantities and terms.',
          'On acceptance, confirm it. The sales order carries the same lines forward — no re-keying.',
          'Confirming reserves the stock and generates the delivery. The warehouse sees what to pick.',
          'Validating the delivery moves the stock and marks the quantities actually delivered.',
          'Invoice from the order. The lines are already there, matching what was really shipped.',
          'Register the payment against the invoice. The balance updates everywhere at once.',
        ],
      },
      {
        type: 'callout',
        kind: 'important',
        label: 'The important detail',
        text: 'Invoice from the delivered quantity, not the ordered quantity. If you shipped 90 of 100 units, the invoice should say 90 without anyone having to remember to change it.',
      },

      { type: 'h2', text: 'What this changes day to day' },
      {
        type: 'list',
        items: [
          '<strong>Sales</strong> stops answering “has it shipped?” by walking to the warehouse.',
          '<strong>The warehouse</strong> stops receiving instructions by phone.',
          '<strong>Finance</strong> stops rebuilding invoices from delivery notes.',
          '<strong>Management</strong> can see the value sitting at each stage without asking anyone.',
        ],
      },
      {
        type: 'p',
        text: 'That last point is usually the surprise. Once the chain is unbroken, the pipeline becomes measurable for free — quotations outstanding, orders not yet delivered, deliveries not yet invoiced, invoices not yet paid. You did not build a report; you just stopped losing the data.',
      },

      { type: 'h2', text: 'A note on partial deliveries' },
      {
        type: 'p',
        text: 'Real orders rarely go out in one piece. Something is out of stock, a customer takes half now and half next month, a vendor short-ships you. This is precisely where spreadsheet workflows fall apart, because a partial delivery means the order, the delivery note and the invoice all diverge.',
      },
      {
        type: 'p',
        text: 'Handle it by keeping the order as the anchor and letting deliveries and invoices attach to it as many times as needed. The order knows what is still owed; you never have to work it out.',
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'Try it',
        text: 'The Sales and Invoices modules in the user guide walk through this exact flow with the real screens, including partial delivery and partial invoicing.',
      },
    ],
    related: ['outgrowing-spreadsheets', 'closing-the-month'],
  },

  {
    slug: 'multi-company-without-multi-systems',
    title: 'Running several companies without running several systems',
    excerpt:
      'Group structures are normal long before they are large. What proper multi-company support means in practice — and the three questions to ask any vendor who charges extra for it.',
    category: 'growth',
    date: '2026-08-06',
    readTime: '6 min read',
    author: 'DEKA ERP Team',
    body: [
      {
        type: 'p',
        text: 'Businesses end up with more than one legal entity for ordinary reasons. A trading arm and a manufacturing arm. A separate company for a new region. A subsidiary set up for a single large contract, or because a partner wanted their own vehicle.',
      },
      {
        type: 'p',
        text: 'None of these are signs of a large enterprise. They are signs of a business that is a few years old. Yet most systems at this level either charge a premium for multi-company or do not support it at all, which leaves you running the same software twice and reconciling by hand.',
      },

      { type: 'h2', text: 'What separate actually has to mean' },
      {
        type: 'p',
        text: 'Multi-company is easy to claim and harder to do properly. The test is whether each entity keeps its own books in the fullest sense:',
      },
      {
        type: 'list',
        items: [
          'Its own <strong>chart of accounts</strong> and journals.',
          'Its own <strong>base currency</strong> and fiscal year, which may differ from its siblings.',
          'Its own <strong>tax registration</strong> and rates.',
          'Its own <strong>customers, vendors, products and warehouses</strong> — or shared ones, but by explicit choice.',
          'Its own <strong>document numbering</strong>, so invoice sequences do not interleave across entities.',
        ],
      },
      {
        type: 'callout',
        kind: 'important',
        label: 'The line that matters',
        text: 'If a user with access to Company A can see a single row belonging to Company B without being granted it, the separation is cosmetic. Data isolation is a permission model, not a filter on a screen.',
      },

      { type: 'h2', text: 'Three questions worth asking' },
      {
        type: 'steps',
        items: [
          '<strong>Is it one installation or two?</strong> If the answer involves a second database, a second licence, or a second login, you will be reconciling by hand forever.',
          '<strong>Can a user move between entities without signing out?</strong> A switcher in the top bar is the difference between a group system and two systems in a trench coat.',
          '<strong>What does the second company cost?</strong> If multi-company is priced per entity, growth is being taxed.',
        ],
      },

      { type: 'h2', text: 'Shared where it helps, separate where it counts' },
      {
        type: 'p',
        text: 'Total separation is not always what you want. A group usually has one list of employees, one set of product definitions, and one address book, even when the ledgers are strictly independent. The useful design lets you choose per record type rather than forcing all-or-nothing.',
      },
      {
        type: 'p',
        text: 'The practical consequence is that a person hired once appears in both entities, while an invoice raised in one is invisible in the other — which is exactly how an accountant would describe it.',
      },

      { type: 'h2', text: 'Access is the other half' },
      {
        type: 'p',
        text: 'Multi-company only works if permissions travel with it. A branch manager should see their own entity in full and nothing of the others. A group finance lead should see all of them. A warehouse operator probably needs one module in one company and nothing else.',
      },
      {
        type: 'quote',
        text: 'Grant access per company and per module. Anything coarser and you will end up creating duplicate users to work around your own security.',
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'In DEKA ERP',
        text: 'Multi-company is part of the platform, not an add-on. Entities are created from Settings, users are granted access per company, and the switcher in the top bar moves between them in one click — one installation, one login.',
      },
    ],
    related: ['deka-erp-1-5', 'open-source-is-not-about-price', 'cloud-or-self-hosted'],
  },

  {
    slug: 'stock-that-matches-reality',
    title: 'Stock that matches reality: making inventory figures trustworthy',
    excerpt:
      'Inventory accuracy is not a counting problem, it is a timing problem. Why stock drifts, and the operational habits that keep the system and the shelf in agreement.',
    category: 'inventory',
    date: '2026-08-13',
    readTime: '7 min read',
    author: 'DEKA ERP Team',
    body: [
      {
        type: 'p',
        text: 'Ask a warehouse team why the system says 40 and the shelf holds 37, and you will rarely hear “someone counted wrong”. You will hear about the delivery that went out before the paperwork, the return that came back last week, the damaged carton nobody wanted to write off.',
      },
      {
        type: 'p',
        text: 'Inventory does not drift because people cannot count. It drifts because stock moves at one moment and gets recorded at another.',
      },

      { type: 'h2', text: 'The three sources of drift' },
      {
        type: 'table',
        columns: ['Cause', 'What it looks like', 'Fix'],
        rows: [
          ['Delayed recording', 'Goods leave on Friday, are entered on Monday', 'Record the movement, not the paperwork'],
          ['Unrecorded events', 'Damage, samples, returns, internal use', 'Give every one of them a transaction type'],
          ['Untracked locations', 'Stock “in the van” or “at the other branch”', 'Make transit a location, not a gap'],
        ],
      },
      {
        type: 'p',
        text: 'The middle row is the one most businesses under-estimate. If your system has no way to record a broken item, your team will simply not record it — and the gap will surface months later as an unexplained variance.',
      },

      { type: 'h2', text: 'Make the movement the event' },
      {
        type: 'p',
        text: 'The single most effective change is to stop treating stock updates as a clerical task that follows the physical work, and start treating the physical work as the thing that updates stock. Validating a delivery <em>is</em> the stock movement. There is no second step to forget.',
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'Barcode where it hurts',
        text: 'You do not need to barcode everything. Start with receipts and deliveries — the two points where volume is highest and errors are most expensive. Scanning turns a data-entry task into a confirmation.',
      },

      { type: 'h2', text: 'Reserve early, deduct late' },
      {
        type: 'p',
        text: 'A common design mistake is to reduce stock the moment an order is confirmed. The goods have not moved, so the figure now disagrees with the shelf — and if the order is cancelled you have to remember to put it back.',
      },
      {
        type: 'p',
        text: 'The better model separates two ideas: <strong>on hand</strong> is what is physically there, <strong>available</strong> is what is not already promised to someone. Confirming an order reserves stock; validating the delivery deducts it.',
      },
      {
        type: 'list',
        items: [
          'Sales sees availability and stops over-promising.',
          'The warehouse sees on-hand and can still count it.',
          'A cancelled order releases its reservation with no manual correction.',
        ],
      },

      { type: 'h2', text: 'Count continuously, not annually' },
      {
        type: 'p',
        text: 'The annual stocktake is a poor tool for accuracy. It finds the total error long after the cause has been forgotten, and it usually requires stopping work for a day.',
      },
      {
        type: 'steps',
        items: [
          'Rank products by value and movement frequency.',
          'Count the fastest-moving, highest-value lines weekly — often a few dozen items.',
          'Count the long tail quarterly or annually.',
          'Treat every adjustment as a question: what movement did we fail to record?',
        ],
      },
      {
        type: 'quote',
        text: 'An adjustment is not a correction. It is evidence of a process that did not capture something.',
      },

      { type: 'h2', text: 'When lots and serials earn their keep' },
      {
        type: 'p',
        text: 'Lot and serial tracking adds work at every movement, so add it deliberately. It pays for itself when you need to trace a batch back to a supplier, honour a warranty, or manage expiry — and it is overhead everywhere else.',
      },
      {
        type: 'callout',
        kind: 'note',
        label: 'Rule of thumb',
        text: 'Track lots where a recall would be expensive, serials where an individual unit has a service history, and neither where the product is fungible.',
      },
    ],
    related: ['quotation-to-cash', 'outgrowing-spreadsheets'],
  },

  {
    slug: 'open-source-is-not-about-price',
    title: 'Open source is not about the price tag',
    excerpt:
      'The cheapest thing about open-source software is usually the licence. What you are really buying is the right to leave — and that turns out to matter far more than the sticker.',
    category: 'platform',
    date: '2026-08-18',
    readTime: '7 min read',
    author: 'DEKA ERP Team',
    body: [
      {
        type: 'p',
        text: 'When open source comes up in a software decision, the conversation almost always starts in the wrong place: with cost. Free licence, smaller invoice, done. It is an easy argument to make and a weak one to rely on, because by the time you have paid for hosting, migration and somebody’s time, the licence line was never where the money went.',
      },
      {
        type: 'p',
        text: 'The real argument is less obvious and much more durable. Open source is a hedge against the day the relationship stops working.',
      },

      { type: 'h2', text: 'What you are actually buying' },
      {
        type: 'p',
        text: 'An ERP ends up holding your customers, your prices, your stock history and your ledger. Three or four years in, it is not a tool you use — it is the record of how the business ran. That concentration is exactly what makes the switching cost so brutal, and exactly what a vendor’s pricing power rests on.',
      },
      {
        type: 'p',
        text: 'Open source does not make that data less concentrated. It makes it less <em>captive</em>. The schema is documented because you can read it. The export exists because you can write one. Nobody has to approve your departure.',
      },
      {
        type: 'quote',
        text: 'The value of an exit is not that you take it. It is that both sides know it exists.',
      },

      { type: 'h2', text: 'The lock-in test' },
      {
        type: 'p',
        text: 'Whatever a vendor calls their licence, three questions tell you where you stand:',
      },
      {
        type: 'steps',
        items: [
          '<strong>If you stopped paying tomorrow, what happens to the data?</strong> Not “can you request an export” — can you take it, in a format something else can read, without asking?',
          '<strong>Can anyone but the vendor host it?</strong> If the answer is no, the price is whatever they decide it is next year.',
          '<strong>Can you read the code that calculates your tax?</strong> If not, you are trusting a number you cannot check.',
        ],
      },
      {
        type: 'callout',
        kind: 'important',
        label: 'Test it once, for real',
        text: 'Run the export. Open the file. Confirm it contains what you think it contains. An escape route you have never walked is a rumour, not a plan.',
      },

      { type: 'h2', text: 'Where the two models actually differ' },
      {
        type: 'table',
        columns: ['', 'Closed source', 'Open source'],
        rows: [
          ['Leaving', 'Whatever the contract permits', 'Take the data and the code'],
          ['Hosting', 'The vendor, at their price', 'Their cloud, your servers, or someone else’s'],
          ['Auditing', 'Trust the vendor', 'Read it, or pay someone to'],
          ['Extending', 'Wait for the roadmap', 'Build it, or wait for the roadmap'],
          ['If the vendor folds', 'The software goes with them', 'The code outlives the company'],
          ['Cost shape', 'Licence plus support', 'Hosting plus time'],
        ],
      },
      {
        type: 'p',
        text: 'That last row is the honest one, and it cuts both ways. Open source moves cost rather than removing it.',
      },

      { type: 'h2', text: 'Auditability is a security feature' },
      {
        type: 'p',
        text: 'There is a persistent myth that code nobody can read is safer, because attackers cannot read it either. In practice the opposite tends to hold: attackers find bugs regardless, and the only question is whether anyone else was allowed to look first.',
      },
      {
        type: 'p',
        text: 'The recent <a href="/blog/deka-erp-1-5">1.5 release</a> is a small illustration. Two security issues were found, fixed, and described publicly — including the awkward one, a database admin tool that should never have shipped. That is what the process looks like when it works. A closed platform would have shipped the same fix in a release note that said “various improvements”.',
      },
      {
        type: 'callout',
        kind: 'note',
        label: 'What to look for',
        text: 'Not “has this project ever had a vulnerability” — every project has. Look at how quickly they were fixed, and whether the project said so plainly.',
      },

      { type: 'h2', text: 'Where open source is not free' },
      {
        type: 'p',
        text: 'It is worth being blunt about the costs that replace the licence fee, because pretending they do not exist is how open-source projects end up abandoned six months in.',
      },
      {
        type: 'list',
        items: [
          '<strong>Someone has to run it.</strong> Servers, backups, TLS certificates, upgrades. That is a job, even if it is a small one.',
          '<strong>Support is a choice, not a default.</strong> Community help is real but unscheduled. If you need someone to answer at month-end, arrange it.',
          '<strong>Freedom to modify is freedom to diverge.</strong> Every customisation is something you now maintain through every upgrade.',
        ],
      },
      {
        type: 'p',
        text: 'None of these are arguments against open source. They are arguments for choosing it deliberately — and for taking the managed option when nobody on the team wants to own a server.',
      },

      { type: 'h2', text: 'Applying the test to DEKA ERP' },
      {
        type: 'p',
        text: 'It would be cheap to make this argument and then dodge our own three questions, so here are the answers plainly.',
      },
      {
        type: 'p',
        text: 'DEKA ERP is built on an open-source core: an MIT-licensed Laravel and Filament application. We maintain and operate our own build of it rather than publishing that build, so the honest claim is not “take our source” — it is that the foundation underneath is public, standard, and not any single vendor’s private property.',
      },
      {
        type: 'p',
        text: 'What that means for the questions above:',
      },
      {
        type: 'list',
        items: [
          '<strong>Your data.</strong> It lives in an ordinary PostgreSQL or MySQL database — no proprietary datastore. Take a dump, query it directly, export any list view to a spreadsheet, or pull it through the REST API with a token.',
          '<strong>Hosting.</strong> Run it on <a href="/blog/cloud-or-self-hosted">our cloud or your own servers</a>. Self-hosting is a supported option, not a bargaining chip, and it is the same application either way.',
          '<strong>The platform beneath.</strong> Standard PHP on a public, MIT-licensed project — auditable by anyone, and not dependent on our company continuing to exist.',
        ],
      },
      {
        type: 'callout',
        kind: 'note',
        label: 'Where the line sits',
        text: 'Open core, operated build. You get portability of your data and choice of where it runs; you do not get a copy of our repository. Worth knowing which one you are being sold, whoever you buy from.',
      },
      {
        type: 'p',
        text: 'The practical version of all this is unglamorous: you can start on the managed cloud because it is faster, and move in-house later because nothing stops you. The decision stays yours after you have made it, which is the only property of a software choice that reliably ages well.',
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'If you want to kick the tyres',
        text: 'Start a workspace on cloud.dekaerp.com, load a month of real data, and try the export before you commit to anything.',
      },
    ],
    related: ['cloud-or-self-hosted', 'deka-erp-1-5', 'outgrowing-spreadsheets'],
  },

  {
    slug: 'closing-the-month',
    title: 'Closing the month on real transactions',
    excerpt:
      'A month-end that takes a week is a data problem wearing an accounting costume. How to get to a close that reviews figures instead of rebuilding them.',
    category: 'finance',
    date: '2026-08-20',
    readTime: '6 min read',
    author: 'DEKA ERP Team',
    body: [
      {
        type: 'p',
        text: 'There are two kinds of month-end. In the first, the numbers already exist and the team reviews them. In the second, the team assembles the numbers from documents scattered across the business, then reviews whatever they managed to assemble.',
      },
      {
        type: 'p',
        text: 'The second kind takes a week, produces figures nobody fully trusts, and gets slower every year. The difference between them has almost nothing to do with accounting skill.',
      },

      { type: 'h2', text: 'Where the week actually goes' },
      {
        type: 'list',
        items: [
          'Chasing documents that were never entered.',
          'Matching payments to invoices by hand.',
          'Explaining why the stock valuation moved.',
          'Reconciling intercompany balances between entities.',
          'Correcting entries that were posted to the wrong period.',
        ],
      },
      {
        type: 'p',
        text: 'Every item on that list is a symptom of a transaction recorded away from the event that caused it. Fix the capture and the close shortens on its own.',
      },

      { type: 'h2', text: 'Post from the source document' },
      {
        type: 'p',
        text: 'When an invoice is created from an order, and a payment is registered against that invoice, the journal entries are a consequence rather than a task. Nobody sits down to “do the postings” because the postings already happened.',
      },
      {
        type: 'callout',
        kind: 'important',
        label: 'The habit to break',
        text: 'Keeping a parallel spreadsheet “for the accountant”. The moment two records exist, one of them will be wrong, and reconciling them becomes a permanent monthly cost.',
      },

      { type: 'h2', text: 'Reconcile as you go' },
      {
        type: 'p',
        text: 'Bank reconciliation is far easier in small, frequent doses. Matching a week of transactions while you still remember them takes minutes; matching a month of them is an afternoon of detective work.',
      },
      {
        type: 'steps',
        items: [
          'Import or enter bank movements weekly.',
          'Match each one to an invoice, bill, or journal while the context is fresh.',
          'Leave genuinely unknown items in a holding account and chase them immediately.',
          'Never let an unmatched item cross a month boundary without a note explaining why.',
        ],
      },

      { type: 'h2', text: 'Close the period, then keep it closed' },
      {
        type: 'p',
        text: 'A period that stays open invites late entries, and late entries mean the report you sent last week no longer matches the system. Lock the period once it is reviewed, and handle genuine corrections as dated adjustments in the current period.',
      },
      {
        type: 'quote',
        text: 'A figure you can reproduce next year is worth more than a figure that was slightly more accurate for a day.',
      },

      { type: 'h2', text: 'Groups: close each entity, then consolidate' },
      {
        type: 'p',
        text: 'If you run several companies, resist the urge to consolidate early. Each entity should close on its own books, with its own currency and fiscal calendar. Consolidation is a reporting step that sits on top of clean individual closes — never a substitute for them.',
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'Where to start',
        text: 'Pick one entity and one month. Get that close down to a review rather than a rebuild, then apply the same capture habits to the rest.',
      },
    ],
    related: ['quotation-to-cash', 'multi-company-without-multi-systems'],
  },

  {
    slug: 'cloud-or-self-hosted',
    title: 'Cloud or self-hosted: choosing where your ERP lives',
    excerpt:
      'The hosting decision is usually made on instinct and regretted on invoices. An honest comparison of what each model actually asks of you.',
    category: 'platform',
    date: '2026-08-22',
    readTime: '5 min read',
    author: 'DEKA ERP Team',
    body: [
      {
        type: 'p',
        text: 'Where your ERP runs is one of the few decisions that is genuinely hard to reverse cheaply, and it tends to get made on instinct — either “cloud is modern” or “our data stays with us”. Both instincts are defensible. Neither is a reason on its own.',
      },

      { type: 'h2', text: 'What you are really choosing' },
      {
        type: 'table',
        columns: ['', 'Cloud hosted', 'Self-hosted'],
        rows: [
          ['Who patches the server', 'The provider', 'You'],
          ['Who restores a bad backup', 'The provider', 'You, at 2am'],
          ['Data residency', 'Provider’s region', 'Wherever you choose'],
          ['Time to first login', 'Minutes', 'Days to weeks'],
          ['Cost shape', 'Predictable subscription', 'Capital plus staff time'],
          ['Customisation depth', 'Bounded by the platform', 'Unbounded'],
        ],
      },
      {
        type: 'p',
        text: 'The row that decides it for most businesses is the second one. Backups are easy to configure and hard to <em>verify</em>, and the difference only becomes visible on the worst day you will have.',
      },

      { type: 'h2', text: 'Choose self-hosted when' },
      {
        type: 'list',
        items: [
          'A regulator or a contract dictates where the data physically sits.',
          'You already run infrastructure and have someone whose job includes it.',
          'You need integrations with systems that are not reachable from the internet.',
          'You intend to modify the platform itself, not just configure it.',
        ],
      },

      { type: 'h2', text: 'Choose cloud when' },
      {
        type: 'list',
        items: [
          'You want to be operating this quarter, not next.',
          'Nobody on the team wants to be woken by a disk alert.',
          'Your requirement is configuration, not code.',
          'You would rather spend the budget on the business than on redundancy.',
        ],
      },
      {
        type: 'callout',
        kind: 'important',
        label: 'The question people forget',
        text: 'Whichever you choose, ask how you would get your data <em>out</em>. An export you have actually performed once is worth more than a promise in a contract.',
      },

      { type: 'h2', text: 'You are allowed to change your mind' },
      {
        type: 'p',
        text: 'The decision is less permanent than it feels, provided the software is the same in both places. Because DEKA ERP is the same application whether we host it or you do, starting on the cloud and moving in-house later is a migration of data and configuration rather than a replacement project.',
      },
      {
        type: 'p',
        text: 'That is the practical argument for keeping the option open: begin wherever you can start fastest, and let the requirement — not the instinct — move you.',
      },
      {
        type: 'callout',
        kind: 'tip',
        label: 'Self-hosting checklist',
        text: 'PHP 8.2+, PostgreSQL or MySQL, Redis, a reverse proxy with TLS, and a backup you have restored at least once. The API and self-hosting guide covers the full setup.',
      },
    ],
    related: ['deka-erp-1-5', 'multi-company-without-multi-systems', 'outgrowing-spreadsheets'],
  },
]

/** Newest first — the order posts are listed in. */
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export const findPost = (slug) => posts.find((post) => post.slug === slug)

export const relatedTo = (post) =>
  (post?.related || []).map((slug) => findPost(slug)).filter(Boolean)

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
