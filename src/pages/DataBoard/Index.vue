<template>
  <div class="full">
    <!-- 舟山市级数据看板 -->
    <Hmap ref="hmap" @loaded="hmapReady"></Hmap>
    <HeaderPart v-if="hack1080 && !hideAll" />
    <div
      v-show="!showSearchFlag && !hideAll"
      :class="{ leftPanel: true, hackPanel: hack1080 }"
    >
      <div class="innerBox">
        <el-scrollbar wrap-class="shop-list-wrap">
          <ToiletStatistic ref="dataChart1" />
          <CleanTimes ref="dataChart2" />
          <ToiletNumRank ref="dataChart3" />
          <ScoreRatio ref="dataChart4" />
          <AirQuality ref="dataChart5" />
        </el-scrollbar>
      </div>
    </div>
    <AreaSearch
      v-if="showSearchFlag && !hideAll"
      ref="AreaSearch"
      :class="{ hackPanelSon: hack1080 }"
      @closeSearch="closeSearch"
      @setCenter="setCenter"
    />
    <div v-show="!hideAll" :class="{ rightPanel: true, hackPanel: hack1080 }">
      <div class="innerBox">
        <el-scrollbar wrap-class="shop-list-wrap">
          <PassengerFlow ref="dataChart6" />
          <PassengerFlowRank ref="dataChart7" />
          <PassengerFlowTrendency ref="dataChart8" />
          <LatestAlarm ref="dataChart9" />
        </el-scrollbar>
      </div>
    </div>
    <SearchBtn
      v-show="!hideAll"
      ref="searchBtn"
      :class="{ translefthack1: showSearchFlag, hackBtn: hack1080 }"
      @showSearch="showSearch"
      @closeSearch="closeSearch"
    />
    <AreaBtn
      v-show="!hideAll"
      ref="areaBtn"
      :class="{ translefthack2: showSearchFlag, hackBtn: hack1080 }"
      @areaSelect="areaSelect"
      @initQueryData="areaSelectInit"
    />
    <ShowHideBtn
      :class="{ hackBtn2: hack1080, maptoolBtnFull: hideAll }"
      @showHidePanel="showHidePanel"
    />
    <!-- <MapToolBox :class="{ maptoolBtnFull: hideAll }" @mapOpt="mapToolFunc" /> -->
    <FooterPart v-if="hack1080 && !hideAll" />
    <SimplePlayer ref="playDialog" />
  </div>
</template>

<script>
import ToiletStatistic from './components_left/ToiletStatistic.vue';
import CleanTimes from './components_left/CleanTimes.vue';
import ToiletNumRank from './components_left/ToiletNumRank.vue';
import ScoreRatio from './components_left/ScoreRatio.vue';
import AirQuality from './components_left/AirQuality.vue';
import PassengerFlow from './components_right/PassengerFlow.vue';
import PassengerFlowRank from './components_right/PassengerFlowRank.vue';
import PassengerFlowTrendency from './components_right/PassengerFlowTrendency.vue';
import LatestAlarm from './components_right/LatestAlarm.vue';
import HeaderPart from './components_headfoot/HeaderPart.vue';
import FooterPart from './components_headfoot/FooterPart.vue';
// import AlarmPart from './components_headfoot/AlarmPart.vue';
import SearchBtn from './components_headfoot/SearchBtn.vue';
import AreaBtn from './components_headfoot/AreaSwitchBtn.vue';
import AreaSearch from './components_left/AreaSearch.vue';
import ShowHideBtn from './components_headfoot/ShowHideBtn.vue';
// import MapToolBox from './components_headfoot/MapTools.vue';
// import Vue from 'vue';
import NorToiletMarker from './components_marker/NorToilet.vue';
import AlarmToiletMarker from './components_marker/AlarmToilet.vue';
import Api from '@/api/index';
import SimplePlayer from '@/components/common/SimplePlayer.vue';
// import OrgApi from '@/api/org';
import Hmap from '@/components/hmap/HiMap.vue';
let mapManager = null;
export default {
  components: {
    ToiletStatistic,
    CleanTimes,
    ToiletNumRank,
    ScoreRatio,
    AirQuality,
    PassengerFlow,
    PassengerFlowRank,
    PassengerFlowTrendency,
    LatestAlarm,
    HeaderPart,
    FooterPart,
    // AlarmPart,
    SearchBtn,
    AreaBtn,
    AreaSearch,
    ShowHideBtn,
    // MapToolBox,
    SimplePlayer,
    Hmap
  },
  data() {
    return {
      MapBaseUrl:
        process.env.NODE_ENV === 'development'
          ? 'https://test'
          : window.location.origin,
      hack1080: false,
      showSearchFlag: false,
      hideAll: false,
      timmer: null,
      center: [122.207395, 29.985578],
      // 存放未报警 和已报警的 公厕点位
      norMarker: new Map(),
      pointsList: []
    };
  },
  mounted() {
    // 监听resize，resize当高度到1920这个范围的时候，展示头部和底部，否则隐藏
    this.pageResize();
    window.addEventListener('resize', this.pageResize);
  },
  destroyed() {
    window.removeEventListener('mousemove', this.pageResize);
    if (this.timmer) {
      clearInterval(this.timmer);
      this.timmer = null;
    }
  },
  methods: {
    setCenter(lonlat, level = '', id) {
      mapManager.$setCenter(lonlat[0], lonlat[1], level);
      if (id) {
        document
          .getElementById(`cqMarkerlayers_${id}`)
          .getElementsByClassName('iconOuter')[0]
          .click();
        // .getElementsByClassName('window')[0].style = 'display: block;';
      }
    },
    hmapReady(manager) {
      mapManager = manager;
      this.$refs.areaBtn.queryOrg();
      mapManager.$addMapEvent('MAPEVENT_ZOOMEND', this.refreshLayer);
      mapManager.$addMapEvent('MAPEVENT_MOVEEND', this.refreshLayer);
      // this.setCenter([122.207395, 29.985578]);
    },

    refreshLayer() {
      // 重新撒点
      if (this.pointsList.length) {
        mapManager.$clearCqMarkers('norMarker');
        mapManager.$clearCqMarkers('alarmMarker');
        this.pointsList.map((item, index) => {
          if (!item.alarmFlag) {
            this.drawNorMarker(item);
          } else {
            this.drawAlarmMarker(item);
          }
        });
      }
    },
    pageResize() {
      document.documentElement.clientHeight >= 1080
        ? (this.hack1080 = true)
        : (this.hack1080 = false);
    },
    // 撒一个厕所
    drawNorMarker(point) {
      const layerName = 'norMarker';
      const param = {
        id: point.id,
        layerName,
        lon: Number(point.longitude),
        lat: Number(point.latitude),
        component: NorToiletMarker,
        data: point,
        callbacks: {
          openWindow: data => {
            if (data.open) {
              if (this.openMarker) {
                this.openMarker.closePop();
              }
              this.openMarker = data.marker;
            } else {
              this.openMarker = null;
            }
          },
          goRealTime: data => {
            this.$router.push({
              path: '/RealTimeBoard',
              query: {
                id: data
              }
            });
          },
          preview: data => {
            this.$refs.playDialog.indexCode = data || '';
            this.$refs.playDialog.dialogFormVisible3 = true;
          }
        }
      };
      mapManager.$addCqMarker(param);
    },
    drawAlarmMarker(point) {
      const layerName = 'alarmMarker';
      const param = {
        id: point.id,
        layerName,
        lon: Number(point.longitude),
        lat: Number(point.latitude),
        component: AlarmToiletMarker,
        data: point,
        callbacks: {
          openWindow: data => {
            if (data.open) {
              if (this.openMarker) {
                this.openMarker.closePop();
              }
              this.openMarker = data.marker;
            } else {
              this.openMarker = null;
            }
          },
          goRealTime: data => {
            this.$router.push({
              path: '/RealTimeBoard',
              query: {
                id: data
              }
            });
          },
          preview: data => {
            this.$refs.playDialog.indexCode = data || '';
            this.$refs.playDialog.dialogFormVisible3 = true;
          }
        }
      };
      mapManager.$addCqMarker(param);
    },
    // // 查询公厕点位并进行撒点
    async queryToiletMarker(orgCode = '', centerFlag = true) {
      // 清除所有点位然后执行撒点
      mapManager.$clearCqMarkers('norMarker');
      mapManager.$clearCqMarkers('alarmMarker');
      await Api.toiletList({
        orgCode
      }).then(res => {
        if (res.code === '0') {
          this.pointsList = res.data;
          res.data.map((item, index) => {
            if (!item.alarmFlag) {
              this.drawNorMarker(item);
            } else {
              this.drawAlarmMarker(item);
            }
            if (index === 0 && centerFlag) {
              this.setCenter([item.longitude, item.latitude], 14);
            }
          });
        }
      });
    },

    showSearch() {
      this.showSearchFlag = true;
    },
    closeSearch() {
      this.showSearchFlag = false;
      this.$refs.searchBtn.active = false;
    },
    showHidePanel(flag) {
      if (flag) {
        this.hideAll = true;
      } else {
        this.hideAll = false;
      }
    },
    areaSelectInit(val) {
      setTimeout(() => {
        this.areaSelect(val);
      }, 500);
    },
    // // 点击区域的时候统计查询同步进行切换
    async areaSelect(val) {
      // val.indexCode
      if (this.timmer) {
        clearInterval(this.timmer);
        this.timmer = null;
      }
      this.$refs.dataChart1.queryData(val);
      this.$refs.dataChart2.queryData(val);
      this.$refs.dataChart3.queryData(val);
      this.$refs.dataChart4.queryData(val);
      this.$refs.dataChart5.queryData(val);
      this.$refs.dataChart6.queryData(val);
      this.$refs.dataChart7.queryData(val);
      this.$refs.dataChart8.queryData(val);
      this.$refs.dataChart9.queryData(val);
      // 地图撒点
      await this.queryToiletMarker(val);
      if (this.$refs.AreaSearch) {
        this.$refs.AreaSearch.orgCode = val;
        this.$forceUpdate();
      }
      // 设置定时器，1分钟刷新一次
      const _this = this;
      this.timmer = setInterval(async () => {
        _this.$refs.dataChart1.queryData(val);
        _this.$refs.dataChart2.queryData(val);
        _this.$refs.dataChart3.queryData(val);
        _this.$refs.dataChart4.queryData(val);
        _this.$refs.dataChart5.queryData(val);
        _this.$refs.dataChart6.queryData(val);
        _this.$refs.dataChart7.queryData(val);
        _this.$refs.dataChart8.queryData(val);
        _this.$refs.dataChart9.queryData(val);
        // 地图撒点
        await _this.queryToiletMarker(val, false);
        if (_this.$refs.AreaSearch) {
          _this.$refs.AreaSearch.orgCode = val;
          _this.$forceUpdate();
        }
      }, 180000);
    }
  }
};
</script>

<style lang="scss" scoped>
.full {
  background: #191a1b;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  user-select: none;
  #hmap {
    width: 100%;
    height: 100%;
  }
  .leftPanel {
    width: 410px;
    height: calc(100% - 16px);
    position: absolute;
    z-index: 300;
    left: 0px;
    top: 8px;
    background: url('~@/assets/images/databoard/pnl-left.png') no-repeat;
    background-size: 100% 100%;
    padding: 40px 0 0 38px;
    transform: translate3d(0, 0, 0);
    overflow: hidden;
  }
  .rightPanel {
    width: 410px;
    height: calc(100% - 16px);
    position: absolute;
    z-index: 300;
    right: 0px;
    top: 8px;
    background: url('~@/assets/images/databoard/pnl-right.png') no-repeat;
    background-size: 100% 100%;
    padding: 40px 0 0 20px;
  }
  .hackPanel {
    top: 77px;
    height: calc(100% - 115px);
  }
  .translefthack1 {
    left: 32px;
  }
  .translefthack2 {
    left: 172px;
  }
  .hackBtn {
    top: 77px;
  }
  .hackBtn2 {
    top: 109px;
  }
  .hackPanelSon {
    top: 130px;
    height: calc(100% - 165px);
  }
  .maptoolBtnFull {
    transition: all 0.12s linear;
    right: 24px;
  }
}
::v-deep .innerBox {
  width: 100%;
  height: calc(100% - 30px);
  overflow: hidden;
  .el-scrollbar__wrap {
    height: 100%;
    overflow-x: hidden;
  }
}
::v-deep .el-scrollbar__thumb {
  background-color: #63d6f5;
}
</style>
