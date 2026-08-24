// Ruta API server-side (docs/04-engineering.md §6). Nunca se importa
// @supabase/supabase-js ni resend desde un componente -- las claves de
// servicio solo existen aca, en el server, y jamas llegan al bundle del
// cliente porque ninguna variable usa el prefijo PUBLIC_.
//
// prerender=false: el resto del sitio sigue siendo estatico (Lighthouse,
// docs/04 §7); esta es la unica ruta que corre on-demand como funcion.
export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const CAMPOS_REQUERIDOS = [
  'nombre',
  'correo',
  'whatsapp',
  'industria',
  'problema',
  'usuarios',
  'presupuesto',
  'incubadora',
] as const;

interface Lead {
  nombre: string;
  correo: string;
  whatsapp: string;
  industria: string;
  problema: string;
  usuarios: string;
  plazo: string | null;
  presupuesto: string;
  incubadora: string;
  nombre_incubadora: string | null;
  // Que paquete (SONDA/LANZAMIENTO/EXPEDICION) origino el envio, si vino del
  // CTA de una tarjeta de Paquetes.astro en vez de otro CTA de la pagina.
  // Columna existente en `leads` (docs/04-engineering.md SS6), sin usar hasta ahora.
  origen: string | null;
}

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function textoPlano(valor: unknown): string {
  return typeof valor === 'string' ? valor.trim() : '';
}

// D7 (docs/06-decisiones.md): honeypot + control de tiempo, sin
// almacenamiento de ningun tipo en el cliente. Si dispara, se responde
// como si hubiera funcionado -- sin captcha, la unica defensa real es no
// delatarle a un bot que fue detectado.
function pareceBot(datos: Record<string, unknown>): boolean {
  if (textoPlano(datos.nombre_empresa) !== '') return true;

  const ts = Number(datos.ts);
  if (!Number.isFinite(ts)) return true;

  const transcurrido = Date.now() - ts;
  return transcurrido < 3000 || transcurrido > 86_400_000;
}

async function guardarEnSupabase(lead: Lead): Promise<boolean> {
  const url = import.meta.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return false;

  try {
    const supabase = createClient(url, key);
    const { error } = await supabase.from('leads').insert(lead);
    return !error;
  } catch {
    return false;
  }
}

function textoPlanoCorreo(lead: Lead): string {
  return [
    `Nombre: ${lead.nombre}`,
    `Correo: ${lead.correo}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Industria: ${lead.industria}`,
    `Problema: ${lead.problema}`,
    `Primeros usuarios: ${lead.usuarios}`,
    `Plazo: ${lead.plazo ?? '(no indicado)'}`,
    `Presupuesto: ${lead.presupuesto}`,
    `Incubadora/Programa: ${lead.incubadora}${lead.nombre_incubadora ? ` (${lead.nombre_incubadora})` : ''}`,
    `Paquete de interés: ${lead.origen ?? '(no especificado, no vino de un paquete)'}`,
  ].join('\n');
}

// El campo viene de un <textarea> de un visitante cualquiera -- nunca
// confiar en el, va directo a un contexto HTML. Sin esto, alguien podria
// mandar <img onerror=...> en "problema" y ejecutarlo en el cliente de
// correo de Kevin.
function escaparHtml(valor: string): string {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br>');
}

// Correo HTML del aviso de lead (D28, docs/06-decisiones.md). Tabla +
// estilos inline, sin <style>, sin fuente propia: un cliente de correo no
// carga @font-face de forma confiable (Outlook en particular) y una tabla
// es lo unico que se comporta igual en todos los clientes -- mismas
// limitaciones ya documentadas para public/favicon.svg, misma resolucion:
// hex duplicados de tokens.css en vez de custom properties (un correo no
// puede leerlas), Arial/Helvetica y Courier New como aproximacion de
// Archivo/JetBrains Mono. Sin box-shadow ni clip-path (Outlook no los
// soporta) -- los chaflanes y el desplazamiento de sombra de la placa no
// se replican aca, solo el resto del lenguaje visual (fondo oscuro, texto
// en mono/mayuscula para etiquetas, acento en laton, bordes solidos sin
// redondear).
function construirCorreoHtml(lead: Lead): string {
  const filas: Array<[string, string]> = [
    ['Correo', `<a href="mailto:${escaparHtml(lead.correo)}" style="color:#EDEFEA;">${escaparHtml(lead.correo)}</a>`],
    ['WhatsApp', escaparHtml(lead.whatsapp)],
    ['Industria', escaparHtml(lead.industria)],
    ['Presupuesto', escaparHtml(lead.presupuesto)],
    ['Incubadora', lead.nombre_incubadora ? `${escaparHtml(lead.incubadora)} (${escaparHtml(lead.nombre_incubadora)})` : escaparHtml(lead.incubadora)],
    ['Plazo', lead.plazo ? escaparHtml(lead.plazo) : '<span style="color:#8A968F;">(no indicado)</span>'],
  ];

  const filasHtml = filas
    .map(
      ([etiqueta, valor]) => `
        <tr>
          <td style="padding:0 0 14px 0; width:130px; font-family:'Courier New',Courier,monospace; font-size:11px; letter-spacing:0.08em; color:#8A968F; text-transform:uppercase; vertical-align:top;">${etiqueta}</td>
          <td style="padding:0 0 14px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.5; color:#EDEFEA; vertical-align:top;">${valor}</td>
        </tr>`
    )
    .join('');

  const insigniaPaquete = lead.origen
    ? `<tr><td style="padding:0 0 20px 0;">
         <span style="display:inline-block; border:2px solid #1D7A52; color:#4FA57C; font-family:'Courier New',Courier,monospace; font-weight:700; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; padding:6px 12px;">INTERÉS: ${escaparHtml(lead.origen)}</span>
       </td></tr>`
    : '';

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>Nuevo lead</title>
  </head>
  <body style="margin:0; padding:0; background-color:#080B09;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#080B09;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">
            <tr>
              <td style="padding:0 0 24px 0; border-bottom:2px solid #1D7A52;">
                <span style="font-family:Arial,Helvetica,sans-serif; font-weight:800; font-size:20px; letter-spacing:-0.02em; color:#EDEFEA; text-transform:uppercase;">DEVBRO</span>
                <span style="display:inline-block; width:2px; height:14px; background-color:#B8A26A; margin:0 10px; line-height:14px; font-size:0;">&nbsp;</span>
                <span style="font-family:'Courier New',Courier,monospace; font-weight:700; font-size:11px; letter-spacing:0.12em; color:#8A968F; text-transform:uppercase;">SOLUTIONS</span>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0 4px 0; font-family:'Courier New',Courier,monospace; font-weight:700; font-size:11px; letter-spacing:0.12em; color:#8A968F; text-transform:uppercase;">
                Nuevo lead
              </td>
            </tr>
            <tr>
              <td style="padding:0 0 16px 0; font-family:Arial,Helvetica,sans-serif; font-weight:800; font-size:26px; color:#EDEFEA;">
                ${escaparHtml(lead.nombre)}
              </td>
            </tr>
            ${insigniaPaquete}
            <tr>
              <td style="background-color:#18201C; border:2px solid rgba(237,239,234,0.14); padding:24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${filasHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0 0 0; font-family:'Courier New',Courier,monospace; font-size:11px; letter-spacing:0.08em; color:#8A968F; text-transform:uppercase;">
                Problema
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0 0 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:#EDEFEA;">
                ${escaparHtml(lead.problema)}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 0 0 0; font-family:'Courier New',Courier,monospace; font-size:11px; letter-spacing:0.08em; color:#8A968F; text-transform:uppercase;">
                Primeros usuarios
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0 0 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:#EDEFEA;">
                ${escaparHtml(lead.usuarios)}
              </td>
            </tr>
            <tr>
              <td style="padding:32px 0 0 0; border-top:2px solid rgba(237,239,234,0.14);">
                <p style="margin:16px 0 0 0; font-family:'Courier New',Courier,monospace; font-size:11px; line-height:1.6; color:#8A968F;">
                  Respondé directo a este correo: ya va a la casilla del lead. Enviado automáticamente desde el formulario de devbro.xyz.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function avisarPorCorreo(lead: Lead): Promise<boolean> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const destino = import.meta.env.CORREO_DESTINO;
  if (!apiKey || !destino) return false;

  try {
    const resend = new Resend(apiKey);
    // devbro.xyz ya esta verificado en Resend (D26, docs/06-decisiones.md):
    // deja de usar onboarding@resend.dev.
    const { error } = await resend.emails.send({
      from: 'DevBro Solutions <info@devbro.xyz>',
      to: destino,
      replyTo: lead.correo,
      subject: `Nuevo lead: ${lead.nombre}${lead.origen ? ` (${lead.origen})` : ''}`,
      text: textoPlanoCorreo(lead),
      html: construirCorreoHtml(lead),
    });
    return !error;
  } catch {
    return false;
  }
}

export const POST: APIRoute = async ({ request }) => {
  let datos: Record<string, unknown>;
  try {
    datos = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  if (pareceBot(datos)) {
    return json({ ok: true }, 200);
  }

  for (const campo of CAMPOS_REQUERIDOS) {
    if (textoPlano(datos[campo]) === '') {
      return json({ ok: false }, 400);
    }
  }

  const lead: Lead = {
    nombre: textoPlano(datos.nombre),
    correo: textoPlano(datos.correo),
    whatsapp: textoPlano(datos.whatsapp),
    industria: textoPlano(datos.industria),
    problema: textoPlano(datos.problema),
    usuarios: textoPlano(datos.usuarios),
    plazo: textoPlano(datos.plazo) || null,
    presupuesto: textoPlano(datos.presupuesto),
    incubadora: textoPlano(datos.incubadora),
    nombre_incubadora: textoPlano(datos.nombre_incubadora) || null,
    origen: textoPlano(datos.origen) || null,
  };

  // Degradacion elegante (docs/04-engineering.md §6): las dos escrituras
  // son independientes. Si Supabase falla, el correo sale igual. Si el
  // correo falla, el lead se guarda igual. Solo si fallan las dos se
  // informa error real al cliente.
  const [guardado, avisado] = await Promise.all([guardarEnSupabase(lead), avisarPorCorreo(lead)]);

  if (!guardado && !avisado) {
    return json({ ok: false }, 502);
  }

  return json({ ok: true }, 200);
};
