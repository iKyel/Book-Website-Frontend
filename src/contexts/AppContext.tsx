"use client";

import React, { createContext, ReactNode, useContext } from 'react';
import { userStore } from '../stores/userStore';
import { bookStore } from '@/stores/bookStore';

export interface AppContextProps {
    userStore: typeof userStore;
    bookStore: typeof bookStore;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useUser = () => {
    const context = useContext(AppContext);
    if (context) return context.userStore;
};

export const useBook = () => {
    const context = useContext(AppContext);
    if (context) return context.bookStore;
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AppContext.Provider value={{ userStore, bookStore }}>
            {children}
        </AppContext.Provider>
    );
};