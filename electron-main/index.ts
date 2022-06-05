// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import os from 'os';
import sound from 'sound-play';
import { AlarmClockType } from '../src/types/data';

const IS_PRO_MODE = import.meta.env.MODE === 'production';

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}
// eslint-disable-next-line dot-notation
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    center: true,
    minWidth: 600,
    minHeight: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
      preload: path.join(__dirname, '../electron-preload/index.js'),
    },
    autoHideMenuBar: true,
    resizable: true,
    minimizable: true,
    maximizable: true,
    frame: false,
    modal: true,
    icon: path.join(__dirname, '../alarmClockIcon.png'),
  });

  if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();
  if (process.platform === 'win32') app.setAppUserModelId(app.getName());

  win.loadURL(
    app.isPackaged
      ? path.join(__dirname, '../index.html')
      : // eslint-disable-next-line dot-notation
        `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
  );

  if (IS_PRO_MODE) {
    win.webContents.on('devtools-opened', win.webContents.closeDevTools);
  } else win.webContents.openDevTools();
  win.once('ready-to-show', win.show);

  ipcMain
    .on('play-sound', (_, audio: string, repeat = false) => {
      sound
        .play(audio)
        .then(() => repeat && sound.play(audio))
        // TODO add error handler
        .catch(() => ({}));
    })
    .on('alarm-clock', (_, alarmClock: AlarmClockType) => {
      // TODO add 通知
      ipcMain.emit('play-sound', alarmClock.audio, alarmClock.config?.repeat);
    })
    .on('BrowserWindow', (_event, args) => {
      if (!win) return;
      if (args === 'maximize') {
        win.isMaximized() ? win.unmaximize() : win.maximize();
      } else if (args === 'minimize') win.minimize();
      else if (args === 'close') win.close();
    });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
