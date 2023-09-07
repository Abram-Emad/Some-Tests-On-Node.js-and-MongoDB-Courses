// Require modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;

// Connection url
const dbUrl = 'mongodb://localhost:27017';

// Database Name
const dbName = 'users';

// Collection Name
const coName = 'firstUser';

// Port
const port = 9800;

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'ejs-files');

app.use(express.static(path.join(__dirname, 'statics')));

app.get('/', (req, res, next) => {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
        const db = client.db(dbName);
    
        db.collection(coName).find({
            /*
            age: {
                $gt: 21,
                $gte: 21,
                $lt: 21,
                $lte: 21,
                $ne: 21,
                $in: [21, 50, 20],
                $nin: [21, 50, 20],
            },*/
            _id: new objectId("62e1ec1688f5d5c7c1563797")
        }, {// skip: 2,
            /*
            sort: {
                age: 1,
                name: 1
            },
            */
            sort: [['age',1], ['name',1]]
        }).limit(5).toArray().then(firstUser => {
            console.log(firstUser)
            res.render('html6', {
                firstUser: firstUser
            })
            client.close();
        })
    });
    
});

app.post('/', bodyParser.urlencoded({extended: true}), (req, res, next) => {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
        const db = client.db(dbName);
        db.collection(coName).insertOne({
            name: req.body.name,
            age: +req.body.age
        }).then(result => {
            console.log(result)
            res.redirect('/')
        client.close();});
        
    });
});

/*
app.post('/', bodyParser.urlencoded({extended: true}), (req, res, next) => {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
        const db = client.db(dbName);
        db.collection(coName).updateOne({
            name: req.body.name
        }, {
            $set: {
                age: +req.body.age
            }
        }).then(result => {
            console.log(result)
            res.redirect('/')
            client.close();});
    });
});

app.post('/', bodyParser.urlencoded({extended: true}), (req, res, next) => {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
        const db = client.db(dbName);
        db.collection(coName).deleteOne({
            name: req.body.name
        }).then(result => {
            console.log(result)
            res.redirect('/')
            client.close();});
    });
});
*/

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});