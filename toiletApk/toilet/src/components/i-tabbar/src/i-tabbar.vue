<template>
  <div class="i-tabbar">
    <div
      v-for="(item, index) in menu"
      :key="item.index"
      class="tabbar-item"
      @click="goPath(item.path)">
      <div class="tabbar-item-icon"><i :class="index === currentIndex ? `${item.icon}_active` : item.icon"></i></div>
      <div class="tabbar-item-text" :class="{'active': index === currentIndex}">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ITabbar',
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return { currentIndex: 0 };
  },
  mounted () {},
  methods: {
    goPath (path) {
      this.$router.push({ path: path, query: { cache: true }});
    }
  },
  watch: {
    '$route.path': function (newPath, oldPath) {
      this.currentIndex = this.menu.findIndex((item) => newPath.includes(item.path));
    }
  }
};

</script>

<style lang="scss" scoped>

.i-tabbar {
  position: relative;
  width: 100%;
  height: 56px;
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ebedf0;

  .tabbar-item {
    position: relative;
    width: 64px;
    height: 100%;

    &-icon {
      position: relative;
      width: 22px;
      height: 22px;
      margin: 8px auto 0;
    }

    &-text {
      position: relative;
      width: 100%;
      height: 12px;
      margin: 4px auto 0;
      font-size: 12px;
      color: #333333;
      text-align: center;

      &.active {
        color: #2080f7;
      }
    }
  }
}

</style>
