import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const courses = [
  { title: "Artificial Intelligence", description: "Explore the frontiers of machine intelligence.", hint: "robot brain" },
  { title: "Data Science", description: "Unlock insights from data with statistical methods.", hint: "graphs charts" },
  { title: "Cybersecurity", description: "Learn to protect digital assets from cyber threats.", hint: "security lock" },
  { title: "Web Development", description: "Build modern, responsive websites and applications.", hint: "code computer" },
  { title: "Mobile App Development", description: "Create applications for iOS and Android platforms.", hint: "phone apps" },
  { title: "Cloud Computing", description: "Master cloud platforms like AWS, Azure, and GCP.", hint: "cloud servers" },
  { title: "Blockchain Technology", description: "Understand the technology behind cryptocurrencies.", hint: "digital chain" },
  { title: "Digital Marketing", description: "Grow online presence through effective marketing.", hint: "marketing strategy" },
  { title: "Graphic Design", description: "Create stunning visuals for print and digital media.", hint: "design tools" },
  { title: "UX/UI Design", description: "Design user-centric and intuitive interfaces.", hint: "interface design" },
  { title: "Project Management", description: "Lead projects to successful completion.", hint: "teamwork planning" },
  { title: "Business Analytics", description: "Use data to make informed business decisions.", hint: "business charts" },
  { title: "Financial Modeling", description: "Build financial models for valuation and forecasting.", hint: "finance spreadsheet" },
  { title: "Python Programming", description: "Master the versatile and popular Python language.", hint: "python code" },
  { title: "JavaScript Essentials", description: "Learn the language of the web, from basics to advanced.", hint: "javascript code" },
  { title: "SQL for Data Analysis", description: "Query and manage data in relational databases.", hint: "database query" },
  { title: "Creative Writing", description: "Unleash your storytelling potential.", hint: "writing book" },
  { title: "Public Speaking", description: "Communicate with confidence and impact.", hint: "presentation speech" },
  { title: "Photography Basics", description: "Capture beautiful moments with your camera.", hint: "camera lens" },
  { title: "Introduction to Psychology", description: "Explore the science of mind and behavior.", hint: "brain psychology" },
  { title: "Music Theory", description: "Understand the fundamentals of music composition.", hint: "music notes" },
  { title: "Game Development", description: "Learn to create your own video games from scratch.", hint: "game controller" },
  { title: "Robotics", description: "Build and program your own robots.", hint: "robot arm" },
  { title: "Data Structures & Algorithms", description: "Core concepts for efficient software development.", hint: "flowchart algorithm" },
  { title: "Ethical Hacking", description: "Learn penetration testing and vulnerability assessment.", hint: "hacker code" }
];

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-headline">Explore Courses</h1>
                <p className="text-muted-foreground mt-1">Find your next learning adventure.</p>
            </div>
             <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search courses..." className="pl-10" />
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out rounded-xl group">
              <CardHeader className="p-0 overflow-hidden">
                <Image
                  src={`https://placehold.co/600x400.png`}
                  data-ai-hint={course.hint}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-headline">{course.title}</CardTitle>
                <CardDescription className="mt-2 text-sm">{course.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Start Course</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
  );
}
