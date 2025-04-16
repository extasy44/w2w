'use client';

import * as React from 'react';

interface AutoSuggestContextType {
  isAutoComplete: boolean;
  setIsAutoComplete: (value: boolean) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

const AutoSuggestContext = React.createContext<AutoSuggestContextType | undefined>(undefined);

export function AutoSuggestProvider({ children }: { children: React.ReactNode }) {
  const [isAutoComplete, setIsAutoComplete] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  return (
    <AutoSuggestContext.Provider
      value={{
        isAutoComplete,
        setIsAutoComplete,
        isGenerating,
        setIsGenerating,
      }}>
      {children}
    </AutoSuggestContext.Provider>
  );
}

export function useAutoSuggest() {
  const context = React.useContext(AutoSuggestContext);
  if (context === undefined) {
    throw new Error('useAutoSuggest must be used within an AutoSuggestProvider');
  }
  return context;
}
