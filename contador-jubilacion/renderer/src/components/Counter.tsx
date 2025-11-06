/**
 * Componente Counter - Muestra el contador de jubilación en tiempo real
 * Este componente será el corazón de la aplicación
 */

import React, { useMemo, useEffect, useState, useCallback } from 'react';
import useCountdown from '@/hooks/useCountdown';
import { RETIREMENT_DATE } from '@/config/retirementConfig';

/**
 * Counter
 * Componente que muestra el tiempo restante en formato legible.
 * Mantiene la lógica compleja fuera usando el hook useCountdown.
 */
const Counter: React.FC = () => {
  // Memorizar la fecha para evitar recrearla en cada render
  const [remoteDate, setRemoteDate] = useState<Date | null>(null);
  // Fallback a constante si no hay persistida
  const targetDate = useMemo(() => remoteDate || RETIREMENT_DATE, [remoteDate]);
  const { days, hours, minutes, seconds, totalMs } = useCountdown(targetDate);

  useEffect(() => {
    let mounted = true;
    window.electronAPI?.getRetirementDate?.().then((d) => {
      if (mounted && d) setRemoteDate(d);
    });
    // Suscripción a cambios posteriores
    window.electronAPI?.onRetirementDateUpdated?.((d) => {
      setRemoteDate(d);
    });
    return () => { mounted = false; };
  }, []);

  const isReached = totalMs === 0;

  // Ajuste dinámico de tamaño de fuente: si días supera 999 reducimos ligeramente
  const fontScale = days > 999 ? 0.85 : 1;

  const openConfig = useCallback(async () => {
    await window.electronAPI.openRetirementConfig();
  }, []);

  return (
    <div className="counter-container" aria-label="Contador de jubilación" role="timer">
      <div className="counter-actions" role="toolbar" aria-label="Acciones">
        <button
          className="icon-btn"
          title="Configurar / cambiar fecha de jubilación"
          aria-label="Configurar fecha de jubilación"
          onClick={openConfig}
        >⚙️</button>
      </div>
      <div className="counter-display">
        <div
          className="counter-text"
          style={{
            willChange: 'contents',
            fontSize: `calc(${14 * fontScale}px)`,
            transition: 'font-size .25s ease'
          }}
        >
          {isReached ? (
            <strong>¡Feliz jubilación! 🎉</strong>
          ) : (
            <>
              <strong className="time-val" data-unit="days">{days}</strong> días,{' '}
              <strong className="time-val" data-unit="hours">{hours}</strong> horas,<br />
              <strong className="time-val" data-unit="minutes">{minutes}</strong> minutos,{' '}
              <strong className="time-val" data-unit="seconds">{seconds}</strong> segundos
            </>
          )}
        </div>
        {!isReached && (
          <div className="counter-text" style={{ fontSize: 11, opacity: 0.7 }}>
            Objetivo: {targetDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Counter;
