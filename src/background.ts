/* eslint-disable */
import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Menu,
  remote,
} from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import "reflect-metadata";
import path = require('path');
// import { createConnectionDB } from "./database/index";

import { CreateConnectDataBaseConfig } from "./config/CreateConnectDataBaseConfig";
import { GetConnectDataBaseConfig } from "./config/GetConnectDataBaseConfig";
import MenuTemplate from './data/GetMenuTemplate';

// const newConfig = new CreateConnectDataBaseConfig();
// newConfig.execute({
//   institution: "Colegio em Teste",
//   path: "",
//   lang: "pt-br",
// })

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

let win: BrowserWindow;
let child: BrowserWindow;
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    frame: false,
    webPreferences: {
       nodeIntegration: true,
       contextIsolation: false,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', async () => {
  //Read config to render electron
  const getConfig = new GetConnectDataBaseConfig()

  getConfig.execute().then((e) => {
    setTimeout(() => { createWindow(); }, 1000)
    createConnection();
  }).catch((e) => {
    console.log(e)
  })

});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

ipcMain.on("action-menu", function (event, action): void {
  switch (action) {
    case 'new Windows':
      child = new BrowserWindow({ parent: win });
      child.setMenu(Menu.buildFromTemplate(MenuTemplate))
      child.show();
      break;
    case 'appearance-light':
      win.webContents.executeJavaScript("document.querySelector('html').setAttribute('theme', 'light')")
      break;
    case 'appearance-dark':
      win.webContents.executeJavaScript("document.querySelector('html').setAttribute('theme', 'dark')")
      break;
  }
})

ipcMain.on("action-window", function (event, action): void {
  const currentWindow: any = win || remote.BrowserWindow.getFocusedWindow()
  switch (action) {
    case 'minimize':
      currentWindow.minimize();
      break;
    case 'maximize':
      if (!currentWindow.isMaximized()) {
        currentWindow.maximize();
      } else {
        currentWindow.unmaximize();
      }
      break;
    case 'close':
      currentWindow.close();
      break;
  }
})

//connectar db
const createConnection = () => {
  // createConnectionDB().then(() => {
  //   console.log("Sucesso!")

  // }).catch((error: any) => {
  //   console.log("erro", error)
  // })
}

ipcMain.on("action-api", function (event, action): void {
  const currentWindow: any = win || remote.BrowserWindow.getFocusedWindow()
  switch (action) {
    case 'minimize':
      currentWindow.minimize();
      break;
    case 'maximize':
      if (!currentWindow.isMaximized()) {
        currentWindow.maximize();
      } else {
        currentWindow.unmaximize();
      }
      break;
    case 'close':
      currentWindow.close();
      break;
  }
})