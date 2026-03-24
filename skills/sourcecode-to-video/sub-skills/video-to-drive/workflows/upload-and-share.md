# Workflow: Upload Video to Google Drive

## Step 1: Verify gws Authentication

```bash
gws drive files list --params '{"pageSize":1}'
```

If it returns results (even an empty list), auth is valid — continue.
If it errors, run:
```bash
gws auth setup
# Opens a browser for Google sign-in. One-time only.
```

---

## Step 2: Confirm Video File Exists

```bash
ls -la video/out/demo.mp4
```

Confirm the file exists and has a reasonable size (typically 5-50MB).

---

## Step 3: Upload Video

```bash
gws drive +upload video/out/demo.mp4 --name "PROJECT_NAME Demo Video"
```

**Replace `PROJECT_NAME` with the actual project name.**

On success, returns:
```json
{
  "kind": "drive#file",
  "id": "1ABC...XYZ",
  "name": "PROJECT_NAME Demo Video",
  "mimeType": "video/mp4"
}
```

Note the `id` value (this is the FILE_ID).

---

## Step 4: Set Public Sharing Permission

```bash
gws drive permissions create \
  --params '{"fileId":"FILE_ID","sendNotificationEmail":false}' \
  --json '{"role":"reader","type":"anyone"}'
```

**Replace `FILE_ID` with the id from Step 3.**

Returns permission info on success.

---

## Step 5: Build and Return the Shareable URL

```
https://drive.google.com/file/d/FILE_ID/view
```

Tell the user:
```
Video uploaded to Google Drive successfully!

Share link: https://drive.google.com/file/d/FILE_ID/view

Anyone with this link can watch the video — no login required.
```

---

## Optional: Upload to a Specific Folder

If the user wants the video in a specific Drive folder:

1. Get the folder ID from the Drive URL
2. Add `--parent` to the upload command:
```bash
gws drive +upload video/out/demo.mp4 \
  --name "PROJECT_NAME Demo Video" \
  --parent FOLDER_ID
```

---

## Troubleshooting

### Upload fails: quota exceeded
Google Drive free storage (15GB) is full.
Clear up space or use a Shared Drive.

### Upload succeeds but link won't play
Confirm Step 4 set `{"role":"reader","type":"anyone"}` successfully.
Re-run Step 4 if needed.

### `gws` command not found
```bash
npm install -g @googleworkspace/cli
```
If still not found, check that npm global bin is in PATH:
```bash
npm config get prefix
# Add <prefix>/bin to PATH
```

### "This is not an officially supported Google product" warning
Normal. `gws` is an experimental project under the googleworkspace GitHub org.
Functionality is stable — ignore the warning.
