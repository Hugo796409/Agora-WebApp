import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  ArrowLeft,
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Rocket,
  Trophy,
  CreditCard,
  Users,
  Target,
  Award,
  Zap,
  BookOpen,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "general",
    title: "Général",
    icon: HelpCircle,
    color: "from-blue-500 to-cyan-500",
    questions: [
      {
        question: "Qu'est-ce qu'Agora - Initiate Together ?",
        answer: "Agora est une plateforme pédagogique destinée aux jeunes de 18-25 ans qui souhaitent tester leurs idées de startup dans un environnement sécurisé. C'est un bac à sable entrepreneurial où l'échec est un outil d'apprentissage et non une fin en soi."
      },
      {
        question: "Pour qui est destiné Agora ?",
        answer: "Agora s'adresse aux jeunes entrepreneurs de 18 à 25 ans qui ont des idées de startup et veulent les tester sans risque financier réel. Que tu sois étudiant, en recherche d'emploi ou jeune actif, si tu as l'esprit entrepreneurial, Agora est fait pour toi !"
      },
      {
        question: "Comment fonctionne le concept de 'bac à sable' ?",
        answer: "Le bac à sable est un environnement de simulation où tu peux créer et tester tes projets sans conséquences financières réelles. Tu travailles sur des budgets virtuels, des ressources simulées, et tu reçois des feedbacks concrets qui t'aident à améliorer ton projet."
      },
      {
        question: "Mes données sont-elles sécurisées ?",
        answer: "Oui, la sécurité de tes données est notre priorité. Toutes les informations sont chiffrées et stockées de manière sécurisée. Nous ne partageons jamais tes données personnelles avec des tiers sans ton consentement explicite."
      },
      {
        question: "Puis-je utiliser Agora sur mobile ?",
        answer: "Oui ! Agora est entièrement responsive et optimisé pour une utilisation sur smartphone et tablette. Tu peux gérer tes projets, consulter tes feedbacks et interagir avec ta communauté depuis n'importe quel appareil."
      }
    ]
  },
  {
    id: "projects",
    title: "Projets & Création",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    questions: [
      {
        question: "Combien de projets puis-je créer ?",
        answer: "Cela dépend de ton plan : le plan Free permet 1 projet actif, le plan Basic permet 5 projets actifs, et le plan Premium offre un nombre illimité de projets. Tu peux archiver les anciens projets pour en créer de nouveaux."
      },
      {
        question: "Qu'est-ce qu'un 'gate' ?",
        answer: "Un gate est une étape clé dans la création de ton entreprise. Agora propose 10 gates qui représentent les 10 étapes essentielles de la création d'une startup, avec un total de 41 tâches à accomplir. Chaque gate validé te rapproche de la certification finale."
      },
      {
        question: "Dois-je compléter tous les gates ?",
        answer: "Oui, pour accéder à la certification jury, tu dois avoir complété les 10 gates. C'est une exigence pédagogique qui garantit que tu as bien parcouru toutes les étapes importantes de la création d'entreprise."
      },
      {
        question: "Puis-je travailler en équipe sur un projet ?",
        answer: "Absolument ! Agora encourage le travail d'équipe. Tu peux inviter des membres dans ton équipe, utiliser la messagerie de groupe, et collaborer sur les différentes tâches. C'est une excellente façon d'apprendre à gérer une équipe entrepreneuriale."
      },
      {
        question: "Que se passe-t-il si mon projet échoue au crash test ?",
        answer: "L'échec au crash test n'est pas une fin mais un début ! Tu reçois des feedbacks détaillés sur les points à améliorer. Tu peux ensuite itérer, modifier ton business plan, ajuster tes ressources et repasser le crash test. L'objectif est d'apprendre de chaque échec."
      },
      {
        question: "Puis-je supprimer un projet ?",
        answer: "Oui, tu peux archiver ou supprimer un projet à tout moment depuis la page de détail du projet. Attention : cette action est définitive et toutes les données du projet seront perdues."
      }
    ]
  },
  {
    id: "certification",
    title: "Certification Jury",
    icon: Award,
    color: "from-purple-500 to-pink-500",
    questions: [
      {
        question: "Qu'est-ce que la certification jury ?",
        answer: "La certification jury est une évaluation professionnelle de ton projet par un panel d'experts et mentors. C'est l'étape finale qui valide la qualité de ton travail et délivre un certificat reconnu attestant de tes compétences entrepreneuriales."
      },
      {
        question: "Pourquoi la certification coûte-t-elle 49,99€ ?",
        answer: "La certification implique la mobilisation de mentors professionnels qui prennent le temps d'évaluer ton projet en détail. Ce tarif permet de rémunérer équitablement leur expertise et leur temps, tout en restant accessible pour les jeunes entrepreneurs."
      },
      {
        question: "Que faire si je ne réussis pas la certification ?",
        answer: "Si tu ne passes pas la certification, tu reçois un feedback détaillé sur les points à améliorer. Tu peux travailler sur ces améliorations et repasser la certification. Note que chaque passage nécessite un nouveau paiement de 49,99€."
      },
      {
        question: "Combien de temps prend l'évaluation ?",
        answer: "L'évaluation de ton projet par le jury prend généralement entre 5 et 7 jours ouvrés. Tu seras notifié par email dès que les résultats seront disponibles."
      },
      {
        question: "Le certificat est-il reconnu ?",
        answer: "Oui, le certificat Agora est reconnu par nos partenaires institutionnels et peut être valorisé sur ton CV ou LinkedIn. Il atteste de ta capacité à mener un projet entrepreneurial de A à Z."
      }
    ]
  },
  {
    id: "pricing",
    title: "Tarifs & Abonnements",
    icon: CreditCard,
    color: "from-green-500 to-teal-500",
    questions: [
      {
        question: "Quelle est la différence entre les plans Free, Basic et Premium ?",
        answer: "Free (0€) : 1 projet, fonctionnalités basiques. Basic (10€/mois) : 5 projets, feedback mentors, certification incluse, templates. Premium (50€/mois) : projets illimités, coaching 1-to-1, support 24/7, accès prioritaire, certifications illimitées."
      },
      {
        question: "Puis-je changer de plan à tout moment ?",
        answer: "Oui, tu peux upgrader ou downgrader ton plan à tout moment depuis la page Pricing. Les changements prennent effet immédiatement. En cas de downgrade, le montant sera ajusté au prorata sur ton prochain paiement."
      },
      {
        question: "Y a-t-il un engagement minimum ?",
        answer: "Non, tous nos plans sont sans engagement. Tu peux résilier à tout moment. Nous proposons également une garantie satisfait ou remboursé de 14 jours sur tous les plans payants."
      },
      {
        question: "Quels sont les moyens de paiement acceptés ?",
        answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et les virements SEPA. Tous les paiements sont sécurisés via notre partenaire Stripe."
      },
      {
        question: "Y a-t-il des réductions pour les étudiants ?",
        answer: "Oui ! Les étudiants bénéficient de 20% de réduction sur les plans Basic et Premium. Il suffit de nous envoyer une copie de ta carte étudiante à support@agora-initiate.com."
      },
      {
        question: "La certification jury est-elle incluse dans les plans ?",
        answer: "La certification est incluse dans le plan Basic (1 certification) et illimitée dans le plan Premium. Pour le plan Free, chaque certification coûte 49,99€."
      }
    ]
  },
  {
    id: "mentors",
    title: "Mentors & Feedback",
    icon: Users,
    color: "from-indigo-500 to-blue-500",
    questions: [
      {
        question: "Comment fonctionnent les feedbacks des mentors ?",
        answer: "Après chaque crash test ou étape importante, tu reçois des feedbacks personnalisés de mentors expérimentés. Ces feedbacks pointent tes points forts, tes axes d'amélioration et te donnent des conseils concrets pour faire progresser ton projet."
      },
      {
        question: "Qui sont les mentors ?",
        answer: "Nos mentors sont des entrepreneurs expérimentés, des experts en création d'entreprise, des consultants en business development et des professionnels de l'accompagnement entrepreneurial. Ils sont tous vérifiés et formés à la pédagogie Agora."
      },
      {
        question: "Puis-je choisir mon mentor ?",
        answer: "Oui, tu peux parcourir les profils des mentors disponibles et envoyer une demande de mentorat. Les abonnés Premium ont un accès prioritaire et peuvent réserver des sessions de coaching 1-to-1."
      },
      {
        question: "Combien de temps pour recevoir un feedback ?",
        answer: "Les feedbacks communautaires arrivent généralement en 24-48h. Les feedbacks de mentors prennent entre 3 et 5 jours. Les abonnés Premium bénéficient d'un délai réduit de 24h maximum."
      },
      {
        question: "Comment contacter un mentor directement ?",
        answer: "Tu peux utiliser la messagerie intégrée sur la page Mentors. Les messages sont privés et sécurisés. Les réponses arrivent généralement en moins de 48h."
      }
    ]
  },
  {
    id: "gamification",
    title: "Gamification & Progression",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    questions: [
      {
        question: "Comment fonctionne le système de XP et de niveaux ?",
        answer: "Tu gagnes de l'XP en accomplissant des actions : créer un projet (+50 XP), compléter un gate (+100 XP), obtenir une certification (+500 XP), etc. Plus tu accumules d'XP, plus ton niveau augmente. Chaque niveau débloque de nouvelles fonctionnalités."
      },
      {
        question: "Qu'est-ce que le système de badges ?",
        answer: "Les badges récompensent tes accomplissements : Premier Pas, Architecte, Certifié, Champion, etc. Certains badges se débloquent automatiquement, d'autres nécessitent des actions spécifiques. Collectionne-les tous pour montrer ton expertise !"
      },
      {
        question: "Comment fonctionne le 'No Zero Day' ?",
        answer: "Le No Zero Day est un système de streak qui t'encourage à être productif chaque jour. Chaque jour où tu accomplis au moins une action sur Agora, ton streak augmente. Attention : un jour d'inactivité remet le compteur à zéro !"
      },
      {
        question: "À quoi servent les points XP ?",
        answer: "Les points XP mesurent ta progression globale et déterminent ton niveau. Plus ton niveau est élevé, plus tu as accès à des fonctionnalités avancées, des badges exclusifs et une meilleure visibilité dans la communauté."
      },
      {
        question: "Puis-je perdre des badges ou des niveaux ?",
        answer: "Non, les badges et niveaux acquis sont définitifs. Seul le streak 'No Zero Day' peut être perdu en cas d'inactivité. Tes accomplissements restent pour toujours dans ton profil."
      }
    ]
  },
  {
    id: "support",
    title: "Support & Aide",
    icon: MessageCircle,
    color: "from-pink-500 to-rose-500",
    questions: [
      {
        question: "Comment contacter le support ?",
        answer: "Tu peux nous contacter par email à support@agora-initiate.com, via la messagerie intégrée, ou par le formulaire de contact. Les abonnés Premium bénéficient d'un support prioritaire avec réponse garantie sous 4h."
      },
      {
        question: "Quels sont les horaires du support ?",
        answer: "Notre support est disponible du lundi au vendredi de 9h à 18h (heure de Paris). Les abonnés Premium bénéficient d'un support 24/7 y compris les weekends."
      },
      {
        question: "J'ai trouvé un bug, que faire ?",
        answer: "Merci de nous aider à améliorer Agora ! Envoie-nous un email détaillé à bugs@agora-initiate.com avec des captures d'écran si possible. Nous traitons tous les bugs en priorité."
      },
      {
        question: "Comment suggérer une nouvelle fonctionnalité ?",
        answer: "Nous adorons les suggestions ! Utilise notre formulaire de feedback ou écris-nous à ideas@agora-initiate.com. Les meilleures idées sont implémentées et leurs auteurs sont crédités."
      },
      {
        question: "Proposez-vous des formations ou tutoriels ?",
        answer: "Oui, nous proposons une bibliothèque de tutoriels vidéo, des guides PDF téléchargeables et des webinaires mensuels gratuits pour tous les utilisateurs. Les abonnés Premium ont accès à des masterclasses exclusives."
      }
    ]
  }
];

export function FAQPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter questions based on search and category
  const filteredCategories = faqCategories
    .map(category => ({
      ...category,
      questions: category.questions.filter(q =>
        searchQuery === "" ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category =>
      (selectedCategory === null || category.id === selectedCategory) &&
      category.questions.length > 0
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au Dashboard
          </Button>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Centre d'Aide
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Trouve rapidement les réponses à tes questions sur Agora
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-[#FC4C00] focus:outline-none text-base"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-gradient-to-r from-[#FC4C00] to-[#004AAD]" : ""}
            >
              Toutes
            </Button>
            {faqCategories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-gradient-to-r from-[#FC4C00] to-[#004AAD]" : ""}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {filteredCategories.length === 0 ? (
          <Card className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-600 mb-6">
              Essaie avec d'autres mots-clés ou parcours les catégories
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              variant="outline"
            >
              Réinitialiser la recherche
            </Button>
          </Card>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map(category => {
              const Icon = category.icon;
              return (
                <div key={category.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl">{category.title}</h2>
                      <p className="text-sm text-gray-600">
                        {category.questions.length} question{category.questions.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, index) => (
                      <AccordionItem
                        key={`${category.id}-${index}`}
                        value={`${category.id}-${index}`}
                        className="border-2 border-gray-200 rounded-lg px-6 hover:border-[#4D80C6] transition-colors bg-white"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="text-base pr-4">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 pb-6 leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Card className="p-8 bg-white">
            <div className="text-center mb-6">
              <MessageCircle className="w-12 h-12 text-[#FC4C00] mx-auto mb-4" />
              <h3 className="text-2xl mb-2">Tu n'as pas trouvé de réponse ?</h3>
              <p className="text-gray-600 max-w-xl mx-auto">
                Notre équipe est là pour t'aider ! Contacte-nous et nous te répondrons dans les plus brefs délais.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-gray-200">
                <Mail className="w-8 h-8 text-[#004AAD] mb-2" />
                <p className="text-sm font-medium mb-1">Email</p>
                <a href="mailto:support@agora-initiate.com" className="text-xs text-[#FC4C00] hover:underline">
                  support@agora-initiate.com
                </a>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-white rounded-lg border border-gray-200">
                <MessageCircle className="w-8 h-8 text-[#FC4C00] mb-2" />
                <p className="text-sm font-medium mb-1">Chat en direct</p>
                <p className="text-xs text-gray-600">Lun-Ven, 9h-18h</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-gray-200">
                <Users className="w-8 h-8 text-[#004AAD] mb-2" />
                <p className="text-sm font-medium mb-1">Communauté</p>
                <p className="text-xs text-gray-600">Forum & Discord</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => navigate("/mentors")}
                className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contacter un mentor
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/team")}
                className="border-[#004AAD] text-[#004AAD] hover:bg-[#004AAD] hover:text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Rejoindre la communauté
              </Button>
            </div>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card
              className="p-4 text-center cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#FC4C00]"
              onClick={() => navigate("/pricing")}
            >
              <CreditCard className="w-8 h-8 text-[#FC4C00] mx-auto mb-2" />
              <p className="text-sm font-medium">Tarifs</p>
            </Card>
            <Card
              className="p-4 text-center cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#004AAD]"
              onClick={() => navigate("/achievements")}
            >
              <Award className="w-8 h-8 text-[#004AAD] mx-auto mb-2" />
              <p className="text-sm font-medium">Badges</p>
            </Card>
            <Card
              className="p-4 text-center cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#FC4C00]"
              onClick={() => navigate("/create-project")}
            >
              <Rocket className="w-8 h-8 text-[#FC4C00] mx-auto mb-2" />
              <p className="text-sm font-medium">Créer un projet</p>
            </Card>
            <Card
              className="p-4 text-center cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#004AAD]"
              onClick={() => navigate("/dashboard")}
            >
              <Target className="w-8 h-8 text-[#004AAD] mx-auto mb-2" />
              <p className="text-sm font-medium">Dashboard</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
