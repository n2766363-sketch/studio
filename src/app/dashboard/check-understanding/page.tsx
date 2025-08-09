import { UnderstandingChecker } from '@/components/understanding-checker';

export default function CheckUnderstandingPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold font-headline mb-2">Check Student Understanding</h1>
        <p className="text-muted-foreground mb-6">
            Input lecture content and student answers to get an AI-powered assessment.
        </p>
        <UnderstandingChecker />
    </div>
  );
}
