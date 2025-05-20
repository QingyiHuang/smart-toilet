/*
 * @Descripttion:矢量要素绘制
 * @version:
 * @Author: tanjingjing5
 * @Date: 2021-08-05 20:42:35
 * @LastEditors: tanjingjing5
 * @LastEditTime: 2021-12-30 18:19:01
 */
/* eslint-disable */
import axios from "axios";
import { v1 as uuidv1 } from "uuid";
import MapUtils from "./MapUtils";
// 线
const lineSymbolDefault = new hmap.style.LineSymbol({
  width: 1,
  color: new hmap.style.Color(245, 67, 54, 0),
  lineStyle: "solid",
  dashRatio: [1, 1, 0, 0],
});
const lineSymbolHight = new hmap.style.LineSymbol({
  width: 4,
  // color: new hmap.style.Color(245, 67, 54, 0.3),
  color: new hmap.style.Color(0, 144, 255),
  // 使用渐变色--无效
  // color: [0, new hmap.style.Color(0, 144, 255), 1.0, new hmap.style.Color(0, 255, 251)],
  lineStyle: "solid",
  // dashRatio: [1, 1, 0, 0]
});
// 面
const polygonFillColorDefault = new hmap.style.ColorFill(
  new hmap.style.Color(245, 67, 54, 0)
);
const polygonFillColorHight = new hmap.style.ColorFill(
  new hmap.style.Color(0, 144, 255, 0.2)
);
// 图标
const icon = new hmap.style.Icon({
  color: new hmap.style.Color(0.0, 0.0, 0.0, 0.0),
  imgSrc: require("@/src/assets/icons/location.svg"),
  size: new hmap.basetype.Size(24, 35),
  anchor: [0.5, 0.5],
  offset: new hmap.basetype.Offset(0, 0, 0),
  rotation: 0,
});

const lineStyleDefault = new hmap.style.Style({
  lineSymbols: [lineSymbolDefault],
  fillSymbols: [polygonFillColorDefault],
});
const lineStyleHight = new hmap.style.Style({
  lineSymbols: [lineSymbolHight],
  // 面不使用颜色
  fillSymbols: [polygonFillColorHight],
  markerSymbols: [icon],
});
export default class VectorProxy {
  constructor(name, map, config) {
    this.vectorLayer = new hmap.layer.VectorLayer(name || "矢量要素", {
      enableHashCode: true, //拾取需设置该参数为true
    });
    map.addLayer(this.vectorLayer);
    this.map = map;
    this.currentMapStyle = {};
    this.setMapStyle(config);
    this.features = new Map();
  }

  setMapStyle(config) {
    // 获取地图的样式
    let styleUrl = config.styleUrl;
    axios
      .get(styleUrl, {}, { timeout: 1800000 })
      .then((res) => {
        this.currentMapStyle = res.data;
      })
      .catch((e) => {
        this.currentMapStyle = {};
      });
  }
  // 生成点位要素
  addPoint(lon, lat, imgSrc = "", id = "location", name = "标记") {
    // 4326转900913
    const xy = MapUtils.formatPoint(this.map.getCrs().getSrid(),[lon, lat]);
    // 本来xy返回的就是coord,不知道为什么就是报错格式不对
    const coord = new hmap.basetype.Coordinate(xy._x, xy._y);
    const point = new hmap.geom.Point(coord);
    const markerSymbol = new hmap.style.Icon({
      opacity: 1.0,
      imgSrc: imgSrc || require("@/src/assets/images/location.png"),
      size: new hmap.basetype.Size(30, 30),
      anchor: [0.5, 1], // 锚点位置，默认图标中心
    });
    const markerStyle = new hmap.style.Style({
      markerSymbols: [markerSymbol],
    });
    const pointFeature = new hmap.feature.Vector(
      point,
      { name, id },
      markerStyle
    );
    this.vectorLayer.addFeature(pointFeature);
    this.features.set(`feature_${uuidv1()}`, pointFeature);
    return pointFeature;
  }

  // addPoint() {
  //   const coord = new hmap.basetype.Coordinate(120.222322, 30.210413);
  //   const pt = new hmap.geom.Point(coord);
  //   let iconSymbol = new hmap.style.Icon({
  //     imgSrc: "../public/imgs/man.png",
  //   });
  //   let style = new hmap.style.Style({
  //     markerSymbols: [iconSymbol],
  //   });
  //   const ptFeature = new hmap.feature.Vector(pt, {}, style);
  //   this.vectorLayer.addFeature(ptFeature);
  //   this.features.set(`feature_${uuidv1()}`, ptFeature);
  // }

  addLine() {
    const coords = [
      [120.222322, 30.220413],
      [120.212163, 30.222204],
    ];
    const pts = coords.map((value) => {
      const coord = new hmap.basetype.Coordinate(...value);
      const pt = new hmap.geom.Point(coord);
      return pt;
    });
    const lineGeom = new hmap.geom.Line(pts);
    const lineSymbol = new hmap.style.LineSymbol({
      color: new hmap.style.Color(255, 0, 0, 0.8),
      width: 2,
      lineStyle: "solid",
      lineCap: "square",
    });
    const lineStyle = new hmap.style.Style({
      lineSymbols: [lineSymbol],
    });
    const lineFeature = new hmap.feature.Vector(lineGeom, {}, lineStyle);
    this.vectorLayer.addFeature(lineFeature);
    this.features.set(`feature_${uuidv1()}`, lineFeature);
  }

  addPolygon() {
    const coords = [
      [120.222922, 30.220413],
      [120.223163, 30.232204],
      [120.237032, 30.220515],
      [120.232322, 30.213413],
    ];
    const pts = coords.map((value) => {
      const coord = new hmap.basetype.Coordinate(...value);
      const pt = new hmap.geom.Point(coord);
      return pt;
    });
    const lineRing = new hmap.geom.LinearRing(pts);
    const polygonGeom = new hmap.geom.Polygon([lineRing]);
    const fillSymbol = new hmap.style.ColorFill(
      new hmap.style.Color(200, 200, 0, 1)
    );
    const polygonStyle = new hmap.style.Style({
      fillSymbols: [fillSymbol],
    });
    const polygonFeature = new hmap.feature.Vector(
      polygonGeom,
      {},
      polygonStyle
    );
    this.vectorLayer.addFeature(polygonFeature);
    this.features.set(`feature_${uuidv1()}`, polygonFeature);
  }

  // 创建白模
  addStretch() {
    const polygonFeature = new hmap.feature.Vector(polygonGeom, {
      surfaceColor: new hmap.style.Color(0, 200, 200, 0.7),
      height: 500,
    });
    const stretch = new hmap.model.Stretch(polygonFeature);
    this.vectorLayer.addFeature(stretch);
    this.features.set(`feature_${uuidv1()}`, stretch);
  }

  // 全局搜索后，增加搜索结果
  addSearchResult(item) {
    //全图搜索接口 hmapadministrator/v3/style/map/mapSearch
    // 开始渲染
    let geoJSON = new hmap.format.GeoJSON();
    let vector = geoJSON.readFeature(item);
    vector.setStyle(lineStyleHight);
    this.vectorLayer.addFeature(vector);
    this.features.set(item.id || `feature_${uuidv1()}`, vector);

    // 判断是否将多边形移动至中间
    if (!item.moveToCenter) {
      return;
    }
    if (item.geometry.type !== "Point") {
      this.map.zoomToExt(vector.getExtent());
    } else {
      let center = new hmap.basetype.Coordinate(
        item.geometry.coordinates[0],
        item.geometry.coordinates[1]
      );
      if (item.properties.table) {
        let labelName = Object.keys(this.currentMapStyle).find((value) => {
          return item.properties.table.indexOf(value) > -1;
        });
        let pointZoom = 16;
        if (
          labelName &&
          this.currentMapStyle[labelName].rules &&
          this.currentMapStyle[labelName].rules[0].minLevel
        ) {
          pointZoom = this.currentMapStyle[labelName].rules[0].minLevel;
        }
        this.map.setCenter(center, pointZoom);
      }
    }
  }

  // 闪烁区域
  twindkleArea(vector) {
    let changeFlag = 0;
    let timer = setInterval(() => {
      if (changeFlag % 2 === 0) {
        vector.setStyle(lineStyleHight);
      } else {
        vector.setStyle(lineStyleDefault);
      }
      this.vectorLayer.updateFeatures([vector]);
      changeFlag++;
    }, 500);
    setTimeout(() => {
      clearInterval(timer);
      this.vectorLayer.removeFeature(vector);
    }, 5000);
  }

  removeFeature(id) {
    const marker = this.features.get(id);
    if (marker) {
      this.vectorLayer.removeFeature(marker);
    }
  }

  getFeature(id) {
    return this.features.get(id);
  }

  clear() {
    this.vectorLayer.removeAllFeatures();
    this.features.clear();
  }

  hideFeature(id) {
    const feature = this.features.get(id);
    if (feature) {
      feature.setVisibility(false);
    }
  }
  showFeature(id) {
    const feature = this.features.get(id);
    if (feature) {
      feature.setVisibility(true);
    }
  }

  hideAll() {
    this.vectorLayer.setVisibility(false);
  }
  showAll() {
    this.vectorLayer.setVisibility(true);
  }
}
