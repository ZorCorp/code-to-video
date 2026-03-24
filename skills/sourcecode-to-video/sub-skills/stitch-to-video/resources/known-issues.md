# Remotion Known Issues & Fixes

Lessons learned from the HKUST Souvenir Shop POC project.

---

## Issue 1: Image 404 (http://localhost:3000/assets/screens/xxx.png)

**Symptom:** All images return 404 during render; video shows only black background.

**Cause:** Remotion cannot find the `public/` directory.

**Fix (all three required together):**

1. Add to `remotion.config.ts`:
```typescript
import {Config} from '@remotion/cli/config';
Config.setPublicDir('./public');
```

2. Add flag to render command:
```bash
node node_modules/@remotion/cli/remotion-cli.js render WalkthroughComposition out/demo.mp4 --codec h264 --public-dir=./public
```

3. Wrap image paths with `staticFile()` in components:
```typescript
import {staticFile, Img} from 'remotion';
<Img src={staticFile(screen.imagePath)} />
```

---

## Issue 2: Cannot find module '@rspack/core'

**Symptom:** Module not found error when running `npm start` or render.

**Cause:** `@rspack/core` is a Remotion bundler peer dependency that npm does not auto-install.

**Fix:**
```bash
npm install --save-dev @rspack/core
```

---

## Issue 3: Could not find tsconfig.json

**Symptom:** Remotion CLI errors on missing TypeScript config.

**Cause:** Remotion CLI requires a `tsconfig.json`.

**Fix:** Create `video/tsconfig.json`:
```json
{
  "compilerOptions": {
    "lib": ["dom", "esnext"],
    "jsx": "react",
    "module": "esnext",
    "target": "esnext",
    "strict": true,
    "outDir": "./dist",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  }
}
```

---

## Issue 4: `npx remotion` fails on Windows

**Symptom:** `npx remotion render ...` errors or hangs.

**Cause:** npm binary path resolution issue on Windows.

**Fix:** Call the CLI JS file directly via node:
```bash
node node_modules/@remotion/cli/remotion-cli.js render WalkthroughComposition out/demo.mp4 --codec h264 --public-dir=./public
```

---

## Issue 5: First render downloads Chrome Headless Shell (~107MB)

**Symptom:** First render hangs at "Downloading Chrome Headless Shell..." for 3-10 minutes.

**Cause:** Remotion uses headless Chrome to render React components. Downloaded once on first use.

**Fix:** Just wait. It caches locally and won't re-download afterwards.

---

## Issue 6: Slow render speed

**Symptom:** Rendering a 1-2 minute video takes 5-10 minutes.

**Cause:** Normal behavior — Remotion renders frame by frame.

**Optimization:** Add `--concurrency` flag:
```bash
node node_modules/@remotion/cli/remotion-cli.js render WalkthroughComposition out/demo.mp4 --codec h264 --public-dir=./public --concurrency 4
```

---

## Issue 7: `out/` directory does not exist

**Symptom:** Render errors with output directory not found.

**Fix:**
```bash
mkdir -p video/out
```

---

## Issue 8: Wrong imagePath format in screens.ts

**Symptom:** Video plays but images are blank or broken.

**Cause:** `imagePath` must be relative to the `public/` directory.

**Correct:**
```typescript
imagePath: 'assets/screens/01-product-grid.png'
// File location: video/public/assets/screens/01-product-grid.png
```

**Wrong:**
```typescript
imagePath: './public/assets/screens/01-product-grid.png'  // ❌
imagePath: '/assets/screens/01-product-grid.png'          // ❌
```
