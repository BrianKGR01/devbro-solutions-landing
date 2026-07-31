# 05 · Roadmap de construcción

Seis fases. **Una a la vez, en orden.** Al terminar cada una, verificá contra su checklist antes de seguir.

Sí hace falta un roadmap aunque sea una sola página: sin él, un agente construye las once secciones de una vez y después es imposible saber dónde se rompió qué.

---

## Fase 1 · Cimientos

**Objetivo:** proyecto que compila, con el sistema de diseño cargado y nada más.

- [ ] Proyecto Astro inicializado con adaptador de Vercel
- [ ] `src/styles/tokens.css` copiado tal cual de `docs/02-design-system.md` §2
- [ ] `base.css` con reset, tipografía base y retícula de fondo
- [ ] `utilidades.css` con contenedor, sección y grillas
- [ ] Fuentes descargadas a `public/fonts/`, con `@font-face` y preload
- [ ] `Base.astro` con metadatos completos
- [ ] Componentes `Wordmark`, `Cta` y `Etiqueta` funcionando
- [ ] Página de prueba mostrando la paleta, la escala tipográfica y los tres componentes

**Verificar:** compila sin warnings · las tres tipografías cargan · el eje `wdth` de Archivo funciona (si no, aplicar el plan B de `docs/02` §3) · el botón se hunde al presionarse · el foco es visible.

**No sigas si el eje de ancho no está resuelto.** Todos los titulares dependen de eso.

---

## Fase 2 · El elemento firma

**Objetivo:** la placa troquelada, sola, perfecta.

- [ ] `Placa.astro` con chaflanes por `clip-path`, borde metálico y remaches
- [ ] Grabado superior, numeral y etiqueta `SEMANAS`
- [ ] Animación completa según la tabla de tiempos de `docs/02` §6
- [ ] `prefers-reduced-motion` → estado final directo, sin transición
- [ ] Responsive: rotación reducida a `-3deg` en móvil

**Verificar:** el numeral no cambia de ancho al contar (`tabular-nums`) · la animación corre una sola vez · con movimiento reducido se ve el estado final sin parpadeo · entra completa a 360px.

Esta fase se hace antes que el hero a propósito: es el elemento más difícil y el que define si el concepto funciona. Si sale mal, conviene saberlo ahora.

---

## Fase 3 · Parte superior

**Objetivo:** todo lo que se ve sin hacer scroll, más las dos secciones siguientes.

- [ ] `Barra.astro` — sticky, con colapso a solo CTA en móvil
- [ ] Enlace "Saltar al contenido"
- [ ] `Hero.astro` — dos columnas en escritorio, una en móvil con la placa arriba
- [ ] `Problema.astro` — tres ítems con numeral en latón
- [ ] `Tesis.astro` — sección invertida en papel

**Verificar:** el hero entra completo sin scroll en 1440×900 · a 360px nada desborda · la sección de papel no arrastra la retícula de fondo · los anclas de la barra funcionan.

---

## Fase 4 · Núcleo del argumento

**Objetivo:** las secciones que convencen.

- [ ] `Experiencia.astro` — la sección más importante después del hero
- [ ] `Proceso.astro` — siete etapas como orden de trabajo
- [ ] `Paquetes.astro` — tres columnas, la del medio destacada
- [ ] `Limites.astro` — segunda sección invertida

**Verificar:** las tres fichas de experiencia se apilan bien en móvil · las siete etapas se leen como secuencia, no como lista suelta · la tarjeta destacada se distingue sin gritar · en móvil, LANZAMIENTO aparece **primero**, no en el medio.

---

## Fase 5 · Prueba, preguntas y conversión

- [ ] `Caso.astro` — con placeholders visibles y marco de imagen dimensionado
- [ ] `Preguntas.astro` — acordeón accesible con `aria-expanded`
- [ ] `Contacto.astro` — formulario completo
- [ ] `src/pages/api/contacto.ts` — Supabase + Resend, con degradación elegante
- [ ] Honeypot y control de tiempo mínimo
- [ ] Estados de éxito y error con los textos exactos de `docs/03-content.md`
- [ ] `BotonWhatsApp.astro` — flotante, aparece al salir del hero
- [ ] `Pie.astro` — sin "S.A."

**Verificar:** el acordeón se maneja con teclado (Tab, Enter, Espacio) · el formulario valida en cliente y servidor · si Supabase falla, el correo sale igual · el mensaje de error remite a WhatsApp · ningún `{{PENDIENTE}}` fue rellenado con texto inventado.

---

## Fase 6 · Pulido

- [ ] Aparición al hacer scroll: 400ms, una sola vez, escalonado de 60ms máximo
- [ ] Auditoría de accesibilidad completa, solo con teclado
- [ ] Lighthouse en las cuatro categorías
- [ ] Revisión a 360, 768, 1024 y 1440
- [ ] Revisión con `prefers-reduced-motion` activado
- [ ] Revisión con las fuentes bloqueadas (que la página siga siendo legible)
- [ ] `favicon.svg` y `og.png` con la placa
- [ ] `.env.example` completo
- [ ] Búsqueda final de cadenas prohibidas: `S.A.`, `MenuRes`, `Treser`, `PuntoVenta`, `serverless`, `microservicios`
- [ ] Búsqueda de hexadecimales fuera de `tokens.css`

**Verificar:** las metas de rendimiento de `docs/04` §7 · accesibilidad en 100 · cero errores en consola.

---

## Lo que queda pendiente de contenido

Correo de contacto, número de WhatsApp y dominio de producción ya están
resueltos con datos reales (D24, D25) — se sacan de esta tabla. Lo único
que sigue genuinamente pendiente:

| Pendiente | Dónde | Quién |
|---|---|---|
| Textos del caso 001 | `Caso.astro` (desconectado de `index.astro`, D24) | Cliente |
| Captura del ERP | `Caso.astro` | Cliente |

No bloquea nada — se reconecta la sección cuando haya un caso con
tracción real que mostrar. Debe quedar como `{{PENDIENTE: ...}}` visible
mientras tanto, nunca inventado ni oculto.

**"Enlace de agendamiento"**, que estaba en esta tabla como condicional
("si se usa"): no se usa — el CTA "Agendar diagnóstico" lleva al
formulario de `#contacto`, no a un calendario externo tipo Calendly. Es
una decisión implícita, no un pendiente: si en algún momento se quiere
agendamiento automático con horario elegible por el lead, es una
decisión nueva a tomar con el humano, no algo que falte completar.
