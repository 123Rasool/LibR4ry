const db = require("../db")

async function register(username) {
    return new Promise(async (resolve, reject) => {
        try {
            await db.run(`INSERT INTO User(username) VALUES(?)`, [username], (err) => {
                if (err) {
                    logger.log("registering user with username :" + username + err.message)
                    if (err.message.indexOf("UNIQUE constraint failed") < 0)
                        reject(err.message);
                    else
                        resolve(true);
                } else {
                    resolve(true);
                }
            });

        } catch (error) {
            reject();
        }
    });

}



module.exports = { register }