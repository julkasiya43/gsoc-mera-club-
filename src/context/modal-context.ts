import { createContext } from 'react';

export interface ModalContextType {
    isFollowModalOpen: boolean;
    openFollowModal: () => void;
    closeFollowModal: () => void;
    isCommandPaletteOpen: boolean;
    openCommandPalette: () => void;
    closeCommandPalette: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

