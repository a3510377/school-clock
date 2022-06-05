import type { IpcRenderer } from 'electron/renderer';
import type * as vue from 'vue';

export interface IElectronAPI {
  platform: string;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
    ipcRenderer?: IpcRenderer;
  }
}
