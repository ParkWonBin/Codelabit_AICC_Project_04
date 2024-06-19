const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../dbConfig');

router.get('/', async(req, res) => {
    res.render('postCreate');
});

router.post('/', async(req, res) => {
    const {postid, title, content} = req.body;

    const conn = await oracledb.getConnection(dbConfig);

    const sql = 'insert into posts (postid, title, content, author) values (:postid, :title, :content, :author)';
    const bind = {
        postid: postid,
        title: title,
        content: content,
        author: req.session.username
    };

    await conn.execute(sql, bind);

    await conn.commit();

    res.redirect('/postMain')
});

module.exports = router;