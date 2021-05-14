const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const Joi = require("joi");
const bodyParser = require('body-parser');
const logger = require('morgan');

const v1 = require('./routes/v1');



////============ database ============//
mongoose.connect(process.env.MONGO_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on('connected',() => {
    console.log('connect saccesfoly');
});
mongoose.connection.on('error',(err) => {
    console.error(`failed connect to database: ${err} `);
});


////============ middlewares ============//
app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

////============ routes ============//
const courses = [
    { id: 1, name: "courses1" },
    { id: 2, name: "courses2" },
    { id: 3, name: "courses3" },
];

app.get('/',(req, res) => {
    res.send("hello word");
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
    course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("the id not finded")
    res.send(course);
});

// post from server to the API
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// put (update resurse) old = new data (modify)
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("the id not finded")
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course)
});

// delete for deleting the old data(supprimer)
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("the id not finded")
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course)
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
    
}
app.use('/api/v1',v1);

//----------------------error------------------//



module.exports = app;