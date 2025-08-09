
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  const { profile, loading } = useAuth();
  
  if (loading || !profile) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin"/></div>
  }

  const profileDetails = [
    { label: 'Department', value: profile.department, icon: Briefcase },
    { label: 'Class', value: profile.class, icon: GraduationCap },
    { label: 'Section', value: profile.section, icon: Users },
  ];
  
  const courseStats = [
      { label: 'Courses Completed', value: profile.coursesCompleted },
      { label: 'Courses Ongoing', value: profile.coursesOngoing },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="w-full mx-auto overflow-hidden rounded-2xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="p-0">
            <div className="bg-primary/10 h-32 md:h-40" />
        </CardHeader>
        <CardContent className="p-6 text-center -mt-20">
          <Avatar className="mx-auto h-32 w-32 md:h-36 md:w-36 border-4 border-background shadow-lg">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.avatarHint} />
            <AvatarFallback className="text-4xl">{profile.avatarFallback}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline mt-4">{profile.name}</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">Student at Nexus Learn</CardDescription>
          
          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
            {profileDetails.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-3">
                        <item.icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                </div>
            ))}
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-headline mb-4">Course Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
             {courseStats.map((item, index) => (
                <div key={index} className="bg-primary/5 p-6 rounded-lg">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-4xl font-bold text-primary mt-1">{item.value}</p>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
