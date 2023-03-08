const fs = require("node:fs");

let filePath = "";
let errorMessage = "";

const getDateTime = () => new Date().toUTCString().slice(5, 25);


function init(logPath = "logs") {
    const initTime = getDateTime();
    // filePath = `${logPath}/log-${initTime}.txt`;
    filePath = `${logPath}/log.txt`;
    try {
        fs.appendFileSync(filePath, `init logging libr4ry server on ${initTime}\n`);
        return true;
    } catch (error) {
        errorMessage = error.message;
    }
}

const log = function (data) {
    fs.appendFile(filePath,
        `${getDateTime()} > ${data}\n`,
        "utf-8",
        (err) => {
            if (err) {
                console.log("Cant log", err);
            }
        });

}

const logArray = function (dataArray) {
    let data = dataArray.reduce((pre, cur, curI) => `${pre}\t\t${curI}: ${cur}\n`
        , `${getDateTime()} > arrays of data
=====================================\n`);

    fs.appendFile(filePath,
        data + "=====================================\n",
        "utf-8",
        (err) => {
            if (err) {
                console.log("Cant log", err);
            }
        });

}

const getError = function () { return errorMessage; }

module.exports = {
    init,
    log,
    logArray,
    getError
}