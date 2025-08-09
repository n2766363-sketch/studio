import { AiAssistantChat } from '@/components/ai-assistant-chat';
import { StudyMaterialList } from '@/components/study-material-list';
import { Separator } from '@/components/ui/separator';

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex-grow h-full min-h-[500px]">
        <AiAssistantChat />
      </div>
      <Separator />
      <div className="space-y-4">
        <h2 className="text-3xl font-bold font-headline">Explore Study Materials</h2>
        <p className="text-muted-foreground">
          Visual guides, notes, and resources to help you master key concepts.
        </p>
        <StudyMaterialList />
      </div>
    </div>
  );
}
