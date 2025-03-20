
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Search, Plus } from 'lucide-react';
import AnimatedTransition from '@/components/common/AnimatedTransition';

// Mock data for chats
const mockChats = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Jane Cooper',
      avatar: '',
      status: 'online',
    },
    lastMessage: {
      content: 'I just reviewed the design files. They look great!',
      timestamp: new Date('2023-09-15T10:30:00'),
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Alex Wong',
      avatar: '',
      status: 'offline',
    },
    lastMessage: {
      content: 'Can we schedule a meeting to discuss the project?',
      timestamp: new Date('2023-09-14T15:45:00'),
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Sarah Miller',
      avatar: '',
      status: 'online',
    },
    lastMessage: {
      content: 'The backend API is now ready for integration.',
      timestamp: new Date('2023-09-14T09:20:00'),
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: '4',
    user: {
      id: '4',
      name: 'Tech Innovators',
      avatar: '',
      status: 'offline',
    },
    lastMessage: {
      content: 'Thanks for connecting! Looking forward to collaborating.',
      timestamp: new Date('2023-09-13T14:10:00'),
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: '5',
    user: {
      id: '5',
      name: 'Michael Brown',
      avatar: '',
      status: 'online',
    },
    lastMessage: {
      content: 'I\'ll send over the updated wireframes tomorrow.',
      timestamp: new Date('2023-09-13T11:05:00'),
      isRead: false,
    },
    unreadCount: 1,
  },
];

const formatTime = (date: Date) => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  if (isYesterday) {
    return 'Yesterday';
  }
  
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

const Collaborators = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Collaborators</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>New Chat</span>
        </Button>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search conversations..." className="pl-10" />
      </div>
      
      <div className="space-y-2">
        {mockChats.map((chat, index) => (
          <AnimatedTransition key={chat.id} type="fade" delay={index * 50}>
            <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.user.avatar} />
                    <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {chat.user.status === 'online' && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{chat.user.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(chat.lastMessage.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-sm truncate ${chat.lastMessage.isRead ? 'text-muted-foreground' : 'font-medium'}`}>
                      {chat.lastMessage.content}
                    </p>
                    
                    {chat.unreadCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground px-1.5">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedTransition>
        ))}
      </div>
      
      <div className="p-6 mt-4 border rounded-lg bg-muted/20 flex flex-col items-center justify-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">Start a conversation</h3>
        <p className="text-sm text-muted-foreground text-center mt-1 mb-4 max-w-md">
          Connect with other users and companies to collaborate on projects and share ideas.
        </p>
        <Button>Find Collaborators</Button>
      </div>
    </div>
  );
};

export default Collaborators;
