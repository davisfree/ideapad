const express = require("express");
const multer = require("multer");

const app = express();
const port = 3001;
app.listen(port, () => console.log(`http://localhost:${port}`));

// 加载静态文件中间件
app.use(express.static("./public"));
app.use(express.static("../vue-test/dist"));

// 设置存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
app.use(upload.any());

app.use("/image", require("./routes/image"))