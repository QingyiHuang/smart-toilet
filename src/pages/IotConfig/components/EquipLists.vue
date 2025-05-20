<template>
  <div class="equipListPart">
    <div class="operatorBar">
      <el-button icon="h-icon-add" @click="addToilet">添加</el-button>
      <el-button
        icon="h-icon-delete"
        :disabled="!canDelete()"
        @click="delItems"
      >
        删除
      </el-button>
      <el-button icon="h-icon-refresh" @click="refreshGuidBoard">
        刷新引导屏
      </el-button>
      <el-input
        v-model="search.name"
        class="el-input--width diySearch"
        placeholder="请输入公厕名称进行搜索"
        suffix-icon="h-icon-search"
        clearable
        :on-icon-click="handleIconClick"
        @keyup.enter.native="handleIconClick"
      ></el-input>
    </div>

    <ScrollbarWrapper class="diyWrapper">
      <!-- 栅栏布局，媒体查询当>1100的时候为5栏，小于1100时为4栏 -->
      <div class="rowTable">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="equipItem"
          @click.stop.prevent="toggleItemSelect(index)"
        >
          <div class="leftPart">
            <div :class="{ trangle: true, trangleActive: item.selected }">
              <img :src="gouImg" />
            </div>
            <img class="itemImg" :src="item.picUrl || toiletDefaultImg" />
          </div>
          <div :class="{ rightPart: true, rightPartAlarm: item.alarmFlag }">
            <div :class="{ titlePart: true, titleAlarm: item.alarmFlag }">
              <p class="rightPartTitle" :title="item.name">
                {{ item.name }}
              </p>
            </div>
            <p class="rightDetailP">
              <span style="letter-spacing: 28px; float: left">地址</span>
              <i class="diyp" :title="item.address">
                {{ item.address || '--' }}
              </i>
            </p>
            <p class="rightDetailP">
              <span>厕所配置</span>
              男厕{{ item.pitNumOfMale || '0' }}/女厕{{
                item.pitNumOfFemale || '0'
              }}/第三{{ item.pitNumOfThird || '0' }}
            </p>
            <p class="rightDetailP">
              <span>物联设备</span>
              {{ item.deviceAllocation || '--' }}
            </p>
            <p class="rightDetailP">
              <span>更新时间</span>
              {{ item.updateTime || '--' }}
            </p>
            <p class="rightDetailP">
              <span>评价星级</span>
              <!-- <div class="rateOuter"> -->
              <van-rate
                v-model="item.toiletGrade"
                :size="20"
                color="#FFCC5A"
                void-icon="star"
                void-color="#eee"
                allow-half
                readonly
                :gutter="4"
              />
              <!-- </div> -->
            </p>

            <div class="toiletDeviceBoxes">
              <div
                :class="{
                  toiletDeviceBox: true,
                  toiletDeviceBoxActive: item.screenFlag
                }"
              >
                信息屏
              </div>
              <div
                :class="{
                  toiletDeviceBox: true,
                  toiletDeviceBoxActive: item.gatewayFlag
                }"
              >
                网关
              </div>
            </div>

            <div class="btnPart">
              <el-button
                type="info"
                :radius="true"
                @click.stop.prevent="editToilet(item)"
              >
                编辑公厕
              </el-button>
              <el-button
                type="info"
                :radius="true"
                @click.stop.prevent="goDeviceLists(item)"
              >
                关联设备
              </el-button>
              <el-button
                v-if="item.screenFlag"
                type="info"
                :radius="true"
                @click.stop.prevent="goGuideConfig(item)"
              >
                配置信息屏
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </ScrollbarWrapper>
    <div class="footer">
      <el-pagination
        :current-page="search.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="search.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ScrollbarWrapper from '@/components/common/ScrollBarWrapper.vue';
import Api from '@/api/index';
export default {
  components: {
    ScrollbarWrapper
  },
  data() {
    return {
      tableData: [],
      gouImg: require('@/assets/images/勾.png'),
      toiletDefaultImg: require('@/assets/images/databoard/bg-缺省图片.png'),
      search: {
        pageNo: 1,
        pageSize: 20,
        name: ''
      },
      total: 0,
      grade: 5
    };
  },
  methods: {
    getImg(val) {
      if (val) {
        return process.env.NODE_ENV === 'production'
          ? val
          : `https://test:443${val}`;
      } else {
        return '';
      }
    },
    pageQueyToilet() {
      this.$emit('pageLoad', true);
      Api.toiletPageQuery(this.search)
        .then(res => {
          this.$emit('pageLoad', false);
          if (res.code === '0') {
            this.tableData = res.data.list;
            this.tableData.map(item => {
              item.toiletGrade = Number(item.toiletGrade);
            });
            this.total = Number(res.data.total);
          }
        })
        .catch(() => {
          this.$emit('pageLoad', false);
        });
    },
    handleIconClick() {
      this.pageQueyToilet();
    },
    toggleItemSelect(index) {
      this.$nextTick(() => {
        if (this.tableData[index].selected) {
          this.tableData[index].selected = false;
        } else {
          this.tableData[index].selected = true;
        }
        this.$forceUpdate();
      });
    },
    equipItemSelect(index) {
      this.$nextTick(() => {
        this.tableData.map((item, one) => {
          if (one === index) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        this.$forceUpdate();
      });
    },
    addToilet() {
      window.sessionStorage.removeItem('editToilet');
      this.$router.push({
        path: '/AddToilet'
      });
    },
    canDelete() {
      const aa = this.tableData.some(item => {
        return item.selected === true;
      });
      return aa;
    },
    delItems() {
      this.$confirm('确认删除选中公厕', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: async () => {
          const arr = [];
          await this.tableData.filter(item => {
            if (item.selected) {
              arr.push(item.id);
            }
          });
          setTimeout(() => {
            Api.removeToilet({
              ids: arr
            }).then(res => {
              if (res.code === '0') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.pageQueyToilet();
              }
            });
          }, 0);
        },
        onCancel: () => {}
      });
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.search.pageNo = 1;
      this.pageQueyToilet();
    },
    handleCurrentChange(val) {
      this.search.pageNo = val;
      this.pageQueyToilet();
    },
    // 关联公厕设备
    goDeviceLists(row) {
      window.sessionStorage.setItem('editToilet', JSON.stringify(row));
      this.$router.push({
        path: '/DeviceLists'
      });
    },
    // 配置引导屏
    goGuideConfig(row) {
      this.$router.push({
        path: '/GuideConfig',
        query: {
          id: row.id
        }
      });
    },
    // 编辑公厕
    editToilet(row) {
      window.sessionStorage.setItem('editToilet', JSON.stringify(row));
      this.$router.push({
        path: '/AddToilet'
      });
    },
    // 通知刷新引导屏
    refreshGuidBoard() {
      this.$confirm('确认下发刷新引导屏操作吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          Api.RefreshBoard();
        },
        onCancel: () => {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// @import '~@/common/font.css';
.equipListPart {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  min-width: 640px;
  user-select: none;
  .operatorBar {
    height: 56px;
    padding-top: 12px;
  }
  .diySearch {
    float: right;
    margin-right: 14px;
  }
  .equipItem {
    margin: 0 auto;
    width: 320px;
    height: 460px;
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 12px;
    transition: all 0.15s ease-in;
    cursor: pointer;
    border: 1px solid rgb(225, 225, 225);
    position: relative;
    overflow: hidden;
    &:hover {
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      .leftPart {
        .trangle {
          display: block;
        }
      }
    }
    &:active {
      background-color: rgb(209, 230, 255);
    }
    .leftPart {
      width: 100%;
      height: 180px;
      position: relative;
      .itemImg {
        width: 100%;
        height: 180px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        transition: all 0.15s ease;
        &:hover {
          height: 280px;
          z-index: 1;
        }
      }
      .trangle {
        width: 0;
        top: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 2;
        border-top: 16px solid #62a9ff;
        border-left: 16px solid transparent;
        border-right: 16px solid #62a9ff;
        border-bottom: 16px solid transparent;
        display: none;
        transition: all 0.02s linear;
        user-select: none;
        img {
          width: 14px;
          height: 14px;
          position: absolute;
          left: -2px;
          top: -14px;
        }
      }
      .trangleActive {
        border-top: 16px solid #2080f7;
        border-left: 16px solid transparent;
        border-right: 16px solid #2080f7;
        border-bottom: 16px solid transparent;
        display: block;
      }
    }
    .rightPart {
      position: relative;
      padding: 13px 12px 10px 12px;
      .btnPart {
        border-top: 1px solid #ebebeb;
        padding-top: 12px;
        overflow: hidden;
        .el-button {
          float: right;
          padding: 0 15px;
          min-width: 20px;
          & + .el-button {
            margin-right: 10px;
            margin-left: 0;
          }
        }
        // .el-button + .el-button {
        //   margin-left: 0;
        // }
        .el-button--info {
          background-color: rgb(241, 247, 255);
          color: rgb(117, 117, 117);
          border: none;
          &:hover {
            background-color: rgb(225, 238, 255);
          }
        }
      }
      .titlePart {
        overflow: hidden;
        margin-bottom: 18px;
        padding-left: 32px;
        .rightPartTitle {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #4c4c4c;
          max-width: 240px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          position: relative;
        }
        &::before {
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          background: url('~@/assets/images/icon-公厕默认.png') no-repeat;
          background-size: 100% 100%;
          left: 12px;
          top: 12px;
        }
      }
      .titleAlarm {
        &::before {
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          background: url('~@/assets/images/icon-公厕告警.png') no-repeat;
          background-size: 100% 100%;
          left: 12px;
          top: 12px;
        }
      }
      .rightDetailP {
        font-family: MicrosoftYaHei;
        padding-left: 32px;
        font-size: 14px;
        color: #4c4c4c;
        line-height: 25px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 284px;
        position: relative;
        .diyp {
          font-style: normal;
          float: left;
          margin-left: -24px;
          max-width: 182px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #999999;
          display: inline;
          margin-right: 10px;
        }
      }
      .toiletDeviceBoxes {
        padding-left: 32px;
      }
      .toiletDeviceBox {
        border: 1px solid rgb(172, 172, 172);
        color: rgb(172, 172, 172);
        background-color: rgb(247, 247, 247);
        padding: 1px 4px;
        display: inline-block;
        margin-right: 8px;
        border-radius: 2px;
        margin-top: 8px;
        font-size: 12px;
        margin-bottom: 16px;
      }
      .toiletDeviceBoxActive {
        border: 1px solid #2196f3;
        color: #2196f3;
        background-color: rgb(238, 247, 255);
      }
    }
  }
  .rightPartAlarm {
    background: url('~@/assets/images/card-告警.png') no-repeat;
    background-size: 110px 110px;
    background-position: 110% -10%;
  }
  @media screen and (min-width: 680px) {
    .rowTable {
      display: grid;
      grid-template-columns: 50% 50%;
    }
  }
  @media screen and (min-width: 990px) {
    .rowTable {
      display: grid;
      grid-template-columns: 33.3% 33.3% 33.3%;
    }
  }
  @media screen and (min-width: 1300px) {
    .rowTable {
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
    }
  }

  @media screen and (min-width: 1680px) {
    .rowTable {
      display: grid;
      grid-template-columns: 20% 20% 20% 20% 20%;
    }
  }
  .equipActive {
    background-color: rgb(233, 244, 255);
  }
  .diyWrapper {
    height: calc(100% - 112px);

    // .rowTable {
    //   display: grid;
    //   grid-template-columns: 25% 25% 25% 25%;
    // }
  }
  .footer {
    height: 60px;
    width: 100%;
    padding: 0 20px 0 0;
    position: absolute;
    background-color: #ffffff;
    bottom: 0;
    left: 0;
    border-top: 1px solid rgb(228, 228, 228);
  }
}

.van-rate {
  height: 100%;
  position: relative;
  top: 2px;
  left: 2px;
}
</style>
