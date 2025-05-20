/*
 * @Descripttion:
 * @version:
 * @Author: tanjingjing5
 * @Date: 2021-04-19 10:52:05
 * @LastEditors: tanjingjing5
 * @LastEditTime: 2022-01-26 12:41:37
 */
/* eslint-disable */
import Vue from "vue";
import { v1 as uuidv1 } from "uuid";
export default class MarkerProxy {
  constructor(name, zIndex, map) {
    this.markerLayer = new hmap.layer.OverlayLayer(name);
    map.addLayer(this.markerLayer, zIndex);
    this.map = map;
    this.markers = new Map();
  }

  // 添加markerPop
  addMarkerPop(params) {
    if (!params.id) {
      params.id = `marker_${uuidv1()}`;
    }
    if (!params.layerName) {
      params.layerName = uuidv1();
    }
    const lonlat = new hmap.basetype.Coordinate(params.lon, params.lat);
    const dom = document.createElement("div");
    dom.setAttribute("id", params.id);
    dom.setAttribute("class", "map-marker");
    const container = document.createElement("div");
    container.setAttribute("id", "container-" + params.id);
    dom.appendChild(container);
    const marker = new hmap.overlay.SimplePopup({
      domId: "cqMarkerlayers_" + params.id,
      location: lonlat,
      element: dom
    });
    this.markers.set(params.id, marker);
    this.markerLayer.addOverlay(marker);
    // 绑定vue组件
    const PopuComponentClass = Vue.extend(params.component);
    const popuComponent = new PopuComponentClass({
      propsData: {
        popuData: params.data
      }
    });
    // 绑定回调的事件
    if (params.callbacks) {
      Object.keys(params.callbacks).forEach(key => {
        popuComponent.$on(key, params.callbacks[key]);
      });
    }
    popuComponent.$mount(`#container-${params.id}`);
    marker.component = popuComponent;
    // 保存点位基本数据
    marker.data = params.data;
    return marker;
  }

  removeMarker(id) {
    const marker = this.markers.get(id);
    if (marker) {
      this.markerLayer.removeOverlay(marker);
    }
  }

  getMarker(id) {
    return this.markers.get(id);
  }

  clear() {
    this.markerLayer.removeAllOverlays();
    this.markers.clear();
  }

  hideMarker(id) {
    const marker = this.markers.get(id);
    if (marker) {
      marker.setVisibility(false);
    }
  }
  showMarker(id) {
    const marker = this.markers.get(id);
    if (marker) {
      marker.setVisibility(true);
    }
  }
  hideAll() {
    this.markerLayer.setVisibility(false);
  }
  showAll() {
    this.markerLayer.setVisibility(true);
  }
  setLayerVisible(status) {
    this.markerLayer.setVisibility(status);
  }
}
