import { createContext } from 'react';

export type ThemeId = 'cyber-neon' | 'obsidian-emerald' | 'sunset-amber' | 'midnight-sapphire';

export interface ThemeOption {
    id: ThemeId;
    name: string;
    description: string;
    icon: string;
    primaryColor: string;
    accentColor: string;
    gradient: string;
}

export interface ThemeContextType {
    theme: ThemeId;
    setTheme: (theme: ThemeId) => void;
    availableThemes: ThemeOption[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
