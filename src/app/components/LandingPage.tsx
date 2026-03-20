import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Lightbulb, Rocket, Target, TrendingUp, Users, Award, CheckCircle, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { Card } from "./ui/card";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo à gauche */}
            <div className="flex items-center">
              <img 
                src="/logo1.png" alt="Agora Logo" 
                className="h-12 md:h-14 object-contain"
              />
            </div>

            {/* Navigation à droite */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/signin")}
                className="hidden md:inline-flex"
              >
                Se connecter
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6]"
              >
                Commencer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FC4C00]/10 to-[#004AAD]/10 border border-[#FC4C00]/20 text-[#004AAD] px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-[#FC4C00]" />
              <span className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Initiate Together
              </span>
            </div>
            
            {/* Titre principal */}
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Teste ton idée
              </span>
              <br />
              <span className="text-gray-900">
                de startup
              </span>
            </h1>
            
            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Apprends à construire, échouer, et rebondir
            </p>

            <p className="text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Un espace pédagogique pour les 18-25 ans où tu peux tester tes idées entrepreneuriales, 
              recevoir des feedbacks de mentors et apprendre de tes échecs en toute sécurité.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] hover:from-[#FD824D] hover:to-[#4D80C6] text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Accéder au dashboard
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 h-auto border-2"
              >
                Découvrir la plateforme
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">
              <span className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Pourquoi Agora ?
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Une plateforme conçue pour maximiser ton apprentissage entrepreneurial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 border-gray-100 hover:border-[#4D80C6] transition-all hover:shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-[#FC4C00]" />
              </div>
              <h3 className="text-2xl mb-3">Construis ton projet</h3>
              <p className="text-gray-600 leading-relaxed">
                Crée ton business plan étape par étape avec des outils guidés et intuitifs adaptés aux débutants
              </p>
            </Card>

            <Card className="p-8 border-2 border-gray-100 hover:border-[#FC4C00] transition-all hover:shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-[#004AAD]" />
              </div>
              <h3 className="text-2xl mb-3">Certification Jury</h3>
              <p className="text-gray-600 leading-relaxed">
                Obtiens une évaluation professionnelle de ton projet par un jury d'experts et un certificat officiel
              </p>
            </Card>

            <Card className="p-8 border-2 border-gray-100 hover:border-[#FD824D] transition-all hover:shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-[#FD824D]" />
              </div>
              <h3 className="text-2xl mb-3">Feedback de mentors</h3>
              <p className="text-gray-600 leading-relaxed">
                Reçois des conseils personnalisés de professionnels pour transformer tes échecs en apprentissages
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">
              <span className="bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent">
                Comment ça marche ?
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Un parcours en 4 étapes pour développer ton projet
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Crée ton projet",
                description: "Définis ton idée, ton marché cible, ton modèle économique et alloue ton budget de manière stratégique",
                icon: Lightbulb,
                color: "from-[#FC4C00] to-[#FD824D]"
              },
              {
                step: "2",
                title: "Demande la certification",
                description: "Soumets ton projet à l'évaluation d'un jury professionnel pour obtenir un score détaillé et des recommandations",
                icon: Award,
                color: "from-[#004AAD] to-[#4D80C6]"
              },
              {
                step: "3",
                title: "Reçois du feedback",
                description: "Obtiens des conseils personnalisés de mentors experts pour identifier tes forces et axes d'amélioration",
                icon: MessageSquare,
                color: "from-[#FD824D] to-[#FC4C00]"
              },
              {
                step: "4",
                title: "Itère et améliore",
                description: "Applique les apprentissages, ajuste ton projet et recommence le cycle jusqu'à atteindre l'excellence",
                icon: TrendingUp,
                color: "from-[#4D80C6] to-[#004AAD]"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-6 md:p-8 border-2 border-gray-100 hover:border-[#4D80C6] transition-all hover:shadow-lg">
                  <div className="flex gap-6 items-start">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center flex-shrink-0 text-2xl font-bold shadow-lg`}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <Icon className="w-6 h-6 text-[#004AAD] mt-1" />
                        <h3 className="text-2xl">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100%", label: "Gratuit", icon: CheckCircle },
              { value: "80%", label: "Seuil de réussite", icon: Target },
              { value: "∞", label: "Projets illimités", icon: Rocket },
              { value: "24/7", label: "Disponible", icon: Sparkles }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mb-4 inline-block">
                    <Icon className="w-8 h-8 text-[#FC4C00] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FC4C00] to-[#004AAD] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FC4C00] to-[#004AAD]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Prêt à transformer ton idée en projet concret ?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Rejoins Agora et commence ton aventure entrepreneuriale dès aujourd'hui
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="bg-white text-[#004AAD] hover:bg-gray-100 text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-all"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Lancer mon premier projet
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <img 
                src="/logo1.png" alt="Agora Logo" 
                className="h-10 object-contain opacity-80"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2026 Agora - Initiate Together
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Pour les jeunes entrepreneurs de 18-25 ans
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}