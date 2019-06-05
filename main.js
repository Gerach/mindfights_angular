const {
  app,
  BrowserWindow,
  ipcMain,
} = require("electron");
const appName = "mindfights-app2";

const {
  INSERT_QUERY,
  SELECT_QUERY,
} = require("./constants.js");

let win;

let Datastore = require("nedb");
let db = new Datastore({ filename: "./mindfights.db", autoload: true});

function createWindow() {
  win = new BrowserWindow({
    backgroundColor: "#262a30",
    height: 600,
    width: 1000,
  });

  win.loadURL(`file://${__dirname}/dist/${appName}/index.html`);
  win.webContents.openDevTools();

  win.on("closed", function() {
    app.quit();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on(INSERT_QUERY, (event, args) => {
  db.insert(args, function(err, newDoc) {
    db.find({ game: "test game" }, function(err2, docs) {
      win.send(INSERT_QUERY, docs);
    });
  });
});
