const mySql = require('mysql');
const connection = mySql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "patheon"
    }
);
module.exports = { connection }



