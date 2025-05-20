<!--
 * @Descripttion: 地图定位，包括显示网格，获取网格
 * @version: 1.0
 * @Author: tanjingjing5
 * @Date: 2021-12-31 10:47:55
 * @LastEditors: tanjingjing5
 * @LastEditTime: 2022-01-19 17:36:36
-->
<template>
  <h-layout class="map-location">
    <Hmap ref="hmap" @loaded="ready"></Hmap>
  </h-layout>
</template>
<script>
import { mapState } from 'vuex';
import Hmap from '../hmap/HiMap.vue';
import * as _ from 'lodash';
import { getAddress } from '@/utils/amapUtils';

export default {
  components: {
    Hmap
  },
  filters: {
    formatLonlat(v) {
      return v ? v.toFixed(6) : '--';
    }
  },
  props: {
    // 是否允许点击，增加标注点
    enableClick: {
      type: Boolean,
      default: true
    },
    lonlat: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      mapManager: null,
      curMarker: {},
      storeAddress: ''
    };
  },
  computed: {
    ...mapState({
      gaodeInfo: 'gaodeInfo'
    })
  },
  methods: {
    ready(mapManager) {
      this.mapManager = mapManager;
      // this.mapManager.$addMapEvent(
      //   'MAPMOUSEEVENT_CLICK',
      this.handleLocation();
      // );
    },
    // 外部主动获取
    getLonlat() {
      const { lon, lat } = this.curMarker;
      return lon && lat
        ? {
            lon: lon.toFixed(6),
            lat: lat.toFixed(6),
            storeAddress: this.storeAddress
          }
        : {};
    },
    handleLocation() {
      // 默认有值的情况下，先显示默认的，再进行修改
      if (!_.isEmpty(this.lonlat)) {
        this.curMarker = {
          lon: this.lonlat.lon,
          lat: this.lonlat.lat
        };
        this.storeAddress = this.lonlat.storeAddress;
        this.mapManager.$addLocationMarker(this.curMarker);
        // 设置中心点
        this.mapManager.$setCenter(this.lonlat.lon, this.lonlat.lat);
      }
      if (this.enableClick) {
        this.mapManager.$drawPoint({
          drawEndDone: async point => {
            this.curMarker = point;
            // 自动获取地址
            if (this.gaodeInfo.msgSecret) {
              this.storeAddress = await getAddress(
                this.curMarker.lon,
                this.curMarker.lat,
                this.gaodeInfo.msgSecret
              );
            }
          }
        });
      }
    }
  }
};
</script>
<style lang="less">
.map-location {
  position: relative;
  .info-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background: #061937;
    height: 40px;
    font-size: 16px;
    line-height: 32px;
    padding-top: 4px;
    z-index: 1000;
    .info-item {
      width: 33%;
      padding-left: 8px;
      color: #9ee0ff;
      display: flex;
    }
  }
}
</style>
