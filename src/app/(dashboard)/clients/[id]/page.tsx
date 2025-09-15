'use client'

import { ConsistentLayout } from '@/components/layout/consistent-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/ui/status-badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  ArrowLeft,
  Upload,
  Plus,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  Calendar,
  Eye,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react'
import { getInitials, formatDate, formatCurrency } from '@/lib/format'
import { getClientWebsiteScreenshot, getMobileWebsiteScreenshot } from '@/lib/screenshot'
import Link from 'next/link'

// Mock client data - will be replaced with API call
const client = {
  id: 'client-1',
  name: 'CBE Air Services',
  email: 'cbeairservices@gmail.com',
  phone: '(305) 560-3087',
  company: 'CBE Air Services',
  website: 'https://ac-company.vercel.app/',
  primaryContact: 'Blendi',
  address: '201 180th Dr, Sunny Isles Beach, FL 33160',
  status: 'Active',
  owner: { 
    name: 'Ali Husni', 
    email: 'ali@example.com',
    image: null
  },
  createdAt: new Date('2024-01-15'),
  logoUrl: null,
  accesses: [
    {
      id: '1',
      type: 'CRM',
      label: 'HubSpot CRM',
      username: 'john@techstart.com',
      verified: true,
      createdAt: new Date('2024-01-16'),
    },
    {
      id: '2',
      type: 'GOOGLE_BUSINESS',
      label: 'Google Business Profile',
      username: 'techstart@gmail.com',
      verified: true,
      createdAt: new Date('2024-01-16'),
    },
    {
      id: '3',
      type: 'DOMAIN',
      label: 'GoDaddy Domain',
      username: 'john@techstart.com',
      verified: false,
      createdAt: new Date('2024-01-16'),
    },
  ],
  websites: [
    {
      id: '1',
      stack: 'Next.js',
      domain: 'techstart.com',
      status: 'IN_PROGRESS',
      dnsOk: true,
      notes: 'Website redesign in progress. New design approved.',
      createdAt: new Date('2024-01-16'),
    }
  ],
  tasks: [
    {
      id: '1',
      title: 'Review website mockups',
      status: 'todo',
      assignee: { name: 'Ali Husni', image: null },
      dueDate: new Date('2024-02-10'),
      createdAt: new Date('2024-01-16'),
    },
    {
      id: '2',
      title: 'Set up Google Analytics',
      status: 'doing',
      assignee: { name: 'Mike Chen', image: null },
      dueDate: new Date('2024-02-05'),
      createdAt: new Date('2024-01-17'),
    },
  ],
  invoices: [
    {
      id: '1',
      number: 'INV-001',
      amount: 500000,
      status: 'PAID',
      issueDate: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
    },
    {
      id: '2',
      number: 'INV-004',
      amount: 1000000,
      status: 'PAID',
      issueDate: new Date('2024-01-25'),
      dueDate: new Date('2024-02-25'),
    },
  ],
  notes: [
    {
      id: '1',
      body: 'Client is very happy with the initial designs. Requested minor changes to the color scheme.',
      createdBy: { name: 'Ali Husni', image: null },
      createdAt: new Date('2024-01-18'),
    }
  ],
  _count: {
    projects: 3,
    tasks: 8,
    invoices: 2,
    files: 12,
  }
}

interface ClientDetailPageProps {
  params: { id: string }
}

export default function ClientDetailPage({ params: _ }: ClientDetailPageProps) {
  return (
    <ConsistentLayout 
      title={client.name} 
      subtitle={`${client.company} • Account managed by ${client.owner.name}`}
    >
      <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/clients">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={client.logoUrl || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <StatusBadge status={client.status} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Client Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Projects</p>
                <p className="text-2xl font-bold">{client._count.projects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Open Tasks</p>
                <p className="text-2xl font-bold">{client._count.tasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Invoices</p>
                <p className="text-2xl font-bold">{client._count.invoices}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Upload className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Files</p>
                <p className="text-2xl font-bold">{client._count.files}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="access">Access</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Client Details */}
            <Card className="shadow-sm border border-border/60 bg-card">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {client.website}
                    </a>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{client.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Client since {formatDate(client.createdAt)}</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-muted-foreground">Account Manager</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={client.owner.image || undefined} />
                      <AvatarFallback className="text-xs">
                        {getInitials(client.owner.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{client.owner.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-sm border border-border/60 bg-card">
              <CardHeader>
                <CardTitle>Recent Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.notes.map((note) => (
                    <div key={note.id} className="border-l-2 border-primary/20 pl-4">
                      <p className="text-sm">{note.body}</p>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                        <span>{note.createdBy.name}</span>
                        <span>•</span>
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks */}
          <Card className="shadow-sm border border-border/60 bg-card">
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>
                        <StatusBadge status={task.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {getInitials(task.assignee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{task.assignee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{task.dueDate ? formatDate(task.dueDate) : '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Tab */}
        <TabsContent value="access" className="space-y-6">
          <Card className="shadow-sm border border-border/60 bg-card">
            <CardHeader>
              <CardTitle>Access Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {client.accesses.map((access) => (
                  <Card key={access.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{access.type.replace('_', ' ')}</Badge>
                            {access.verified ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <h4 className="font-medium">{access.label}</h4>
                          <p className="text-sm text-muted-foreground">
                            Username: {access.username}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Password: ••••••••
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Tab */}
        <TabsContent value="website" className="space-y-6">
          <Card className="shadow-sm border border-border/60 bg-card">
            <CardHeader>
              <CardTitle>Website Information</CardTitle>
            </CardHeader>
            <CardContent>
              {client.websites.map((website) => (
                <div key={website.id} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Tech Stack</label>
                      <p className="text-sm">{website.stack}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Domain</label>
                      <p className="text-sm">{website.domain}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <StatusBadge status={website.status} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">DNS Status</label>
                      <div className="flex items-center space-x-2">
                        {website.dnsOk ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">{website.dnsOk ? 'OK' : 'Issues'}</span>
                      </div>
                    </div>
                  </div>
                  {website.notes && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Notes</label>
                      <p className="text-sm mt-1">{website.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card className="shadow-sm border border-border/60 bg-card">
            <CardHeader>
              <CardTitle>Website Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{client.website}</h4>
                    <p className="text-sm text-muted-foreground">Live website screenshot</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(client.website, '_blank')}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Site
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.reload()}
                    >
                      Refresh Screenshot
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="bg-gray-100 px-4 py-2 border-b">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
                        {client.website}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Desktop Screenshot */}
                      <div>
                        <h5 className="text-sm font-medium mb-2">Desktop View</h5>
                        <img
                          src={getClientWebsiteScreenshot(client.website)}
                          alt={`Desktop screenshot of ${client.website}`}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '400px',
                            objectFit: 'contain',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }}
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MDAgMzUwSDY1MFY0NTBINjAwVjM1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHRleHQgeD0iNjAwIiB5PSI0MDAiIGZpbGw9IiM2Qjc0ODEiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TY3JlZW5zaG90IG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPgo='
                          }}
                        />
                      </div>
                      
                      {/* Mobile Screenshot */}
                      <div>
                        <h5 className="text-sm font-medium mb-2">Mobile View</h5>
                        <div className="flex justify-center">
                          <img
                            src={getMobileWebsiteScreenshot(client.website)}
                            alt={`Mobile screenshot of ${client.website}`}
                            style={{
                              width: '200px',
                              height: 'auto',
                              maxHeight: '400px',
                              objectFit: 'contain',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px'
                            }}
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzc1IiBoZWlnaHQ9IjY2NyIgdmlld0JveD0iMCAwIDM3NSA2NjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNzUiIGhlaWdodD0iNjY3IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE4Ny41IiB5PSIzMzMiIGZpbGw9IiM2Qjc0ODEiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Nb2JpbGUgc2NyZWVuc2hvdCBub3QgYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90">
                        Live Preview
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Screenshot automatically updated using ScreenshotOne API. Last updated: {new Date().toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would be implemented similarly */}
        <TabsContent value="files">
          <Card className="shadow-sm border border-border/60 bg-card">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Files management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card className="shadow-sm border border-border/60 bg-card">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.number}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <StatusBadge status={invoice.status} />
                      </TableCell>
                      <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance">
          <Card className="shadow-sm border border-border/60 bg-card">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Finance management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </ConsistentLayout>
  )
}
