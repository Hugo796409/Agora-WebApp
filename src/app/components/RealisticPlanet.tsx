import { motion } from "motion/react";
import { Lock, CheckCircle2, Star } from "lucide-react";

interface RealisticPlanetProps {
  planet: {
    name: string;
    colors: { primary: string; secondary: string; surface: string };
  };
  stepIndex: number;
  stepProgress: {
    completed: number;
    total: number;
    isCompleted: boolean;
  };
  isAccessible: boolean;
  onClick: () => void;
}

export function RealisticPlanet({
  planet,
  stepIndex,
  stepProgress,
  isAccessible,
  onClick,
}: RealisticPlanetProps) {
  return (
    <div className="flex-shrink-0 relative z-10">
      <motion.button
        onClick={onClick}
        disabled={!isAccessible}
        whileHover={isAccessible ? { scale: 1.1 } : {}}
        whileTap={isAccessible ? { scale: 0.95 } : {}}
        className={`w-40 h-40 rounded-full shadow-2xl relative overflow-hidden transition-all ${
          !isAccessible ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${planet.colors.secondary}E6, ${planet.colors.primary}CC 45%, ${planet.colors.surface}B3 75%, #000000F0)`,
          boxShadow: `0 12px 40px ${planet.colors.primary}50, inset -12px -12px 30px rgba(0,0,0,0.8), inset 6px 6px 20px ${planet.colors.secondary}30`,
        }}
      >
        {/* Rotation subtile de la planète */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {/* Texture de surface ultra-réaliste selon la planète */}
          {planet.name === "Mercure" && (
            // Surface criblée de cratères comme la Lune
            <>
              {/* Grands cratères */}
              <div className="absolute top-4 left-6 w-10 h-10 rounded-full bg-black/50 blur-[2px]" />
              <div className="absolute top-14 right-8 w-14 h-14 rounded-full bg-black/45 blur-[2px]" />
              <div className="absolute bottom-10 left-10 w-8 h-8 rounded-full bg-black/50 blur-[2px]" />
              <div className="absolute bottom-6 right-12 w-12 h-12 rounded-full bg-black/40 blur-[2px]" />
              <div className="absolute top-20 left-20 w-9 h-9 rounded-full bg-black/45 blur-[2px]" />
              {/* Cratères moyens */}
              <div className="absolute top-8 right-20 w-6 h-6 rounded-full bg-black/50 blur-[1px]" />
              <div className="absolute top-24 left-14 w-5 h-5 rounded-full bg-black/45 blur-[1px]" />
              <div className="absolute bottom-14 right-16 w-7 h-7 rounded-full bg-black/40 blur-[1px]" />
              {/* Petits cratères */}
              <div className="absolute top-12 left-16 w-3 h-3 rounded-full bg-black/40" />
              <div className="absolute top-28 right-14 w-3 h-3 rounded-full bg-black/35" />
              <div className="absolute bottom-16 left-24 w-2 h-2 rounded-full bg-black/40" />
              <div className="absolute bottom-20 right-20 w-3 h-3 rounded-full bg-black/35" />
              {/* Texture poudreuse */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
            </>
          )}

          {planet.name === "Vénus" && (
            // Nuages épais jaunes-oranges en mouvement
            <>
              <motion.div 
                className="absolute -top-4 -left-4 w-32 h-16 rounded-full bg-yellow-300/30 blur-xl"
                animate={{ x: [0, 25, 0], y: [0, 5, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-8 right-0 w-28 h-20 rounded-full bg-orange-400/25 blur-2xl"
                animate={{ x: [0, -20, 0], y: [0, 8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div 
                className="absolute top-20 left-4 w-36 h-24 rounded-full bg-yellow-400/20 blur-2xl"
                animate={{ x: [0, 22, 0], y: [0, -6, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              <motion.div 
                className="absolute bottom-4 right-8 w-30 h-18 rounded-full bg-orange-300/25 blur-xl"
                animate={{ x: [0, -18, 0], y: [0, -5, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              {/* Tourbillons */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,200,100,0.15)_0%,transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(255,150,50,0.12)_0%,transparent_35%)]" />
            </>
          )}

          {planet.name === "Mars" && (
            // Déserts rouges, canyons et calottes polaires
            <>
              {/* Calotte polaire nord */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/90 blur-sm" />
              {/* Valles Marineris (grand canyon) */}
              <div className="absolute top-12 left-6 w-24 h-4 bg-red-950/60 blur-[1px] rotate-12" />
              <div className="absolute top-14 left-8 w-20 h-3 bg-black/40 blur-[1px] rotate-12" />
              {/* Olympus Mons et volcans */}
              <div className="absolute top-16 right-12 w-14 h-8 rounded-full bg-red-800/50 blur-sm" />
              <div className="absolute top-18 right-14 w-10 h-6 rounded-full bg-red-900/40 blur-sm" />
              {/* Plaines et déserts */}
              <div className="absolute top-24 left-14 w-20 h-12 bg-orange-900/30 blur-md" />
              <div className="absolute bottom-12 right-10 w-18 h-14 bg-red-900/30 blur-md" />
              {/* Calotte polaire sud */}
              <div className="absolute -bottom-2 right-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white/80 blur-sm" />
              {/* Cratères */}
              <div className="absolute top-20 left-20 w-7 h-7 rounded-full bg-black/35 blur-[2px]" />
              <div className="absolute bottom-14 right-16 w-9 h-9 rounded-full bg-black/30 blur-[2px]" />
              {/* Poussière */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,100,50,0.1)_0%,transparent_60%)]" />
            </>
          )}

          {planet.name === "Jupiter" && (
            // Bandes atmosphériques et Grande Tache Rouge
            <>
              {/* Bandes sombres et claires alternées */}
              <div className="absolute top-2 left-0 right-0 h-5 bg-orange-900/35 blur-[2px]" />
              <div className="absolute top-8 left-0 right-0 h-6 bg-yellow-700/25 blur-[2px]" />
              <div className="absolute top-16 left-0 right-0 h-7 bg-orange-800/40 blur-[2px]" />
              <div className="absolute top-24 left-0 right-0 h-6 bg-yellow-800/20 blur-[2px]" />
              <div className="absolute top-32 left-0 right-0 h-5 bg-orange-900/35 blur-[2px]" />
              <div className="absolute bottom-6 left-0 right-0 h-6 bg-yellow-700/25 blur-[2px]" />
              {/* Grande Tache Rouge */}
              <motion.div 
                className="absolute top-[45%] right-10 -translate-y-1/2 w-20 h-16 rounded-full bg-red-700/70 blur-md"
                animate={{ 
                  scale: [1, 1.03, 1],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute top-[45%] right-10 -translate-y-1/2 w-18 h-14 rounded-full bg-red-900/50 blur-sm" />
              {/* Turbulences */}
              <div className="absolute top-12 right-24 w-6 h-4 rounded-full bg-white/20 blur-[1px]" />
              <div className="absolute top-28 left-16 w-5 h-3 rounded-full bg-white/15 blur-[1px]" />
            </>
          )}

          {planet.name === "Saturne" && (
            // Bandes gazeuses subtiles beiges et dorées
            <>
              <div className="absolute top-6 left-0 right-0 h-6 bg-yellow-200/15 blur-md" />
              <div className="absolute top-14 left-0 right-0 h-7 bg-orange-200/10 blur-md" />
              <div className="absolute top-22 left-0 right-0 h-6 bg-yellow-300/12 blur-md" />
              <div className="absolute bottom-12 left-0 right-0 h-6 bg-orange-200/10 blur-md" />
              <div className="absolute bottom-6 left-0 right-0 h-5 bg-yellow-200/15 blur-md" />
              {/* Tempêtes subtiles */}
              <div className="absolute top-16 right-14 w-8 h-6 rounded-full bg-white/10 blur-sm" />
            </>
          )}

          {planet.name === "Uranus" && (
            // Bleu-vert glacé uniforme avec légères bandes
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-transparent to-teal-500/15" />
              <div className="absolute top-10 left-0 right-0 h-4 bg-cyan-500/12 blur-md" />
              <div className="absolute top-18 left-0 right-0 h-5 bg-teal-400/10 blur-md" />
              <div className="absolute top-26 left-0 right-0 h-4 bg-cyan-600/12 blur-md" />
              <div className="absolute bottom-14 left-0 right-0 h-4 bg-teal-500/10 blur-md" />
              {/* Lueur uniforme */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(100,220,220,0.08)_0%,transparent_70%)]" />
            </>
          )}

          {planet.name === "Neptune" && (
            // Bleu profond avec Grande Tache Sombre
            <>
              {/* Bandes atmosphériques */}
              <div className="absolute top-8 left-0 right-0 h-5 bg-blue-900/30 blur-md" />
              <div className="absolute top-16 left-0 right-0 h-6 bg-blue-800/25 blur-md" />
              <div className="absolute bottom-14 left-0 right-0 h-6 bg-blue-900/35 blur-md" />
              {/* Grande Tache Sombre */}
              <motion.div 
                className="absolute top-1/3 right-12 w-16 h-16 rounded-full bg-blue-950/50 blur-lg"
                animate={{ 
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute top-1/3 right-12 w-14 h-14 rounded-full bg-black/30 blur-md" />
              {/* Nuages blancs */}
              <div className="absolute top-20 left-12 w-6 h-4 rounded-full bg-white/25 blur-[2px]" />
              <div className="absolute bottom-16 right-20 w-5 h-3 rounded-full bg-white/20 blur-[2px]" />
              {/* Profondeur */}
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-700/10 to-blue-950/20" />
            </>
          )}

          {planet.name === "Pluton" && (
            // Surface glacée beige avec le célèbre cœur de Pluton
            <>
              {/* Cœur de Pluton (Tombaugh Regio) */}
              <div 
                className="absolute top-1/2 left-10 -translate-y-1/2 w-20 h-24 bg-orange-200/60 blur-md" 
                style={{ 
                  borderRadius: "40% 60% 65% 35% / 50% 60% 40% 50%",
                  transform: "translateY(-50%) rotate(-15deg)"
                }} 
              />
              <div 
                className="absolute top-1/2 left-10 -translate-y-1/2 w-18 h-22 bg-yellow-100/40 blur-sm" 
                style={{ 
                  borderRadius: "40% 60% 65% 35% / 50% 60% 40% 50%",
                  transform: "translateY(-50%) rotate(-15deg)"
                }} 
              />
              {/* Régions sombres (Cthulhu Macula) */}
              <div className="absolute top-6 right-8 w-16 h-12 bg-gray-900/50 blur-md" />
              <div className="absolute bottom-8 left-16 w-12 h-10 bg-gray-800/45 blur-md" />
              {/* Cratères */}
              <div className="absolute top-10 right-14 w-6 h-6 rounded-full bg-black/30 blur-[2px]" />
              <div className="absolute bottom-12 right-10 w-5 h-5 rounded-full bg-black/25 blur-[2px]" />
              {/* Texture glacée */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-400/8 to-transparent" />
            </>
          )}

          {planet.name === "Titan" && (
            // Atmosphère orange épaisse avec nuages
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/25 via-transparent to-red-600/20" />
              {/* Nuages épais */}
              <motion.div 
                className="absolute inset-6 rounded-full bg-orange-700/20 blur-2xl"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-8 left-4 w-24 h-16 rounded-full bg-red-700/15 blur-xl"
                animate={{ x: [0, 15, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute top-12 left-0 right-0 h-8 bg-orange-800/20 blur-lg" />
              <div className="absolute bottom-10 left-0 right-0 h-10 bg-red-800/20 blur-lg" />
              {/* Brume atmosphérique */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,120,50,0.12)_0%,transparent_70%)]" />
            </>
          )}

          {planet.name === "Europa" && (
            // Surface glacée blanche avec fissures caractéristiques
            <>
              {/* Fissures majeures (lineae) */}
              <div className="absolute top-8 left-2 w-28 h-[2px] bg-blue-950/70 blur-[0.5px] rotate-12" />
              <div className="absolute top-10 left-4 w-26 h-[2px] bg-blue-900/60 blur-[0.5px] rotate-15" />
              <div className="absolute top-14 right-4 w-24 h-[2px] bg-blue-950/65 blur-[0.5px] -rotate-6" />
              <div className="absolute top-20 left-6 w-30 h-[3px] bg-blue-900/70 blur-[0.5px] rotate-45" />
              <div className="absolute top-24 right-8 w-22 h-[2px] bg-blue-950/60 blur-[0.5px] -rotate-12" />
              <div className="absolute bottom-14 right-6 w-26 h-[2px] bg-blue-900/65 blur-[0.5px] rotate-8" />
              <div className="absolute bottom-10 left-10 w-28 h-[3px] bg-blue-950/70 blur-[0.5px] -rotate-15" />
              <div className="absolute bottom-8 right-12 w-20 h-[2px] bg-blue-900/60 blur-[0.5px] rotate-6" />
              {/* Fissures secondaires */}
              <div className="absolute top-16 left-14 w-16 h-[1px] bg-blue-900/50 rotate-30" />
              <div className="absolute top-28 right-16 w-14 h-[1px] bg-blue-950/45 -rotate-20" />
              <div className="absolute bottom-16 left-18 w-18 h-[1px] bg-blue-900/50 rotate-10" />
              {/* Surface glacée brillante */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-cyan-100/15" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
              {/* Cratères d'impacts subtils */}
              <div className="absolute top-12 right-14 w-6 h-6 rounded-full bg-gray-500/20 blur-[2px]" />
              <div className="absolute bottom-16 left-20 w-5 h-5 rounded-full bg-gray-600/18 blur-[2px]" />
              <div className="absolute top-26 left-12 w-4 h-4 rounded-full bg-gray-500/15 blur-[1px]" />
            </>
          )}
        </motion.div>

        {/* Reflet lumineux ultra-réaliste du soleil */}
        <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-gradient-to-br from-white/70 via-white/40 to-transparent blur-xl" />
        <div className="absolute top-3 left-3 w-16 h-16 rounded-full bg-white/50 blur-lg" />
        <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-white/30 blur-md" />

        {/* Ombre du terminateur (transition jour/nuit) - plus prononcée */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* Atmosphère lumineuse subtile */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `inset 0 0 25px ${planet.colors.secondary}35, 0 0 45px ${planet.colors.primary}25`,
          }}
        />

        {/* Anneau pour Saturne - Ultra-réaliste */}
        {planet.name === "Saturne" && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "200px",
                height: "55px",
                transform: "translate(-50%, -50%) rotateX(75deg)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            >
              {/* Anneau A (externe) */}
              <div 
                className="absolute inset-0 border-[7px] rounded-full opacity-75"
                style={{
                  borderColor: `${planet.colors.secondary}BB`,
                  boxShadow: `0 0 12px ${planet.colors.secondary}30, inset 0 -2px 8px rgba(0,0,0,0.4)`,
                }}
              />
              {/* Division de Cassini (espace sombre) */}
              <div 
                className="absolute inset-[6px] border-[3px] rounded-full opacity-95"
                style={{
                  borderColor: "rgba(0,0,0,0.7)",
                }}
              />
              {/* Anneau B (milieu - le plus brillant) */}
              <div 
                className="absolute inset-[10px] border-[8px] rounded-full opacity-90"
                style={{
                  borderColor: `${planet.colors.primary}DD`,
                  boxShadow: `0 0 10px ${planet.colors.primary}40, inset 0 -2px 10px rgba(0,0,0,0.5)`,
                }}
              />
              {/* Anneau C (interne - plus transparent) */}
              <div 
                className="absolute inset-[20px] border-[5px] rounded-full opacity-50"
                style={{
                  borderColor: `${planet.colors.secondary}99`,
                  boxShadow: `inset 0 -2px 6px rgba(0,0,0,0.3)`,
                }}
              />
              {/* Ombre de la planète sur les anneaux */}
              <div 
                className="absolute left-[30%] top-0 bottom-0 w-[40%] bg-black/50 blur-sm"
                style={{
                  borderRadius: "50%",
                }}
              />
            </motion.div>
          </div>
        )}

        {/* Statut */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {!isAccessible ? (
            <div className="bg-black/60 backdrop-blur-sm rounded-full p-4">
              <Lock className="w-12 h-12 text-white drop-shadow-2xl" />
            </div>
          ) : stepProgress.isCompleted ? (
            <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-4">
              <CheckCircle2 className="w-14 h-14 text-white drop-shadow-2xl" />
            </div>
          ) : (
            <div className="bg-black/40 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-3xl font-bold text-white drop-shadow-2xl">
                {stepIndex + 1}
              </span>
            </div>
          )}
        </div>

        {/* Anneau de progression */}
        {stepProgress.completed > 0 && !stepProgress.isCompleted && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: "5px solid",
              borderColor: "transparent",
              borderTopColor: "#FFD700",
              borderRightColor: "#FFD700",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Anneau vert si complété avec effet de couronne */}
        {stepProgress.isCompleted && (
          <motion.div 
            className="absolute inset-0 rounded-full ring-4 ring-green-400"
            animate={{
              boxShadow: [
                "0 0 20px rgba(34, 197, 94, 0.6)",
                "0 0 40px rgba(34, 197, 94, 0.8)",
                "0 0 20px rgba(34, 197, 94, 0.6)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>

      {/* Lueur orbitale autour de la planète */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: [
            `0 0 35px ${planet.colors.primary}35`,
            `0 0 55px ${planet.colors.primary}50`,
            `0 0 35px ${planet.colors.primary}35`,
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
