
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Presentation, Download, Eye } from 'lucide-react';

const studyMaterials = [
  {
    title: 'Introduction to Machine Learning',
    type: 'PDF',
    description: 'A comprehensive overview of fundamental ML concepts.',
    icon: FileText,
  },
  {
    title: 'Neural Networks and Deep Learning',
    type: 'PPT',
    description: 'Presentation slides covering the architecture of neural networks.',
    icon: Presentation,
  },
  {
    title: 'Lecture Notes - Week 1',
    type: 'Notes',
    description: 'Handwritten notes summarizing the first week of lectures.',
    icon: FileText,
  },
  {
    title: 'Advanced Algorithms',
    type: 'PDF',
    description: 'In-depth analysis of advanced algorithms and data structures.',
    icon: FileText,
  },
];

export function StudyMaterialList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {studyMaterials.map((material, index) => (
        <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="font-headline text-lg">{material.title}</CardTitle>
                <CardDescription className="mt-1">{material.description}</CardDescription>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <material.icon className="w-6 h-6" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-end gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View Online
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
