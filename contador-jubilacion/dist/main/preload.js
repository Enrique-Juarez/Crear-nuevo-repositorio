/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

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
/*!*************************!*\
  !*** ./main/preload.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/**
 * preload.ts
 * Puente seguro entre el Renderer y el Main usando contextBridge.
 * Aquí solo expondremos una API mínima necesaria.
 */

electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electronAPI', {
    requestWindowReposition: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send('window:reposition'),
    getRetirementDate: async () => {
        const ms = await electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('retirement:get');
        return typeof ms === 'number' ? new Date(ms) : null;
    },
    setRetirementDate: async (date) => {
        const ms = await electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('retirement:set', date.getTime());
        return typeof ms === 'number' ? new Date(ms) : null;
    },
    openRetirementConfig: async () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('retirement:open-config'),
    enableAutoStart: async () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('retirement:autoLaunch:enable'),
    getAutoStartStatus: async () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('retirement:autoLaunch:status'),
    onRetirementDateUpdated: (callback) => {
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeAllListeners('retirement:updated');
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on('retirement:updated', (_evt, ms) => {
            callback(new Date(ms));
        });
    }
});

})();

/******/ })()
;
//# sourceMappingURL=preload.js.map