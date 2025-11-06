/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main/window-manager.ts":
/*!********************************!*\
  !*** ./main/window-manager.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMainWindow: () => (/* binding */ createMainWindow),
/* harmony export */   getMainWindow: () => (/* binding */ getMainWindow),
/* harmony export */   registerDisplayListeners: () => (/* binding */ registerDisplayListeners),
/* harmony export */   repositionWindow: () => (/* binding */ repositionWindow)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/**
 * window-manager.ts
 * Responsable de crear y posicionar la ventana principal y de reaccionar a cambios
 * en la configuración de pantallas (resolución, monitores conectados, etc.).
 */

// Margen respecto a los bordes de la pantalla
const H_MARGIN = 20;
const V_MARGIN = 20;
// Tamaño base de la ventana (aumentado para reservar espacio a icono configuración)
const WINDOW_WIDTH = 320;
const WINDOW_HEIGHT = 100;
let mainWindow = null;
/**
 * Calcula la posición en la esquina superior derecha de la pantalla principal.
 */
function getTopRightPosition() {
    const primaryDisplay = electron__WEBPACK_IMPORTED_MODULE_0__.screen.getPrimaryDisplay();
    const { width } = primaryDisplay.workAreaSize;
    const x = width - WINDOW_WIDTH - H_MARGIN;
    const y = V_MARGIN;
    return { x, y };
}
/**
 * Reposiciona la ventana si existe.
 */
function repositionWindow() {
    if (!mainWindow)
        return;
    const { x, y } = getTopRightPosition();
    mainWindow.setPosition(x, y);
}
/**
 * Crea la ventana principal con las propiedades deseadas.
 * No se fija alwaysOnTop para permitir que otras apps la cubran.
 */
function createMainWindow() {
    mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
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
            preload: (__webpack_require__(/*! path */ "path").join)(__dirname, 'preload.js')
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
function registerDisplayListeners() {
    electron__WEBPACK_IMPORTED_MODULE_0__.screen.on('display-metrics-changed', () => repositionWindow());
    electron__WEBPACK_IMPORTED_MODULE_0__.screen.on('display-added', () => repositionWindow());
    electron__WEBPACK_IMPORTED_MODULE_0__.screen.on('display-removed', () => repositionWindow());
}
/**
 * Expone acceso interno al BrowserWindow (uso limitado).
 */
function getMainWindow() {
    return mainWindow;
}


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./main/index.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _window_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./window-manager */ "./main/window-manager.ts");
/**
 * Proceso principal de Electron - Punto de entrada
 * Tarea 2: Refactor para usar window-manager y preload seguros
 */




// Archivo de configuración persistente (simple JSON). En evolución futura podría migrarse a algo más robusto.
const CONFIG_FILENAME = 'retirement-config.json';
let retirementDate = null;
let autoLaunchEnabled = false;
function getConfigFilePath() {
    return path__WEBPACK_IMPORTED_MODULE_1__.join(electron__WEBPACK_IMPORTED_MODULE_0__.app.getPath('userData'), CONFIG_FILENAME);
}
function loadRetirementDate() {
    try {
        const file = getConfigFilePath();
        if (!fs__WEBPACK_IMPORTED_MODULE_2__.existsSync(file))
            return;
        const raw = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_2__.readFileSync(file, 'utf-8'));
        if (raw && typeof raw.retirementTimestamp === 'number') {
            const dt = new Date(raw.retirementTimestamp);
            if (!isNaN(dt.getTime())) {
                retirementDate = dt;
            }
        }
        if (raw && typeof raw.autoLaunch === 'boolean') {
            autoLaunchEnabled = raw.autoLaunch;
        }
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[config] Error leyendo configuración:', e);
    }
}
function saveRetirementDate(date) {
    try {
        const file = getConfigFilePath();
        fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync(path__WEBPACK_IMPORTED_MODULE_1__.dirname(file), { recursive: true });
        fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync(file, JSON.stringify({ retirementTimestamp: date.getTime(), autoLaunch: autoLaunchEnabled }, null, 2), 'utf-8');
        retirementDate = date;
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[config] Error guardando configuración:', e);
    }
}
function persistConfig() {
    if (!retirementDate)
        return;
    try {
        const file = getConfigFilePath();
        fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync(path__WEBPACK_IMPORTED_MODULE_1__.dirname(file), { recursive: true });
        fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync(file, JSON.stringify({ retirementTimestamp: retirementDate.getTime(), autoLaunch: autoLaunchEnabled }, null, 2), 'utf-8');
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[config] Error persistiendo configuración:', e);
    }
}
function enableAutoLaunch() {
    if (process.platform === 'darwin' || process.platform === 'win32') {
        try {
            electron__WEBPACK_IMPORTED_MODULE_0__.app.setLoginItemSettings({
                openAtLogin: true,
                openAsHidden: true, // arranca sin traer foco
                args: []
            });
            autoLaunchEnabled = true;
            persistConfig();
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.warn('[autostart] No se pudo configurar auto inicio:', e);
        }
    }
    else {
        // Para Linux podríamos incorporar un mecanismo (archivo .desktop) en el futuro.
    }
}
function ensureAutoLaunchOnBoot() {
    if (!autoLaunchEnabled)
        return; // Solo si ya fue habilitado
    if (process.platform === 'darwin' || process.platform === 'win32') {
        const settings = electron__WEBPACK_IMPORTED_MODULE_0__.app.getLoginItemSettings();
        if (!settings.openAtLogin) {
            enableAutoLaunch();
        }
    }
}
let configWindow = null;
function createConfigWindow() {
    configWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
        width: 400,
        height: 360,
        resizable: false,
        minimizable: false,
        maximizable: false,
        title: 'Configurar Jubilación',
        webPreferences: {
            preload: path__WEBPACK_IMPORTED_MODULE_1__.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    const htmlPath = path__WEBPACK_IMPORTED_MODULE_1__.join(__dirname, '../renderer/config.html');
    configWindow.loadFile(htmlPath);
    configWindow.on('closed', () => { configWindow = null; });
    // Auto-ajustar la altura al contenido (limitado para no desbordar pantalla pequeña)
    configWindow.webContents.on('did-finish-load', () => {
        configWindow?.webContents.executeJavaScript('Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)').then((h) => {
            if (!configWindow || configWindow.isDestroyed())
                return;
            const max = Math.min(h + 16, 520); // margen extra y límite superior
            const width = 400; // mantener base
            try {
                configWindow.setContentSize(width, max);
            }
            catch { /* noop */ }
        });
    });
    return configWindow;
}
let mainWindow = null;
function boot() {
    loadRetirementDate();
    // Si no hay fecha configurada, abrimos ventana de configuración primera vez
    if (!retirementDate) {
        createConfigWindow();
    }
    // Reafirmar autostart si ya estaba configurado previamente
    ensureAutoLaunchOnBoot();
    mainWindow = (0,_window_manager__WEBPACK_IMPORTED_MODULE_3__.createMainWindow)();
    const htmlPath = path__WEBPACK_IMPORTED_MODULE_1__.join(__dirname, '../renderer/index.html');
    mainWindow.loadFile(htmlPath);
    (0,_window_manager__WEBPACK_IMPORTED_MODULE_3__.registerDisplayListeners)();
    electron__WEBPACK_IMPORTED_MODULE_0__.app.on('activate', () => (0,_window_manager__WEBPACK_IMPORTED_MODULE_3__.repositionWindow)());
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.on('window:reposition', () => (0,_window_manager__WEBPACK_IMPORTED_MODULE_3__.repositionWindow)());
    // IPC para obtener y establecer fecha
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('retirement:get', () => {
        return retirementDate ? retirementDate.getTime() : null;
    });
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('retirement:set', (_evt, ms) => {
        const dt = new Date(ms);
        if (!isNaN(dt.getTime())) {
            const wasFirstTime = !retirementDate;
            saveRetirementDate(dt);
            if (configWindow) {
                configWindow.close();
            }
            // Notificar al renderer principal que la fecha ha cambiado
            const win = (0,_window_manager__WEBPACK_IMPORTED_MODULE_3__.getMainWindow)();
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
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('retirement:autoLaunch:enable', () => { enableAutoLaunch(); return autoLaunchEnabled; });
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('retirement:autoLaunch:status', () => autoLaunchEnabled);
    // Reabrir ventana de configuración bajo demanda
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('retirement:open-config', () => {
        if (!configWindow) {
            createConfigWindow();
        }
        else {
            configWindow.focus();
        }
        return true;
    });
    // Eliminado: interacción avanzada (simplificación solicitada)
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
electron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(boot);
electron__WEBPACK_IMPORTED_MODULE_0__.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();
});
electron__WEBPACK_IMPORTED_MODULE_0__.app.on('activate', () => {
    if (!(0,_window_manager__WEBPACK_IMPORTED_MODULE_3__.getMainWindow)())
        boot();
});

})();

/******/ })()
;
//# sourceMappingURL=index.js.map