# AI Agency CRM

A comprehensive Customer Relationship Management (CRM) system specifically designed for AI agencies to manage clients, projects, deliveries, and finances.

## Features

- **Dashboard**: Real-time KPIs, charts, and recent activity overview
- **Client Management**: Complete client profiles with contact information, projects, and history
- **Access Vault**: Encrypted credential storage for client accounts (CRM, Google Business, domains, etc.)
- **Website Delivery Tracking**: Monitor website projects, DNS status, and deployment notes
- **Task Management**: Assign and track tasks across team members
- **Invoice Management**: Create, send, and track invoices with Stripe integration
- **File Management**: Upload and organize client assets and documents
- **Ads Setup Tracking**: Monitor ad platform setup and pixel installation progress
- **Finance Tracking**: Revenue, expenses, and profit analytics
- **Role-based Access Control**: Owner, Admin, Manager, Agent, and Client roles

## Tech Stack

- **Framework**: Next.js 14+ with App Router and TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with email magic link and Google OAuth
- **UI**: TailwindCSS + shadcn/ui components
- **Charts**: Recharts for analytics visualization
- **File Uploads**: UploadThing for S3-compatible storage
- **Payments**: Stripe for invoicing and payment processing
- **Email**: Resend for transactional emails
- **Encryption**: AES-256-GCM for credential storage

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-agency-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/ai_agency_crm"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Encryption (generate with: openssl rand -hex 32)
   CREDENTIALS_ENCRYPTION_KEY="your-32-byte-hex-key"
   
   # Email (optional)
   RESEND_API_KEY="your-resend-api-key"
   
   # File Uploads (optional)
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"
   
   # Payments (optional)
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Seed with demo data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Create and run migrations
npm run db:migrate

# Seed database with demo data
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Reset database (WARNING: deletes all data)
npm run db:reset
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/       # Dashboard layout group
│   │   ├── page.tsx       # Main dashboard
│   │   ├── clients/       # Client management
│   │   ├── deals/         # Sales pipeline
│   │   ├── tasks/         # Task management
│   │   ├── invoices/      # Invoice management
│   │   ├── reports/       # Analytics
│   │   └── settings/      # Settings
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components
│   └── charts/            # Chart components
├── lib/                   # Utility functions
│   ├── auth.ts            # Authentication config
│   ├── db.ts              # Database client
│   ├── crypto.ts          # Encryption utilities
│   └── format.ts          # Formatting utilities
└── types/                 # TypeScript type definitions
```

## Key Features

### Dashboard
- Real-time KPIs (Customers, Revenue, Profit, Invoices)
- Sales analytics with line charts
- Invoice statistics with donut charts
- Recent invoices table with status tracking

### Client Management
- Complete client profiles with contact information
- Project and task tracking per client
- File and document management
- Notes and activity history
- Invoice and payment tracking

### Access Vault
- Encrypted storage of client credentials
- Support for CRM, Google Business Profile, domain, hosting, and ad platform access
- Verification status tracking
- Secure password masking and copying

### Website Delivery
- Track website projects by tech stack and status
- DNS checking and monitoring
- Deployment notes and timeline
- Integration with hosting providers

### Security
- Field-level encryption for sensitive data
- Role-based access control (RBAC)
- Audit logging for all actions
- Rate limiting on API endpoints
- Secure password handling with bcrypt

## Environment Setup

### Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js session encryption
- `CREDENTIALS_ENCRYPTION_KEY`: 32-byte hex key for encrypting credentials

### Optional Environment Variables

- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: For Google OAuth
- `RESEND_API_KEY`: For sending emails
- `UPLOADTHING_SECRET` & `UPLOADTHING_APP_ID`: For file uploads
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`: For payments

## Demo Data

The seed script creates:
- 1 organization with 3 users (Owner, Manager, Agent)
- 3 demo clients with complete profiles
- Sample projects, tasks, and invoices
- Encrypted access credentials (if encryption key is set)
- Website and ad account information
- Transaction history for financial analytics

## Development

### Code Style
- Follow the established patterns for file organization
- Keep files under 500 lines (400 line warning)
- Use object-oriented principles with single responsibility
- Implement proper TypeScript typing
- Follow the established naming conventions

### Database Changes
1. Modify `prisma/schema.prisma`
2. Run `npm run db:migrate` to create migration
3. Update seed data if needed
4. Test with `npm run db:reset` and `npm run db:seed`

### Adding New Features
1. Create API routes in `src/app/api/`
2. Add UI components in `src/components/`
3. Create pages in `src/app/(dashboard)/`
4. Update navigation in `src/components/layout/sidebar.tsx`
5. Add appropriate TypeScript types

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Run database migrations
5. Start the application: `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub or contact the development team.