<template>
  <h-page-container v-loading.fullscreen.lock="uploadLoading" class="opmanage">
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
    <h-page-content>
      <h-layout>
        <h-layout-header>
          <h-page-search ref="search" :model="search">
            <h-page-search-item label="报警类型" prop="alarmType">
              <el-select v-model="search.alarmType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </h-page-search-item>
            <h-page-search-item label="公厕名称" prop="name">
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </h-page-search-item>
            <h-page-search-item label="报警时间" prop="time">
              <el-date-picker
                v-model="search.time"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
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
// import moment from 'moment';
export default {
  components: {},
  data() {
    return {
      breadcrumb: ['公厕异常报警'],
      search: {
        alarmType: '',
        name: '',
        time: [],
        pageSize: 20,
        pageNo: 1
      },
      tableData: [],
      total: 0,
      uploadLoading: false,
      options: [{ value: '', label: '全部' }]
    };
  },
  created() {},
  activated() {},
  methods: {
    handleSearch() {},
    handleReset() {},
    exportTable() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSelectionChange() {}
  }
};
</script>
<style lang="scss" scoped>
.opmanage {
  min-width: 1100px;
}
</style>
