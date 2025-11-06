/**
 * window-manager.ts
 * Responsable de crear y posicionar la ventana principal y de reaccionar a cambios
 * en la configuración de pantallas (resolución, monitores conectados, etc.).
 */
import { BrowserWindow } from 'electron';
/**
 * Reposiciona la ventana si existe.
 */
export declare function repositionWindow(): void;
/**
 * Crea la ventana principal con las propiedades deseadas.
 * No se fija alwaysOnTop para permitir que otras apps la cubran.
 */
export declare function createMainWindow(): BrowserWindow;
/**
 * Registra listeners de cambios en pantallas para reposicionar automáticamente.
 */
export declare function registerDisplayListeners(): void;
/**
 * Expone acceso interno al BrowserWindow (uso limitado).
 */
export declare function getMainWindow(): BrowserWindow | null;
