import { KPICard } from '@/components/ui/kpi-card'
import { CustomLineChart } from '@/components/charts/line-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/format'
import { Users, DollarSign, FileText, TrendingUp, MoreHorizontal, Filter } from 'lucide-react'

// Mock data - will be replaced with real data from API
const kpiData = {
  customers: { value: 1456, change: { value: 6.5, label: 'Since last week', positive: true } },
  revenue: { value: '$3,345', change: { value: -0.10, label: 'Since last week', positive: false } },
  profit: { value: '60%', change: { value: -0.2, label: 'Since last week', positive: false } },
  invoices: { value: 1135, change: { value: 11.5, label: 'Since last week', positive: true } },
}

const salesData = [
  { name: 'Jan', value: 1000 },
  { name: 'Feb', value: 1200 },
  { name: 'Mar', value: 900 },
  { name: 'Apr', value: 1400 },
  { name: 'May', value: 1300 },
  { name: 'Jun', value: 1600 },
  { name: 'Jul', value: 1800 },
  { name: 'Aug', value: 1700 },
  { name: 'Sep', value: 1900 },
  { name: 'Oct', value: 2100 },
  { name: 'Nov', value: 1950 },
  { name: 'Dec', value: 2200 },
]

const invoiceStats = [
  { name: 'Total Paid', value: 234, color: '#10B981' },
  { name: 'Total Overdue', value: 514, color: '#4F46E5' },
  { name: 'Total Unpaid', value: 345, color: '#F59E0B' },
]

const recentInvoices = [
  {
    id: '#065499',
    customer: 'Eren Yaeger',
    customerAvatar: 'EY',
    item: '1x Black Backpack',
    date: '21/07/2022, 08:21',
    status: 'PAID',
    price: 101,
  },
  {
    id: '#065499',
    customer: 'Levi Ackerman',
    customerAvatar: 'LA',
    item: '1x Distro Backpack',
    date: '21/07/2022, 08:21',
    status: 'PENDING',
    price: 144,
  },
  {
    id: '#065499',
    customer: 'Rainer Brown',
    customerAvatar: 'RB',
    item: '1x New Backpack',
    date: '21/07/2022, 08:21',
    status: 'PAID',
    price: 121,
  },
  {
    id: '#065499',
    customer: 'Historia Reiss',
    customerAvatar: 'HR',
    item: '2x Black Backpack',
    date: '21/07/2022, 08:21',
    status: 'OVERDUE',
    price: 300,
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">{/* Header is now in layout */}

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <KPICard
          title="Customers"
          value={kpiData.customers.value.toLocaleString()}
          change={kpiData.customers.change}
          icon={<Users className="h-6 w-6" />}
        />
        <KPICard
          title="Revenue"
          value={kpiData.revenue.value}
          change={kpiData.revenue.change}
          icon={<DollarSign className="h-6 w-6" />}
        />
        <KPICard
          title="Profit"
          value={kpiData.profit.value}
          change={kpiData.profit.change}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <KPICard
          title="Invoices"
          value={kpiData.invoices.value.toLocaleString()}
          change={kpiData.invoices.change}
          icon={<FileText className="h-6 w-6" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Statistics */}
        <Card className="shadow-sm border border-border/60 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Invoice Statistics</CardTitle>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <DonutChart data={invoiceStats} height={280} />
          </CardContent>
        </Card>

        {/* Sales Analytics */}
        <Card className="shadow-sm border border-border/60 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Sales Analytics</CardTitle>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <CustomLineChart data={salesData} height={280} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices Table */}
      <Card className="shadow-sm border border-border/60 bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Invoices</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Id Customers</TableHead>
                <TableHead>Customers name</TableHead>
                <TableHead>Items Name</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((invoice, index) => (
                <TableRow key={`${invoice.id}-${index}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                        {invoice.customerAvatar}
                      </div>
                      <span>{invoice.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded bg-muted flex items-center justify-center">
                        <div className="h-3 w-3 rounded bg-foreground"></div>
                      </div>
                      <span>{invoice.item}</span>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(invoice.price * 100)}
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
