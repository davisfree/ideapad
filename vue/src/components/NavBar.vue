<template>
  <div class="nav-bar">
    <div
      v-for="(menu, index) in menus"
      :key="index"
      :class="{ current: current == index }"
      @click="onSelect(index)"
    >
      {{ menu.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      menus: [
        {
          title: "浏览",
          path: "Home",
        },
        {
          title: "上传",
          path: "Upload",
        },
      ],
      current: 0,
    };
  },
  methods: {
    onSelect(index) {
      this.current = index;
      this.$emit("path", this.menus[index].path);
    }
  }
};
</script>

<style lang="less">
@import url("./styles/NavBar.less");
</style>
