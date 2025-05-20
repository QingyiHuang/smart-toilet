<template>
  <hi-map-container
    v-if="show"
    ref="hmap"
    :config="mapConfig"
    class="ocos-map"
    @loaded="mapLoaded"
  ></hi-map-container>
</template>

<script>
import Vue from 'vue';
import himapvue from 'hi-map-vue/lib/index.umd.min';
import 'hi-map-vue/lib/index.css';
// import CommonApi from '@/api/common';
import OrgApi from '@/api/org';
import * as _ from 'lodash';
import MarkerProxy from './MarkerProxy';
Vue.use(himapvue);
export default {
  components: {},
  props: {
    showSwitch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      api: null,
      show: false,
      mapConfig: {
        // hmapServerUrl: `/${process.env.VUE_APP_CONTEXT}/hmap/hmap-base2.3.0.js`,
        hmapServerUrl: '/hmap-server/conf/hmap/hmap-core.js',
        // noLoadHmapjs: true,
        // protocol: 'http',
        attribute: {},
        // center: '120.15913,30.27993',
        center: '106.480912,29.460955',
        clusterLevel: 14,
        fullExtent: '75,18,135,54',
        id: 'b124732b5b7b47ad947fe80bb91193ff',
        imageFormat: 'png',
        initExtent: null,
        initLevel: 15,
        layer: null,
        mapType: 'GaodeMapOnLine',
        matrixIds: null,
        maxLevel: 19,
        minLevel: 0,
        name: null,
        parentId: null,
        requestEncoding: null,
        resolutions:
          '156543.03392804062,78271.51696402031,39135.758482010155,19567.879241005077,9783.939620502539,4891.969810251269,2445.9849051256347,1222.9924525628173,611.4962262814087,305.74811314070433,152.87405657035217,76.43702828517608,38.21851414258804,19.10925707129402,9.55462853564701,4.777314267823505,2.3886571339117526,1.1943285669558763,0.5971642834779382,0.2985821417389691',
        srid: '3857',
        style: null,
        tileMatrixSet: null,
        tileOrigin: '-20037508.3427892,20037508.3427892',
        tileSize: 256,
        url: null,
        urlInfo: {
          imgUrl:
            'https://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          vecUrl:
            'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        },
        zoomOffset: null,
        showOverView: false,
        showSwitch: false,
        showZoom: false,
        showCompass: false,
        hideScale: true,
        hideMouseLocation: true
      },
      events: [
        'MAPEVENT_MOVESTART',
        'MAPEVENT_MOVING',
        'MAPEVENT_MOVEEND',
        'MAPEVENT_ZOOMSTART',
        'MAPEVENT_ZOOMING',
        'MAPEVENT_ZOOMEND',
        'MAPEVENT_ROTATESTART',
        'MAPEVENT_ROTATING',
        'MAPEVENT_ROTATEEND',
        'LAYEREVENT_LOADEND',
        'MAPEVENT_EXTENTCHANGED'
      ],
      cqMarkerLayers: {},
      curPopupId: '',
      curPopupLayer: ''
    };
  },
  computed: {},
  created() {
    this.mapConfig.showSwitch = this.showSwitch;
    this.getMapConfig();
  },
  methods: {
    getMapConfig() {
      // CommonApi.getMapConfig().then(res => {
      //   const data = (res || {}).data || {};
      //   this.mapConfig = _.merge(this.mapConfig, _.omitBy(data, _.isNil));
      //   this.show = true;
      // });
      OrgApi.mapConfig().then(res => {
        const data = (res || {}).data || {};
        this.mapConfig = _.merge(this.mapConfig, _.omitBy(data, _.isNil));
        this.show = true;
      });
      // const res = {
      //   code: '0',
      //   msg: 'SUCCESS',
      //   data: {
      //     id: '10a20d1d2f824725968f6dc16123df30',
      //     parentId: null,
      //     initExtent: null,
      //     fullExtent: '75,18,135,54',
      //     maxLevel: 19,
      //     initLevel: 12,
      //     clusterLevel: 15,
      //     minLevel: 0,
      //     imageFormat: 'png',
      //     tileOrigin: '-20037508.3427892,20037508.3427892',
      //     resolutions:
      //       '156543.03392800014,78271.51696400007,39135.758482000034,19567.879241000017,9783.939620500008,4891.969810250004,2445.984905125002,1222.992452562501,611.4962262812505,305.74811314062526,152.87405657031263,76.43702828515632,38.21851414257816,19.10925707128908,9.55462853564454,4.77731426782227,2.388657133911135,1.1943285669555674,0.5971642834777837,0.29858214173889186,0.14929107086944593',
      //     srid: '3857',
      //     center: '120.04579263866988,30.223281226018376',
      //     mapType: 'ArcgisMapOnline',
      //     tileSize: 256,
      //     url: null,
      //     originUrl: null,
      //     thumbnailsUrl: null,
      //     name: 'vec',
      //     tileMatrixSet: null,
      //     layer: null,
      //     style: null,
      //     zoomOffset: null,
      //     matrixIds: null,
      //     requestEncoding: null,
      //     hvtStyle: [],
      //     urlInfo: {
      //       imgUrl: null,
      //       vecUrl:
      //         'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      //       hvtUrl: null
      //     },
      //     hmapServerUrl: '/hmap-server/conf/hmap/hmap-core.js',
      //     amapWebServiceKey: '',
      //     leaf: false,
      //     rectify: false
      //   }
      // };

      // const data = (res || {}).data || {};
      // this.mapConfig = _.merge(this.mapConfig, _.omitBy(data, _.isNil));
      // this.show = true;
    },
    mapLoaded(api) {
      // 在此处调用地图api执行操作
      this.api = api;
      this.$emit('loaded', this);
    },
    $drawPoint({
      type = 'point',
      layerName = 'location-marker',
      customData = {},
      drawEndDone = () => {},
      editEndDone = () => {},
      cancelDone = () => {},
      clickDone = () => {}
    }) {
      this.api.drawFeature({
        type,
        keepOn: true,
        title: '鼠标点击确认位置',
        style: {
          fillColor: 'red'
        },
        callback: param => {
          this.$addLocationMarker(param, layerName);
          drawEndDone(param);
        },
        cancelback: () => {
          // 取消绘制
          window.console.log('取消绘制');
          clickDone();
        }
      });
    },
    $addLocationMarker(param, layerName = 'location-marker') {
      this.api.clearMarkers({
        layerId: layerName
      });
      // 绘制完成
      this.api.addMarkers({
        isRadia: false,
        layerId: layerName,
        data: [param],
        icon: require('@/assets/images/mouse_location_ing.png'),
        offsetPosition: 'top',
        isFreedom: true
        // color: 'danger'
      });
    },
    $addMarkers({
      data,
      icon,
      layerName = 'marker',
      clickDone = () => {},
      ...other
    }) {
      return this.api.addMarkers({
        layerId: layerName,
        isFocus: false,
        isFill: false,
        isFreedom: true,
        isRadia: false,
        icon,
        click: clickDone,
        data,
        ...other
      });
    },
    $clearMarkers(layerName) {
      // 先判断是否存在
      if (_.has(this.api.markerLayers, layerName)) {
        this.api.clearMarkers({
          layerId: layerName
        });
      }
      if (_.has(this.api.markerLayers, layerName + '_himap-html')) {
        this.api.clearMarkers({
          layerId: layerName + '_himap-html'
        });
      }
    },
    $clearAllMarkers() {
      this.api.clearAllMarkers();
    },
    $initMarkerLayer(name = 'markerLayer', zIndex = 100) {
      const layer = new MarkerProxy(name, zIndex, this.api.map);
      this.cqMarkerLayers[name] = layer;
      return layer;
    },
    // 通过添加弹框方式添加marker,支持多个
    $addCqMarker({
      id,
      layerName,
      position,
      lon,
      lat,
      component,
      data,
      callbacks
    }) {
      let markerLayer = null;
      if (_.has(this.cqMarkerLayers, layerName)) {
        markerLayer = this.cqMarkerLayers[layerName];
      } else {
        markerLayer = this.$initMarkerLayer(layerName);
      }
      const lonlat = new window.hmap.basetype.Coordinate(lon, lat);
      this.api.getProjectCoord(lonlat);
      return markerLayer.addMarkerPop({
        layerName,
        id,
        position,
        lon: lonlat._x,
        lat: lonlat._y,
        component,
        data,
        callbacks
      });
    },
    $clearCqMarkers(layerName) {
      if (_.has(this.cqMarkerLayers, layerName)) {
        const markerLayer = this.cqMarkerLayers[layerName];
        markerLayer.clear();
      }
      // 把marker层清掉时，将之前点开的弹框也清除，恢复到默认值
      if (layerName === this.curPopupLayer) {
        this.curPopupId = '';
        this.curPopupLayer = '';
      }
    },
    // 只支持添加单个
    $createInfoWindow({ position, lon, lat, component, data, callbacks }) {
      // position : 自定义class名便于改变样式
      return this.api.createInfoWindow({
        position,
        color: '',
        isFill: false,
        isFocus: false,
        showClose: false,
        center: {
          longitude: lon,
          latitude: lat
        },
        offset: {
          x: 0,
          y: 0
        },
        centerOffset: {
          x: 0,
          y: 0
        },
        // width: '',
        // height: '',
        callback: id => {
          const Component = Vue.extend(component);
          const vm = new Component({
            propsData: {
              popuData: data
            }
          });
          // 绑定回调事件
          if (callbacks) {
            Object.keys(callbacks).forEach(key => {
              vm.$on(key, callbacks[key]);
            });
          }
          vm.$mount('#' + id);
          vm.$nextTick(() => {
            vm.$on('close', () => {
              this.api.closeInfoWindow();
            });
          });
        }
      });
    },

    $drawHandle({
      type = 'polygon',
      layerName = 'myFeatures',
      editable = true,
      customData = {},
      drawEndDone = () => {},
      editEndDone = () => {},
      cancelDone = () => {},
      clickDone = () => {}
    }) {
      this.api.closeInfoWindow();
      this.api.drawFeature({
        showRadius: true,
        editable,
        layerId: layerName,
        isSingle: false,
        // singleType: 'after',
        type,
        zIndex: 1,
        title: '鼠标点击开始,双击结束,ESC退出',
        style: {},
        buffer: 2, // 缓冲区半径
        radius: 2, // 辐射范围
        customData,
        callback: feature => {
          // 如果不是多边形进行提示
          const { wkt } = feature;
          if (wkt.split(',').length < 4) {
            feature.remove();
            this.$message({
              message: '请绘制多边形',
              type: 'error',
              customClass: 'dark-tip'
            });
            return;
          }
          const center = _.cloneDeep(feature.getExtent().getCenter());
          this.api.getDisplayCoord(center);
          drawEndDone(feature, center);
          // console.log(feature._customData);
        },
        editCallback: editEndDone,
        cancelback: cancelDone,
        click: clickDone
      });
    },
    $addPolygons({
      layerName = 'myFeatures',
      data = [],
      style = {},
      editable = false,
      closeInfoWindow = true,
      addEndDone = () => {},
      editEndDone = () => {},
      clickDone = () => {}
    }) {
      if (closeInfoWindow) {
        this.api.closeInfoWindow();
      }

      // 与默认样式合并
      const defaultStyle = {
        strokeColor: 'brand',
        strokeWidth: 3,
        strokeOpacity: 0.8,
        // strokeStyle: 'longdash',
        fillColor: 'brand',
        fillOpacity: 0.3
      };
      style = Object.assign(defaultStyle, style);
      const features = this.api.addFeatures({
        type: 'polygon',
        layerId: layerName,
        isFocus: false,
        style,
        editable,
        data,
        click: feature => {
          clickDone(feature);
        },
        callback: features => {
          addEndDone(features);
        },
        editCallback: feature => {
          editEndDone(feature);
        }
      });
      return features;
    },
    $clearFeatures(layerName = 'myFeatures') {
      this.api.stopDrawFeature();
      if (_.has(this.api.featureLayers, layerName)) {
        const layer = this.api.featureLayers[layerName];
        layer && layer.removeAllFeatures();
      }

      // 清除竟然是异步操作--内心崩--慎用
      // this.api.clearAllFeatures()
      // this.api.clearFeatures({
      //   layerId: layerName
      // });
    },
    $addMapEvent(name, callback = () => {}) {
      // 不将事件evt返回--避免入参不好判断
      if (this.events.indexOf(name) > -1) {
        this.api.map.event.addListener(window.EventType[name], evt =>
          callback()
        );
      } else {
        this.api.map.event.register(window.EventType[name], evt => callback());
      }
    },
    $removeMapEvent(name, callback = () => {}) {
      if (this.events.indexOf(name) > -1) {
        this.api.map.event.removeListener(window.EventType[name], evt =>
          callback()
        );
      } else {
        this.api.map.event.unRegister(window.EventType[name], evt =>
          callback()
        );
      }
    },
    // 判断一个经纬度是否在一个wkt里面
    $isIntersects(point, wkt) {
      const hmap = window.hmap;
      const wkter = new hmap.format.WKT();
      const geo = wkter.readGeometry(wkt);
      const coord = new hmap.basetype.Coordinate(point.lon, point.lat);
      return geo.atApproximatePoint(coord);
    },
    // 设置中心
    $setCenter(lon, lat, level) {
      this.api.setCenter({
        longitude: lon,
        latitude: lat,
        level: level ? Math.min(this.mapConfig.maxLevel, level) : null
      });
    },
    // 设置图层显示状态
    $setLayerVisible(status, layerName) {
      // hi-map
      if (_.has(this.api.markerLayers, layerName + '_himap-html')) {
        this.api.setLayerVisible(status, layerName + '_himap-html');
      }
      if (_.has(this.api.markerLayers, layerName)) {
        this.api.setLayerVisible(status, layerName);
      }
      if (_.has(this.api.featureLayers, layerName)) {
        const layer = this.api.featureLayers[layerName];
        layer.setVisibility(status);
      }
      // cq-hmap
      if (_.has(this.cqMarkerLayers, layerName)) {
        const markerLayer = this.cqMarkerLayers[layerName];
        markerLayer.setLayerVisible(status);
      }
    },
    $setCqLayerVisible(status, layerName) {
      if (_.has(this.cqMarkerLayers, layerName)) {
        const markerLayer = this.cqMarkerLayers[layerName];
        markerLayer.setLayerVisible(status);
      }
    },
    $getClusterParams() {
      const { level } = this.api.getCenter();
      const { left, bottom, right, top } = this.api.getExtent();
      const { clientHeight, clientWidth } = this.$refs.hmap.$el;
      return {
        height: clientHeight,
        latMax: top,
        latMix: bottom,
        lonMax: right,
        lonMix: left,
        mapLevel: level,
        clusterLevel: this.mapConfig.clusterLevel,
        regWidth: 200,
        width: clientWidth
      };
    },
    $handlePopupShow({ status, data, layerName }) {
      // 是打开弹框，且不是当前已经打开的
      const { id, longitude, latitude } = data;

      if (this.curPopupId) {
        // 以前的弹框层级还原
        document.getElementById(`cqMarkerlayers_${this.curPopupId}`).className =
          '';
      }

      if (status) {
        if (longitude && latitude) {
          this.$setCenter(longitude, latitude);
        }
        const showSinglePopup = true;
        // 找出上一个弹框的图层和弹框，将其关闭
        let markerLayer = null;
        if (
          this.curPopupLayer &&
          _.has(this.cqMarkerLayers, this.curPopupLayer)
        ) {
          markerLayer = this.cqMarkerLayers[this.curPopupLayer];
        }
        // 如果只显示单个弹框将之前的弹框关闭
        if (
          markerLayer &&
          showSinglePopup &&
          this.curPopupId &&
          this.curPopupId !== id
        ) {
          const marker = markerLayer.getMarker(this.curPopupId);
          // popup中的显示方法名
          marker.component.openOrClose();
        }
        // 设置当前显示的弹框id:1、显示，直接设置；
        this.curPopupId = id;
        // 改变当前显示弹框的图层级别--以前的还原，当前的设置高一点
        document.getElementById(`cqMarkerlayers_${id}`).className = 'active';
      } else if (this.curPopupId === id) {
        // 设置当前显示的弹框id:2、关闭，若id同，则清空
        this.curPopupId = '';
      }
      // 当前弹出层--用于将当前id恢复默认
      this.curPopupLayer = layerName;
    }
  }
};
</script>
<style lang="scss">
.hi-map-info-window--pos-custom {
  .hi-map-container__card {
    background: none;
    box-shadow: none;
  }
  .hi-map-info-window__arrow {
    display: none;
  }
}

// 保证cqmarker位于顶层，大于1000
// div[id^=cqMarkerlayers_] {
//   z-index: 1200 !important;
//   &.active{
//     z-index: 1201 !important;
//   }
// }
.ocos-map #markerlayers_grid-text_himap-html > div {
  z-index: 110 !important;
}
.ocos-map #markerlayers_feature-text_himap-html > div {
  z-index: 110 !important;
}
</style>

<style lang="scss" scoped>
.ocos-map {
  color: #1068d3;
}
</style>
