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

<!-- BEGIN zorskill-release (managed by zorskill-dev) -->
## Releasing this plugin

This repo is a **ZorCorp marketplace plugin**, published via the `zorskill` marketplace.
Releases are deliberate and self-service — do **not** hand-edit the version or touch the
marketplace repo.

**To cut a release** (when a change is worth shipping to users):

    gh workflow run release.yml -f version=<x.y.z>    # semver, no leading "v"

That workflow bumps `.claude-plugin/plugin.json`, commits, and tags `v<x.y.z>`. The zorskill
marketplace's drift scanner then carries it in automatically within ~30 min (forward-only,
validated). You never edit `marketplace.json` or open the marketplace repo.

- Semver: **patch** for a fix, **minor** for a feature, **major** for a breaking change.
- Don't bump `plugin.json` by hand — the workflow owns it. A change without a release stays
  in this repo and never reaches users; run the workflow when you want it shipped.

**If Claude Code is assisting here:** after a shippable change is committed, remind the user
they can release with the `gh workflow run release.yml` command above and help them pick the
semver bump. Do not edit the version file or the marketplace directly.
<!-- END zorskill-release (managed by zorskill-dev) -->
