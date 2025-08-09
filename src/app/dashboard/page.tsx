import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BookCheck, Book, Users, ArrowUp } from 'lucide-react';
import { DashboardCharts } from '@/components/dashboard-charts';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { redirect } from 'next/navigation';
import { get } from 'http';

async function getProfile(uid: string) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                uid: uid,
                name: data.name || 'Stacy Lerner',
                email: data.email || '',
                department: data.department || 'Computer Science',
                class: data.class || 'Senior Year',
                section: data.section || 'A',
                coursesCompleted: data.coursesCompleted ?? 12,
                coursesOngoing: data.coursesOngoing ?? 5,
                avatarUrl: 'https://placehold.co/200x200.png',
                avatarFallback: data.name ? data.name.charAt(0).toUpperCase() : 'SL',
                avatarHint: 'profile picture'
              };
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch user profile on server:", error);
        return null;
    }
}


export default async function DashboardPage() {
  // This is a workaround to get the current user on the server.
  // In a real app, you'd likely use a session management library.
  // For now, we depend on the client-side redirect from the AuthGuard.
  // The page will initially try to render, might fail if auth isn't ready,
  // but AuthGuard will manage the user flow. We add a server-side check
  // as a fallback. A more robust solution involves server-side session handling.
  
  // This is a placeholder for a more robust server-side auth check.
  // As this is a sample app, we'll simulate fetching the user profile
  // based on a hardcoded ID for now to allow the page to render.
  // The AuthGuard will handle the actual user authentication flow.
  const profile = {
    name: 'Stacy',
    coursesCompleted: 12,
    coursesOngoing: 5,
  };


  const stats = [
    { title: 'Courses Completed', value: profile.coursesCompleted, icon: BookCheck, color: 'text-emerald-500', change: '+2' },
    { title: 'Courses Ongoing', value: profile.coursesOngoing, icon: Book, color: 'text-blue-500', change: '+1' },
    { title: 'Registered Students', value: '1,250', icon: Users, color: 'text-violet-500', change: '+50' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {profile.name.split(' ')[0] || 'Stacy'}!</h1>
        <p className="text-muted-foreground mt-1">Here's a summary of your learning progress.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
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
        ))}
      </div>
      <DashboardCharts />
    </div>
  );
}
