---
name: source-to-stitch
description: Analyze existing web source code structure, understand UI page flows, and generate all page design screenshots in Google Stitch.
allowed-tools:
  - "mcp__stitch__*"
  - "Read"
  - "Write"
  - "Glob"
  - "Grep"
  - "Bash"
---

# Sub-skill 1: source-to-stitch

Analyze web source code → plan screens → create Stitch project → generate all UI designs

---

## Workflow

See `workflows/analyze-and-generate.md` for detailed steps.

### Quick Overview

1. **Scan source code** — identify all pages, components, design system
2. **Plan screens** — list screens, confirm with user
3. **Create Stitch project** — `mcp__stitch__create_project`
4. **Generate screens** — submit one by one, **do not wait** (socket hang up is normal)
5. **Verify results** — use `list_screens` + `fetch_screen_image`
6. **User confirmation** — ask user to review at stitch.withgoogle.com

---

## ⚠️ Important Notes

### Socket Hang Up is Normal!
`generate_screen_from_text` returning "socket hang up" is NOT a failure.
Stitch API takes 1-3 minutes to generate. The MCP connection times out first, but generation continues in the background.
**Never retry.** Wait 30-60 seconds, then check with `list_screens`.

### Save the Project ID
Immediately write the projectId to `.stitch/metadata.json` after creating the project.

---

## Output

- `.stitch/metadata.json` — project ID + all screen IDs
- `.stitch/designs/` — downloaded screen screenshots (for user review)
