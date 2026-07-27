# 07 · Marca y landing page

## 1. Alcance de esta landing ✅

**Esta landing vende un solo producto: la software factory.**

Los productos propios (MenuRes, Treser, PuntoVenta) van en **otro dominio, con su propia identidad**. No aparecen en el catálogo de esta página. La captura que pasaste sirvió como referencia de color y estructura, nada más.

✅ **Decidido: no se mencionan, ni siquiera de pasada.** Mi recomendación, que es la que quedó implementada:

Una línea del tipo *"también construimos productos propios"* **sin enlace** es peor que no decir nada. Deja una afirmación colgada que el visitante no puede verificar, invita a una pregunta que la página no responde, y le roba atención al único objetivo que tiene. Un dato que no se puede comprobar no suma credibilidad: la resta.

Además, ese argumento rinde muchísimo más **dicho en una reunión** —*"además tenemos tres productos propios operando con clientes reales"*— que como una línea perdida en una landing.

Se agrega cuando el otro dominio esté vivo, y ahí sí con enlace. Es un cambio de dos minutos.

---

## 2. Diagnóstico de la landing anterior

Tres problemas, en orden de gravedad:

1. **El lenguaje es de infraestructura, no de riesgo.** "Serverless", "Edge Computing", "Microservices", "Real-time DB" no le dicen nada a un abogado o un agrónomo con capital. Peor: lo hacen sentir que no entiende, que es exactamente la sensación que tu empresa promete eliminar.
2. **No hay prueba.** Ninguna evidencia de que sepan hacer lo que dicen. Y resulta que tenés la mejor prueba posible —una década de experiencia y ERPs construidos antes— y no está en ninguna parte.
3. **El estilo es genérico de SaaS.** Dark mode + verde menta + glow + cards redondeadas es la plantilla de mil landings. No se recuerda.

El rediseño resuelve el 3. Los puntos 1 y 2 son los que mueven la aguja comercial.

---

## 3. Dirección de diseño

### Concepto: **La Orden de Trabajo**

El neobrutalismo funciona cuando tiene una razón de ser, no solo bordes gruesos. La razón acá es el mundo de las palas: **taller, herramienta industrial, orden de trabajo, placa troquelada, boleta de despacho**. Material con peso. Metal mecanizado, no vidrio esmerilado.

La página entera se comporta como una orden de trabajo: numerada, sellada, con secciones que son ítems de un formulario. Encaja con el negocio porque tu proceso *es literalmente una secuencia numerada* (E0 → E6). La numeración informa; no decora.

**Antítesis declarada** — lo que no vamos a hacer: sin glow, sin blur, sin glassmorphism, sin degradados suaves de fondo, sin cards flotantes con sombra difusa, sin bordes redondeados grandes. Nada que parezca vidrio. Y **nada fluorescente**.

---

## 4. Color ✅ corregido a verde metálico sobrio

Fuera el verde fosforescente. La nueva paleta es **verde metalizado profundo**: verde de máquina, de instrumento, de chapa pintada. Sobrio, con brillo pero sin grito.

```css
:root {
  /* Base */
  --tinta:        #080B09;  /* negro con base verde, no azulado */
  --tinta-2:      #0F1512;  /* superficies elevadas */
  --tinta-3:      #18201C;  /* tarjetas */
  --papel:        #EDEFEA;  /* blanco hueso, secciones invertidas */
  --humo:         #8A968F;  /* texto secundario sobre oscuro */

  /* Verde metálico — el eje de la marca */
  --verde-noche:  #0C2A1E;  /* verde casi negro, superficies teñidas */
  --verde-base:   #145239;  /* relleno de botones y bloques */
  --verde:        #1D7A52;  /* verde de marca. Bordes, rellenos, íconos */
  --verde-luz:    #4FA57C;  /* texto de acento sobre oscuro */
  --verde-filo:   #86C9A4;  /* filo especular. Muy puntual */

  /* Acento secundario */
  --laton:        #B8A26A;  /* latón apagado. Solo numerales y reglas */
}
```

### El degradado metálico

Un degradado metálico no es un fade de dos colores: es un degradado con una **banda especular estrecha** que simula la reflexión sobre una superficie mecanizada. Esa banda es lo que separa "metálico" de "verde en degradado".

```css
--metal: linear-gradient(135deg,
  #0C2A1E  0%,
  #145239 22%,
  #2E8F62 44%,
  #86C9A4 51%,   /* ← banda especular, estrecha a propósito */
  #2E8F62 58%,
  #145239 80%,
  #0C2A1E 100%);
```

Se usa en **tres lugares y nada más**: el filo de los botones primarios, el borde de la placa del hero, y las reglas divisorias de sección. Nunca como fondo de sección completa — eso es justamente lo que hace ver "SaaS genérico".

### Reglas de uso
- **Máximo 12% de superficie verde** en cualquier pantalla. El verde marca acción, estado y dato. Todo lo demás es tinta y papel
- El latón aparece **solo** en numerales de sección y filetes. Si aparece en más de tres lugares por pantalla, sobra
- El `--verde-filo` es luz reflejada, no color de relleno. En bloques planos no se usa

### Contraste (verificado)
| Uso | Contraste | Veredicto |
|---|---|---|
| `--verde-luz` sobre `--tinta` | 6,6:1 | ✅ Apto para texto de cuerpo |
| `--verde` sobre `--tinta` | 3,7:1 | ⚠️ Solo títulos grandes, bordes e íconos. **No para párrafos** |
| `--papel` sobre `--verde-base` | 7,6:1 | ✅ Texto claro sobre botón verde |
| `--tinta` sobre `--papel` | 15:1 | ✅ Secciones invertidas |

**Regla derivada:** el texto de acento en párrafos usa `--verde-luz`, nunca `--verde`.

---

## 5. Tipografía

| Rol | Familia | Uso |
|---|---|---|
| **Display** | `Archivo Expanded` (800-900, width 110-125) | Titulares. Ancha, industrial, pesada. Se lee como letrero de taller |
| **Cuerpo** | `Inter Tight` (400 / 500 / 600) | Párrafos, listas, UI |
| **Utilitaria** | `JetBrains Mono` (400 / 700, mayúsculas) | Etiquetas, numerales, precios, plazos, metadatos |

**Por qué esta combinación:** `Space Grotesk` es la elección por defecto de todo landing tech de los últimos tres años. `Archivo Expanded` da la misma energía técnica con presencia de cartel impreso, que es lo que pide el concepto. La mono no es decorativa: en tu negocio los números —semanas, dólares, usuarios— *son* el argumento, y merecen su propia voz.

### Escala

```
Display XL   clamp(3.2rem, 9vw, 7rem)   Archivo Expanded 900 · tracking -0.03em · lh 0.88
Display L    clamp(2.4rem, 5vw, 4rem)   Archivo Expanded 800 · tracking -0.02em · lh 0.94
Título       1.5rem                      Archivo Expanded 800
Cuerpo L     1.125rem                    Inter Tight 400 · lh 1.6
Cuerpo       1rem                        Inter Tight 400 · lh 1.65
Etiqueta     0.75rem                     JetBrains Mono 700 · tracking 0.12em · MAYÚSCULAS
Dato         clamp(2rem, 4vw, 3.5rem)    JetBrains Mono 700 · tabular-nums
```

**Detalle clave de los titulares:** `line-height` por debajo de 1 y tracking negativo. Los bloques deben verse **compactados**, como tipos de metal apretados. Es lo que separa neobrutalismo bien hecho de "letra grande y negrita".

---

## 6. Componentes

### Reglas transversales
- Bordes `2px solid`. Nunca hairlines
- Radio `0px`. Sin excepciones. La única forma curva permitida es la placa del hero
- Sombra sólida y desplazada, **sin desenfoque**: `box-shadow: 6px 6px 0 var(--verde-noche)`
- Espaciado en escala de 8px. Padding vertical de sección: 96-160px
- Retícula de fondo de 1px en `rgba(237,239,234,.035)`. Sutil, pero ancla todo al concepto de formulario

### Botón primario — *filo metálico*
```
relleno: linear-gradient(180deg, #145239, #0C2A1E)
texto:   var(--papel), Archivo Expanded 800, MAYÚSCULAS, tracking .04em
borde:   2px solid transparent con var(--metal) como border-image
sombra:  5px 5px 0 var(--verde-noche)
hover:   translate(3px,3px) · sombra 2px 2px 0
active:  translate(5px,5px) · sombra 0 0 0
```
El botón **se hunde** al presionarse. Es la microinteracción principal del sitio y la única que hace falta: sensación de mecanismo físico, no de software.

El degradado metálico va en el **filo**, no en el relleno. Así el texto siempre queda sobre fondo oscuro y legible, y el efecto metálico se lee como canto mecanizado. Es más sobrio y funciona mejor que un botón relleno de degradado.

### Botón secundario
Transparente, borde 2px `--humo`, texto `--papel`. Mismo hundido.

### Tarjeta / ítem de orden
```
fondo:  var(--tinta-3)
borde:  2px solid rgba(237,239,234,.10)
radio:  0
numeral arriba a la izquierda, mono, en var(--laton)
la tarjeta destacada lleva borde var(--verde) y sombra sólida var(--verde-noche)
```

### Etiqueta (chip)
Mono, mayúsculas, borde 2px, fondo transparente, padding 4px 10px. Para "3 SEMANAS", "USD 5.000", "CÓDIGO FUENTE INCLUIDO".

### Sección invertida
Una o dos secciones con fondo `--papel` y texto `--tinta`. El corte a claro rompe la monotonía del oscuro y es muy característico del neobrutalismo bien hecho. Recomendado para la sección de tesis.

---

## 7. Elemento firma: **la placa troquelada**

Lo único que la página tiene que hacer memorable.

En el hero, una **placa metálica** rotada ~ -6°: rectángulo con esquinas achaflanadas, borde de 3px con el degradado metálico, cuatro remaches en las esquinas. Arriba, grabado en mono pequeño: `DEVBRO SOLUTIONS · ORDEN Nº 0001`. En el centro, un numeral enorme.

El numeral es el argumento entero de la empresa: **el plazo en semanas**.

**La animación (una sola, menos de 2 segundos, una sola vez):**
1. La placa entra desde arriba y se asienta con un golpe seco de 4px
2. El numeral arranca en `24` — lo que tarda una agencia tradicional
3. Baja en saltos rápidos y desiguales: 24 → 16 → 11 → 07 → 03
4. Al llegar a `03` la placa vibra 2px y el filo metálico recorre el borde una vez
5. Debajo aparece grabado: `SEMANAS`

Cuenta la propuesta de valor sin una sola frase de marketing. Respeta `prefers-reduced-motion` mostrando el estado final directo.

La misma placa, en versión chica y estática, se reutiliza como marcador de sección a lo largo de la página.

**Por qué placa y no sello de goma:** el sello sería tinta, informal, y pediría un color saturado. La placa es metal grabado — sobria, permanente, industrial. Es coherente con "verde metálico" y con vender certeza en vez de entusiasmo.

---

## 8. Estructura de la landing (con copy)

Orden pensado para el recorrido mental del ICP: *me identifico → entiendo → te creo → sé cuánto → sé qué hacer*.

---

### **00 — Barra superior**
Wordmark DevBro Solutions en Archivo Expanded 900, sin ícono decorativo.
Enlaces: `Por qué somos rápidos` · `Cómo trabajamos` · `Paquetes` · `Preguntas`
CTA: **Agendar diagnóstico**

---

### **01 — Hero**

*Elemento: la placa troquelada, animada.*

> `SOFTWARE FACTORY · SANTA CRUZ DE LA SIERRA`
>
> # Tu idea, funcionando, en tres semanas.
>
> Construimos el producto que tu idea necesita para salir al mercado. Sin ocho meses de espera. Sin quedarte con un sistema que se cae a los cien usuarios.
>
> [ **AGENDAR DIAGNÓSTICO** ]   [ Cómo trabajamos ]
>
> `Precio cerrado antes de empezar · El código es tuyo · Sin permanencia`

**Nota:** concreto y verificable, que es lo que le falta a "Infraestructura para el comercio moderno" — una frase que no significa nada para un fundador no técnico.

---

### **02 — El problema**

Fondo tinta. Tres bloques con numeral en latón.

> ## Tenés el problema. Tenés la plata. No tenés cómo saber si te están vendiendo humo.
>
> `ÍTEM 01` **Nadie te sabe decir cuánto.** Pedís tres cotizaciones por lo mismo y te dan USD 6.000, USD 25.000 y USD 60.000. Ninguno te explica por qué.
>
> `ÍTEM 02` **Los plazos se estiran solos.** Te dijeron tres meses. Vas por el séptimo. Todavía no lo vio un usuario real.
>
> `ÍTEM 03` **Te quedás amarrado.** El sistema funciona, pero solo ellos lo entienden. No podés cambiar de equipo aunque quieras.

---

### **03 — La tesis** *(sección invertida, fondo papel)*

Va en claro para que corte visualmente y se lea como página de manifiesto.

> ## En una fiebre del oro, el negocio es vender palas.
>
> Ahora mismo hay más gente que nunca con una idea de software y capital para intentarlo. Casi ninguna tiene equipo técnico, y esperar a encontrar un socio programador cuesta meses que la idea no tiene.
>
> Nosotros no vamos a la mina. Fabricamos el equipo con el que vos vas a entrar: un producto real, en producción, listo para que tus primeros usuarios lo usen y te digan la verdad.
>
> **Lo que comprás no es código. Es dejar de adivinar.**

---

### **04 — Por qué somos rápidos** ⭐ *sección nueva, la más importante*

Esta sección no existía y es probablemente la que más ventas te va a generar, porque desarma la objeción silenciosa: *"si es tan rápido y tan barato, algo malo tiene."*

> ## Somos rápidos porque ya lo construimos antes.
>
> No es una promesa de herramienta nueva. Es más de diez años escribiendo software a código puro, en todo tipo de sistemas.
>
> Cuando entregamos un ERP en tres semanas, no fue porque una inteligencia artificial lo haya inventado: fue porque **dos personas del equipo ya habían construido ERPs completos antes**, invirtiendo meses en cada uno. Ya sabían qué hacer, qué evitar y en qué orden.
>
> La IA hace que la parte que ya sabíamos hacer tome días en vez de semanas. Esa es toda la magia.
>
> `+10 AÑOS` construyendo software a código puro
> `SISTEMAS COMPLETOS` ERP, gestión comercial, agendamiento, operaciones
> `ARQUITECTURA PORTABLE` sin amarre a ningún proveedor
>
> **Y por eso también sabemos decir que no.** Un generador de código escribe lo que le pidas. Nosotros te decimos cuándo lo que pediste te va a costar caro en seis meses.

---

### **05 — Cómo trabajamos**

Acá la numeración es legítima: es un proceso secuencial real. Presentar como orden de trabajo con ítems.

> ## Siete etapas. Sin sorpresas en el medio.
>
> `E0 · ARRANQUE` — 1 día. Firmamos, definimos un solo interlocutor, abrimos accesos.
> `E1 · BLUEPRINT` — 3 a 5 días. Diseñamos todas las pantallas y cerramos por escrito qué se va a construir. Este documento es tu seguro.
> `E2 · CONSTRUCCIÓN` — 3 a 6 semanas. Tenés un enlace en vivo desde el primer día y una demo todas las semanas.
> `E3 · PRELANZAMIENTO` — 2 a 3 días. Lo probás vos con casos reales. Capacitamos a tu equipo.
> `E4 · LANZAMIENTO` — 1 día. Sale a producción, en tu propia infraestructura, con tu dominio.
> `E5 · DIAGNÓSTICO` — 1 a 2 semanas. Ajustamos lo que aparezca con usuarios reales.
> `E6 · TRASPASO` — Código, documentación, credenciales y un video explicando todo. Es tuyo.

---

### **06 — Paquetes**

Tres columnas. La del medio destacada, con etiqueta `EL QUE ELIGE EL 80%`.

| | SONDA | LANZAMIENTO | EXPEDICIÓN |
|---|---|---|---|
| | Validación técnica | MVP a producción | Producto completo |
| | 5 días | 3 a 6 semanas | 8 a 14 semanas |
| | **USD 1.200** | **desde USD 5.000** | **desde USD 14.000** |

Contenido de cada columna según documento `02`.

Debajo, dos líneas que evitan las preguntas más comunes:

> `El precio final depende del alcance. Te lo cerramos por escrito en la primera semana, antes de que pagues el saldo.`
>
> `Si contratás SONDA y seguís con nosotros, se descuenta completo del proyecto.`

---

### **07 — Lo que no hacemos**

Poco común en una landing, y por eso funciona. Genera más confianza que cualquier lista de tecnologías.

> ## Lo que no hacemos
>
> No hacemos marketing, ni pauta, ni redes. No armamos tu modelo de negocio. No buscamos inversores por vos. No vendemos horas de programador. Y si vemos que tu idea todavía no está lista para construirse, te lo decimos antes de cobrarte.
>
> Hacemos una sola cosa: el producto. Bien, rápido, y tuyo al terminar.

---

### **08 — Prueba**

Hoy no existe y es el bloque más importante después del hero.

> `CASO 001`
> ## ERP completo, en tres semanas.
>
> **El problema:** [una línea]
> **Lo que construimos:** [dos líneas]
> **Tiempo:** 3 semanas de construcción
> **Estado:** en validación con usuarios reales
>
> [captura real del producto]

⚠️ La prueba social es lo único que no se puede diseñar. Prioridad absoluta: conseguir permiso del cliente del ERP para publicarlo con nombre. Si no lo da, publicalo anonimizado por rubro — sigue funcionando.

---

### **09 — Preguntas**

Acordeón. Responden objeciones reales, no dudas inventadas.

- **¿Me quedo con el código?** Sí, íntegro y de tu propiedad, al terminar.
- **¿Quedo amarrado a algún proveedor?** No. La arquitectura está pensada desde el diseño para que puedas migrar de nube o llevarte todo a tu propio servidor.
- **¿Qué pasa si necesito cambios después?** Hay plan de mantenimiento mensual o sprints puntuales. Nunca hay permanencia obligatoria.
- **¿Firman acuerdo de confidencialidad?** Sí, sin problema.
- **¿Y si mi idea es muy grande para tres semanas?** Te lo decimos en el diagnóstico y te proponemos un alcance realista. No prometemos lo que no entra.
- **¿Necesito tener logo y diseño?** Ayuda mucho. Si no lo tenés, trabajamos con un sistema base neutro y después es fácil aplicarle tu marca.
- **¿Usan inteligencia artificial?** Sí, en todo el proceso. Pero la arquitectura y las decisiones las toma un equipo con más de diez años construyendo software. Por eso los plazos son estos y el resultado aguanta.

---

### **10 — Cierre**

> ## La idea que tenés hoy vale exactamente lo mismo que la que tuviste hace un año: nada, hasta que alguien la use.
>
> Una reunión de una hora. Te decimos si es viable, cuánto cuesta y cuánto tarda. Si no nos convence, también te lo decimos.
>
> [ **AGENDAR DIAGNÓSTICO** ]

---

### **11 — Pie**

Wordmark, Santa Cruz de la Sierra, contacto, enlaces legales. Mono, chico, sin adornos.

⚠️ **Sin "S.A."** hasta que la sociedad exista. Ver `06` §7.2.

---

## 9. Reglas de escritura

- **Números concretos antes que adjetivos.** "3 semanas" y "USD 5.000" pesan más que "rápido" y "accesible"
- **Cero jerga técnica en las secciones comerciales.** Nada de serverless, microservicios, edge. Tu ICP no compra eso; en el mejor caso lo ignora, en el peor se siente tonto
- **Voz activa, sujeto claro.** "Te entregamos el código", no "el código es entregado"
- **Segunda persona.** Hablale a una persona, no a un mercado
- **Sin superlativos.** "Premium", "de grado metálico", "de clase mundial" restan credibilidad
- **Los botones dicen lo que pasa.** "Agendar diagnóstico", no "Comenzar gratis" (no es gratis, y arrancar la relación con una mentira chica es mal negocio)

---

## 10. Checklist de calidad

- [ ] Responsive real hasta 360px
- [ ] Foco de teclado visible en todo elemento interactivo, y **no puede ser verde sobre verde**
- [ ] Texto de cuerpo en acento usa `--verde-luz`, nunca `--verde`
- [ ] `prefers-reduced-motion` respetado en la placa del hero
- [ ] La página se entiende con las fuentes aún sin cargar
- [ ] Formulario de contacto conectado y probado — es el único punto de conversión
- [ ] Imagen de compartir (OG) con la placa troquelada
- [ ] Sin "S.A." en ninguna parte
- [ ] Ninguna mención a MenuRes, Treser ni PuntoVenta en el catálogo

---

## 11. Paquete de construcción ✅ entregado

El brief para Claude Code ya está armado, en la carpeta `devbro-landing/`:

```
CLAUDE.md · AGENTS.md
docs/01-brief.md · 02-design-system.md · 03-content.md
     04-engineering.md · 05-roadmap.md · README.md
```

Este documento (`07`) es la fuente conceptual; los de `devbro-landing/docs/` son la versión ejecutable: tokens como CSS listo, tiempos exactos de la animación, copy corrido sin comentarios editoriales, y reglas duras para el agente.

**Decisiones cerradas para el build:**
- Wordmark tipográfico, sin logo (se hará más adelante)
- Formulario → ruta API → tabla en Supabase + aviso por correo, más botón flotante de WhatsApp
- Caso 001 con placeholders visibles hasta que llegue el material
- Sin mención a productos propios
