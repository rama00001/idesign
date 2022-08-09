const db = require('./db.js').connection
const jwt = require("jsonwebtoken")



const userRegistration = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    const isAccepted = req.body.isAccepted;

    const query = "insert into users (name,email,role,password,isAccepted) values(?,?,?,?,?)"

    db.query(query, [name, email, role, password, isAccepted], (error, result) => {
        if (error) {
            res.json({ error });
        }
        else {
            res.json({ message: "Successfully inserted", result });
        }
    })

}

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = "select * from users where email= ? AND password = ? "

    db.query(query, [email, password], (error, result) => {
        if (error) {
            res.json(error)
        }
        else {
            if (result.length < 0) {
                res.json({ message: "invalid email or pwd" })
            }
            else {
                var token = jwt.sign({ id: result[0].id }, 'shhhhh');
                const query = "update users SET token =? where id =?"
                db.query(query, [token, result[0].id], (error, result1) => {
                    if (error) {
                        res.json(error)
                    }
                    else {
                        const query = "select * from users where id =?"
                        db.query(query, [result[0].id], (error, result2) => {
                            if (error) {
                                res.json(error)
                            }
                            else {
                                res.json(result2);
                            }
                        })
                    }
                })

            }
        }
    })

}
module.exports.userRegistration = userRegistration;
module.exports.login = login;



