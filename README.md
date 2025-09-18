# Wear There

Your modern outfit memory app for every reservation. Wear There helps you remember what you wore, peek at the vibe of a restaurant before you arrive, and share inspiration with friends.

## Features

- **Vibe-forward home screen** showcasing trending restaurants and recent outfit logs.
- **Restaurant library** with dress code filters so you always match the moment.
- **Personal closet** to record looks, notes, and hero pieces for future outings.
- **Inline logging flow** to quickly capture an outfit with mood tags and inspo links.

All content is powered by sample data so you can try the experience immediately. Swap it with your own backend or Supabase/Airtable when you are ready to go live.

## Getting started

```bash
# install dependencies
npm install

# start the Expo development server
npm run start
```

Expo will give you options to run the app on iOS, Android, or web. The project ships with React Navigation and a type-safe context that you can swap for a real data layer later on.

## Project structure

```
wear-there/
├── app.json
├── assets/
├── babel.config.js
├── package.json
├── src/
│   ├── App.tsx              # App entry – providers + navigation container
│   ├── components/          # Reusable UI pieces (cards, chips, etc.)
│   ├── context/             # Wear There context + state helpers
│   ├── data/                # Mock restaurant + outfit data
│   ├── navigation/          # Navigator stacks and route types
│   ├── screens/             # Home, Restaurants, Closet, and Log Outfit screens
│   ├── theme.ts             # Palette + spacing helpers
│   └── types.ts             # Shared domain types
└── tsconfig.json
```

## Next steps

1. Swap the mock data with a real backend or Airtable base for live outfit logging.
2. Add authentication and social features (shared closets, likes, and following).
3. Layer in media uploads so people can snap photos directly from the app.
4. Polish the visual design with custom illustrations, icons, and onboarding.

Have fun building Wear There and getting every fit ready for the spotlight.
