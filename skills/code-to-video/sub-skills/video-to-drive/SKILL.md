---
name: video-to-drive
description: Upload a local MP4 video to Google Drive, set public sharing permissions, and return a playable shareable URL.
allowed-tools:
  - "Bash"
  - "Read"
---

# Sub-skill 3: video-to-drive

Upload video to Google Drive → set public sharing → return shareable URL

---

## Prerequisites

Verify `gws` CLI is installed and authenticated:
```bash
gws drive files list --params '{"pageSize":1}'
```

If you get an auth error, run (browser required, one-time only):
```bash
gws auth setup
```

---

## Workflow

See `workflows/upload-and-share.md` for detailed steps.

### Quick Overview

1. **Confirm video path** — default: `video/out/demo.mp4`
2. **Upload to Drive** — `gws drive +upload`, get file ID
3. **Set public sharing** — `gws drive permissions create`
4. **Return URL** — `https://drive.google.com/file/d/FILE_ID/view`

---

## ⚠️ Important Notes

### gws is Google Workspace CLI, not gcloud
- `gcloud` only manages GCP resources (GCS, Vertex AI, etc.)
- `gcloud` **cannot** upload to Google Drive
- Must use `gws` (`npm install -g @googleworkspace/cli`)

### gws auth requires a browser (one-time only)
`gws auth setup` is the only step that requires manual interaction. The token is then cached in the OS keyring.

---

## Output

- Google Drive shareable URL (playable by anyone):
  `https://drive.google.com/file/d/FILE_ID/view`
