import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false,
      preload: path.join(__dirname, '../electron-preload/index.js'),
    },
    autoHideMenuBar: true,
  });

  if (app.isPackaged) win.loadFile(path.join(__dirname, '../index.html'));
  else {
    const URL = `http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}`;

    win.loadURL(URL);
  }
  if (import.meta.env.DEV) win.webContents.openDevTools();
  else {
    win.webContents.on('devtools-opened', () => {
      win.webContents.closeDevTools();
    });
  }
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
