const url = require("url");
const utils = require("./ServerUtils");


const handler = async function (req, res) {
    try {
        req.path = url.parse(req.url).pathname;
        req.query = utils.parseQueryFromUrl(url.parse(req.url).query);
        res.json = (data) => utils.jsonSerialize(data, res);
        req.body = null;

        if (req.headers["content-type"] === "application/json")
            req.body = await utils.parseJsonBody(req);
        routing[req.method][req.path](req, res);
    } catch (error) {
        logger.log("Not-Found")
        return utils.errResponse(res, error.message);
    }
}



module.exports = { handler }