const userController = require("./user/userController");
const libraryController = require("./Library/libraryController");

const utils = require("../server/ServerUtils")


router.addRoute("get", "/", index)
function index(req, res) {
    if (req.username) {
        res.writeHead(302, { "Location": "/Library" }).end();
    } else {
        res.writeHead(302, { "Location": "/Login" }).end();
    }
}

router.addRoute("get", "/Login", Login)
function Login(req, res) {
    utils.getHtml(process.cwd() + "/views/Login.html", req, res)
}

router.addRoute("get", "/Logout", Logout)
function Logout(req, res) {
    res.writeHead(302, {
        "Set-Cookie": `username=${null}`,
        "Location": "/Login",
    }).end();
}