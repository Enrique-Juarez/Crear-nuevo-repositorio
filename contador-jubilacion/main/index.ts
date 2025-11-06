/**
 * Proceso principal de Electron - Punto de entrada
 * Tarea 2: Refactor para usar window-manager y preload seguros
 */

import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { createMainWindow, registerDisplayListeners, repositionWindow, getMainWindow } from './window-manager';

// Archivo de configuración persistente (simple JSON). En evolución futura podría migrarse a algo más robusto.
const CONFIG_FILENAME = 'retirement-config.json';
let retirementDate: Date | null = null;
let autoLaunchEnabled = false;

function getConfigFilePath(): string {
  return path.join(app.getPath('userData'), CONFIG_FILENAME);
}

function loadRetirementDate(): void {
  try {
    const file = getConfigFilePath();
    if (!fs.existsSync(file)) return;
    const raw = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (raw && typeof raw.retirementTimestamp === 'number') {
      const dt = new Date(raw.retirementTimestamp);
      if (!isNaN(dt.getTime())) {
        retirementDate = dt;
      }
    }
    if (raw && typeof raw.autoLaunch === 'boolean') {
      autoLaunchEnabled = raw.autoLaunch;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[config] Error leyendo configuración:', e);
  }
}

function saveRetirementDate(date: Date): void {
  try {
    const file = getConfigFilePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify({ retirementTimestamp: date.getTime(), autoLaunch: autoLaunchEnabled }, null, 2), 'utf-8');
    retirementDate = date;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[config] Error guardando configuración:', e);
  }
}

function persistConfig(): void {
  if (!retirementDate) return;
  try {
    const file = getConfigFilePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify({ retirementTimestamp: retirementDate.getTime(), autoLaunch: autoLaunchEnabled }, null, 2), 'utf-8');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[config] Error persistiendo configuración:', e);
  }
}

function enableAutoLaunch(): void {
  if (process.platform === 'darwin' || process.platform === 'win32') {
    try {
      app.setLoginItemSettings({
        openAtLogin: true,
        openAsHidden: true, // arranca sin traer foco
        args: []
      });
      autoLaunchEnabled = true;
      persistConfig();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[autostart] No se pudo configurar auto inicio:', e);
    }
  } else {
    // Para Linux podríamos incorporar un mecanismo (archivo .desktop) en el futuro.
  }
}

function ensureAutoLaunchOnBoot(): void {
  if (!autoLaunchEnabled) return; // Solo si ya fue habilitado
  if (process.platform === 'darwin' || process.platform === 'win32') {
    const settings = app.getLoginItemSettings();
    if (!settings.openAtLogin) {
      enableAutoLaunch();
    }
  }
}

let configWindow: BrowserWindow | null = null;

function createConfigWindow(): BrowserWindow {
  configWindow = new BrowserWindow({
    width: 400,
    height: 360,
    resizable: false,
    minimizable: false,
    maximizable: false,
    title: 'Configurar Jubilación',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  const htmlPath = path.join(__dirname, '../renderer/config.html');
  configWindow.loadFile(htmlPath);
  configWindow.on('closed', () => { configWindow = null; });

  // Auto-ajustar la altura al contenido (limitado para no desbordar pantalla pequeña)
  configWindow.webContents.on('did-finish-load', () => {
    configWindow?.webContents.executeJavaScript('Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)').then((h: number) => {
      if (!configWindow || configWindow.isDestroyed()) return;
      const max = Math.min(h + 16, 520); // margen extra y límite superior
      const width = 400; // mantener base
      try {
        configWindow.setContentSize(width, max);
      } catch { /* noop */ }
    });
  });
  return configWindow;
}

let mainWindow: BrowserWindow | null = null;

function boot(): void {
  loadRetirementDate();

  // Si no hay fecha configurada, abrimos ventana de configuración primera vez
  if (!retirementDate) {
    createConfigWindow();
  }
  // Reafirmar autostart si ya estaba configurado previamente
  ensureAutoLaunchOnBoot();

  mainWindow = createMainWindow();
  const htmlPath = path.join(__dirname, '../renderer/index.html');
  mainWindow.loadFile(htmlPath);

  registerDisplayListeners();

  app.on('activate', () => repositionWindow());
  ipcMain.on('window:reposition', () => repositionWindow());

  // IPC para obtener y establecer fecha
  ipcMain.handle('retirement:get', () => {
    return retirementDate ? retirementDate.getTime() : null;
  });
  ipcMain.handle('retirement:set', (_evt, ms: number) => {
    const dt = new Date(ms);
    if (!isNaN(dt.getTime())) {
      const wasFirstTime = !retirementDate;
      saveRetirementDate(dt);
      if (configWindow) {
        configWindow.close();
      }
      // Notificar al renderer principal que la fecha ha cambiado
      const win = getMainWindow();
      if (win && !win.isDestroyed()) {
        win.webContents.send('retirement:updated', dt.getTime());
      }
      // Habilitamos auto inicio automáticamente la primera vez que el usuario define la fecha
      if (wasFirstTime) {
        enableAutoLaunch();
      }
    }
    return retirementDate ? retirementDate.getTime() : null;
  });

  ipcMain.handle('retirement:autoLaunch:enable', () => { enableAutoLaunch(); return autoLaunchEnabled; });
  ipcMain.handle('retirement:autoLaunch:status', () => autoLaunchEnabled);

  // Reabrir ventana de configuración bajo demanda
  ipcMain.handle('retirement:open-config', () => {
    if (!configWindow) {
      createConfigWindow();
    } else {
      configWindow.focus();
    }
    return true;
  });

  // Eliminado: interacción avanzada (simplificación solicitada)

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(boot);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (!getMainWindow()) boot();
});
