# 02 · Sistema de diseño

**Este documento es normativo.** Todo valor de color, tipografía o espaciado que aparezca en el código debe salir de acá. Ningún hex hardcodeado en componentes.

---

## 1. Concepto

**La orden de trabajo.** Neobrutalismo con un porqué: taller, herramienta industrial, placa troquelada, boleta de despacho. Material con peso. **Metal mecanizado, no vidrio esmerilado.**

La página se comporta como un formulario de trabajo: numerada, sellada, con secciones que son ítems. La numeración informa —el proceso E0→E6 es una secuencia real— no decora.

**Antítesis:** sin glow, sin blur, sin glassmorphism, sin degradados suaves de fondo, sin cards flotantes, sin esquinas redondeadas. Nada fluorescente.

---

## 2. Tokens

Archivo único: `src/styles/tokens.css`. Copiar tal cual.

```css
:root {
  /* ---- Base ---- */
  --tinta:        #080B09;   /* fondo principal (negro con base verde). Tambien texto primario sobre --papel */
  --tinta-2:      #0F1512;   /* superficies elevadas */
  --tinta-3:      #18201C;   /* tarjetas */
  --papel:        #EDEFEA;   /* fondo de secciones invertidas. Tambien texto primario sobre --tinta */
  --humo:         #8A968F;   /* texto secundario sobre oscuro */
  --humo-papel:   #56605A;   /* texto secundario sobre papel */

  /* ---- Verde metálico ---- */
  --verde-noche:  #0C2A1E;   /* superficies teñidas (relleno de la placa). NO sombras (D17) */
  --verde-base:   #145239;   /* relleno de botones */
  --verde:        #1D7A52;   /* bordes, íconos, títulos grandes */
  --verde-luz:    #4FA57C;   /* TEXTO de acento sobre oscuro */
  --verde-filo:   #86C9A4;   /* filo especular. Uso puntual */

  /* ---- Acento secundario ---- */
  --laton:        #B8A26A;   /* numerales y filetes. Nada más */

  /* ---- Degradado metálico ---- */
  --metal: linear-gradient(135deg,
    #0C2A1E  0%,
    #145239 22%,
    #2E8F62 44%,
    #86C9A4 51%,
    #2E8F62 58%,
    #145239 80%,
    #0C2A1E 100%);

  /* ---- Relleno de botón primario ---- */
  --relleno-cta: linear-gradient(180deg, #145239 0%, #0C2A1E 100%);

  /* ---- Retícula de fondo ---- */
  --reticula: rgba(237, 239, 234, 0.035);

  /* ---- Bordes ---- */
  --borde:        2px solid rgba(237, 239, 234, 0.10);
  --borde-fuerte: 2px solid var(--verde);
  --borde-papel:  2px solid rgba(8, 11, 9, 0.14);

  /* ---- Espaciado (escala de 8) ---- */
  --e1: 8px;   --e2: 16px;  --e3: 24px;  --e4: 32px;
  --e5: 48px;  --e6: 64px;  --e7: 96px;  --e8: 128px;
  --e9: 160px;

  /* ---- Contenedor ---- */
  --ancho-max: 1200px;
  --pad-lateral: clamp(20px, 5vw, 64px);

  /* ---- Tipografías ---- */
  --display: 'Archivo', system-ui, sans-serif;
  --cuerpo:  'Inter Tight', system-ui, sans-serif;
  --mono:    'JetBrains Mono', ui-monospace, monospace;

  /* ---- Movimiento ---- */
  --salida: cubic-bezier(0.16, 1, 0.3, 1);
  --entrada: cubic-bezier(0.7, 0, 0.84, 0);

  /* ---- Escala tipográfica (detalle de uso en §3) ---- */
  --t-display-xl: clamp(2.25rem, 8.2vw, 6rem); /* hero */
  --t-display-l:  clamp(2.1rem, 5vw, 3.6rem); /* títulos de sección */
  --t-titulo:     1.5rem;
  --t-cuerpo-l:   1.125rem;
  --t-cuerpo:     1rem;
  --t-etiqueta:   0.75rem;
  --t-dato:       clamp(2rem, 4vw, 3.5rem);

  /* ---- Alto real de la Barra sticky (detalle en §8, D15/D21) ---- */
  --barra-alto: 74px;
}

@media (min-width: 1200px) {
  :root {
    --barra-alto: 83px;
  }
}
```

### Reglas de uso del color

| Regla | Detalle |
|---|---|
| **Máximo 12% de superficie verde** por pantalla | El verde marca acción, estado y dato. El resto es tinta y papel |
| **`--laton` solo en numerales y filetes** | Si aparece en más de tres lugares por pantalla, sobra |
| **`--verde-filo` es luz reflejada** | Nunca como relleno plano |
| **`--metal` solo en tres lugares** | Filo del botón primario, borde de la placa, filo del botón flotante de WhatsApp |
| **Nunca `--metal` como fondo de sección** | Es lo que hace ver "SaaS genérico" |

### Contraste — verificado, respetalo

| Combinación | Ratio | Uso permitido |
|---|---|---|
| `--verde-luz` sobre `--tinta` | 6,6:1 | ✅ Texto de cuerpo |
| `--verde` sobre `--tinta` | 3,7:1 | ⚠️ **Solo** títulos ≥24px, bordes, íconos |
| `--papel` sobre `--verde-base` | 7,6:1 | ✅ Texto en botón primario |
| `--tinta` sobre `--papel` | 15:1 | ✅ Secciones invertidas |
| `--humo` sobre `--tinta` | 6,9:1 | ✅ Texto secundario |
| `--laton` sobre `--tinta` | 7,9:1 | ✅ Contraste alto, pero restringido igual a numerales/filetes por la regla de uso de arriba, no por contraste |

> **Regla derivada, importante:** el texto de acento dentro de párrafos usa **`--verde-luz`**, nunca `--verde`.

> **`--verde-noche` no está en esta tabla a propósito:** contra `--tinta` da 1,29:1 (D17, ver `docs/06-decisiones.md`) — casi invisible. Es superficie teñida (relleno de la placa), nunca texto ni sombra.

---

## 3. Tipografía

| Rol | Familia | Origen |
|---|---|---|
| Display | **Archivo** (variable, ejes `wght` y `wdth`) | Google Fonts, autohospedada |
| Cuerpo | **Inter Tight** | Google Fonts, autohospedada |
| Utilitaria | **JetBrains Mono** | Google Fonts, autohospedada |

### ⚠️ Verificación del eje de ancho

Archivo es una fuente variable con eje `wdth`. Los titulares usan:

```css
font-family: var(--display);
font-variation-settings: 'wght' 900, 'wdth' 118;
```

**Antes de construir, verificá que el archivo descargado incluya el eje `wdth`.** Si no lo incluye, usá `Archivo` peso 900 con ancho normal y compensá con `letter-spacing: -0.025em`. No uses `transform: scaleX()` — deforma los trazos.

### Escala

```css
--t-display-xl: clamp(2.25rem, 8.2vw, 6rem);   /* hero. Minimo bajado en D11/D12, ver docs/06-decisiones.md */
--t-display-l:  clamp(2.1rem, 5vw, 3.6rem); /* títulos de sección */
--t-titulo:     1.5rem;
--t-cuerpo-l:   1.125rem;
--t-cuerpo:     1rem;
--t-etiqueta:   0.75rem;
--t-dato:       clamp(2rem, 4vw, 3.5rem);
```

| Rol | Ajustes |
|---|---|
| Display XL | Archivo `wght 900 wdth 118` · `letter-spacing: -0.03em` · `line-height: 0.88` |
| Display L | Archivo `wght 800 wdth 115` · `letter-spacing: -0.02em` · `line-height: 0.94` · `text-wrap: balance` |
| Título | Archivo `wght 800 wdth 112` · `line-height: 1.1` |
| Cuerpo | Inter Tight 400 · `line-height: 1.65` · `max-width: 62ch` · color primario (`--papel` sobre `--tinta`, `--tinta` sobre `--papel`) |
| Etiqueta | JetBrains Mono 700 · `letter-spacing: 0.12em` · MAYÚSCULAS |
| Dato | JetBrains Mono 700 · `font-variant-numeric: tabular-nums` |

> **Detalle crítico:** los titulares llevan `line-height` por debajo de 1 y tracking negativo. Deben verse **compactados**, como tipos de metal apretados. Es lo que separa neobrutalismo bien hecho de "letra grande y negrita".

> **`text-wrap: balance` en Display L (Fase 3):** verificado en `Problema.astro` — sin esto, "Tenés el problema. Tenés la plata..." cortaba en "Tenés el problema. Tenés / la plata...", separando la primera oración de su continuación. Con `balance` corta en "Tenés el problema. / Tenés la plata...", respetando el límite de oración. Es una mejora progresiva (si el navegador no la soporta, cae a wrap normal sin roturas) — regla base para todo título en Display L, no solo para Problema.

---

## 4. Layout

- Contenedor: `max-width: var(--ancho-max)`, centrado, `padding-inline: var(--pad-lateral)`
- Padding vertical de sección: `clamp(var(--e7), 12vh, var(--e9))`. **Excepción bajo 640px (D15, ver `docs/06-decisiones.md`):** `padding-block: var(--e6)`. El clamp resuelve a su piso (`--e7` = 96px) en móvil, y dos secciones apiladas suman 192px de vacío entre ellas — casi un tercio de una pantalla de 640px de alto. Por debajo de 640px se usa el escalón `--e6` (64px) en su lugar
- Retícula de fondo: líneas de 1px cada 80px en `--reticula`, fija al fondo. Sutil pero presente. Se oculta en secciones de papel

```css
body {
  background-color: var(--tinta);
  background-image:
    linear-gradient(var(--reticula) 1px, transparent 1px),
    linear-gradient(90deg, var(--reticula) 1px, transparent 1px);
  background-size: 80px 80px;
}
```

---

## 5. Componentes

### Reglas transversales
- `border-radius: 0` en todo. Única excepción: chaflanes de la placa
- Sombras sólidas sin desenfoque: `box-shadow: 6px 6px 0 var(--verde)`. **No `var(--verde-noche)`** (D17, ver `docs/06-decisiones.md`): contra `--tinta`, `--verde-noche` da 1,29:1 de contraste — prácticamente invisible, no una sombra dura. `--verde-noche` sigue existiendo para superficies teñidas (relleno de la placa); no es el color de sombra
- Bordes de 2px. Nunca 1px

### Botón primario — *filo metálico*

El degradado metálico va en el **borde**, no en el relleno. Así el texto siempre queda sobre fondo oscuro y legible, y el metal se lee como canto mecanizado.

```css
.cta {
  display: inline-block;
  padding: 18px 32px;
  font-family: var(--display);
  font-variation-settings: 'wght' 800, 'wdth' 112;
  font-size: 0.95rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--papel);
  cursor: pointer;
  /* Un boton nunca envuelve a una segunda linea, sin importar cuanto lo
     aprieten sus contenedores flex (D15) */
  white-space: nowrap;
  transition: transform 120ms var(--salida), box-shadow 120ms var(--salida);
}
.cta--primario {
  background: var(--relleno-cta);
  border: 2px solid transparent;
  border-image: var(--metal) 1;
  box-shadow: 5px 5px 0 var(--verde);
}
.cta--secundario {
  background: transparent;
  border: 2px solid var(--humo);
  box-shadow: 5px 5px 0 var(--verde);
}
.cta:hover  { transform: translate(3px, 3px); box-shadow: 2px 2px 0 var(--verde); }
.cta:active { transform: translate(5px, 5px); box-shadow: 0 0 0 var(--verde); }
```

El foco de teclado no lo pone el componente: lo pone la regla global de `base.css` (D4) — `:focus-visible { outline: 3px solid var(--laton); outline-offset: 3px; }` sobre todo elemento interactivo del sitio, botón incluido.

El botón **se hunde** al presionarse. Es la microinteracción principal del sitio y la única que hace falta.

### Botón secundario
Transparente, `border: 2px solid var(--humo)`, texto `--papel`. Mismo comportamiento de hundido.

### Tarjeta / ítem de orden

```css
.ficha {
  background: var(--tinta-3);
  border: var(--borde);
  padding: var(--e4);
}
.ficha__num {
  font-family: var(--mono);
  font-size: var(--t-etiqueta);
  letter-spacing: 0.12em;
  color: var(--laton);
  margin-bottom: var(--e2);
}
.ficha--destacada {
  border: var(--borde-fuerte);
  box-shadow: 8px 8px 0 var(--verde);
}
```

### Etiqueta (chip)
Mono, mayúsculas, `border: 2px solid`, fondo transparente, `padding: 4px 10px`. Para "3 SEMANAS", "USD 5.000", "CÓDIGO FUENTE INCLUIDO".

### Sección invertida
`background: var(--papel)`, texto `--tinta`, secundario `--humo-papel`, bordes `--borde-papel`. Sin retícula de fondo.

### Botón flotante de WhatsApp
Cuadrado de 56px, esquina inferior derecha, `bottom: 24px; right: 24px`. Fondo `--verde-base`, borde metálico, sombra sólida. Ícono SVG inline, sin librería. Aparece con fade al salir del hero. `aria-label="Escribinos por WhatsApp"`.

### Subrayado en `--laton` — recurso de énfasis acotado (D24)

```css
.subrayado-laton {
  text-decoration: underline;
  text-decoration-color: var(--laton);
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}
```

**Limitado a dos lugares en toda la página**, no es un estilo de texto de uso libre: el remate de `#experiencia` ("Y por eso también sabemos decir que no.") y, dentro del párrafo de apertura de `#contacto`, **solo la primera oración** ("Una reunión de una hora.") — no el párrafo completo. Subrayar las dos líneas enteras se leía como un hipervínculo justo arriba del formulario, invitando a hacerle clic. Si hiciera falta un tercer lugar, es una señal para volver a esta sección y decidir si la restricción sigue teniendo sentido — no agregarlo en silencio.

---

## 6. Elemento firma: **la placa troquelada**

Lo único que la página tiene que hacer memorable. Va en el hero.

### Estructura visual
- Rectángulo con relación de aspecto 300:220, ancho `clamp(220px, 78vw, 400px)` (hasta ~400×293px), rotado `-6deg`
- **Esquinas achaflanadas** vía `clip-path` (corte de 26px a 45° en las cuatro esquinas) — no `border-radius`. A 14px (valor original) el corte se leía como esquina redondeada a la escala real de render/captura, no como corte recto
- Marco de 6px con `--metal`, logrado con dos capas de `clip-path` (exterior + interior) — `border-image` no sigue los cortes del chaflán. Chaflán del interior: 26px − 6px·(2−√2) ≈ 22,49px, para que el marco se mantenga en 6px también en la diagonal, no solo en los lados rectos
- Fondo `--verde-noche`
- Cuatro remaches: círculos de 6px en `--laton` con un punto interior más oscuro, a 22px de cada esquina (medidos al centro del remache). A 16px quedaban a ~1,2px del corte del chaflán — prácticamente tangentes
- Arriba, grabado: `DEVBRO SOLUTIONS · ORDEN Nº 0001` — JetBrains Mono 700, 0.62rem, `letter-spacing: 0.16em`, color `--humo`
- Centro: numeral enorme, JetBrains Mono 700, `clamp(4.5rem, 10vw, 7rem)`, `tabular-nums`, color `--verde-filo`
- Debajo del numeral: `SEMANAS` — mono, `letter-spacing: 0.3em`, color `--humo`

### Animación — una sola, ~1,5s, una sola vez

| ms | Qué pasa |
|---|---|
| 0 | Placa en `translateY(-40px)`, `opacity: 0` |
| 0 → 320 | Baja a `translateY(0)`, `opacity: 1`, con `--entrada` |
| 320 → 440 | Impacto: `scale(1 → 1.015 → 1)` |
| 440 → 990 | Contador: `24 → 16 → 11 → 07 → 03`, con pasos de 140/120/100/90ms |
| 990 → 1110 | Vibración: `translateX(±2px)`, 2 ciclos |
| 1050 → 1450 | Barrido especular: pseudo-elemento con degradado claro y `mix-blend-mode: overlay` cruzando el borde una vez |
| 1200 → 1400 | `SEMANAS` aparece con fade |

**Detalles:**
- El numeral siempre a dos dígitos con cero a la izquierda (`24`, `16`, `11`, `07`, `03`)
- `tabular-nums` obligatorio: sin eso el ancho baila y arruina el efecto
- La cuenta arranca en 24 porque es lo que tarda una agencia tradicional, y termina en 03. Cuenta la propuesta de valor sin una frase de marketing
- Se ejecuta **una sola vez** al cargar. No se repite al hacer scroll

**`prefers-reduced-motion`:** placa en su posición final, numeral en `03`, `SEMANAS` visible. Sin transición alguna.

---

## 7. Movimiento en el resto de la página

Deliberadamente escaso. La placa es el único momento coreografiado; todo lo demás es discreto.

**Permitido:**
- Aparición al hacer scroll: `opacity 0→1` + `translateY(8px→0)`, 400ms, `--salida`. Una sola vez por elemento, con `IntersectionObserver`. Escalonado máximo de 60ms entre hermanos
- Hover de botones y enlaces (ya especificado)
- Acordeón de preguntas: altura animada, 240ms

**Prohibido:**
- Parallax
- Contadores animados fuera de la placa
- Carruseles
- Texto que aparece letra por letra
- Cualquier animación en bucle
- Elementos que se mueven mientras se lee

Todo bajo `@media (prefers-reduced-motion: reduce)` se desactiva.

---

## 8. Puntos de quiebre

| Nombre | Ancho | Cambios principales |
|---|---|---|
| Móvil | < 640px | Todo a una columna: antetítulo → titular → placa → párrafo/botones/microcopia. Placa centrada, rotación reducida a `-3deg`. Menú detrás de un botón, en panel de pantalla completa (D21) |
| Tableta | 640-1023px | Grillas de 3 columnas pasan a 2. Hero sigue en una columna, mismo orden que móvil (placa centrada, `-6deg` desde 640px) |
| Escritorio | ≥ 1024px | El titular del hero sigue a ancho completo (no comparte fila con la placa — ver Fase 3). La placa pasa a compartir fila con el bloque párrafo + botones + microcopia, no con el titular. Grillas completas |

**Nota sobre el hero (decidido en Fase 3, ver `docs/06-decisiones.md` D12):** el titular (`--t-display-xl`) nunca comparte columna con la placa — la placa mide 428px de ancho rotada y ninguna combinación razonable de columna + tamaño de fuente entra sin sacrificar la jerarquía tipográfica o el tamaño del titular. El titular ocupa siempre el ancho completo del contenedor; la placa se reubica junto al bloque de párrafo/botones/microcopia a partir del breakpoint de escritorio (1024px).

**Viewport ancho pero bajo (D29, ver `docs/06-decisiones.md`):** el presupuesto de altura del hero (Fase 3) solo se validó a 1440×900. `--t-display-xl` es puramente función del ancho — desde ~1170px ya está en su tope de 6rem sin importar cuánta altura real haya — así que un laptop 1366×768 real (y peor, con cualquier chrome de navegador que reduzca el alto efectivo) dejaba el CTA y la microcopia bajo el pliegue. Regla aparte, `@media (min-width: 1024px) and (max-height: 820px)`, achica titular/padding/gaps solo en ese rango — no toca el layout móvil (que ya tiene su propio ajuste por D21) ni el hero a 1440×900/1920×1080, que quedan iguales.

**Orden en móvil/tableta (D13, ver `docs/06-decisiones.md`):** la placa va **después** del titular, no antes. Medido a 360×640 (el "pliegue" de una pantalla de celular típica): con la placa primero, el titular quedaba al filo del pliegue (borde inferior a 532px de 640, sin margen real) y el CTA primario siempre queda fuera (707px) sin importar el orden — la altura total no cambia por reordenar. Con antetítulo → titular → placa, el mensaje completo **y** la placa entran enteros en el primer pantallazo sin scroll; el CTA sigue pidiendo scroll, pero eso es normal en cualquier hero mobile y no vale la pena achicar la placa (habría que bajarla a ~17% de su tamaño actual para evitarlo, lo que la destruye como elemento firma) para evitarlo.

**Barra de navegación (D14, corregido en D15, rediseñado en D21 — ver `docs/06-decisiones.md`):** la Barra tiene sus propios breakpoints, distintos de los de arriba. **Un solo corte, en 1024px:**

- **`< 1024px`: wordmark completo + botón de menú.** El CTA **no** está en la barra: vive al final del panel del menú. Sin el CTA sobra ancho, así que el wordmark va entero (antes iba reducido a "DEVBRO" bajo 640px).
- **`≥ 1024px`: wordmark + enlaces en línea + CTA**, sin botón ni panel. El CTA alterna entre "compacto" (`--t-etiqueta`, padding 8×14) y "cómodo" (0.8rem, padding 12×20) para garantizar una sola línea:
  - `1024-1199px`: nav compacta (JetBrains Mono, `--t-etiqueta`, gap `--e2`) **y** CTA compacto, gap del contenedor `--e1`. Medido: 882px de contenido contra 1024px disponibles, ~4,3% de margen — el punto más ajustado de toda la barra.
  - `≥ 1200px` (= `--ancho-max`): nav completa (Inter Tight, `--t-cuerpo`, gap `--e4`) y CTA cómodo. ~9,9% de margen.

**Panel del menú (`< 1024px`, D21):**
- Pantalla completa (`position: fixed; inset: 0`), fondo `--tinta`. **No** es un drawer lateral y no tiene esquinas redondeadas.
- La fila de la barra queda **por encima** del panel, para que el botón de cerrar siga visible.
- Cada enlace: numeral de dos dígitos en `--mono`/`--laton` a la izquierda + título en Archivo `clamp(1.5rem, 6vw, 2.25rem)`, separados por filetes de `--borde`. Se lee como el índice de una orden de trabajo, no como una lista de navegación.
- El CTA cierra el panel, a ancho completo, como acción principal.
- Ícono: tres barras de 3px que se convierten en X (la del medio se apaga, las otras se juntan 6px al centro y rotan ±45°). Transición de 180ms, anulada bajo `prefers-reduced-motion`.
- **Contrato de accesibilidad, obligatorio:** `aria-expanded` + `aria-controls` en el botón · `Escape` cierra · trampa de foco mientras está abierto · al cerrar, el foco vuelve al botón · scroll del `body` bloqueado · todo hermano del `<header>` con `inert`. Además: si el viewport pasa a `≥ 1024px` con el panel abierto, se cierra por script — sin eso, el `inert` y el scroll bloqueado quedarían puestos y la página entera quedaría inutilizable.

**Alto real de la Barra y `scroll-margin-top` (D15, resimplificado en D21):** la Barra es sticky. Desde el rediseño móvil su alto real tiene **un solo escalón**, no tres: **74px** bajo 1200px (el wordmark + botón de móvil y el CTA compacto de 1024-1199px dan la misma altura) y **83px** desde 1200px, con el CTA cómodo. Vive en `--barra-alto` (`tokens.css`) como variable responsive — nunca un número suelto, porque se desincroniza en cuanto cambia la composición de la barra (que es exactamente lo que pasó al rediseñarla: el valor de 640-1023px quedó 9px de más). Todo destino de ancla (`.seccion` y `#contenido` del skip link) usa `scroll-margin-top: calc(var(--barra-alto) + var(--e2))`; el panel del menú usa el mismo token para su `padding-top`.

**Paquetes (D16, ver `docs/06-decisiones.md`):** `Paquetes.astro` rompe la regla general de grillas de esta sección en dos puntos, decididos antes de construir el componente:
- Las 3 columnas pasan a **1 sola** por debajo de 1024px, no a 2 — un 2+1 en tableta rompe la comparación entre paquetes y deja uno huérfano solo en su fila. No usa `.grilla-3`.
- En la columna única, **LANZAMIENTO va primero**, no en el medio (el orden del documento — SONDA, LANZAMIENTO, EXPEDICIÓN — se mantiene en el DOM; solo el orden visual cambia vía `order` CSS por debajo de 1024px).

**Regla base:** mobile-first. Escribí el CSS para 360px y ampliá con `min-width`.

**Verificación obligatoria a 360px:** ningún desbordamiento horizontal, ningún texto cortado, la placa entera visible, todos los CTA alcanzables con el pulgar.

---

## 9. Identidad: favicon y Open Graph (D25)

### Favicon (`public/favicon.svg`)

Cuadrado achaflanado de 32×32 (mismo lenguaje que la placa: `clip-path` vía polígono, nunca `border-radius` — D2), fondo `--tinta`, borde `--verde` de 2px. Adentro, una **D** construida como dos polígonos (silueta + hueco achaflanado), no como texto ni como arco:

- **No es texto:** un favicon standalone no puede cargar la fuente autohospedada Archivo (fuera del documento, no hereda `@font-face` de `base.css`); un `<text>` habría caído a la fuente del sistema.
- **No es un arco:** el contorno redondeado del vientre de una D clásica se reemplazó por un corte a 45° para que la letra hable el mismo idioma que la placa en vez de introducir una curva que no aparece en ningún otro lado de la marca.
- **Hex duplicados de `tokens.css`, no nuevos:** un SVG standalone no puede leer custom properties del documento que lo referencia. Los valores (`#080B09`, `#1D7A52`, `#EDEFEA`) son copia literal de `--tinta`/`--verde`/`--papel`, comentado en el archivo.
- **Verificado a tamaño real:** renderizado con Playwright a 16px y 32px reales (no una versión grande escalada a ojo) — la D se lee con claridad en los dos tamaños, no hizo falta el fallback a silueta sólida.

`public/favicon.ico` (16/32/48px, frames PNG embebidos en un contenedor ICO mínimo escrito a mano — sin librería nueva) y `public/apple-touch-icon.png` (180×180, mismo diseño pero con fondo `--tinta` a sangre completa, sin esquinas transparentes que iOS tendría que rellenar por su cuenta) se derivan del mismo `favicon.svg`.

**Contradice `docs/01-brief.md` §6:** la "versión reducida" documentada ahí (`DEVBRO` sin `SOLUTIONS`) ya no se usa para el favicon — se reemplaza por la D aislada de esta sección. `01-brief.md` §6 se actualiza para reflejarlo.

### Open Graph (`src/pages/og.astro` → `public/og.png`)

Ruta oculta (`noindex`, sin enlace desde la nav, fuera del sitemap) que renderiza un lienzo fijo de 1200×630 — no responsive, se genera una sola vez y se descarta:

- Fondo `--tinta` + retícula (mismos valores que `body`, `docs/02` §4)
- Wordmark **completo** ("DEVBRO · SOLUTIONS", no la versión reducida — a diferencia del favicon, acá el ancho sobra) arriba a la izquierda
- Titular del hero ("Tu idea, funcionando, en tres semanas.") en Archivo 900/wdth 118, `4.25rem`
- La placa a la derecha, en su estado final (numeral `03`, sin transform) — se logra emulando `prefers-reduced-motion: reduce` al capturar, así el script de conteo nunca arranca; el CSS por defecto de `Placa.astro` ya es el estado final, por diseño (Fase 2)

**Verificado:** capturado con Playwright a 1200×630 exactos y también reescalado a ~300px de ancho (miniatura de WhatsApp) — el titular se lee con claridad a ese tamaño; el grabado y "SEMANAS" de la placa no se leen a miniatura, lo cual es aceptable porque son detalle decorativo, no el mensaje.

**Contradice `docs/01-brief.md` §6** en la dirección opuesta al favicon: ahí el wordmark completo es la versión "normal" y la reducida es solo para favicon/OG. Para OG se usa la versión completa a propósito (hay espacio de sobra en un lienzo de 1200px). `01-brief.md` §6 se actualiza.
