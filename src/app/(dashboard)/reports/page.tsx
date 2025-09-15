import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-1">
          Analytics and insights for your agency
        </p>
      </div>

      <Card className="shadow-sm border border-border/60 bg-card">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">Reports & Analytics Coming Soon</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Comprehensive reporting and business intelligence
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
