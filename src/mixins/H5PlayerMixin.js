/* eslint-disable */
export default {
  computed: {
    h5BasePath() {
      // 根据当前url来判断相对位置的url
      let base = './jsPlugin/'
      let href = window.location.href
      // 根据各自组件的上下文来截取相对路径
      let context = process.env.VUE_APP_CONTEXT;
      if (context.startsWith('/')) {
        context = context.substring(1)
      }
      href = href.substring(href.indexOf(`${context}/`))
      const hs = href.split('/')
      if (hs.length > 2) {
        for (let i = 0; i < hs.length - 2; i++) {
          if (i === 0) {
            base = '.' + base
          } else {
            base = '../' + base
          }
        }
      }
      window.console.log('播放库相对路径', href, base)
      return base
    }
  },
  data() {
    return {
      loadingText: '视频加载中...',
      isInstallCert: false
    }
  },
  methods: {
    performanceLack () {
      this.$message({
        message: '播放器性能不足',
        type: 'warning',
        customClass: 'dark-tip'
      })
    },
    error(...args) {
      window.console.log(args)
      if (['0x12f910000', '0x12f910019'].includes(args[1]) && !this.isInstallCert) {
        this.isInstallCert = true
        this.$confirm('未安装证书, 是否下载安装证书?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'dark-confirm',
        }).then(() => {
          this.$message({
            message: '证书安装完成后请重启浏览器',
            type: 'info',
            customClass: 'dark-tip'
          })
          window.open(location.origin + '/nginxService/v1/download/InstallRootCert.exe')
        })
      } else {
        // 其他错误打印到窗口上,延迟打印，保证有错误码的日志最终打印到窗口
        setTimeout(() => {
          this.playError(args[0], `取流失败，错误码：${args[1]}`)
        }, 100);
      }
    },
    playError (index = 0, text = '取流失败') {
      const video = this.$refs.jsPluginPro.getVideo(index)
      video.setContent(h => {
        return (
          <div class="video-mask-content" style="color: #ccc;font-size: 18px;">
            <p style="margin: 16px 0;" class="video-mask-content__user-text">{text}</p>
          </div>
        )
      })
    }
  }
}
