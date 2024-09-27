import { EventEmitter } from "events";
import { logEvents } from "./logger.js";
const eventEmmiter = new EventEmitter();

eventEmmiter.addListener("log", logEvents);

setTimeout(() => {
    eventEmmiter.emit("log", "Never Say Never");
}, 1000);
