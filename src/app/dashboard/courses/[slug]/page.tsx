
'use client';

import { notFound } from 'next/navigation';
import { courses } from '../data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { BookOpenCheck, Clock, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const courseMeta = [
    { icon: BookOpenCheck, label: 'Modules', value: '12' },
    { icon: Clock, label: 'Duration', value: '8 Weeks' },
    { icon: Users, label: 'Enrolled', value: '1,234' },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-xl">
                <CardHeader className="p-0">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={course.imageUrl || `https://placehold.co/800x450.png`}
                            data-ai-hint={course.hint}
                            alt={course.title}
                            fill
                            className="object-cover"
                        />
                    </AspectRatio>
                </CardHeader>
                <CardContent className="p-6">
                    <CardTitle className="text-4xl font-headline mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">{course.description}</CardDescription>
                    
                    <Separator className="my-6" />

                    <div className="prose max-w-none text-foreground">
                        <h2 className="font-headline text-2xl mb-4">About this course</h2>
                        <p>This is a placeholder for the detailed course description. You can add more information about what students will learn, the course structure, prerequisites, and more.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <h3 className="font-headline text-xl mt-6 mb-3">What You'll Learn</h3>
                        <ul>
                            <li>Placeholder learning objective 1.</li>
                            <li>Placeholder learning objective 2.</li>
                            <li>Placeholder learning objective 3.</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card className="sticky top-24 shadow-xl">
                <CardHeader>
                   <CardTitle className="font-headline text-2xl">Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        {courseMeta.map((item, index) => (
                             <div key={index} className="flex items-center gap-4 text-sm">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground">{item.label}</p>
                                    <p className="font-semibold">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Separator />
                    <Button size="lg" className="w-full">Enroll Now</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
