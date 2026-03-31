# Workflow: Generate Remotion Video

## Step 1: Read Stitch Metadata

```bash
cat .stitch/metadata.json
```

Get the `projectId` and all `screenIds` (in order).

---

## Step 2: Download Screen Screenshots

Create the directory:
```bash
mkdir -p video/public/assets/screens
```

For each screen, download and name sequentially:
```
mcp__stitch__fetch_screen_image({
  projectId: "XXXXX",
  screenId: "SCREEN_ID"
})
```

Save as `video/public/assets/screens/01-name.png`, `02-name.png`, etc. (two-digit prefix ensures correct sort order).

---

## Step 3: Build Remotion Project Structure

Create the following structure under `video/` (based on `resources/remotion-template/`):

```
video/
├── src/
│   ├── index.ts
│   ├── Root.tsx
│   ├── WalkthroughComposition.tsx
│   ├── ScreenSlide.tsx
│   └── screens.ts          ← customize this
├── public/
│   └── assets/
│       └── screens/        ← screenshots go here
├── remotion.config.ts
├── tsconfig.json
└── package.json
```

Copy template files (`index.ts`, `Root.tsx`, `WalkthroughComposition.tsx`, `ScreenSlide.tsx`, `remotion.config.ts`, `tsconfig.json`, `package.json`) into the `video/` directory.

---

## Step 4: Generate screens.ts

Fill in the SCREENS array based on the actual screens:

```typescript
export interface Screen {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  device: 'tablet' | 'mobile';
  durationInSeconds: number;
}

export const SCREENS: Screen[] = [
  {
    id: '01',
    title: 'Page Title',
    description: 'Brief description of this page',
    imagePath: 'assets/screens/01-name.png',
    device: 'tablet',  // or 'mobile'
    durationInSeconds: 4,
  },
  // ... remaining screens
];

export const FPS = 30;
export const TRANSITION_DURATION = 20; // frames

export const totalDurationInFrames = SCREENS.reduce(
  (acc, screen) => acc + screen.durationInSeconds * FPS + TRANSITION_DURATION,
  0
);
```

**Recommended durations per screen:**
- Simple page: 3-3.5 seconds
- Regular page: 4 seconds
- Key result page: 5 seconds

---

## Step 5: Install Dependencies

```bash
cd video
npm install
npm install --save-dev @rspack/core
```

---

## Step 6: (Optional) Preview

```bash
cd video
node node_modules/@remotion/cli/remotion-cli.js studio
```

Opens Remotion Studio at http://localhost:3000 for user to preview. Close when done.

---

## Step 7: Render Video

```bash
cd video
node node_modules/@remotion/cli/remotion-cli.js render WalkthroughComposition out/demo.mp4 --codec h264 --public-dir=./public
```

**First run** will download Chrome Headless Shell (~107MB) — just wait for it to complete.

Confirm output:
```bash
ls -la out/demo.mp4
```

---

## Step 8: User Confirmation

Tell the user:
```
Video rendered successfully: video/out/demo.mp4

Open it with your media player to review.
To adjust timing, titles, or descriptions, edit video/src/screens.ts and re-render.

Let me know when you're happy with it and I'll upload it to Google Drive.
```

**Wait for user confirmation, then proceed to Sub-skill 3: video-to-drive.**
