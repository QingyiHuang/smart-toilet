import Vue from 'vue'

import App from '@/src/App.vue'
import Config from '@/src/config'
import Components from '@/src/components/index.js'
import router from '@/src/router/index'
import Hatom from '@/src/corejs/hatom.js'
import '@/src/corejs/WebViewJavascriptBridge.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/src/assets/styles/animation.css'
import '@/src/assets/styles/reset.css'
import '@/src/assets/styles/sprite.css'
// import VueJsonp from 'vue-jsonp';
// Vue.use(VueJsonp);
Vue.use(ElementUI);
Vue.use(Hatom)
Vue.use(Config)
Vue.use(Components)

Vue.config.productionTip = false

const app = {
  init: function () { this.onReady() },
  onReady: () => new Vue({ router,  render: h => h(App) }).$mount('#app')
}

Vue.prototype.$isMobile() ? app.init() : new Vue({ router,  render: h => h(App) }).$mount('#app')
