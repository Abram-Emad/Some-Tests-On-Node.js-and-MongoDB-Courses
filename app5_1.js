// Require modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

// Connection url
const dbUrl = 'mongodb://localhost:27017/appDb';

// Port
const port = 7200;

let userSchema = mongoose.Schema({
    name: String,
    age: Number
});

let User = mongoose.model('users', userSchema)

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'ejs-files');

app.use(express.static(path.join(__dirname, 'statics')));

app.get('/', (req, res, next) => {
    mongoose.connect(dbUrl, {useNewUrlParser: true}, (error) => {        
        User.find({}, (error, users) => {
            mongoose.disconnect()
            res.render('html7', {
            users: users
            })
        })
        
    });
    
});

app.post('/', bodyParser.urlencoded({extended: true}), (req, res, next) => {
    mongoose.connect(dbUrl, {useNewUrlParser: true}, (error) => {        
        console.log('Connection with database is done');
        let newUser = new User({
            name: req.body.name,
            age: req.body.age
        });
        newUser.save((error, result) => {
            console.log(result)
            res.redirect('/')
            mongoose.disconnect()
        });
    });
});

/*

app.post('/', bodyParser.urlencoded({extended: true}), (req, res, next) => {
    mongoose.connect(dbUrl, { useNewUrlParser: true }, (error) => {       
        User.updateOne({name: req.body.name},{age: req.body.age}, (error, result) => {
            console.log(result)
            res.redirect('/')
            mongoose.disconnect()
        })
    });
});

app.post('/', bodyParser.urlencoded({extended: true}), (req, res, next) => {
    mongoose.connect(dbUrl, {useNewUrlParser: true}, (error) => {        
        User.findOne({ name: req.body.name }, (error, user) => {
            user.age = req.body.age
            user.save((error) => {
                res.redirect('/')
                mongoose.disconnect()
            })
        })
    })
});

app.post('/', bodyParser.urlencoded({extended: true}), (req, res, next) => {
    mongoose.connect(dbUrl, { useNewUrlParser: true }, (error) => {       
        User.deleteOne({name: req.body.name}, (error, result) => {
            console.log(result)
            res.redirect('/')
            mongoose.disconnect()
        })
    });
});

*/


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});