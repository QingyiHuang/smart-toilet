<template>
  <div class="AreaSearchBox">
    <!-- 关闭按钮1 -->
    <div class="switchTab" @click.stop.prevent="closeSearch"></div>
    <!-- 关闭按钮2 -->
    <div class="switchTab2" @click.stop.prevent="closeSearch"></div>
    <div class="SearchPart">
      <el-input
        v-model="searchValue"
        class="diySearch"
        placeholder="请输入"
        suffix-icon="h-icon-search"
        clearable
        :on-icon-click="handleIconClick"
        :clear-icon-click="clearIconClick"
        @keyup.enter.native="handleIconClick"
      ></el-input>
      <ScrollBarWrapper class="diyWrapper">
        <div class="searchItemOuter">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            :class="{ searchItem: true, searchItemActive: item.active }"
            @click="selectItem(index)"
          >
            {{ item.name }}
          </div>
        </div>
      </ScrollBarWrapper>
    </div>
  </div>
</template>

<script>
import ScrollBarWrapper from '@/components/common/ScrollBarWrapper.vue';
import Api from '@/api/index';
import OrgApi from '@/api/org.js';
export default {
  components: {
    ScrollBarWrapper
  },
  data() {
    return {
      searchValue: '',
      tableData: [],
      orgCode: ''
    };
  },
  created() {
    OrgApi.databoardOrgList({}).then(res => {
      if (res.code === '0') {
        this.orgCode = res.data.length ? res.data[0].indexCode : '';
      }
    });
  },
  methods: {
    closeSearch() {
      this.$emit('closeSearch');
    },
    handleIconClick() {
      this.queryToilet(this.searchValue);
    },
    clearIconClick() {
      this.searchValue = '';
      this.queryToilet('');
    },
    queryToilet(name) {
      Api.toiletList({ name, orgCode: this.orgCode }).then(res => {
        if (res.code === '0') {
          this.tableData = res.data;
        }
      });
    },
    selectItem(index) {
      this.tableData.map((item, one) => {
        if (one === index) {
          item.active = true;
          this.$emit(
            'setCenter',
            [Number(item.longitude), Number(item.latitude)],
            '',
            item.id
          );
        } else {
          item.active = false;
        }
      });
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.AreaSearchBox {
  width: 358px;
  height: calc(100% - 100px);
  position: absolute;
  z-index: 300;
  left: 33px;
  top: 82px;
  background: url('~@/assets/images/databoard/pnl-展开面板.png') no-repeat;
  background-size: 100% 100%;
  // padding: 40px 0 0 38px;
  // transform: translate3d(0, 0, 0);
  padding-top: 44px;
  .switchTab {
    width: 32px;
    height: 280px;
    position: absolute;
    left: -33px;
    top: 240px;
    background: url('~@/assets/images/databoard/btn-面板展开-默认.png')
      no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    &:hover {
      background: url('~@/assets/images/databoard/btn-面板展开-悬停.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }
  .switchTab2 {
    background: url('~@/assets/images/databoard/btn-tips-关闭01-默认.png')
      no-repeat;
    background-size: 100% 100%;
    width: 56px;
    height: 26px;
    position: absolute;
    cursor: pointer;
    right: 3px;
    top: 3px;
    transition: all 0.15s ease;
    &:hover {
      background: url('~@/assets/images/databoard/btn-tips-关闭01-悬停.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }
  .SearchPart {
    padding: 0 18px;
    .diySearch {
      width: 312px;
      margin: 0 auto;
    }
  }
}
::v-deep .el-input__inner {
  background: rgba(6, 35, 73, 1);
  color: #9ee0ff;
  border: 1px solid rgba(0, 140, 255, 0.7);
}
::v-deep .el-input__icon {
  color: #9ee0ff;
}
::v-deep .el-input__inner {
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
.searchItemOuter {
  padding-top: 12px;
  padding-bottom: 40px;
  .searchItem {
    width: 312px;
    height: 40px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #87cefd;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    position: relative;
    text-indent: 40px;
    &:hover {
      background: url('~@/assets/images/databoard/cmmd-列表-悬停.png') no-repeat;
      background-size: 100% 100%;
    }
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: url('~@/assets/images/databoard/公厕.png') no-repeat;
      background-size: 100% 100%;
      left: 15px;
      top: 10px;
    }
  }
  .searchItemActive {
    background: url('~@/assets/images/databoard/cmmd-列表-选中.png') no-repeat;
    background-size: 100% 100%;
    &:hover {
      background: url('~@/assets/images/databoard/cmmd-列表-选中.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
.diyWrapper {
  height: calc(100% - 112px);
}
</style>
