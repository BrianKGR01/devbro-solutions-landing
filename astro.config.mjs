// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

// Sin PUBLIC_SITE_URL, Astro.site queda undefined: Base.astro omite
// canonical y og:url en vez de inventar un dominio (ver docs/06-decisiones.md D3)
const sitioProduccion = process.env.PUBLIC_SITE_URL || undefined;

// https://astro.build/config
export default defineConfig({
  site: sitioProduccion,
  adapter: vercel()
});