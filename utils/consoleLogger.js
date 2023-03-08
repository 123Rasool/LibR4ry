const log = (str) => console.log(`> ${str}`);

const logArray = function (dataArray) {
    console.log(`> arrays of data
==========================`);
    dataArray.forEach((data,dataIndex) => {
        console.log(`\t${dataIndex}: ${data}`);
    });
    console.log("==========================");
    
}

module.exports = {
    log,
    logArray
}