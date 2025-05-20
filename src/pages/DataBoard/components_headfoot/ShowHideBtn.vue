<template>
  <div :class="{ showHideBtn: true, hidebtn: active }" @click="showHide"></div>
</template>

<script>
export default {
  data() {
    return { active: false };
  },
  methods: {
    showHide() {
      this.active = !this.active;
      this.$emit('showHidePanel', this.active);
    }
  }
};
</script>

<style lang="scss" scoped>
.showHideBtn {
  height: 40px;
  width: 40px;
  position: absolute;
  top: 32px;
  right: 432px;
  background: url('~@/assets/images/databoard/pnl-地图工具栏01.png') no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    left: 50%;
    top: 50%;
    margin-left: -12px;
    margin-top: -12px;
    background: url('~@/assets/images/databoard/toolbar-全屏-默认.png')
      no-repeat;
    background-size: 100% 100%;
  }
}
.hidebtn {
  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    left: 50%;
    top: 50%;
    margin-left: -12px;
    margin-top: -12px;
    background: url('~@/assets/images/databoard/toolbar-退出全屏-默认.png')
      no-repeat;
    background-size: 100% 100%;
  }
}
</style>
