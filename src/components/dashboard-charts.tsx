'use client';

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const courseStatusData = [
  { name: 'Completed', value: 12, fill: 'var(--color-completed)' },
  { name: 'Ongoing', value: 5, fill: 'var(--color-ongoing)' },
];

const popularCoursesData = [
  { name: 'AI', students: 210, fill: 'var(--color-ai)' },
  { name: 'Data Science', students: 180, fill: 'var(--color-data)' },
  { name: 'Web Dev', students: 250, fill: 'var(--color-web)' },
  { name: 'Cybersecurity', students: 150, fill: 'var(--color-cyber)' },
  { name: 'Cloud', students: 190, fill: 'var(--color-cloud)' },
];

const courseStatusChartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  ongoing: {
    label: "Ongoing",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const popularCoursesChartConfig = {
    students: {
      label: "Students",
    },
    ai: {
        label: "AI",
        color: "hsl(var(--chart-1))",
    },
    data: {
        label: "Data Science",
        color: "hsl(var(--chart-2))",
    },
    web: {
        label: "Web Dev",
        color: "hsl(var(--chart-3))",
    },
    cyber: {
        label: "Cybersecurity",
        color: "hsl(var(--chart-4))",
    },
    cloud: {
        label: "Cloud",
        color: "hsl(var(--chart-5))",
    }
} satisfies ChartConfig;


export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Course Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={courseStatusChartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltipContent
                hideLabel
                nameKey="name"
              />
              <Pie data={courseStatusData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5} >
                 {courseStatusData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend content={({ payload }) => {
                return (
                  <ul className="flex gap-4 justify-center mt-4">
                    {payload?.map((entry) => (
                      <li key={`item-${entry.value}`} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}} />
                        {entry.value}
                      </li>
                    ))}
                  </ul>
                )
              }} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Popular Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={popularCoursesChartConfig} className="h-[250px] w-full">
            <BarChart data={popularCoursesData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="students" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
