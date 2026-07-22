import { defineConfig } from 'astro/config';

// build.format 'preserve' keeps the exact source URL shape:
//   src/pages/about/index.astro       -> /about/            (directory pages)
//   src/pages/location/clifton-dha.astro -> /location/clifton-dha.html (flat .html pages)
// This preserves every existing indexed URL exactly (no redirects, no SEO loss).
export default defineConfig({
  site: 'https://mrlawassociates.com',
  trailingSlash: 'ignore',
  build: { format: 'preserve' },
});
