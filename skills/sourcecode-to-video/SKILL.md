---
name: sourcecode-to-video
description: Turn existing web source code into a shareable Google Drive demo video — analyzes code, generates Stitch UI screens, renders a Remotion MP4, and uploads to Google Drive.
allowed-tools:
  - "mcp__stitch__*"
  - "Read"
  - "Write"
  - "Edit"
  - "Bash"
  - "Glob"
  - "Grep"
  - "Agent"
---

# sourcecode-to-video

Turn existing web source code into a shareable POC demo video, entirely from the terminal.

## Prerequisites

Confirm the following tools are installed and configured before running:

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

**GCP Console (only GUI step):**
Enable the Stitch API: GCP Console → APIs & Services → search "Stitch API" → Enable. Wait 2-3 minutes to take effect.

**MCP configuration:**
Create `.mcp.json` in the project root:
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
Then restart Claude Code.

---

## Full Pipeline

```
[AI]   Sub-skill 1: Analyze source code, plan screens list
[USER] Confirm screens list
[AI]   Sub-skill 1: Create Stitch project, generate all screens
[USER] (Optional) Review and refine designs at stitch.withgoogle.com
[USER] Confirm designs are ready
[AI]   Sub-skill 2: Download screens, build Remotion project, render MP4
[USER] Confirm video looks good
[AI]   Sub-skill 3: Upload to Google Drive, return shareable URL
```

---

## Sub-skills

### 1. source-to-stitch
**Trigger:** User provides source code directory, requests Stitch UI generation
**Path:** `sub-skills/source-to-stitch/SKILL.md`

### 2. stitch-to-video
**Trigger:** User confirms Stitch designs are ready, requests video generation
**Path:** `sub-skills/stitch-to-video/SKILL.md`

### 3. video-to-drive
**Trigger:** User confirms video looks good, requests upload and sharing
**Path:** `sub-skills/video-to-drive/SKILL.md`

---

## Entry Point

When `/sourcecode-to-video` is invoked:

1. Ask the user: "What is the path to your web project? What key user flows should the video demonstrate?"
2. Execute the three sub-skills in order
3. Wait for user confirmation between each sub-skill
4. Return the final Google Drive shareable URL
