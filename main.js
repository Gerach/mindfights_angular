const { app, BrowserWindow } = require('electron');
const appName = 'mindfights-app2';

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#ffffff'
  });

  win.loadURL(`file://${__dirname}/dist/${appName}/index.html`);
  win.webContents.openDevTools();

  win.on('closed', function () {
    win = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function() {
  if (win === null) {
    createWindow()
  }
});
