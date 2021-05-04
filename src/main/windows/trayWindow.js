import { LOAD_URL } from "../config";

const trayWinURL =
    process.env.NODE_ENV === "development"
        ? `http://localhost:8080/#tray`
        : `${LOAD_URL}#tray`;
let trayWindow = null;
/**
 * 创建托盘菜单
 * @param BrowserWindow
 * @param bounds 范围
 * @returns {*}
 */
const createTrayWindow = function (BrowserWindow, bounds) {
    if (trayWindow) return;

    const obj = {
        height: 350,
        width: 200,
        x: bounds.x,
        y: bounds.y - 310,
        show: false,
        frame: false,
        fullscreenable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        resizable: process.env.NODE_ENV === "development",
        transparent: process.platform !== "linux",
        // backgroundColor: '#fff',
        alwaysOnTop: true,
        skipTaskbar: true,
        // parent: global.mainWindow,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            backgroundThrottling: false,
            devTools: false,
        },
    };

    trayWindow = new BrowserWindow(obj);

    trayWindow.loadURL(trayWinURL);

    trayWindow.on("blur", () => {
        trayWindow.hide();
    });

    trayWindow.on("closed", () => {
        trayWindow = null;
    });
    return trayWindow;
};
export default createTrayWindow;
