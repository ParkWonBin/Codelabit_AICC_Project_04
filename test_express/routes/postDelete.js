const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../dbconfig');

router.post('/:postid', async(req, res) => {
    const postid = req.params.postid;

    const conn = await oracledb.getConnection(dbConfig);

    const sql = 'delete from posts where postid = :postid';
    const bind = {postid: postid};

    await conn.execute(sql, bind);

    await conn.commit();

    res.redirect('postMain');
});

module.exports = router;