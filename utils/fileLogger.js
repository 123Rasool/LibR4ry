const fs = require("node:fs");

this.filePath = "";
this.errorMessage = "";

const getDateTime = () => new Date().toUTCString();


function init(logPath = "logs") {
    const initTime = getDateTime();
    filePath = `${logPath}/log-${initTime}.txt`;
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
    const data = `arrays of data at ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}\n`
    data = dataArray.reduce((pre, cur, curI) => `${pre}${cur}\n`, data);
    fs.appendFile(filePath,
        data,
        "utf-8",
        (err) => {
            if (err) {
                console.log("Cant log", err);
            }
        });

}

const getError = function () { return this.errorMessage; }

module.exports = {
    init,
    log,
    logArray,
    getError
}