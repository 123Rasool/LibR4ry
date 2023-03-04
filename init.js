const fileLogger = require("./utils/fileLogger")

if (fileLogger.init()) {
    globalThis.logger = fileLogger;
} else {
    globalThis.logger = require("./utils/consoleLogger");
    globalThis.logger.log(`start logging on console. (CAUSE) ${fileLogger.getError()}`);
}

const server = require("./server/server");

server.startServer(8081);

