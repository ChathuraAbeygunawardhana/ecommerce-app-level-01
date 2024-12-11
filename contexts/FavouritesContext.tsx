import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  mainImage: string;
  price: string;
  colour: string;
  description: string;
}

interface FavouritesContextType {
  favourites: Product[];
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (id: string) => void;
  isFavourite: (id: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  const addToFavourites = (product: Product) => {
    setFavourites((prev) => [...prev, product]);
  };

  const removeFromFavourites = (id: string) => {
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavourite = (id: string) => {
    return favourites.some((item) => item.id === id);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};
