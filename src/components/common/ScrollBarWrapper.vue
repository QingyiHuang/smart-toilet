<template>
  <div class="full" style="padding: 0 0 0 0">
    <el-scrollbar
      ref="scrollbar"
      wrap-class="full-wrapper"
      @on-scrolling-y="scrollingY"
    >
      <div :style="style" class="wrap">
        <slot></slot>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'ScrollbarWrapper',
  props: {
    rightPadding: {
      type: Number,
      default: 12
    }
  },
  computed: {
    style() {
      const value = this.rightPadding;
      return `padding-right: ${value}px`;
    }
  },
  methods: {
    scrollingY(params) {
      // 滚动到底部通知父组件
      if (params.percentY === 1) {
        this.$emit('scroll-bottom');
      }
      // 滚动时通知父组件
      this.$emit('scroll-y', params.scrollTop);
    },
    setScroll(top) {
      this.$refs.scrollbar.setScroll(top);
    }
  }
};
</script>

<style lang="scss" scoped>
.full {
  position: relative;
  width: 100%;
  height: 100%;
}
::v-deep .full-wrapper {
  height: 100%;
  overflow-x: hidden;
}
</style>
