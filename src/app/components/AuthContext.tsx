import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, firstName: string, lastName: string, age?: number) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au montage
  useEffect(() => {
    const loadUser = () => {
      try {
        const currentUserStr = localStorage.getItem('agora_current_user');
        if (currentUserStr) {
          const currentUser = JSON.parse(currentUserStr);
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('agora_current_user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    age?: number
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Récupérer tous les utilisateurs
      const usersStr = localStorage.getItem('agora_users');
      const users = usersStr ? JSON.parse(usersStr) : [];

      // Vérifier si l'email existe déjà
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        return { success: false, error: 'Cet email est déjà utilisé' };
      }

      // Valider les données
      if (!email || !password || !firstName || !lastName) {
        return { success: false, error: 'Tous les champs obligatoires doivent être remplis' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' };
      }

      // Créer le nouvel utilisateur
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        firstName,
        lastName,
        age,
        createdAt: new Date().toISOString(),
      };

      // Stocker les credentials (pour simulation - en production, ne JAMAIS stocker les mots de passe en clair!)
      const userWithPassword = {
        ...newUser,
        password: btoa(password), // Simple encodage Base64 pour simulation
      };

      // Ajouter aux utilisateurs
      users.push(userWithPassword);
      localStorage.setItem('agora_users', JSON.stringify(users));

      // Initialiser le plan Free pour le nouvel utilisateur
      const userPlansStr = localStorage.getItem('agora_user_plans');
      const userPlans = userPlansStr ? JSON.parse(userPlansStr) : {};
      userPlans[newUser.id] = {
        plan: 'Free',
        projectsCount: 0,
      };
      localStorage.setItem('agora_user_plans', JSON.stringify(userPlans));

      // Se connecter automatiquement
      setUser(newUser);
      localStorage.setItem('agora_current_user', JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Une erreur est survenue lors de l\'inscription' };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Récupérer tous les utilisateurs
      const usersStr = localStorage.getItem('agora_users');
      const users = usersStr ? JSON.parse(usersStr) : [];

      // Trouver l'utilisateur
      const userWithPassword = users.find((u: any) => u.email === email);
      if (!userWithPassword) {
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }

      // Vérifier le mot de passe
      const decodedPassword = atob(userWithPassword.password);
      if (decodedPassword !== password) {
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }

      // Extraire les données utilisateur (sans le mot de passe)
      const { password: _, ...userData } = userWithPassword;
      const userToSet: User = userData as User;

      // Connecter l'utilisateur
      setUser(userToSet);
      localStorage.setItem('agora_current_user', JSON.stringify(userToSet));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Une erreur est survenue lors de la connexion' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agora_current_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
