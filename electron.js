const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        kiosk: true,
        frame: false,
        backgroundColor: '#000',
        alwaysOnTop: true,
        icon: __dirname + 'public/assets/images/favicon.ico'
    })
    mainWindow.loadURL('http://localhost:50780/')
    mainWindow.on('closed', function () {
        mainWindow = null
    })

    let displays = electron.screen.getAllDisplays()
    console.log(displays)
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})