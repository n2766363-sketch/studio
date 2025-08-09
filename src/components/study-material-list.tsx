
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye } from 'lucide-react';
import Image from 'next/image';

const studyMaterials = [
  {
    title: 'Visualizing Neural Networks',
    description: 'An interactive guide with diagrams showing how neural networks operate.',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'neural network',
  },
  {
    title: 'Mind Map for Machine Learning',
    description: 'A complete mind map connecting all major concepts in ML, from regression to deep learning.',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'mind map',
  },
  {
    title: 'Key Algorithm Cheat Sheet',
    description: 'A one-page PDF summarizing the most important algorithms and their complexities.',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'code algorithm',
  },
  {
    title: 'Intro to Python for Data Science',
    description: 'Presentation slides covering the essential Python libraries like Pandas and NumPy.',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'python chart',
  },
];

export function StudyMaterialList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {studyMaterials.map((material, index) => (
        <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out rounded-xl group">
          <CardHeader className="p-0 overflow-hidden">
            <Image
              src={material.imageUrl}
              data-ai-hint={material.hint}
              alt={material.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </CardHeader>
          <CardContent className="p-6 flex-grow">
            <CardTitle className="font-headline text-xl">{material.title}</CardTitle>
            <CardDescription className="mt-2">{material.description}</CardDescription>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex items-center justify-end gap-2">
             <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View Online
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
