<template>
  <h-page id="app" class="main-wrapper">
    <h-page-menu :menu="menu" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </h-page>
</template>

<script>
import navList from '@/router/nav.config';

export default {
  name: 'App',
  computed: {
    menu() {
      navList.map(nav => {
        nav.title = this.$t ? this.$t(nav.title) : nav.title;
      });
      // 运行态不展示
      if (process.env.NODE_ENV !== 'development') {
        return [];
      } else {
        return navList;
      }
    }
  },
  watch: {
    $route(to, from) {
      // 在历史告警页面需要修改主题
      if (to.path === '/HistoryAlarm' || to.path === '/Score') {
        document.body.classList.add('style-diy');
      } else {
        document.body.classList.remove('style-diy');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.main-wrapper {
  height: 100%;
}
</style>
