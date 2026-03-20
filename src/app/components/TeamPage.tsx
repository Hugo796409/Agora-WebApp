import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Users,
  MessageSquare,
  FileText,
  Send,
  Upload,
  Download,
  Trash2,
  Plus,
  File,
  Image as ImageIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";

interface Message {
  id: string;
  author: string;
  authorInitials: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  icon: "file" | "image";
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

export function TeamPage() {
  const [messageInput, setMessageInput] = useState("");

  // Mock team members
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Alex Dupont",
      role: "Fondateur",
      initials: "AD",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: "2",
      name: "Sarah Martin",
      role: "Développeuse",
      initials: "SM",
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "3",
      name: "Thomas Bernard",
      role: "Marketing",
      initials: "TB",
      color: "from-green-600 to-emerald-600",
    },
    {
      id: "4",
      name: "Marie Dubois",
      role: "Designer",
      initials: "MD",
      color: "from-orange-600 to-red-600",
    },
  ]);

  // Mock messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      author: "Sarah Martin",
      authorInitials: "SM",
      content: "Salut l'équipe ! J'ai terminé le prototype de l'app.",
      timestamp: "10:30",
      isOwn: false,
    },
    {
      id: "2",
      author: "Agora",
      authorInitials: "AT",
      content: "Super ! On peut le tester cet après-midi ?",
      timestamp: "10:32",
      isOwn: true,
    },
    {
      id: "3",
      author: "Thomas Bernard",
      authorInitials: "TB",
      content: "J'ai préparé la stratégie marketing, je la partage dans les documents.",
      timestamp: "11:15",
      isOwn: false,
    },
    {
      id: "4",
      author: "Marie Dubois",
      authorInitials: "MD",
      content: "Les maquettes sont prêtes ! Je les upload maintenant 🎨",
      timestamp: "11:20",
      isOwn: false,
    },
  ]);

  // Mock documents
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Business_Plan_v2.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "Alex Dupont",
      uploadedAt: "Il y a 2 jours",
      icon: "file",
    },
    {
      id: "2",
      name: "Strategie_Marketing.docx",
      type: "DOCX",
      size: "856 KB",
      uploadedBy: "Thomas Bernard",
      uploadedAt: "Il y a 3 heures",
      icon: "file",
    },
    {
      id: "3",
      name: "Maquettes_App.fig",
      type: "Figma",
      size: "12.3 MB",
      uploadedBy: "Marie Dubois",
      uploadedAt: "Il y a 1 heure",
      icon: "image",
    },
    {
      id: "4",
      name: "Analyse_Marche.xlsx",
      type: "XLSX",
      size: "1.1 MB",
      uploadedBy: "Sarah Martin",
      uploadedAt: "Hier",
      icon: "file",
    },
  ]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      author: "Agora",
      authorInitials: "AT",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleUploadDocument = () => {
    toast.success("Fonctionnalité de téléchargement à venir !");
  };

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">Équipe</h1>
              <p className="text-gray-600">
                Collabore avec ton équipe et partage des documents
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Members Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Membres de l'équipe</h2>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                  {teamMembers.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Avatar className="w-10 h-10 border-2 border-gray-200">
                      <AvatarImage src="" />
                      <AvatarFallback
                        className={`bg-gradient-to-r ${member.color} text-white`}
                      >
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => toast.info("Fonctionnalité à venir")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Inviter un membre
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messagerie
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="w-4 h-4 mr-2" />
                  Documents
                </TabsTrigger>
              </TabsList>

              {/* Chat Tab */}
              <TabsContent value="chat" className="mt-0">
                <Card className="flex flex-col h-[600px]">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-medium">Groupe: Mon Équipe</h3>
                    <p className="text-sm text-gray-600">
                      {teamMembers.length} membres en ligne
                    </p>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.isOwn ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback
                            className={
                              message.isOwn
                                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                                : "bg-gray-300 text-gray-700"
                            }
                          >
                            {message.authorInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`flex flex-col ${
                            message.isOwn ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`flex items-center gap-2 mb-1 ${
                              message.isOwn ? "flex-row-reverse" : ""
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {message.author}
                            </span>
                            <span className="text-xs text-gray-500">
                              {message.timestamp}
                            </span>
                          </div>
                          <div
                            className={`inline-block p-3 rounded-lg ${
                              message.isOwn
                                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Écris un message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="min-h-[60px]"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-0">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Documents partagés</h3>
                    <Button
                      onClick={handleUploadDocument}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Uploader
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                          {doc.icon === "image" ? (
                            <ImageIcon className="w-6 h-6 text-purple-600" />
                          ) : (
                            <File className="w-6 h-6 text-purple-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">{doc.name}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.uploadedBy}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {doc.uploadedAt}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              toast.success("Téléchargement simulé !")
                            }
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.info("Document supprimé")}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {documents.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        Aucun document partagé pour le moment
                      </p>
                      <Button
                        onClick={handleUploadDocument}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Uploader le premier document
                      </Button>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}