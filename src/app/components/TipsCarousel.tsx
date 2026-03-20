"use client";
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Lightbulb,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Rocket,
  MessageCircle,
  Calendar,
  DollarSign,
  Award,
  Brain,
  Heart,
  Shield,
  Zap,
  Eye,
  ThumbsUp,
  FileText,
  Clock,
  Star,
} from "lucide-react";

interface Tip {
  id: number;
  title: string;
  content: string;
  icon: React.ElementType;
  category: string;
}

const tips: Tip[] = [
  {
    id: 1,
    title: "Commence petit",
    content: "Teste ton idée avec un prototype simple avant d'investir du temps et des ressources.",
    icon: Rocket,
    category: "startup"
  },
  {
    id: 2,
    title: "Écoute tes utilisateurs",
    content: "Les feedbacks sont de l'or. Parle à 10 personnes avant de valider ton idée.",
    icon: MessageCircle,
    category: "validation"
  },
  {
    id: 3,
    title: "Définis ta cible",
    content: "Un produit pour tout le monde est un produit pour personne. Sois précis !",
    icon: Target,
    category: "startup"
  },
  {
    id: 4,
    title: "Valide ton marché",
    content: "Assure-toi qu'il existe une vraie demande avant de te lancer dans le développement.",
    icon: TrendingUp,
    category: "validation"
  },
  {
    id: 5,
    title: "Protège ton budget",
    content: "Établis un budget réaliste et garde une marge de sécurité de 20%.",
    icon: Shield,
    category: "ressources"
  },
  {
    id: 6,
    title: "Priorise tes tâches",
    content: "Concentre-toi sur ce qui apporte le plus de valeur à tes utilisateurs.",
    icon: CheckCircle,
    category: "ressources"
  },
  {
    id: 7,
    title: "Pitch en 30 secondes",
    content: "Si tu ne peux pas expliquer ton projet en 30 secondes, simplifie-le.",
    icon: Clock,
    category: "pitch"
  },
  {
    id: 8,
    title: "Teste ton pitch",
    content: "Entraîne-toi devant 5 personnes différentes pour affiner ton message.",
    icon: Eye,
    category: "pitch"
  },
  {
    id: 9,
    title: "L'échec enseigne",
    content: "Chaque erreur est une leçon. Documente ce que tu apprends pour progresser.",
    icon: Brain,
    category: "erreurs"
  },
  {
    id: 10,
    title: "Ne reste pas seul",
    content: "Entoure-toi d'une équipe complémentaire. Les compétences variées font la force.",
    icon: Users,
    category: "équipe"
  },
  {
    id: 11,
    title: "Communique clairement",
    content: "Une bonne communication évite 80% des problèmes en équipe.",
    icon: MessageCircle,
    category: "équipe"
  },
  {
    id: 12,
    title: "Fixe des objectifs",
    content: "Définis des jalons clairs et mesurables pour suivre ta progression.",
    icon: Target,
    category: "business-plan"
  },
  {
    id: 13,
    title: "Modèle économique",
    content: "Comment gagnes-tu de l'argent ? Réponds à cette question avant tout.",
    icon: DollarSign,
    category: "business-plan"
  },
  {
    id: 14,
    title: "MVP d'abord",
    content: "Crée un Minimum Viable Product pour tester rapidement ton concept.",
    icon: Zap,
    category: "startup"
  },
  {
    id: 15,
    title: "Itère rapidement",
    content: "Lance, mesure, apprends, améliore. Répète ce cycle le plus vite possible.",
    icon: TrendingUp,
    category: "startup"
  },
  {
    id: 16,
    title: "Valeur unique",
    content: "Quelle est ta différence ? Ton USP doit être clair et convaincant.",
    icon: Star,
    category: "validation"
  },
  {
    id: 17,
    title: "Calendrier réaliste",
    content: "Multiplie tes estimations de temps par 2. Tu seras plus réaliste.",
    icon: Calendar,
    category: "ressources"
  },
  {
    id: 18,
    title: "Reste passionné",
    content: "L'entrepreneuriat est un marathon. Ta passion sera ton meilleur carburant.",
    icon: Heart,
    category: "erreurs"
  },
  {
    id: 19,
    title: "Délègue intelligemment",
    content: "Tu ne peux pas tout faire seul. Identifie ce que d'autres font mieux.",
    icon: Users,
    category: "équipe"
  },
  {
    id: 20,
    title: "Mesure ton impact",
    content: "Définis tes KPIs dès le début pour suivre tes progrès objectivement.",
    icon: TrendingUp,
    category: "business-plan"
  },
  {
    id: 21,
    title: "Apprends des concurrents",
    content: "Analyse ce qui marche chez eux sans les copier. Inspire-toi, innove.",
    icon: Eye,
    category: "validation"
  },
  {
    id: 22,
    title: "Célèbre les victoires",
    content: "Chaque petite réussite compte. Reconnais tes progrès pour garder la motivation.",
    icon: Award,
    category: "erreurs"
  },
  {
    id: 23,
    title: "Sois flexible",
    content: "Le plan A échoue souvent. Garde l'esprit ouvert pour pivoter si nécessaire.",
    icon: Zap,
    category: "startup"
  },
  {
    id: 24,
    title: "Raconte une histoire",
    content: "Les gens achètent des émotions, pas des fonctionnalités. Crée du lien.",
    icon: Heart,
    category: "pitch"
  },
  {
    id: 25,
    title: "Attention au scope creep",
    content: "Résiste à la tentation d'ajouter trop de features. Reste focus.",
    icon: AlertCircle,
    category: "erreurs"
  },
  {
    id: 26,
    title: "Documente tout",
    content: "Tes décisions, tes apprentissages, tes processus. Ton futur toi te remerciera.",
    icon: FileText,
    category: "business-plan"
  },
  {
    id: 27,
    title: "Network activement",
    content: "Ton réseau est ta richesse. Rencontre d'autres entrepreneurs régulièrement.",
    icon: Users,
    category: "équipe"
  },
  {
    id: 28,
    title: "Gère ton énergie",
    content: "L'entrepreneuriat demande de l'endurance. Prends soin de toi.",
    icon: Heart,
    category: "erreurs"
  },
  {
    id: 29,
    title: "Feedback > Opinion",
    content: "Cherche des retours basés sur l'expérience, pas des avis théoriques.",
    icon: ThumbsUp,
    category: "validation"
  },
  {
    id: 30,
    title: "Sois patient",
    content: "Le succès prend du temps. Concentre-toi sur le progrès, pas la perfection.",
    icon: Clock,
    category: "startup"
  },
];

export function TipsCarousel() {
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    // Auto-play toutes les 30 secondes
    const interval = setInterval(() => {
      sliderRef.current?.slickNext();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // On gère l'autoplay manuellement pour plus de contrôle
    arrows: false,
    cssEase: "ease-in-out",
    adaptiveHeight: true,
  };

  return (
    <div className="tips-carousel-wrapper">
      <Slider ref={sliderRef} {...settings}>
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.id} className="px-1">
              <div className="p-3 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border border-[#4D80C6] min-h-[100px]">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FC4C00] to-[#004AAD] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-xs text-[#004AAD] font-semibold leading-tight">
                    {tip.title}
                  </p>
                </div>
                <p className="text-xs text-[#4D80C6] leading-relaxed">
                  {tip.content}
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}