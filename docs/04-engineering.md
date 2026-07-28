# 04 · Ingeniería y buenas prácticas

## 1. Stack

| Capa | Elección | Por qué |
|---|---|---|
| Framework | **Astro 5** | Cero JavaScript por defecto. Una landing no necesita hidratación. Mejor LCP que cualquier alternativa con framework |
| Estilos | **CSS puro con custom properties** | El sistema de diseño ya está definido como variables. Sin Tailwind |
| Tipos | **TypeScript** | Solo en la lógica del formulario |
| Deploy | **Vercel** | Ya en uso por el equipo |
| Formulario | Ruta API de Astro → Supabase + Resend | Ver §6 |

### Por qué no Tailwind

El diseño es deliberadamente no convencional. Tailwind empuja hacia sus escalas y radios por defecto, y un agente que trabaja con utilidades tiende a derivar hacia el aspecto genérico que este proyecto quiere evitar. Con CSS y tokens propios el control es total y el archivo entero ronda las 800 líneas.

**No instales Tailwind.** Si creés que hace falta, preguntá primero.

### Dependencias permitidas

```
astro
@astrojs/vercel
@astrojs/check
typescript
@supabase/supabase-js     (solo en la ruta API)
resend                    (solo en la ruta API)
```

**Cualquier otra dependencia requiere aprobación previa.** Sin librerías de animación, UI, iconos o utilidades.

Los íconos que hagan falta (WhatsApp, flecha, check, más/menos del acordeón) van como SVG inline en componentes propios.

---

## 2. Estructura de archivos

```
/
├── CLAUDE.md
├── AGENTS.md
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── docs/
│   ├── 01-brief.md
│   ├── 02-design-system.md
│   ├── 03-content.md
│   ├── 04-engineering.md
│   ├── 05-roadmap.md
│   └── estructura/          ← documentación de negocio, solo consulta
├── public/
│   ├── fonts/               ← woff2 autohospedadas
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── og.png
└── src/
    ├── pages/
    │   ├── index.astro
    │   ├── og.astro         ← oculta, solo para generar public/og.png (D25)
    │   ├── sitemap.xml.ts
    │   ├── robots.txt.ts
    │   └── api/
    │       └── contacto.ts
    ├── layouts/
    │   └── Base.astro
    ├── components/
    │   ├── Barra.astro
    │   ├── Hero.astro
    │   ├── Placa.astro
    │   ├── Problema.astro
    │   ├── Tesis.astro
    │   ├── Experiencia.astro
    │   ├── Proceso.astro
    │   ├── Paquetes.astro
    │   ├── Limites.astro
    │   ├── Caso.astro
    │   ├── Preguntas.astro
    │   ├── Contacto.astro
    │   ├── Pie.astro
    │   ├── Wordmark.astro
    │   ├── Cta.astro
    │   ├── Etiqueta.astro
    │   └── BotonWhatsApp.astro
    └── styles/
        ├── tokens.css       ← copiar de docs/02, sin modificar
        ├── base.css         ← reset, tipografía base, retícula
        └── utilidades.css   ← contenedor, secciones, grillas
```

**Regla:** un componente por sección. Cada uno con su `<style>` con alcance local de Astro. Nada de un CSS global gigante.

---

## 3. Convenciones de código

- **Nombres en español** para componentes, clases y variables de dominio. El equipo trabaja en español y el copy es en español; mezclar idiomas genera fricción
- **Clases CSS estilo BEM simplificado:** `.ficha`, `.ficha__num`, `.ficha--destacada`
- **Sin `!important`.** Si hace falta, la especificidad está mal armada
- **Sin `id` para estilos.** Los `id` son solo anclas de navegación
- **Nada de valores mágicos.** Todo espaciado sale de `--e1`…`--e9`. Todo color, de los tokens

### ⚠️ Cuidado con la especificidad

Es el error más común en este tipo de página: una clase de sección (`.seccion`) y una de elemento (`.cta`) que definen el mismo margen y se cancelan según el orden. Para evitarlo:

- **Los márgenes verticales entre secciones los pone siempre la sección**, nunca el componente hijo
- Los componentes definen su padding interno, jamás su margen externo
- Los espacios entre elementos hermanos usan `gap`, no `margin`

---

## 4. Tipografías

Autohospedadas en `public/fonts/`, formato `.woff2`, subconjunto latino.

```
Archivo        — variable (wght + wdth), o pesos 800 y 900
Inter Tight    — pesos 400, 500, 600
JetBrains Mono — pesos 400, 700
```

```css
@font-face {
  font-family: 'Archivo';
  src: url('/fonts/archivo-var.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-stretch: 62% 125%;
  font-display: swap;
}
```

**Obligatorio:** `<link rel="preload">` de las dos fuentes usadas en el hero (Archivo y JetBrains Mono). Sin eso hay salto visible al cargar.

**Verificar** que el archivo de Archivo incluya el eje `wdth`. Si no, ver la nota en `docs/02-design-system.md` §3.

---

## 5. Accesibilidad — no negociable

- Un solo `<h1>` por página: el titular del hero
- Jerarquía de encabezados sin saltos
- Todo elemento interactivo alcanzable con `Tab`, en orden lógico
- `:focus-visible` con contorno de 3px en `--laton` y `outline-offset: 3px` en **todo** elemento interactivo. Nunca `outline: none` sin reemplazo
- El foco no puede ser verde sobre verde
- Acordeón de preguntas con `<button aria-expanded>` y control de teclado real. No uses `<details>` si vas a animar la altura
- Etiquetas `<label>` reales asociadas a cada campo del formulario. Los placeholders no son etiquetas
- Errores de formulario anunciados con `aria-live="polite"`
- Enlace "Saltar al contenido" al inicio, visible al enfocar
- Contraste según la tabla de `docs/02-design-system.md` §2
- Ninguna información transmitida solo por color
- `prefers-reduced-motion` respetado en todo

---

## 6. Formulario y captura de leads

### Arquitectura

```
Formulario (HTML nativo, sin framework)
    │  POST
    ▼
/api/contacto.ts  (ruta API de Astro, server-side)
    ├──► Supabase: INSERT en tabla `leads`      ← fuente de verdad
    └──► Resend: correo de aviso                ← notificación
```

**Por qué las dos cosas y no solo el correo:** un correo se pierde entre otros cincuenta. La tabla en Supabase hace que ningún lead se pierda nunca, te da el historial completo desde el día uno, y es la base sobre la que después se arma cualquier seguimiento serio. El correo es solo el aviso de que llegó algo.

### Tabla `leads`

```sql
create table leads (
  id            uuid primary key default gen_random_uuid(),
  creado_en     timestamptz not null default now(),
  nombre        text not null,
  correo        text not null,
  whatsapp      text not null,
  industria     text not null,
  problema      text not null,
  usuarios      text not null,
  plazo         text,
  presupuesto   text not null,
  origen        text,          -- utm_source si viene
  estado        text not null default 'nuevo'
);
alter table leads enable row level security;
-- Sin políticas públicas: solo se escribe desde la ruta API con la service key
```

El campo `estado` (`nuevo` → `contactado` → `reunion` → `propuesta` → `cerrado` / `descartado`) permite usar el propio panel de Supabase como seguimiento básico hasta que haya volumen para un CRM real.

### Validación

- **Cliente:** validación nativa de HTML (`required`, `type="email"`, `pattern`). Sin librerías
- **Servidor:** validación completa en la ruta API. Nunca confíes en el cliente
- **Anti-spam:** campo honeypot oculto (`nombre_empresa`) + rechazo de envíos con menos de 3 segundos desde la carga. Sin captcha: agrega fricción y bloquea a gente legítima

### Variables de entorno

```
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
RESEND_API_KEY=
CORREO_DESTINO=
```

Van en `.env`, nunca en el repositorio. Creá `.env.example` con las claves vacías.

**El formulario debe seguir funcionando con degradación elegante:** si Supabase falla, el correo se envía igual. Si el correo falla, el lead se guarda igual. Si fallan los dos, se muestra el mensaje de error que remite a WhatsApp.

### WhatsApp

Enlace `https://wa.me/{{PENDIENTE: número}}?text=Hola,%20quiero%20agendar%20un%20diagnóstico`

---

## 7. Rendimiento

| Objetivo | Meta |
|---|---|
| Lighthouse (rendimiento, escritorio) | ≥ 95 |
| Lighthouse (accesibilidad) | 100 |
| LCP | < 1,8 s |
| CLS | < 0,05 |
| JavaScript total enviado | < 15 KB |

**Cómo se logra:**
- Astro no envía JS salvo donde se lo pidas explícitamente. Los únicos scripts son: animación de la placa, acordeón, envío del formulario, observador de scroll
- Todos esos scripts van inline en su componente, con `is:inline` donde corresponda. Sin bundle de framework
- Imágenes con `width`/`height` explícitos, `loading="lazy"` salvo la del hero
- Fuentes precargadas y con subconjunto
- Sin analítica de terceros en la v1

---

## 8. SEO y metadatos

```html
<title>DevBro Solutions — Tu idea, funcionando, en tres semanas</title>
<meta name="description" content="Software factory en Santa Cruz de la Sierra. Construimos tu producto en producción en tres a seis semanas, con precio cerrado. El código es tuyo.">
<html lang="es">
```

- Open Graph y Twitter Card completos, con `og.png` de 1200×630 mostrando la placa troquelada
- `canonical` apuntando al dominio de producción
- Datos estructurados `Organization` en JSON-LD, sin inventar datos que no existan
- `sitemap.xml` y `robots.txt`

---

## 9. Git

- Ramas: `main` es producción. El trabajo va en `feat/<seccion>`
- Commits en español, imperativo: `agrega seccion de paquetes`, `corrige contraste del foco`
- Un commit por sección terminada, no uno gigante al final
- `.gitignore`: `node_modules`, `dist`, `.env`, `.astro`, `.vercel`

---

## 10. Antipatrones específicos de este proyecto

| Antipatrón | Por qué está mal acá |
|---|---|
| Suavizar el diseño "para que se vea más profesional" | El brutalismo es la decisión. Redondear esquinas o suavizar sombras destruye el concepto |
| Agregar un degradado de fondo a una sección | Convierte la página en la landing de SaaS genérica que se está evitando |
| Usar `--verde` para texto de párrafo | No pasa contraste. Usá `--verde-luz` |
| Rellenar `{{PENDIENTE}}` con texto inventado | El cliente lo va a publicar sin revisar. Dejá el placeholder visible |
| Agregar animaciones "para dar vida" | La placa es el único momento coreografiado. Todo lo demás resta |
| Meter la lógica del formulario en el cliente | Las claves quedarían expuestas. Va en la ruta API |
| Un solo archivo CSS de 2000 líneas | Estilos con alcance local por componente |
| Instalar una librería de íconos por dos íconos | SVG inline |
