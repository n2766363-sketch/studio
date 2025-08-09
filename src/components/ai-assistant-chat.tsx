
'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { askAiAssistant, type AiAssistantOutput } from '@/ai/flows/ai-assistant';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Loader2, GraduationCap, BrainCircuit, Book, Mail, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const examplePrompts = [
    { icon: BrainCircuit, text: "Explain quantum computing in simple terms" },
    { icon: Book, text: "What are the main themes of 'Moby Dick'?" },
    { icon: Mail, text: "Draft a professional email to a professor" },
    { icon: Code, text: "Help me debug a Python script for data analysis" },
];

export function AiAssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { user } = useAuth();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePromptClick = (promptText: string) => {
    setInput(promptText);
  }

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    startTransition(async () => {
        const query = input;
        setInput('');
        try {
            const result: AiAssistantOutput = await askAiAssistant({ query });
            const assistantMessage: Message = { role: 'assistant', content: result.answer };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('AI Assistant Error:', error);
            toast({
                title: 'Error',
                description: 'Failed to get a response from the AI assistant.',
                variant: 'destructive',
            });
            setMessages((prev) => prev.slice(0, -1)); // Remove the user message on error
        }
    });
  };

  return (
    <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto" ref={scrollAreaRef}>
             {messages.length === 0 && !isPending ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                        <GraduationCap className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold font-headline mb-8">Hello! How can I help you today?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                        {examplePrompts.map((prompt, index) => (
                           <button key={index} onClick={() => handlePromptClick(prompt.text)} className="p-4 border rounded-lg hover:bg-muted text-left flex items-start gap-3 transition-colors">
                                <prompt.icon className="h-5 w-5 mt-1 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm">{prompt.text}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="p-4 space-y-6">
                    {messages.map((message, index) => (
                    <div key={index} className={cn('flex items-start gap-4', message.role === 'user' ? 'justify-end' : '')}>
                        {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8 border">
                            <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        )}
                        <div className={cn('max-w-[75%] rounded-lg p-3 text-sm', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === 'user' && (
                        <Avatar className="h-8 w-8 border">
                             <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                    ))}
                    {isPending && (
                    <div className="flex items-start gap-4">
                        <Avatar className="h-8 w-8 border">
                             <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg p-3 flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                    )}
                </div>
            )}
        </div>
        <div className="mt-auto p-4 bg-background">
            <Card className="p-2 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask the AI assistant anything..."
                    className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                        }
                    }}
                    />
                    <Button type="submit" size="icon" disabled={!input.trim() || isPending}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </Card>
        </div>
    </div>
  );
}
