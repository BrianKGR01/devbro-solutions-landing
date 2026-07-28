// Compartido por Contacto.astro (mensaje de error) y BotonWhatsApp.astro.
// Numero pendiente de confirmar (docs/06-decisiones.md D10) -- el literal
// {{PENDIENTE: numero}} queda visible en el href a proposito, no se inventa.
export const NUMERO_WHATSAPP_PENDIENTE = '{{PENDIENTE: número}}';

export const ENLACE_WHATSAPP = `https://wa.me/${NUMERO_WHATSAPP_PENDIENTE}?text=Hola%2C%20quiero%20agendar%20un%20diagn%C3%B3stico`;
