// Compartido por Contacto.astro (mensaje de error) y BotonWhatsApp.astro.
// Numero real confirmado (docs/06-decisiones.md D10, resuelto en D24).
export const NUMERO_WHATSAPP = '59175020808';

export const ENLACE_WHATSAPP = `https://wa.me/${NUMERO_WHATSAPP}?text=Hola%2C%20quiero%20agendar%20un%20diagn%C3%B3stico`;

// Mensaje distinto para Postulacion.astro (D30, docs/06-decisiones.md): la
// postulacion para equipos sin presupuesto es un canal aparte, no el
// "agendar diagnostico" general -- el texto precargado se lo dice a Kevin
// de entrada, sin que tenga que preguntar por que escriben.
export const ENLACE_WHATSAPP_POSTULACION = `https://wa.me/${NUMERO_WHATSAPP}?text=Hola%2C%20quiero%20postular%20mi%20proyecto%20para%20evaluaci%C3%B3n%20como%20posible%20caso%20de%20%C3%A9xito`;
