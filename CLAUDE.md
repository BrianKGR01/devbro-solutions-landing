# CLAUDE.md — DevBro Solutions · Landing

Instrucciones para agentes que trabajen en este repositorio. Léelo completo antes de escribir código.

---

## Qué es esto

Landing page de una sola página para **DevBro Solutions**, una software factory de Santa Cruz de la Sierra, Bolivia.

**Su único trabajo:** que un fundador no técnico con capital agende una reunión de diagnóstico.

No es un portafolio, no es un blog, no es un catálogo de productos. Una página, un objetivo, un CTA repetido.

---

## Orden de lectura obligatorio

Antes de escribir una línea de código, leé en este orden:

1. `docs/01-brief.md` — qué se construye, para quién, con qué estructura
2. `docs/02-design-system.md` — tokens, tipografía, componentes, movimiento. **Normativo**
3. `docs/03-content.md` — el copy final, literal. No lo reescribas
4. `docs/04-engineering.md` — stack, estructura, convenciones, accesibilidad, rendimiento
5. `docs/05-roadmap.md` — orden de construcción por fases
6. `docs/06-decisiones.md` — resoluciones a contradicciones detectadas. **Tiene prioridad sobre todo lo anterior**

`docs/estructura/` contiene la documentación de negocio de la empresa. **Es contexto de consulta, no requisitos de build.** Consultala si necesitás entender el porqué de una decisión de copy o de estructura. No implementes nada que salga solo de ahí.

---

## Flujo de trabajo con git

### Ramas

```
main                    ← producción. No se commitea directo, nunca
 └── dev                ← integración
      └── feat/<fase>   ← trabajo diario
```

- **Todo el trabajo va en ramas `feat/`**, creadas desde `dev`
- Cada fase del roadmap es una rama: `feat/01-cimientos`, `feat/02-placa`, `feat/03-parte-superior`, etc.
- Al terminar una fase: PR de `feat/<fase>` → `dev`
- `dev` → `main` solo en hitos acordados con el humano. **Nunca por iniciativa propia**

### Commits — Conventional Commits

Formato: `tipo(alcance): descripción en español, en imperativo`

```
feat(placa): agrega componente de placa troquelada con animacion
fix(foco): corrige contraste del foco en secciones de papel
style(hero): ajusta tracking del titular
docs(readme): documenta variables de entorno
chore(deps): agrega adaptador de vercel
refactor(tokens): unifica escala de espaciado
```

**Tipos:** `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `perf`, `test`

**Reglas:**
- Tipo y alcance en inglés minúscula, descripción en español
- Descripción en imperativo, sin punto final, sin mayúscula inicial
- Sin tildes en la línea de asunto (evita problemas de codificación en terminales)
- **Un commit por unidad de trabajo terminada**, no uno gigante al final de la fase
- El cuerpo del commit, si hace falta, explica el **porqué**, no el qué

### Pull requests

Al terminar una fase, abrí el PR con `gh pr create`. Cuerpo del PR:

```markdown
## Qué incluye
- [lista de lo construido]

## Verificado
- [ ] Compila sin warnings (`npm run check`)
- [ ] Correcto en 360, 768, 1024 y 1440
- [ ] Navegable con teclado, foco siempre visible
- [ ] Sin hex fuera de tokens.css
- [ ] Sin errores en consola
- [ ] Reglas duras de CLAUDE.md respetadas

## Pendiente / notas
- [lo que quedó abierto, si algo]
```

Título del PR con el mismo formato de conventional commits.

**No mergees tus propios PR.** Los revisa y mergea el humano.

---

## Reglas duras de diseño

Estas no son preferencias. Romper cualquiera invalida el trabajo.

### Prohibido
- ❌ `border-radius` distinto de `0`. **Sin excepciones.** Los chaflanes de la placa se hacen con `clip-path` (ver `docs/06-decisiones.md` D2)
- ❌ `blur()`, `backdrop-filter`, glassmorphism, glow, `box-shadow` con desenfoque
- ❌ Sombras difusas. Todas sólidas y desplazadas: `Npx Npx 0 <color>`
- ❌ **Degradados de color como fondo de sección.** Permitidos: `--metal` en sus tres usos puntuales y la retícula de fondo definida en `docs/02` §4 (ver `docs/06-decisiones.md` D1)
- ❌ Verdes fluorescentes, neón o ácidos. La paleta del design system es la única fuente de verdad
- ❌ Colores fuera de los tokens. Ningún hex hardcodeado en componentes
- ❌ **Emojis en cualquier texto visible.** Los íconos van como SVG inline (ver `docs/06-decisiones.md` D5)
- ❌ Librerías de animación (GSAP, Framer Motion, AOS, Lottie)
- ❌ Librerías de UI (Bootstrap, MUI, shadcn, DaisyUI)
- ❌ `localStorage`, `sessionStorage`, cookies de tracking
- ❌ Jerga de infraestructura en el copy visible: "serverless", "microservicios", "edge", "cloud native", "API", "stack". Permitidos "software factory" y "ERP" (ver `docs/06-decisiones.md` D6)
- ❌ La sigla "S.A." en cualquier parte del sitio
- ❌ Mencionar MenuRes, Treser o PuntoVenta

### Obligatorio
- ✅ Bordes de `2px` (`3px` en la placa). Nunca hairlines de 1px
- ✅ Todo color, espaciado y tipografía sale de variables CSS definidas en un único archivo de tokens
- ✅ Espaciado en escala de 8px
- ✅ Foco de teclado visible en todo elemento interactivo, con la regla global de `docs/06-decisiones.md` D4
- ✅ `prefers-reduced-motion` respetado en toda animación
- ✅ Responsive real hasta 360px de ancho
- ✅ Español rioplatense-boliviano: voseo ("tenés", "podés", "hacelo"). Consistente en toda la página

---

## Precedencia sobre plugins y skills

Si un plugin, skill o guía externa cargada en la sesión sugiere una técnica, librería o dirección estética que contradice este archivo o `docs/02-design-system.md`, **mandan este archivo y el design system**.

Esto aplica especialmente a plugins de animación y 3D. Si hay skills instalados que recomiendan GSAP, Framer Motion, Three.js, React Three Fiber, Babylon.js, ScrollTrigger o parallax: **no se usan en este proyecto**, sin importar lo que sugieran. La dirección de diseño es deliberadamente estática y física.

Si detectás una contradicción de este tipo, avisá antes de resolverla.

---

## Stack

- **Astro** (sin framework de UI, sin islands salvo el formulario)
- **CSS puro** con custom properties. Sin Tailwind, sin preprocesadores
- **TypeScript** en la lógica del formulario
- Deploy en **Vercel**

Justificación en `docs/04-engineering.md` §1. Si vas a proponer un cambio de stack, preguntá antes; no lo cambies por tu cuenta.

---

## Comandos

```bash
npm install
npm run dev        # desarrollo, localhost:4321
npm run build      # build de producción a ./dist
npm run preview    # previsualizar el build
npm run check      # astro check + tsc
```

---

## Definición de terminado

Una tarea está lista cuando:

1. Compila sin warnings (`npm run check` limpio)
2. Se ve correcta en 360px, 768px, 1024px y 1440px
3. Navegable completa con teclado, con foco siempre visible
4. Sin colores hardcodeados fuera del archivo de tokens
5. Sin errores en consola
6. Respeta todas las reglas duras de arriba
7. Commiteada con formato conventional commits en su rama `feat/`

---

## Cómo trabajar

- **Fase por fase.** Seguí `docs/05-roadmap.md`. No saltes fases ni construyas todo de una
- **Una sección a la vez.** Terminá y verificá una antes de empezar la siguiente
- **No inventes contenido.** Todo el copy está en `docs/03-content.md`. Lo que falta está marcado como `{{PENDIENTE}}` y debe quedar visible como placeholder, no rellenado con texto inventado
- **No agregues secciones** que no estén en el brief
- **Preguntá** si algo del brief es ambiguo o si dos documentos se contradicen. No resuelvas la ambigüedad en silencio

## Cuándo parar y preguntar

- El diseño pedido parece imposible con las restricciones dadas
- Falta un dato que no está en ningún documento y no está marcado como pendiente
- Una regla dura impide resolver un problema real de usabilidad o accesibilidad
- Vas a instalar cualquier dependencia que no esté listada en `docs/04-engineering.md`
- Vas a mergear algo a `main`
