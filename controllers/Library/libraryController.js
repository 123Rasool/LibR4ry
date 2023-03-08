const router = require("../../server/router")
// const user = require("../../dataAccess/userService");
const utils = require("../../server/ServerUtils")

router.addRoute("get", "/Library", Login)
function Login(req, res) {
    utils.getHtml(process.cwd() + "/views/Library.html", req, res)
}
