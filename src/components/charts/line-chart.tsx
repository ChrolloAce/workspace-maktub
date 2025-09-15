'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface LineChartProps {
  data: Array<{
    name: string
    value: number
    [key: string]: string | number
  }>
  dataKey?: string
  color?: string
  height?: number
}

export function CustomLineChart({ 
  data, 
  dataKey = 'value', 
  color = '#4F46E5',
  height = 300 
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          className="text-xs fill-muted-foreground"
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          className="text-xs fill-muted-foreground"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={3}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
