
'use client';

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell, Sector } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import React from 'react';

const courseStatusData = [
  { name: 'Completed', value: 12, fill: 'hsl(var(--chart-1))' },
  { name: 'Ongoing', value: 5, fill: 'hsl(var(--chart-2))' },
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

const CustomXAxisTick = ({ x, y, payload }: any) => {
    const course = popularCoursesData.find(c => c.name === payload.value);
    if (!course) return null;
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {payload.value}
        </text>
        <circle cx={0} cy={28} r={4} fill={course.fill} />
      </g>
    );
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};


export function DashboardCharts() {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieClick = (data: any, index: number) => {
      console.log(`Clicked on ${data.name} with value ${data.value}`);
      // You can add navigation logic here, e.g. router.push('/courses?status=' + data.name)
  }

  const onMouseLeave = () => {
    setActiveIndex(undefined);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Course Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
              <ChartContainer config={courseStatusChartConfig} className="mx-auto aspect-square max-h-[250px]">
                <PieChart>
                  <ChartTooltipContent hideLabel nameKey="name" />
                  <Pie 
                    data={courseStatusData} 
                    dataKey="value" 
                    nameKey="name" 
                    innerRadius={60} 
                    strokeWidth={5} 
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={onPieClick}
                  >
                     {courseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} className="cursor-pointer" />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="flex flex-col gap-4 text-sm">
                  {courseStatusData.map((entry) => (
                      <div key={entry.name} className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.fill }} />
                          <div className="flex-1 text-muted-foreground">{entry.name}</div>
                          <div className="font-bold">{entry.value}</div>
                      </div>
                  ))}
              </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Popular Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={popularCoursesChartConfig} className="h-[300px] w-full">
            <BarChart data={popularCoursesData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={<CustomXAxisTick />} height={40} />
              <YAxis />
              <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="students" radius={8}>
                {popularCoursesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
