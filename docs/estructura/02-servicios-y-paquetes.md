# 02 · Servicios y paquetes

## 1. Arquitectura del catálogo

Tres paquetes escalonados + add-ons. La razón de tener tres y no uno:

- El de abajo **captura al indeciso** y sirve de puerta de entrada barata.
- El del medio es **donde quieres vender** (es el que corresponde a lo que ya hacen).
- El de arriba **hace que el del medio parezca razonable** y captura al cliente que sí tiene presupuesto.

Los nombres siguen la lógica de "expedición": estás equipando a alguien que va a explorar.

---

## 2. Los paquetes

### 🔹 SONDA — Validación técnica
**Para:** el que no está seguro de invertir todavía, o el que tiene una idea que huele a compleja.

| | |
|---|---|
| **Duración** | 5 días hábiles, contados desde el inicio |
| **Precio** | USD 900 – 1.500 (ver `03`) |
| **Pago** | 100% por adelantado |

### ⚠️ Condición innegociable: disponibilidad del cliente

SONDA **no se puede ejecutar sin tiempo directo del cliente.** No es un servicio que hagamos por nuestra cuenta y entreguemos: es trabajo conjunto. Esto se dice antes de vender, no después.

- Los 5 días hábiles corren desde el arranque, no desde que el cliente se desocupa
- Requiere ⚠️ **mínimo 6 horas de trabajo conjunto** distribuidas en esos 5 días
- El formato es flexible: una jornada completa, bloques de 2-3 horas, presencial o virtual
- Si el cliente no puede comprometer ese tiempo, **SONDA no arranca**. Se reagenda para cuando pueda

**Cómo se lo decís al vender:**
> *"Esto lo hacemos con vos, no para vos. Necesito unas seis horas tuyas repartidas en la semana. Si no las tenés ahora, lo agendamos para cuando las tengas — pero sin eso el resultado no sirve, porque el documento sale de tu cabeza, no de la mía."*

**Entregables:**
- Sesión de descubrimiento profunda (2-3 h)
- Documento de alcance funcional: qué es el MVP y qué no lo es, priorizado
- Diagrama de arquitectura propuesta y stack recomendado
- Mapa de pantallas (flujo, no diseño visual)
- Estimación firme de tiempo y costo para construirlo
- Veredicto honesto de viabilidad técnica

**Regla comercial clave:** el 100% del monto de SONDA se **descuenta** del paquete de construcción si el cliente avanza dentro de los 30 días. Esto convierte SONDA de "un gasto" a "un anticipo", y sube muchísimo la tasa de conversión.

**Por qué existe:** te hace cobrar por el trabajo de cotizar (que hoy probablemente regalas), filtra clientes serios, y te da un producto de entrada de bajo riesgo para el cliente desconfiado.

---

### 🔸 LANZAMIENTO — MVP a producción ⭐ *paquete principal*
**Para:** el ICP puro. Experto de dominio con capital que quiere salir al mercado ya.

| | |
|---|---|
| **Duración** | **3 – 6 semanas** de construcción + 2 semanas de diagnóstico |
| **Precio** | USD 5.000 – 9.500 según alcance (ver `03`) |
| **Pago** | 50-75% anticipo · resto contra entrega en inicio de diagnóstico |

**Entregables:**
- Todo lo de SONDA (si no lo compró antes, va incluido como Etapa 1)
- Diseño completo de producto: todas las pantallas, estados, flujos
- Aplicación web en producción, responsive
- Autenticación, roles y permisos
- Panel de administración
- Base de datos y arquitectura escalable documentada
- Despliegue en infraestructura del cliente (sus cuentas, sus llaves)
- Repositorio con código fuente completo, propiedad del cliente
- Documentación técnica de handoff
- **2 semanas de diagnóstico post-lanzamiento** (ver definición estricta abajo)

**Límite duro de alcance:** cada proyecto se cierra con un **Anexo Funcional** que lista módulos y pantallas. Lo que no está en ese anexo, no está en el proyecto. Sin excepciones sin cotización.

---

### 🔶 EXPEDICIÓN — Producto completo
**Para:** el que ya validó (con vos o solo) y necesita la siguiente capa. O el proyecto que desde el día 1 es más grande que un MVP.

| | |
|---|---|
| **Duración** | **8 – 14 semanas** |
| **Precio** | USD 14.000 – 30.000 |
| **Pago** | 40% inicio · 30% mitad · 30% entrega |

**Entregables adicionales sobre LANZAMIENTO:**
- Integraciones de terceros (pagos, WhatsApp Business API, facturación electrónica, ERPs)
- Aplicación móvil o PWA avanzada
- Módulos de reportería y analítica
- Multi-tenancy / multi-sucursal
- Migración de datos desde sistemas existentes
- 4 semanas de diagnóstico
- Sesión de traspaso técnico con el equipo que reciba el proyecto

---

## 3. Tabla comparativa (para la landing)

| | **SONDA** | **LANZAMIENTO** | **EXPEDICIÓN** |
|---|---|---|---|
| Descubrimiento y alcance | ✅ | ✅ | ✅ |
| Arquitectura documentada | ✅ | ✅ | ✅ |
| Diseño de producto | Flujo | Completo | Completo |
| Desarrollo | — | ✅ | ✅ |
| Despliegue a producción | — | ✅ | ✅ |
| Integraciones externas | — | 1 básica | Múltiples |
| App móvil | — | — | ✅ |
| Diagnóstico post-lanzamiento | — | 2 semanas | 4 semanas |
| Código fuente y propiedad | — | ✅ | ✅ |
| Arquitectura portable (sin amarre a proveedor) | ✅ | ✅ | ✅ |
| Duración | 1 semana | 3-6 semanas | 8-14 semanas |

---

## 4. Add-ons (venta adicional, margen alto)

Estos son importantes: son la diferencia entre un negocio de proyectos y un negocio con ingresos recurrentes.

| Add-on | Descripción | ⚠️ Precio sugerido |
|---|---|---|
| **Guardia** | Mantenimiento mensual: monitoreo, backups, parches de seguridad, hasta N horas de ajustes menores | USD 250 – 600 / mes |
| **Identidad base** | Logo, paleta, tipografía y aplicación mínima. Solo si el cliente no tiene línea gráfica | USD 400 – 800 (one-time) |
| **Sprint de iteración** | 1 semana de desarrollo enfocada, post-diagnóstico, para atender lo que dijeron los usuarios reales | USD 1.200 – 2.000 |
| **Traspaso extendido** | Onboarding técnico del equipo interno del cliente, 3 sesiones + documentación ampliada | USD 800 – 1.500 |
| **Enlace de talento** | Referencia y filtro técnico de candidatos para su equipo (CTO, dev senior) | **Fee fijo al cliente.** Ver detalle abajo |

### Enlace de talento — modelo definido

✅ **Decidido:** se cobra **fee fijo al CLIENTE**, nunca al candidato, y nunca como porcentaje del salario anual.

**Por qué fee fijo y no porcentaje:**
- El porcentaje sobre salario anual es el modelo del *headhunting* clásico y trae expectativas de ese negocio: garantía de permanencia, reposición si el candidato renuncia, exclusividad. Vos no querés estar en ese negocio
- El fee fijo es simple de explicar, simple de cobrar, y deja clarísimo qué estás vendiendo: **una hora de criterio técnico**, no una contratación garantizada

**Estructura de tres niveles:**

| Nivel | Qué incluye | ⚠️ Precio |
|---|---|---|
| **Referencia** | Presentamos 2-3 perfiles de nuestra red que encajan con lo que necesita. Sin evaluación | USD 300 |
| **Filtro técnico** | Lo anterior + entrevista técnica a los candidatos que el cliente elija (hasta 3) + informe escrito de cada uno | USD 700 |
| **Acompañamiento** | Lo anterior + participación en la definición del perfil, revisión de la oferta técnica, y 2 sesiones de onboarding con el elegido | USD 1.500 |

**Qué NO se promete nunca:** que el candidato acepte, que se quede, ni que funcione. Se vende criterio, no resultado. Debe estar por escrito.

**Otras vías de monetización de la red** (a explorar más adelante, no ahora):
- **Fee compartido con la comunidad:** si un contacto tuyo aporta el candidato, se le comparte parte del fee. Convierte a la comunidad en una red activa de referidos en vez de un favor unilateral
- **Referidos cruzados:** acuerdo con estudios de diseño, contadores o abogados para derivarse clientes mutuamente con fee de referencia
- **Bolsa de trabajo curada:** a mediano plazo, si el volumen lo justifica, publicar posiciones técnicas filtradas por DevBro. Es un activo de red, no un servicio

**Beneficio estratégico:** este add-on te posiciona como el nodo del ecosistema técnico local, no como un proveedor más. Y te da un motivo legítimo de contacto con el cliente después del cierre.

---

## 5. Exclusiones explícitas (van en el contrato y en la landing)

Lista literal, para que no haya ambigüedad:

- ❌ Marketing digital, pauta, SEO, redes sociales, contenido
- ❌ Estrategia de negocio, modelo de monetización, búsqueda de inversión
- ❌ Redacción de textos comerciales del producto (el cliente entrega los contenidos)
- ❌ Carga de datos iniciales / catálogos (salvo add-on de migración)
- ❌ Costos de infraestructura, dominios, licencias de terceros (van a cuenta del cliente, en sus propias cuentas)
- ❌ Trámites legales, registro de marca, constitución de empresa
- ❌ Soporte a usuarios finales del cliente
- ❌ Capacitación a los usuarios finales del cliente (sí capacitamos al cliente y a su equipo, hasta 2 sesiones)

---

## 6. La línea gráfica: cómo manejarlo

Vos lo planteaste bien, solo hay que formalizarlo en tres escenarios:

| Escenario | Qué hacemos |
|---|---|
| **Cliente tiene línea gráfica completa** (logo, colores, tipografía) | La aplicamos al producto. Incluido |
| **Cliente no tiene nada** | Ofrecemos: (a) add-on "Identidad base", o (b) construimos con el **Sistema Neutro DevBro** — un tema base sobrio, profesional, monocromático + un acento. El producto queda listo para retematizar después |
| **Cliente pide "hagámoslo blanco y negro nomás"** | Eso *es* una decisión de línea gráfica. Se documenta como tal en el anexo y no se rehace después sin costo |

**Cláusula clave para el contrato:** el producto se construye con un sistema de design tokens. Cambios posteriores de color, tipografía y espaciado son triviales. Cambios de *estructura, layout o flujo* no lo son y se cotizan aparte. Esta distinción hay que explicársela al cliente en la reunión de diseño, no cuando ya reclama.

---

## 7. Definición estricta del "diagnóstico"

Esta es la parte del modelo que más plata te puede costar si no está acotada. Vos dijiste "1 o 2 semanas de diagnóstico". Hay que definir qué entra:

### ✅ Entra en el diagnóstico
- Corrección de defectos: algo del Anexo Funcional que no funciona como fue especificado
- Ajustes de usabilidad menores: textos, ubicación de un botón, orden de columnas, validaciones
- Ajustes de rendimiento sobre lo entregado
- Resolución de dudas de uso del cliente y su equipo

### ❌ NO entra en el diagnóstico
- Funcionalidad nueva, aunque parezca chica
- Cambios de flujo o de estructura de datos
- "Ahora que lo veo, mejor sería que…"
- Integraciones no contempladas
- Cambios pedidos por usuarios finales que impliquen desarrollo

Todo lo del segundo grupo se registra en un **Backlog Post-Lanzamiento** que se entrega al cierre. Es un documento de valor para el cliente *y* es tu propuesta comercial para el siguiente sprint. No lo pelees: agradécelo y cotízalo.

✅ **Decidido — bolsa de horas:** el diagnóstico incluye hasta **12 horas de trabajo efectivo** en el paquete LANZAMIENTO, y **24 horas** en EXPEDICIÓN. Agotada la bolsa, se avisa al cliente y se ofrece el Sprint de Iteración.

**Cómo se comunica sin sonar mezquino:**
> *"El diagnóstico incluye doce horas de trabajo nuestro. En la práctica casi nunca se usan todas, porque lo que aparece suelen ser detalles. Te aviso cuando lleguemos a las diez para que no haya sorpresas."*

Anunciarlo por adelantado convierte un límite en transparencia. Descubrirlo el cliente cuando ya se agotó lo convierte en un conflicto. Es la misma regla, con resultados opuestos.

**Registro obligatorio:** durante el diagnóstico se lleva el conteo de horas consumidas y se reporta al cliente en cada aviso semanal. Sin registro, la bolsa no existe.

---

## 8. Lo que se entrega en el cierre (el "paquete de llaves")

Esto merece ser un ritual, no un email suelto. Es tu mejor herramienta de reputación y de referidos.

1. Repositorio con acceso de propietario transferido al cliente
2. Credenciales de todos los servicios, en sus propias cuentas
3. Documento de arquitectura: modelo de datos, decisiones técnicas y por qué
4. Guía de despliegue: cómo levantar el proyecto de cero
5. Backlog Post-Lanzamiento priorizado
6. Video de traspaso (20-30 min) recorriendo el sistema y el código
7. Acta de cierre firmada

Un cliente que recibe esto no solo no se queja — te refiere. Y si algún día contrata a otro equipo, ese equipo abre el repo y ve trabajo profesional. Eso también es marketing.
