// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import vercel from '@astrojs/vercel';

// Sin PUBLIC_SITE_URL, Astro.site queda undefined: Base.astro omite
// canonical, og:url y el sitemap en vez de inventar un dominio (D3).
//
// En Vercel la variable ya llega en process.env (la inyecta la config del
// proyecto). En local, este archivo se evalua ANTES de que Vite cargue el
// .env para el resto del build -- un .env con PUBLIC_SITE_URL nada mas,
// sin exportarla tambien como variable de shell, quedaba sin efecto
// (docs/06-decisiones.md D25). loadEnv cubre ese caso local leyendo el
// .env directamente.
// '.' en vez de process.cwd(): el proyecto no tiene @types/node instalado
// (no está en la lista de dependencias aprobadas de docs/04-engineering.md)
// y astro/npm siempre invocan este archivo con cwd en la raiz del proyecto.
const envLocal = loadEnv('', '.', 'PUBLIC_');
const sitioProduccion = process.env.PUBLIC_SITE_URL || envLocal.PUBLIC_SITE_URL || undefined;

// https://astro.build/config
export default defineConfig({
  site: sitioProduccion,
  adapter: vercel()
});