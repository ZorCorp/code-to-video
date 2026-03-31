# Workflow: Analyze Source Code and Generate Stitch UI

## Step 1: Scan Source Code Structure

```bash
ls app/ pages/ components/ 2>/dev/null || true
```

Scan for:
- **Page routes**: `app/*/page.tsx`, `pages/*.tsx`
- **Core components**: `components/` directory
- **Design tokens**: colors, fonts (`globals.css`, `tailwind.config.*`)
- **User flows**: state machines, session states, user journeys

Extract:
- List of main pages (kiosk flow + mobile flow)
- Brand colors (primary, accent, background)
- Font choices
- Key UI elements

---

## Step 2: Plan Screens List

Plan screens based on the user flow. Use `resources/screen-planning-template.md` as a guide.

Present the list to the user for confirmation:
```
I plan to generate N screens:
1. [name] — [description] (device: tablet/mobile)
2. ...
Does this look correct? Anything to add or remove?
```

**Wait for user confirmation before proceeding.**

---

## Step 3: Create Stitch Project

```
mcp__stitch__create_project({
  title: "PROJECT_NAME UI Walkthrough"
})
```

Immediately save the projectId:
```json
// .stitch/metadata.json
{
  "projectId": "XXXXX",
  "projectTitle": "PROJECT_NAME UI Walkthrough",
  "screens": []
}
```

---

## Step 4: Generate Screens One by One

For each screen, call:
```
mcp__stitch__generate_screen_from_text({
  projectId: "XXXXX",
  prompt: "[detailed UI description with layout, colors, content, interactive elements]"
})
```

**Key rules:**
- Each prompt must include: device type (tablet/mobile), brand colors, specific UI content
- On "socket hang up" → **normal, move to next screen, never retry**
- After all submissions, wait 60 seconds

**Prompt template:**
```
[DEVICE] screen for [APP_NAME].
Layout: [describe layout]
Content: [describe main content]
Colors: Primary [hex], Accent [hex], Background [hex]
Style: [e.g. clean, minimal, modern]
Key elements: [list key UI elements]
```

---

## Step 5: Verify Generation Results

After 60 seconds:
```
mcp__stitch__list_screens({ projectId: "XXXXX" })
```

If `list_screens` returns oversized JSON (token limit exceeded), the result is saved to a tool-results file. Parse it with:
```bash
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('TOOL_RESULT_FILE'));
console.log(JSON.stringify(data.screens?.map(s => ({id: s.id, name: s.name})), null, 2));
"
```

Confirm the count matches expectations. If screens are missing, wait another 30 seconds (they may still be generating).

Download screenshots for confirmation:
```
mcp__stitch__fetch_screen_image({
  projectId: "XXXXX",
  screenId: "SCREEN_ID"
})
```

Save to `.stitch/designs/01-xxx.png`, `02-xxx.png`, etc.

---

## Step 6: Update metadata.json

```json
{
  "projectId": "XXXXX",
  "projectTitle": "PROJECT_NAME UI Walkthrough",
  "screens": [
    {"id": "SCREEN_ID_1", "name": "product-grid", "order": 1},
    {"id": "SCREEN_ID_2", "name": "qr-code", "order": 2}
  ]
}
```

---

## Step 7: User Confirmation

Show all screenshots and tell the user:
```
Generated N Stitch screens successfully!

You can visit https://stitch.withgoogle.com/project/PROJECT_ID
to review and refine the designs (optional).

Let me know when you're ready to generate the video.
```

**Wait for user confirmation, then proceed to Sub-skill 2: stitch-to-video.**
