const db = require('./db.js').connection

const createUser = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    let isAccepted = req.body.isAccepted;
    let salary = req.body.salary;
    let city = req.body.city;
    let token = req.body.token;


    const query = `INSERT INTO users( name,email,password,role,isAccepted,salary,city,token) VALUES (?,?,?,?,?,?,?,?)`;
    db.query(query, [name, email, password, role, isAccepted, salary, city, token], function (err, data) {
        if (err) {

        }
        else {

        }
    })
}

const userList = (req, res) => {
    const limit = 5;
    const page = req.query.page;
    const offset = (page - 1) * limit
    const prodsQuery = "select * from users limit " + limit + " OFFSET " + offset
        db.query(prodsQuery, function (error, results, fields) {
            // db.release();
            if (error) throw error;
            var jsonResult = {
                'user_page_count': results.length,
                'page_number': page,
                'users': results
            }
            // create response
            var myJsonString = JSON.parse(JSON.stringify(jsonResult));
            res.statusMessage = "Users for page " + page;
            res.statusCode = 200;
            res.json(myJsonString);
            res.end();
        })
}


const findBycity = (req, res) => {
    const city = req.params.city;
    console.log(city);
    const query = "select * from users where city = ?"
    console.log(query);
    db.query(query, [city], (error, result) => {
        console.log(result)
        if (error) {
            res.json({ error });
        }
        else {
            res.json(result);
        }
    })

}


module.exports.userList = userList;
module.exports.findBycity = findBycity;
module.exports.createUser = createUser;
