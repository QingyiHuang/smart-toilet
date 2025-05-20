<template>
  <div
    :class="{ areaBtn: true, areaBtnActive: active }"
    :title="currentName"
    @click="toggleActive"
  >
    <p class="currentName">{{ currentName }}</p>
    <div class="pupple">
      <div
        v-for="(item, index) in AreaData"
        :key="index"
        :class="{ oneItem: true, itemActive: item.select }"
        :title="item.name"
        @click.stop.prevent="selectArea(index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import OrgApi from '@/api/org.js';
// import ScrollBarWrapper from '@/components/common/ScrollBarWrapper.vue';
export default {
  components: {
    // ScrollBarWrapper
  },
  data() {
    return {
      active: false,
      AreaData: [],
      currentName: '区域切换'
    };
  },
  methods: {
    queryOrg() {
      OrgApi.databoardOrgList({}).then(res => {
        if (res.code === '0') {
          this.AreaData = res.data;
          this.$emit(
            'initQueryData',
            res.data.length ? res.data[0].indexCode : ''
          );
          if (this.AreaData.length) {
            this.AreaData[0].select = true;
            this.currentName = this.AreaData[0].name;
          }
        }
      });
    },
    toggleActive() {
      this.active = !this.active;
    },
    selectArea(index) {
      this.AreaData.map((item, key) => {
        if (key === index) {
          item.select = true;
          this.currentName = item.name;
          this.$emit('areaSelect', item.indexCode);
          this.active = false;
        } else {
          item.select = false;
        }
      });
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.areaBtn {
  background: url('~@/assets/images/databoard/btn-区域-默认.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  width: 94px;
  height: 44px;
  left: 550px;
  top: 24px;
  transition: all 0.1s ease;
  z-index: 301;
  cursor: pointer;
  .currentName {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: left;
    line-height: 44px;
    padding-left: 45px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 130px;
  }
  .pupple {
    display: none;
    width: 104px;
    height: 134px;
    position: absolute;
    left: 37px;
    top: 40px;
    line-height: 24px;
    background: url('~@/assets/hackblue/bg-boxbg.png') no-repeat;
    background-size: 100% 100%;
    padding: 0 4px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none; //兼容chrome、safari
    }
    scrollbar-width: none; //兼容火狐
    -ms-overflow-style: none; //兼容ie10+
    .oneItem {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #9ee0ff;
      letter-spacing: 0;
      padding-left: 4px;
      // width: 96px;
      height: 24px;
      background-color: transparent;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover {
        background-image: linear-gradient(
          270deg,
          rgba(0, 140, 255, 0.3) 0%,
          rgba(0, 140, 255, 0.75) 100%
        );
        color: #ffffff;
      }
    }
    .itemActive {
      background-image: linear-gradient(
        270deg,
        rgba(0, 140, 255, 0.3) 0%,
        rgba(0, 140, 255, 0.75) 100%
      );
      color: #ffffff;
    }
  }
  &:hover {
    background: url('~@/assets/images/databoard/btn-区域-悬停.png') no-repeat;
    background-size: 100% 100%;
  }
  &:active {
    background: url('~@/assets/images/databoard/btn-区域-选中.png') no-repeat;
    background-size: 100% 100%;
  }
}
.areaBtnActive {
  background: url('~@/assets/images/databoard/btn-区域-选中.png') no-repeat;
  background-size: 100% 100%;
  .pupple {
    display: block;
  }
  &:hover {
    background: url('~@/assets/images/databoard/btn-区域-选中.png') no-repeat;
    background-size: 100% 100%;
  }
  &:active {
    background: url('~@/assets/images/databoard/btn-区域-悬停.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
