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

**Corrección posterior (D25):** el dominio de producción ya está confirmado — `https://devbro.xyz`. El pendiente queda cerrado; ver D25 para el detalle de activación y un ajuste encontrado en `astro.config.mjs` al verificarlo.

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

**Corrección posterior (D24):** correo y WhatsApp ya están confirmados y son reales (`info@devbro.xyz`, `+591 75020808`). El dominio de producción sigue `{{PENDIENTE}}` — ver D3.

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

---

## D19 · Fase 5 — acordeón, honeypot, render híbrido y decisiones sin spec previo

Varias decisiones tomadas al construir `Caso.astro`, `Preguntas.astro`, `Contacto.astro`, `src/pages/api/contacto.ts`, `BotonWhatsApp.astro` y `Pie.astro` (docs/03-content.md §08-11, docs/04-engineering.md §5-6) que no tenían un patrón previo en el sitio:

**Acordeón sin `<details>` (docs/04-engineering.md §5: "no uses `<details>` si vas a animar la altura").** Implementado con `<button aria-expanded>` real dentro de un `<h3>`, altura animada con el truco de `grid-template-rows: 0fr` → `1fr` (240ms, `var(--salida)`, docs/02-design-system.md §7) en vez de medir `scrollHeight` por JS — no se rompe con contenido dinámico ni con cambios de tamaño de fuente. El panel colapsado lleva el atributo `inert` (no `hidden`): saca el contenido del árbol de accesibilidad y del tab order sin pelear con la transición de altura, que `display:none` rompería de golpe. Tab/Enter/Espacio son gratis — son el comportamiento nativo de `<button>`, no hay `keydown` a mano. Verificado con Playwright: `aria-expanded` cambia con Enter y con Espacio, `inert` se agrega/saca en sincronía, el panel mide 0px cerrado.

**Honeypot con éxito falso, no con error visible (D7).** Si el campo `nombre_empresa` viene relleno o el campo `ts` indica menos de 3s o más de 24h desde la carga, `src/pages/api/contacto.ts` responde `200 {ok:true}` **sin** guardar el lead ni mandar el correo. La razón: D7 ya había descartado el captcha por fricción; delatarle a un bot que fue detectado (con un 4xx, por ejemplo) le da información para adaptarse. Un usuario real jamás dispara ninguna de las dos condiciones — completar 6+ campos obligatorios en menos de 3 segundos es fisicamente improbable.

**Render híbrido, no todo el sitio en modo servidor.** `src/pages/api/contacto.ts` es la primera ruta dinámica del sitio. Se le agregó `export const prerender = false` **solo a ese archivo** — el resto de las páginas siguen prerenderizadas (`astro build` pasó de `mode: "static"` a `mode: "server"` automáticamente al detectar la ruta, pero `index.html` se sigue generando como archivo estático, confirmado en el log de build: "prerendering static routes"). No se tocó `output` en `astro.config.mjs`. Efecto colateral encontrado: `astro preview` deja de funcionar con el adaptador de Vercel en cuanto existe una función server-side ("The @astrojs/vercel adapter does not support the preview command") — la verificación local de esta fase se hizo con `astro dev`, no con `build`+`preview` como en las fases anteriores.

**Remitente de Resend: `onboarding@resend.dev`, temporal.** El dominio de producción es `{{PENDIENTE}}` (D3/D10), así que no hay un remitente propio verificable todavía. `onboarding@resend.dev` es el remitente de sandbox que Resend documenta para funcionar sin verificar un dominio — no es un dato inventado, es una dirección real y funcional provista por el propio servicio. Cambiar a un remitente del dominio real en cuanto `RESEND_API_KEY` y el dominio estén confirmados (comentario dejado en el código).

**`.pendiente` (utilidades.css) usa `--humo`, no `--laton`.** Primer intento: `--laton` + itálica. Corregido tras notar que docs/02-design-system.md §2 restringe `--laton` a "numerales y filetes" — un párrafo de placeholder no es ninguna de las dos cosas, y el sitio ya lo usa en 5+ lugares por página en esta fase, muy por encima del límite de "tres lugares" que la propia regla marca como señal de que sobra. `--humo` (6,9:1 sobre `--tinta`, ya verificado) + itálica logra la misma distinción visual sin la violación. El enlace real a WhatsApp dentro del mensaje de error de `Contacto.astro` **no** lleva `.pendiente`: es un link funcional (el dato pendiente vive en el `href`, no en el texto visible "WhatsApp"), y silenciarlo visualmente como "incompleto" perjudica la única vía de recuperación que tiene el usuario si el envío falla.

**Ícono del botón de WhatsApp es un glifo propio, no el logo de Meta.** SVG inline con un contorno de bocadillo de chat + un trazo simple de auricular — reconocible como "contactar", sin reproducir el logo registrado de WhatsApp. El `aria-label="Escribinos por WhatsApp"` ya identifica la acción para quien no reconozca el ícono.

**Constantes compartidas nuevas (`src/lib/`):** `navegacion.ts` (`ENLACES_NAV`, usado por `Barra.astro` y `Pie.astro` — antes duplicado) y `whatsapp.ts` (`ENLACE_WHATSAPP`, usado por `Contacto.astro` y `BotonWhatsApp.astro`). Evita que los dos lugares con el mismo enlace/número pendiente diverjan silenciosamente.

**Marco de imagen de `Caso.astro`: `aspect-ratio: 16/10`.** Sin spec en los docs — es una proporción común de captura de producto/ventana de navegador, elegida para que el marco vacío tenga una forma creíble y no colapse de alto hasta que se reemplace por la imagen real (D9).

---

## D20 · Caso 001 pasa a versión anonimizada

**Duda:** el bloque construido en la Fase 5 (D9, `docs/03-content.md` §08 original) dependía de tres `{{PENDIENTE}}`, uno de ellos una captura de pantalla que ocupaba una pantalla entera de marco vacío. Visto en un celular real, el marco vacío es el elemento más grande de la sección y no comunica nada.

**Resolución:** se recorta a lo que se sostiene solo.

- **Se elimina el marco de imagen** y el `{{PENDIENTE}}` de la captura. Sin la imagen real, el marco es un agujero, no un placeholder útil.
- **Se elimina el bloque "Lo que construimos".** Sin nombre de cliente ni captura, describir el sistema en detalle no agrega prueba — repite lo que el titular ya dice.
- **"El problema" pasa de párrafo a fila de ficha**, junto a Tiempo y Estado. Las tres son ahora un `<dl>` de pares etiqueta/valor con filetes, mismo lenguaje visual que la lista de etapas de `Proceso.astro`: se lee como un registro de orden, no como un caso de estudio recortado.

Queda **un solo `{{PENDIENTE}}`, corto** (el rubro), que sigue visible. La sección se puede publicar así, sin esperar material del cliente. `docs/03-content.md` §08 actualizado. **D9 no se reescribe** (la autorización del cliente sigue siendo cierta); esta entrada la reemplaza en cuanto a estructura.

---

## D21 · Rediseño de la barra en móvil: panel de menú, y ajustes de aire del hero

**Duda 1 (probado en un celular real):** por debajo de 1024px la barra mostraba wordmark reducido ("DEVBRO") + un botón grande de "AGENDAR DIAGNÓSTICO". Ese CTA está **duplicado** con el del hero, visible casi a la vez, a un scroll de distancia — y era lo que obligaba a recortar la marca y a apretar todo (los números de D14/D15 son la crónica de esa pelea por el ancho).

**Resolución 1: el CTA sale de la barra y la barra móvil se rediseña.**

- `< 1024px`: **wordmark completo** (sobra ancho en cuanto el CTA no compite) + botón de menú.
- El CTA vive **al final del panel del menú**, como acción de cierre. No desaparece: cambia de lugar a uno donde no compite y donde cierra la lectura del índice.
- `≥ 1024px`: sin cambios (nav en línea + CTA, con los tamaños compacto/cómodo de D14/D15).

**El panel:** pantalla completa sobre `--tinta`, sin drawer lateral y sin esquinas redondeadas. Cada enlace lleva numeral de dos dígitos en `--mono`/`--laton` y título en Archivo grande, con filetes entre filas — se lee como el índice de una orden de trabajo. La fila de la barra queda por encima del panel (`z-index` dentro del stacking context del `<header>`) para que el botón de cerrar siga visible. Ícono: tres barras de 3px; al abrir, la del medio se apaga y las otras dos se juntan 6px al centro y rotan ±45° formando la X.

**Sin animación de apertura, a propósito.** El panel usa el atributo `hidden` (aparece y desaparece de golpe) en vez de una transición de altura u opacidad. Es la opción más robusta en accesibilidad —`hidden` saca el contenido del árbol y del tab order sin trucos— y encaja con la dirección "deliberadamente estática y física" de `CLAUDE.md`: el panel se estampa, no se desliza. Solo el ícono anima (180ms), y se anula bajo `prefers-reduced-motion`.

**Contrato de accesibilidad (verificado con Playwright, no asumido):** `aria-expanded` + `aria-controls` en el botón · `Escape` cierra y devuelve el foco al botón · trampa de foco real que cicla dentro del `<header>` (Tab desde el último va al primero, Shift+Tab desde el primero va al último) · scroll del `body` bloqueado · **todo hermano del `<header>` con `inert`**, resuelto iterando `document.body.children` en vez de enumerar elementos a mano, para que cubra cualquier bloque que se agregue al `body` más adelante · cualquier ancla del header cierra el panel, porque navegar a una sección con el menú tapándola no tiene sentido.

**Caso borde que sí importa:** si el viewport pasa a `≥ 1024px` con el panel abierto, el botón y el panel desaparecen por CSS, pero el `inert` y el `overflow: hidden` quedarían puestos — la página entera quedaría sin scroll y sin foco, sin ningún control visible para revertirlo. Se cierra por script con un listener de `matchMedia`. Verificado: tras el resize, `inert` y `overflow` quedan limpios y la página vuelve a scrollear.

**Efecto colateral encontrado: `--barra-alto` había quedado mal.** El token (D15) declaraba 83px para 640-1023px, un valor que venía del CTA "cómodo" que ya no existe en ese rango. La barra real ahí ahora mide 74px. Sin corregirlo, todo `scroll-margin-top` en ese rango habría dejado 9px de más. Corregido y **simplificado a un solo escalón**: 74px bajo 1200px, 83px desde 1200px. Es exactamente el modo de falla contra el que advertía el propio comentario del token ("los breakpoints tienen que coincidir siempre con los de `Barra.astro`") — la primera vez que se cobró.

**Duda 2:** el antetítulo del hero arrancaba demasiado abajo en móvil.

**Resolución 2:** medido a 360×640. El hero es la única sección que arranca pegada a la barra sticky, sin una sección previa que ya haya dado aire, así que el padding general de `--e6` (64px, D15) es de más ahí. Solo el padding **superior** del hero baja a `--e4` (32px) por debajo de 640px:

| | Antes (`--e6`) | Después (`--e4`) |
|---|---|---|
| Borde superior del antetítulo | 138px (21,6% de 640) | **106px (16,6%)** |
| Borde superior del `h1` | 210px | **178px** |
| Borde inferior de la placa | 582px | **549px** |

Probados también `--e5` (48px → 122px) y `--e3` (24px → 98px). `--e3` deja el antetítulo pegado a la barra; `--e4` es el punto donde se gana la mitad del vacío sin perder la separación. El padding **inferior** no se toca: sigue en `--e6`, que es lo que separa del bloque de Problema (medido en D15).

**Duda 3:** cambio de copy del antetítulo, de `SOFTWARE FACTORY · SANTA CRUZ DE LA SIERRA` a `SOFTWARE FACTORY · PARA FUNDADORES SIN EQUIPO TÉCNICO` (la ciudad se mantiene en el pie).

**Resolución 3:** aplicado. Medido a 360px: **2 líneas**, igual que el copy anterior — no empeora nada, no hace falta acortarlo.

**Bug encontrado al medirlo:** con el copy nuevo el antetítulo pasaba a 2 líneas **también a 1440px**, dejando "TÉCNICO" solo en la segunda. Causa: `base.css` aplica `max-width: 62ch` a todo `<p>` — una regla de cuerpo de texto — que a `--t-etiqueta` (12px) resuelve a 446px, y el texto pide ~449px. El antetítulo es una etiqueta de una línea, no cuerpo: se le pone `max-width: none` y el contenedor sigue limitando el ancho. Desde 639px hacia arriba vuelve a ser 1 línea.

---

## D22 · Fase 6 — titular del hero (sin cambio), Caso compactado, aparición al hacer scroll

**Duda 1:** a 360px el titular corta en 4 líneas ("Tu idea, / funcionando, / en tres / semanas."). ¿Subir el mínimo de `--t-display-xl` de 2,25rem a 2,5rem sigue entrando sin desbordar ni partir palabras?

**Medido** (Range API, agrupando por fila, no por `getClientRects()` crudo — un `<br>` produce rects espurios que inflan el conteo):

| Mínimo | Tamaño real | Filas | Margen (ancho de la fila más ancha vs contenedor) |
|---|---|---|---|
| 2,25rem (actual) | 36px | 4 | 13,5% |
| 2,4rem | 38px | 4 | 7,8% |
| 2,5rem (pedido) | 40px | 4 | **3,9%** |

Ninguna combinación corta palabras (verificado visualmente) — el salto de línea siempre cae en un espacio. Pero a 2,5rem el margen es 3,9%, por debajo del piso de 8% acordado.

**Resolución: no se cambia `--t-display-xl`.** Queda en `clamp(2,25rem, 8,2vw, 6rem)`. Se sigue partiendo en 4 líneas a 360px, pero eso ya era así antes de esta fase y no estaba en el pedido de esta ronda — solo se pidió medir el mínimo más grande.

**Duda 2:** la sección Caso quedó muy alta y vacía en escritorio tras la versión anonimizada (D20): tres filas de ficha y un `{{PENDIENTE}}`, sin imagen — a 1440px la mitad derecha de la pantalla quedaba completamente vacía.

**Resolución:** "El problema" y "Tiempo + Estado" pasan de tres filas apiladas a dos bloques lado a lado (`grid-template-columns: 1.4fr 1fr` desde 640px, misma tarjeta `--tinta-3`/`--borde` que el resto del sitio). "Tiempo" deja de ser una fila de texto y se convierte en un numeral enorme ("3") con `--t-dato` — el token de la escala tipográfica definido exactamente para esto (`docs/02-design-system.md` §3: "JetBrains Mono 700, `tabular-nums`") y que hasta esta sección no se usaba en ningún componente del sitio. Color `--verde-luz` (acento de texto verificado, 6,6:1), no `--verde-filo`: ese token es "uso puntual" (el numeral de la Placa) y no correspondía repetirlo. "Estado" se mantiene como texto simple, con un punto cuadrado de 8px en `--verde-luz` a modo de indicador — mismo lenguaje que las viñetas de `Paquetes.astro`.

Verificado en 360/640/1024/1440px: sin overflow, ambas tarjetas de igual alto (`align-items: stretch`, comportamiento por defecto de grid). `docs/03-content.md` §08 actualizado con la nota de layout.

**Duda 3:** implementar "aparición al hacer scroll" (docs/02-design-system.md §7): `opacity 0→1` + `translateY(8px→0)`, 400ms, `--salida`, una sola vez, escalonado máximo de 60ms entre hermanos.

**Resolución:** mecanismo compartido, no repetido por componente — clase `.revelar` (`utilidades.css`) + un único `IntersectionObserver` en `Base.astro` que se ejecuta una vez para toda la página. El escalonado se calcula en JS agrupando por `el.parentElement` (un `Map` cuenta cuántos `.revelar` ya vio ese padre y asigna `index * 60ms` a `transition-delay`) — así agregar o quitar un ítem de una lista no rompe el orden de los demás, y no hace falta escribir el delay a mano en cada componente.

Aplicado al `<h2>` de cada sección y a los ítems repetidos (fichas de Problema/Experiencia, etapas de Proceso, tarjetas de Paquetes, ítems de Preguntas), a los bloques de Tesis/Límites/Caso como una sola unidad, y al encabezado y al `<form>` de Contacto. **No aplicado al Hero**: ya es visible sin scroll (es lo primero que se ve, sin necesidad de bajar), animarlo se leería como parpadeo de carga, no como aparición.

Verificado con Playwright: estado inicial `opacity:0` con los delays correctos; tras `scrollIntoViewIfNeeded()` y esperar la transición, `opacity:1` y clase `revelar--visible` agregada; volver a scrollear arriba no lo vuelve a ocultar (el observer se desconecta tras el primer disparo, `unobserve`); con `prefers-reduced-motion: reduce` todo aparece `opacity:1` de inmediato, sin observer. Sin glitches visuales en los elementos con posicionamiento interno complejo (nodos de la línea de tiempo de Proceso, tarjeta destacada de Paquetes).

---

## D23 · Fase 6 — auditorías de cierre (sin hallazgos que corregir en el código)

Cuatro auditorías pedidas para el cierre de fase. Las cuatro dieron limpio — se documentan igual, porque "no encontré nada" solo vale si se puede mostrar que se buscó de verdad.

**Cadenas prohibidas y emojis (D8).** Grep de las 11 cadenas de D8 más un regex de rangos Unicode de emoji, sobre todo `src/`. Cero coincidencias reales: los únicos matches de las cadenas prohibidas están en comentarios que documentan la regla ("Sin S.A. en ningún lado") o en `docs/estructura/` (fuera de alcance de build, per `CLAUDE.md`). Cero emojis en `src/` — confirmado con un segundo regex más estricto para descartar falsos positivos de flechas (`→`, `←`) que sí aparecen, mucho, en la prosa de `docs/`.

**Hexadecimales fuera de `tokens.css`.** Grep de `#[0-9a-fA-F]{3,8}` sobre `src/`. Todas las coincidencias están dentro de `tokens.css` (incluyendo el degradado `--metal` y `--relleno-cta`, que son declaraciones de gradiente con varios stops, no un solo valor). Cero hex en componentes.

**Recorrido solo con teclado.** Tab completo de arriba a abajo en 1440px (34 paradas reales) y en 375px con el panel del menú (15 paradas + apertura/cierre). Orden lógico, foco visible (`outline: 3px solid`) en cada parada, honeypot (`nombre_empresa`) nunca alcanzado, acordeón operable, trampa de foco del panel confirmada en las dos direcciones (Tab desde el último enlace vuelve al botón; Shift+Tab desde el primero también). Sin hallazgos — nada que corregir.

**Lighthouse, las 4 categorías**, contra el build de producción real servido en estático (no `astro dev`, que no minifica ni sirve el `dist/` real; ni `astro preview`, que dejó de funcionar con el adaptador de Vercel en cuanto existe una ruta server-side — D19):

| Categoría | Escritorio | Móvil (throttling por defecto) |
|---|---|---|
| Performance | **100** | 93 |
| Accessibility | **100** | 100 |
| Best Practices | **100** | 100 |
| SEO | **100** | 100 |

Métricas de escritorio (el target de `docs/04-engineering.md` §7 es explícitamente "escritorio"): LCP 0,6s (meta <1,8s), CLS 0,002 (meta <0,05), TBT 0ms. JS total enviado: 7,9 KB (meta <15 KB) — todo inline, ningún archivo `.js` separado (`network-requests` de Lighthouse reporta 0 bytes de tipo Script porque no hay ninguno externo; medido a mano contando el contenido de cada `<script>` del HTML compilado). En móvil (sin target explícito en los docs) el LCP sube a 2,3s por el throttling agresivo de 4G simulado — el elemento LCP es el párrafo del hero (texto, no imagen; el sitio no tiene ninguna imagen de hero). No se optimiza más: no hay un target movil que incumplir, y forzar una mejora ahí competiría contra decisiones ya tomadas (fuentes reales, sin recortar el CSS del sitio).

**Sincronización de documentación vs. código real.** Ver el mensaje donde se listaron los 4 hallazgos antes de corregirlos — resumen: el bloque de tokens de §2 le faltaban ~30 líneas reales (escala tipográfica + `--barra-alto`), el valor de `--t-display-xl` en §3 estaba desactualizado desde Fase 3, el snippet de `.cta` en §5 no reflejaba el `white-space:nowrap` ni el split real en `.cta--primario`/`.cta--secundario`, y la regla de "`--metal` solo en tres lugares" nombraba un uso que nunca se construyó ("reglas divisorias") sin contar el que sí existe (botón de WhatsApp). Los cuatro corregidos. De paso: `--laton` se agregó a la tabla de contraste verificado (7,9:1, restringido por regla de uso, no por contraste) y se documentó por qué `--verde-noche` no está en esa tabla (D17).

---

## D24 · Lote de ajustes de copy y jerarquía

Lote grande de cambios de copy, todos reflejados en `docs/03-content.md`. Se documentan acá los que involucran una decisión técnica, no cada cambio de texto en sí (eso ya está en el contenido).

**Título por oración, técnica compartida (`#problema`, `#proceso`).** Cada oración en un `<span>` con `display:block`, no `<br>` ni párrafos separados: fuerza el salto de línea entre oraciones pero deja que cada una envuelva internamente si no entra, sin partir palabras. Se sacó el `max-width` angosto que tenían estos títulos (pensado para que `text-wrap: balance` decidiera el corte solo) — con el salto ya forzado por los spans, ese `max-width` solo apretaba de más a las oraciones cortas sin necesidad. `text-wrap: balance` se deja en el contenedor (se hereda): sigue sirviendo para balancear el envoltorio interno de la oración larga de `#problema` cuando cae a 2 líneas.

**Subrayado en látón: recurso limitado a dos lugares, no un estilo de texto.** Clase compartida `.subrayado-laton` (`utilidades.css`, no repetida por componente): `text-decoration-color: var(--laton)`, `text-decoration-thickness: 3px`, `text-underline-offset: 6px`. Usada en exactamente dos lugares: el remate de `Experiencia.astro` ("Y por eso también sabemos decir que no.") y el párrafo de apertura de `Contacto.astro` ("Una reunión de una hora..."). Verificado visualmente (zoom, no solo medido) que el offset de 6px despeja los descendentes en ambos tamaños de fuente donde se usa (`--t-titulo` y `--t-cuerpo-l`) — ninguna letra con descendente toca la línea. **No usar en un tercer lugar** sin revisar antes si la restricción sigue vigente; documentado en `docs/02-design-system.md` §5.

**Contraste de peso en el título de Contacto.** El planteo ("La idea que tenés hoy vale...") en `wght 500` de Archivo, el remate ("nada, hasta que alguien la use.") en `wght 900` — el mismo peso que el `<h1>` del hero (`--t-display-xl`), un eco tipográfico entre la apertura y el cierre de la página. Probado visualmente a tamaño real (`--t-display-l`, hasta 3,6rem): 500 se lee limpio y con peso real, no débil ni como error de carga de la fuente variable — no hizo falta subirlo a 600.

**Lista de negaciones en `#limites` (sección papel): marcador cuadrado sólido en `--tinta`.** Mismo patrón de viñeta cuadrada que `Paquetes.astro` (`::before` de 6×6px), pero en `--tinta` en vez de `--verde-luz`: reutiliza el contraste ya verificado (15:1) de la sección invertida en vez de introducir un color nuevo sin verificar contra `--papel`. Nunca emoji (D8) — la sección es de fondo papel, un emoji ahí destacaría todavía más que en el resto del sitio.

**Conclusión de `#limites` a peso de titular.** "Hacemos una sola cosa..." pasa de `.limites__parrafo` (cuerpo, `--t-cuerpo-l`) a una clase propia `.limites__cierre` en `--t-titulo` con `font-variation-settings` de titular (`wght 800`) — para que pese como cierre de sección, no como una negación más de la lista.

**`Caso.astro` desconectado de la página, no borrado.** `index.astro` deja de importarlo; el componente, con su copy real y el compactado de escritorio de D22, sigue en el repo para reactivarse cuando haya un caso de éxito con tracción real que mostrar. Sin enlaces de nav a `#caso` que sacar (nunca existió uno en `ENLACES_NAV`). `docs/01-brief.md` §3 actualizado: la tabla de estructura pasa de once a diez bloques, con una nota explícita sobre por qué `Caso.astro` no aparece ahí.

**Datos reales: WhatsApp y correo.** `src/lib/whatsapp.ts` deja de tener el placeholder `{{PENDIENTE: número}}` — número real `59175020808`. `Pie.astro` reemplaza los dos `{{PENDIENTE}}` (correo, WhatsApp) por enlaces reales (`mailto:info@devbro.xyz`, el mismo `ENLACE_WHATSAPP` compartido). `CORREO_DESTINO` en `.env.example` pasa a tener el valor real (`kevingomez@devbro.xyz`) — es el único de los cuatro valores del formulario que ya no queda vacío; `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` y `RESEND_API_KEY` siguen vacíos a propósito (pedido explícito: no se tocan hasta el final). D10 corregido con una nota — no se reescribe la tabla original, que documenta fielmente el estado en el momento en que se escribió.

---

## D25 · Fase 7 — identidad: favicon, Open Graph y dominio de producción

**Subrayado en látón (D24) demasiado largo en `#contacto`.** El párrafo de apertura ("Una reunión de una hora. Te decimos si es viable...") llevaba el subrayado completo, dos líneas — se leía como un hipervínculo, mal ubicado justo arriba del formulario. Se restringe a la primera oración únicamente ("Una reunión de una hora."). Actualizada la nota de `docs/02-design-system.md` §5: el recurso sigue limitado a dos lugares, pero uno de ellos ahora es una sub-porción del párrafo, no el párrafo entero.

**Favicon real, reemplaza el logo por defecto de Astro.** `public/favicon.svg` (y `favicon.ico`) todavía eran el placeholder que trae `astro create`. Nuevo diseño documentado en `docs/02-design-system.md` §9: cuadrado achaflanado (mismo lenguaje que la placa), D construida como polígono (silueta + hueco achaflanado, no texto ni arco — un favicon standalone no puede cargar Archivo ni tiene motivo para introducir una curva que no existe en el resto de la marca). Verificado a 16px y 32px reales con Playwright antes de darlo por bueno, como pedía la instrucción — se leyó con claridad en los dos tamaños, no hizo falta el fallback a silueta sólida que se había autorizado de antemano.

`favicon.ico` (16/32/48) se generó con un escritor de contenedor ICO propio, en unas 30 líneas de Node (header + entradas + los mismos PNG que ya se estaban capturando para verificar el SVG) — evita instalar una librería de conversión de imágenes que no está en la lista aprobada de `docs/04-engineering.md`. `apple-touch-icon.png` (180×180) reutiliza el mismo diseño pero con fondo `--tinta` a sangre completa: sin esquinas transparentes, que iOS rellenaría por su cuenta con un color que no controlamos.

**Contradice `docs/01-brief.md` §6.** Ahí la "versión reducida" (`DEVBRO` sin `SOLUTIONS`) estaba documentada para favicon y OG. La instrucción de esta fase pide explícitamente una D aislada para el favicon y el wordmark **completo** para OG — ninguna de las dos coincide con lo que decía el brief. Se implementa tal cual se pidió (instrucción explícita del humano, no una ambigüedad que haya que resolver en silencio) y se corrige `01-brief.md` §6 para que documente el estado real.

**Ruta oculta `/og` y `public/og.png`.** Nueva página `src/pages/og.astro`: lienzo fijo de 1200×630 (sin intención responsive, se renderiza una vez y se descarta), `noindex` vía meta robots, sin enlace desde la nav, excluida del sitemap a mano (ver más abajo). Capturada con Playwright emulando `prefers-reduced-motion: reduce` para que el script de conteo de la placa nunca arranque — el CSS por defecto de `Placa.astro` ya es el estado final (numeral `03`, sin transform), así que esto alcanza para "sin animación" sin tocar el componente.

Un hallazgo durante la captura: el lienzo mide exactamente el alto del viewport (630px), y la barra de desarrollo de Astro (`astro-dev-toolbar`) se ancla al fondo del *viewport* real, no del elemento — con un viewport de exactamente 630px de alto, la barra caía dentro de la captura del elemento. Se resolvió dando al viewport más alto que el lienzo (900px) para que la barra quede fuera de esa región; no fue necesario montar un servidor de producción aparte (el adaptador de Vercel no soporta `astro preview`, así que esa ruta habría exigido servir `.vercel/output/static` a mano con otra herramienta).

Verificado con el título reescalado a ~300px de ancho (miniatura de WhatsApp): se lee con claridad. El grabado de la placa y "SEMANAS" no se leen a ese tamaño — aceptable, son detalle decorativo, no el mensaje que tiene que sobrevivir la miniatura.

**`sitemap.xml` y `robots.txt` nunca se habían construido.** Estaban documentados desde la Fase 1 (`docs/04-engineering.md` §8, D3: "si `PUBLIC_SITE_URL` no está definida, se omiten canonical, og:url y **el sitemap**"), pero ese tercer elemento nunca se implementó — pasó desapercibido porque el dominio estuvo vacío toda la vida del proyecto y nadie llegó a notar que la ruta no existía. Se construyen ahora como endpoints de Astro (`src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`), sin instalar `@astrojs/sitemap` (no está en la lista aprobada): el sitio es de una sola página, así que el sitemap es una única `<url>`. Ambos gateados por `Astro.site`, mismo criterio que canonical/og:url — sin dominio, `sitemap.xml` responde 404 en vez de publicar URLs relativas o inventadas. `robots.txt` desautoriza `/og` explícitamente además del `noindex` propio de la página.

**Dominio de producción activado: `https://devbro.xyz`.** Cierra el pendiente de D3. `PUBLIC_SITE_URL` real en `.env.example` (no es un secreto como las llaves de Supabase/Resend, así que no hay problema en documentarlo ahí en texto plano) y en un `.env` local para poder verificar el build.

Al verificarlo apareció un bug preexistente de Fase 1 en `astro.config.mjs`: `process.env.PUBLIC_SITE_URL` se lee al evaluar el archivo de configuración, **antes** de que Astro/Vite carguen el `.env` del proyecto para el resto del build — un `.env` con la variable puesta, sin exportarla también como variable de shell, no tenía ningún efecto. Nunca se había notado porque el dominio estuvo vacío en cada fase anterior. Corregido usando `loadEnv` de `vite` (ya viene con `astro`, no es una dependencia nueva) directamente dentro de `astro.config.mjs` para leer el `.env` del directorio del proyecto; en Vercel no cambia nada, porque ahí la variable ya llega inyectada en `process.env` desde la configuración del proyecto. Se usó `'.'` como directorio en vez de `process.cwd()` porque el proyecto no tiene `@types/node` instalado (tampoco está en la lista aprobada) y `process.cwd()` no tipa sin él; con `astro`/`npm` invocando siempre el build desde la raíz del proyecto, un `'.'` literal es equivalente y no exige la dependencia.

Verificado en el build con el dominio activo: `canonical`, `og:url` y el `<url>` del sitemap resuelven a `https://devbro.xyz/`; `og:image` y `twitter:image` resuelven a `https://devbro.xyz/og.png` (absolutas, no relativas); el JSON-LD de `Organization` suma el campo `url`.

**Etiquetas Open Graph completas.** Se agregan `og:image:width` (1200), `og:image:height` (630), `og:image:alt` y `twitter:image:alt` en `Base.astro` — no estaban y son las que evitan que un crawler tenga que descargar la imagen para saber sus dimensiones antes de armar la tarjeta.

**Validación externa: no se pudo correr un validador en vivo.** `devbro.xyz` todavía no está desplegado, así que ninguna herramienta externa (Facebook Sharing Debugger, opengraph.xyz, etc.) puede resolver el dominio — esos servicios necesitan una URL públicamente alcanzable. Se hizo en su lugar la auditoría manual que la instrucción autorizaba como alternativa: las cuatro etiquetas obligatorias del protocolo (`og:title`, `og:type`, `og:image`, `og:url`) están presentes, junto con las recomendadas (`og:description`, `og:site_name`, `og:locale`, dimensiones/alt de imagen) y el Twitter Card completo — todas con valores absolutos donde corresponde. Pendiente recomendado para cuando el dominio esté en vivo: correr un validador real una sola vez como confirmación final.
