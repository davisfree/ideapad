<template>
  <div class="home" v-if="images.length > 0">
    <h1 class="title">{{ images[current].title }}</h1>
    <div class="image">
      <img :src="`./images/${images[current].url}`" />
      <Close @click="onDelete" />
    </div>

    <div class="index">
      <span v-if="start > 0" @click="onPrev">上一页</span>
      <span
        v-for="index in count"
        :key="start + index"
        :class="{ current: current == start + index - 1 }"
        @click="onSelect(start + index - 1)"
        >{{ start + index }}</span
      >
      <span v-if="start + count < total" @click="onNext">下一页</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Close from "./Close.vue";

export default {
  name: "Home",
  components: {
    Close,
  },
  props: {
    // 每页显示最大个数
    maxCount: {
      type: Number,
      default: 10,
    }
  },
  data() {
    return {
      images: [
        // {
        //   id: 1,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 2,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 3,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
        // {
        //   id: 4,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 5,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 6,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
        // {
        //   id: 7,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 8,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 9,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
        // {
        //   id: 10,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 11,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 12,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
        // {
        //   id: 13,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 14,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 15,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
        // {
        //   id: 1,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 2,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 3,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
        // {
        //   id: 4,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 5,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 6,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
        // {
        //   id: 7,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 8,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 9,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
        // {
        //   id: 10,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 11,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 12,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
        // {
        //   id: 13,
        //   title: "山水,树林",
        //   url: "1.jpg",
        // },
        // {
        //   id: 14,
        //   title: "山丘,草地",
        //   url: "2.jpg",
        // },
        // {
        //   id: 15,
        //   title: "林肯纪念馆",
        //   url: "3.jpg",
        // },
      ],

      current: 0, // 当前图片序号
      start: 0, // 当前页面的第一张图片的序号
      count: 0, // 当前页面的图片数，最大数为10
      total: 0, // 总的图片数
    };
  },
  methods: {
    onSelect(index) {
      this.current = index;
    },
    onDelete() {
      axios
        .post(`/image/delete/${this.images[this.current].id}`)
        .then((response) => {
          response = response.data;
          if (response.status == "ok") {
            alert("删除成功！");

            this.images.splice(this.current, 1);
            this.total--;
            this.update();
          } else {
            alert("删除失败！");
          }
        })
        .catch(() => {
          alert("网络连接错误！");
        });
    },
    onPrev() {
      if (this.start > 0) {
        this.start -= this.maxCount;
        this.update();
      }
    },
    onNext() {
      if (this.start + this.count < this.total) {
        this.start += this.maxCount;
        this.update();
      }
    },
    update() {
      let next = Math.min(this.start + this.maxCount, this.total);
      if (next > this.images.length) {
        axios
          .post("/image/all", {
            start: this.images.length,
            count: this.maxCount,
          })
          .then((response) => {
            response = response.data;
            if (response.status == "ok") {
              this.images.push(...response.data);
              this.change();
            } else {
              alert("数据库操作错误！");
            }
          })
          .catch((error) => {
            console.log("网络链接错误！");
          });
      } else {
        this.change();
      }
    },
    change() {
      let length = this.images.length;
      if (this.total < length) {
        this.total = length;
      }
      if (this.start < length) {
        this.count = Math.min(this.maxCount, length - this.start);
      }
      
      // 更新当前图片位置
      if (this.current < this.start) {
        this.current = this.start;
      } else if (this.current >= this.start + this.count) {
        this.current = this.start + this.count - 1;
      }
    },
  },
  mounted() {
    axios
      .get("/image/all")
      .then((response) => {
        response = response.data;
        if (response.status == "ok") {
          this.total = response.data[0].total;
          this.update();
        } else {
          alert("数据库操作出错！");
        }
      })
      .catch((error) => {
        alert("网络连接错误！");
      });
  },
};
</script>

<style lang="less">
@import url("./styles/Home.less");
</style>
