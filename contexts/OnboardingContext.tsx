import React, { createContext, useState, useContext } from 'react';

const OnboardingContext = createContext({
  isOnboardingVisible: true,
  setIsOnboardingVisible: (visible: boolean) => {},
});

import { ReactNode } from 'react';

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(true);

  return (
    <OnboardingContext.Provider value={{ isOnboardingVisible, setIsOnboardingVisible }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);