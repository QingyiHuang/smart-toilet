<template>
  <div class="guideBackGround">
    <img class="imgback" :src="imgback" />
    <!-- 根据pointList进行撒点 -->
    <div
      v-for="item in nanList"
      ref="male"
      :key="item.id"
      :style="{ left: `${item.left}px`, top: `${item.top}px` }"
      class="maleMarker"
    ></div>
    <div
      v-for="item in nvList"
      ref="male"
      :key="item.id"
      :style="{ left: `${item.left}px`, top: `${item.top}px` }"
      class="femaleMarker"
    ></div>
    <div
      v-for="item in freeNanList"
      ref="male"
      :key="item.id"
      :style="{ left: `${item.left}px`, top: `${item.top}px` }"
      class="maleMarkerActive"
    ></div>
    <div
      v-for="item in freeNvList"
      ref="male"
      :key="item.id"
      :style="{ left: `${item.left}px`, top: `${item.top}px` }"
      class="femaleMarkerActive"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgback: '',
      nvList: [],
      freeNvList: [],
      freeNanList: [],
      nanList: []
    };
  },
  methods: {
    setValue(img, point1, point1all, point2, point2all) {
      this.nvList = [];
      this.nanList = [];
      this.imgback = img;
      (point1all || []).map(item => {
        if (item.position) {
          const arr = item.position.split(',');
          if (arr[2] === 'male') {
            this.nanList.push({
              left: Number(arr[0]),
              top: Number(arr[1]),
              id: item.id
            });
          }
        }
      });
      (point2all || []).map(item => {
        if (item.position) {
          const arr = item.position.split(',');
          this.nvList.push({
            left: Number(arr[0]),
            top: Number(arr[1]),
            id: item.id
          });
        }
      });
      (point1 || []).map(item => {
        if (item.position) {
          const arr = item.position.split(',');
          this.freeNanList.push({
            left: Number(arr[0]),
            top: Number(arr[1]),
            id: item.id
          });
        }
      });
      (point2 || []).map(item => {
        if (item.position) {
          const arr = item.position.split(',');
          this.freeNvList.push({
            left: Number(arr[0]),
            top: Number(arr[1]),
            id: item.id
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.guideBackGround {
  height: 496px;
  width: 856px;
  position: absolute;
  top: 200px;
  left: 50%;
  margin-left: -428px;
  .imgback {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.maleMarker {
  width: 16px;
  height: 40px;
  position: absolute;
  background: url('~@/assets/guide/男厕-在用.png') no-repeat;
  background-size: 100% 100%;
}
.maleMarkerActive {
  width: 16px;
  height: 40px;
  position: absolute;
  background: url('~@/assets/guide/男厕-空闲.png') no-repeat;
  background-size: 100% 100%;
}
.femaleMarker {
  width: 16px;
  height: 40px;
  position: absolute;
  background: url('~@/assets/guide/女厕-在用.png') no-repeat;
  background-size: 100% 100%;
}
.femaleMarkerActive {
  width: 16px;
  height: 40px;
  position: absolute;
  background: url('~@/assets/guide/女厕-空闲.png') no-repeat;
  background-size: 100% 100%;
}
</style>
