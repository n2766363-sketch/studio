'use server';

/**
 * @fileOverview A flow to check student understanding of lecture material.
 *
 * - checkStudentUnderstanding - A function that takes lecture content and student answers, and assesses the student's understanding.
 * - CheckStudentUnderstandingInput - The input type for the checkStudentUnderstanding function.
 * - CheckStudentUnderstandingOutput - The return type for the checkStudentUnderstanding function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckStudentUnderstandingInputSchema = z.object({
  lectureContent: z.string().describe('The content of the lecture.'),
  studentAnswers: z.array(z.string()).describe('The student answers to the questions.'),
});
export type CheckStudentUnderstandingInput = z.infer<typeof CheckStudentUnderstandingInputSchema>;

const CheckStudentUnderstandingOutputSchema = z.object({
  assessment: z.string().describe('An overall assessment of the student understanding.'),
  feedback: z.array(z.string()).describe('Feedback on each of the student answers.'),
});
export type CheckStudentUnderstandingOutput = z.infer<typeof CheckStudentUnderstandingOutputSchema>;

export async function checkStudentUnderstanding(input: CheckStudentUnderstandingInput): Promise<CheckStudentUnderstandingOutput> {
  return checkStudentUnderstandingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkStudentUnderstandingPrompt',
  input: {schema: CheckStudentUnderstandingInputSchema},
  output: {schema: CheckStudentUnderstandingOutputSchema},
  prompt: `You are an AI assistant designed to assess student understanding of lecture material.

You will be given the lecture content and the student's answers to questions about the lecture.
Your task is to provide an overall assessment of the student's understanding and feedback on each of the student's answers.

Lecture Content:
{{lectureContent}}

Student Answers:
{{#each studentAnswers}}
- {{{this}}}
{{/each}}

Overall Assessment:
{{assessment}}

Feedback on each answer:
{{#each feedback}}
- {{{this}}}
{{/each}}
`,
});

const checkStudentUnderstandingFlow = ai.defineFlow(
  {
    name: 'checkStudentUnderstandingFlow',
    inputSchema: CheckStudentUnderstandingInputSchema,
    outputSchema: CheckStudentUnderstandingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
