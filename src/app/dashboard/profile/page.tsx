
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ProfileData {
    name: string;
    department: string;
    class: string;
    section: string;
    coursesCompleted: number;
    coursesOngoing: number;
    avatarUrl: string;
    avatarFallback: string;
    avatarHint: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            name: data.name || 'Stacy Lerner',
            department: data.department || 'Computer Science',
            class: data.class || 'Senior Year',
            section: data.section || 'A',
            coursesCompleted: data.coursesCompleted || 12,
            coursesOngoing: data.coursesOngoing || 5,
            avatarUrl: 'https://placehold.co/200x200.png',
            avatarFallback: data.name ? data.name.charAt(0).toUpperCase() : 'SL',
            avatarHint: 'profile picture'
          });
        }
        setLoading(false);
      }
    }
    fetchProfileData();
  }, [user]);
  
  if (loading || !profileData) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin"/></div>
  }

  const profileDetails = [
    { label: 'Department', value: profileData.department, icon: Briefcase },
    { label: 'Class', value: profileData.class, icon: GraduationCap },
    { label: 'Section', value: profileData.section, icon: Users },
  ];
  
  const courseStats = [
      { label: 'Courses Completed', value: profileData.coursesCompleted },
      { label: 'Courses Ongoing', value: profileData.coursesOngoing },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="w-full mx-auto overflow-hidden rounded-2xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="p-0">
            <div className="bg-primary/10 h-32 md:h-40" />
        </CardHeader>
        <CardContent className="p-6 text-center -mt-20">
          <Avatar className="mx-auto h-32 w-32 md:h-36 md:w-36 border-4 border-background shadow-lg">
            <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint={profileData.avatarHint} />
            <AvatarFallback className="text-4xl">{profileData.avatarFallback}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline mt-4">{profileData.name}</CardTitle>
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
