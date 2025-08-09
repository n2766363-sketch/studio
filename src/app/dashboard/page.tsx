
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BookCheck, Book, Users, ArrowUp, Loader2 } from 'lucide-react';
import { DashboardCharts } from '@/components/dashboard-charts';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';


export default function DashboardPage() {
  const { profile, loading } = useAuth();

  const stats = [
    { title: 'Courses Completed', value: profile?.coursesCompleted ?? 0, icon: BookCheck, color: 'text-emerald-500', change: '+2' },
    { title: 'Courses Ongoing', value: profile?.coursesOngoing ?? 0, icon: Book, color: 'text-blue-500', change: '+1' },
    { title: 'Registered Students', value: '1,250', icon: Users, color: 'text-violet-500', change: '+50' },
  ];

  const StatCardSkeleton = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5 rounded-full" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-8 w-12 mb-2" />
            <Skeleton className="h-3 w-32" />
        </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Welcome back, {loading && !profile ? <Skeleton className="h-8 w-36 inline-block" /> : (profile?.name.split(' ')[0] || 'Stacy')}!
        </h1>
        <p className="text-muted-foreground mt-1">Here's a summary of your learning progress.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading && !profile ? (
            <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
            </>
        ) : (
            stats.map((stat, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 text-muted-foreground ${stat.color}`} />
                </CardHeader>
                <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                    <span className={`flex items-center mr-1 ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                        <ArrowUp className="h-3 w-3 mr-0.5" />
                        {stat.change}
                    </span>
                    from last month
                </p>
                </CardContent>
            </Card>
            ))
        )}
      </div>
      <DashboardCharts />
    </div>
  );
}
