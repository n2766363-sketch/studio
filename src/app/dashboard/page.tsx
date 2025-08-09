import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookCheck, Book, Users } from 'lucide-react';
import { DashboardCharts } from '@/components/dashboard-charts';

export default function DashboardPage() {
  const stats = [
    { title: 'Courses Completed', value: '12', icon: BookCheck, color: 'text-green-500' },
    { title: 'Courses Ongoing', value: '5', icon: Book, color: 'text-blue-500' },
    { title: 'Registered Students', value: '1,250', icon: Users, color: 'text-purple-500' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline">Welcome back, Stacy!</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <DashboardCharts />
    </div>
  );
}
