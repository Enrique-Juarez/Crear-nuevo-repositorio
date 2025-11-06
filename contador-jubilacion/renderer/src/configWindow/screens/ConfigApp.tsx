import React, { useState, useCallback, useEffect } from 'react';

interface ValidationState {
  valid: boolean;
  message?: string;
}

function parseDateInput(input: string): Date | null {
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

const MIN_FUTURE_MS = 1000 * 60 * 60; // Al menos 1 hora en el futuro

const ConfigApp: React.FC = () => {
  const [rawDate, setRawDate] = useState('2040-06-01');
  const [rawTime, setRawTime] = useState('00:00');
  const [validation, setValidation] = useState<ValidationState>({ valid: true });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Cargar fecha previamente almacenada si existe
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await window.electronAPI.getRetirementDate();
        if (mounted && stored) {
          // Formatear a valores compatibles con inputs type=date y time
          const yyyy = stored.getFullYear();
            // Mes y día con padding
          const mm = String(stored.getMonth() + 1).padStart(2, '0');
          const dd = String(stored.getDate()).padStart(2, '0');
          const hh = String(stored.getHours()).padStart(2, '0');
          const mi = String(stored.getMinutes()).padStart(2, '0');
          setRawDate(`${yyyy}-${mm}-${dd}`);
          setRawTime(`${hh}:${mi}`);
        }
      } finally {
        if (mounted) setLoaded(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const validate = useCallback((dateStr: string, timeStr: string): ValidationState => {
    if (!dateStr) return { valid: false, message: 'Fecha requerida' };
    if (!timeStr) return { valid: false, message: 'Hora requerida' };
    const composed = `${dateStr}T${timeStr}:00`;
    const dt = parseDateInput(composed);
    if (!dt) return { valid: false, message: 'Fecha inválida' };
    if (dt.getTime() - Date.now() < MIN_FUTURE_MS) return { valid: false, message: 'Debe ser futura (≥ 1h)' };
    return { valid: true };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    const val = validate(rawDate, rawTime);
    setValidation(val);
    if (!val.valid) return;
    setSaving(true);
    try {
      const composed = new Date(`${rawDate}T${rawTime}:00`);
      await window.electronAPI.setRetirementDate(composed);
      setSaved(true);
      // Podríamos cerrar ventana tras guardar si queremos.
    } catch (err) {
      setValidation({ valid: false, message: 'Error guardando configuración' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <h1>Configurar fecha de jubilación</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Fecha</label>
          <input type="date" value={rawDate} onChange={(e) => setRawDate(e.target.value)} disabled={!loaded} />
        </div>
        <div className="field">
          <label>Hora</label>
          <input type="time" value={rawTime} onChange={(e) => setRawTime(e.target.value)} disabled={!loaded} />
        </div>
        {validation.message && !validation.valid && (
          <div className="error">{validation.message}</div>
        )}
        {saved && <div className="success">Guardado ✔</div>}
        <button type="submit" disabled={saving}> {saving ? 'Guardando...' : 'Guardar'} </button>
      </form>
      <div className="footer">Se guardará localmente para próximos inicios.</div>
    </div>
  );
};

export default ConfigApp;
