// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow } from 'electron';
import path from 'path';

import './events';

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
    icon: path.join(__dirname, '../../src/assets/alarmClockIcon.png'),
  });

  win.loadURL(
    app.isPackaged
      ? 'app://./index.html'
      : // eslint-disable-next-line dot-notation
        `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
  );
  win.webContents.openDevTools();
  // win.webContents.on('devtools-opened', () => {
  //   win.webContents.closeDevTools();
  // });
  win.once('ready-to-show', win.show);
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
