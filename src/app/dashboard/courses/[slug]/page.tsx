'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { courses } from '../data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { BookOpenCheck, Clock, Users, BookMarked, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { generateCourseContent, type GenerateCourseContentOutput } from '@/ai/flows/generate-course-content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);
  const [content, setContent] = useState<GenerateCourseContentOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (course) {
      const fetchContent = async () => {
        try {
          setLoading(true);
          const generatedContent = await generateCourseContent({ title: course.title });
          setContent(generatedContent);
        } catch (error) {
          console.error("Failed to generate course content:", error);
          // Handle error state if needed
        } finally {
          setLoading(false);
        }
      };
      fetchContent();
    }
  }, [course]);

  if (!course) {
    notFound();
  }

  const courseMeta = [
    { icon: BookMarked, label: 'Modules', value: content?.modules.length || '...' },
    { icon: Clock, label: 'Duration', value: '8 Weeks' },
    { icon: Users, label: 'Enrolled', value: '1,234' },
  ];
  
  const CourseContentSkeletons = () => (
    <div className="prose max-w-none text-foreground">
        <h2 className="font-headline text-2xl mb-4"><Skeleton className="h-8 w-48" /></h2>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
        
        <h3 className="font-headline text-xl mt-6 mb-3"><Skeleton className="h-7 w-40" /></h3>
        <ul className="space-y-3">
            <li><Skeleton className="h-6 w-full" /></li>
            <li><Skeleton className="h-6 w-5/6" /></li>
            <li><Skeleton className="h-6 w-full" /></li>
        </ul>
        <h3 className="font-headline text-xl mt-6 mb-3"><Skeleton className="h-7 w-44" /></h3>
         <Accordion type="single" collapsible className="w-full">
            {[...Array(5)].map((_, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger>
                        <Skeleton className="h-6 w-1/2" />
                    </AccordionTrigger>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
);


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
                            priority
                        />
                    </AspectRatio>
                </CardHeader>
                <CardContent className="p-6">
                    <CardTitle className="text-4xl font-headline mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">{course.description}</CardDescription>
                    
                    <Separator className="my-6" />

                    {loading ? <CourseContentSkeletons/> : (
                      <div className="prose max-w-none text-foreground">
                          <h2 className="font-headline text-2xl mb-4">About this course</h2>
                          <p>{content?.about}</p>
                          
                          <h3 className="font-headline text-xl mt-6 mb-3">What You'll Learn</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                              {content?.learningObjectives.map((obj, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0" /> 
                                    <span>{obj}</span>
                                  </li>
                              ))}
                          </ul>

                          <h3 className="font-headline text-xl mt-6 mb-3">Course Modules</h3>
                          <Accordion type="single" collapsible className="w-full">
                            {content?.modules.map((mod, i) => (
                                <AccordionItem value={`item-${i}`} key={i}>
                                    <AccordionTrigger className="text-base font-semibold text-left hover:no-underline">{i+1}. {mod.title}</AccordionTrigger>
                                    <AccordionContent className="pl-6 text-muted-foreground">
                                       {mod.description}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                           </Accordion>
                      </div>
                    )}
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
                                    <p className="font-semibold">{loading ? <Skeleton className="h-5 w-8" /> : item.value}</p>
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
