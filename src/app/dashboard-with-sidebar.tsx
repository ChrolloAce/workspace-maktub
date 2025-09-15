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
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Filter
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

export default function DashboardWithSidebar() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? '256px' : '64px',
          backgroundColor: '#1e293b',
          borderRight: '1px solid #334155',
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
            borderBottom: '1px solid #334155',
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
                    e.currentTarget.style.backgroundColor = '#334155'
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
            borderTop: '1px solid #334155',
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
              backgroundColor: '#334155',
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
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
              Welcome Back, Ali Husni 👋
            </h1>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Here&apos;s what&apos;s happening with your agency today
            </p>
          </div>
        </header>

        {/* Dashboard Content */}
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
            backgroundColor: '#f8fafc',
          }}
        >
          {/* KPI Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px', 
            marginBottom: '24px' 
          }}>
            {/* Customers KPI */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '500', margin: '0 0 8px 0' }}>
                    Customers
                  </p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>
                    1,456
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} style={{ color: '#10b981' }} />
                    <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '500' }}>+6.5%</span>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>Since last week</span>
                  </div>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.1
                }}>
                  <Users size={24} style={{ color: '#3b82f6' }} />
                </div>
              </div>
            </div>

            {/* Revenue KPI */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '500', margin: '0 0 8px 0' }}>
                    Revenue
                  </p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>
                    $3,345
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} style={{ color: '#ef4444' }} />
                    <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: '500' }}>-0.1%</span>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>Since last week</span>
                  </div>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#10b981',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.1
                }}>
                  <DollarSign size={24} style={{ color: '#10b981' }} />
                </div>
              </div>
            </div>

            {/* Profit KPI */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '500', margin: '0 0 8px 0' }}>
                    Profit
                  </p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>
                    60%
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} style={{ color: '#ef4444' }} />
                    <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: '500' }}>-0.2%</span>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>Since last week</span>
                  </div>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#f59e0b',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.1
                }}>
                  <TrendingUp size={24} style={{ color: '#f59e0b' }} />
                </div>
              </div>
            </div>

            {/* Invoices KPI */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '500', margin: '0 0 8px 0' }}>
                    Invoices
                  </p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>
                    1,135
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} style={{ color: '#10b981' }} />
                    <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '500' }}>+11.5%</span>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>Since last week</span>
                  </div>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.1
                }}>
                  <FileText size={24} style={{ color: '#8b5cf6' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Tables */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Invoice Statistics */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  Invoice Statistics
                </h3>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '6px'
                }}>
                  <MoreHorizontal size={20} style={{ color: '#64748b' }} />
                </button>
              </div>
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                  1,093
                </div>
                <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Total</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span>Total Paid: 234</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#4f46e5', borderRadius: '50%' }}></div>
                    <span>Total Overdue: 514</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></div>
                    <span>Total Unpaid: 345</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Analytics */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  Sales Analytics
                </h3>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '6px'
                }}>
                  <MoreHorizontal size={20} style={{ color: '#64748b' }} />
                </button>
              </div>
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                📈 Sales Chart Coming Soon
              </div>
            </div>
          </div>

          {/* Recent Invoices */}
          <div style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                Recent Invoices
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ 
                  background: 'none', 
                  border: '1px solid #e2e8f0', 
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Filter size={16} />
                  Filter
                </button>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '6px'
                }}>
                  <MoreHorizontal size={20} style={{ color: '#64748b' }} />
                </button>
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#64748b' }}>No</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Id Customers</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Customers name</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Items Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Order Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>1</td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>#065499</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '32px', 
                          height: '32px', 
                          backgroundColor: '#3b82f6', 
                          color: '#ffffff',
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>EY</div>
                        <span>Eren Yaeger</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>1x Black Backpack</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>21/07/2022, 08:21</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <span style={{ 
                        backgroundColor: '#dcfce7', 
                        color: '#166534', 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Paid</span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>$101.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>2</td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>#065499</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '32px', 
                          height: '32px', 
                          backgroundColor: '#3b82f6', 
                          color: '#ffffff',
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>LA</div>
                        <span>Levi Ackerman</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>1x Distro Backpack</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>21/07/2022, 08:21</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <span style={{ 
                        backgroundColor: '#fef3c7', 
                        color: '#92400e', 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Pending</span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>$144.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
