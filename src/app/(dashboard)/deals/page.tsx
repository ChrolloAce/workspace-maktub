import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Deals</h1>
        <p className="text-muted-foreground mt-1">
          Manage your sales pipeline and opportunities
        </p>
      </div>

      <Card className="shadow-sm border border-border/60 bg-card">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">Deals Pipeline Coming Soon</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Kanban board for managing your sales opportunities
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
