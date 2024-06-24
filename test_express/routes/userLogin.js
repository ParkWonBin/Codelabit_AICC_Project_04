const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../dbconfig');

router.get('/', async(req, res) => {
    res.render('userlogin');
});

router.post('/', async(req, res) => {
    const {username, password} = req.body;

    const conn = await oracledb.getConnection(dbConfig);

    const sql = 'select username, password from users where username = :username and password = :password';
    const bind = {
        username: username,
        password: password
    }

    const result = await conn.execute(sql, bind);

    if(result.rows.length > 0){
        req.session.username = username;
        res.redirect('/postMain');
    }

    else{
        res.redirect('/');
    }
});

module.exports = router;