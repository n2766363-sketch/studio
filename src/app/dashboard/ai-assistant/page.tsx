import { AiAssistantChat } from '@/components/ai-assistant-chat';

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex-grow h-full min-h-[500px]">
        <AiAssistantChat />
      </div>
    </div>
  );
}
