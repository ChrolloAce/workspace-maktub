import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Invoices</h1>
        <p className="text-muted-foreground mt-1">
          Create, send, and track your invoices
        </p>
      </div>

      <Card className="shadow-sm border border-border/60 bg-card">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">Invoice Management Coming Soon</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Full invoicing system with Stripe integration
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
