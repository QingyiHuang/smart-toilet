<template>
  <h-page-container v-loading.fullscreen.lock="uploadLoading">
    <div class="historyAlarmPage">
      <!-- <div class="headDiv">智慧公厕</div> -->
      <div class="content">
        <!-- <div class="returndiv">
          <div class="returnPart" @click="goback">
            智慧监管
          </div>
        </div> -->
        <div class="contentPart">
          <h-page-content>
            <div class="contentInner">
              <div class="searchPart">
                <h-page-search ref="search" :model="search">
                  <h-page-search-item label="公厕名称" prop="name">
                    <el-input
                      v-model="search.name"
                      placeholder="请输入"
                    ></el-input>
                  </h-page-search-item>
                  <h-page-search-item label="评分" prop="score">
                    <el-select
                      v-model="search.score"
                      placeholder="请选择"
                      collapse-tags
                    >
                      <el-option
                        v-for="item in scoreArr"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </h-page-search-item>
                  <h-page-search-item label="评分时间" prop="time">
                    <el-date-picker
                      v-model="search.time"
                      type="datetimerange"
                      align="right"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      :default-time="['00:00:00', '23:59:59']"
                    />
                  </h-page-search-item>
                  <template slot="pageSearchAction">
                    <el-button type="primary" @click="handleSearch">
                      查询
                    </el-button>
                    <el-button @click="handleReset">重置</el-button>
                  </template>
                </h-page-search>
              </div>
              <ScrollbarWrapper class="diyWrapper">
                <div class="carListsBox">
                  <el-row>
                    <el-col
                      v-for="(item, index) in tableData"
                      :key="index"
                      :xs="12"
                      :sm="7"
                      :md="6"
                      :lg="{ span: '4-8' }"
                      :xl="5"
                    >
                      <div class="cardOuter" @click="showDialog(item)">
                        <div class="oneCard">
                          <!-- 删除按钮 -->
                          <el-button
                            class="delBtn"
                            icon="h-icon-delete"
                            size="small"
                            @click.prevent.stop="delItem(item)"
                          />
                          <div class="leftPart">
                            <div class="alarmTypeTag">
                              {{ item.grade || '--' }}分
                            </div>
                            <img :src="item.picUrl || quesheng" />
                          </div>
                          <div class="rightPart">
                            <p class="rtitle" :title="item.toiletName">
                              {{ item.toiletName || '--' }}
                            </p>
                            <p
                              class="rinfo"
                              :title="item.createTime | timeFilter"
                            >
                              {{ item.createTime | timeFilter }}
                            </p>
                            <p class="rinfo" :title="`${item.remark}`">
                              {{ item.remark || '--' }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </ScrollbarWrapper>
              <!-- 分页器 -->
              <div class="paginationDiv">
                <el-pagination
                  :current-page="search.pageNo"
                  :page-sizes="[20, 30, 40, 50]"
                  :page-size="search.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                ></el-pagination>
              </div>
            </div>
          </h-page-content>
        </div>
        <ScoreDialog ref="scoreDialog" />
        <!-- <div class="footerDiv"></div> -->
      </div>
    </div>
  </h-page-container>
</template>

<script>
import ScrollbarWrapper from '@/components/common/ScrollBarWrapper.vue';
import WrapApi from '@/api/wrap';
import moment from 'moment';
import ScoreDialog from './components/ScoreDialog.vue';
export default {
  filters: {
    timeFilter(val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '--';
      }
    }
  },
  components: {
    ScrollbarWrapper,
    ScoreDialog
  },
  data() {
    return {
      search: {
        name: '',
        score: null,
        time: [],
        pageNo: 1,
        pageSize: 20
      },
      tableData: [],
      total: 0,
      scoreArr: [],
      quesheng: require('@/assets/images/databoard/bg-缺省图片.png'),
      uploadLoading: false
    };
  },
  created() {
    this.getStarLevel();
    this.queryAlarmLists();
  },
  methods: {
    delItem(row) {
      // 删除一个评分项
      this.$confirm('是否删除该评价?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          this.uploadLoading = true;
          WrapApi.removeToiletEvaluates({
            ids: [row.id]
          })
            .then(res => {
              this.uploadLoading = false;
              if (res.code === '0') {
                this.$message.success('删除成功');
                this.queryAlarmLists();
              }
            })
            .catch(() => {
              this.uploadLoading = false;
            });
        }
      });
    },
    getStarLevel() {
      WrapApi.getToiletGradeRanges().then(res => {
        if (res.code === '0') {
          this.scoreArr = res.data;
          this.scoreArr.unshift({
            code: null,
            name: '全部'
          });
        }
      });
    },
    // 分页查询报警数据
    queryAlarmLists() {
      this.uploadLoading = true;
      WrapApi.getToiletEvaluates({
        evaluateBeginDate: this.search.time.length
          ? moment(this.search.time[0]).format('YYYY-MM-DD HH:mm:ss')
          : '',
        evaluateEndDate: this.search.time.length
          ? moment(this.search.time[1]).format('YYYY-MM-DD HH:mm:ss')
          : '',
        gradeRange: this.search.score,
        pageNo: this.search.pageNo,
        pageSize: this.search.pageSize,
        toiletName: this.search.name
      })
        .then(res => {
          this.uploadLoading = false;
          this.tableData = res.data.list;
          this.total = Number(res.data.total);
        })
        .catch(() => {
          this.uploadLoading = false;
        });
      // DeviceApi.alarmList({
      //   alarmEndTime: this.search.time.length
      //     ? moment(this.search.time[1]).format('YYYY-MM-DD HH:mm:ss')
      //     : '',
      //   alarmStartTime: this.search.time.length
      //     ? moment(this.search.time[0]).format('YYYY-MM-DD HH:mm:ss')
      //     : '',
      //   alarmTypes: this.search.alarmTypes,
      //   orgIndexCode: this.search.orgIndexCode,
      //   pageNo: this.search.pageNo,
      //   pageSize: this.search.pageSize
      // })
      //   .then(res => {
      //     this.uploadLoading = false;
      //     if (res.code === '0') {
      //       this.tableData = res.data.list;
      //       this.total = Number(res.data.total);
      //     }
      //   })
      //   .catch(() => {
      //     this.uploadLoading = false;
      //   });
    },
    handleSearch() {
      this.search.pageNo = 1;
      this.queryAlarmLists();
    },
    handleReset() {
      this.$refs.search.resetFields();
      this.search.pageNo = 1;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.search.pageNo = 1;
      this.queryAlarmLists();
    },
    handleCurrentChange(val) {
      this.search.pageNo = val;
      this.queryAlarmLists();
    },
    goback() {
      this.$router.go(-1);
    },
    showDialog(obj) {
      this.$refs.scoreDialog.setVal(obj);
    }
  }
};
</script>

<style lang="scss" scoped>
.historyAlarmPage {
  width: 100%;
  height: 100%;
  position: relative;
  // background: url('~@/assets/images/databoard/img-背景图.png') no-repeat;
  // background-size: 100% 100%;
  background-color: rgb(6, 25, 55);
  // .headDiv {
  //   height: 70px;
  //   width: 100%;
  //   background: url('~@/assets/images/databoard/pnl-头部标题.png') no-repeat;
  //   background-size: 100% 100%;
  //   font-family: PingFangSC-Semibold;
  //   font-size: 22px;
  //   color: #ffffff;
  //   letter-spacing: 0;
  //   text-align: center;
  //   line-height: 53px;
  // }
  .content {
    height: calc(100% - 20px);
    .returndiv {
      height: 40px;
      overflow: hidden;
    }
    .returnPart {
      height: 40px;
      width: 124px;
      float: left;
      margin-left: 24px;
      background: url('~@/assets/images/databoard/btn-返回-默认.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 40px;
      text-indent: 48px;
      &:hover {
        background: url('~@/assets/images/databoard/btn-返回-悬停.png')
          no-repeat;
      }
    }
    .contentPart {
      height: 100%;
      padding: 20px 20px 0 20px;
      position: relative;
      .h-page-content {
        padding: 0;
      }
      .contentInner {
        height: 100%;
        background: rgba(10, 55, 100, 0.35);
        position: relative;
        .searchPart {
          padding: 0 16px;
          border-bottom: 1px solid rgb(4, 75, 134);
          .h-page-search {
            border-bottom: none;
          }
        }
      }
    }
  }
}
.footerDiv {
  height: 24px;
  width: 100%;
  background: url('~@/assets/images/databoard/pnl-底部装饰.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.carListsBox {
  min-height: 220px;
  padding: 12px 0px;
  position: relative;
  .hpt {
    position: absolute;
    width: 100%;
    height: 150px;
    top: 50%;
    margin-top: -75px;
  }
  .cardOuter {
    width: 94%;
    height: 100%;
    margin: 10px;
  }
  .oneCard {
    border-radius: 2px;
    cursor: pointer;
    transition: all ease 0.25s;
    width: 100%;
    min-width: 240px;
    height: 128px;
    font-weight: 400;
    background: url('~@/assets/images/card-历史报警-默认.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    position: relative;
    &:hover {
      background: url('~@/assets/images/card-历史报警-选中.png') no-repeat;
      background-size: 100% 100%;
      .delBtn {
        display: block;
      }
    }
    .delBtn {
      position: absolute;
      display: none;
      right: 0;
      top: -2px;
      width: 25px;
      height: 25px;
      border-color: #ccc;
      background-color: #fff;
      color: #ffffff;
      background: transparent;
      &:active {
        color: #ccc;
      }
    }
    .leftPart {
      position: absolute;
      width: 42%;
      height: 100%;
      img {
        position: absolute;
        left: 10.5%;
        top: 18px;
        width: 87%;
        height: 86px;
      }
      .alarmTypeTag {
        background: url('~@/assets/images/databoard/card-标签面板.png')
          no-repeat;
        background-size: 100% 100%;
        height: 24px;
        line-height: 24px;
        width: 60px;
        font-size: 12px;
        color: #ffffff;
        position: absolute;
        z-index: 1;
        top: 18px;
        left: 10%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-left: 4px;
      }
    }
    .rightPart {
      margin-left: 42%;
      height: 100%;
      padding-left: 3%;
      padding-top: 20px;
      .rtitle {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 6px;
      }
      .rinfo {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #9ee0ff;
        letter-spacing: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 30px;
        text-indent: 24px;
      }
    }
  }
}
@media screen and (min-width: 992px) {
  .el-col-md-6 {
    width: 33.3333333333%;
  }
}
@media screen and (min-width: 1042px) {
  .el-col-md-6 {
    width: 25%;
  }
}
@media screen and (min-width: 1600px) {
  .el-col-xl-4 {
    width: 20%;
  }
}
@media screen and (min-width: 1680px) {
  .el-col-xl-4 {
    width: 16.6666666667%;
  }
}
.diyWrapper {
  height: calc(100% - 148px);
}
.paginationDiv {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 67px;
  border-top: 1px solid rgb(2, 65, 163);
  padding: 0 28px;
}
::v-deep .el-form-item__label {
  font-size: 14px;
  color: #46a0dc !important;
}
::v-deep .el-input__inner {
  background: rgba(6, 35, 73, 1);
  color: #9ee0ff;

  border: 1px solid rgba(0, 140, 255, 0.7);
}
::v-deep .el-date-editor .el-range-input {
  color: #9ee0ff;
  background: #062349;
}
::v-deep .el-input__icon {
  color: #9ee0ff;
}
::v-deep .h-tree-select {
  border: 1px solid rgba(0, 140, 255, 0.7);
  background: rgba(6, 35, 73, 1);
  color: #9ee0ff;
  .placeholder {
    color: #9ee0ff;
  }
  .h-tree-select__input-icon.h-icon-angle_down_sm {
    color: #9ee0ff;
  }
}
::v-deep .el-button--primary {
  background: url('~@/assets/images/databoard/btn-黄按钮01-默认.png') no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  &:hover {
    background: url('~@/assets/images/databoard/btn-黄按钮01-悬停.png')
      no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
  }
}
::v-deep .el-button--default {
  background: url('~@/assets/images/databoard/btn-蓝按钮01-默认.png') no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  &:hover {
    background: url('~@/assets/images/databoard/btn-蓝按钮01-悬停.png')
      no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
  }
}
.el-pagination {
  color: #4fb1c8;
}
::v-deep .el-pager li.active {
  background: url('~@/assets/images/databoard/cmmd-分页-页码-选中.png')
    no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
}
::v-deep .el-pager li:hover {
  background: url('~@/assets/images/databoard/cmmd-分页-页码-悬停.png')
    no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
}
::v-deep .el-pagination .btn-next {
  background: url('~@/assets/images/databoard/cmmd-分页-下页-默认.png')
    no-repeat;
  background-size: 100% 100%;
  &:hover {
    background: url('~@/assets/images/databoard/cmmd-分页-下页-悬停.png')
      no-repeat;
    background-size: 100% 100%;
  }
}
::v-deep .btn-prev {
  background: url('~@/assets/images/databoard/cmmd-分页-上页-默认.png')
    no-repeat;
  background-size: 100% 100%;
  &:hover {
    background: url('~@/assets/images/databoard/cmmd-分页-上页-悬停.png')
      no-repeat;
    background-size: 100% 100%;
  }
}
::v-deep .el-pagination .btn-next .el-icon {
  display: none;
}
::v-deep .el-date-editor .el-range-input,
::v-deep.el-select .el-input__inner {
  &::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #9ee0ff;
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #9ee0ff;
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #9ee0ff;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #9ee0ff;
  }
  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #9ee0ff;
  }
}
</style>
<style lang="scss">
@import '../DataBoard/hackBlue.scss';
.style-diy {
  ::v-deep .el-form-item__label {
    font-size: 14px;
    color: #46a0dc !important;
  }
}
</style>
