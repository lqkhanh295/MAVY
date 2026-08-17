export interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: string;
  unit: string;
  image: string;
  badge: string;
  origin: string;
  specifications: {
    label: string;
    value: string;
  }[];
  nutritionFacts: {
    protein: string;
    calories: string;
    omega3: string;
    calcium: string;
  };
  cookingSuggestions: string[];
  features: string[];
}

export interface Recipe {
  id: string;
  title: string;
  category: "cua" | "muc" | "tom" | "combo";
  prepTime: string;
  cookTime: string;
  difficulty: "Dễ" | "Trung bình" | "Nâng cao";
  servings: string;
  image?: string;
  matchRate?: number;
  description: string;
  ingredients: {
    name: string;
    amount: string;
    isMain?: boolean;
  }[];
  steps: string[];
  chefTips: string;
  flavorProfile: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "chef";
  text: string;
  recipes?: Recipe[];
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface LLMKeyStatus {
  keyIndex: number;
  provider: "gemini" | "openai";
  isActive: boolean;
  errorCount: number;
  lastUsedAt?: number;
}
