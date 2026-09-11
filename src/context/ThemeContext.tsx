import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type ThemeId, type ThemeOption } from './theme-context';

export const availableThemes: ThemeOption[] = [
    {
        id: 'cyber-neon',
        name: 'Cyber Neon',
        description: 'Cosmic violet with electric cyan & magenta aurora',
        icon: '⚡',
        primaryColor: '#a855f7',
        accentColor: '#06b6d4',
        gradient: 'linear-gradient(135deg, #00d2ff 0%, #a855f7 50%, #ec4899 100%)',
    },
    {
        id: 'obsidian-emerald',
        name: 'Obsidian Emerald',
        description: 'Linear OLED pitch black with mint & emerald matrix glow',
        icon: '🟩',
        primaryColor: '#10b981',
        accentColor: '#14b8a6',
        gradient: 'linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #059669 100%)',
    },
    {
        id: 'sunset-amber',
        name: 'Sunset Amber',
        description: 'Deep obsidian graphite with warm amber & solar flare',
        icon: '🌅',
        primaryColor: '#f59e0b',
        accentColor: '#f97316',
        gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)',
    },
    {
        id: 'midnight-sapphire',
        name: 'Midnight Sapphire',
        description: 'Interstellar cobalt with icy cyan & royal indigo neon',
        icon: '💎',
        primaryColor: '#3b82f6',
        accentColor: '#38bdf8',
        gradient: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #6366f1 100%)',
    },
];

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<ThemeId>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('gsoc-theme') as ThemeId | null;
            if (saved && availableThemes.some((t) => t.id === saved)) {
                return saved;
            }
        }
        return 'cyber-neon';
    });

    const setTheme = (newTheme: ThemeId) => {
        setThemeState(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('gsoc-theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
            {children}
        </ThemeContext.Provider>
    );
}
