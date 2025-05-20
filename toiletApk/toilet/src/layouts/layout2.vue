<template>
  <div class="layout2">
    <div class="layout-header"><i-nav :title="title" @goback="handleGoback"></i-nav></div>
    <div class="layout-content">
      <transition :name="$direction"><keep-alive :include="whiteList" :exclude="blackList" ><router-view></router-view></keep-alive></transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Layout2',
  computed: {
    title () {
      return this.$route.meta.title;
    }
  },
  data () {
    return {
      whiteList: [],
      blackList: []
    };
  },
  methods: {
    handleGoback () {
      this.$router.go(-1);
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (newRoute, oldRoute) {
        if (newRoute.meta.cache) {
          this.whiteList = Array.from(new Set([newRoute.name, ...this.whiteList]));
          this.blackList = this.blackList.filter((name) => name !== newRoute.name);
        } else {
          this.whiteList = this.whiteList.filter((name) => name !== newRoute.name);
          this.blackList = Array.from(new Set([newRoute.name, ...this.blackList]));
        }
      }
    }
  }
};

</script>

<style lang="scss" scoped>

.layout2 {
  position: relative;
  width: 100%;
  height: 100%;

  .layout-header {
    position: relative;
    width: 100%;
    height: 44px;
  }

  .layout-content {
    position: relative;
    width: 100%;
    height: calc(100% - 44px);
    overflow: hidden;
  }
}

</style>
