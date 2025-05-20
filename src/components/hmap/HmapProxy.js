/* eslint-disable */
import MapUtils from "./MapUtils";
import MarkerProxy from "./MarkerProxy";
import VectorProxy from "./VectorProxy";
// import axios from "axios";
import * as _ from "lodash";

// 重庆中心
const defaultCenter = [106.33, 29.35];
const mapConfig = {
  zoom: 17, //默认：18
  minLevel: 7,
  maxLevel: 20,
  crs: "4326",
  center: defaultCenter,
  enableRotate: true,
  // 最大俯仰角角度 0-85
  // maxPitch: 85,
  // 俯仰角
  // pitch: 45,
  // 方位角
  // bearing: 0,
  enableZoom: true,
  enablePan: true,
  hvtUrl: "/hmap-server/hvt/",
  styleUrl: "/hmap-server/hvt/MapStyle.json",
};
export default class HmapProxy {
  constructor(params) {
    this.readyCallback = params.readyCallback || null;
    _.merge(mapConfig, params.configs || {});
    // 如果是高德，crs固定为900913
    mapConfig.crs = mapConfig.isGaode === true ? "900913" : mapConfig.crs;
    this.mapOptions = _.cloneDeep(mapConfig);
    // 格式化参数
    this.mapOptions.crs = new hmap.proj.Crs(mapConfig.crs);
    this.mapOptions.center = MapUtils.formatPoint(
      mapConfig.crs,
      mapConfig.center || defaultCenter
    );
    this.mapOptions.restrictedExtent = buildExtent(mapConfig.crs);
    // 全部挂载在window---回调只有这样写，在initLayer中才能获取到this内容
    const map = new hmap.Map(params.el, this.mapOptions);
    window.map = map;
    if (this.mapOptions.isGaode === true) {
      this.initGaodeMap();
    } else {
      // map.rotate("pitch", 45);
      this.initBaseLayer();
    }
    // const that = this;
    // this.addMapEvent(EventType.LAYEREVENT_LOADEND, that.readyCallback);
    if (process.env.NODE_ENV !== "production") {
      this.addMousePosition();
    }
  }

  /* 地图基础图层*/
  initBaseLayer() {
    // 添加矢量切片图层
    const vectorTileLayer = new hmap.layer.VectorTileLayer(
      "矢量切片图层",
      mapConfig.hvtUrl,
      {
        matrixOrigin: new hmap.basetype.Coordinate(-180, 90),
        dataFormat: "hvt",
        styleUrl: mapConfig.styleUrl,
        labelOn: true,
        isLGD: false,
        isRTE: true,
      }
    );
    window.map.addLayer(vectorTileLayer);
  }

  addMousePosition() {
    // 添加鼠标坐标--
    let optionStyle = {
      style:
        "position: absolute;right: 20px;bottom: 20px;color:#ff0000;font-size:28px;zIndex:999;background-color: white;",
    };
    const mousePosition = new hmap.control.MousePosition(optionStyle);
    window.map.addControl(mousePosition);
  }

  // 初始化高德在线地图
  initGaodeMap() {
    const gaodeMapUrl =
      "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
    let tileLayer = new hmap.layer.TMSLayer("gaode", gaodeMapUrl, {
      matrixOrigin: new hmap.basetype.Coordinate(
        -20037508.342789,
        20037508.342789
      ),
      dataFormat: "png",
    });
    window.map.addLayer(tileLayer);
  }

  initMarkerLayer(name = "markerLayer", zIndex = 100) {
    return new MarkerProxy(name, zIndex, window.map);
  }

  initVectorProxy(name = "vectorLayer") {
    return new VectorProxy(name, window.map, mapConfig);
  }

  addMapEvent(name, callback) {
    window.map.event.addListener(name, (event) => {
      if (callback) {
        callback(event);
      }
    });
  }
  getMapInstance() {
    return window.map;
  }

  getMaxLevel() {
    return this.mapOptions.maxLevel;
  }
  getMinLevel() {
    return this.mapOptions.minLevel;
  }

  setCenter(lon, lat, zoom = window.map.getZoom()) {
    let xy = MapUtils.formatPoint(mapConfig.crs, [lon, lat]);
    let center = new hmap.basetype.Coordinate(xy._x, xy._y);
    window.map.setCenter(center, zoom);
  }

  // 上一个地图层级--放大
  upMapZoom() {
    window.map.zoomIn();
  }
  // 下一个地图层级--缩小
  downMapZoom() {
    window.map.zoomOut();
  }

  // 左转视野
  leftMapScreen() {
    window.map.rotate("bearing", -10);
  }

  // 右转视野
  rightMapScreen() {
    window.map.rotate("bearing", 10);
  }
  // 重置视野
  resetScreen() {
    const pitch = this.mapOptions.pitch - window.map.getRotateAngle("pitch");
    window.map.rotate("pitch", pitch);
    window.map.rotate("bearing", this.mapOptions.bearing, true);
  }

  // 重置地图层级+视野
  resetMap() {
    const pitch = this.mapOptions.pitch - window.map.getRotateAngle("pitch");
    // 调整俯仰角不能从0开始计算--可能是map的bug
    window.map.rotate("pitch", pitch);
    window.map.rotate("bearing", this.mapOptions.bearing, true);
    window.map.setCenter(this.mapOptions.center, this.mapOptions.zoom);
  }
}

/**
 * 创建中心点，需要的时候转坐标系
 * @param {*} center  中心点坐标数组
 */
function buildCenter(srid, center) {
  let coord = new hmap.basetype.Coordinate(center[0], center[1]);
  if (srid === "900913" && center[0] <= 360) {
    // 4326 转 900913
    coord = MapUtils.transform(center[0], center[1], "4326", "900913");
  }
  if (srid === "4326" && center[0] > 360) {
    // 900913 转 4326
    coord = MapUtils.transform(center[0], center[1], "900913", "4326");
  }
  return coord;
}

/**
 * 创建边界
 * @param {*} srid
 * 3857 === 900913
 */
function buildExtent(srid) {
  let leftBottom = new hmap.basetype.Coordinate(-180, -90);
  let rightTop = new hmap.basetype.Coordinate(180, 90);
  if (srid !== "4326") {
    leftBottom = hmap.proj.Transformer.transform(leftBottom, 4326, 3857);
    rightTop = hmap.proj.Transformer.transform(rightTop, 4326, 3857);
  }
  return new hmap.basetype.Extent(
    leftBottom.getOrdinate("X"),
    leftBottom.getOrdinate("Y"),
    rightTop.getOrdinate("X"),
    rightTop.getOrdinate("Y")
  );
}
