/**
 * Tipos globales para la aplicación Contador de Jubilación
 */
export interface CountdownData {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export interface RetirementConfig {
    targetDate: Date;
    isValid: boolean;
}
export interface WindowConfig {
    width: number;
    height: number;
    x?: number;
    y?: number;
}
export interface ElectronAPI {
    onWindowReposition: (callback: () => void) => void;
    requestWindowReposition: () => void;
    getRetirementDate: () => Promise<Date>;
    setRetirementDate: (date: Date) => Promise<void>;
    openRetirementConfig: () => Promise<boolean>;
    onRetirementDateUpdated: (callback: (date: Date) => void) => void;
    enableAutoStart: () => Promise<boolean>;
    getAutoStartStatus: () => Promise<boolean>;
}
declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
