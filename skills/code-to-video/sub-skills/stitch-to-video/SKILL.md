---
name: stitch-to-video
description: Download all Stitch screen screenshots, build a Remotion project, and render an MP4 video.
allowed-tools:
  - "mcp__stitch__*"
  - "Read"
  - "Write"
  - "Edit"
  - "Bash"
  - "Glob"
---

# Sub-skill 2: stitch-to-video

Stitch screens → Remotion MP4 video

---

## Workflow

See `workflows/generate-video.md` for detailed steps.

### Quick Overview

1. **Download screens** — `fetch_screen_image` → save to `video/public/assets/screens/`
2. **Build Remotion project** — copy from `resources/remotion-template/`
3. **Generate screens.ts** — fill in the SCREENS array
4. **Install dependencies** — `npm install` + `npm install --save-dev @rspack/core`
5. **Render video** — `node node_modules/@remotion/cli/remotion-cli.js render`
6. **User confirmation** — confirm video looks good

---

## ⚠️ Important Notes

### On Windows: use node directly, not npx
```bash
# Correct (works on Windows and all platforms)
node node_modules/@remotion/cli/remotion-cli.js render WalkthroughComposition out/demo.mp4 --codec h264 --public-dir=./public

# May fail on Windows
npx remotion render ...
```

### Three-part fix for image 404
1. `remotion.config.ts` sets `Config.setPublicDir('./public')`
2. render command includes `--public-dir=./public`
3. Components use `staticFile()` to wrap image paths

### First render downloads Chrome Headless Shell (~107MB)
Normal behavior. It caches locally after the first download.

See `resources/known-issues.md` for all documented issues.

---

## Output

- `video/out/demo.mp4` — rendered video
