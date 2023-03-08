const router = require("../../server/router")
const user = require("../../dataAccess/userService");
const utils = require("../../server/ServerUtils")


router.addRoute("post", "/register", register)
async function register(req, res) {
    try {

        const { username } = req.body;

        if (!username) {
            res.writeHead(400);
            return res.json({
                error: true,
                message: "username is required",
            });
        } else {
            await user.register(username).then((resolved, rejected) => {
                if (resolved) {
                    res.writeHead(302, {
                        "Set-Cookie": `username=${username}`,
                        "Location": "/Library",
                    }).end("done");
                }
                else {
                    utils.errResponse(res, rejected);
                }
            });


        }

    } catch (error) {
        if (error) {
            logger.log(error.message);
            utils.errResponse(res, error.message);
        }
    }
}