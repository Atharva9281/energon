
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Bot,
  Send,
  X,
  Paperclip,
  MessageSquare,
  Plus,
  MoreHorizontal,
  Trash2,
  Edit,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';


type Message = {
  role: 'user' | 'assistant';
  content: string;
  attachment?: {
    name: string;
    size: string;
  };
};

type Conversation = {
  id: number;
  title: string;
  messages: Message[];
};

const mockChatHistory: Conversation[] = [
  {
    id: 1,
    title: 'Building Energy Report',
    messages: [
      { role: 'user', content: 'Which building consumed the most energy today?' },
      { role: 'assistant', content: 'Building A consumed the most energy today at 450 kWh.' },
    ],
  },
  {
    id: 2,
    title: 'Building B Status',
    messages: [
      { role: 'user', content: 'Give me a report of Building B’s performance.' },
      { role: 'assistant', content: 'Building B has all 12 of its units online and only 1 active warning. Energy usage for the month is 7800 kWh.' },
    ],
  },
  {
    id: 3,
    title: 'Offline Units',
    messages: [
      { role: 'user', content: 'How many units in Building B went offline this week?' },
      {
        role: 'assistant',
        content: 'Zero units went offline in Building B this week. It has a 100% uptime record for the past 7 days.',
      },
    ],
  },
];

export function EnergonAssistant({ isFullScreen = false }: { isFullScreen?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(mockChatHistory);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(
    mockChatHistory.length > 0 ? mockChatHistory[0].id : null
  );
  const [input, setInput] = useState('');
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [renameInput, setRenameInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeConversation?.messages]);

  useEffect(() => {
    // Prevent body scroll when overlay is open
    if (isOpen && !isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isFullScreen]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || activeConversationId === null) return;

    const userMessage: Message = { role: 'user', content: input };
    
    setConversations(currentConversations =>
      currentConversations.map(convo =>
        convo.id === activeConversationId
          ? { ...convo, messages: [...convo.messages, userMessage] }
          : convo
      )
    );
    setInput('');

    // Mock AI response
    setTimeout(() => {
      let response = "I'm analyzing the latest data to answer your question.";
      if (input.toLowerCase().includes('most energy')) {
        response = 'Building A consumed the most energy today at 450 kWh.';
      } else if (input.toLowerCase().includes('building b')) {
        response = 'Building B has all 12 of its units online and only 1 active warning. Energy usage for the month is 7800 kWh.';
      } else if (input.toLowerCase().includes('freezer 2')) {
        response = 'Freezer 2 in Building A is currently offline and reporting a critical temperature alert.';
      } else if (input.toLowerCase().includes('building a')) {
        response = 'Building A has 8 of 10 units online, with 1 critical alert and 2 warnings. Today\'s energy usage is 450 kWh.'
      }

      const assistantMessage: Message = { role: 'assistant', content: response };

      setConversations(currentConversations =>
        currentConversations.map(convo =>
          convo.id === activeConversationId
            ? { ...convo, messages: [...convo.messages, assistantMessage] }
            : convo
        )
      );
    }, 1500);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeConversationId === null) return;

    const attachmentMessage: Message = {
      role: 'user',
      content: `File attached: ${file.name}`,
      attachment: {
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
      },
    };
    
    setConversations(current => current.map(convo => 
      convo.id === activeConversationId 
        ? { ...convo, messages: [...convo.messages, attachmentMessage] }
        : convo
    ));
    
     // Mock AI response to file upload
    setTimeout(() => {
       const assistantMessage: Message = { role: 'assistant', content: `I've received the file "${file.name}". How should I analyze it?` };
       setConversations(current => current.map(convo => 
          convo.id === activeConversationId 
            ? { ...convo, messages: [...convo.messages, assistantMessage] }
            : convo
        ));
    }, 1000);
  };
  
  const handleNewChat = () => {
    const newId = conversations.length > 0 ? Math.max(...conversations.map(c => c.id)) + 1 : 1;
    const newConversation: Conversation = {
      id: newId,
      title: `New Chat ${newId}`,
      messages: [{
        role: 'assistant',
        content: "Hello! I'm Energon. How can I assist you with your buildings today?",
      }],
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newId);
  };

  const handleDeleteChat = (idToDelete: number) => {
    setConversations(current => current.filter(convo => convo.id !== idToDelete));
    if (activeConversationId === idToDelete) {
      const remainingConversations = conversations.filter(c => c.id !== idToDelete);
      setActiveConversationId(remainingConversations.length > 0 ? remainingConversations[0].id : null);
    }
  };

  const handleStartRename = (convo: Conversation) => {
    setRenamingId(convo.id);
    setRenameInput(convo.title);
  };
  
  const handleConfirmRename = (e: React.FormEvent, idToRename: number) => {
    e.preventDefault();
    if (!renameInput.trim()) return;
    setConversations(current =>
      current.map(convo =>
        convo.id === idToRename ? { ...convo, title: renameInput.trim() } : convo
      )
    );
    setRenamingId(null);
    setRenameInput('');
  };

  const chatInterface = (
       <div className={cn("flex h-full w-full", isFullScreen ? "bg-background" : "bg-background/80 backdrop-blur-sm")}>
            {/* Left Sidebar */}
            <div className="w-[280px] bg-[#F7F9FA] dark:bg-zinc-900/70 h-full flex flex-col p-3 gap-3 border-r">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleNewChat}>
                    <Plus className="w-4 h-4" />
                    New Chat
                </Button>
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                        {conversations.map(convo => (
                            <div key={convo.id} className="group relative">
                                {renamingId === convo.id ? (
                                    <form onSubmit={(e) => handleConfirmRename(e, convo.id)} className="p-1">
                                        <Input 
                                          value={renameInput}
                                          onChange={(e) => setRenameInput(e.target.value)}
                                          onBlur={() => setRenamingId(null)}
                                          autoFocus
                                          className="h-8"
                                        />
                                    </form>
                                ) : (
                                    <Button
                                        variant={activeConversationId === convo.id ? "secondary" : "ghost"}
                                        className="w-full justify-start gap-2 truncate pr-8"
                                        onClick={() => setActiveConversationId(convo.id)}
                                    >
                                        <MessageSquare className="w-4 h-4"/>
                                        <span className="flex-1 text-left truncate">{convo.title}</span>
                                    </Button>
                                )}
                                {renamingId !== convo.id && (
                                <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="w-7 h-7">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="bottom" align="start">
                                            <DropdownMenuItem onClick={() => handleStartRename(convo)}>
                                                <Edit className="w-4 h-4 mr-2" />
                                                Rename
                                            </DropdownMenuItem>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                                                        <span className="text-destructive">Delete</span>
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will permanently delete the chat &quot;{convo.title}&quot;. This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteChat(convo.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Main Chat Panel */}
            <div className={cn("flex-1 flex flex-col h-full", isFullScreen ? "bg-background" : "bg-white dark:bg-zinc-900")}>
                {/* Header */}
                 <header className={cn("flex items-center justify-between p-4 border-b", isFullScreen && "hidden")}>
                    <h2 className="text-xl font-bold">Energon – HVAC AI Assistant</h2>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="w-8 h-8"><MoreHorizontal/></Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setIsOpen(false)}><X/></Button>
                    </div>
                </header>

                {/* Chat Body */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {activeConversation?.messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 ${
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {msg.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Bot className="w-5 h-5 text-primary" /></div>}
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            msg.role === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-muted'
                          }`}
                        >
                          <p>{msg.content}</p>
                           {msg.attachment && (
                                <div className="mt-2 p-2 border-t border-black/10">
                                    <p className="font-bold text-sm">Attachment:</p>
                                    <p className="text-xs">{msg.attachment.name} ({msg.attachment.size})</p>
                                </div>
                            )}
                        </div>
                      </div>
                    ))}
                    {!activeConversation && (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <p>Select a conversation or start a new one.</p>
                        </div>
                    )}
                </div>

                {/* Footer Input */}
                 <div className="p-4 border-t bg-background">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-muted dark:bg-zinc-800 rounded-lg p-2">
                         <Button type="button" size="icon" variant="ghost" onClick={() => fileInputRef.current?.click()}>
                            <Paperclip className="w-5 h-5" />
                            <span className="sr-only">Upload file</span>
                        </Button>
                         <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Energon anything..."
                            className="flex-1 w-full bg-transparent outline-none border-none focus:ring-0 text-sm px-2"
                            disabled={!activeConversation}
                        />
                        <Button type="submit" size="icon" disabled={!input.trim() || !activeConversation}>
                            <Send className="w-5 h-5" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </div>
            </div>
          </div>
  );


  if (isFullScreen) {
    return chatInterface;
  }

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg z-40 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <Bot className="w-8 h-8" />
        <span className="sr-only">Open Energon Assistant</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 animate-in fade-in-0">
         {chatInterface}
        </div>
      )}
    </>
  );
}
