import { AiAssistantChat } from '@/components/ai-assistant-chat';
import { StudyMaterialList } from '@/components/study-material-list';
import { Separator } from '@/components/ui/separator';

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-grow h-full min-h-[500px]">
        <AiAssistantChat />
      </div>
      <Separator />
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Study Materials</h2>
        <StudyMaterialList />
      </div>
    </div>
  );
}
