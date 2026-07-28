# 06 · Decisiones resueltas

Resoluciones a las contradicciones y ambigüedades detectadas durante la lectura inicial. **Este documento tiene prioridad sobre cualquier interpretación previa.** Si algo acá contradice a `01`–`05`, manda esto.

---

## D1 · La retícula de fondo es válida

**Duda:** la retícula usa `linear-gradient()` y la regla prohíbe degradados.

**Resolución:** la retícula queda **tal como está especificada**. La interpretación del agente es correcta.

La prohibición apunta a **degradados de color decorativos como fondo de sección** —el efecto "SaaS genérico" que estamos evitando—, no a la técnica CSS. La retícula es una textura de líneas de 1px que refuerza el concepto de papel cuadriculado y orden de trabajo. Es funcional al concepto, no decorativa.

**Redacción corregida de la regla:** prohibido usar degradados de color como fondo de sección. Permitido: `--metal` en sus tres usos puntuales, y la retícula de fondo tal como está definida en `02-design-system.md` §4.

---

## D2 · Chaflanes con `clip-path`, `border-radius: 0` sin excepciones

**Duda:** `CLAUDE.md` mencionaba los chaflanes como excepción a `border-radius: 0`, pero `02` y `05` los especifican con `clip-path`.

**Resolución:** el agente tiene razón y mi redacción estaba mal.

- `border-radius: 0` en **toda** la página, sin ninguna excepción
- Los chaflanes de la placa se hacen con `clip-path`, corte de 14px a 45° en las cuatro esquinas
- La redacción de `CLAUDE.md` queda corregida

---

## D3 · Dominio y metadatos

**Duda:** la Fase 1 pide metadatos completos, pero el dominio de producción está pendiente.

**Resolución:**

- `astro.config.mjs` lee `site` de la variable de entorno `PUBLIC_SITE_URL`
- La variable va en `.env.example`, vacía y documentada
- Si `PUBLIC_SITE_URL` no está definida: **se omiten** `canonical`, `og:url` y el sitemap. No se inventa una URL ni se usa una temporal que después quede olvidada en producción
- El resto de los metadatos (title, description, `lang`, og:title, og:description, og:image, Twitter Card, JSON-LD) se implementan completos desde la Fase 1

La Fase 1 se da por completa con esos campos condicionados. No es un pendiente bloqueante.

---

## D4 · Foco de teclado — regla global

**Duda:** el foco solo estaba especificado para `.cta`.

**Resolución:** regla global, no por componente.

```css
:where(a, button, input, textarea, select, summary, [tabindex]):focus-visible {
  outline: 3px solid var(--laton);
  outline-offset: 3px;
}

/* En secciones de papel, el latón no alcanza contraste (2,1:1) */
.seccion--papel :where(a, button, input, textarea, select, [tabindex]):focus-visible {
  outline-color: var(--verde-base);
}
```

**Por qué el cambio en papel:** `--laton` sobre `--papel` da 2,1:1, por debajo del 3:1 que necesita un indicador de interfaz. `--verde-base` sobre papel da 5,6:1. Sobre fondo tinta, `--laton` da 7,9:1 y funciona bien.

Nunca `outline: none` sin reemplazo visible.

---

## D5 · Sin emojis en la página

**Duda:** el ⭐ en "LANZAMIENTO ⭐" no encaja en un sistema tipográfico cerrado.

**Resolución:** **se elimina el emoji.** Buen catch.

Un emoji rompe el sistema tipográfico, se renderiza distinto en cada sistema operativo y en neobrutalismo se ve barato. La jerarquía del paquete destacado ya está resuelta por medios visuales propios del sistema:

- La etiqueta `EL QUE ELIGE EL 80%` arriba de la tarjeta
- `border: var(--borde-fuerte)` en verde
- `box-shadow: 8px 8px 0 var(--verde-noche)`

**Regla nueva:** cero emojis en cualquier texto visible de la página. Los íconos que hagan falta van como SVG inline.

---

## D6 · "Software factory" y "ERP" están permitidos

**Duda:** rozan la regla de "cero jerga técnica".

**Resolución:** ambos permitidos.

La prohibición apunta a **jerga de infraestructura** que el lector no técnico no entiende y que lo hace sentir tonto: `serverless`, `microservicios`, `edge computing`, `cloud native`, `real-time DB`, `API`, `stack`.

- **"Software factory"** es el nombre de la categoría de negocio y describe qué es la empresa
- **"ERP"** es vocabulario de negocio, no técnico. El cliente objetivo —empresarios con años en su rubro— lo conoce perfectamente. De hecho lo reconoce mejor que "sistema de gestión"

**Criterio general para casos futuros:** si el término lo usaría un gerente en una reunión, va. Si solo lo usaría un programador, no va.

---

## D7 · Anti-spam sin almacenamiento de cliente

**Duda:** el control de "menos de 3 segundos" sin `localStorage` ni `sessionStorage`.

**Resolución:** campo oculto con marca de tiempo puesta por script al cargar la página.

```
1. Campo <input type="hidden" name="ts">
2. Script inline al cargar: input.value = Date.now()
3. En la ruta API: rechazar si (Date.now() - ts) < 3000 o > 86400000
4. Si el campo viene vacío o no es numérico: rechazar
```

Sin almacenamiento de ningún tipo. Junto con el honeypot (`nombre_empresa`), alcanza para el volumen esperado. **Sin captcha.**

---

## D8 · Cadenas prohibidas — lista completa

La búsqueda final de la Fase 6 cubre:

```
S.A.          MenuRes       Treser        PuntoVenta
serverless    microservici  edge          cloud native
real-time     premium       clase mundial
```

Más: cualquier valor hexadecimal de color fuera de `tokens.css`, y cualquier emoji.

---

## D9 · Caso de éxito

El cliente **ya autorizó** aparecer como caso de éxito con nombre real. Los textos y la captura llegan después.

Se implementa con los `{{PENDIENTE}}` visibles y el marco de imagen dimensionado, como está en `03-content.md` §08.

---

## D10 · Datos de contacto

| Dato | Estado |
|---|---|
| Correo | `{{PENDIENTE}}` — a confirmar |
| WhatsApp | `{{PENDIENTE}}` — a confirmar |
| Dominio de producción | `{{PENDIENTE}}` — ver D3 |

Ninguno bloquea el desarrollo. Se implementan como placeholder visible y como variable de entorno donde corresponda.

---

## D11 · Riesgo de desborde en el titular del hero a 360px

**Duda:** el `overflow-wrap: break-word` global agregado en la Fase 1 evita el desborde partiendo palabras largas dentro de la palabra misma. Pero `--t-display-xl` tiene un mínimo de `3rem` (`clamp(3rem, 9vw, 6.5rem)`), y a 360px de ancho la palabra "funcionando," del titular real del hero ("Tu idea, funcionando, en tres semanas") podría no entrar completa en una sola línea dentro del ancho disponible del contenedor, forzando un corte de palabra visualmente feo en vez de un salto de línea limpio.

**Resolución:** confirmado con medición real (Playwright + Range API, fuente Archivo cargada, no estimado). A 360px, contenedor de 320px de ancho disponible:

| `--t-display-xl` | Palabra más ancha ("funcionando,") | Desborda |
|---|---|---|
| `3rem` (48px, valor original) | 368.94px | **Sí** — confirma la duda |
| `2.5rem` (40px, propuesta inicial) | 307.45px | No, pero con solo ~12.5px de margen (~4%) |
| `2.25rem` (36px, valor elegido) | 276.7px | No, con ~43px de margen (~13.5%) |

Se eligió `2.25rem` en vez de `2.5rem`: el margen de `2.5rem` es del mismo orden que el que causó el bug del grabado de la placa en la Fase 2 (Fase 2, PR #2) — no vale la pena repetir ese riesgo por 0,25rem de diferencia. Con el titular real completo ("Tu idea, funcionando, en tres semanas.") en una columna de 320px, `2.25rem` envuelve en 4 líneas sin desbordar ninguna ("Tu idea," / "funcionando," / "en tres" / "semanas."), lo cual es normal y esperable para un titular hero en el ancho mínimo soportado.

`tokens.css` actualizado: `--t-display-xl: clamp(2.25rem, 9vw, 6.5rem);`. El máximo (`6.5rem`) queda pendiente de la resolución del conflicto de ancho en escritorio (ver plan de Fase 3 — Hero, punto 1), que se decide junto con el layout de columnas del Hero, no acá.

---

## D12 · El titular del hero no comparte columna con la placa

**Duda:** `docs/02-design-system.md` §8 especificaba "Hero en dos columnas (texto izquierda, placa derecha)" desde escritorio. Con la placa aprobada en 400px (≈428px de caja delimitadora rotada a -6°) y el titular real ("Tu idea, funcionando, en tres semanas."), ninguna combinación de reparto de columnas, sangrado de la placa fuera del padding, o reducción del tamaño del titular llegaba a un resultado aceptable: o el titular quedaba del mismo tamaño que `--t-display-l` (rompiendo la jerarquía tipográfica), o desbordaba, o exigía un sangrado de la placa mucho más agresivo del razonable (~300px más allá del contenedor).

**Resolución:** el supuesto de "dos columnas" era el problema, no la placa ni el titular. Se cambia la estructura: el titular ocupa siempre el **ancho completo** del contenedor (nunca comparte fila con la placa), y la placa se reubica junto al bloque de párrafo + botones + microcopia — un contenido mucho más angosto que nunca compite por el ancho del titular.

Se evaluaron dos formas de ubicar la placa junto al titular de ancho completo:
- **Encastrada en el hueco que deja el borde derecho irregular del titular** (las líneas cortas como "Tu idea," dejan espacio libre a la derecha). Descartada con números: a `6rem` (96px), la línea más larga ("en tres semanas.") deja solo 108,59px libres en su propia línea — la placa (428px) no entra ni cerca, y esa es sistemáticamente la línea más larga con contenido real.
- **Al costado del bloque de párrafo + botones + microcopia.** Elegida: ese bloque es texto chico (18px) sin riesgo de desborde por palabra suelta, y deja una columna cómoda (445px en el breakpoint más angosto donde aplica).

**Breakpoint:** se reutiliza el quiebre de escritorio ya existente (1024px) para el cambio de posición de la placa, en vez de introducir uno nuevo.

**Tipografía, medida y verificada (Playwright + Range API, no estimada):**
- A 1440px (columna completa 1072px): `--t-display-xl` en `6rem` (96px) da 10,13% de margen contra la línea más ancha; en `5,5rem` (88px), 17,62%.
- El coeficiente fluido del `clamp()` estaba mal calibrado: `9vw` llegaba a su tope justo cuando la columna todavía no había crecido lo suficiente (margen de **-0,32%** en el viewport de transición, ~1067px — desbordaba). `8.2vw` da 8,59% en su propio punto de transición (~1171px) y no baja de 8,57% en todo el rango barrido (1000-1440px).

`tokens.css`: `--t-display-xl: clamp(2.25rem, 8.2vw, 6rem);` — reemplaza el máximo pendiente de D11.

**Altura del hero:** la restricción "entra sin scroll en 1440×900" (`docs/01-brief.md`) se relaja deliberadamente para este rediseño — con el titular a 96px en 3 líneas, el hero solo mide 847px reales. Con la Barra ya construida y medida (83px, no los ~92px estimados en el borrador de este plan), el total real es **Barra + Hero = 930px contra 900px de viewport, ~30px de scroll.** Aceptado explícitamente: el tamaño del titular y la jerarquía tipográfica valen más que evitar ese scroll mínimo.

---

## D13 · La placa va después del titular en móvil, no antes

**Duda:** `docs/02-design-system.md` §8 (redacción original) ponía la placa arriba del titular en móvil. Con la placa ya construida (Fase 2) y el hero real (Fase 3, D12), hacía falta confirmar si eso dejaba el mensaje y el CTA visibles en el primer pantallazo de un celular real.

**Resolución:** medido a 360×640 (Playwright, `getBoundingClientRect()`, no estimado):

| Elemento | Con la placa primero (orden original) |
|---|---|
| Borde inferior del titular (`h1`) | 532px — dentro del pliegue (640px), pero sin margen real |
| CTA primario (borde superior) | 707px — **fuera del pliegue** |

El CTA queda fuera del pliegue **en cualquier orden**: los 4 bloques (placa, antetítulo, titular, contenido) están en una sola columna con el mismo gap uniforme entre todos, así que la altura total —y por lo tanto la posición final del CTA— no cambia según el orden en que aparezcan. Confirmado reordenando en vivo (inyectando el CSS del nuevo orden) y volviendo a medir: el CTA se mantuvo exacto en 707-772px.

Lo que **sí** cambia con el orden es qué entra en el primer pantallazo. Reordenando a antetítulo → titular → placa → contenido:

| Elemento | Con el titular primero (orden nuevo) |
|---|---|
| Titular (`h1`) | 168-294px |
| Placa | 326-532px — **completa, dentro del pliegue** |
| CTA primario | 707-772px — sigue fuera, sin cambios |

Con el orden nuevo, el mensaje completo **y** la placa entera entran en el primer pantallazo sin scroll, en vez de solo el titular al límite. El CTA sigue pidiendo scroll, pero eso es esperable en cualquier hero mobile — para evitarlo por completo habría que achicar la placa a ~17% de su tamaño actual (destruyéndola como elemento firma) a cambio de ahorrar un scroll mínimo. No vale la pena.

**Se elige el reordenamiento.** `Hero.astro` actualizado: `grid-template-areas` para <1024px pasa de `placa/antetitulo/titulo/contenido` a `antetitulo/titulo/placa/contenido`. `docs/02-design-system.md` §8 y `docs/01-brief.md` §3 sincronizados.

---

## D14 · Barra: el wordmark siempre va, solo la nav colapsa — y a 1024px cabe una versión compacta

**Duda 1:** la primera versión de `Barra.astro` ocultaba wordmark **y** nav en móvil, dejando solo el CTA centrado. `docs/01-brief.md` dice "el menú colapsa a solo el CTA" — eso es sobre los enlaces de navegación, no sobre la marca; una barra sin wordmark no se identifica como DevBro Solutions.

**Resolución 1:** wordmark (versión reducida, solo "DEVBRO", bajo 640px — la misma versión que ya definía `docs/01-brief.md` §6 para móvil) y CTA quedan **siempre** visibles, alineados a los extremos. Solo `.barra__nav` colapsa.

**Duda 2:** con el wordmark corregido, el breakpoint de 1200px que resolvía el desborde de contenido (ver §8) dejaba **todo** el rango 1024-1199px sin ningún enlace de navegación — un iPad horizontal (1024px) no tiene forma de navegar a `#proceso`, `#paquetes`, etc.

**Resolución 2:** medido (no estimado) si una versión compacta de la nav entra en ese rango: enlaces en JetBrains Mono `--t-etiqueta` con letter-spacing 0.08em, gap `--e2` (16px) en vez de `--e4` (32px). A 1024px (el caso más ajustado del rango, el margen solo mejora al crecer el viewport): 922px de contenido contra 1024px disponibles → **10% de margen.** Entra con margen real.

**Se agregan tres estados para la nav de la Barra**, no dos: sin nav (`<1024px`) → nav compacta mono (`1024-1199px`) → nav completa Inter Tight (`≥1200px`). `docs/02-design-system.md` §8 actualizado con la tabla completa.

**Corrección posterior (D15):** el número "922px de contenido, 10% de margen" de la Resolución 2 estaba contaminado — se midió con el CTA ya envuelto a 2 líneas (bug corregido recién en D15), no con su ancho natural de una línea. El número real, con el CTA arreglado, es 882px contra 1024px disponibles (~4,3% de margen). Sigue entrando, pero con bastante menos aire del que decía esta entrada. Ver D15 para el detalle.

---

## D15 · CTA de la Barra partido en 2 líneas, scroll-margin-top, y aire entre Hero y Problema

**Duda 1:** a 360px, "Agendar diagnóstico" dentro de `.barra__cta` envolvía a 2 líneas. Un botón partido a la mitad dentro de una barra fija se ve sin terminar, e infla el alto de la barra de 83px a 104px — rompiendo la premisa de D14 de que la barra tiene una altura predecible.

**Causa:** `Cta.astro` no tenía `white-space: nowrap` en `.cta`. Cualquier squeeze del contenedor flex (móvil angosto, o 1024px donde wordmark+nav+cta compiten por espacio) hacía que el texto envolviera en vez de forzar el ancho del botón.

**Resolución 1:** dos capas de arreglo, no una sola:
- `white-space: nowrap` en `.cta` (`Cta.astro`) — garantía dura, universal, para cualquier uso futuro del componente.
- En `Barra.astro`, el CTA alterna entre dos tamaños según el mismo breakpoint que ya regía la nav: **compacto** (`--t-etiqueta`, padding 8×14) en las zonas donde compite por espacio (`<640px` y `1024-1199px`) y **cómodo** (0.8rem, padding 12×20) donde sobra aire (`640-1023px` y `≥1200px`). El gap del contenedor (`.barra__fila`) también baja a `--e1` en las zonas compactas.

Verificado con la Range API (conteo real de líneas, no `scrollWidth`) en 360/640/1024/1199/1200/1440px: el CTA es una sola línea en los seis. Como efecto colateral, esto reveló que la medición de D14 (922px / 10%) estaba contaminada por el mismo bug — corregida arriba a 882px / 4,3%.

**Duda 2:** la Barra es sticky. En Fase 4 aparecen los primeros destinos reales de su nav (`#experiencia`, `#proceso`, `#paquetes`, más `#preguntas` después) — sin compensación, cualquier salto de ancla deja el título de la sección tapado detrás de la barra fija.

**Resolución 2:** `--barra-alto` (nueva variable en `tokens.css`) sigue exactamente los mismos cuatro breakpoints que ya definía D14 para la Barra, porque el alto real de la barra depende del mismo tamaño de CTA que alterna en esos breakpoints — medido (no estimado): **74px** en las zonas compactas (`<640px`, `1024-1199px`) y **83px** en las cómodas (`640-1023px`, `≥1200px`). Es una variable responsive, no un número suelto, para que nunca se desincronice si la Barra cambia de altura en el futuro.

`scroll-margin-top: calc(var(--barra-alto) + var(--e2))` se aplica a `.seccion` (cubre toda sección actual y futura automáticamente, todas comparten esa clase) y a `#contenido` (`Base.astro`) por separado, porque el destino del skip link no lleva `.seccion`.

**Duda 3:** medido el espacio vertical entre el Hero y Problema a 360px: 192px, exactamente el padding-block de ambas secciones apilado (96px + 96px = el piso del `clamp(var(--e7), 12vh, var(--e9))` en una pantalla mobile típica). En una pantalla de 640px de alto eso es casi un tercio de scroll vacío entre dos secciones que deberían leerse como continuas.

**Resolución 3:** `@media (max-width: 639px) { .seccion { padding-block: var(--e6); } }` en `utilidades.css` — un escalón menos (64px en vez de 96px) solo por debajo de 640px. Encima de ese ancho el clamp ya tiene más `vh` disponible para dar más aire, así que no hace falta la excepción.

`docs/02-design-system.md` §4 y §8 actualizados con las tres resoluciones.

---

## D16 · Paquetes: grilla de 1 columna hasta 1024px, LANZAMIENTO primero en móvil

**Decisión (no una duda a resolver, viene dada):** `Paquetes.astro` rompe la regla general de grillas de `docs/02-design-system.md` §8 (1 columna → 2 en tableta → 3 en escritorio) en dos puntos, ambos pedidos explícitamente antes de construir el componente:

1. **Las 3 columnas pasan a 1 sola por debajo de 1024px, no a 2.** Un 2+1 en tableta rompe la comparación entre paquetes y deja uno huérfano en su propia fila. `Paquetes.astro` no usa `.grilla-3` (que sigue siendo 1→2→3 para el resto del sitio, p. ej. `Problema.astro`) — tiene su propia grilla con un solo breakpoint en 1024px.
2. **En la columna única, LANZAMIENTO va primero**, no en el medio (orden del documento: SONDA, LANZAMIENTO, EXPEDICIÓN). Es el paquete que se quiere vender, y el orden de escritorio no se traduce a móvil. Implementado con `order: -1` en `.paquetes__tarjeta--lanzamiento`, revertido a `order: 0` desde 1024px — el DOM mantiene el orden del documento en todo momento (orden lógico de precio creciente), así que un lector de pantalla lo linealiza igual sin importar el `order` visual.

La tarjeta destacada (LANZAMIENTO) usa el patrón `.ficha--destacada` ya definido en §5 (`border: var(--borde-fuerte)` + `box-shadow: 8px 8px 0 var(--verde-noche)`), más su propia etiqueta de texto ("EL QUE ELIGE EL 80%") y un CTA en variante primaria (las otras dos tarjetas usan secundaria) — tres señales de jerarquía a la vez, ninguna de ellas gritando. Sin emoji: el copy fuente (`docs/03-content.md`) trae "LANZAMIENTO ⭐", pero ningún emoji aparece en el sitio (regla dura de `CLAUDE.md`).

**Bug encontrado en la verificación (Playwright, `getBoundingClientRect` en todo el árbol, no estimado):** a 360px y a 1024px la página desbordaba horizontalmente — cada `.paquetes__tarjeta` medía 367px de ancho fijo sin importar el ancho real de su columna (320px a 360px; 286px a 1024px con 3 columnas). Causa: el CTA (`Cta.astro`) tiene `white-space: nowrap` (D15) — dentro de un item de grilla, el `min-width: auto` implícito usa el min-content de sus descendientes como piso, y un texto que no puede envolver eleva ese piso al ancho natural del botón. Mismo patrón de bug que en `Hero.astro` (`docs/06-decisiones.md`, min-width:0 en un item de grilla que abarca contenido no encogible).

**Fix, dos partes:**
- `min-width: 0` en `.paquetes__tarjeta` — deja que la columna respete su `1fr` real.
- El CTA "cómodo" (0.8rem, padding 12×20, el que usa la Barra desde 640px) sigue sin entrar en una tarjeta de ~256-336px de ancho útil. `Paquetes.astro` usa el CTA en su tamaño "compacto" (`--t-etiqueta`) en las tres tarjetas, en todo momento — a diferencia de la Barra, acá no hay ningún breakpoint de este componente con espacio de sobra —, con `width: 100%` para que ocupe todo el ancho disponible de la tarjeta en vez de quedar angosto y descentrado.

Verificado (Range API + `scrollWidth` vs `clientWidth`): el CTA es una sola línea, sin texto recortado, en 360/640/1023/1024/1440px, en las tres tarjetas.

---

## D17 · Las sombras sólidas eran invisibles: color de sombra corregido a `--verde`

**Duda (levantada por el usuario, error del design system original):** `docs/02-design-system.md` §5 especificaba `box-shadow: Npx Npx 0 var(--verde-noche)` para el botón y la tarjeta destacada. Contraste real, calculado (fórmula WCAG de luminancia relativa, no estimado):

| Par | Contraste |
|---|---|
| `--verde-noche` (#0C2A1E) vs `--tinta` (#080B09) | **1,29:1** |
| `--verde-base` (#145239) vs `--tinta` | 2,16:1 |
| `--verde` (#1D7A52) vs `--tinta` | 3,73:1 |

1,29:1 es casi el mismo color — la sombra sólida desplazada, el rasgo que define el estilo neobrutalista del sitio, no se leía en ningún lado. Nota: el usuario había estimado 2,9:1 para `--verde-base`; el cálculo preciso da 2,16:1 — probablemente una estimación de cabeza, no cambia la conclusión.

**Restricción encontrada antes de tocar nada:** `--verde-noche` es un token de doble uso — además de (nunca) servir de color de sombra, es el relleno real de `.placa__interior` y del remache de la placa (`Placa.astro`), verificado y ajustado en la Fase 2. **No se puede cambiar el valor hexadecimal del token** sin romper la placa. La corrección tiene que repuntar las declaraciones de `box-shadow` a otro token de la escala, dejando `--verde-noche` intacto.

**Método de decisión:** comparación en vivo, no solo cálculo. Se sirvió la página con Playwright y se sobreescribió `--verde-noche` con un `<style>` inyectado, con el scope limitado a `.cta, .paquetes__tarjeta--destacada` (no `:root`) para no afectar a la placa en la captura de prueba. Capturas de la sección Paquetes completa y zoom a la esquina de sombra de la tarjeta LANZAMIENTO con los tres valores: actual (`--verde-noche`, confirmado invisible), `--verde-base` (visible pero apagado) y `--verde` (visible, saturado, se lee como canto duro sin ambigüedad).

**Resolución: `--verde`.** Motivos:
- Contraste más alto (3,73:1) da la lectura más inequívoca de "sombra dura", que era el pedido explícito.
- La tarjeta destacada ya usa `border: var(--borde-fuerte)` = `2px solid var(--verde)` — el borde y la sombra en el mismo verde se leen como un solo sistema de acento reforzándose, no como dos elementos en conflicto. `--verde-base` habría quedado como un tono intermedio sin relación clara con ningún otro elemento del sistema.
- Ninguna de las dos opciones corre riesgo de leerse como halo: `box-shadow` sin `blur-radius` siempre renderiza como bloque de canto recto sin importar el color — el problema nunca fue difuminado, fue contraste puro.

**Cambiado:** `Cta.astro` (los 4 `box-shadow` de `.cta--primario`/`.cta--secundario`/`:hover`/`:active`) y `Paquetes.astro` (`.paquetes__tarjeta--destacada`), de `var(--verde-noche)` a `var(--verde)`. `docs/02-design-system.md` §4-5 actualizado (regla transversal + snippets de `.cta` y `.ficha--destacada`) y el comentario de `--verde-noche` en `tokens.css`/§2 corregido para no mencionar sombras. **D5 y D16 no se reescriben** (documentan fielmente lo que existía en el momento en que se escribieron) — esta entrada es la corrección posterior de ambas.

---

## D18 · Paquetes apretado a 1024px, y doble uso de `--papel`/`--tinta` documentado

**Duda 1:** comparando capturas propias de Paquetes a 1024px vs 1440px, las tarjetas se veían notablemente más altas y más difíciles de escanear a 1024px — justo el ancho donde el visitante compara los tres precios por primera vez lado a lado (recién ahí la grilla pasa a 3 columnas).

**Medido (Range API, conteo real de líneas, no estimado):** a 1024px, 14 de los 22 ítems de lista de las tres tarjetas envolvían a 2 líneas (SONDA 5/6, LANZAMIENTO 5/8, EXPEDICIÓN 4/8), con las tarjetas a 775px de alto. A 1199-1440px el envoltorio cae a 0-4 de 22 y el alto baja a 661-727px — confirma que 1024-1199px es un punto de compresión real, no percibido: el contenedor recién pasó a 3 columnas pero todavía no llegó a `--ancho-max` (1200px), así que la columna es más angosta ahí que en cualquier otro punto de la grilla de 3.

**Resolución:** barrido de combinaciones (Playwright, override de CSS en vivo) restringido a valores de la escala de 8px para el padding (regla dura de `CLAUDE.md`, no se puede usar un valor suelto como 20px aunque mejore el ajuste). Elegido: `padding: var(--e2)` (16px, antes `--e4`/32px) en `.paquetes__tarjeta` + `font-size: 0.8125rem` en `.paquetes__caracteristicas li` (antes `--t-cuerpo`/1rem — no hay token en la escala tipográfica entre `--t-etiqueta` 0.75rem y `--t-cuerpo` 1rem, se usa el valor literal con el cálculo documentado en el propio componente), **solo en `@media (min-width: 1024px) and (max-width: 1199px)`**. Resultado: 21 de 22 ítems en una línea, 606px de alto. El único que sigue envolviendo ("2 semanas de diagnóstico post-lanzamiento") no entra a ningún tamaño razonable sin perjudicar la legibilidad del resto — no vale la pena seguir bajando por una sola frase larga.

**Se descarta pasar a 1 columna en este rango** (pedido explícito): la comparación lado a lado en tablet horizontal vale más que el ahorro de altura, y ya existe la excepción de Paquetes a 1 columna por debajo de 1024px (D16) — bajarla más angostaría la ventana en la que se puede comparar.

**Duda 2:** `docs/02-design-system.md` §2 documentaba `--papel` solo como "fondo de secciones invertidas", pero el token cumple una segunda función real en todo el sitio desde Fase 3 (`Tesis.astro`) y ahora Fase 4 (`Experiencia.astro`, `Hero.astro`): texto primario sobre `--tinta`. `--tinta` tiene el mismo problema en espejo (texto primario sobre `--papel` en `Tesis.astro`/`Limites.astro`, documentado solo como "fondo principal").

**Resolución:** comentario de ambos tokens actualizado en `tokens.css` y `docs/02-design-system.md` §2 para nombrar las dos funciones — no se crea un alias semántico nuevo (ej. `--texto-primario`): el patrón "el fondo de una superficie es el texto primario de su inversa" ya es la convención implícita y consistente en todo el sitio para estos dos tokens específicos, agregar un alias solo para uno de los dos sería asimétrico. Se agregó además una nota en la fila "Cuerpo" de la tabla de escala tipográfica (§3), que no tenía ninguna guía de color — el hueco que originó el bug de `Experiencia.astro` corregido más arriba en este documento.
