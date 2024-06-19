const express = require('express');
const router = express.Router();
const {query} = require('express');
const oracledb = require('oracledb');
const dbConfig = require('../dbconfig');

router.post('/edit', (req, res) => {
    const {postid, title, content} = req.body;

    const bind = {
        postid: postid,
        title: title,
        content: content
    }

    res.render('postUpdate', bind)
});

router.post('/', async(req, res) => {
    const conn = await oracledb.getConnection(dbConfig);

    const {postid, title, content} = req.body;

    const sql = 'update posts set title = :title, content = :content where postid = :postid';
    const bind = {
        postid: postid,
        title: title,
        content: content
    }

    await conn.execute(sql, bind);

    await conn.commit();

    res.redirect('/postMain');
});

module.exports = router;