'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lens, LensConfig, LENS_CONFIGS } from './lens-config';

interface LensContextType {
  lens: Lens;
  setLens: (lens: Lens) => void;
  config: LensConfig;
  // Helpers
  getLabel: (entity: keyof LensConfig['labels']) => string;
  isNavVisible: (navItem: string) => boolean;
  getVisibleFields: (entity: keyof LensConfig['fields']) => string[];
}

const LensContext = createContext<LensContextType | undefined>(undefined);

const LENS_STORAGE_KEY = 'integratewise-lens';

interface LensProviderProps {
  children: ReactNode;
  defaultLens?: Lens;
}

export function LensProvider({ children, defaultLens = 'os' }: LensProviderProps) {
  const [lens, setLensState] = useState<Lens>(defaultLens);

  // Load lens from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LENS_STORAGE_KEY);
    if (stored && (stored === 'cs' || stored === 'bs' || stored === 'os')) {
      setLensState(stored as Lens);
    }
  }, []);

  // Persist lens changes to localStorage
  const setLens = (newLens: Lens) => {
    setLensState(newLens);
    localStorage.setItem(LENS_STORAGE_KEY, newLens);
  };

  const config = LENS_CONFIGS[lens];

  const getLabel = (entity: keyof LensConfig['labels']): string => {
    return config.labels[entity];
  };

  const isNavVisible = (navItem: string): boolean => {
    return config.navItems.some(item => item.id === navItem);
  };

  const getVisibleFields = (entity: keyof LensConfig['fields']): string[] => {
    return config.fields[entity];
  };

  return (
    <LensContext.Provider
      value={{
        lens,
        setLens,
        config,
        getLabel,
        isNavVisible,
        getVisibleFields,
      }}
    >
      {children}
    </LensContext.Provider>
  );
}

export function useLens(): LensContextType {
  const context = useContext(LensContext);
  if (context === undefined) {
    throw new Error('useLens must be used within a LensProvider');
  }
  return context;
}

// Export for direct access without hook
export { LensContext };
