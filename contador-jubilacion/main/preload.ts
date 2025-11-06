/**
 * preload.ts
 * Puente seguro entre el Renderer y el Main usando contextBridge.
 * Aquí solo expondremos una API mínima necesaria.
 */

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  requestWindowReposition: () => ipcRenderer.send('window:reposition'),
  getRetirementDate: async (): Promise<Date | null> => {
    const ms = await ipcRenderer.invoke('retirement:get');
    return typeof ms === 'number' ? new Date(ms) : null;
  },
  setRetirementDate: async (date: Date): Promise<Date | null> => {
    const ms = await ipcRenderer.invoke('retirement:set', date.getTime());
    return typeof ms === 'number' ? new Date(ms) : null;
  },
  openRetirementConfig: async (): Promise<boolean> => ipcRenderer.invoke('retirement:open-config'),
  enableAutoStart: async (): Promise<boolean> => ipcRenderer.invoke('retirement:autoLaunch:enable'),
  getAutoStartStatus: async (): Promise<boolean> => ipcRenderer.invoke('retirement:autoLaunch:status'),
  onRetirementDateUpdated: (callback: (date: Date) => void) => {
    ipcRenderer.removeAllListeners('retirement:updated');
    ipcRenderer.on('retirement:updated', (_evt, ms: number) => {
      callback(new Date(ms));
    });
  }
});
