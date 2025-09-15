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
  Menu,
  X,
  Building2,
  LogOut,
} from 'lucide-react'

interface UnifiedLayoutProps {
  children: React.ReactNode
  pageTitle?: string
  pageSubtitle?: string
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

export function UnifiedLayout({ children, pageTitle, pageSubtitle }: UnifiedLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sidebarStyle: React.CSSProperties = {
    width: sidebarOpen ? '256px' : '64px',
    backgroundColor: '#000000',
    borderRight: '1px solid #1a1a1a',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    height: '100vh',
    zIndex: 50,
  }

  const headerStyle: React.CSSProperties = {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    borderBottom: '1px solid #1a1a1a',
  }

  const navStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px',
    overflowY: 'auto',
  }

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    marginBottom: '2px',
    borderRadius: '6px',
    backgroundColor: isActive ? '#2563eb' : 'transparent',
    color: isActive ? '#ffffff' : '#a1a1aa',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    justifyContent: sidebarOpen ? 'flex-start' : 'center',
    border: isActive ? '1px solid #3b82f6' : '1px solid transparent',
  })

  const buttonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#a1a1aa',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  }

  const userSectionStyle: React.CSSProperties = {
    padding: '12px',
    borderTop: '1px solid #1a1a1a',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    justifyContent: sidebarOpen ? 'flex-start' : 'center',
  }

  const avatarStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600',
    flexShrink: 0,
    border: '1px solid #2a2a2a',
  }

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  }

  const topbarStyle: React.CSSProperties = {
    height: '64px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  }

  const mainStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '24px',
    backgroundColor: '#fafafa',
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
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fafafa' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Building2 size={28} style={{ color: '#2563eb', flexShrink: 0 }} />
            {sidebarOpen && (
              <div>
                <h1 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '700', margin: 0, letterSpacing: '-0.025em' }}>
                  DESKBOARD
                </h1>
                <p style={{ color: '#71717a', fontSize: '11px', margin: 0, fontWeight: '500' }}>
                  Sales Management Dashboard
                </p>
              </div>
            )}
          </div>
          <button
            style={buttonStyle}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#a1a1aa'
            }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
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
                title={sidebarOpen ? undefined : item.name}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#1a1a1a'
                    e.currentTarget.style.color = '#ffffff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#a1a1aa'
                  }
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {sidebarOpen && <span style={{ fontWeight: '500' }}>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div style={userSectionStyle}>
          <div style={avatarStyle}>
            AH
          </div>
          {sidebarOpen && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ 
                  color: '#ffffff', 
                  fontSize: '13px', 
                  fontWeight: '600',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  Ali Husni
                </p>
                <p style={{ 
                  color: '#71717a', 
                  fontSize: '11px',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  ali@example.com
                </p>
              </div>
              <button
                style={{
                  ...buttonStyle,
                  padding: '6px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a1a1a'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#a1a1aa'
                }}
              >
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        {/* Top Bar */}
        <header style={topbarStyle}>
          <div style={{ flex: 1 }}>
            {pageTitle && (
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#0a0a0a', 
                margin: 0,
                letterSpacing: '-0.025em'
              }}>
                {pageTitle}
              </h1>
            )}
            {pageSubtitle && (
              <p style={{ 
                color: '#525252', 
                fontSize: '14px', 
                margin: '2px 0 0 0',
                fontWeight: '400'
              }}>
                {pageSubtitle}
              </p>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main style={mainStyle}>
          {children}
        </main>
      </div>
    </div>
  )
}
