import os from "os";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

/* os related methods */
console.log("userInfo: ", os.userInfo());
console.log("version: ", os.version());
console.log("homedir: ", os.homedir());
console.log("hostname: ", os.hostname());
console.log("type: ", os.type());

/* console.log("global: ", global); */

/* import meta information */
console.log("__dirname", import.meta.dirname);
console.log("__filename", import.meta.filename);
console.log("The absolute file: URL of the module: ", import.meta.url);
console.log("filename URL: ", fileURLToPath(import.meta.url));

/* path related methods */
console.log("__dirname: ", path.dirname(import.meta.filename));
console.log("__filename: ", path.basename(import.meta.filename));
console.log("file extension: ", path.extname(import.meta.filename));
console.log("file info object: ", path.parse(import.meta.filename));
