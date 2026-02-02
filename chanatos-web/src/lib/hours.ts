/**
 * Horario por defecto (sin APIs externas).
 * Martes a domingo: 18:00 a 23:00 (hora Colombia).
 * Solo cerrado los lunes.
 */

const TIMEZONE_COLOMBIA = "America/Bogota";
const CLOSED_DAY = 1; // Lunes (0 = domingo, 1 = lunes, ...)
const OPEN_HOUR_START = 18; // 18:00
const OPEN_HOUR_END = 23; // 23:00 (exclusive)

/** Obtiene día (0–6) y hora en zona Colombia a partir de una fecha. */
function getColombiaDayAndTime(date: Date): {
  day: number;
  timeInHours: number;
} {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE_COLOMBIA,
    weekday: "short",
  }).format(date);
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const hour = parseInt(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE_COLOMBIA,
      hour: "2-digit",
      hour12: false,
    }).format(date),
    10,
  );
  const minute = parseInt(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE_COLOMBIA,
      minute: "2-digit",
    }).format(date),
    10,
  );
  return {
    day: dayMap[weekday] ?? 0,
    timeInHours: hour + minute / 60,
  };
}

/**
 * Indica si el local está abierto en la fecha/hora dada (hora Colombia).
 */
export function isOpenNow(date: Date): boolean {
  const { day, timeInHours } = getColombiaDayAndTime(date);

  if (day === CLOSED_DAY) return false;
  return timeInHours >= OPEN_HOUR_START && timeInHours < OPEN_HOUR_END;
}
