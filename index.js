const express = require('express')
const app = express()
const port = 3000
var HttpStatus = require('http-status-codes');

var userList = ["Veli", "Ahmet", "Mehmet"]


app.listen(port, () => console.log(`Example app listening on port port!`))

app.use(express.json());

app.get('/users', (req, res) => {

    res.json(userListMap()).sendStatus(HttpStatus.OK)
})

app.use(function (err, req, res, next) {
    const {
        key
    } = req.headers

    if (key == "veli") {


        next();
    } else {
        // res.status(404).send();
        // const error = Error("AAA");
        // // next(error);

        throw new Error("AAA")
    }
});


const Joi = require('joi');
const loginSchema = Joi.object().keys({
    username: Joi.string()
        .min(3),
    .max(10),
    .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});

app.post('/login', function (req, res) {
    const valid = Joi.validate(req.body, loginSchema).error === null;
    if (!valid) {
        res.status(422).json({
            status: 'error'
            message: 'Invalid request data'
            data: req.body
        });
    } else {
        // happy days - login user
        res.send(`ok`);
    }
});




function userListMap() {
    return userList.map(value =>

        ({
            "name": value
        })

    );
}

app.post('/users', function (req, res) {
    const {
        name
    } = req.body;

    userList.push(name);
    res.sendStatus(HttpStatus.OK);
})

app.delete('/users/:name', function (req, res) {
    const {
        name
    } = req.params;

    userList = userList.filter(user => {
        return user != name;
    });
    res.send(userListMap());
});

app.put('/users/:name', function (req, res) {
    const {
        name
    } = req.params;



    const {
        newName
    } = req.query
    userList = userList.map(user => {
        return user == name ? newName : user;
    });

    res.send(userListMap());
});