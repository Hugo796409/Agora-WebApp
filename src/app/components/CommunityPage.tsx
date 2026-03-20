import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  Users,
  Code,
  TrendingUp,
  Palette,
  MessageSquare,
  Send,
  Hash,
  UserPlus,
  Sparkles,
  Briefcase,
  Lightbulb,
  DollarSign,
  Lock,
  Crown,
} from "lucide-react";
import { useUserPlan } from "./UserPlanContext"; // v2.0 with community access

interface Community {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  members: number;
  isJoined: boolean;
  category: string;
}

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  communityId: string;
}

const communities: Community[] = [
  {
    id: "dev",
    name: "Développeurs",
    description: "Échange autour de la tech, du code et des meilleures pratiques de développement",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    members: 156,
    isJoined: false,
    category: "Technique",
  },
  {
    id: "marketing",
    name: "Marketing & Growth",
    description: "Stratégies marketing, acquisition, growth hacking et communication",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    members: 203,
    isJoined: false,
    category: "Business",
  },
  {
    id: "design",
    name: "Design & UX",
    description: "Design produit, UX/UI, branding et identité visuelle",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    members: 128,
    isJoined: false,
    category: "Créatif",
  },
  {
    id: "business",
    name: "Business Model",
    description: "Modèles économiques, stratégie, business plan et levées de fonds",
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
    members: 189,
    isJoined: false,
    category: "Business",
  },
  {
    id: "fundraising",
    name: "Financement",
    description: "Levées de fonds, investisseurs, subventions et aides",
    icon: DollarSign,
    color: "from-yellow-500 to-orange-500",
    members: 142,
    isJoined: false,
    category: "Finance",
  },
  {
    id: "innovation",
    name: "Innovation & Idéation",
    description: "Brainstorming, nouvelles idées et tendances émergentes",
    icon: Lightbulb,
    color: "from-indigo-500 to-blue-500",
    members: 167,
    isJoined: false,
    category: "Innovation",
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    author: "Sophie Martin",
    avatar: "SM",
    content: "Hello ! Quelqu'un a de l'expérience avec React Native pour développer une app mobile ?",
    timestamp: "Il y a 5 min",
    communityId: "dev",
  },
  {
    id: "2",
    author: "Thomas Dubois",
    avatar: "TD",
    content: "Oui ! J'ai développé 2 apps avec RN. N'hésite pas si tu as des questions 🚀",
    timestamp: "Il y a 3 min",
    communityId: "dev",
  },
  {
    id: "3",
    author: "Marie Lefebvre",
    avatar: "ML",
    content: "Je recommande aussi d'utiliser Expo pour démarrer plus rapidement !",
    timestamp: "Il y a 1 min",
    communityId: "dev",
  },
  {
    id: "4",
    author: "Lucas Bernard",
    avatar: "LB",
    content: "Quelqu'un a testé des stratégies de growth hacking efficaces pour une SaaS B2B ?",
    timestamp: "Il y a 15 min",
    communityId: "marketing",
  },
  {
    id: "5",
    author: "Emma Rousseau",
    avatar: "ER",
    content: "Le cold emailing fonctionne super bien si c'est bien ciblé. J'ai eu 20% de taux de réponse !",
    timestamp: "Il y a 10 min",
    communityId: "marketing",
  },
];

export function CommunityPage() {
  const navigate = useNavigate();
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const { hasCommunityAccess, currentPlan } = useUserPlan();

  // Rediriger vers la page de pricing si l'utilisateur n'a pas accès
  useEffect(() => {
    if (!hasCommunityAccess()) {
      navigate("/pricing");
    }
  }, [hasCommunityAccess, navigate]);

  // Si l'utilisateur n'a pas accès, afficher un message de verrouillage
  if (!hasCommunityAccess()) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-2 border-[#FC4C00]/20">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl mb-3">Communauté Premium</h2>
          <p className="text-gray-600 mb-6">
            La communauté est réservée aux membres Basic et Premium. Upgrade ton plan pour accéder aux échanges avec d'autres entrepreneurs !
          </p>
          <Button
            onClick={() => navigate("/pricing")}
            className="w-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
          >
            <Crown className="w-4 h-4 mr-2" />
            Voir les plans
          </Button>
        </Card>
      </div>
    );
  }

  const handleJoinCommunity = (communityId: string) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(joinedCommunities.filter((id) => id !== communityId));
    } else {
      setJoinedCommunities([...joinedCommunities, communityId]);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedCommunity) return;
    // Logique d'envoi de message (à implémenter)
    setNewMessage("");
  };

  const selectedCommunityData = communities.find((c) => c.id === selectedCommunity);
  const communityMessages = mockMessages.filter((m) => m.communityId === selectedCommunity);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au Dashboard
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Communauté Agora
              </h1>
              <p className="text-gray-600">
                Échange avec d'autres entrepreneurs sur des sujets spécifiques
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des communautés */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 bg-gradient-to-r from-orange-50 to-blue-50 border-2 border-[#FC4C00]/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#FC4C00]" />
                <h3 className="font-semibold">Tes communautés</h3>
              </div>
              <p className="text-sm text-gray-600">
                {joinedCommunities.length} communauté{joinedCommunities.length > 1 ? "s" : ""} rejoint{joinedCommunities.length > 1 ? "es" : "e"}
              </p>
            </Card>

            {communities.map((community) => {
              const Icon = community.icon;
              const isJoined = joinedCommunities.includes(community.id);

              return (
                <Card
                  key={community.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg border-2 ${
                    selectedCommunity === community.id
                      ? "border-[#FC4C00] bg-gradient-to-br from-orange-50 to-blue-50"
                      : "border-gray-200 hover:border-[#4D80C6]"
                  }`}
                  onClick={() => setSelectedCommunity(community.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${community.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{community.name}</h3>
                        {isJoined && (
                          <Badge className="bg-green-100 text-green-800 text-xs border-0">
                            Membre
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {community.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {community.members} membres
                        </span>
                        <Button
                          size="sm"
                          variant={isJoined ? "outline" : "default"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinCommunity(community.id);
                          }}
                          className={
                            isJoined
                              ? "text-xs py-1 px-2 h-auto"
                              : "text-xs py-1 px-2 h-auto bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
                          }
                        >
                          {isJoined ? (
                            <>
                              <UserPlus className="w-3 h-3 mr-1" />
                              Quitter
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-3 h-3 mr-1" />
                              Rejoindre
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Zone de chat */}
          <div className="lg:col-span-2">
            {selectedCommunity && selectedCommunityData ? (
              <Card className="h-[calc(100vh-250px)] flex flex-col border-2 border-gray-200">
                {/* Header du chat */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-blue-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedCommunityData.color} flex items-center justify-center`}>
                      {(() => {
                        const Icon = selectedCommunityData.icon;
                        return <Icon className="w-5 h-5 text-white" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <h3 className="font-semibold">{selectedCommunityData.name}</h3>
                      </div>
                      <p className="text-xs text-gray-600">
                        {selectedCommunityData.members} membres • {selectedCommunityData.category}
                      </p>
                    </div>
                    {!joinedCommunities.includes(selectedCommunity) && (
                      <Button
                        onClick={() => handleJoinCommunity(selectedCommunity)}
                        className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Rejoindre
                      </Button>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {joinedCommunities.includes(selectedCommunity) ? (
                    communityMessages.length > 0 ? (
                      communityMessages.map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                            {message.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{message.author}</span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700">{message.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Aucun message pour le moment</p>
                        <p className="text-sm text-gray-400">Sois le premier à lancer la discussion !</p>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Card className="p-8 text-center max-w-md border-2 border-[#FC4C00]/20 bg-gradient-to-br from-orange-50 to-blue-50">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center mx-auto mb-4">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl mb-2">Rejoins la communauté</h3>
                        <p className="text-gray-600 mb-4">
                          Pour participer aux discussions, tu dois d'abord rejoindre cette communauté
                        </p>
                        <Button
                          onClick={() => handleJoinCommunity(selectedCommunity)}
                          className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Rejoindre maintenant
                        </Button>
                      </Card>
                    </div>
                  )}
                </div>

                {/* Input de message */}
                {joinedCommunities.includes(selectedCommunity) && (
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-3">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écris ton message..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="h-[calc(100vh-250px)] flex items-center justify-center border-2 border-gray-200">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-[#004AAD]" />
                  </div>
                  <h3 className="text-xl mb-2">Sélectionne une communauté</h3>
                  <p className="text-gray-600">
                    Choisis une communauté dans la liste pour commencer à discuter
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}