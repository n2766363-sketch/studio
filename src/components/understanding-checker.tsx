'use client';

import { useState, useTransition } from 'react';
import { checkStudentUnderstanding, type CheckStudentUnderstandingOutput } from '@/ai/flows/check-student-understanding';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function UnderstandingChecker() {
  const [lectureContent, setLectureContent] = useState('');
  const [studentAnswers, setStudentAnswers] = useState(['', '', '']);
  const [result, setResult] = useState<CheckStudentUnderstandingOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...studentAnswers];
    newAnswers[index] = value;
    setStudentAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lectureContent.trim() || studentAnswers.some(a => !a.trim()) || isPending) {
        toast({
            title: 'Missing Information',
            description: 'Please provide lecture content and all student answers.',
            variant: 'destructive',
        });
        return;
    }
    setResult(null);

    startTransition(async () => {
      try {
        const output = await checkStudentUnderstanding({
          lectureContent,
          studentAnswers,
        });
        setResult(output);
      } catch (error) {
        console.error('Check Understanding Error:', error);
        toast({
          title: 'Error',
          description: 'Failed to get assessment from AI.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Input Details</CardTitle>
          <CardDescription>Enter the lecture content and the student's answers below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="lectureContent">Lecture Content</Label>
              <Textarea
                id="lectureContent"
                placeholder="Paste the full lecture content here..."
                value={lectureContent}
                onChange={(e) => setLectureContent(e.target.value)}
                className="min-h-[150px]"
                required
              />
            </div>
            <div className="space-y-4">
              {studentAnswers.map((answer, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`answer-${index}`}>Student Answer {index + 1}</Label>
                  <Input
                    id={`answer-${index}`}
                    placeholder={`Enter student's answer to question ${index + 1}`}
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assessing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Assess Understanding
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">AI Assessment</CardTitle>
          <CardDescription>The AI-powered feedback will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isPending && (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {result && (
            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Overall Assessment</AlertTitle>
                <AlertDescription>{result.assessment}</AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="font-semibold font-headline">Feedback on Answers</h3>
                {result.feedback.map((fb, index) => (
                  <Alert key={index} variant="destructive">
                     <XCircle className="h-4 w-4" />
                     <AlertTitle>Answer {index + 1}</AlertTitle>
                     <AlertDescription>{fb}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          )}
          {!isPending && !result && (
            <div className="text-center text-muted-foreground py-10">
              <p>Results will be shown here after submission.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
