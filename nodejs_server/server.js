import http from "http";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import EventEmitter from "events";
import { logEvents } from "../server_logger/logger.js";

const eventEmitter = new EventEmitter();
eventEmitter.on("log", (message, fileName) => logEvents(message, fileName));
const PORT = process.env.PORT || 8000;

const serveFile = async (filePath, contentType, response) => {
    try {
        const encoding = contentType.includes("image") ? "" : "utf-8";
        const data = await fsPromises
            .readFile(filePath, {
                encoding: encoding,
            })
            .then((raw_data) => {
                /* update value based on the contentType */
                let data = raw_data;
                if (contentType === "application/json") {
                    data = JSON.parse(raw_data);
                }
                return data;
            })
            .catch((error) => {
                throw new Error("fileReadOperationException");
            });
        response.writeHead(filePath.includes("404") ? 404 : 200, {
            "Content-Type": contentType,
        });
        response.end(
            contentType === "application/json" ? JSON.stringify(data) : data
        );
    } catch (error) {
        console.error(error);
        eventEmitter.emit(
            "log",
            `${error.name}: ${error.message}`,
            "errLog.txt"
        );
        response.statusCode = 500;
        response.end();
    }
};

const server = http.createServer((request, response) => {
    eventEmitter.emit("log", `${request.url} ${request.method}`, "reqLog.txt");

    /* file serving based on contentType specified in the url */
    const extensionName = path.extname(request.url);

    let contentType;

    switch (extensionName) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".txt":
            contentType = "text/plain";
            break;
        default:
            contentType = "text/html";
    }
    const __dirname = path.dirname(import.meta.filename);
    let filePath;
    if (contentType === "text/html" && request.url === "/") {
        /* home page */
        filePath = path.join(__dirname, "views", "index.html");
    } else if (contentType === "text/html" && request.url.slice(-1) === "/") {
        /* root path inside a sub-directory when index.html isn't suffixed */
        filePath = path.join(__dirname, "views", request.url, "index.html");
    } else if (contentType === "text/html") {
        /* specific path inside a subdirectory  */
        filePath = path.join(__dirname, "views", request.url);
    } else {
        filePath = path.join(__dirname, request.url);
    }

    // makes .html extension not mandatory in url if extensionName isn't specified
    if (!extensionName && request.url.slice(-1) !== "/") filePath += ".html";

    if (fs.existsSync(filePath)) {
        serveFile(filePath, contentType, response);
    } else {
        /* serve redirected files or 404: not found file */
        switch (path.parse(filePath).base) {
            case "old-index.html":
                response.writeHead(301, { Location: "/new-index.html" });
                response.end();
                break;
            case "www-page.html":
                response.writeHead(301, { Location: "/" });
                response.end();
                break;
            default:
                serveFile(
                    path.join(__dirname, "views", "404.html"),
                    "text/html",
                    response
                );
        }
    }
});

/* listen to server on port */
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
