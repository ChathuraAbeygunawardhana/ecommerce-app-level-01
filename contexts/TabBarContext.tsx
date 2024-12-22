import { createContext } from 'react';

export const TabBarContext = createContext({
  tabBarVisible: true,
  setTabBarVisible: (visible: boolean) => {},
});
