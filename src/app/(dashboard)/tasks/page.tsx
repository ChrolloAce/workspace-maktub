import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Tasks</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage your team&apos;s tasks and deliverables
        </p>
      </div>

      <Card className="shadow-sm border border-border/60 bg-card">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">Task Management Coming Soon</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Comprehensive task tracking and assignment system
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
