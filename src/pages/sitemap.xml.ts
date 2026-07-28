import type { APIRoute } from 'astro';

// Sin integracion @astrojs/sitemap (no esta en la lista de dependencias
// aprobadas de docs/04-engineering.md -- CLAUDE.md pide aprobacion previa
// para cualquier libreria nueva). Landing de una sola pagina: una unica
// URL real. Gateado por PUBLIC_SITE_URL igual que canonical/og:url en
// Base.astro (docs/06-decisiones.md D3): sin dominio real no tiene sentido
// publicar URLs relativas o inventadas.
export const prerender = true;

const RUTAS = ['/'];

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Sitemap no disponible: falta PUBLIC_SITE_URL.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const urls = RUTAS.map(
    (ruta) => `  <url>\n    <loc>${new URL(ruta, site).toString()}</loc>\n  </url>`
  ).join('\n');

  const cuerpo = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
