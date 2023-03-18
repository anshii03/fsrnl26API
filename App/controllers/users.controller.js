const path = require('path');
const usersModel = require(path.join(__dirname, '../model/users.model'));
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {

    const { fullName, email, password, role } = req.body;

    const user = new usersModel({ fullName, email, password: bcrypt.hashSync(password, 10), role });


    user.save()
        .then(data => {

            console.log("data", data)
            res.send({ message: "User registered successfully", data: data });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while registering user" })
        })
}

exports.login = (req, res) => {

    const { email, password } = req.body;

    usersModel.findOne({ email: email })
        .then(data => {
            console.log("Data", data);
            if (!data) {
                res.status(404).send({ message: "email not found" })
            }

            // compare passwords
            var isPasswordValid = bcrypt.compareSync(password, data.password);

            if (!isPasswordValid) {
                res.status(401).send({ message: "Invalid Password" })
            }

            var token = jwt.sign({ id: data._id }, process.env.SECRET);

            res.send({
                user: {
                    id: data._id,
                    email: data.email,
                    fullName: data.fullName,
                    role: data.role
                },
                accessToken: token
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}



