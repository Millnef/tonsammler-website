const fs = require("fs");
const path = require("path");

const devRoot = "D:\\_devcache";
const tmp = path.join(devRoot, "tmp");
const appData = path.join(devRoot, "appdata");
const localAppData = path.join(devRoot, "local-appdata");

for (const dir of [tmp, appData, localAppData]) {
  fs.mkdirSync(dir, { recursive: true });
}

process.env.TEMP = tmp;
process.env.TMP = tmp;
process.env.APPDATA = appData;
process.env.LOCALAPPDATA = localAppData;
process.env.NEXT_TELEMETRY_DISABLED = "1";

const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");
process.argv = [process.argv[0], nextBin, "dev"];
require(nextBin);
