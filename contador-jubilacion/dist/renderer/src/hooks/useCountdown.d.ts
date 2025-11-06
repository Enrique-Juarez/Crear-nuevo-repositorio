export interface CountdownParts {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
}
/**
 * Hook principal.
 * @param targetDate Fecha objetivo futura
 * @param intervalMs Frecuencia de actualización (por defecto 1000ms)
 */
export declare function useCountdown(targetDate: Date, intervalMs?: number): CountdownParts;
export default useCountdown;
