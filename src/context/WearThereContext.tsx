import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { mockData } from '../data/mockData';
import { DressCode, OutfitEntry, Restaurant } from '../types';

type OutfitFormDraft = {
  restaurantId: string;
  vibe: DressCode;
  title: string;
  notes: string;
  pieces: string[];
  image: string;
  date: string;
};

interface WearThereContextValue {
  restaurants: Restaurant[];
  outfits: OutfitEntry[];
  trendingRestaurants: Restaurant[];
  outfitFeed: OutfitEntry[];
  createDraft: () => OutfitFormDraft;
  addOutfit: (entry: OutfitEntry) => void;
}

const WearThereContext = createContext<WearThereContextValue | undefined>(undefined);

export function WearThereProvider({ children }: { children: ReactNode }) {
  const [outfits, setOutfits] = useState<OutfitEntry[]>(mockData.outfits);

  const value = useMemo<WearThereContextValue>(() => {
    const restaurants = mockData.restaurants;
    const trendingRestaurants = restaurants.filter((restaurant) => restaurant.trending);
    const outfitFeed = [...outfits].sort((a, b) => b.likes - a.likes);

    const createDraft = (): OutfitFormDraft => ({
      restaurantId: restaurants[0]?.id ?? '',
      vibe: restaurants[0]?.dressCode ?? 'smart-casual',
      title: '',
      notes: '',
      pieces: [],
      image: '',
      date: new Date().toISOString().slice(0, 10)
    });

    const addOutfit = (entry: OutfitEntry) => {
      setOutfits((current) => [entry, ...current]);
    };

    return {
      restaurants,
      outfits,
      trendingRestaurants,
      outfitFeed,
      createDraft,
      addOutfit
    };
  }, [outfits]);

  return <WearThereContext.Provider value={value}>{children}</WearThereContext.Provider>;
}

export function useWearThereContext() {
  const context = useContext(WearThereContext);
  if (!context) {
    throw new Error('useWearThereContext must be used within a WearThereProvider');
  }
  return context;
}
