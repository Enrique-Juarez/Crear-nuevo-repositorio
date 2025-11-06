/**
 * useCountdown
 * Hook personalizado para calcular el tiempo restante hasta una fecha objetivo.
 * - Encapsula la lógica de diferencias de tiempo para mantener el componente limpio.
 * - Retorna un objeto con días, horas, minutos y segundos.
 */
import { useEffect, useState } from 'react';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

/**
 * Calcula las partes del tiempo restante dado un timestamp objetivo.
 * Separa la lógica en una función pura (fácil de testear en el futuro).
 */
function calculateCountdown(targetDate: Date): CountdownParts {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const diff = Math.max(target - now, 0); // Evita negativos

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, totalMs: diff };
}

/**
 * Hook principal.
 * @param targetDate Fecha objetivo futura
 * @param intervalMs Frecuencia de actualización (por defecto 1000ms)
 */
export function useCountdown(targetDate: Date, intervalMs: number = 1000): CountdownParts {
  const [countdown, setCountdown] = useState<CountdownParts>(() => calculateCountdown(targetDate));

  useEffect(() => {
    // Validación temprana: si la fecha no es futura, evitamos intervalos innecesarios
    if (targetDate.getTime() <= Date.now()) {
      setCountdown(calculateCountdown(targetDate));
      return;
    }

    const id = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, intervalMs);

    return () => clearInterval(id);
  }, [targetDate, intervalMs]);

  return countdown;
}

export default useCountdown;
