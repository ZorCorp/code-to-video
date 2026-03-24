# Example: HKUST Souvenir Shop

Reference run of the `sourcecode-to-video` skill.

## Project Info

- **Project:** HKUST Souvenir Shop Virtual Try-On Kiosk POC
- **Source path:** `C:\Projects\uststore`
- **Tech stack:** Next.js, Firebase, Vertex AI Virtual Try-On

## Results

### Stitch Project
- **Project ID:** `11429040449597536497`
- **Project URL:** https://stitch.withgoogle.com/project/11429040449597536497
- **Screen count:** 10

### Screens

| # | Title | Device | Duration |
|---|-------|--------|----------|
| 01 | Select Garment | tablet | 4s |
| 02 | Scan QR Code | tablet | 4s |
| 03 | Upload Photo | mobile | 3.5s |
| 04 | AI Processing | tablet | 3.5s |
| 05 | Upload Complete | mobile | 3s |
| 06 | Try-On Result | tablet | 5s |
| 07 | Select Payment | tablet | 4s |
| 08 | Confirm Payment | tablet | 4s |
| 09 | Processing Payment | tablet | 3s |
| 10 | Payment Success | tablet | 5s |

### Video
- **Local path:** `C:\Projects\uststore\video\out\demo.mp4`
- **Google Drive:** https://drive.google.com/file/d/19_hkVjzDmU4AldXlxA2FB0FI5rzBR3_-/view
- **Duration:** ~55 seconds (1280x720, 30fps)

## Design System

```
Primary:    #003366 (UST Navy)
Accent:     #C4972F (UST Gold)
Background: #0a0a1a (dark)
Font:       sans-serif
```

## Issues Encountered

1. **Stitch API 403** → Enable Stitch API in GCP Console first
2. **Socket hang up** → Normal; wait 60s then check with `list_screens`
3. **Remotion image 404** → Three-part fix (remotion.config.ts + --public-dir + staticFile)
4. **npx remotion fails** → Use `node node_modules/@remotion/cli/remotion-cli.js` directly
5. **First render downloads 107MB** → Normal; just wait

See `sub-skills/stitch-to-video/resources/known-issues.md` for details.
