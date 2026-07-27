# 05 · Proceso de entrega (delivery)

## Vista general

```
E0  Arranque          1 día      Contrato + anticipo + accesos
E1  Blueprint         3-5 días   Alcance, flujos, diseño, Anexo Funcional
E2  Construcción      3-6 sem    Desarrollo con previews continuos
E3  Prelanzamiento    2-3 días   Pruebas del cliente, carga inicial
E4  Lanzamiento       1 día      Producción, dominio, monitoreo
E5  Diagnóstico       1-2 sem    Ajustes acotados sobre lo entregado
E6  Cierre            1 día      Traspaso de llaves y acta
```

Cada etapa tiene un **entregable** y una **puerta de aprobación**. No se avanza sin cerrar la anterior. Esto no es burocracia: es lo que hace que un proyecto de 4 semanas realmente dure 4 semanas.

---

## E0 · Arranque (1 día)

**Precondición:** contrato firmado y anticipo acreditado. Sin las dos cosas, no arranca.

**Checklist:**
- [ ] Contrato firmado y archivado
- [ ] Anticipo confirmado
- [ ] Canal de comunicación único creado (WhatsApp o Slack — ver §7)
- [ ] Cliente entrega: línea gráfica (o decisión de usar el Sistema Neutro), contenidos, logo
- [ ] Cliente crea sus cuentas de infraestructura y nos da acceso *(clave: la infra es suya desde el día 1, no se migra después)*
- [ ] Calendario del proyecto con fechas de cada puerta de aprobación, enviado por escrito
- [ ] Se designa **un solo** interlocutor con poder de decisión del lado del cliente

⚠️ **El punto del interlocutor único es innegociable.** Dos personas dando feedback contradictorio es la forma más rápida de destruir un cronograma.

---

## E1 · Blueprint (3-5 días)

Es la etapa que más define si el proyecto sale bien. Vos la llamaste "maquetación"; le pongo un nombre más vendible porque es más que maquetar.

**Actividades:**
1. Sesión de trabajo de alcance (2-3 h) — sobre lo conversado en discovery, ahora con detalle
2. Definición del modelo de datos y arquitectura
3. Mapa de flujos: qué pantalla lleva a cuál, qué hace cada acción, qué pasa en los casos de error
4. Diseño de todas las pantallas, aplicando la línea gráfica del cliente
5. Redacción del **Anexo Funcional**

**Entregable: el Anexo Funcional.** Documento que lista:
- Módulos y pantallas, una por una
- Qué hace cada acción
- Roles y qué puede hacer cada uno
- Qué queda explícitamente **fuera** del alcance
- Cronograma con fechas

**Puerta de aprobación:** el cliente firma o aprueba por escrito el Anexo Funcional. **Este documento es el contrato real del proyecto.** Todo control de cambios se mide contra él.

> **Frase para el cliente:** *"Este documento es tu seguro. Todo lo que está acá, lo construimos. Todo lo que no está, lo conversamos y te decimos qué implica. Así ninguno de los dos se lleva sorpresas."*

---

## E2 · Construcción (3-6 semanas)

**Ritmo:**
- Desarrollo continuo con despliegue automático a un **enlace de preview** que el cliente ve desde el día 1
- **Demo semanal** de 30 min, día y hora fijos. No se cancela
- Reporte escrito de avance cada viernes: qué se hizo, qué sigue, qué necesitamos de él, riesgos

**Por qué el preview desde el día 1 es tan importante:**
El cliente no técnico no puede opinar sobre un documento, pero sí sobre una pantalla. Ver el producto crecer:
- Le da tranquilidad (elimina la ansiedad del "¿estarán trabajando?")
- Saca a la luz malentendidos en la semana 1, no en la semana 4
- **Lo hace copropietario emocional del resultado**, lo cual reduce muchísimo la fricción al final

**Qué NO hacer:** dejar que el preview se convierta en un flujo continuo de pedidos. El feedback se recoge, se clasifica y se responde en la demo semanal, no en tiempo real. Ver §4.

---

## E3 · Prelanzamiento (2-3 días)

**Actividades:**
- Cliente prueba el sistema completo con casos reales, con guion de pruebas que le damos
- Carga de datos iniciales (catálogos, usuarios, configuración)
- Sesión de capacitación (1-2 h) con el cliente y su equipo
- Corrección de defectos encontrados
- Revisión de rendimiento y seguridad

**Puerta de aprobación:** el cliente confirma por escrito que el sistema cumple el Anexo Funcional. Acá se factura el saldo.

---

## E4 · Lanzamiento (1 día)

- Despliegue a producción en la infraestructura del cliente
- Configuración de dominio propio y certificados
- Monitoreo, alertas y backups automáticos activados
- Verificación post-despliegue
- Comunicación de "estamos vivos"

**Momento clave:** conviene hacerlo un martes o miércoles, nunca un viernes. Si algo se rompe, querés tener días hábiles por delante.

---

## E5 · Diagnóstico (1-2 semanas)

**Definición estricta:** ver documento `02` §7. Resumen:

✅ **Entra:** defectos, ajustes menores de usabilidad, dudas de uso, rendimiento
❌ **No entra:** funcionalidad nueva, cambios de flujo o de estructura de datos

**Mecánica:**
- Canal abierto para reportes del cliente
- Clasificación de cada reporte en: `Defecto` (se corrige) / `Ajuste menor` (se corrige si entra en la bolsa de horas) / `Nueva funcionalidad` (va al backlog)
- Respuesta en menos de 24 h hábiles a cada reporte
- Bolsa de ⚠️ 12 horas de trabajo efectivo. Cuando se agota, se avisa y se ofrece Sprint de Iteración

**Entregable:** el **Backlog Post-Lanzamiento**, con todo lo clasificado como "nueva funcionalidad", priorizado y con estimación. Es un regalo útil para el cliente y tu mejor propuesta comercial de continuidad.

---

## E6 · Cierre (1 día)

Ritualízalo. Es el momento que determina si el cliente te refiere.

**Entrega del paquete de llaves** (ver `02` §8):
- Transferencia de propiedad del repositorio
- Credenciales de todos los servicios
- Documentación de arquitectura y despliegue
- Backlog Post-Lanzamiento
- Video de traspaso (20-30 min)
- Acta de cierre firmada

**Y en la misma reunión, la conversación de continuidad:**
1. *"Acá tenés todo. Es tuyo, funciona, y cualquier equipo puede continuarlo."*
2. *"Si querés que sigamos ocupándonos de la operación, existe Guardia."*
3. *"Si vas a armar equipo propio, podemos ayudarte a encontrar y filtrar a la persona correcta."*
4. *"Si en 3 meses querés atacar el backlog, hablamos."*
5. **Pedido de referido, explícito:** *"Si te sirvió cómo trabajamos, ¿se te ocurre alguien más en tu rubro con un problema parecido?"*

⚠️ El punto 5 se olvida siempre y es el de mayor retorno. Ponelo en el checklist.

---

## 4. Control de cambios

El mecanismo más importante del documento. Sin esto, cada proyecto de 4 semanas se convierte en uno de 7.

### La Regla del Intercambio

> Cualquier cosa nueva que entre al alcance debe sacar algo de tamaño equivalente, **o** se cotiza como adicional. No hay tercera opción.

### Cómo se ejecuta en la práctica

Cuando el cliente pide algo fuera del anexo:

1. **Nunca digas "no".** Decí *"claro, veamos qué implica."*
2. Estimalo en el momento, aunque sea grueso: *"eso son unos 2 días."*
3. Presentá las tres opciones, en este orden:
   - *"Podemos meterlo sacando [X], que también son 2 días. ¿Cuál te sirve más?"*
   - *"O lo dejamos para después del lanzamiento, en el backlog."*
   - *"O lo agregamos ahora, y son USD [Y] y la fecha se mueve al [fecha]."*
4. Lo que decida, **queda por escrito** en el canal. Aunque sea un mensaje de WhatsApp.

**Por qué funciona:** el cliente no siente que le dijiste que no. Sintió que le diste el control. Y en el 70% de los casos, cuando ve el costo real, elige el backlog.

### Registro de cambios

Una tabla simple, viva durante todo el proyecto:

| Fecha | Solicitud | Impacto | Decisión | Aprobado por |
|---|---|---|---|---|
| | | | Intercambio / Backlog / Adicional | |

Al final del proyecto, mostrá esta tabla. Es la evidencia de que fuiste flexible **y** disciplinado. Y protege completamente frente a un "pero yo pensé que estaba incluido".

---

## 5. Cadencia de comunicación

| Momento | Formato | Duración |
|---|---|---|
| Diario | Nada obligatorio. Canal abierto para bloqueos | — |
| Semanal (día fijo) | Demo en vivo + qué sigue | 30 min |
| Semanal (viernes) | Reporte escrito de avance | — |
| Puertas de etapa | Reunión de aprobación | 45 min |

### Reglas del canal
- **Un solo canal.** Nada de WhatsApp + email + llamadas + Instagram. Todo lo que no esté en el canal, no existe
- Horario de respuesta declarado (ej. lunes a viernes, 9-18). Se dice al inicio, no cuando el cliente escribe un domingo
- Las decisiones se confirman por escrito, siempre. *"Confirmo lo que hablamos: hacemos A y dejamos B para el backlog. ¿Correcto?"*

---

## 6. Estándares técnicos internos

No negociables, porque son lo que respalda la promesa de "aguanta tus primeros mil usuarios":

- Repositorio con historial limpio desde el commit 1
- Ambientes separados: desarrollo / preview / producción
- Despliegue automatizado
- Variables de entorno y secretos fuera del código
- Autenticación y autorización desde el inicio, no parchada después
- Backups automáticos configurados antes del lanzamiento
- Monitoreo de errores activo
- README que permita a un desarrollador externo levantar el proyecto en menos de 30 minutos
- Modelo de datos documentado

**Regla de cierre de proyecto:** medio día para extraer lo genérico y devolverlo al **DevBro Core**. Si esto no se hace, la ventaja de velocidad se estanca.

---

## 7. Anti-patrones a evitar

| Anti-patrón | Consecuencia | Antídoto |
|---|---|---|
| Empezar a construir sin Anexo Funcional aprobado | Alcance infinito | Puerta de E1 |
| Mostrar el producto recién al final | Rechazo total en semana 4 | Preview desde día 1 |
| Aceptar cambios "chiquitos" sin registrar | Muerte por mil cortes | Regla del Intercambio |
| Múltiples interlocutores del cliente | Feedback contradictorio | Interlocutor único en E0 |
| Infraestructura a nombre de DevBro | Cliente amarrado, handoff imposible, riesgo legal | Cuentas del cliente desde E0 |
| No documentar decisiones técnicas | Handoff pobre, mala reputación futura | Doc de arquitectura en E6 |
| Diagnóstico sin límite de horas | Margen destruido | Bolsa de 12 h declarada |
| No pedir referido al cierre | Pipeline vacío | Checklist de E6 |
