<template>
  <h-page-container v-loading.fullscreen.lock="uploadLoading" class="opmanage">
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
    <h-page-content>
      <h-layout>
        <h-layout-header>
          <h-page-action>
            <el-button
              type="iconButton"
              icon="h-icon-export"
              @click="exportTable"
            >
              导出
            </el-button>
          </h-page-action>
          <h-page-search ref="search" :model="search">
            <h-page-search-item label="时间范围" prop="time">
              <el-radio-group v-model="radio" @change="radioChange">
                <el-radio-button label="今日"></el-radio-button>
                <el-radio-button label="本月"></el-radio-button>
                <el-radio-button label="自定义"></el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="search.time"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :disabled="radio !== '自定义'"
              />
            </h-page-search-item>
            <template slot="pageSearchAction">
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </template>
          </h-page-search>
        </h-layout-header>
        <h-layout-content overflow>
          <el-table
            ref="multipleTable"
            :data="tableData"
            force-scroll
            stripe
            @selection-change="handleSelectionChange"
          >
            <h-empty slot="empty" :img="require('@/assets/empty.png')" />
            <el-table-column prop="snCode" label="序号" />
            <el-table-column prop="snCode" label="公厕名称" />
            <el-table-column prop="deviceName" label="人流量" width="180" />
            <el-table-column prop="deviceModel" label="报警次数" width="180" />
            <el-table-column prop="siteName" label="保洁次数" width="220" />
          </el-table>
        </h-layout-content>
        <h-layout-footer>
          <el-pagination
            :current-page="search.pageNo"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="search.pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </h-layout-footer>
      </h-layout>
    </h-page-content>
  </h-page-container>
</template>

<script>
import moment from 'moment';
export default {
  components: {},
  data() {
    return {
      breadcrumb: ['公厕运行管理'],
      search: {
        time: [],
        pageSize: 20,
        pageNo: 1
      },
      tableData: [],
      total: 0,
      uploadLoading: false,
      radio: '今日'
    };
  },
  created() {
    this.radioChange();
  },
  activated() {},
  methods: {
    handleSearch() {},
    handleReset() {},
    exportTable() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSelectionChange() {},
    radioChange() {
      if (this.radio === '今日') {
        this.search.time = [
          moment().format('YYYY-MM-DD 00:00:00'),
          moment().format('YYYY-MM-DD 23:59:59')
        ];
      } else if (this.radio === '本月') {
        this.search.time = [
          moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
          moment().endOf('month').format('YYYY-MM-DD 23:59:59')
        ];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// 针对页面内做适配
::v-deep .h-page-search-item {
  width: 50% !important;
}
::v-deep .h-page-search__action {
  width: 50% !important;
}
.el-range-editor {
  width: 240px;
  margin-left: 10px;
  position: relative;
  top: 2px;
}
.opmanage {
  min-width: 1100px;
}
.h-color-picker__input,
.is-disabled {
  cursor: not-allowed;
  background-color: #e6e6e6 !important;
}
</style>
