# 01 · Brief de construcción

## 1. Objetivo

Una página. Un objetivo: **que el visitante agende una reunión de diagnóstico**.

Todo lo que no empuje hacia eso, sobra.

---

## 2. Quién la va a leer

Un profesional o empresario de 35-55 años, con 5-20 años en un rubro específico (legal, contable, agro, salud, logística, construcción, comercio). Tiene un problema que ve todos los días en su trabajo y capital para intentar resolverlo con software.

**No es técnico y no quiere serlo.** No sabe qué es serverless ni le importa.

**Lo que siente al llegar a la página:** desconfianza. Ya pidió cotizaciones y le dieron números que van de 6.000 a 60.000 dólares sin explicación. No sabe si le están vendiendo humo.

**Lo que la página tiene que lograr:** que piense *"esta gente sí sabe de qué habla y me está diciendo las cosas claras"*.

Escribí y diseñá para esa persona. Si una decisión la haría sentir tonta, está mal.

---

## 3. Estructura de la página

Once bloques, en este orden exacto. No agregues, no reordenes.

| # | ID | Bloque | Fondo |
|---|---|---|---|
| 00 | — | Barra superior (sticky) | tinta |
| 01 | `#inicio` | Hero + placa troquelada | tinta |
| 02 | `#problema` | El problema, 3 ítems | tinta |
| 03 | `#tesis` | La tesis de las palas | **papel** (invertida) |
| 04 | `#experiencia` | Por qué somos rápidos | tinta |
| 05 | `#proceso` | Cómo trabajamos, E0-E6 | tinta |
| 06 | `#paquetes` | Tres paquetes | tinta |
| 07 | `#postulacion` | Postulación sin presupuesto (D30) | tinta-2 |
| 08 | `#limites` | Lo que no hacemos | **papel** (invertida) |
| 09 | `#preguntas` | Preguntas frecuentes | tinta |
| 10 | `#contacto` | Cierre + formulario | tinta |
| 11 | — | Pie | tinta |

Las dos secciones en papel (03 y 08) son deliberadas: rompen la monotonía del oscuro y funcionan como respiro visual. No las conviertas a oscuro.

**`#postulacion` (D30, ver `docs/06-decisiones.md`):** camino alternativo para equipos sin equipo técnico ni presupuesto para SONDA — postulan por WhatsApp, no por el formulario de `#contacto`. Va justo después de Paquetes a propósito: se lee como una cuarta opción inmediatamente después de ver los tres precios. Único bloque en `--tinta-2` ("superficies elevadas", sin usar hasta ahora) — lo distingue del `--tinta` liso de Paquetes a cada lado sin inventar un token nuevo.

**`Caso.astro` (D24, ver `docs/06-decisiones.md`):** construido y con copy real (docs/03-content.md §08), pero desconectado de `index.astro` — no aparece en la página. Se reactiva cuando haya un caso de éxito con tracción real que mostrar. La tabla de arriba ya no lo incluye.

**Estructura interna del hero (01):** el titular ocupa siempre el ancho completo del bloque, nunca una columna compartida con la placa — la placa (428px rotada) y un titular con jerarquía real no entran juntos en columna sin sacrificar uno de los dos. Desde el breakpoint de escritorio (1024px) la placa se ubica junto al párrafo + botones + microcopia; por debajo, **después** del titular (no antes — medido a 360×640, ver D13), centrada. Detalle completo y números en `docs/06-decisiones.md` D12 y D13, y `docs/02-design-system.md` §8.

---

## 4. Jerarquía de atención

Si algo tiene que destacar por encima del resto, es esto, en orden:

1. **La placa del hero** con el contador de semanas — el elemento firma
2. **El titular del hero**
3. **Los CTA** — todos dicen "Agendar diagnóstico"
4. **La sección 04 (Por qué somos rápidos)** — es la que desarma la objeción principal
5. **Los precios**

Todo lo demás es soporte.

---

## 5. Llamados a la acción

Un solo CTA primario, repetido: **"Agendar diagnóstico"**.

Aparece en: barra superior, hero, después de paquetes, y en la sección de contacto.

**Dónde aparece en móvil (rediseñado, ver `docs/06-decisiones.md` D21):** por debajo de 1024px el CTA **no** vive en la barra. La barra muestra el wordmark completo y un botón de menú; el CTA es la acción de cierre del panel del menú. En la barra estaba duplicado con el del hero —los dos visibles casi a la vez, a un scroll de distancia— y competía por el ancho con la marca. El resto de las apariciones no cambia.

**CTA secundario en el hero:** "Cómo trabajamos" → ancla a `#proceso`.

**Canal alternativo permanente:** botón flotante de WhatsApp, esquina inferior derecha, visible desde el scroll del hero en adelante. En Bolivia WhatsApp convierte más que un formulario, y el visitante debe poder elegir.

Nunca uses "Comenzar gratis", "Empezá ahora" ni nada que prometa algo que no es cierto.

---

## 6. Marca: wordmark tipográfico

No hay logo todavía. Se construye un wordmark puramente tipográfico.

```
DEVBRO │ SOLUTIONS
```

**Especificación:**
- `DEVBRO` — Archivo, peso 900, width expandido, `letter-spacing: -0.02em`, color `--papel`
- Separador — regla vertical de 2px, alto igual a la altura-x de la mayúscula, color `--laton`, márgenes laterales de 10px
- `SOLUTIONS` — JetBrains Mono 700, tamaño `0.62em` respecto de DEVBRO, `letter-spacing: 0.18em`, color `--humo`, alineado a la línea base

**Ya no se usa en la barra móvil** (D21): al sacar el CTA de la barra sobra ancho de sobra para el wordmark completo en cualquier viewport, así que la marca se muestra entera en todos lados.

**Favicon y Open Graph (actualizado en D25, ver `docs/06-decisiones.md`):** el favicon **no** usa una versión reducida del wordmark — es una `D` aislada, construida como polígono achaflanado (`docs/02-design-system.md` §9), porque un favicon standalone no puede cargar la tipografía autohospedada. La imagen de Open Graph, al revés, usa el wordmark **completo** — ahí sí sobra espacio de horizontal.

Debe construirse como componente reutilizable, no como imagen.

---

## 7. Restricciones de contenido

- **Nada sobre productos propios.** MenuRes, Treser y PuntoVenta no existen en esta página. Se sumarán cuando el otro dominio esté vivo
- **Sin "S.A."** en el pie ni en ninguna parte
- **El caso 001 va con placeholders.** El contenido real llega después; ver `docs/03-content.md` §08
- **Sin testimonios inventados.** Si no hay testimonio real, no hay bloque de testimonios
- **Sin logos de clientes** hasta que haya autorización explícita por escrito

---

## 8. Lo que esta página no lleva

Para que quede claro y no aparezca por inercia:

- Sin blog ni sección de novedades
- Sin equipo con fotos ni bios
- Sin contador de proyectos o clientes inventado
- Sin newsletter
- Sin selector de idioma
- Sin modo claro/oscuro. La página es oscura por diseño
- Sin chat en vivo (el botón de WhatsApp cumple esa función)
- Sin banner de cookies: no se usan cookies ni analítica de terceros en la v1
