export type DressCode = 'casual' | 'smart-casual' | 'business-casual' | 'elevated' | 'formal';

export interface Restaurant {
  id: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  mood: string[];
  dressCode: DressCode;
  tagline: string;
  heroImage: string;
  trending: boolean;
}

export interface OutfitEntry {
  id: string;
  restaurantId: string;
  restaurantName: string;
  wornBy: string;
  date: string;
  vibe: DressCode;
  title: string;
  notes: string;
  likes: number;
  saves: number;
  image: string;
  pieces: string[];
}
