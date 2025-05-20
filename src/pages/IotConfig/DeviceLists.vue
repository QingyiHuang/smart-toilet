<template>
  <h-page-container v-loading.fullscreen.lock="pageLoading">
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" return-icon />
    <h-page-content style="padding: 0">
      <TableLists ref="tableList" />
    </h-page-content>
  </h-page-container>
</template>

<script>
import TableLists from './components/TableLists.vue';
export default {
  components: {
    TableLists
  },
  data() {
    return {
      //  系统管理 > 应用配置中心 > 智慧公厕监管应用 >物联设备管理
      breadcrumb: [
        '系统管理',
        '应用配置中心',
        '智慧公厕监管应用',
        '物联设备管理',
        '关联设备'
      ],
      pageLoading: false
    };
  },
  activated() {
    this.$refs.tableList.queryTableAll();
  },
  methods: {
    pageLoad(val) {
      if (val) {
        this.pageLoading = true;
      } else {
        this.pageLoading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.h-page-content {
  padding: 0 0 0 12px;
}
</style>
