'use server';

/**
 * @fileOverview A flow to generate detailed course content using AI.
 *
 * - generateCourseContent - A function that takes a course title and generates a detailed description, learning objectives, and module list.
 * - GenerateCourseContentInput - The input type for the generateCourseContent function.
 * - GenerateCourseContentOutput - The return type for the generateCourseContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseContentInputSchema = z.object({
  title: z.string().describe('The title of the course.'),
});
export type GenerateCourseContentInput = z.infer<typeof GenerateCourseContentInputSchema>;

const GenerateCourseContentOutputSchema = z.object({
    about: z.string().describe('A detailed, engaging description of the course. Use a professional and encouraging tone. Write at least two paragraphs.'),
    learningObjectives: z.array(z.string()).describe('A list of 3-5 key learning objectives for the course.'),
    modules: z.array(z.object({
        title: z.string().describe('The title of the module.'),
        description: z.string().describe('A brief, one-sentence description of what the module covers.'),
    })).describe('A list of 5-7 course modules with titles and descriptions.'),
});
export type GenerateCourseContentOutput = z.infer<typeof GenerateCourseContentOutputSchema>;

export async function generateCourseContent(input: GenerateCourseContentInput): Promise<GenerateCourseContentOutput> {
  return generateCourseContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseContentPrompt',
  input: {schema: GenerateCourseContentInputSchema},
  output: {schema: GenerateCourseContentOutputSchema},
  prompt: `You are an expert curriculum developer for an online learning platform.
  
  Your task is to generate compelling and structured content for a course titled "{{title}}".
  
  Please generate the following information based on the course title:
  1.  **About the course**: A detailed and engaging description.
  2.  **Learning Objectives**: A list of key skills or knowledge students will gain.
  3.  **Course Modules**: A list of modules that break down the course content logically.

  Ensure the output is in the specified JSON format.
  `,
});

const generateCourseContentFlow = ai.defineFlow(
  {
    name: 'generateCourseContentFlow',
    inputSchema: GenerateCourseContentInputSchema,
    outputSchema: GenerateCourseContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
