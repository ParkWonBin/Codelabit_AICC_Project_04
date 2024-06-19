const express = require('express');
const app = express();
const session = require('express-session');
const oracledb = require('oracledb');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

oracledb.initOracleClient({libDir: 'C:\\JHLee\\Util\\instantclient_21_13_window'});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use('/img', express.static(path.join(__dirname, 'img')))

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use('/', require('./routes/index'));
app.use('/userCreate', require('./routes/userCreate'));
app.use('/postMain', require('./routes/postMain'));
app.use('/postCreate', require('./routes/postCreate'));
app.use('/postRead', require('./routes/postRead'));
app.use('/postDelete', require('./routes/postDelete'));
app.use('/postUpdate', require('./routes/postUpdate'));
app.use('/userPwChange', require('./routes/userPwChange'));
app.use('/userDelete', require('./routes/userDelete'));
app.use('/userLogin', require('./routes/userLogin'));
app.use('/myPage', require('./routes/myPage'));


app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));