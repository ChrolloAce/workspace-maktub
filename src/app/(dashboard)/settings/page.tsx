import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your organization and account settings
        </p>
      </div>

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
  )
}
