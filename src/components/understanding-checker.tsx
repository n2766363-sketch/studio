'use client';

import { useState, useTransition } from 'react';
import { checkStudentUnderstanding, type CheckStudentUnderstandingOutput } from '@/ai/flows/check-student-understanding';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, CheckCircle, MessageSquare, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Separator } from './ui/separator';

export function UnderstandingChecker() {
  const [lectureContent, setLectureContent] = useState('');
  const [studentAnswers, setStudentAnswers] = useState(['', '', '']);
  const [submittedAnswers, setSubmittedAnswers] = useState<string[] | null>(null);
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
    setSubmittedAnswers([...studentAnswers]);

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
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
      
      <Card className="shadow-lg sticky top-24">
        <CardHeader>
          <CardTitle className="font-headline">AI Assessment</CardTitle>
          <CardDescription>The AI-powered feedback will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isPending && (
            <div className="flex justify-center items-center h-full min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {result && submittedAnswers && (
            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle className="font-headline">Overall Assessment</AlertTitle>
                <AlertDescription>{result.assessment}</AlertDescription>
              </Alert>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold font-headline text-lg">Detailed Feedback on Answers</h3>
                {result.feedback.map((fb, index) => (
                  <div key={index} className="space-y-3 rounded-lg border bg-background p-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-muted-foreground">Student's Answer {index + 1}</p>
                            <p className="text-sm">{submittedAnswers[index]}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                           <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                           <p className="font-semibold text-sm text-primary">AI Feedback</p>
                           <p className="text-sm text-muted-foreground">{fb}</p>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!isPending && !result && (
            <div className="text-center text-muted-foreground py-10 min-h-[300px] flex items-center justify-center">
              <p>Results will be shown here after submission.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
