'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Building2,
  Phone,
  Mail,
  Globe,
  Calendar,
  FolderKanban,
  CheckSquare,
  FileText
} from 'lucide-react'
import { getInitials, formatDate } from '@/lib/format'

// Mock data - will be replaced with real API call
const clients = [
  {
    id: 'client-1',
    name: 'TechStart Inc',
    email: 'contact@techstart.com',
    phone: '+1 (555) 123-4567',
    company: 'TechStart Inc',
    website: 'https://techstart.com',
    status: 'Active',
    owner: { name: 'Ali Husni', email: 'ali@example.com' },
    createdAt: new Date('2024-01-15'),
    _count: {
      projects: 3,
      tasks: 8,
      invoices: 2,
    },
    logoUrl: null,
  },
  {
    id: 'client-2',
    name: 'Digital Solutions Co',
    email: 'hello@digitalsolutions.co',
    phone: '+1 (555) 987-6543',
    company: 'Digital Solutions Co',
    website: 'https://digitalsolutions.co',
    status: 'Active',
    owner: { name: 'Sarah Johnson', email: 'sarah@example.com' },
    createdAt: new Date('2024-01-20'),
    _count: {
      projects: 1,
      tasks: 3,
      invoices: 1,
    },
    logoUrl: null,
  },
  {
    id: 'client-3',
    name: 'Innovation Labs',
    email: 'team@innovationlabs.io',
    phone: '+1 (555) 456-7890',
    company: 'Innovation Labs',
    website: 'https://innovationlabs.io',
    status: 'Prospect',
    owner: { name: 'Mike Chen', email: 'mike@example.com' },
    createdAt: new Date('2024-01-25'),
    _count: {
      projects: 0,
      tasks: 2,
      invoices: 1,
    },
    logoUrl: null,
  },
]

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your client relationships and projects
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Client
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Clients</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FolderKanban className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Active Projects</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Open Tasks</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Pending Invoices</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="shadow-sm border border-border/60 bg-card">
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Tasks</TableHead>
                <TableHead>Invoices</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Link href={`/clients/${client.id}`} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={client.logoUrl || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(client.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.company}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{client.phone}</span>
                      </div>
                      {client.website && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Globe className="h-3 w-3 text-muted-foreground" />
                          <a 
                            href={client.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {getInitials(client.owner.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{client.owner.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={client.status} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{client._count.projects}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{client._count.tasks}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{client._count.invoices}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(client.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
