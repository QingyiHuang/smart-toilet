<template>
  <div class="alarmRedBox">
    <div class="alarmBox"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.alarmRedBox {
  width: 560px;
  height: 116px;
  background: url('~@/assets/images/databoard/pnl-告警列表.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 86px;
  left: 50%;
  margin-left: -280px;
  .alarmBox {
    width: 356px;
  }
}
</style>
