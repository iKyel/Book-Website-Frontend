"use client";

import React, { createContext, ReactNode, useContext } from 'react';
import { userStore } from '../stores/userStore';

export interface AppContextProps {
    userStore: typeof userStore;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useUser = () => {
    const context = useContext(AppContext)!;
    return context.userStore;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AppContext.Provider value={{ userStore }}>
            {children}
        </AppContext.Provider>
    );
};