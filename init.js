const fileLogger = require("./utils/fileLogger")

if (fileLogger.init()) {
    globalThis.logger = fileLogger;
} else {
    globalThis.logger = require("./utils/consoleLogger");
    globalThis.logger.log(`start logging on console. (CAUSE) ${fileLogger.getError()}`);
}

const server = require("./server/server");

globalThis.router = server.startServer(8083);

const controller = require("./controllers/controller") 

