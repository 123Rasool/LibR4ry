const http = require("http");
const router = require("./router");

const server = http.createServer(router.handler);


function startServer(port) {
    server.listen(port,router)
    logger.log(`Listening started on localhost:${port}`);
    console.log(`Listening started on localhost:${port}`);
}




module.exports = {
    startServer
}