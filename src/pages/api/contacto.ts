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

async function avisarPorCorreo(lead: Lead): Promise<boolean> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const destino = import.meta.env.CORREO_DESTINO;
  if (!apiKey || !destino) return false;

  try {
    const resend = new Resend(apiKey);
    // onboarding@resend.dev funciona sin verificar un dominio propio --
    // cambiar por un remitente del dominio real (docs/06-decisiones.md
    // D3/D10) en cuanto este verificado en Resend.
    const { error } = await resend.emails.send({
      from: 'DevBro Solutions <onboarding@resend.dev>',
      to: destino,
      replyTo: lead.correo,
      subject: `Nuevo lead: ${lead.nombre}`,
      text: [
        `Nombre: ${lead.nombre}`,
        `Correo: ${lead.correo}`,
        `WhatsApp: ${lead.whatsapp}`,
        `Industria: ${lead.industria}`,
        `Problema: ${lead.problema}`,
        `Primeros usuarios: ${lead.usuarios}`,
        `Plazo: ${lead.plazo ?? '(no indicado)'}`,
        `Presupuesto: ${lead.presupuesto}`,
      ].join('\n'),
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
