import { UnifiedLayout } from '@/components/layout/unified-layout'
import { Card, CardContent } from '@/components/ui/card'

export default function DealsPage() {
  return (
    <UnifiedLayout 
      pageTitle="Deals"
      pageSubtitle="Manage your sales pipeline and opportunities"
    >
      <Card style={{ 
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e5e5',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
      }}>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">Deals Pipeline Coming Soon</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Kanban board for managing your sales opportunities
            </p>
          </div>
        </CardContent>
      </Card>
    </UnifiedLayout>
  )
}
