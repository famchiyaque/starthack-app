import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bell, Send, Calendar } from 'lucide-react';
import { QRCodeCanvas } from "qrcode.react";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectData, setProjectData] = useState<any>(null);
  const [membersData, setMembersData] = useState<any[]>([
    { id: '1', name: 'Jane Cooper', role: 'Designer', avatar: '', },
    { id: '2', name: 'Alex Wong', role: 'Developer', avatar: '', },
    { id: '3', name: 'Sarah Miller', role: 'Product Manager', avatar: '', },
  ]);
  const [notifications, setNotifications] = useState<any[]>([
    { id: '1', type: 'join', name: 'John Doe', timestamp: new Date('2025-03-20T09:30:00') },
    { id: '2', type: 'leave', name: 'Jane Cooper', timestamp: new Date('2025-03-20T10:00:00') },
    { id: '3', type: 'join', name: 'Sarah Miller', timestamp: new Date('2025-03-20T11:15:00') },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isQrCodeAvailable, setIsQrCodeAvailable] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await axios.get(`/api/get-project`, {
          params: { projectId }
        });
        console.log(projectResponse.data)

        setProjectData(projectResponse.data);
        const tasks = JSON.parse(projectResponse.data.tasks);

        // Check if 'attend live event' task is in project tasks
        if (tasks.includes('attendEvent')) {
          setIsQrCodeAvailable(true);
        } else {
          setIsQrCodeAvailable(false);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const genQRCode = (projectId: string) => {
    // Generate a unique timestamp-based string for the QR code
    const uniqueData = new Date().toISOString(); // or Date.now() if you prefer a numeric string
    setQrCodeData(uniqueData); // Set the unique data for the QR code
  };
  

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{projectData.title}</h1>
        <p className="text-muted-foreground mt-2">{projectData.description}</p>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Status:</div>
            <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {projectData.status}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Progress:</div>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${projectData.progress}%` }} />
            </div>
            <div className="text-xs">{projectData.progress}%</div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              {new Date(projectData.startDate).toLocaleDateString()} - {new Date(projectData.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Community Forum</span>
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <span>Members</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="qr-code" className="flex items-center gap-2">
            <span>QR Code</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Forum</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="h-80 overflow-y-auto space-y-4 mb-4">
                {projectData.messages.map((message: any) => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={message.user.avatar} />
                      <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{message.user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="mt-1">{message.content}</div>
                    </div>
                  </div>
                ))}
              </div> */}

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
              <CardTitle>Community Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <div className="mt-2 space-y-2">
                    {membersData.map((member) => (
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
              {notifications.map((notification: any) => (
                <div key={notification.id} className="border-b pb-3 last:border-0">
                  <div className="font-medium">
                    {notification.type === 'join' ? `${notification.name} requested to join the group` : `${notification.name} left the group`}
                  </div>
                  <div className="text-sm">
                    {notification.type === 'join' ? 'Pending approval' : 'Successfully removed from the group'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>


        <TabsContent value="qr-code" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              {isQrCodeAvailable ? (
                <>
                  <Button onClick={() => genQRCode("12345")}>Generate QR Code</Button>
                  {qrCodeData && (
                    <div className="mt-4">
                      <QRCodeCanvas value={qrCodeData} size={256} /> {/* Render the QR code here */}
                    </div>
                  )}
                </>
              ) : (
                <p>No live event to attend for this project.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
