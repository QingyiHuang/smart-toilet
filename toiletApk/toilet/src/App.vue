<template>
  <div id="app" :style="appStyle">
    <transition :name="$direction"><router-view></router-view></transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      appStyle: '',
      direction: 'left'
    }
  },
  created () {
    // 全局监听分辨率，然后做出适配
    this.listenBackbutton(),
    window.addEventListener('resize', this.pageResize)
    this.pageResize()
  },
  async mounted () {
    const h = this.$isMobile() ? await this.getSyncDeviceScreen() : this.$constant.STATUS_BAR_HEIGHT
    this.appStyle = `height: calc(100% - ${h}px); top: ${h}px;`
    /** 页面加载完成的回调， 通知原生APP，该页面模块加载完毕 */
    this.$hatom.native('PageLifecyclePlugin.onCall', (res) => '', {
      message: 'firstPageFinished'
    })
  },
  methods: {
    // 全局监听分辨率，然后做出适配
    pageResize() {
      var deviceHeight = document.documentElement.clientHeight;
      var deviceWidth = document.documentElement.clientWidth;
      var currentWidth = deviceWidth / 1920;
      var currentHeight = deviceHeight / 1080;
      document.getElementsByTagName('body')[0].style.transform = `scale(${currentWidth},${currentHeight})`
      document.getElementsByTagName('body')[0].style.transformOrigin = '0 0'
    },
    async getSyncDeviceScreen () {
      const res = await this.$hatom.getSyncScreenInfo()
      const screenInfo = JSON.parse(res.message)
      return screenInfo.statusBarHeight / screenInfo.screenDensity
    },
    listenBackbutton () {
      this.$hatom.setBridge('onBackPressed', (res) => {
        this.$hatom.page.back()
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.direction = to.meta.deep >= from.meta.deep ? 'left' : 'right'
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.direction = to.meta.deep >= from.meta.deep ? 'left' : 'right'
    })
  }
}

</script>

<style lang="scss" scoped>

html,
body,
#app {
  position: relative;
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  margin: 0;
  padding: 0;
}

</style>
