/**
 * Tipos globales para la aplicación Contador de Jubilación
 */

// Información del contador de tiempo
export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Configuración de fecha objetivo
export interface RetirementConfig {
  targetDate: Date;
  isValid: boolean;
}

// Configuración de ventana
export interface WindowConfig {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

// Eventos IPC entre Main y Renderer
export interface ElectronAPI {
  // Eventos del contador
  onWindowReposition: (callback: () => void) => void;
  requestWindowReposition: () => void;
  
  // Configuración
  getRetirementDate: () => Promise<Date>;
  setRetirementDate: (date: Date) => Promise<void>;
  openRetirementConfig: () => Promise<boolean>;
  onRetirementDateUpdated: (callback: (date: Date) => void) => void;
  enableAutoStart: () => Promise<boolean>;
  getAutoStartStatus: () => Promise<boolean>;
}

// Extensión del objeto Window para incluir la API de Electron
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
