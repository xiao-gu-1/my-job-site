// backend/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sh-cynosdbmysql-grp-jmpp4bq2.sql.tencentcdb.com',      // 例：sh-cynosdbmysql-grp-xxxx.sql.tencentcdb.com
  port: 28803,                // 你的外网端口
  user: 'abc1',
  password: 'abc11111!!',
  database: 'weather_app'
});

connection.connect(err => {
  if (err) {
    console.error('数据库连接失败:', err);
  } else {
    console.log('MySQL 连接成功');
  }
});

module.exports = connection;