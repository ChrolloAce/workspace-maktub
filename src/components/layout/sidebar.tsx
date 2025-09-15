'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/format'

interface SidebarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Deals', href: '/deals', icon: FolderKanban },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div 
      className={cn(
        "flex h-full flex-col transition-all duration-300 fixed left-0 top-0 z-50 md:relative md:z-auto",
        isCollapsed ? "w-16" : "w-64"
      )}
      style={{
        backgroundColor: '#0f172a',
        borderRight: '1px solid #334155',
        height: '100vh'
      }}
    >
      {/* Header with toggle */}
      <div 
        className="flex h-16 items-center justify-between px-4"
        style={{ borderBottom: '1px solid #334155' }}
      >
        <div className={cn("flex items-center space-x-3", isCollapsed && "justify-center")}>
          <Building2 className="h-8 w-8 flex-shrink-0" style={{ color: '#3b82f6' }} />
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold" style={{ color: '#ffffff' }}>DESKBOARD</h1>
              <p className="text-xs" style={{ color: '#94a3b8' }}>Sales Management</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-opacity-20"
          style={{ color: '#94a3b8' }}
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isCollapsed && "justify-center"
              )}
              style={{
                backgroundColor: isActive ? '#2563eb' : 'transparent',
                color: isActive ? '#ffffff' : '#cbd5e1'
              }}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      {user && (
        <div className="p-3" style={{ borderTop: '1px solid #334155' }}>
          <div className={cn(
            "flex items-center space-x-3",
            isCollapsed && "justify-center"
          )}>
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback style={{ backgroundColor: '#334155', color: '#ffffff' }}>
                {getInitials(user.name || user.email || 'User')}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: '#ffffff' }}>
                  {user.name || 'User'}
                </p>
                <p className="text-xs truncate" style={{ color: '#94a3b8' }}>
                  {user.email}
                </p>
              </div>
            )}
            {!isCollapsed && (
              <Button variant="ghost" size="sm" style={{ color: '#94a3b8' }}>
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
