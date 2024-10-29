'use client';

import React, { createContext, ReactNode, useContext } from 'react';
import { userStore } from '../stores/userStore';
import { bookStore } from '@/stores/bookStore';
import { categoryStore } from '@/stores/categoryStore';
import { authorStore } from '@/stores/authorStore';
import { detailBookStore } from '@/stores/detailBookStore';

export interface AppContextProps {
    userStore: typeof userStore;
    bookStore: typeof bookStore;
    detailBookStore: typeof detailBookStore;
    categoryStore: typeof categoryStore;
    authorStore: typeof authorStore;
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

export const useDetailBook = () => {
    const context = useContext(AppContext);
    if (context) return context.detailBookStore;
};

export const useCategory = () => {
    const context = useContext(AppContext);
    if (context) return context.categoryStore;
}

export const useAuthor = () => {
    const context = useContext(AppContext);
    if (context) return context.authorStore;
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AppContext.Provider value={{ userStore, bookStore, categoryStore, authorStore, detailBookStore }}>
            {children}
        </AppContext.Provider>
    );
}