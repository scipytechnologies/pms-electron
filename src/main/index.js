import { app, shell, BrowserWindow, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater' // Import autoUpdater
import icon from '../../resources/icon.png?asset'
import { updateElectronBuilderToken } from './updateConfig.js'
import { ipcMain } from 'electron'
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    show: false,
    frame: true,
    autoHideMenuBar: true,
    resizable: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  if (!is.dev) {
    updateElectronBuilderToken()
  }
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Set up auto-updater events
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...')
  })

  autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info)
  })

  autoUpdater.on('update-not-available', () => {
    console.log('Update not available.')
  })

  autoUpdater.on('download-progress', (progress) => {
    console.log(`Download speed: ${progress.bytesPerSecond} - Downloaded ${progress.percent}%`)
  })

  autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox(
      {
        type: 'info',
        title: 'Update Available',
        message: 'A new version is ready to be installed',
        buttons: ['Ok']
      }
      //  (buttonIndex) => {
      //   if (buttonIndex === 0) {
      //     autoUpdater.quitAndInstall();
      //   }
      // }
    )
  })

  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Rest of your existing code...

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.indhanx')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Configure autoUpdater
  autoUpdater.checkForUpdatesAndNotify()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('minimize-window', () => {
    const mainWindow = BrowserWindow.getFocusedWindow()
    if (mainWindow) mainWindow.minimize()
  })

  ipcMain.on('maximize-window', () => {
    const mainWindow = BrowserWindow.getFocusedWindow()
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
      } else {
        mainWindow.maximize()
      }
    }
  })

  ipcMain.on('close-window', () => {
    const mainWindow = BrowserWindow.getFocusedWindow()
    if (mainWindow) mainWindow.close()
  })
})

// Rest of your existing code...
