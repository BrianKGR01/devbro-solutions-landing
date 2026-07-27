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
  --tinta:        #080B09;   /* fondo principal. Negro con base verde */
  --tinta-2:      #0F1512;   /* superficies elevadas */
  --tinta-3:      #18201C;   /* tarjetas */
  --papel:        #EDEFEA;   /* fondo de secciones invertidas */
  --humo:         #8A968F;   /* texto secundario sobre oscuro */
  --humo-papel:   #56605A;   /* texto secundario sobre papel */

  /* ---- Verde metálico ---- */
  --verde-noche:  #0C2A1E;   /* superficies teñidas, sombras sólidas */
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
}
```

### Reglas de uso del color

| Regla | Detalle |
|---|---|
| **Máximo 12% de superficie verde** por pantalla | El verde marca acción, estado y dato. El resto es tinta y papel |
| **`--laton` solo en numerales y filetes** | Si aparece en más de tres lugares por pantalla, sobra |
| **`--verde-filo` es luz reflejada** | Nunca como relleno plano |
| **`--metal` solo en tres lugares** | Filo del botón primario, borde de la placa, reglas divisorias |
| **Nunca `--metal` como fondo de sección** | Es lo que hace ver "SaaS genérico" |

### Contraste — verificado, respetalo

| Combinación | Ratio | Uso permitido |
|---|---|---|
| `--verde-luz` sobre `--tinta` | 6,6:1 | ✅ Texto de cuerpo |
| `--verde` sobre `--tinta` | 3,7:1 | ⚠️ **Solo** títulos ≥24px, bordes, íconos |
| `--papel` sobre `--verde-base` | 7,6:1 | ✅ Texto en botón primario |
| `--tinta` sobre `--papel` | 15:1 | ✅ Secciones invertidas |
| `--humo` sobre `--tinta` | 6,9:1 | ✅ Texto secundario |

> **Regla derivada, importante:** el texto de acento dentro de párrafos usa **`--verde-luz`**, nunca `--verde`.

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
--t-display-xl: clamp(3rem, 9vw, 6.5rem);   /* hero */
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
| Display L | Archivo `wght 800 wdth 115` · `letter-spacing: -0.02em` · `line-height: 0.94` |
| Título | Archivo `wght 800 wdth 112` · `line-height: 1.1` |
| Cuerpo | Inter Tight 400 · `line-height: 1.65` · `max-width: 62ch` |
| Etiqueta | JetBrains Mono 700 · `letter-spacing: 0.12em` · MAYÚSCULAS |
| Dato | JetBrains Mono 700 · `font-variant-numeric: tabular-nums` |

> **Detalle crítico:** los titulares llevan `line-height` por debajo de 1 y tracking negativo. Deben verse **compactados**, como tipos de metal apretados. Es lo que separa neobrutalismo bien hecho de "letra grande y negrita".

---

## 4. Layout

- Contenedor: `max-width: var(--ancho-max)`, centrado, `padding-inline: var(--pad-lateral)`
- Padding vertical de sección: `clamp(var(--e7), 12vh, var(--e9))`
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
- Sombras sólidas sin desenfoque: `box-shadow: 6px 6px 0 var(--verde-noche)`
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
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--papel);
  background: var(--relleno-cta);
  border: 2px solid transparent;
  border-image: var(--metal) 1;
  box-shadow: 5px 5px 0 var(--verde-noche);
  transition: transform 120ms var(--salida), box-shadow 120ms var(--salida);
}
.cta:hover  { transform: translate(3px, 3px); box-shadow: 2px 2px 0 var(--verde-noche); }
.cta:active { transform: translate(5px, 5px); box-shadow: 0 0 0 var(--verde-noche); }
.cta:focus-visible { outline: 3px solid var(--laton); outline-offset: 3px; }
```

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
  box-shadow: 8px 8px 0 var(--verde-noche);
}
```

### Etiqueta (chip)
Mono, mayúsculas, `border: 2px solid`, fondo transparente, `padding: 4px 10px`. Para "3 SEMANAS", "USD 5.000", "CÓDIGO FUENTE INCLUIDO".

### Sección invertida
`background: var(--papel)`, texto `--tinta`, secundario `--humo-papel`, bordes `--borde-papel`. Sin retícula de fondo.

### Botón flotante de WhatsApp
Cuadrado de 56px, esquina inferior derecha, `bottom: 24px; right: 24px`. Fondo `--verde-base`, borde metálico, sombra sólida. Ícono SVG inline, sin librería. Aparece con fade al salir del hero. `aria-label="Escribinos por WhatsApp"`.

---

## 6. Elemento firma: **la placa troquelada**

Lo único que la página tiene que hacer memorable. Va en el hero.

### Estructura visual
- Rectángulo de ~300×220px (escala con `clamp`), rotado `-6deg`
- **Esquinas achaflanadas** vía `clip-path` (corte de 14px a 45° en las cuatro esquinas) — no `border-radius`
- Borde de 3px con `--metal`
- Fondo `--verde-noche`
- Cuatro remaches: círculos de 6px en `--laton` con un punto interior más oscuro, a 16px de cada esquina
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
| Móvil | < 640px | Todo a una columna. Placa arriba del titular, centrada, rotación reducida a `-3deg`. Menú colapsa a solo el CTA |
| Tableta | 640-1023px | Grillas de 3 columnas pasan a 2. Hero sigue en una columna |
| Escritorio | ≥ 1024px | Hero en dos columnas (texto izquierda, placa derecha). Grillas completas |

**Regla base:** mobile-first. Escribí el CSS para 360px y ampliá con `min-width`.

**Verificación obligatoria a 360px:** ningún desbordamiento horizontal, ningún texto cortado, la placa entera visible, todos los CTA alcanzables con el pulgar.
