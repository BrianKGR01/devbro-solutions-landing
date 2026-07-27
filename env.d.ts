// astro.config.mjs corre en Node fuera de Vite: sin @types/node (no está en la
// lista de dependencias permitidas de docs/04-engineering.md), se declara acá
// el único global que usa: process.env para leer PUBLIC_SITE_URL.
declare const process: {
  env: Record<string, string | undefined>;
};
