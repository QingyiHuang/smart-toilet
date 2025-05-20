<template>
  <h-page-container v-loading.fullscreen.lock="diyLoading">
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" return-icon />
    <h-page-content style="padding: 0">
      <div class="details">
        <h-page-group title="基本信息">
          <h-page-detail>
            <h-page-detail-item label="设备名称">
              {{ tableData.name }}
            </h-page-detail-item>
            <h-page-detail-item label="设备编码">
              {{ tableData.sn }}
            </h-page-detail-item>
            <h-page-detail-item label="设备类型">
              {{ tableData.deviceTypeName }}
            </h-page-detail-item>
            <h-page-detail-item label="权属单位">
              {{ tableData.ownershipUnit }}
            </h-page-detail-item>
            <h-page-detail-item label="在线状态">
              {{ tableData.onlineStatusName }}
            </h-page-detail-item>
            <h-page-detail-item label="注册日期">
              {{ tableData.createTime }}
            </h-page-detail-item>
            <h-page-detail-item
              v-if="tableData.deviceType === 'FLOW_STATISTIC'"
              label="客流数"
            >
              {{ tableData.personNum || '--' }}
            </h-page-detail-item>
          </h-page-detail>
        </h-page-group>
      </div>
    </h-page-content>
  </h-page-container>
</template>

<script>
import DeviceApi from '@/api/device';
export default {
  data() {
    return {
      breadcrumb: [
        '系统管理',
        '应用配置中心',
        '智慧公厕监管应用',
        '物联设备管理',
        '详情'
      ],
      tableData: {},
      diyLoading: false
    };
  },
  // 初始化查询告警阈值
  created() {
    this.queryCommonDeviceDetail();
  },
  methods: {
    // 查询通用设备详情
    queryCommonDeviceDetail() {
      if (this.$route.query.id) {
        this.diyLoading = true;
        DeviceApi.getCommonDeviceDetail({
          id: this.$route.query.id
        })
          .then(res => {
            this.diyLoading = false;
            if (res.code === '0') {
              this.tableData = res.data;
            }
          })
          .catch(() => {
            this.diyLoading = false;
          });
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  padding: 40px;
  .image-size {
    height: 104px;
    width: 104px;
    margin-right: 12px;
    display: inline-block;
  }
}
</style>
