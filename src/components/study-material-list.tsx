
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const studyMaterials = [
  {
    title: 'Visualizing Neural Networks',
    description: 'An interactive guide with diagrams showing how neural networks operate. This visual approach helps demystify the connections and layers within a network.',
    imageUrl: 'https://images.unsplash.com/photo-1696253922813-9b2e043603b2?q=80&w=2070&auto=format&fit=crop',
    hint: 'neural network',
  },
  {
    title: 'Mind Map for Machine Learning',
    description: 'A complete mind map connecting all major concepts in ML, from regression to deep learning. Perfect for exam revision and seeing the big picture.',
    imageUrl: 'https://images.unsplash.com/photo-1557425529-b1ae9c141e7d?q=80&w=2070&auto=format&fit=crop',
    hint: 'mind map',
  },
  {
    title: 'Key Algorithm Cheat Sheet',
    description: 'A one-page PDF summarizing the most important algorithms, their use cases, and their time/space complexities. A must-have for any programmer.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-1428bc648c73?q=80&w=2070&auto=format&fit=crop',
    hint: 'code algorithm',
  },
  {
    title: 'Intro to Python for Data Science',
    description: 'Presentation slides covering the essential Python libraries like Pandas for data manipulation and NumPy for numerical operations.',
    imageUrl: 'https://images.unsplash.com/photo-1630713824438-514378774786?q=80&w=2070&auto=format&fit=crop',
    hint: 'python chart',
  },
];

export function StudyMaterialList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {studyMaterials.map((material, index) => (
        <Dialog key={index}>
          <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out rounded-xl group">
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
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Online
                </Button>
              </DialogTrigger>
              <a href={material.imageUrl} download target="_blank" rel="noopener noreferrer">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
              </a>
            </CardFooter>
          </Card>
          <DialogContent className="sm:max-w-3xl p-8">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl mb-2">{material.title}</DialogTitle>
              <DialogDescription>
                {material.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
               <Image
                src={material.imageUrl}
                data-ai-hint={material.hint}
                alt={material.title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-lg border"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
