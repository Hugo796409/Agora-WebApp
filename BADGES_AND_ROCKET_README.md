# Système de Badges et Animation de Fusée - Agora

## Vue d'ensemble

Le système de badges et l'animation de fusée ont été intégrés à l'application Agora pour gamifier l'expérience utilisateur et rendre l'apprentissage plus engageant.

## 🏆 Système de Badges

### Architecture

Le système de badges est géré par le **GamificationContext** (`/src/app/components/GamificationContext.tsx`), qui fournit :

- **Badge Types** : Définis avec des propriétés comme `id`, `name`, `description`, `icon`, `category`, `rarity`, `unlocked`, etc.
- **Badges par défaut** : 8 badges initiaux couvrant différentes catégories (projets, apprentissage, social, accomplissement)
- **Raretés** : Common, Rare, Epic, Legendary (avec des effets visuels différents)

### Fonctionnalités

#### 1. **Déblocage de badges**
```typescript
const { unlockBadge } = useGamification();
unlockBadge("badge-id");
```

Lorsqu'un badge est débloqué :
- Une notification toast s'affiche avec les détails du badge
- Des confettis sont lancés (pour les badges Rare+)
- Un bouton "Voir tous" permet d'accéder à la page complète des achievements
- Le badge est sauvegardé dans localStorage

#### 2. **Page Achievements** (`/achievements`)
- **Vue d'ensemble** : Affiche la progression globale (badges débloqués, niveau, série, XP total)
- **Filtres** : Par statut (tous/débloqués/verrouillés) et par catégorie
- **Grille de badges** : Présentation visuelle avec indicateurs de rareté
- **Badges verrouillés** : Affichent les conditions pour les débloquer

#### 3. **Intégration dans le Profil**
- Affiche les 4 derniers badges débloqués
- Bouton "Voir tous" pour accéder à la page complète
- Message encourageant si aucun badge n'est débloqué

#### 4. **Sidebar**
- Nouveau lien "Achievements" dans le menu de navigation
- Accès rapide à la collection de badges

### Badges Disponibles

| Badge | ID | Catégorie | Rareté | Condition |
|-------|-------|-----------|--------|-----------|
| Premier Pas | `first-project` | Projet | Common | Créer 1 projet |
| Entrepreneur Actif | `three-projects` | Projet | Rare | Créer 3 projets |
| Franchir la Porte | `first-gate-completed` | Apprentissage | Common | Compléter 1 gate |
| Maître des Gates | `all-gates-completed` | Apprentissage | Epic | Compléter 10 gates |
| Certifié par le Jury | `certification-obtained` | Accomplissement | Legendary | Obtenir 1 certification |
| Série de Feu | `week-streak` | Accomplissement | Rare | 7 jours consécutifs |
| Mentoré | `mentor-feedback` | Social | Common | Recevoir 1 feedback |
| Niveau Supérieur | `level-5` | Accomplissement | Rare | Atteindre niveau 5 |

### Déclenchement Automatique

Les badges sont débloqués automatiquement lors d'actions importantes :

```typescript
// Exemple : Déblocage du badge "Premier Pas" à la création du premier projet
if (projects.length === 0) {
  setTimeout(() => {
    unlockBadge("first-project");
    launchRocket();
  }, 500);
}
```

**Actions implémentées** :
- ✅ Création du 1er projet → Badge "Premier Pas"
- ✅ Création du 3ème projet → Badge "Entrepreneur Actif"

**À implémenter** :
- Complétion de la première gate → Badge "Franchir la Porte"
- Complétion de toutes les gates → Badge "Maître des Gates"
- Obtention d'une certification → Badge "Certifié par le Jury"
- Série de 7 jours → Badge "Série de Feu"
- Réception d'un feedback → Badge "Mentoré"
- Niveau 5 atteint → Badge "Niveau Supérieur"

---

## 🚀 Animation de Fusée

### Architecture

L'animation de fusée est gérée par le composant **RocketAnimation** (`/src/app/components/RocketAnimation.tsx`).

### Utilisation

#### 1. **Hook personnalisé**
```typescript
import { useRocketAnimation } from "./RocketAnimation";

const { trigger, launchRocket } = useRocketAnimation();
```

#### 2. **Intégration dans un composant**
```typescript
<RocketAnimation trigger={trigger} />

// Déclencher l'animation
launchRocket();
```

### Déclencheurs Actuels

L'animation de fusée est déclenchée lors de :
- ✅ Création d'un nouveau projet (bouton "Créer mon premier projet")
- ✅ Déblocage d'un badge (Premier Pas, Entrepreneur Actif)
- ✅ Clic sur le bouton de création de projet dans le dashboard

### Caractéristiques de l'Animation

- **Durée** : 2 secondes
- **Trajectoire** : Diagonale de bas-gauche à haut-droit
- **Effets visuels** :
  - Traînée de flammes animée (orange/rouge/jaune)
  - Particules scintillantes qui se dispersent
  - Rotation de 45° pour simuler le vol
  - Animation de vibration légère pour le réalisme

- **Non-intrusive** :
  - `pointer-events: none` pour ne pas bloquer les interactions
  - Durée courte et rapide
  - Position fixe (`z-index: 50`)

### Personnalisation

Pour modifier l'animation, éditer `/src/app/components/RocketAnimation.tsx` :

```typescript
// Modifier la durée
transition={{ duration: 2 }} // Changer à 3 pour une animation plus lente

// Modifier la trajectoire
initial={{ x: -100, y: "100vh", rotate: -45 }}
animate={{ x: "110vw", y: "-100vh", rotate: 45 }}
```

---

## 🎨 Design System

### Couleurs Agora Utilisées

- **Orange** : `#FC4C00`, `#FD824D`, `#B03500`
- **Bleu** : `#004AAD`, `#4D80C6`, `#003479`

### Raretés des Badges

| Rareté | Couleur de fond | Couleur de bordure | Couleur d'icône |
|--------|----------------|-------------------|----------------|
| Common | Gris 50 | Gris 300 | Gris 500-600 |
| Rare | Bleu 50 | Bleu 400 | Bleu 500-Cyan 500 |
| Epic | Violet 50 | Violet 400 | Violet 500-Rose 500 |
| Legendary | Jaune 50 | Jaune 400 | Jaune 400-Orange 500 |

---

## 📝 Intégrations Futures

### Badges à Ajouter

1. **Progression dans les cours**
   - "Étudiant Assidu" : Compléter 10 cours
   - "Expert du Business" : Compléter tous les cours d'un module

2. **Collaboration**
   - "Team Player" : Inviter 3 membres d'équipe
   - "Communicateur" : Envoyer 50 messages

3. **Performance**
   - "Score Parfait" : Obtenir 100% à un crash test
   - "Perfectionniste" : Améliorer un projet 3 fois

### Animations Supplémentaires

- **Confettis améliorés** : Couleurs personnalisées selon le badge
- **Animation de montée de niveau** : Effet visuel lors du passage au niveau supérieur
- **Animation de série** : Flamme animée pour chaque jour de série

---

## 🔧 Maintenance

### localStorage

Les données de gamification sont sauvegardées dans `localStorage` sous la clé `"gamification"` :

```json
{
  "xp": 150,
  "level": 2,
  "streak": 3,
  "totalPoints": 300,
  "lastVisit": "2026-03-07",
  "badges": [...]
}
```

### Réinitialisation

Pour réinitialiser les badges et la progression :
```javascript
localStorage.removeItem("gamification");
```

---

## 📊 Métriques

### Suivi Utilisateur

Le système permet de suivre :
- Nombre de badges débloqués
- Catégories les plus complétées
- Temps moyen pour débloquer un badge
- Taux de complétion par rareté

### Analytics Recommandés

- Taux de rétention lié aux badges
- Impact sur l'engagement utilisateur
- Badges les plus populaires
- Temps passé sur la page achievements

---

## 🚀 Prochaines Étapes

1. **Implémenter les déclencheurs manquants** pour les badges restants
2. **Ajouter des sons** lors du déblocage de badges (optionnel)
3. **Créer un système de récompenses** (avatars, thèmes, etc.)
4. **Leaderboard** : Classement des utilisateurs par badges et XP
5. **Partage social** : Permettre de partager ses badges sur les réseaux sociaux

---

## 💡 Conseils d'Utilisation

- Utilisez `unlockBadge()` dans les contextes appropriés (après validation d'une action)
- Combinez toujours `unlockBadge()` avec `launchRocket()` pour une meilleure expérience
- Évitez de débloquer plusieurs badges simultanément (utilisez des délais)
- Testez les notifications sur différents appareils (mobile/desktop)

---

**Développé pour Agora - Initiate Together** 🎓🚀
