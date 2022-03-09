const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const path = require("path");
const url = require("url");
const checkInternetConnected = require("check-internet-connected");

let mainWindow;
let contents;

const config = {
  timeout: 3000, //timeout connecting to each try (default 5000)
  retries: 2, //number of retries to do before failing (default 5)
  domain: "https://eungyolee.github.io/ymgng-class", //the domain to check DNS record of
};

function createWindow() {
  mainWindow = new BrowserWindow({
    backgroundColor: "#272727",
    width: 900,
    height: 850,
    minWidth: 900,
    minHeight: 850,
    // show: false,
    icon: path.join(__dirname, "icon.ico"),
  });
  const templete = [
    // {
    // 	label: "File",
    // 	submenu: [
    // 		{
    // 			role: "about",
    // 		},
    // 	],
    // },
    {
      label: "Edit",
      submenu: [
        {
          role: "zoomIn",
          accelerator: "CommandOrControl+=",
        },
        {
          role: "zoomOut",
        },
        {
          role: "resetZoom",
        },
        // {
        // 	role: "separator",
        // },
        {
          role: "reload",
        },
      ],
    },
  ];
  let newMenu = Menu.buildFromTemplate(templete);
  Menu.setApplicationMenu(newMenu);

  checkInternetConnected(config)
    .then(() => {
      mainWindow.loadURL("https://eungyolee.github.io/ymgng-class");
    })
    .catch((err) => {
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true,
        })
      );
    });

  // contents = mainWindow.webContents;
  // contents.openDevTools();
  // autoUpdater.checkForUpdates();
}
createWindow;
app.on("ready", createWindow);

app.on("closed", () => {
  win = null;
});

// autoUpdater.on("update-available", function () {
// 	console.log("A new update is available");
// 	contents.send("updater-message", "A new update is available");
// });
// autoUpdater.on("checking-for-update", function () {
// 	console.log("Checking-for-update");
// 	contents.send("updater-message", "Checking for Update..");
// });
// autoUpdater.on("error", function (error) {
// 	console.log("error");
// 	console.error(error);
// 	contents.send("updater-message", "Got Error");
// });
// autoUpdater.on("download-progress", function (bytesPerSecond, percent, total, transferred) {
// 	console.log(`${bytesPerSecond}, ${percent}, ${total}, ${transferred}`);
// 	contents.send("updater-message", `download progress : ${bytesPerSecond}, ${percent}, ${total}, ${transferred}`);
// });
// autoUpdater.on("update-downloaded", function (event) {
// 	console.log("update-downloaded");
// 	console.log(event);
// 	contents.send("updater-message", "update-downloaded");
// });

// autoUpdater.on("update-not-available", function () {
// 	console.log("update-not-available");
// 	contents.send("updater-message", "update-not-available");
// });

// app.whenReady().then(() => {
// 	createWindow();

// 	app.on("activate", () => {
// 		if (BrowserWindow.getAllWindows().length === 0) {
// 			createWindow();
// 		}
// 	});
// });

// app.on("window-all-closed", () => {
// 	if (process.platform !== "darwin") {
// 		app.quit();
// 	}
// });
