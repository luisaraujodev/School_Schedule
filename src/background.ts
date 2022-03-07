/* eslint-disable */
import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
} from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import "reflect-metadata";
import { CreateScheduleController } from "./database/controllers/CreateScheduleController"
import path = require('path');
import { createConnectionDB } from "./database/index";

import { CreateConnectDataBaseConfig } from "./config/CreateConnectDataBaseConfig";
import { GetConnectDataBaseConfig } from "./config/GetConnectDataBaseConfig";

const newConfig = new CreateConnectDataBaseConfig();
newConfig.execute({
  institution: "Colegio em Teste",
  path: "",
})

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

let win: BrowserWindow;
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
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
  win.webContents.executeJavaScript(`console.log(${JSON.stringify(__dirname)})`);
  create();
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', async () => {
  //Read config to render electron
  const getConfig = new GetConnectDataBaseConfig()

  getConfig.execute().then((e) => {
    console.log('electron',process.env.DB_NAME)
    console.log(e);
    createWindow();
    console.log('electron',process.env.DB_NAME)
  }).catch((e) => {
    console.log(e)
  })
});

// Exit cleanly on request from parent process in development mode.
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

ipcMain.on("action-window", function (event): void {
  // ConnectarDB.then(() => {

  //   const createScheduleController = new CreateScheduleController();

  //   createScheduleController.handle({ name: "post title" }).then((e) => {
  //     console.log(e)
  //     win.webContents.executeJavaScript(`console.log(${JSON.stringify(e)})`)
  //   })
  //     .catch((error: any) => {
  //       console.log(error)
  //       win.webContents.executeJavaScript(`console.log(${JSON.stringify(error)})`)
  //     });
  // }).catch(() => {
  //   console.log("erro")
  // })


})

const create = () => {
  createConnectionDB().then(() => {

    const createScheduleController = new CreateScheduleController();

    createScheduleController.handle({ name: "post title" }).then((e) => {
      console.log(e)
      win.webContents.executeJavaScript(`console.log(${JSON.stringify(e)})`)
    })
      .catch((error: any) => {
        console.log(error)
        win.webContents.executeJavaScript(`console.log(${JSON.stringify(error)})`)
      });
  }).catch(() => {
    console.log("erro")
  })
}