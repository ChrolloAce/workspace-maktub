import { ConsistentLayout } from '@/components/layout/consistent-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function InvoicesPage() {
  return (
    <ConsistentLayout 
      title="Invoices" 
      subtitle="Create, send, and track your invoices"
    >
      <div className="space-y-6">
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
    </ConsistentLayout>
  )
}
