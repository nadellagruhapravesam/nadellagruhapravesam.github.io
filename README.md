# Nadella Family Gruhapravesam Invitation

A responsive, interactive Telugu housewarming invitation built with React, Vite, React Three Fiber, Three.js, Framer Motion, and local illustrated assets.

## Run locally

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Main structure

- `src/components/IntroExperience.jsx` â€” Three.js ceremonial card opening and user-initiated audio start
- `src/components/HeroScene.jsx` â€” layered house, hosts, blessings, lamps, kalasham, parallax, pointer/device tilt
- `src/components/Muhurtham.jsx` â€” date, time, lagnam, and Telugu muhurtham line
- `src/components/Timeline.jsx` â€” responsive ceremony timeline
- `src/components/HomeSection.jsx` â€” illustrated venue and Google Maps action
- `src/components/Blessings.jsx` â€” divine blessing banner and petal atmosphere
- `src/components/RSVP.jsx` - Google Apps Script RSVP form with validation and honeypot protection
- `src/components/MusicControl.jsx` â€” sticky mute/play control
- `src/assets/` â€” optimized local WebP artwork and isolated decorative elements
- `public/audio/background-music.m4a` - background music started from the invitation open action

## RSVP integration

RSVP submissions use `VITE_RSVP_ENDPOINT`. Copy `.env.example` for local setup, and keep `.env.production` configured for the public Google Apps Script endpoint. The submitted fields are `name`, `phone`, `attending`, `message`, and the hidden `website` honeypot field.

## Music

Audio begins only after the visitor presses **Open Invitation**. Place the licensed track at `public/audio/background-music.m4a`; Vite serves it as `/audio/background-music.m4a`.

## Hosting

The Vite base path is relative (`./`), so the build works from a domain root or a static subfolder. Deploy the contents of `dist/` to Netlify, Vercel, GitHub Pages, Cloudflare Pages, Firebase Hosting, or any static web host.

