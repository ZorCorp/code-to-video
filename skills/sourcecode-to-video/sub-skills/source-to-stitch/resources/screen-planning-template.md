# Screen Planning Template

## Project Info

```
Project name: ___________
Brand colors: Primary #______ Accent #______ Background #______
Font: ___________
Target devices: tablet (kiosk) / mobile / both
```

---

## Screen List Template

Fill in the following fields for each screen:

| # | Slug | Title | Description | Device | Duration (s) |
|---|------|-------|-------------|--------|--------------|
| 01 | product-grid | Select Product | Browse product list, user taps a product | tablet | 4 |
| 02 | qr-code | Scan QR Code | Show QR code, guide user to scan with phone | tablet | 4 |
| 03 | mobile-upload | Upload Photo | Mobile photo upload page | mobile | 3.5 |
| 04 | processing | AI Processing | Loading screen while AI generates result | tablet | 3.5 |
| 05 | result | View Result | Display AI-generated final result | tablet | 5 |

---

## Recommended Screen Count

- **Simple app (3-5 pages):** 6-8 screens
- **Medium app (5-10 pages):** 10-14 screens
- **Complex app (10+ pages):** 14-20 screens

One screen per major state/page.
Key interactions (e.g. select → confirm → result) can be split into multiple screens.

---

## Common User Flow Patterns

### E-commerce / Shopping Flow
```
Product list → Product detail → Add to cart → Checkout → Payment → Order confirmation
```

### Upload / Generation Flow
```
Start → Select/Upload → Processing → Result → Share/Download
```

### Kiosk + Mobile Dual-Device Flow
```
[Kiosk] Select → Show QR → Wait → Result
[Mobile] Scan → Upload → Done prompt
```

### Login / Settings Flow
```
Login → Dashboard → Settings → Confirm
```
