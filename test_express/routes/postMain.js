const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

router.get('/', async(req, res) => {
    res.render('postMain');
});

router.post('/', async(req, res) => {
    req.session.username = null;
    res.redirect('/');
});

module.exports = router;