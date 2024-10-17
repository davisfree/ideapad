// 1.导入MYSQL服务器模块
const mysql = require("mysql2");

// 2.创建连接池
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "images",
  connectionLimit: 10,
});

// let sql = "SELECT * FROM images";

// 3.获取连接
// pool.getConnection((error, connection) => {
//   if (error) {
//     // 4.连接出错
//     console.log(error);
//   } else {
//     // 5.获取成功，进行查询
//     connection.query(sql, (error, results) => {
//       // 8.释放连接
//       connection.release();

//       if (error) {
//         // 6.查询失败
//         console.log(error);
//       } else {
//         // 7.显示查询结果
//         console.log(results);
//       }
//     });
//   }
// });

// 用Promise定义查询函数
function query(sql, params) {
  // resolve - 返回成功的结果
  // reject  - 返回出错的原因
  return new Promise((resolve, reject) => {
    // 1.获取连接connection
    pool.getConnection((error, connection) => {
      if (error) {
        // 2.连接失败
        reject(error);
      } else {
        // 3.通过连接,执行查询
        connection.query(sql, params || [], (error, results) => {
          // 4.释放连接
          connection.release();

          if (error) {
            // 5.查询失败
            reject(error);
          } else {
            // 6.查询成功
            resolve(results);
          }
        });
      }
    });
  });
}


// // 使用Promise
// query(sql)
//   .then((results) => {
//     console.log(results);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// 导出query函数
module.exports = query;
