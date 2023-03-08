const http = require("http");
const router = require("./router");

const server2 = http.createServer((req, res) => {
    res.writeHead(3, { "Location": '/test.txt' });
    res.end();
    
});


const server = http.createServer(router.handler);


function startServer(port) {
    server.listen(port, router)
    logger.log(`Listening started on localhost:${port}`);
    console.log(`Listening started on localhost:${port}`);
    return router;
}





module.exports = {
    startServer
}