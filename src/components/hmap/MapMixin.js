/*
 * @Descripttion:地图基本操作混入
 * @version:
 * @Author: tanjingjing5
 * @Date: 2021-04-16 14:48:32
 * @LastEditors: tanjingjing5
 * @LastEditTime: 2021-12-30 14:34:36
 */
export default {
  data() {
    return {
      mapManager: null,
      markerLayer: null,
      // 是否只显示单个弹框，默认为true
      showSinglePopup: true,
      // 当前显示的弹框id
      curPopupId: '',
      // id键值属性内容,默认vehicleIndexCode
      markerIdKey: 'indexCode',
      // popup中的显示方法名,默认showInfo
      showPopupFunc: 'showInfo'
    };
  },
  methods: {
    mapReady(mapManager) {
      this.mapManager = mapManager;
      this.markerLayer = mapManager.initMarkerLayer('markerLayer');
      this.removeAllCameraMarker();
      if (this.initData && typeof this.initData === 'function') {
        this.initData();
      }
    },
    setMapCenter(lon, lat, zoom) {
      if (this.mapManager) {
        this.mapManager.setCenter(lon, lat, zoom);
      }
    },
    getMapMaxLevel() {
      // 默认最大层级为16
      return this.mapManager ? this.mapManager.getMaxLevel() || 16 : 16;
    },
    removeAllCameraMarker() {
      if (this.markerLayer) {
        this.markerLayer.clear();
      }
    },
    removeCameraMarker(id) {
      if (this.markerLayer) {
        this.markerLayer.removeMarker(id);
      }
    },
    getMarker(id) {
      if (this.markerLayer) {
        return this.markerLayer.getMarker(id);
      }
      return null;
    },
    // 入参：1、弹框状态true/false,2、弹框内数据data
    handlePopupShow({ status, data, type }) {
      const id = data[this.markerIdKey];
      // 是打开弹框，且不是当前已经打开的
      if (status) {
        const lon = data.longitude || 0;
        const lat = data.latitude || 0;
        const zoom = this.getMapMaxLevel();
        this.setMapCenter(lon, lat, zoom);

        // 如果只显示单个弹框将之前的弹框设置为空---点击的不是同一个点位
        if (this.showSinglePopup && this.curPopupId && this.curPopupId !== id) {
          const marker = this.markerLayer.getMarker(this.curPopupId);
          // popup中的显示方法名
          marker && marker.component[this.showPopupFunc]();
        }

        // 如果是外部选中点开弹框--默认type是自身click --- 点击的不是同一个点位
        if (type === 'select' && this.curPopupId !== id) {
          const marker = this.markerLayer.getMarker(id);
          // popup中的显示方法名
          marker && marker.component[this.showPopupFunc]();
        }

        // 设置当前显示的弹框id:1、显示，直接设置；
        this.curPopupId = id;
      } else if (this.curPopupId === id) {
        // 设置当前显示的弹框id:2、关闭，若id同，则清空
        this.curPopupId = '';
      }
    }
  }
};
