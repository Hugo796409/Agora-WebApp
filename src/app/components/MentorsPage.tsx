import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  MessageCircle,
  Send,
  Star,
  Briefcase,
  Calendar,
  CheckCircle,
  Lock,
  Crown,
} from "lucide-react";
import { toast } from "sonner";
import { useUserPlan } from "./UserPlanContext";
import { useNavigate } from "react-router";

interface Mentor {
  id: string;
  name: string;
  initials: string;
  expertise: string;
  experience: string;
  rating: number;
  availability: "disponible" | "occupé" | "absent";
  color: string;
}

interface ChatMessage {
  id: string;
  mentorId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export function MentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  const { hasMentorsAccess, currentPlan } = useUserPlan();
  const navigate = useNavigate();

  // Si l'utilisateur n'a pas accès aux mentors, afficher un écran d'upgrade
  if (!hasMentorsAccess()) {
    return (
      <div className="h-full">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl">Mentors</h1>
                <p className="text-gray-600">
                  Discute en 1-to-1 avec des experts pour améliorer tes projets
                </p>
              </div>
            </div>
          </div>

          {/* Upgrade Card */}
          <Card className="p-12 text-center bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 border-2 border-purple-200">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl mb-4 flex items-center justify-center gap-2">
                Fonctionnalité Premium
                <Crown className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
                L'accès aux mentors est une fonctionnalité exclusive réservée aux membres <strong>Premium</strong>. 
                Passe au forfait Premium pour discuter en 1-to-1 avec des experts et booster tes projets !
              </p>

              <div className="bg-white rounded-lg p-6 mb-8 border-2 border-purple-100">
                <h3 className="text-xl mb-4 font-medium">Avec le forfait Premium, tu débloques :</h3>
                <ul className="space-y-3 text-left max-w-xl mx-auto">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Accès illimité aux <strong>4 mentors experts</strong> dans différents domaines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Messagerie en temps réel pour des <strong>conseils personnalisés</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Projets illimités</strong> pour tester toutes tes idées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Accès à la <strong>communauté</strong> et aux 6 chats thématiques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Toutes les fonctionnalités pour <strong>réussir ton projet</strong></span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => navigate("/pricing")}
                size="lg"
                className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6] text-white px-8 py-6 text-lg"
              >
                <Crown className="w-5 h-5 mr-2" />
                Passer au Premium
              </Button>

              <p className="text-sm text-gray-600 mt-4">
                Plan actuel : <Badge variant="outline" className="ml-1">{currentPlan.plan === "free" ? "Gratuit" : "Basic"}</Badge>
              </p>
            </div>
          </Card>

          {/* Preview des mentors (floutés) */}
          <div className="mt-8">
            <h3 className="text-xl mb-4 text-center text-gray-700">Aperçu des mentors disponibles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 opacity-50 blur-sm pointer-events-none">
              {[
                { name: "Sophie Martin", expertise: "Business & Stratégie", color: "from-purple-600 to-pink-600" },
                { name: "Thomas Dubois", expertise: "Marketing Digital", color: "from-blue-600 to-cyan-600" },
                { name: "Marie Laurent", expertise: "Tech & Innovation", color: "from-green-600 to-emerald-600" },
                { name: "Pierre Bernard", expertise: "Finance & Levée", color: "from-orange-600 to-red-600" },
              ].map((mentor, index) => (
                <Card key={index} className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-16 h-16 mb-3">
                      <AvatarFallback className={`bg-gradient-to-r ${mentor.color} text-white`}>
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium mb-1">{mentor.name}</p>
                    <p className="text-xs text-gray-600">{mentor.expertise}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      Disponible
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mock mentors
  const [mentors] = useState<Mentor[]>([
    {
      id: "1",
      name: "Sophie Martin",
      initials: "SM",
      expertise: "Business & Stratégie",
      experience: "15 ans d'expérience",
      rating: 4.9,
      availability: "disponible",
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "2",
      name: "Thomas Dubois",
      initials: "TD",
      expertise: "Marketing Digital",
      experience: "10 ans d'expérience",
      rating: 4.7,
      availability: "disponible",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: "3",
      name: "Marie Laurent",
      initials: "ML",
      expertise: "Tech & Innovation",
      experience: "12 ans d'expérience",
      rating: 4.8,
      availability: "occupé",
      color: "from-green-600 to-emerald-600",
    },
    {
      id: "4",
      name: "Pierre Bernard",
      initials: "PB",
      expertise: "Finance & Levée de fonds",
      experience: "20 ans d'expérience",
      rating: 5.0,
      availability: "absent",
      color: "from-orange-600 to-red-600",
    },
  ]);

  // Mock messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      mentorId: "1",
      content:
        "Bonjour ! J'ai regardé ton projet EcoBox. C'est une très belle idée avec un vrai potentiel.",
      timestamp: "10:30",
      isOwn: false,
    },
    {
      id: "2",
      mentorId: "1",
      content: "Merci beaucoup ! J'ai quelques questions sur le modèle économique.",
      timestamp: "10:32",
      isOwn: true,
    },
    {
      id: "3",
      mentorId: "1",
      content:
        "Bien sûr, je t'écoute. N'hésite pas à me poser toutes tes questions.",
      timestamp: "10:33",
      isOwn: false,
    },
    {
      id: "4",
      mentorId: "1",
      content:
        "Comment puis-je estimer le coût d'acquisition client pour un service comme le mien ?",
      timestamp: "10:35",
      isOwn: true,
    },
    {
      id: "5",
      mentorId: "1",
      content:
        "Excellente question ! Pour un service de livraison éco-responsable, je te conseille de regarder trois choses : 1) Le coût de tes campagnes marketing, 2) Le taux de conversion de tes visiteurs en clients, 3) La lifetime value de chaque client.",
      timestamp: "10:37",
      isOwn: false,
    },
  ]);

  const currentMentor = mentors.find((m) => m.id === selectedMentor);
  const currentMessages = messages.filter((m) => m.mentorId === selectedMentor);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedMentor) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      mentorId: selectedMentor,
      content: messageInput,
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");

    // Simulate mentor response
    setTimeout(() => {
      const mentorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        mentorId: selectedMentor,
        content:
          "Merci pour ton message ! Je vais y réfléchir et te donner des conseils personnalisés.",
        timestamp: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: false,
      };
      setMessages((prev) => [...prev, mentorResponse]);
    }, 2000);
  };

  const getAvailabilityColor = (availability: Mentor["availability"]) => {
    switch (availability) {
      case "disponible":
        return "bg-green-500";
      case "occupé":
        return "bg-amber-500";
      case "absent":
        return "bg-gray-400";
    }
  };

  const getAvailabilityLabel = (availability: Mentor["availability"]) => {
    switch (availability) {
      case "disponible":
        return "Disponible";
      case "occupé":
        return "Occupé";
      case "absent":
        return "Absent";
    }
  };

  const handleMentorSelection = (mentorId: string) => {
    setSelectedMentor(mentorId);
  };

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl">Mentors</h1>
              <p className="text-gray-600">
                Discute en 1-to-1 avec des experts pour améliorer tes projets
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mentors List */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Mentors disponibles</h2>

              <div className="space-y-3">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMentor === mentor.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                    onClick={() => handleMentorSelection(mentor.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12 border-2 border-white">
                          <AvatarImage src="" />
                          <AvatarFallback
                            className={`bg-gradient-to-r ${mentor.color} text-white`}
                          >
                            {mentor.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(
                            mentor.availability
                          )}`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm mb-1">{mentor.name}</p>
                        <p className="text-xs text-gray-600 mb-2">
                          {mentor.expertise}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">
                              {mentor.rating}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {mentor.experience}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            mentor.availability === "disponible"
                              ? "border-green-300 text-green-700 bg-green-50"
                              : mentor.availability === "occupé"
                              ? "border-amber-300 text-amber-700 bg-amber-50"
                              : "border-gray-300 text-gray-700 bg-gray-50"
                          }`}
                        >
                          {getAvailabilityLabel(mentor.availability)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {currentMentor ? (
              <Card className="flex flex-col h-[700px]">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarImage src="" />
                        <AvatarFallback
                          className={`bg-gradient-to-r ${currentMentor.color} text-white`}
                        >
                          {currentMentor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{currentMentor.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Briefcase className="w-3 h-3" />
                          {currentMentor.expertise}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{currentMentor.rating}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          currentMentor.availability === "disponible"
                            ? "border-green-300 text-green-700 bg-green-50"
                            : currentMentor.availability === "occupé"
                            ? "border-amber-300 text-amber-700 bg-amber-50"
                            : "border-gray-300 text-gray-700 bg-gray-50"
                        }`}
                      >
                        {getAvailabilityLabel(currentMentor.availability)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.map((message) => (
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
                              : `bg-gradient-to-r ${currentMentor.color} text-white`
                          }
                        >
                          {message.isOwn ? "AT" : currentMentor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex flex-col max-w-[70%] ${
                          message.isOwn ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 mb-1 ${
                            message.isOwn ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span className="text-sm font-medium">
                            {message.isOwn ? "Agora" : currentMentor.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {message.timestamp}
                          </span>
                        </div>
                        <div
                          className={`inline-block p-3 rounded-lg ${
                            message.isOwn
                              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none"
                              : "bg-gray-100 text-gray-900 rounded-bl-none"
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
                      placeholder={`Écris un message à ${currentMentor.name}...`}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[80px]"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Appuie sur Entrée pour envoyer, Shift+Entrée pour une
                    nouvelle ligne
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl mb-2">Sélectionne un mentor</h3>
                <p className="text-gray-600">
                  Choisis un mentor dans la liste pour commencer une conversation
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Info Card */}
        <Card className="p-6 mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Conseils pour échanger avec un mentor</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    <strong>Sois précis</strong> dans tes questions pour obtenir des
                    réponses ciblées
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    <strong>Partage le contexte</strong> de ton projet pour des
                    conseils personnalisés
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    <strong>Prends des notes</strong> sur les conseils reçus pour les
                    appliquer ensuite
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    <strong>Donne du feedback</strong> sur l'évolution de ton projet
                    après avoir appliqué les conseils
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}