const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow
let externalWindow

function createWindow() {
    let displays = electron.screen.getAllDisplays()
    let externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
    })

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        kiosk: false,
        frame: true,
        show: false,
        backgroundColor: '#000',
        alwaysOnTop: true,
        icon: __dirname + 'public/assets/images/favicon.ico'
    })
    mainWindow.loadURL('http://localhost:50780/')
    mainWindow.maximize()
    mainWindow.show()

    mainWindow.on('closed', function () {
        mainWindow = null
    })


    if (externalDisplay) {
        externalWindow = new BrowserWindow({
            width: 800,
            height: 600,
            kiosk: true,
            frame: false,
            backgroundColor: '#000',
            alwaysOnTop: true,
            icon: __dirname + 'public/assets/images/favicon.ico',
            x: externalDisplay.bounds.x + 50,
            y: externalDisplay.bounds.y + 50
        })
        externalWindow.loadURL('http://localhost:50780/d')

        externalWindow.on('closed', function () {
            externalWindow = null
        })
    }

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
