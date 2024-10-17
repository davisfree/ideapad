const express = require("express");
const responseQuery = require("../../models/response-query");
const router = new express.Router();
module.exports = router;

// request  - 请求对象，传递请求的参数
// response - 响应对象，发送数据
router.post("/all", (request, response) => {
  let sql = "SELECT * FROM images;";
  responseQuery(response, sql);
});

router.post("/upload", (request, response) => {
  let sql = "INSERT INTO images(title, url) VALUES";

  if (request.files.length == 1) {
    sql += `("${request.body.titles}","${request.files[0].filename}")`;
  } else {
    for (let index in request.files) {
      if (index > 0) {
        sql += ",";
      }
      sql += `("${request.body.titles[index]}","${request.files[index].filename}")`;
    }
  }
  responseQuery(response, sql);
});
