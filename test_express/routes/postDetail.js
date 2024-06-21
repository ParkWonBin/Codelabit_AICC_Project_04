const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../dbconfig');

router.get('/:postid', async(req, res) => {
    const postid = req.params.postid;

    const conn = await oracledb.getConnection(dbConfig);

    const sql = 'select title, author, content from posts where postid = :postid';
    const bind = {postid: postid};

    const detail = await conn.execute(sql, bind);

    const postdetail = {
        title: detail.rows[0][0],
        author: detail.rows[0][1],
        content: detail.rows[0][2]
    };

    res.render('postDetail', {
        postdetail: postdetail
    });


});

module.exports = router;