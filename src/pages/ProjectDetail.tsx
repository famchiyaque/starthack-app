
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bell, Send, Calendar } from 'lucide-react';

// Mock data for the project details
const getProjectDetails = (id: string) => ({
  id,
  title: 'Mobile App Redesign',
  description: 'Redesigning the mobile app interface for better user experience and increasing engagement metrics.',
  status: 'In Progress',
  progress: 75,
  startDate: new Date('2023-08-01'),
  endDate: new Date('2023-10-30'),
  team: [
    { id: '1', name: 'Jane Cooper', role: 'Project Manager', avatar: '' },
    { id: '2', name: 'Alex Wong', role: 'Designer', avatar: '' },
    { id: '3', name: 'Sarah Miller', role: 'Developer', avatar: '' },
  ],
  messages: [
    { id: '1', user: { id: '1', name: 'Jane Cooper', avatar: '' }, content: 'Hi team, let\'s discuss the latest wireframes.', timestamp: new Date('2023-09-15T10:30:00') },
    { id: '2', user: { id: '2', name: 'Alex Wong', avatar: '' }, content: 'I\'ve uploaded the designs to Figma. Can everyone take a look?', timestamp: new Date('2023-09-15T11:15:00') },
    { id: '3', user: { id: '3', name: 'Sarah Miller', avatar: '' }, content: 'The designs look great! I\'ll start implementing them tomorrow.', timestamp: new Date('2023-09-15T13:45:00') },
  ],
  notifications: [
    { id: '1', title: 'Deadline Approaching', content: 'The project deadline is in 2 weeks.', date: new Date('2023-09-14') },
    { id: '2', title: 'New Comment', content: 'Alex Wong commented on your design.', date: new Date('2023-09-13') },
    { id: '3', title: 'Task Completed', content: 'Sarah Miller completed the frontend implementation.', date: new Date('2023-09-12') },
  ],
});

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProjectDetails(projectId || '');
  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to an API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground mt-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Status:</div>
            <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {project.status}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Progress:</div>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all" 
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="text-xs">{project.progress}%</div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              {project.startDate.toLocaleDateString()} - {project.endDate.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Community Chat</span>
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <span>Details</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 overflow-y-auto space-y-4 mb-4">
                {project.messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={message.user.avatar} />
                      <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{message.user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="mt-1">{message.content}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <div className="mt-2 space-y-2">
                    {project.team.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.notifications.map((notification) => (
                  <div key={notification.id} className="border-b pb-3 last:border-0">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm">{notification.content}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {notification.date.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
