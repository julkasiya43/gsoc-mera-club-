import { useState, useEffect, type ReactNode } from 'react';
import { ModalContext } from './modal-context';

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    const openFollowModal = () => setIsFollowModalOpen(true);
    const closeFollowModal = () => setIsFollowModalOpen(false);

    const openCommandPalette = () => setIsCommandPaletteOpen(true);
    const closeCommandPalette = () => setIsCommandPaletteOpen(false);

    // Global keyboard shortcut listener: Cmd+K / Ctrl+K
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    return (
        <ModalContext.Provider
            value={{
                isFollowModalOpen,
                openFollowModal,
                closeFollowModal,
                isCommandPaletteOpen,
                openCommandPalette,
                closeCommandPalette
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

