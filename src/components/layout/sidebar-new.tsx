'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
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

export function SidebarNew({ user }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? '64px' : '256px',
    height: '100vh',
    backgroundColor: '#0f172a',
    borderRight: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
  }

  const headerStyle: React.CSSProperties = {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    borderBottom: '1px solid #334155',
  }

  const navStyle: React.CSSProperties = {
    flex: 1,
    padding: '12px',
    overflowY: 'auto',
  }

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    marginBottom: '4px',
    borderRadius: '8px',
    backgroundColor: isActive ? '#2563eb' : 'transparent',
    color: isActive ? '#ffffff' : '#cbd5e1',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    cursor: 'pointer',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
  })

  const linkHoverStyle: React.CSSProperties = {
    backgroundColor: '#1e293b',
  }

  const buttonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  }

  const userSectionStyle: React.CSSProperties = {
    padding: '12px',
    borderTop: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
  }

  const avatarStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#334155',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600',
    flexShrink: 0,
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div style={sidebarStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Building2 size={32} color="#3b82f6" />
          {!isCollapsed && (
            <div>
              <h1 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', margin: 0 }}>
                DESKBOARD
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
                Sales Management
              </p>
            </div>
          )}
        </div>
        <button
          style={buttonStyle}
          onClick={() => setIsCollapsed(!isCollapsed)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e293b'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav style={navStyle}>
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              style={linkStyle(isActive)}
              title={isCollapsed ? item.name : undefined}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#1e293b'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <Icon size={20} style={{ flexShrink: 0 }} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      {user && (
        <div style={userSectionStyle}>
          <div style={avatarStyle}>
            {user.image ? (
              <img 
                src={user.image} 
                alt={user.name || 'User'} 
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
            ) : (
              getInitials(user.name || user.email || 'User')
            )}
          </div>
          {!isCollapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ 
                  color: '#ffffff', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {user.name || 'User'}
                </p>
                <p style={{ 
                  color: '#94a3b8', 
                  fontSize: '12px',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {user.email}
                </p>
              </div>
              <button
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e293b'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
