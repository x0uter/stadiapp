const { app, BrowserWindow, Menu } = require('electron')
const fs = require('fs')
const path = require('path')
const Store = require('electron-store')

const store = new Store()


module.exports = (mainWindow) => {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Language',
                    submenu: [
                        {
                            label: 'English',
                            type: 'checkbox',
                            checked: store.get('language') === 'en',
                            click() {
                                saveLanguage('en')
                            }
                        },
                        {
                            label: 'French',
                            type: 'checkbox',
                            checked: store.get('language') === 'fr',
                            click() {
                                saveLanguage('fr')
                            }
                        },
                        {
                            label: 'German',
                            type: 'checkbox',
                            checked: store.get('language') === 'de',
                            click() {
                                saveLanguage('de')
                            }
                        },
                        {
                            label: 'Spanish',
                            type: 'checkbox',
                            checked: store.get('language') === 'es',
                            click() {
                                saveLanguage('es')
                            }
                        },
                        {
                            label: 'Portuguese',
                            type: 'checkbox',
                            checked: store.get('language') === 'pt',
                            click() {
                                saveLanguage('pt')
                            }
                        }
                    ]
                },
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: 'Game',
            submenu: [
                {
                    label: 'Main Menu',
                    click() {
                        mainWindow.reload()
                    }
                },
                {
                    label: 'Screenshot',
                    click() {
                        mainWindow.webContents.capturePage().then(image => {
                            fs.writeFile(`stadia${Date.now()}.png`, image.toPNG(), (err) => {
                                if (err) throw err
                            })
                        })
                    }
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    click() {
                        mainWindow.minimize()
                    }
                },
                {
                    label: 'Maximize',
                    click() {
                        mainWindow.maximize()
                    }
                },
                {
                    label: 'Fullscreen',
                    accelerator: 'F11',
                    click() {
                        mainWindow.setFullScreen(true)
                    }
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click() {
                        let aboutWindow = new BrowserWindow({
                            title: `${settings.title} - About`,
                            width: 400,
                            height: 500,
                            resizable: true,
                            center: true,
                            icon: path.join(__dirname, 'assets/stadia.ico'),
                            webPreferences: {
                                nodeIntegration: true
                            }
                        })
                        aboutWindow.setMenuBarVisibility(false)
                        aboutWindow.loadFile(path.join(__dirname, 'views/about.html'))
                        aboutWindow.webContents.on('did-finish-load', function () {
                            aboutWindow.webContents.send('settings', settings)
                        })
                    }
                }
            ]
        }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}


function saveLanguage(lang) {
    store.set('language', lang)
    app.relaunch()
    app.exit()
}