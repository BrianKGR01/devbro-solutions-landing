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

**Altura del hero:** la restricción "entra sin scroll en 1440×900" (`docs/01-brief.md`) se relaja deliberadamente para este rediseño — con el titular a 96px en 3 líneas, el hero mide ~957px reales, unos ~57px de scroll a 900px de viewport. Aceptado explícitamente: el tamaño del titular y la jerarquía tipográfica valen más que evitar ese scroll mínimo.

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
