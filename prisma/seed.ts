import { PrismaClient, Role, InvoiceStatus, DealStage, WebsiteStatus, AccessType } from '@prisma/client'
import { encrypt } from '../src/lib/crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create organization
  const organization = await prisma.organization.upsert({
    where: { id: 'org-1' },
    update: {},
    create: {
      id: 'org-1',
      name: 'AI Agency Pro',
      settings: {
        timezone: 'UTC',
        currency: 'USD',
      },
    },
  })

  // Create users
  const owner = await prisma.user.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: {
      id: 'user-1',
      name: 'Ali Husni',
      email: 'owner@example.com',
      role: Role.OWNER,
      organizationId: organization.id,
    },
  })

  const manager = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      id: 'user-2',
      name: 'Sarah Johnson',
      email: 'manager@example.com',
      role: Role.MANAGER,
      organizationId: organization.id,
    },
  })

  const agent = await prisma.user.upsert({
    where: { email: 'agent@example.com' },
    update: {},
    create: {
      id: 'user-3',
      name: 'Mike Chen',
      email: 'agent@example.com',
      role: Role.AGENT,
      organizationId: organization.id,
    },
  })

  // Create clients
  const clients = await Promise.all([
    prisma.client.upsert({
      where: { id: 'client-1' },
      update: {},
      create: {
        id: 'client-1',
        name: 'CBE Air Services',
        email: 'cbeairservices@gmail.com',
        phone: '(305) 560-3087',
        company: 'CBE Air Services',
        website: 'https://ac-company.vercel.app/',
        primaryContact: 'Blendi',
        address: '201 180th Dr, Sunny Isles Beach, FL 33160',
        status: 'Active',
        organizationId: organization.id,
        ownerId: owner.id,
      },
    }),
    prisma.client.upsert({
      where: { id: 'client-2' },
      update: {},
      create: {
        id: 'client-2',
        name: 'All In Plumbing Solutions',
        email: 'info@allinplumbingsolutions.com',
        phone: '(561) 571-2995',
        company: 'All In Plumbing Solutions',
        website: 'https://www.allinplumbingsolutions.com/',
        primaryContact: 'Customer Service',
        address: 'North Palm Beach, FL',
        status: 'Active',
        organizationId: organization.id,
        ownerId: manager.id,
      },
    }),
    prisma.client.upsert({
      where: { id: 'client-3' },
      update: {},
      create: {
        id: 'client-3',
        name: 'Innovation Labs',
        email: 'team@innovationlabs.io',
        phone: '+1 (555) 456-7890',
        company: 'Innovation Labs',
        website: 'https://innovationlabs.io',
        primaryContact: 'David Lee',
        address: '789 Innovation Blvd, Seattle, WA 98101',
        status: 'Prospect',
        organizationId: organization.id,
        ownerId: agent.id,
      },
    }),
  ])

  // Create projects
  await Promise.all([
    prisma.project.create({
      data: {
        name: 'Website Redesign',
        type: 'Website',
        status: 'In Progress',
        clientId: clients[0].id,
        dueDate: new Date('2024-02-15'),
      },
    }),
    prisma.project.create({
      data: {
        name: 'SEO Optimization',
        type: 'SEO',
        status: 'Not Started',
        clientId: clients[0].id,
        dueDate: new Date('2024-03-01'),
      },
    }),
    prisma.project.create({
      data: {
        name: 'Google Ads Setup',
        type: 'Ads',
        status: 'Done',
        clientId: clients[1].id,
      },
    }),
  ])

  // Create accesses (with encrypted secrets)
  try {
    await Promise.all([
      prisma.access.create({
        data: {
          type: AccessType.CRM,
          label: 'HubSpot CRM',
          username: 'john@techstart.com',
          secretEnc: encrypt('hubspot_password_123'),
          verified: true,
          clientId: clients[0].id,
        },
      }),
      prisma.access.create({
        data: {
          type: AccessType.GOOGLE_BUSINESS,
          label: 'Google Business Profile',
          username: 'techstart@gmail.com',
          secretEnc: encrypt('google_password_456'),
          verified: true,
          clientId: clients[0].id,
        },
      }),
      prisma.access.create({
        data: {
          type: AccessType.DOMAIN,
          label: 'GoDaddy Domain',
          username: 'john@techstart.com',
          secretEnc: encrypt('domain_password_789'),
          verified: false,
          clientId: clients[1].id,
        },
      }),
    ])
  } catch (error) {
    console.warn('Could not create encrypted access records (missing encryption key):', error)
  }

  // Create websites
  await Promise.all([
    prisma.website.create({
      data: {
        stack: 'Next.js',
        domain: 'ac-company.vercel.app',
        status: WebsiteStatus.LIVE,
        dnsOk: true,
        notes: 'Professional HVAC website with lead generation forms and service booking.',
        clientId: clients[0].id,
      },
    }),
    prisma.website.create({
      data: {
        stack: 'WordPress',
        domain: 'allinplumbingsolutions.com',
        status: WebsiteStatus.LIVE,
        dnsOk: true,
        notes: 'Plumbing services website with emergency contact and service areas.',
        clientId: clients[1].id,
      },
    }),
  ])

  // Create deals
  await Promise.all([
    prisma.deal.create({
      data: {
        name: 'Website + SEO Package',
        value: 1500000, // $15,000 in cents
        stage: DealStage.PROPOSAL,
        clientId: clients[0].id,
      },
    }),
    prisma.deal.create({
      data: {
        name: 'Google Ads Management',
        value: 500000, // $5,000 in cents
        stage: DealStage.WON,
        clientId: clients[1].id,
      },
    }),
    prisma.deal.create({
      data: {
        name: 'Full Digital Marketing',
        value: 2500000, // $25,000 in cents
        stage: DealStage.QUALIFIED,
        clientId: clients[2].id,
      },
    }),
  ])

  // Create invoices
  await Promise.all([
    prisma.invoice.create({
      data: {
        number: 'INV-001',
        amount: 500000, // $5,000 in cents
        status: InvoiceStatus.PAID,
        issueDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        clientId: clients[0].id,
      },
    }),
    prisma.invoice.create({
      data: {
        number: 'INV-002',
        amount: 750000, // $7,500 in cents
        status: InvoiceStatus.SENT,
        issueDate: new Date('2024-01-20'),
        dueDate: new Date('2024-02-20'),
        clientId: clients[1].id,
      },
    }),
    prisma.invoice.create({
      data: {
        number: 'INV-003',
        amount: 300000, // $3,000 in cents
        status: InvoiceStatus.OVERDUE,
        issueDate: new Date('2024-01-01'),
        dueDate: new Date('2024-01-31'),
        clientId: clients[2].id,
      },
    }),
    prisma.invoice.create({
      data: {
        number: 'INV-004',
        amount: 1000000, // $10,000 in cents
        status: InvoiceStatus.PAID,
        issueDate: new Date('2024-01-25'),
        dueDate: new Date('2024-02-25'),
        clientId: clients[0].id,
      },
    }),
  ])

  // Create transactions
  const transactions = []
  const categories = ['revenue', 'software', 'ads', 'payroll', 'office']
  const sources = ['Stripe', 'manual', 'bank import']

  // Generate transactions for the last 12 months
  for (let i = 0; i < 50; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 12))
    
    const isRevenue = Math.random() > 0.3
    const amount = isRevenue 
      ? Math.floor(Math.random() * 1000000) + 100000 // $1,000 - $10,000
      : -(Math.floor(Math.random() * 50000) + 10000) // -$100 - -$500
    
    transactions.push({
      amount,
      category: isRevenue ? 'revenue' : categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
      source: sources[Math.floor(Math.random() * sources.length)],
      occurredAt: date,
      clientId: clients[Math.floor(Math.random() * clients.length)].id,
    })
  }

  await prisma.transaction.createMany({
    data: transactions,
  })

  // Create tasks
  await Promise.all([
    prisma.task.create({
      data: {
        title: 'Review website mockups',
        status: 'todo',
        assigneeId: owner.id,
        dueDate: new Date('2024-02-10'),
        clientId: clients[0].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Set up Google Analytics',
        status: 'doing',
        assigneeId: agent.id,
        dueDate: new Date('2024-02-05'),
        clientId: clients[0].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Launch ad campaigns',
        status: 'done',
        assigneeId: manager.id,
        clientId: clients[1].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Collect brand assets',
        status: 'blocked',
        assigneeId: agent.id,
        dueDate: new Date('2024-02-08'),
        clientId: clients[2].id,
      },
    }),
  ])

  // Create notes
  await Promise.all([
    prisma.note.create({
      data: {
        body: 'Client is very happy with the initial designs. Requested minor changes to the color scheme.',
        createdById: owner.id,
        clientId: clients[0].id,
      },
    }),
    prisma.note.create({
      data: {
        body: 'Payment received. Ready to proceed with the next phase of the project.',
        createdById: manager.id,
        clientId: clients[1].id,
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`Created:`)
  console.log(`- 1 organization`)
  console.log(`- 3 users`)
  console.log(`- 3 clients`)
  console.log(`- 3 projects`)
  console.log(`- 3 access records`)
  console.log(`- 2 websites`)
  console.log(`- 3 deals`)
  console.log(`- 4 invoices`)
  console.log(`- 50 transactions`)
  console.log(`- 4 tasks`)
  console.log(`- 2 notes`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
