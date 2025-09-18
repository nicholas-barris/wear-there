import { DressCode, OutfitEntry, Restaurant } from '../types';

const dressCodeCopy: Record<DressCode, { label: string; blurb: string }> = {
  casual: {
    label: 'Casual',
    blurb: 'Comfy fits with personality. Denim encouraged, sneakers welcome.'
  },
  'smart-casual': {
    label: 'Smart Casual',
    blurb: 'Effortlessly polished. Think elevated essentials with a playful twist.'
  },
  'business-casual': {
    label: 'Business Casual',
    blurb: 'Meeting-ready with room to breathe. Blazers, slacks, and clever layers.'
  },
  elevated: {
    label: 'Elevated',
    blurb: 'Statement pieces paired with luxe textures. You look like the RSVP was "absolutely."'
  },
  formal: {
    label: 'Formal',
    blurb: 'Black tie energy. Tailored silhouettes, refined accessories, shimmer optional.'
  }
};

const restaurants: Restaurant[] = [
  {
    id: 'rest-aurum',
    name: 'Aurum Rooftop',
    neighborhood: 'Downtown',
    cuisine: 'New American',
    mood: ['city lights', 'late night'],
    dressCode: 'elevated',
    tagline: 'Skyline views with a glass of champagne in hand.',
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    trending: true
  },
  {
    id: 'rest-solstice',
    name: 'Solstice House',
    neighborhood: 'Arts District',
    cuisine: 'Seasonal Tasting',
    mood: ['chef\'s table', 'celebration'],
    dressCode: 'formal',
    tagline: 'Seven courses. Candlelight. The dress is the conversation starter.',
    heroImage: 'https://images.unsplash.com/photo-1540410061276-1ca1d4c1ab78',
    trending: false
  },
  {
    id: 'rest-lilypad',
    name: 'Lilypad Social',
    neighborhood: 'Riverfront',
    cuisine: 'Pan-Asian',
    mood: ['girls\' night', 'bold flavors'],
    dressCode: 'smart-casual',
    tagline: 'Colorful plates, craft cocktails, a playlist that never misses.',
    heroImage: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9',
    trending: true
  },
  {
    id: 'rest-haven',
    name: 'Haven Café',
    neighborhood: 'Garden District',
    cuisine: 'Brunch & Bakes',
    mood: ['daytime date', 'lazy Sunday'],
    dressCode: 'casual',
    tagline: 'Sunlit corners, latte art, and floaty fabrics.',
    heroImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814',
    trending: false
  }
];

const outfits: OutfitEntry[] = [
  {
    id: 'fit-001',
    restaurantId: 'rest-aurum',
    restaurantName: 'Aurum Rooftop',
    wornBy: 'Nia Carter',
    date: '2024-05-18',
    vibe: 'elevated',
    title: 'Velvet blazer & silver shimmer',
    notes: 'Layered a satin cami under a velvet blazer with tailored trousers. Block heels were perfect for the rooftop deck.',
    likes: 128,
    saves: 54,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    pieces: ['Midnight velvet blazer', 'Silver satin cami', 'Tailored wide leg trousers', 'Crystal drop earrings']
  },
  {
    id: 'fit-002',
    restaurantId: 'rest-lilypad',
    restaurantName: 'Lilypad Social',
    wornBy: 'Jordan Wills',
    date: '2024-05-12',
    vibe: 'smart-casual',
    title: 'Chartreuse moment',
    notes: 'Relaxed linen suit with a pop of chartreuse. Comfortable but felt special for the tasting menu.',
    likes: 96,
    saves: 41,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
    pieces: ['Chartreuse linen blazer', 'Cropped tank', 'Easy wide trousers', 'Platform sandals']
  },
  {
    id: 'fit-003',
    restaurantId: 'rest-haven',
    restaurantName: 'Haven Café',
    wornBy: 'Ames Rivera',
    date: '2024-04-29',
    vibe: 'casual',
    title: 'Soft neutrals & sneakers',
    notes: 'Cozy knit dress with an oversized denim jacket. White sneakers because brunch is a walking tour afterward.',
    likes: 64,
    saves: 29,
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37',
    pieces: ['Knit midi dress', 'Oversized denim jacket', 'White low-top sneakers', 'Canvas tote']
  },
  {
    id: 'fit-004',
    restaurantId: 'rest-solstice',
    restaurantName: 'Solstice House',
    wornBy: 'Madison Lee',
    date: '2024-05-01',
    vibe: 'formal',
    title: 'Sculptural satin gown',
    notes: 'Paired a sculptural satin gown with vintage earrings. Carried a petite beaded clutch to keep it playful.',
    likes: 182,
    saves: 97,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
    pieces: ['Satin column gown', 'Vintage earrings', 'Beaded clutch', 'Metallic heels']
  }
];

export const mockData = {
  restaurants,
  outfits,
  dressCodeCopy
};
