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
              v-if="tableData.alarmNum || tableData.alarmNum === 0"
              label="报警累计次数"
            >
              {{ tableData.alarmNum || '0' }}次
            </h-page-detail-item>
            <h-page-detail-item v-if="tableData.telcoTypeName" label="运营商">
              {{ tableData.telcoTypeName || '--' }}
            </h-page-detail-item>
            <h-page-detail-item v-if="tableData.personNum" label="客流量">
              {{ tableData.personNum || '--' }}
            </h-page-detail-item>
          </h-page-detail>
        </h-page-group>
        <h-page-group v-if="tableData.currentData" title="实时数据">
          <h-page-detail>
            <div class="fiveRow">
              <h-page-detail-item style="width: 100%" label="温度">
                {{ tableData.currentData.temperature || 0 }}℃
              </h-page-detail-item>
              <h-page-detail-item style="width: 100%" label="湿度">
                {{ tableData.currentData.humidity || 0 }}%
              </h-page-detail-item>
              <h-page-detail-item style="width: 100%" label="氨气">
                {{ tableData.currentData.nh3 || 0 }}ppm
              </h-page-detail-item>
              <h-page-detail-item style="width: 100%" label="硫化氢">
                {{ tableData.currentData.h2s || 0 }}ppm
              </h-page-detail-item>
              <h-page-detail-item style="width: 100%" label="PM2.5">
                {{ tableData.currentData.pm25 || 0 }}ug/m³
              </h-page-detail-item>
            </div>
          </h-page-detail>
        </h-page-group>
        <h-page-group
          v-if="tableData2.length"
          :title="`报警记录(共${total}条)`"
        >
          <h-page-detail>
            <div class="tableBox">
              <div class="warnRow">
                <el-table :data="tableData2" style="width: 100%">
                  <el-table-column prop="date" label="序号">
                    <template v-slot="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="alarmTypeName"
                    label="报警类型"
                  ></el-table-column>
                  <el-table-column
                    prop="alarmTime"
                    label="报警时间"
                  ></el-table-column>
                  <el-table-column prop="address" label="温度(℃)">
                    <template v-slot="scope">
                      {{
                        scope.row.data
                          ? JSON.parse(scope.row.data).temperature
                          : '--'
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="湿度(%)">
                    <template v-slot="scope">
                      {{
                        scope.row.data
                          ? JSON.parse(scope.row.data).humidity
                          : '--'
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="氨气(ppm)">
                    <template v-slot="scope">
                      {{
                        scope.row.data ? JSON.parse(scope.row.data).NH3 : '--'
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="硫化氢(ppm)">
                    <template v-slot="scope">
                      {{
                        scope.row.data ? JSON.parse(scope.row.data).H2S : '--'
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="PM2.5(ug/m³)">
                    <template v-slot="scope">
                      {{
                        scope.row.data
                          ? JSON.parse(scope.row.data)['PM2.5']
                          : '--'
                      }}
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination
                  :current-page="pageNo"
                  :page-sizes="[20, 30, 40, 50]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                ></el-pagination>
              </div>
            </div>
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
      tableData2: [],
      pageNo: 1,
      pageSize: 20,
      total: 0,
      diyLoading: false
    };
  },
  // 初始化查询告警阈值
  created() {
    this.queryDeviceDetai();
  },
  methods: {
    // 查询厕所设备详情
    queryDeviceDetai() {
      if (this.$route.query.id) {
        this.diyLoading = true;
        DeviceApi.getToiletDeviceDetail({ id: this.$route.query.id })
          .then(res => {
            this.diyLoading = false;
            if (res.code === '0') {
              this.tableData = res.data;
              this.queryAlarmList();
            }
          })
          .catch(() => {
            this.diyLoading = false;
          });
      }
    },
    // 查询设备报警记录
    queryAlarmList() {
      if (this.$route.query.id) {
        const row = JSON.parse(window.sessionStorage.getItem('editToilet'));

        DeviceApi.alarmList({
          deviceType: this.tableData.deviceType,
          toiletId: row.id,
          deviceId: this.$route.query.id,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }).then(res => {
          if (res.code === '0') {
            this.tableData2 = res.data.list;
            this.total = Number(res.data.total);
          }
        });
      }
    },
    back() {
      this.$router.go(-1);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNo = 1;
      this.queryAlarmList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryAlarmList();
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
.fiveRow {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  width: 100%;
  padding: 0 20px;
  .h-page-detail-item {
    border: 1px solid rgb(228, 228, 228);
    padding: 12px;
    & + .h-page-detail-item {
      border-left: none;
    }
  }
}
.tableBox {
  padding: 0 20px;
}
.warnRow {
  border: 1px solid rgb(228, 228, 228);
  padding: 12px;
}
</style>
