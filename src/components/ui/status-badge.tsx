import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface StatusBadgeProps {
  status: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
}

const statusStyles: Record<string, string> = {
  // Invoice statuses
  'PAID': 'status-paid',
  'PENDING': 'status-pending',
  'OVERDUE': 'status-overdue',
  'DRAFT': 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
  'VOID': 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
  
  // Client statuses
  'ACTIVE': 'status-active',
  'PAUSED': 'status-pending',
  'PROSPECT': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  
  // Website statuses
  'NOT_STARTED': 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
  'IN_PROGRESS': 'status-pending',
  'QA': 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
  'READY': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  'LIVE': 'status-paid',
  'BLOCKED': 'status-overdue',
  
  // Task statuses
  'TODO': 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
  'DOING': 'status-pending',
  'DONE': 'status-paid',
  
  // Deal stages
  'LEAD': 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
  'QUALIFIED': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  'PROPOSAL': 'status-pending',
  'WON': 'status-paid',
  'LOST': 'status-overdue',
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toUpperCase()
  const statusClass = statusStyles[normalizedStatus] || 'bg-gray-100 text-gray-700'
  
  return (
    <Badge 
      variant="secondary" 
      className={cn(statusClass, 'font-medium', className)}
    >
      {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
    </Badge>
  )
}
