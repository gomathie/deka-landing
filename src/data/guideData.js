import { guideCategories as aureusCategories } from './aureusGuides.js';

// Internal custom guides array
const customCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>',
    items: [
      {
        id: 'overview',
        title: 'Platform Overview & Navigation',
        badge: 'Essential',
        readTime: '4 min read',
        summary: 'Learn the fundamentals of DEKA ERP, including login, role permissions, command palette navigation, and real-time dashboard widgets.',
        workflow: ['Sign In', 'Explore Dashboard', 'Use Command Palette', 'Configure Language'],
        steps: [
          {
            title: 'Sign In to Your DEKA ERP Cloud Instance',
            description: 'Access the admin console with your assigned credentials. DEKA ERP uses secure tokenized sessions with full audit logging.',
            instructions: [
              'Navigate to <strong>https://cloud.dekaerp.com/admin/login</strong> in your web browser.',
              'Enter your registered email address and password.',
              'If two-factor authentication (2FA) is enabled for your profile, enter the 6-digit authenticator code.',
              'Click <strong>Sign In</strong> to land on your company dashboard.'
            ],
            tip: 'You can bookmark cloud.dekaerp.com/admin for 1-click access. Your active company context is preserved across sessions.',
            uiPreview: {
              title: 'DEKA ERP Admin Console',
              module: 'Auth',
              searchPlaceholder: 'Quick Jump...',
              fields: [
                { label: 'Instance URL', value: 'https://cloud.dekaerp.com' },
                { label: 'Authentication', value: 'Token-based Secure Session', highlight: true }
              ]
            }
          },
          {
            title: 'Navigate with the Command Palette (Ctrl+K / Cmd+K)',
            description: 'DEKA ERP features keyboard-driven navigation to let you jump between modules, create records, and search contacts without touching your mouse.',
            instructions: [
              'Press <kbd>Ctrl + K</kbd> (Windows/Linux) or <kbd>Cmd + K</kbd> (macOS) from anywhere in the interface.',
              'Type the name of any record, customer, invoice number, or module (e.g., "Create Sales Order", "Apex BNN", "Stock Receipt").',
              'Use the arrow keys to select the item and press <kbd>Enter</kbd> to open it immediately.'
            ],
            note: 'The Command Palette respects your module permissions. You will only see results for modules and records your role allows you to access.'
          },
          {
            title: 'Switch Interface Language & Locale',
            description: 'DEKA ERP ships with 5 languages built in out-of-the-box, including full Right-to-Left (RTL) PDF and layout rendering for Arabic.',
            instructions: [
              'Click on your profile avatar in the top-right corner.',
              'Select <strong>Preferences</strong> > <strong>Language & Regional Settings</strong>.',
              'Choose from <strong>English</strong>, <strong>العربية (Arabic)</strong>, <strong>Français</strong>, <strong>Español</strong>, or <strong>Português (BR)</strong>.',
              'Click <strong>Save Preferences</strong>. All menus, forms, and PDF templates adapt to the selected locale.'
            ]
          }
        ]
      },
      {
        id: 'multi-company-guide',
        title: 'Multi-Company Setup & Switcher',
        badge: 'Core Feature',
        readTime: '6 min read',
        summary: 'DEKA ERP includes native multi-company architecture. Run multiple legal entities from a single deployment with strict data separation.',
        workflow: ['Create Entity', 'Set Currency & Fiscal Year', 'Assign User Roles', 'Use Switcher'],
        steps: [
          {
            title: 'Understand Multi-Company Isolation',
            description: 'Unlike other systems that require separate databases or expensive add-ons, DEKA ERP separates data per company natively. Customers, accounts, warehouses, and tax records belong to their respective entity.',
            instructions: [
              'Go to <strong>Settings</strong> > <strong>Companies & Entities</strong>.',
              'View all registered legal entities within your organization group.',
              'Click <strong>New Company</strong> to register a new legal subsidiary, branch, or partner entity.'
            ],
            important: 'Each company maintains its own independent Chart of Accounts, base currency, tax rates, and default warehouse.',
            uiPreview: {
              title: 'Company Directory',
              module: 'Multi-Company',
              topActions: ['+ New Company', 'Manage Access'],
              table: {
                columns: ['Company Name', 'Base Currency', 'Status', 'Users'],
                rows: [
                  ['Apex BNN Company', 'GHS (₵)', 'Active', '12 Members'],
                  ['Sankofa Manufacturing Ltd', 'GHS (₵)', 'Active', '8 Members'],
                  ['Volta Logistics Ltd', 'USD ($)', 'Active', '5 Members']
                ]
              }
            }
          },
          {
            title: 'Configure Company Fiscal Settings & Currency',
            description: 'Assign legal registration details, tax identifiers, fiscal year start dates, and default invoicing prefixes.',
            instructions: [
              'Enter the <strong>Company Legal Name</strong>, <strong>Tax / VAT Registration Number</strong>, and <strong>Registered Address</strong>.',
              'Select the <strong>Base Operating Currency</strong> (e.g. USD, EUR, GBP, SAR, AED).',
              'Configure the <strong>Fiscal Year Start Date</strong> (e.g., January 1st or April 1st).',
              'Upload company header logos for PDF invoice and delivery note generation.'
            ]
          },
          {
            title: 'Using the One-Click Company Switcher',
            description: 'Authorized managers can switch between legal entities instantly without signing out.',
            instructions: [
              'Click the <strong>Company Switcher</strong> dropdown at the top navigation bar.',
              'Select the target company from the list of authorized entities.',
              'The entire workspace instantly refreshes with the selected company’s inventory, orders, and accounting ledgers.'
            ],
            tip: 'Users with multi-company access can see consolidated overview widgets on the executive dashboard if granted Group Supervisor permissions.'
          }
        ]
      }
    ]
  },
  {
    id: 'sales-invoicing',
    name: 'Sell: Sales & Invoicing',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    items: [
      {
        id: 'quotations-orders',
        title: 'Quotations to Sales Orders',
        readTime: '5 min read',
        summary: 'Step-by-step guide to generating customer quotations, applying pricelists, and converting confirmed quotes into live sales orders.',
        workflow: ['New Quote', 'Add Line Items', 'Send to Customer', 'Confirm Order', 'Reserve Stock'],
        steps: [
          {
            title: 'Create a New Quotation',
            description: 'Generate professional price quotations with tiered pricing, currency conversion, and terms.',
            instructions: [
              'Navigate to <strong>Sales</strong> > <strong>Quotations</strong> and click <strong>New Quotation</strong>.',
              'Select an existing customer from <strong>Contacts</strong> or click <em>+ Quick Add</em> to create a new one.',
              'Set the <strong>Expiration Date</strong>, <strong>Pricelist</strong>, and <strong>Payment Terms</strong> (e.g. Net 30, Due on Receipt).'
            ],
            uiPreview: {
              title: 'New Quotation #QT-2026-0042',
              module: 'Sales',
              fields: [
                { label: 'Customer', value: 'Global Retail Solutions LLC' },
                { label: 'Expiration Date', value: '30 Days from Creation' },
                { label: 'Price List', value: 'Wholesale Tier A (15% Disc)' },
                { label: 'Payment Terms', value: 'Net 30 Days', highlight: true }
              ]
            }
          },
          {
            title: 'Add Products, Variants & Taxes',
            description: 'Add line items with automatic unit price lookup from active pricelists.',
            instructions: [
              'Click <strong>Add Line</strong> under the Order Lines table.',
              'Search and pick the product. If the item has variants (size, color), choose the specific variant.',
              'Enter the quantity. DEKA automatically displays real-time available stock in the primary warehouse.',
              'Taxes are automatically calculated based on the customer’s fiscal position and region.'
            ],
            tip: 'Use Order Templates for recurring bulk orders to populate pre-set line item bundles with a single click.'
          },
          {
            title: 'Confirm Sales Order & Trigger Stock Allocation',
            description: 'When the customer accepts the quote, confirm the order to automatically trigger inventory reservation and create delivery orders.',
            instructions: [
              'Click <strong>Confirm Order</strong> at the top-right.',
              'The quotation status updates to <strong>Sales Order (Confirmed)</strong>.',
              'DEKA ERP immediately creates a linked <strong>Delivery Order (DO)</strong> in the Inventory module and places a stock reservation on the requested items.'
            ],
            note: 'No manual re-entry into inventory is required. The warehouse team will see the pick ticket immediately.'
          }
        ]
      },
      {
        id: 'invoicing-portal',
        title: 'Customer Invoices & Portal Access',
        readTime: '5 min read',
        summary: 'Generate customer invoices, credit notes, and provide secure customer portal access for self-service document retrieval.',
        workflow: ['Create Invoice', 'Validate & Post', 'Send PDF', 'Reconcile Payment'],
        steps: [
          {
            title: 'Generate Customer Invoices from Sales Orders',
            description: 'Create customer invoices based on ordered quantities or delivered quantities according to your invoicing policy.',
            instructions: [
              'Open the confirmed <strong>Sales Order</strong>.',
              'Click <strong>Create Invoice</strong>. Select whether to invoice the entire order or only delivered items.',
              'Review the invoice draft, tax breakdown, and payment terms.',
              'Click <strong>Confirm / Post</strong> to generate the official invoice number and record journal entries in Accounting.'
            ]
          },
          {
            title: 'Download & Email Professional PDFs',
            description: 'DEKA generates clean, branded PDF invoices with your logo, company tax ID, and payment instructions.',
            instructions: [
              'Click <strong>Print PDF</strong> or <strong>Send by Email</strong> on the invoice screen.',
              'The recipient receives the PDF invoice directly along with payment reference details.'
            ]
          },
          {
            title: 'Enable Customer Portal Self-Service',
            description: 'Allow customers to log in securely to track open orders, download previous invoices, and view payment status.',
            instructions: [
              'Open <strong>Contacts</strong> > select the customer record.',
              'Click <strong>Action</strong> > <strong>Grant Portal Access</strong>.',
              'The customer receives an invite link to create their password and access their dedicated portal view.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'purchasing-accounting',
    name: 'Buy: Purchasing & Accounting',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
    items: [
      {
        id: 'rfq-purchase-orders',
        title: 'RFQs, Purchase Orders & Vendor Bills',
        readTime: '6 min read',
        summary: 'Manage procurement from Request for Quotation (RFQ) to Purchase Order, warehouse goods receipt, and 3-way vendor bill matching.',
        workflow: ['Create RFQ', 'Confirm PO', 'Receive Goods', 'Create Vendor Bill', '3-Way Match'],
        steps: [
          {
            title: 'Create a Request for Quotation (RFQ)',
            description: 'Request pricing from suppliers and manage vendor pricelists.',
            instructions: [
              'Go to <strong>Purchasing</strong> > <strong>Requests for Quotation</strong> > <strong>New</strong>.',
              'Select the <strong>Vendor</strong>, <strong>Order Deadline</strong>, and <strong>Destination Warehouse</strong>.',
              'Add line items with target quantities and send the RFQ via PDF or email.'
            ]
          },
          {
            title: 'Convert RFQ to Purchase Order & Receive Items',
            description: 'Confirm the vendor quote to generate an official PO and schedule a warehouse receipt.',
            instructions: [
              'Click <strong>Confirm Order</strong> once the supplier accepts the terms.',
              'The status moves to <strong>Purchase Order</strong>.',
              'Click <strong>Receive Products</strong> when goods arrive at your dock to validate incoming stock quantities.'
            ]
          },
          {
            title: '3-Way Matching & Vendor Bill Creation',
            description: 'Ensure you only pay for what was ordered and verified at the warehouse.',
            instructions: [
              'From the PO screen, click <strong>Create Bill</strong>.',
              'DEKA verifies that the billed quantities match the warehouse goods receipt.',
              'Click <strong>Confirm Bill</strong> to post the liability into Accounts Payable.'
            ]
          }
        ]
      },
      {
        id: 'chart-of-accounts-payments',
        title: 'Accounting, Journals & Bank Reconciliation',
        readTime: '7 min read',
        summary: 'Complete overview of the general ledger, multi-currency journal entries, tax configurations, payment reconciliation, and financial reports.',
        workflow: ['Chart of Accounts', 'Journal Entries', 'Register Payments', 'Reconcile', 'Generate Reports'],
        steps: [
          {
            title: 'Set up the Chart of Accounts & Fiscal Positions',
            description: 'Structure your ledger accounts (Assets, Liabilities, Equity, Revenue, Expenses) per legal company.',
            instructions: [
              'Navigate to <strong>Accounting</strong> > <strong>Configuration</strong> > <strong>Chart of Accounts</strong>.',
              'Customize account codes, types, and default tax rates for sales and purchases.',
              'Configure <strong>Fiscal Positions</strong> to automatically map tax rates for international vs domestic transactions.'
            ],
            uiPreview: {
              title: 'Chart of Accounts Ledger',
              module: 'Accounting',
              topActions: ['+ New Account', 'Export Excel'],
              table: {
                columns: ['Code', 'Account Name', 'Type', 'Balance'],
                rows: [
                  ['101000', 'Operating Bank Account (USD)', 'Bank & Cash', '$142,500.00'],
                  ['120000', 'Accounts Receivable', 'Current Asset', '$48,320.00'],
                  ['201000', 'Accounts Payable', 'Current Liability', '$18,940.00'],
                  ['401000', 'Product Sales Revenue', 'Operating Income', '$312,800.00']
                ]
              }
            }
          },
          {
            title: 'Register Payments & Bank Reconciliation',
            description: 'Match customer and vendor payments against open invoices with real-time balance updates.',
            instructions: [
              'Open an unpaid customer invoice or vendor bill.',
              'Click <strong>Register Payment</strong>, select the <strong>Bank Journal</strong> and <strong>Payment Method</strong>.',
              'Click <strong>Create Payment</strong>. The invoice status instantly transitions to <strong>Paid</strong> and the journal entries are posted.'
            ]
          },
          {
            title: 'Generate Real-Time Financial Statements',
            description: 'Produce audit-ready financial statements for any custom date range without manual spreadsheet formulas.',
            instructions: [
              'Go to <strong>Accounting</strong> > <strong>Reporting</strong>.',
              'Select <strong>Profit and Loss</strong>, <strong>Balance Sheet</strong>, or <strong>Trial Balance</strong>.',
              'Select date filters and export to Excel or PDF for month-end close.'
            ],
            tip: 'Month-end close is derived directly from live transactions, eliminating reconciliation discrepancies between spreadsheets and books.'
          }
        ]
      }
    ]
  },
  {
    id: 'inventory-manufacturing',
    name: 'Make & Move: Inventory & Production',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
    items: [
      {
        id: 'inventory-operations',
        title: 'Warehouses, Transfers & Barcode Scanning',
        readTime: '6 min read',
        summary: 'Manage multi-location warehouses, internal transfers, lot and serial number tracking, and high-speed barcode scanning operations.',
        workflow: ['Setup Locations', 'Receive / Deliver', 'Lot Tracking', 'Scan Barcodes', 'Auto-Replenish'],
        steps: [
          {
            title: 'Configure Warehouses & Internal Locations',
            description: 'Define physical shelves, aisles, bins, and virtual scrap locations for precise inventory tracking.',
            instructions: [
              'Navigate to <strong>Inventory</strong> > <strong>Configuration</strong> > <strong>Warehouses</strong>.',
              'Create warehouses and configure internal location hierarchies (e.g. Main Warehouse / Stock / Rack 01 / Shelf B).',
              'Set up <strong>Putaway Rules</strong> to automatically direct incoming goods to the correct bin location.'
            ]
          },
          {
            title: 'Lot Numbers, Serial Numbers & Packages',
            description: 'Track perishable products with expiry dates or high-value items with unique serial numbers.',
            instructions: [
              'Under <strong>Products</strong>, set the tracking type to <strong>By Unique Serial Number</strong> or <strong>By Lots</strong>.',
              'When validating receipts or deliveries, assign or scan the lot/serial codes.',
              'Perform end-to-end traceability lookups from supplier batch to customer delivery note.'
            ]
          },
          {
            title: 'Barcode Scanning for Warehouse Operations',
            description: 'Accelerate picking, packing, and receiving using handheld barcode scanners.',
            instructions: [
              'Open the <strong>Barcode Operations</strong> module on any mobile or scanner device.',
              'Scan product barcodes to automatically increment line items on pick lists and receipts.',
              'Scan location barcodes to confirm putaway or internal transfer movements.'
            ]
          }
        ]
      },
      {
        id: 'manufacturing-orders',
        title: 'Bills of Materials (BoM) & Manufacturing Orders',
        readTime: '6 min read',
        summary: 'Create multi-level Bills of Materials, manage work centres, check component availability, and schedule manufacturing orders.',
        workflow: ['Create BoM', 'Check Availability', 'Schedule MO', 'Execute Work Orders', 'Produce Finished Good'],
        steps: [
          {
            title: 'Create a Bill of Materials (BoM)',
            description: 'Define the recipe of raw materials, components, and operations required to produce a finished item.',
            instructions: [
              'Go to <strong>Manufacturing</strong> > <strong>Products</strong> > <strong>Bills of Materials</strong>.',
              'Select the finished product and specify component quantities and units of measure.',
              'Add manufacturing routing operations (e.g. Cutting, Assembly, Quality Check) linked to specific <strong>Work Centres</strong>.'
            ],
            uiPreview: {
              title: 'Bill of Materials #BOM-901',
              module: 'Manufacturing',
              fields: [
                { label: 'Finished Product', value: 'Industrial Power Inverter 5kW' },
                { label: 'Quantity to Produce', value: '1.00 Unit' },
                { label: 'BoM Type', value: 'Manufacture this product', highlight: true }
              ],
              table: {
                columns: ['Component', 'Quantity', 'UoM', 'Availability'],
                rows: [
                  ['PCB Control Board v3', '1.00', 'Units', 'Available'],
                  ['Aluminum Heat Sink C4', '2.00', 'Units', 'Available'],
                  ['Copper Inductor Coil', '4.00', 'Units', 'Available']
                ]
              }
            }
          },
          {
            title: 'Verify Component Availability & Schedule Production',
            description: 'DEKA automatically checks raw material stock before you start production.',
            instructions: [
              'Create a new <strong>Manufacturing Order (MO)</strong>.',
              'Click <strong>Check Availability</strong> to verify that all raw components are in stock.',
              'If components are missing, DEKA can automatically trigger purchase orders via reordering rules.',
              'Click <strong>Plan / Start Production</strong> to dispatch work orders to work centres.'
            ]
          },
          {
            title: 'Record Material Consumption & Finalize Production',
            description: 'Consume raw components from inventory and receive the finished goods into the designated stock warehouse.',
            instructions: [
              'As operators complete operations, record actual quantities used and scrap (if any).',
              'Click <strong>Produce All / Done</strong>.',
              'Raw components are deducted from stock and finished goods are added with full manufacturing cost calculations.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'business-operations',
    name: 'Run: Projects, HR & Maintenance',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    items: [
      {
        id: 'projects-timesheets',
        title: 'Project Management & Timesheets',
        readTime: '5 min read',
        summary: 'Track project milestones, Kanban task boards, employee timesheets, and billable hours.',
        workflow: ['Create Project', 'Add Tasks & Milestones', 'Log Timesheets', 'Bill Project'],
        steps: [
          {
            title: 'Set Up Projects & Kanban Task Boards',
            description: 'Organize team deliverables into custom project stages (Backlog, In Progress, Review, Completed).',
            instructions: [
              'Navigate to <strong>Projects</strong> > click <strong>New Project</strong>.',
              'Assign project managers, customer links, and target deadlines.',
              'Add tasks with priority ratings, descriptions, and assignees. Drag-and-drop tasks across the Kanban board as work progresses.'
            ]
          },
          {
            title: 'Log Timesheets Against Tasks',
            description: 'Allow team members to record daily work hours directly against project tasks.',
            instructions: [
              'Open <strong>Timesheets</strong> > click <strong>Log Time</strong>.',
              'Select the Project, Task, date, and hours spent.',
              'Managers can review, approve, and filter timesheets by employee or project.'
            ]
          }
        ]
      },
      {
        id: 'hr-timeoff-recruitment',
        title: 'Employees, Time Off & Recruitment',
        readTime: '5 min read',
        summary: 'Manage employee records, departments, job contracts, leave allocations, time-off approvals, and applicant hiring pipelines.',
        workflow: ['Employee Directory', 'Leave Allocation', 'Time Off Request', 'Recruitment Pipeline'],
        steps: [
          {
            title: 'Employee Directory & Department Records',
            description: 'Maintain centralized employee profiles, job titles, manager hierarchies, and employment contracts.',
            instructions: [
              'Go to <strong>Employees</strong> > <strong>Directory</strong> > click <strong>New Employee</strong>.',
              'Fill in personal details, department, job position, and work schedule.',
              'Attach contract documents and emergency contacts directly to the profile.'
            ]
          },
          {
            title: 'Time Off Requests & Approval Workflows',
            description: 'Configure paid leave, sick leave, and maternal leave with multi-tier managerial approval workflows.',
            instructions: [
              'Employees submit requests via <strong>Time Off</strong> > <strong>New Request</strong>.',
              'Department managers receive automated notifications to approve or reject requests.',
              'Approved days are automatically deducted from the employee’s leave allocation balance.'
            ]
          },
          {
            title: 'Recruitment & Candidate Pipeline',
            description: 'Post job openings, track applicant stages (Applied, Interviewed, Offered), and send offer letters.',
            instructions: [
              'Go to <strong>Recruitment</strong> > create a new <strong>Job Position</strong>.',
              'Track incoming candidates across pipeline stages.',
              'Convert hired applicants directly into employee records with a single click.'
            ]
          }
        ]
      },
      {
        id: 'maintenance-management',
        title: 'Equipment & Maintenance Tracking',
        readTime: '4 min read',
        summary: 'Prevent machine downtime by tracking company equipment, maintenance teams, and preventive service schedules.',
        workflow: ['Register Equipment', 'Create Request', 'Assign Team', 'Log Maintenance'],
        steps: [
          {
            title: 'Register Equipment & Machinery',
            description: 'Catalogue all factory machines, vehicles, and office hardware with serial numbers and warranty dates.',
            instructions: [
              'Go to <strong>Maintenance</strong> > <strong>Equipment</strong> > <strong>New Equipment</strong>.',
              'Specify serial numbers, location, technician team, and maintenance frequency.'
            ]
          },
          {
            title: 'Manage Corrective & Preventive Requests',
            description: 'Schedule routine preventive checkups and log unexpected repair tickets.',
            instructions: [
              'Click <strong>New Maintenance Request</strong> when an issue occurs.',
              'Set priority and assign to the dedicated technician.',
              'Log repair duration and parts used before marking the request as resolved.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'collaboration-developer',
    name: 'Platform, API & Self-Hosting',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17l6-6-6-6"></path><path d="M12 19h8"></path></svg>',
    items: [
      {
        id: 'record-collaboration',
        title: 'Record Discussions, Mentions & Attachments',
        readTime: '4 min read',
        summary: 'Keep conversations attached to the record itself — invoices, purchase orders, customer records, and tasks.',
        workflow: ['Open Record', 'Post Message', '@Mention Colleague', 'Attach Files'],
        steps: [
          {
            title: 'Post Discussions Directly on Orders and Invoices',
            description: 'Stop losing critical context in external email chains. In DEKA ERP, every record has an integrated activity stream.',
            instructions: [
              'Open any invoice, quotation, or project task.',
              'Scroll to the bottom <strong>Activity & Chatter</strong> panel.',
              'Type your comment or internal note. Use <code>@username</code> to tag and notify colleagues immediately.',
              'Drag-and-drop PDF contracts, photos, or spec sheets directly onto the attachment zone.'
            ],
            tip: 'Internal notes are visible only to your team, while customer messages can be synced to the customer portal.'
          }
        ]
      },
      {
        id: 'api-self-hosting',
        title: 'REST API Authentication & Self-Hosting Setup',
        readTime: '6 min read',
        summary: 'Technical guide to using DEKA REST API tokens and deploying on self-hosted infrastructure.',
        workflow: ['Generate API Token', 'Authenticate Requests', 'Import/Export Excel', 'Docker / Composer Deploy'],
        steps: [
          {
            title: 'Generate REST API Tokens',
            description: 'Connect custom applications, third-party reporting tools, or automated scripts via DEKA REST API.',
            instructions: [
              'Navigate to <strong>Settings</strong> > <strong>API & Integrations</strong>.',
              'Click <strong>Generate New API Token</strong>, assign module scopes (e.g. Sales:Read, Inventory:Write).',
              'Copy your Bearer token and include it in request headers: <code>Authorization: Bearer YOUR_TOKEN</code>.'
            ]
          },
          {
            title: 'Bulk Data Migration with Excel Import / Export',
            description: 'Migrate legacy data from spreadsheets seamlessly into DEKA ERP.',
            instructions: [
              'In any list view (Contacts, Products, Chart of Accounts), click <strong>Import / Export</strong>.',
              'Download the provided Excel template, populate your records, and upload it.',
              'DEKA validates field mapping and reports validation warnings before committing the import.'
            ]
          },
          {
            title: 'Self-Hosting & On-Premises Deployment',
            description: 'Deploy DEKA ERP entirely on your own servers for total data residency and compliance.',
            instructions: [
              'Ensure your server runs <strong>PHP 8.2+</strong> with PostgreSQL or MySQL and Redis.',
              'Clone your authorized repository and run <code>composer install --no-dev --optimize-autoloader</code>.',
              'Configure your <code>.env</code> file with database credentials and run <code>php artisan erp:install</code>.',
              'Configure Nginx / Caddy reverse proxy with SSL certificates.'
            ],
            important: 'For managed cloud hosting with automated daily backups and zero server maintenance, use https://cloud.dekaerp.com.'
          }
        ]
      }
    ]
  }
];

export const guideCategories = [
  ...customCategories,
  ...aureusCategories
];
