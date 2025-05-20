<template>
  <div class="map-location">
    <el-dialog
      title="经纬度选择"
      :visible.sync="dialogVisible"
      :area="960"
      @opened="mapConfig"
      @closed="closeMap"
    >
      <div class="map-content">
        <div id="hmapLocation"></div>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </template>
    </el-dialog>
    <el-row :gutter="8">
      <el-col :span="12">
        <el-input v-model="lon" disabled />
      </el-col>
      <el-col :span="12">
        <el-input v-model="lat" disabled />
      </el-col>
    </el-row>
    <el-button
      class="location-btn"
      type="iconButton"
      icon="h-icon-location"
      @click="dialogVisible = true"
    />
  </div>
</template>

<script>
import OrgApi from '@/api/org';
let map, clusterVectLayer, mouseTip;
export default {
  props: {
    defaultValue: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      lon: '',
      lat: '',
      lonlat: [],
      MapBaseUrl:
        process.env.NODE_ENV === 'development'
          ? 'https://test'
          : window.location.origin
    };
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler(val) {
        if (val.length === 2) {
          this.lon = val[0] || '';
          this.lat = val[1] || '';
        }
      }
    }
  },
  methods: {
    mapConfig() {
      OrgApi.mapConfig({})
        .then(res => {
          if (res.code === '0') {
            const { data } = res;
            this.initMap(
              data.longitude || 122.207395,
              data.latitude || 29.985578
            );
            this.center = [data.longitude, data.latitude];
          }
        })
        .catch(() => {
          this.$message.warning('地图配置接口获取失败');
        });
    },
    initMap(lon = 122.207395, lat = 29.985578) {
      // 中心点, 如果已撒点，则以已撒的点为中心点，否则以接口为准
      if (this.lon && this.lat) {
        lon = this.lon;
        lat = this.lat;
      }
      const centerPoint = [parseFloat(lon), parseFloat(lat)];
      const mapOptions = {
        zoom: 14, // 初始级别：初始化地图的默认级别
        minLevel: 9, //  地图放缩的最小级别，默认为0
        maxLevel: 18, //  地图放缩的最小级
        center: new window.hmap.basetype.Coordinate(
          centerPoint[0],
          centerPoint[1],
          0
        ), // 中心点：初始化地图的默认中心位置
        crs: new window.hmap.proj.Crs('4326')
      };
      map = new window.hmap.Map('hmapLocation', mapOptions);
      const darkStyleUrl = `${this.MapBaseUrl}/hmap-server/hvt/hvt_zs/style.json`;
      const vtOptions = {
        matrixOrigin: new window.hmap.basetype.Coordinate(-180, 90), // 切片原点
        dataFormat: 'hvt', // 切片格式
        labelOn: true, // 是否显示文字标注
        styleUrl: darkStyleUrl, // 矢量切片样式文件地址
        isRTE: true,
        static: false
      };
      // 创建矢量切片图层，需要指定切片所在位置，以及基本的参数设置
      const hvtUrl = `${this.MapBaseUrl}/hmap-server/hvt/hvt_zs/`;
      // 初始化矢量切片图层
      const vectilelayer = new window.hmap.layer.VectorTileLayer(
        '矢量切片图层',
        hvtUrl,
        vtOptions
      );
      // 添加至地图对象
      map.addLayer(vectilelayer);
      // 开启要素交互
      map.enableInteractive();
      // 点图层
      clusterVectLayer = new window.hmap.layer.VectorLayer('marker2', {
        isRTE: true,
        enableHashCode: true
      });
      map.addLayer(clusterVectLayer, 2);
      this.initTipControl();
      this.registerAddMarker();
    },
    // 初始化鼠标提示，完成鼠标移动监听
    initTipControl() {
      mouseTip = new window.hmap.control.MouseTipControl({
        offsetX: 10,
        offsetY: 10
      });
      mouseTip.setTipContent('单击标注位置');
      map.addControl(mouseTip);
      // map.event.register(EventType.MAPMOUSEEVENT_MOUSEMOVE, detectFeature);
    },
    // 创建鼠标在地图上的点击事件
    registerAddMarker() {
      // 初始化，如果lon，lat不为空，则在地图上进行标点
      if (this.lon && this.lat) {
        this.addMarker(this.lon, this.lat);
      }
      const _this = this;
      map.event.register(EventType.MAPMOUSEEVENT_CLICK, function (event) {
        _this.addMarker(event.lonlat._x, event.lonlat._y);
      });
    },
    addMarker(lon, lat) {
      clusterVectLayer.removeAllFeatures();
      const point = new window.hmap.geom.Point(
        new window.hmap.basetype.Coordinate(parseFloat(lon), parseFloat(lat))
      );
      this.lonlat = [parseFloat(lon), parseFloat(lat)];
      // mark符号
      const size = new window.hmap.basetype.Size(40, 40);
      const offset = new window.hmap.basetype.Offset(0, -10, 0);
      const markerSymbol = new window.hmap.style.Icon({
        opacity: 1.0, // 设置marker的透明度，可以为[0,1]区间内的任意值，0表示完全透明，1表示完全不透明
        imgSrc: require('@/assets/images/pos.png'), // 设置marker的图片路径
        size, // 设置marker的大小,单位为像素
        offset
      });
      const markerStyle = new window.hmap.style.Style({
        markerSymbols: [markerSymbol]
      });
      const pointFeature = new window.hmap.feature.Vector(
        point,
        {},
        markerStyle
      );
      clusterVectLayer.addFeatures([pointFeature]);
      // mouseTip
      // mouseTip.setTipContent('');
    },
    closeMap() {
      clusterVectLayer = null;
      mouseTip = null;
      map.destroy();
      map = null;
    },
    confirm() {
      if (this.lonlat && this.lonlat.length) {
        this.lon = this.lonlat[0];
        this.lat = this.lonlat[1];
        this.$emit('change', this.lon, this.lat);
        this.dialogVisible = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body-wrapper {
  padding: 0 !important;
}
::v-deep .olControlMouseTipControl {
  transform: translate(12px, 4px);
  border: none !important;
  padding: 8px !important;
  width: auto !important;
}
::v-deep .pos-marker {
  position: absolute;
  left: -20px;
  top: -34px;
  width: 40px;
  height: 40px;
  background: url('~@/assets/images/pos.png') center no-repeat;
}
.map-location {
  position: relative;
  height: 32px;
  padding-right: 40px;
  .location-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.map-content {
  width: 100%;
  height: 560px;
  #hmapLocation {
    width: 100%;
    height: 100%;
  }
}
</style>
