import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const profileData = {
    name: 'Stacy Lerner',
    department: 'Computer Science',
    class: 'Senior Year',
    coursesCompleted: 12,
    coursesOngoing: 5,
    avatarUrl: 'https://placehold.co/200x200.png',
    avatarFallback: 'SL',
    avatarHint: 'profile picture'
  };

  const profileDetails = [
    { label: 'Department', value: profileData.department },
    { label: 'Class', value: profileData.class },
  ];
  
  const courseStats = [
      { label: 'Courses Completed', value: profileData.coursesCompleted },
      { label: 'Courses Ongoing', value: profileData.coursesOngoing },
  ];

  return (
    <div className="flex justify-center items-start p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint={profileData.avatarHint} />
              <AvatarFallback className="text-4xl">{profileData.avatarFallback}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-headline">{profileData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            {profileDetails.map((item, index) => (
                <div key={index}>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
             {courseStats.map((item, index) => (
                <div key={index}>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-3xl font-bold text-primary">{item.value}</p>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
