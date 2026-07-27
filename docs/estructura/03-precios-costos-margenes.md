# 03 · Precios, costos y márgenes

> ⚠️ Los **costos internos** de este documento siguen siendo hipótesis: yo no conozco tus sueldos reales. Los **precios de venta** ya están decididos. El marco de cálculo sirve para que verifiques que esos precios te dejan el margen que necesitás.

---

## 1. Principio rector: no cobres por hora

Tu ventaja es la velocidad, y viene de una década de experiencia más un core reutilizable. Si cobras por hora, **cada año de experiencia acumulada te hace ganar menos**. Es el peor incentivo posible para tu modelo.

Cobra por **alcance cerrado**. Precio fijo por paquete, definido antes de empezar, delimitado por el Anexo Funcional.

**Cómo se lo explicas al cliente:**
> *"No te cobramos por el tiempo que nos toma. Te cobramos por el producto que recibís. Si somos rápidos es porque ya construimos esto antes — y el beneficiado sos vos, que salís antes al mercado."*

---

## 2. Precios de venta ✅ decididos

| Paquete | Rango | **Precio ancla (el que se publica)** |
|---|---|---|
| **SONDA** | USD 900 – 1.500 | **USD 1.200** |
| **LANZAMIENTO** | USD 5.000 – 9.500 | **Desde USD 5.000** |
| **EXPEDICIÓN** | USD 14.000 – 30.000 | **Desde USD 14.000** |

### Por qué 9.500 y no 10.000 (mi recomendación sobre tu duda)

Vos planteaste el techo de LANZAMIENTO en 10.000 o 9.500 y pediste sugerencia. **Recomiendo 9.500**, por tres razones:

1. **La barrera de los cinco dígitos es real.** USD 9.500 y USD 10.000 son casi el mismo dinero, pero se procesan distinto en la cabeza del cliente. Uno está "en los nueve mil", el otro "en los diez mil". Cruzar esa línea suele disparar una consulta al socio o una segunda cotización.
2. **Protege la escalera de paquetes.** Si LANZAMIENTO llega a 10.000, el salto a EXPEDICIÓN (14.000) se ve chico y el cliente pregunta por qué no le hacés "el completo" por un poco más. Con 9.500 arriba y 14.000 abajo, hay una separación clara que justifica que sean productos distintos.
3. **Deja el rango 10.000–13.999 como zona de negociación** para proyectos que no entran en LANZAMIENTO pero al cliente le asusta EXPEDICIÓN. Es un espacio útil, no un hueco.

### Cómo se publica en la landing

> **LANZAMIENTO** — desde USD 5.000 · 3 a 6 semanas
> *El precio final depende del alcance. Te lo cerramos por escrito en la primera semana, antes de que pagues el saldo.*

Publicar el "desde" filtra al que no tiene capital —tu anti-cliente— y te ahorra reuniones. Quien esconde el precio parece que lo improvisa.

---

## 3. La escalera de LANZAMIENTO (uso interno)

No cotices "a ojo". Usá esta escala como referencia y ajustá contra el alcance real.

| Semanas de construcción | Equipo típico | Precio | ⚠️ Costo directo est. | ⚠️ Margen bruto |
|---|---|---|---|---|
| **3 semanas** | 1 senior tiempo completo + diseño puntual | **USD 5.000** | ~1.780 | **64%** |
| **4 semanas** | 1 senior + apoyo parcial | **USD 6.900** | ~2.660 | **61%** |
| **5 semanas** | 1 senior + semi medio tiempo | **USD 8.900** | ~3.550 | **60%** |
| **6 semanas** | 1 senior + semi medio tiempo | **USD 9.500** | ~4.440 | **53%** ⚠️ |

### ⚠️ Advertencia importante sobre la sexta semana

Mirá la última fila. **El margen se cae 11 puntos entre la semana 5 y la 6**, porque el precio tiene techo pero el costo sigue creciendo linealmente.

Esto no significa que 3-6 semanas esté mal. Significa que hay que aplicar una regla:

> **La sexta semana es para profundidad de alcance, no para agrandar el equipo.**
>
> Si un proyecto necesita **más de una persona a tiempo completo**, o **más de 6 semanas**, ya no es un LANZAMIENTO. Se cotiza como EXPEDICIÓN, que tiene precio y estructura de pago acordes.

Esa frase es la que protege tu margen. Sin ella, LANZAMIENTO se convierte en el paquete donde metés proyectos grandes a precio de proyecto chico, que es exactamente cómo quiebran las software factories.

**Señales de que un proyecto está mal clasificado:**
- Necesita más de 3 integraciones externas
- Necesita app móvil nativa
- Tiene más de 4 roles de usuario distintos
- Requiere migración de datos desde un sistema existente
- El cliente pide multi-sucursal o multi-empresa desde el día 1

Cualquiera de estas → **EXPEDICIÓN**, sin discusión.

---

## 4. Estructura de costos

### Costo/hora interno

```
Costo/hora = (Salario mensual + cargas + overhead asignado) ÷ horas productivas reales
```

**Punto crítico:** las horas productivas reales NO son 160/mes. Son **110-130**, una vez descontadas reuniones, ventas, administración y aprendizaje. Calcular con 160 hace que tu margen real sea ~25% menor de lo que creés.

⚠️ **Valores de referencia usados en este documento** (reemplazalos con los tuyos):

| Rol | Costo mensual total | Horas productivas | Costo/hora |
|---|---|---|---|
| Dev senior | USD 1.500 | 120 | USD 12,5 |
| Dev semi | USD 900 | 120 | USD 7,5 |
| Diseño/producto | USD 800 | 120 | USD 6,7 |

### Costos directos por proyecto

| Concepto | ⚠️ Estimado |
|---|---|
| Equipo | Ver escalera arriba |
| Herramientas de IA (prorrateo) | USD 60 – 250 |
| Infraestructura de desarrollo y previews | USD 20 – 60 |
| **Comisiones del medio de pago** | **3% – 6% del precio** (ver §6) |

⚠️ La última línea se olvida siempre y en un proyecto de USD 9.500 puede significar **USD 500**. Va al costo directo, no al overhead.

### Costos indirectos (overhead)

Se reparten entre los proyectos del mes: suscripciones fijas, contabilidad, legal, marketing, y **reserva de capacidad ociosa** (ver §5).

---

## 5. Las tres cosas que van a matar tu margen

### 5.1 El alcance que se estira
Defensa: Anexo Funcional (`06`) y Regla del Intercambio (`05` §4). No es un problema de contrato, es un problema de **conversación**. Hay que practicar decir *"excelente idea, va al backlog post-lanzamiento"* sin que suene a rechazo.

### 5.2 La capacidad ociosa entre proyectos
Proyectos de 3-6 semanas significan que necesitás cerrar **8 a 12 clientes al año** solo para mantener al equipo ocupado. Si tardás 3 semanas en conseguir el siguiente, tu utilización real cae a 60% y el margen se evapora.

**Defensa:** el pipeline comercial corre **en paralelo** al delivery, nunca después. Meta: al terminar un proyecto, tener el siguiente firmado. SONDA existe en parte para esto — es corto, llena huecos y alimenta el pipeline.

⚠️ **Meta de utilización: 70-75%.** No apuntes a 100%: sin holgura no absorbés un imprevisto ni mejorás el Core.

### 5.3 El "favorcito" post-cierre
El cliente simpático que pide "una cosita chica" tres meses después. Cada una cuesta medio día.

**Defensa:** el add-on **Guardia**. Convierte el favor en ingreso recurrente:
> *"Claro, eso lo cubre Guardia. Son USD 350 al mes e incluye además backups y monitoreo."*

---

## 6. Condiciones y medios de pago ✅

### Estructura de pagos

| Paquete | Estándar | Mínimo negociable |
|---|---|---|
| SONDA | 100% al inicio | No negociable |
| LANZAMIENTO | 70% inicio / 30% al iniciar diagnóstico | 50% / 50% |
| EXPEDICIÓN | 40% / 30% / 30% por hitos | 40% / 30% / 30% |

### Reglas duras

1. **No se escribe una línea de código sin el anticipo acreditado.** Sin excepción, sin importar cuán confiable parezca el cliente.
2. **El código se transfiere con el pago final.** Antes, el cliente tiene acceso de lectura y previews; la propiedad se transfiere al saldar (ver `06` §8).
3. **Mora:** pasados 10 días del vencimiento, el proyecto se suspende y el cronograma se recalcula. Va en el contrato y se menciona en voz alta al cerrar la venta.
4. **Todo se cotiza y se referencia en USD**, sin importar en qué se cobre.

### Medios de cobro habilitados

| Medio | Uso | ⚠️ Costo aprox. | Notas |
|---|---|---|---|
| **Payoneer** | Clientes del exterior y locales | ~1% (transferencia bancaria) a ~3% (tarjeta) + retiro | **Medio preferido.** Permite emitir factura de cobro por el servicio, lo que resuelve el respaldo documental mientras no haya empresa constituida |
| **PayPal** | Clientes que solo tienen PayPal | **4,5% – 7% efectivo** entre comisión y spread de cambio | El más caro. Usarlo solo como último recurso |
| **Cripto (stablecoins)** | Clientes cómodos con cripto | Comisión de red, muy baja | Ver reglas abajo |
| **Transferencia local / efectivo** | Clientes en Bolivia | Bajo | Referenciar el tipo de cambio USD en el contrato |
| **Stripe** | 🔜 Pendiente de entidad en EE.UU. | ~2,9% + 0,30 | Es el que habilita cobro recurrente automático para **Guardia**. Ver `06` §7 |

### Reglas para cripto

- ✅ **Solo stablecoins** (USDT / USDC). Nunca BTC, ETH ni nada volátil: entre que cotizás y que te pagan podés perder 8%
- ✅ Red y billetera especificadas por escrito antes de emitir el cobro
- ✅ **El cliente asume la comisión de red.** El monto que llega debe ser el monto facturado
- ✅ Se espera confirmación en cadena antes de dar por acreditado el pago
- ⚠️ Consultá con tu contador el tratamiento fiscal en Bolivia. El marco cambió en los últimos años y no quiero que operes sobre un supuesto mío

### Cómo tratar las comisiones ✅ recomendación

**No absorbas las comisiones en silencio.** Poné esto en la propuesta y en el contrato:

> *"Los precios están expresados en dólares estadounidenses y son netos. Las comisiones del medio de pago elegido por el cliente corren por cuenta del cliente. Si el cliente prefiere que las asuma DevBro, se ajusta el precio en consecuencia."*

Esto hace dos cosas: te protege del 6% de PayPal, y **empuja al cliente hacia los medios baratos** sin que tengas que discutirlo.

---

## 7. Métricas financieras a seguir

Planilla desde el mes 1. Revisión el primer lunes de cada mes.

| Métrica | Fórmula | ⚠️ Meta |
|---|---|---|
| Margen bruto por proyecto | (Precio − costo directo) / Precio | > 60% |
| Utilización del equipo | Horas facturables / horas disponibles | 70 – 75% |
| **Desviación de alcance** | Horas reales / horas estimadas | **< 1,20** |
| Conversión SONDA → LANZAMIENTO | Conversiones / SONDAs vendidas | > 60% |
| Tasa de cierre de propuestas | Cerradas / enviadas | > 30% |
| Ticket promedio | Ingreso total / proyectos | Creciente |
| Ingreso recurrente (Guardia) | Suma de contratos mensuales | > 20% del ingreso al mes 12 |
| Costo de cobro | Comisiones / ingreso bruto | < 2,5% |

La más importante en el corto plazo es **desviación de alcance**. Si tus proyectos toman consistentemente 1,4× lo estimado, el problema no es el precio: es la estimación o el control de cambios.

---

## 8. Cuándo subir precios

Los precios de este documento son de **entrada al mercado**, apoyados en un solo caso de éxito público. Revisalos cuando se cumpla cualquiera de estas condiciones:

- Tenés **3 casos de éxito publicables** → +15%
- Tu tasa de cierre supera el **50%** → estás dejando plata en la mesa, +10%
- Tenés **agenda comprometida a más de 4 semanas** → +15%, o empezás a elegir proyectos
- Tu desviación de alcance baja consistentemente de 1,10 → tu estimación es confiable, podés cotizar más agresivo

⚠️ La señal de que estás **caro** no es que te digan que sí con dudas: es que te digan que no **antes de la reunión de descubrimiento**. Si perdés clientes después de haberlos conocido, casi nunca es precio — es que no comunicaste el valor.
