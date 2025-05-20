const hmap = window.hmap;
export default class MapUtils {
  /**
   * 坐标转换测试
   */
  static transform(lon, lat, source = '900913', dest = '4326') {
    const coord = new hmap.basetype.Coordinate(lon, lat);
    hmap.proj.Transformer.add('900913');
    // 坐标转换
    const coord1 = hmap.proj.Transformer.transform(coord, source, dest);
    // return coord1.toFixed(dest === '4326' ? 6 : 5)
    return coord1;
  }

  /**
   * 根据地图坐标系格式化地图上的点
   * @param {*} srid
   * @param {*} center
   * @returns
   */
  static formatPoint(srid, center) {
    let coord = new hmap.basetype.Coordinate(center[0], center[1]);
    if (srid === '900913' && center[0] <= 360) {
      // 4326 转 900913
      coord = MapUtils.transform(center[0], center[1], '4326', '900913');
    }
    if (srid === '4326' && center[0] > 360) {
      // 900913 转 4326
      coord = MapUtils.transform(center[0], center[1], '900913', '4326');
    }
    return coord;
  }

  /**
   * @description: 坐标转换，4326坐标系转3857
   * @param {number} lon 经度
   * @param {number} lat 纬度
   * @return {*} 坐标对象
   */
  static lonLatTransform(lon, lat) {
    let coord3857 = new hmap.basetype.Coordinate(lon, lat);
    if (lon <= 360) {
      // web端标注的经纬度，app拿到之后需要先进行加密，否则会有偏移
      const newLonlat = hmap.proj.Transformer.WGS84ToGCJ02([lon, lat]);
      const coord = new hmap.basetype.Coordinate(newLonlat[0], newLonlat[1]);
      coord3857 = hmap.proj.Transformer.transform(coord, 4326, 3857);
    }
    return coord3857;
  }

  // 创建周边范围圆的wkt
  static creatCircleWkt(lon, lat, radius = 1000) {
    // 4326下时度，将米转换为度
    const crs = new hmap.proj.Crs('4326');
    const r = crs.getDegreePerMeter(lat) * radius;
    const center = new hmap.geom.Point(new hmap.basetype.Coordinate(lon, lat));
    const circle = new hmap.geom.Circle(center, r);
    const wkt = new hmap.format.WKT();
    const result = wkt.writeGeometry(circle, 2);
    return result;
  }
}
