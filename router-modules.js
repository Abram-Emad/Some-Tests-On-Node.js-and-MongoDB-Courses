const express = require('express');
let title = require('./modules');

const router = express.Router();

router.get('/me', (req, res, next) => {
    res.send(title.titleThree)
});

router.get('/company', (req, res, next) => {
    res.send(title.titleFour)
});

router.get('/services', (req, res, next) => {
    res.send(title.titleFive)
});

module.exports = router;