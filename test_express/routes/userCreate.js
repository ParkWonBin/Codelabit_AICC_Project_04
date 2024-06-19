const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../dbconfig');

router.get('/', async(req, res) => {
   res.render('userCreate');
});

router.post('/', async(req, res) => {
    const {username, password, confirmPassword} = req.body;

    if(password !== confirmPassword){
        return res.status(400).send('비밀번호가 일치하지 않습니다.');
    }

    const conn  = await oracledb.getConnection(dbConfig);

    const sql = 'insert into users (username, password) values (:username, :password)';
    const bind = {
        username: username,
        password: password
    }

    await conn.execute(sql, bind);

    await conn.commit();

    res.redirect('/');
});

module.exports = router;