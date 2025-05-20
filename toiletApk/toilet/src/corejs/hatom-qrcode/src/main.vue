<template>
<transition name="hatom-qrcode-fade">
  <div
    v-show="visible"
    class="hatom-qrcode"
  >
    <div id="qrcode" ref="qrcode"></div>
    <div class="tip-txt">请使用调试工具扫描二维码登录</div>
  </div>  
</transition>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  data() {
    return {
      visible: false,
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
    createQrcode () {
      const text = window.location.origin
      new QRCode('qrcode', {
        text: text,
        width: 128,
        height: 128,
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$refs.qrcode.innerHTML = ''
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
.hatom-qrcode {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 999;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tip-txt {
  margin-top: 10px;
}

.hatom-qrcode-fade-enter,
.hatom-qrcode-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.hatom-qrcode-fade-enter-active,
.hatom-qrcode-fade-leave-active {
  transition: 0.3s;
}
</style>