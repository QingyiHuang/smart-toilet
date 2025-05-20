<template>
  <h-page-container v-loading.fullscreen.lock="pageLoading">
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
    <h-page-content>
      <EquipLists ref="equipList" @pageLoad="pageLoad" />
    </h-page-content>
  </h-page-container>
</template>

<script>
import EquipLists from './components/EquipLists.vue';
export default {
  components: {
    EquipLists
  },
  data() {
    return {
      //  系统管理 > 应用配置中心 > 智慧公厕监管应用 >物联设备管理
      breadcrumb: [
        '系统管理',
        '应用配置中心',
        '智慧公厕监管应用',
        '物联设备管理'
      ],
      pageLoading: false
    };
  },
  activated() {
    this.$refs.equipList.pageQueyToilet();
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
