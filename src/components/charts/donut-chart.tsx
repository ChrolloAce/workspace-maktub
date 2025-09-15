'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface DonutChartProps {
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  height?: number
  innerRadius?: number
  outerRadius?: number
}

const DEFAULT_COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export function DonutChart({ 
  data, 
  height = 300,
  innerRadius = 60,
  outerRadius = 100 
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [value, '']}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center total */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">{total.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ 
                backgroundColor: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length] 
              }}
            />
            <span className="text-sm text-muted-foreground">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
