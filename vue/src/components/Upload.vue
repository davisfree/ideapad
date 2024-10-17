<template>
  <div class="upload">
    <input
      class="title"
      type="text"
      :disabled="url == null"
      placeholder="图片标题"
      v-model="title"
    />

    <div class="image">
      点击选择图片
      <img v-if="url" :src="url" />
      <input
        class="select"
        type="file"
        title=""
        accept="image/*"
        @change="onChange"
      />
    </div>

    <button class="btn" @click="onUpload">上传</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Upload",
  data() {
    return {
      title: "",
      file: null,
      url: null,
    };
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
      this.title = this.file.name.slice(0, this.file.name.lastIndexOf("."));
    },

    onUpload() {
      if (this.url == null) {
        return;
      }

      // 1.创建上传数据对象
      let data = new FormData();
      // 2.添加上传数据
      data.append("title", this.title);
      data.append("files", this.file);
      // 3.axios发送请求
      axios
        .post("/image/upload", data)
        .then((response) => {
          response = response.data;
          if (response.status == "ok") {
            alert("上传成功！");
            this.file = null;
            this.url = null;
            this.title = "";
          } else {
            alert("上传失败！");
          }
        })
        .catch(() => {
          alert("网络连接出错！");
        });
    },
  },
};
</script>

<style lang="less">
@import url("./styles/Upload.less");
</style>
