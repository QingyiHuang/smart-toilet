<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: tanjingjing5
 * @Date: 2021-11-25 15:39:58
 * @LastEditors: tanjingjing5
 * @LastEditTime: 2021-12-30 15:13:49
-->
<template>
  <div :id="id" class="map"></div>
</template>
<script>
import { v1 as uuidv1 } from 'uuid';
import HmapProxy from './HmapProxy';
export default {
  name: 'Map',
  data() {
    return {
      id: '',
      mapProxy: null
      // markerProxy: null
    };
  },
  created() {
    this.id = uuidv1();
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      const data = {};
      const c = data || {};
      let center = null;
      if (c.longitude && c.latitude) {
        center = [c.longitude, c.latitude].map(item => parseFloat(item));
      }
      const configs = {
        center: center,
        zoom: c.displayLevel < 16 ? 16 : c.displayLevel,
        minLevel: c.minLevel || 7,
        maxLevel: c.maxLevel || 20,
        isGaode: true
      };
      this.mapProxy = new HmapProxy({
        el: this.id,
        configs
      });
      // this.markerProxy = this.mapProxy.initMarkerLayer('markerLayer');
      this.$emit('ready', this.mapProxy);
    }
  }
};
</script>
<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
