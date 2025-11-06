/**
 * retirementConfig.ts
 * Configuración centralizada de la fecha de jubilación.
 * En el futuro se puede hacer dinámica (leer desde un archivo de usuario o base de datos).
 */

// EJEMPLO: Ajusta esta fecha a la fecha real de jubilación del usuario.
// Formato: Año, Mes (0-based), Día, Hora, Minuto, Segundo
// Nota: Los meses en Date comienzan en 0 (0 = Enero, 11 = Diciembre).
export const RETIREMENT_DATE = new Date(2040, 5, 1, 0, 0, 0); // 1 Junio 2040 00:00:00

if (RETIREMENT_DATE.getTime() <= Date.now()) {
  // Aviso temprano si la fecha configurada ya pasó (buena práctica para debugging)
  // eslint-disable-next-line no-console
  console.warn('[retirementConfig] La fecha de jubilación configurada ya ha pasado. Actualízala.');
}

export default RETIREMENT_DATE;
