'use client'

import { useState } from 'react'
import { SidebarNew } from '@/components/layout/sidebar-new'
import { Topbar } from '@/components/layout/topbar'
import { Menu } from 'lucide-react'

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [showSidebar, setShowSidebar] = useState(true)
  
  // TODO: Get user from session
  const user = {
    name: 'Ali Husni',
    email: 'ali@example.com',
    image: null,
  }

  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
    position: 'relative',
  }

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginLeft: showSidebar ? '0' : '0',
  }

  const mainStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '24px',
    backgroundColor: '#f8fafc',
  }

  const menuButtonStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 9999,
    backgroundColor: '#0f172a',
    color: '#ffffff',
    border: '1px solid #334155',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: showSidebar ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
    display: showSidebar ? 'block' : 'none',
  }

  return (
    <div style={layoutStyle}>
      {/* Mobile Menu Button */}
      <button
        style={menuButtonStyle}
        onClick={() => setShowSidebar(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar with overlay for mobile */}
      {showSidebar && (
        <>
          <div 
            style={overlayStyle}
            onClick={() => setShowSidebar(false)}
            className="md:hidden"
          />
          <div style={{ position: 'relative', zIndex: 50 }}>
            <SidebarNew user={user} />
          </div>
        </>
      )}

      <div style={contentStyle}>
        <Topbar />
        <main style={mainStyle}>
          {children}
        </main>
      </div>
    </div>
  )
}
