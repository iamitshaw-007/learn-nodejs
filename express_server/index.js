import express from "express";
import path from "path";
import cors from "cors";
import { logEvents } from "../server_logger/logger.js";

const application = express();
const PORT = process.env.PORT || 8000;

/* __dirname & __filename */
const __dirname = path.dirname(import.meta.filename);
const __filename = path.basename(import.meta.filename);

/* custom middleware */
application.use((request, response, next) => {
    logEvents(`${request.url} ${request.method}`, "requestLog.txt");
    next();
});

/* Cross Origin Resourse Sharing */
const whiteList = ["https://127.0.0.1:5500", "http:://localhost:8000"];

application.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || whiteList.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("corsOperationException"));
            }
        },
        optionsSuccessStatus: 200,
    })
);

application.use("/css", express.static(path.join(__dirname, "css")));
application.use("/data", express.static(path.join(__dirname, "data")));
application.use("/img", express.static(path.join(__dirname, "img")));

/* built-in middleware */
application.use(express.urlencoded({ extended: false }));
application.use(
    express.json({
        inflate: true,
        limit: 100,
    })
);

application.get("^/$|^/index(.html)?", function (request, response) {
    response.status(200);
    response.sendFile(path.join(__dirname, "views", "index.html"));
});

application.get("/new-index(.html)?", function (request, response) {
    response.status(200);
    response.sendFile(path.join(__dirname, "views", "new-index.html"));
});

application.get("/about(/index(.html)?)?", function (request, response) {
    response.status(200);
    response.sendFile(path.join(__dirname, "views", "about", "index.html"));
});

/* 404 handler */
application.all("*", function (request, response) {
    response.status(404);
    if (request.accepts("html")) {
        response
            .type("html")
            .sendFile(path.join(__dirname, "views", "404.html"));
    } else if (request.accepts("json")) {
        response.type("application/json").json({ error: "404 not found" });
    } else {
        response.type("txt").send("404 not found");
    }
});

/* errorHandler */
application.use(function (error, request, response, next) {
    logEvents(`${error.name} ${error.message}`, "errorFileLogs.txt");
    response.status(500).send({ errorMessge: error.message });
});

/* application server listerner */
application.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
