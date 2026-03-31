# code-to-video

> Claude Code plugin — Turn existing web source code into a shareable Google Drive POC demo video

## Overview

```
web source code → Stitch UI designs → Remotion MP4 → Google Drive URL
```

The entire pipeline runs inside Claude Code. Only minimal human confirmation steps are needed.

## Installation

```bash
# 1. Add the marketplace
/plugin marketplace add CYH928/codetovideo-plugin

# 2. Install the plugin
/plugin install code-to-video
```

## Usage

```
/code-to-video:code-to-video
```

Then follow the AI prompts to provide your project path and feature description.

## Sample Prompts

### Full pipeline (all 3 sub-skills)

Run the entire pipeline end-to-end with a single invocation:

```
/code-to-video:code-to-video

> My project is at C:\Projects\my-webapp. It's a Next.js e-commerce store.
> Please generate a demo video showing the shopping flow: browse products →
> add to cart → checkout → order confirmation.
```

```
/code-to-video:code-to-video

> Source code is at ~/projects/dashboard-app (React + Tailwind).
> Key flows to demo: user login → view analytics dashboard → export report as PDF.
```

### Sub-skill 1: source-to-stitch

Analyze source code and generate Stitch UI screen designs only (no video):

```
/code-to-video:source-to-stitch

> Analyze the project at C:\Projects\my-webapp. It's a Vue.js app for booking
> hotel rooms. Generate Stitch screens for: search hotels → view room details →
> select dates → complete booking → confirmation page.
```

### Sub-skill 2: stitch-to-video

Convert existing Stitch designs into an MP4 video (assumes sub-skill 1 is already done):

```
/code-to-video:stitch-to-video

> The Stitch designs are ready. The project metadata is at
> C:\Projects\my-webapp\.stitch\metadata.json. Please render the demo video.
```

### Sub-skill 3: video-to-drive

Upload a rendered video to Google Drive (assumes sub-skill 2 is already done):

```
/code-to-video:video-to-drive

> The video is at C:\Projects\my-webapp\video\out\demo.mp4.
> Please upload it to Google Drive and give me a shareable link.
```

### Tips

- **Be specific about user flows** — the more detail you give about the screens and flow, the better the Stitch designs will be.
- **Mention your tech stack** — helps the AI understand your project structure (e.g., Next.js, Vue, React + Tailwind).
- **Include design preferences** — you can specify colors, fonts, or branding (e.g., "use dark theme with #003366 navy and #C4972F gold accents").
- **Run sub-skills individually** if you want more control, or re-run a single step (e.g., re-render the video with different timing).

## Pipeline

| Step | Sub-skill | What it does |
|------|-----------|-------------|
| 1 | `source-to-stitch` | Analyzes source code → generates Stitch UI screens |
| 2 | `stitch-to-video` | Stitch screens → Remotion MP4 video |
| 3 | `video-to-drive` | Uploads to Google Drive → returns shareable URL |

## Prerequisites

| Tool | Install | Purpose |
|------|---------|---------|
| `gcloud` CLI | [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) | Stitch MCP authentication |
| Node.js 18+ | — | Remotion rendering |
| `gws` CLI | `npm install -g @googleworkspace/cli` | Google Drive upload |

**One-time setup:**
```bash
# Authenticate Stitch MCP
gcloud auth application-default login

# Authenticate Google Drive (opens browser once)
gws auth setup
```

**GCP Console:**
Enable the Stitch API: GCP Console → APIs & Services → search "Stitch API" → Enable.

**MCP configuration:**
Create `.mcp.json` in your project root:
```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["stitch-mcp"]
    }
  }
}
```
Add to `~/.claude/settings.json`: `"enabledMcpjsonServers": ["stitch"]`

## Reference Example

See `skills/code-to-video/examples/uststore/` — HKUST Souvenir Shop Virtual Try-On POC

## Tech Stack

- **Stitch** — Google AI UI design generation
- **Remotion** — React-based programmatic video rendering
- **gws CLI** — Google Workspace CLI (Drive upload)
- **Chrome Headless Shell** — Remotion rendering engine (auto-downloaded ~107MB on first run)

## License

MIT
