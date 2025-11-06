/**
 * window-manager.ts
 * Responsable de crear y posicionar la ventana principal y de reaccionar a cambios
 * en la configuración de pantallas (resolución, monitores conectados, etc.).
 */

import { BrowserWindow, screen } from 'electron';

// Margen respecto a los bordes de la pantalla
const H_MARGIN = 20;
const V_MARGIN = 20;

// Tamaño base de la ventana (aumentado para reservar espacio a icono configuración)
const WINDOW_WIDTH = 320;
const WINDOW_HEIGHT = 100;

let mainWindow: BrowserWindow | null = null;

/**
 * Calcula la posición en la esquina superior derecha de la pantalla principal.
 */
function getTopRightPosition(): { x: number; y: number } {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width } = primaryDisplay.workAreaSize;
  const x = width - WINDOW_WIDTH - H_MARGIN;
  const y = V_MARGIN;
  return { x, y };
}

/**
 * Reposiciona la ventana si existe.
 */
export function repositionWindow(): void {
  if (!mainWindow) return;
  const { x, y } = getTopRightPosition();
  mainWindow.setPosition(x, y);
}

/**
 * Crea la ventana principal con las propiedades deseadas.
 * No se fija alwaysOnTop para permitir que otras apps la cubran.
 */
export function createMainWindow(): BrowserWindow {
  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    frame: false,
    transparent: true,
    skipTaskbar: true,
  // Hacemos focusable true para que reciba eventos de hover de forma fiable en macOS.
  // Al usar showInactive no robará foco inicial y el usuario no notará cambio.
  focusable: true,
    acceptFirstMouse: true, // Permite que el primer movimiento/clic sobre la ventana sin foco la active para hover inmediato
    resizable: false,
    movable: false,
    hasShadow: false,
    show: false, // Mostramos manualmente tras posicionar
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: require('path').join(__dirname, 'preload.js')
    }
  });

  // Inicialmente permitimos interacción para que el usuario pueda acceder al icono de ajustes.
  // Se podrá volver a modo "fantasma" mediante las funciones de interacción si se desea.
  mainWindow.setIgnoreMouseEvents(false);

  repositionWindow();

  mainWindow.once('ready-to-show', () => {
    mainWindow?.showInactive(); // showInactive => no roba foco
  });

  // Si la ventana se intenta mover manualmente (no debería), la re-forzamos
  mainWindow.on('moved', () => repositionWindow());

  return mainWindow;
}

// Eliminado: lógica de interacción avanzada (simplificación solicitada)

/**
 * Registra listeners de cambios en pantallas para reposicionar automáticamente.
 */
export function registerDisplayListeners(): void {
  screen.on('display-metrics-changed', () => repositionWindow());
  screen.on('display-added', () => repositionWindow());
  screen.on('display-removed', () => repositionWindow());
}

/**
 * Expone acceso interno al BrowserWindow (uso limitado).
 */
export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}
