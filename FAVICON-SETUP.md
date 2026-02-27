# Favicon Setup Instructions

## Files Required

You need to generate the following favicon files using a tool like:
- https://realfavicongenerator.net/
- https://favicon.io/

Upload your logo (preferably 512x512 PNG) to generate all sizes.

## Files to Create

Place these files in `/assets/favicon/`:

1. **favicon.ico** - Multi-resolution ICO file (16x16, 32x32, 48x48)
2. **favicon-16x16.png** - 16x16 PNG
3. **favicon-32x32.png** - 32x32 PNG
4. **apple-touch-icon.png** - 180x180 PNG
5. **android-chrome-192x192.png** - 192x192 PNG
6. **android-chrome-512x512.png** - 512x512 PNG

## HTML Head Code

Add this to the `<head>` section of ALL pages:

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/assets/favicon/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#3D3229">
<meta name="msapplication-TileColor" content="#3D3229">
<meta name="msapplication-config" content="/browserconfig.xml">
```

## Browser Config for Windows Tiles

Create `/browserconfig.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/assets/favicon/mstile-150x150.png"/>
            <TileColor>#3D3229</TileColor>
        </tile>
    </msapplication>
</browserconfig>
```

## Testing

After setup, test at:
- https://realfavicongenerator.net/favicon_checker
