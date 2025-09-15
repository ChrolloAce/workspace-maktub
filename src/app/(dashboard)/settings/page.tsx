import { ConsistentLayout } from '@/components/layout/consistent-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <ConsistentLayout 
      title="Settings" 
      subtitle="Manage your organization and account settings"
    >
      <div className="space-y-6">
        <Card className="shadow-sm border border-border/60 bg-card">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">Settings Coming Soon</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Organization settings, user management, and preferences
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsistentLayout>
  )
}
