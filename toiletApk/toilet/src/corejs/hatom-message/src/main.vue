<template>
<transition name="hatom-message-fade">
  <div
    v-show="visible"
    class="hatom-message"
  >
    <p>{{ message }}</p>
  </div>  
</transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      closed: false
    };
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.hatom-message {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 999;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hatom-message-fade-enter,
.hatom-message-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.hatom-message-fade-enter-active,
.hatom-message-fade-leave-active {
  transition: 0.3s;
}
</style>