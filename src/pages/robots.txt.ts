import type { APIRoute } from 'astro';

// /og es una ruta utilitaria para generar public/og.png (docs/06-decisiones.md
// D25), no contenido: fuera del sitemap y explicitamente disallowed aca,
// ademas del <meta name="robots" content="noindex, nofollow"> propio de la
// pagina. La linea Sitemap solo se emite con PUBLIC_SITE_URL real (D3) --
// nunca una URL relativa o inventada.
export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const lineas = ['User-agent: *', 'Disallow: /og'];

  if (site) {
    lineas.push('', `Sitemap: ${new URL('/sitemap.xml', site).toString()}`);
  }

  return new Response(lineas.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
