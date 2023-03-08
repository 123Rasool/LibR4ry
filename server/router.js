const utils = require("./ServerUtils");


const routing = {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {},
};




const handler = async function (req, res) {
    
    try {

        //parsing request
        await utils.requestParser(req)

        logger.logArray([`path:${req.path}`, `query:${req.query}`, `body:${req.body}`]);


        if (req.path.toLowerCase() != "/login" && req.path.toLowerCase() != "/favicon.ico" && !req.username && req.method.toLowerCase() == "get") {
            res.writeHead(302, { "Location": "/Login" }).end();
        } else {
            res.json = (data) => utils.jsonSerialize(data, res);
            routing[req.method][req.path](req, res);
        }

    } catch (error) {
        logger.log(error.message)
        return utils.errResponse(res, error.message);
    }
}


const addRoute = function (method, url, controller) {
    switch (method.toUpperCase()) {
        case "GET":
            routing.GET[url] = controller;
            break;
        case "POST":
            routing.POST[url] = controller;
            break;
        case "PUT":
            routing.PUT[url] = controller;
            break;
        case "PATCH":
            routing.PATCH[url] = controller;
            break;
        case "DELETE":
            routing.DELETE[url] = controller;
            break;
        default:
            logger.log(`routing out of available methods, is not available; "${method}" is wrong.`)
            break;
    }
}


module.exports = {
    handler,
    addRoute
}