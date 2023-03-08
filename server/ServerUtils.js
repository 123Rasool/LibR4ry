const fs = require("fs");
const url = require("url");

exports.getHtml = async (path, req, res) => {
    try {
        fs.readFile(path, (err, data) => {
            if (err) {
                res.writeHead(501);
                logger.log(err.message)
                res.end();
            } else {
                res.end(data);
            }
        });

    } catch (error) {
        logger.log(error.message)
    }
};

exports.parseQueryFromUrl = (url) => {
    if (!url) return {};
    return url.split("&").reduce((prevVal, currVal) => {
        const [key, val] = currVal.split("=");
        return { ...prevVal, [key]: val };
    }, {});
};

exports.jsonSerialize = (data, res) => {
    res.end(JSON.stringify(data));
};

exports.parseJsonBody = (req) => {
    return new Promise((resolve) => {
        let body = [];
        req
            .on("data", (chunk) => {
                body.push(chunk);
            })
            .on("end", () => {
                body = Buffer.concat(body).toString();
                resolve(JSON.parse(body));
            });
    });
};

exports.parseFormPost = (req) => {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(this.parseQueryFromUrl(body));
        });
    });
};

exports.errResponse = (res, errorMessage) => {
    const result = {
        error: true,
        message: errorMessage,
    };
    return res.json(result);
};

exports.parseCookies = (req) => {
    const list = {};
    const cookieHeader = req.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function (cookie) {
        let [name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}

exports.requestParser = async (req) => {
    req.path = url.parse(req.url).pathname;
    req.query = this.parseQueryFromUrl(url.parse(req.url).query);
    req.cookieList = this.parseCookies(req);
    
    req.username = req.cookieList["username"];

    switch (req.headers["content-type"]) {
        case "application/json":
            req.body = await this.parseJsonBody(req);
            break;
        case "application/x-www-form-urlencoded":
            req.body = await this.parseFormPost(req);
            break;
        default:
            req.body = "";
            break;
    }

}