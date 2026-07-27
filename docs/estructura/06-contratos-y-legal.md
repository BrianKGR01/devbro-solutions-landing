# 06 · Contratos y marco legal

> ⚠️ **No soy abogado y esto no es asesoría legal.** Es una estructura de contenidos para que un abogado en Bolivia la convierta en un instrumento válido bajo el Código Civil y la normativa local. La inversión en revisar esto una vez con un profesional es baja y te sirve para todos los proyectos futuros.

---

## 1. Por qué sí conviene firmar

Vos mencionaste que si el cliente no quiere firmar, no hay problema. Entiendo la flexibilidad comercial, pero conviene ver qué estás dejando de lado:

**El contrato no protege principalmente del incumplimiento de pago.** Protege de:
- **El alcance infinito.** Sin documento firmado, "lo que se acordó" es lo que cada uno recuerda
- **El reclamo por resultados comerciales.** Un cliente cuyo producto fracasa comercialmente puede intentar responsabilizarte
- **La ambigüedad sobre la propiedad del código**
- **El "seguimos en contacto para siempre"** post-cierre

Además, el contrato **te posiciona**. Un proveedor que llega con contrato listo se ve como empresa; uno que trabaja de palabra se ve como freelancer. Con tu ICP (gente que ya opera empresas), esa señal importa.

**Recomendación práctica:** tené un modelo de 3-4 páginas, legible, sin jerga innecesaria. La resistencia del cliente a firmar casi siempre viene de contratos de 20 páginas incomprensibles. Uno corto y claro se firma sin fricción.

---

## 2. Estructura del Contrato de Prestación de Servicios de Desarrollo

### Cláusula 1 — Partes
Datos completos de ambas.

⚠️ **Mientras DevBro no esté constituida**, el proveedor comparece como persona natural operando bajo el nombre comercial "DevBro Solutions". La redacción exacta está en §7.2. Esto no afecta la validez del contrato.

### Cláusula 2 — Objeto
> *"El PROVEEDOR desarrollará para el CLIENTE el software descrito en el Anexo Funcional que forma parte integral de este contrato."*

**Punto crítico:** el Anexo Funcional debe estar referenciado como parte integral. Si el Anexo se aprueba en la Etapa 1 (después de firmar), el contrato debe prever esa mecánica: *"el Anexo se elaborará en la Etapa de Blueprint y su aprobación por escrito del CLIENTE lo incorpora automáticamente al presente contrato."*

### Cláusula 3 — Alcance y exclusiones
- Referencia al Anexo Funcional como delimitación completa del alcance
- **Lista literal de exclusiones** (copiar de `02` §5)
- Mención explícita de que el software se entrega como MVP destinado a validación de mercado, no como producto terminado de escala

### Cláusula 4 — Plazos y etapas
- Cronograma por etapas con fechas
- **Cláusula de suspensión por demora del cliente:** si el cliente no aprueba una puerta o no entrega insumos dentro de X días hábiles, el cronograma se recalcula automáticamente y el proveedor no es responsable de la demora
- Definición de qué es un día hábil y el huso horario

### Cláusula 5 — Precio y forma de pago
- Monto total, moneda, tipo de cambio si aplica
- Hitos de pago y sus disparadores
- Mora: interés y suspensión de servicios pasados X días
- Quién asume impuestos y retenciones
- **Los costos de infraestructura y servicios de terceros son del cliente**, contratados en sus propias cuentas

### Cláusula 6 — Obligaciones del cliente
Esta cláusula es tu defensa más útil y casi siempre se omite. Debe incluir:
- Designar un interlocutor único con poder de decisión
- Responder consultas y aprobaciones en un plazo máximo de ⚠️ 2 días hábiles
- Entregar línea gráfica, contenidos, logo y textos en la Etapa 0
- Crear y dar acceso a las cuentas de infraestructura
- Participar de las demos semanales
- Realizar las pruebas de la Etapa de Prelanzamiento

Con esta cláusula, un cliente que desaparece dos semanas y luego reclama la fecha no tiene argumento.

### Cláusula 7 — Control de cambios
- Definición de "cambio de alcance": todo lo no contemplado en el Anexo Funcional
- Mecánica de la Regla del Intercambio (ver `05` §4)
- Requisito de aprobación por escrito, incluyendo medios electrónicos
- Declaración de que ningún cambio se ejecuta sin aprobación escrita

### Cláusula 8 — Propiedad intelectual ⭐

La cláusula más importante y la que más se hace mal. Necesita **tres partes**:

**8.1 — Código específico del proyecto**
La propiedad se transfiere íntegramente al CLIENTE al momento del pago total. Antes de eso, se otorga licencia de uso limitada para pruebas.

**8.2 — Componentes preexistentes (DevBro Core)** ⚠️ **crítico**
> *"El PROVEEDOR utiliza componentes, librerías y arquitecturas de su propiedad preexistentes al presente contrato. Sobre estos, el PROVEEDOR otorga al CLIENTE una licencia perpetua, mundial, no exclusiva e irrevocable de uso, modificación y explotación comercial dentro del software entregado. El PROVEEDOR conserva la titularidad de dichos componentes y su derecho a utilizarlos en otros proyectos."*

Sin esta cláusula, técnicamente estarías cediendo tu activo principal en cada proyecto. Con ella, el cliente tiene todos los derechos que necesita (puede usar, modificar, vender su producto, ser adquirido) y vos conservás tu foso.

**8.3 — Conocimiento general**
El proveedor conserva el derecho a usar el conocimiento, técnicas y know-how general adquirido, siempre que no revele información confidencial del cliente.

**8.4 — Portafolio**
> *"El PROVEEDOR podrá mencionar la existencia del proyecto y utilizar capturas de pantalla del mismo con fines de portafolio, salvo notificación escrita en contrario del CLIENTE."*

Con opt-out en vez de opt-in. La mayoría no dice nada y vos construís portafolio.

### Cláusula 9 — Confidencialidad
Mutua, duración de 2-3 años posteriores. Excepciones estándar (información pública, de conocimiento previo, requerida por autoridad).

### Cláusula 10 — Garantía y su límite

Redacción con dos partes:

> *"El PROVEEDOR garantiza que el software funcionará conforme al Anexo Funcional durante el Período de Diagnóstico de [X] semanas posteriores al lanzamiento. Durante este período se corregirán sin costo los defectos, entendiéndose por defecto toda desviación respecto a lo especificado en el Anexo Funcional."*

> *"Quedan excluidos de la garantía: nuevas funcionalidades, cambios de especificación, fallas derivadas de modificaciones realizadas por terceros, fallas de servicios externos, y fallas derivadas de un uso distinto al previsto. La garantía comprende hasta [12] horas de trabajo efectivo; superado ese límite, los trabajos adicionales se cotizan por separado."*

### Cláusula 11 — Limitación de responsabilidad ⭐

También crítica:

> *"La responsabilidad total del PROVEEDOR, por cualquier concepto, no excederá el monto total efectivamente pagado por el CLIENTE bajo el presente contrato."*

> *"El PROVEEDOR no garantiza resultados comerciales, adopción por usuarios, generación de ingresos ni éxito de mercado del producto desarrollado. El CLIENTE reconoce que la viabilidad comercial de su proyecto depende de factores ajenos al desarrollo del software."*

La segunda parte es indispensable en tu modelo de negocio. Estás construyendo apuestas de gente que va a fallar en su mayoría, y algunos van a buscar dónde poner la culpa.

### Cláusula 12 — Terminación
- Por mutuo acuerdo
- Por incumplimiento, con preaviso y plazo de subsanación
- **Qué pasa con lo pagado y lo construido en caso de terminación anticipada.** Sugerencia: el cliente recibe el trabajo hasta ese punto, en el estado en que esté, y no hay devolución de anticipos por trabajo ya ejecutado

### Cláusula 13 — Resolución de controversias
Jurisdicción de Santa Cruz. Considerar conciliación previa o arbitraje según lo que aconseje tu abogado.

---

## 3. Documentos del sistema legal

| Documento | Cuándo | Notas |
|---|---|---|
| **NDA mutuo** | A pedido, pre-discovery | Corto, 1-2 páginas, 2 años |
| **Propuesta comercial** | Post-discovery | No es contrato. Debe decir "no vinculante, válida por 15 días" |
| **Contrato de Prestación de Servicios** | Al cerrar | El principal |
| **Anexo Funcional** | Fin de Etapa 1 | Se aprueba por escrito, se incorpora al contrato |
| **Orden de cambio** | Durante el proyecto | Formato simple, puede ser por el canal digital |
| **Acta de aceptación** | Fin de Prelanzamiento | Dispara el pago final |
| **Acta de cierre y traspaso** | Fin de Diagnóstico | Cierra el contrato, lista lo entregado |
| **Contrato de Guardia** | Si contrata mantenimiento | Mensual, renovación automática, cancelable con 30 días |

Todos estos deberían existir como plantilla. Se hacen una vez y se reutilizan siempre. Hay bases en `09`.

---

## 4. Datos personales

Si el software del cliente maneja datos de personas (casi siempre), conviene definir por escrito:
- Que el **cliente es el responsable** del tratamiento de datos y DevBro actúa como encargado durante el desarrollo
- Que DevBro no conserva copias de datos productivos tras el cierre
- Que la infraestructura está a nombre del cliente (lo cual resuelve buena parte del problema de raíz)

⚠️ Bolivia no tiene ley integral de protección de datos comparable al GDPR, pero si algún cliente atiende usuarios en la UE, México, Brasil o Chile, aplican normativas extranjeras. Vale una consulta puntual con tu abogado si aparece un caso así.

---

## 5. Sobre el pago en participación (equity)

Vos dijiste que están abiertos pero no es la finalidad. Estoy de acuerdo, y agrego criterios para cuando aparezca la propuesta:

**Cuándo considerarlo:**
- El cliente puede pagar **al menos el costo directo** en efectivo, y el equity es sobre la utilidad
- El proyecto está en un vertical que te interesa estratégicamente
- El fundador califica alto en la rúbrica (≥60/75)
- Es una excepción, no un canal

**Cuándo rechazarlo siempre:**
- Es la única forma de pago ofrecida
- Equity sin valuación definida ni instrumento formal
- "Te doy 10% pero tenés que seguir manteniéndolo"

**Regla dura sugerida:** ⚠️ máximo 1 proyecto con componente de equity a la vez, y nunca más del 20% del ingreso del trimestre. El equity no paga sueldos.

---

## 6. Seguro y riesgos

⚠️ Verificar disponibilidad en el mercado boliviano: un seguro de responsabilidad civil profesional (E&O) es común en software factories en otros mercados. Si existe y es accesible, vale la pena a partir de cierto volumen. Mientras tanto, la Cláusula 11 es tu principal protección.

---

## 7. Constitución: el plan interino y la decisión de fondo

### 7.1 La situación

Estás entre constituir en Bolivia o constituir en Estados Unidos, con preferencia por EE.UU. principalmente por el acceso a Stripe. La asesoría legal está pendiente. Y la feria (BC Lat) es en días.

**Conclusión operativa: no dejes que esta decisión te frene.** Es una decisión de meses, no de días, y hay un camino interino que te permite operar y facturar desde mañana.

---

### 7.2 Plan interino — lo que hacés ahora ✅

Operar como **persona natural / unipersonal**, usando **DevBro Solutions como nombre comercial**.

**Cómo se refleja en el contrato (ajuste a la Cláusula 1):**

> *"[Nombre completo], mayor de edad, con documento de identidad Nº [...], domiciliado en Santa Cruz de la Sierra, Bolivia, quien opera comercialmente bajo la denominación **DevBro Solutions**, en adelante EL PROVEEDOR."*

Y en el encabezado del documento, junto al logo, se puede usar libremente "DevBro Solutions". El instrumento se llama **Acuerdo de Prestación de Servicios de Desarrollo de Software**.

**Esto es perfectamente válido y no te limita para:**
- Firmar contratos con validez legal
- Cobrar anticipos por Payoneer, transferencia o cripto
- Emitir el cobro documentado desde Payoneer
- Ceder propiedad intelectual al cliente
- Presentarte en la feria como DevBro Solutions

**Lo único que no podés hacer todavía:**
- Emitir factura fiscal boliviana (limita a clientes corporativos que necesitan descargar el gasto)
- Acceder a Stripe
- Recibir inversión o incorporar socios formalmente

### ⚠️ Corregir antes de la feria: quitá el "S.A."

El pie de la landing actual dice *"© 2024 DevBro Solutions S.A."*. **Si la sociedad no existe, eso no puede estar publicado.** Atribuirse una forma societaria inexistente es un problema evitable y gratuito de arreglar.

Mientras tanto: **"DevBro Solutions"**, sin sufijo. Y actualizá el año.

---

### 7.3 Dos acciones inmediatas, baratas, que no dependen de la decisión grande

1. **Registrar la marca "DevBro Solutions" en SENAPI** (Bolivia). Aplica igual, constituyas donde constituyas. Cuesta poco y protege el nombre que estás por publicitar en una feria. Hacelo esta semana.
2. **Abrir el NIT como persona natural con actividad de servicios informáticos**, si todavía no lo tenés. Te habilita la factura local, que es lo que tu ICP —empresarios establecidos— va a necesitar para descargar el gasto. Es el cuello de botella comercial más concreto del plan interino.

---

### 7.4 La decisión de fondo — qué preguntarle al abogado

⚠️ **Aclaración necesaria: en Estados Unidos no existe la "S.A."** Los vehículos equivalentes son:

| Vehículo | Cuándo conviene | Consideraciones |
|---|---|---|
| **LLC** (Delaware, Wyoming o New Mexico) | Negocio de servicios, dueño único o pocos socios, sin plan inmediato de levantar inversión de fondos | La ruta más común y más barata para no residentes. Habilita Stripe |
| **C-Corporation** (Delaware) | Si vas a levantar inversión de VCs, emitir acciones o incorporar socios con vesting | Más costosa de mantener y con más carga administrativa |

Para una software factory de servicios, **la LLC es casi siempre la respuesta**. La C-Corp tiene sentido si el objetivo real es lanzar startups propias y levantar capital para ellas — pero en ese caso la C-Corp iría en la startup, no en la fábrica.

### Preguntas concretas para llevar a la asesoría

**Sobre la entidad en EE.UU.:**
1. ¿LLC o C-Corp para un negocio de servicios con dueño no residente?
2. ¿Qué obligaciones anuales de reporte tiene una LLC de dueño extranjero, y cuál es la multa por no presentarlas? *(Entiendo que hay formularios anuales obligatorios con sanciones elevadas incluso sin ingresos, pero verificalo — es exactamente el tipo de detalle que arruina a quien constituye por su cuenta)*
3. ¿El ingreso por servicios prestados íntegramente desde Bolivia por personal no residente genera obligación de impuesto federal en EE.UU.?
4. ¿Costo real de mantenimiento anual, todo incluido? (agente registrado, presentaciones, contabilidad)
5. ¿Cuánto tarda desde el registro hasta tener cuenta bancaria y Stripe operativos?

**Sobre Bolivia:**
6. Aunque la entidad esté en EE.UU., ¿qué obligaciones tributarias tenés vos como residente boliviano sobre esos ingresos?
7. ¿Cómo se documenta el ingreso de esos fondos al país?
8. ¿Conviene una estructura mixta: entidad en EE.UU. para clientes internacionales, unipersonal o SRL local para clientes bolivianos que necesitan factura?

La pregunta 8 es la que probablemente resuelva tu caso. Muchos equipos en tu situación terminan ahí.

**Sobre cripto:**
9. Tratamiento fiscal de cobros en stablecoins en Bolivia hoy.

---

### 7.5 Recomendación de secuencia

```
AHORA (esta semana)
  → Quitar "S.A." de todo el material
  → Operar como unipersonal con nombre comercial DevBro Solutions
  → Contrato de prestación de servicios firmado como persona natural
  → Cobros por Payoneer / transferencia / cripto
  → Iniciar registro de marca en SENAPI

FERIA
  → Vender sin bloqueo. Nadie te va a pedir la escritura de constitución
     en una feria de startups

MES 1-2
  → Asesoría legal y contable, con las preguntas de arriba
  → Decidir estructura
  → Constituir

MES 2-3
  → Stripe operativo
  → Migrar Guardia a cobro recurrente automático
```

**Un apunte comercial:** el momento en que la estructura empieza a costarte plata de verdad no es ahora — es cuando quieras vender **Guardia**. El mantenimiento mensual sin cobro automático es un dolor de cabeza administrativo cada 30 días y una tasa de morosidad alta. Si Guardia es el pilar de recurrencia del modelo (y lo es, ver `08`), **Stripe deja de ser una comodidad y pasa a ser infraestructura de negocio**. Ese es tu verdadero plazo.
