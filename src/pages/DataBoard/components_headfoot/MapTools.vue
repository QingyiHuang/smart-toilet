<template>
  <div class="mapToolBox">
    <div class="topBtn" @click.stop.prevent="mapOption('center')"></div>
    <div class="footerBtn">
      <div class="ftopBtn" @click.stop.prevent="mapOption('zoomin')"></div>
      <div class="fbottomBtn" @click.stop.prevent="mapOption('zoomout')"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    mapOption(val) {
      this.$emit('mapOpt', val);
    }
  }
};
</script>

<style lang="scss" scoped>
.mapToolBox {
  height: 128px;
  width: 40px;
  position: absolute;
  right: 432px;
  bottom: 32px;
  .topBtn {
    height: 40px;
    width: 40px;
    left: 0;
    top: 0;
    background: url('~@/assets/images/databoard/pnl-地图工具栏01.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    cursor: pointer;
    &::before {
      content: '';
      width: 24px;
      height: 24px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -12px;
      margin-top: -12px;
      background: url('~@/assets/images/databoard/toolbar-回原点-默认.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }
  .footerBtn {
    height: 80px;
    width: 40px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: url('~@/assets/images/databoard/pnl-地图工具栏02.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    .ftopBtn {
      width: 24px;
      height: 24px;
      position: absolute;
      left: 50%;
      top: 8px;
      margin-left: -12px;
      background: url('~@/assets/images/databoard/toolbar-放大-默认.png')
        no-repeat;
      background-size: 100% 100%;
    }
    .fbottomBtn {
      width: 24px;
      height: 24px;
      position: absolute;
      left: 50%;
      bottom: 8px;
      margin-left: -12px;
      background: url('~@/assets/images/databoard/toolbar-缩小-默认.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
