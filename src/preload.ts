import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(
  'remote',
  {
    minimize: () => ipcRenderer.send("action-window", "minimize"),
    maximize: () => ipcRenderer.send("action-window", "maximize"),
    close: () => ipcRenderer.send("action-window", "close"),
  },
);
