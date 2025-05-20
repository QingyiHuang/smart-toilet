<template>
  <div class="layout1">
    <div class="layout-header"><i-nav :title="title" @goback="handleGoback"></i-nav></div>
    <div class="layout-content">
      <transition :name="$direction"><keep-alive :include="whiteList" :exclude="blackList" ><router-view></router-view></keep-alive></transition>
    </div>
    <div class="layout-footer"><i-tabbar :menu="menu"></i-tabbar></div>
  </div>
</template>

<script>

export default {
  name: 'Layout1',
  computed: {
    title () {
      return this.$route.meta.title;
    }
  },
  data () {
    return {
      menu: [
        {
          icon: 'icon-tabbar-home', path: '/page1', index: 'page1', name: 'page1' 
        },
        {
          icon: 'icon-tabbar-search', path: '/page2', index: 'page2', name: 'page2' 
        },
        {
          icon: 'icon-tabbar-car', path: '/page3', index: 'page3', name: 'page3' 
        },
        {
          icon: 'icon-tabbar-setting', path: '/page4', index: 'page4', name: 'page4' 
        }
      ],
      whiteList: [],
      blackList: []
    };
  },
  methods: {
    handleGoback () {
      this.menu.map((menu) => menu.path).includes(this.$route.path) ? this.$router.push({ path: '/index' }) : this.$router.go(-1);
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

.layout1 {
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
    height: calc(100% - 100px);
    overflow: hidden;
    background: #eaeaea;
  }

  .layout-footer {
    position: relative;
    width: 100%;
    height: 56px;
  }
}

</style>
