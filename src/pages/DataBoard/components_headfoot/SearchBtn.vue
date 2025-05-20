<template>
  <div
    :class="{ searchBtn: true, searchBtnActive: active }"
    @click="toggleActive"
  >
    搜索
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    };
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
      if (this.active) {
        this.$emit('showSearch');
      } else {
        this.$emit('closeSearch');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.searchBtn {
  background: url('~@/assets/images/databoard/btn-搜索-默认.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  width: 94px;
  height: 44px;
  left: 440px;
  top: 24px;
  transition: all 0.1s ease;
  z-index: 301;
  cursor: pointer;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: right;
  line-height: 44px;
  padding-right: 18px;
  &:hover {
    background: url('~@/assets/images/databoard/btn-搜索-悬停.png') no-repeat;
    background-size: 100% 100%;
  }
  &:active {
    background: url('~@/assets/images/databoard/btn-搜索-选中.png') no-repeat;
    background-size: 100% 100%;
  }
}
.searchBtnActive {
  background: url('~@/assets/images/databoard/btn-搜索-选中.png') no-repeat;
  background-size: 100% 100%;
  &:hover {
    background: url('~@/assets/images/databoard/btn-搜索-选中.png') no-repeat;
    background-size: 100% 100%;
  }
  &:active {
    background: url('~@/assets/images/databoard/btn-搜索-悬停.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
