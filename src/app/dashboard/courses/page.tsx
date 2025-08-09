
'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { courses } from './data';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-headline">Explore Courses</h1>
                <p className="text-muted-foreground mt-1">Find your next learning adventure.</p>
            </div>
             <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out rounded-xl group">
              <CardHeader className="p-0 overflow-hidden">
                 <Link href={`/dashboard/courses/${course.slug}`}>
                    <Image
                      src={course.imageUrl || `https://placehold.co/600x400.png`}
                      data-ai-hint={course.hint}
                      alt={course.title}
                      width={600}
                      height={400}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                 </Link>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                 <Link href={`/dashboard/courses/${course.slug}`}>
                    <CardTitle className="text-lg font-headline hover:underline">{course.title}</CardTitle>
                 </Link>
                <CardDescription className="mt-2 text-sm">{course.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/dashboard/courses/${course.slug}`} className="w-full">
                    <Button className="w-full">Start Course</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
  );
}
