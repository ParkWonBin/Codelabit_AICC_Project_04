const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../dbConfig');

router.get('/', async(req, res) => {
    const conn = await oracledb.getConnection(dbConfig);

    const sql = 'select postid, title, content, author from posts order by postid asc';
    const result = await conn.execute(sql);

    let posts = {data:[]};

    for(let i = 0; i < result.rows.length; i++){
        const data = {
            postid: result.rows[i][0],
            title: result.rows[i][1],
            content: result.rows[i][2],
            author: result.rows[i][3]
        };
        posts.data.push(data);
    }

    const bind = {
        posts: posts,
        username: req.session.username
    }

    res.render('postRead', bind);
});

module.exports = router;