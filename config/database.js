const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'chatting.cx3635ohpt8d.ap-northeast-2.rds.amazonaws.com',
    user: 'root',
    port: '3306',
    password: 'chat1234',
    database: 'baemin'
});

module.exports = {
    pool: pool
};