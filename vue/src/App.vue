<template>
  <div class="app">
    <NavBar @path="onPath" />
    <component :is="path" :maxCount="5"></component>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Home from "./components/Home.vue";
import Upload from "./components/Upload.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Home,
    Upload,
  },
  data() {
    return {
      path: "Home",
    };
  },
  methods: {
    onPath(path) {
      if (this.path != path) {
        this.path = path;
      }
    },
  },
};
</script>

<style lang="less">
@import url("./App.less");
</style>
