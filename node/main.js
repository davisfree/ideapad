const express = require("express");
const multer = require("multer");

const app = express();
const port = 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));

// 加载静态文件中间件
app.use("/", express.static("./public")); // 指定"./public"为服务器根目录
app.use("/", express.static("../vue/dist")); // 指定"../vue/dist"为服务器根目录
// app.use(express.urlencoded({
//   extended: false
// }))
app.use(express.json());

// 安装POST中间件
// 1.初始化文件接收目录
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // 保存文件的目录
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        req.body.title +
        file.originalname.substring(file.originalname.lastIndexOf("."))
    ); // 文件名
  },
});
// 2.创建multer中间件对象
const post = multer({ storage: storage });
// 3.使用multer处理所有请求
app.use(post.any());

const responseQuery = require("./models/response-query");

app.get("/image/all", (request, response) => {
  const sql = "SELECT COUNT(*) AS total FROM images WHERE deleted=0";
  responseQuery(response, sql);
});

app.post("/image/all", (request, response) => {
  const sql = "SELECT * FROM images WHERE deleted=0 LIMIT ?,?;";
  const params = [request.body.start, request.body.count];
  responseQuery(response, sql, params);
});

app.post("/image/upload", (request, response) => {
  const sql = "INSERT INTO images(title, url) VALUES(?,?);";
  const params = [request.body.title, request.files[0].filename];
  responseQuery(response, sql, params);
});

app.post("/image/delete/:id", (request, response) => {
  const sql = "UPDATE images SET deleted=1 WHERE id=?";
  const params = [request.params.id];
  responseQuery(response, sql, params);
});
