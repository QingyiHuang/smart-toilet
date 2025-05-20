<template>
  <div class="headerpart">智慧公厕</div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import './font.css';
.headerpart {
  height: 70px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('~@/assets/images/databoard/pnl-头部标题.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;
  line-height: 56px;
  z-index: 300;
  opacity: 0.9;
  font-family: YouSheBiaoTiHei;
  font-size: 30px;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 1px 0 rgba(44, 154, 232, 0.5);
}
</style>
