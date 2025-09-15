import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
    positive?: boolean
  }
  icon?: React.ReactNode
  className?: string
}

export function KPICard({ title, value, change, icon, className }: KPICardProps) {
  const isPositive = change?.positive ?? (change && change.value >= 0)
  
  return (
    <Card className={cn('metric-card', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center space-x-2">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={cn(
                  'text-sm font-medium',
                  isPositive ? 'text-emerald-600' : 'text-red-600'
                )}>
                  {isPositive ? '+' : ''}{change.value}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {change.label}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
