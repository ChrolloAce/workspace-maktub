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
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Deals', href: '/deals', icon: FolderKanban },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface ConsistentLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function ConsistentLayout({ children, title, subtitle }: ConsistentLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? '256px' : '64px',
          backgroundColor: '#000000',
          borderRight: '1px solid #1f2937',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            borderBottom: '1px solid #1f2937',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Building2 size={32} style={{ color: '#3b82f6', flexShrink: 0 }} />
            {sidebarOpen && (
              <div>
                <h1 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                  DESKBOARD
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
                  Sales Management
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px',
            }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px' }}>
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: sidebarOpen ? '12px' : '0',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  padding: '12px',
                  marginBottom: '4px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#2563eb' : 'transparent',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#1f2937'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div
          style={{
            padding: '12px',
            borderTop: '1px solid #1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: sidebarOpen ? '12px' : '0',
            justifyContent: sidebarOpen ? 'flex-start' : 'center',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#1f2937',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            AH
          </div>
          {sidebarOpen && (
            <div style={{ flex: 1 }}>
              <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500', margin: 0 }}>
                Ali Husni
              </p>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
                ali@example.com
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Bar */}
        <header
          style={{
            height: '64px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
          }}
        >
          <div style={{ flex: 1 }}>
            {title && (
              <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                {title}
              </h1>
            )}
            {subtitle && (
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                {subtitle}
              </p>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
            backgroundColor: '#f8fafc',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
