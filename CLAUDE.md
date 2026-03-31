# code-to-video

Claude Code plugin that converts web source code into shareable demo videos.

## Pipeline

```
web source code → Stitch UI designs → Remotion MP4 → Google Drive URL
```

Three sub-skills run in order: `source-to-stitch` → `stitch-to-video` → `video-to-drive`.
Wait for user confirmation between each sub-skill before proceeding.

## Key Constraints

- **Stitch API timeouts are normal.** `generate_screen_from_text` often returns "socket hang up" — this is NOT a failure. Never retry. Wait 30-60s, then verify with `list_screens`.
- **On Windows, use `node` directly for Remotion**, not `npx`:
  ```bash
  node node_modules/@remotion/cli/remotion-cli.js render WalkthroughComposition out/demo.mp4 --codec h264 --public-dir=./public
  ```
- **Google Drive upload uses `gws` CLI**, not `gcloud`. They are different tools.
- **Save the Stitch project ID** to `.stitch/metadata.json` immediately after creating a project.
- **First Remotion render downloads Chrome Headless Shell (~107MB)** — this is expected.

## Project Structure

- `skills/code-to-video/SKILL.md` — main skill entrypoint
- `skills/code-to-video/sub-skills/` — individual pipeline stages
- `skills/code-to-video/examples/` — reference implementations

## Build / Test

No build step. This is a pure-markdown skill plugin with one Remotion template at:
`skills/code-to-video/sub-skills/stitch-to-video/resources/remotion-template/`
