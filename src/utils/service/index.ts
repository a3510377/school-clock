// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';

export type BrowserWindowTypeArgs = 'maximize' | 'minimize' | 'close';

export interface IpcEvents {
  BrowserWindow: [BrowserWindowTypeArgs];
}

export class Electron {
  public async send<K extends keyof IpcEvents>(
    name: K,
    ...args: IpcEvents[K]
  ): Promise<void>;
  public async send(name: string, ...args: unknown[]): Promise<void> {
    ipcRenderer.send(name, ...args);
  }

  public closeWindow(): void {
    this.send('BrowserWindow', 'close');
  }
  public maximizeWindow(): void {
    this.send('BrowserWindow', 'maximize');
  }
  public minimizeWindow(): void {
    this.send('BrowserWindow', 'minimize');
  }
}
