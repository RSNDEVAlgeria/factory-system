const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const isDev = process.env.VITE_DEV_SERVER_URL;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: '#252323',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'renderer', 'index.html'));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// bridge stubs (future native integrations)
ipcMain.handle('app:version', () => app.getVersion());
