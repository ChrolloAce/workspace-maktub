import SimpleLayout from './simple-layout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SimpleLayout>{children}</SimpleLayout>
}
