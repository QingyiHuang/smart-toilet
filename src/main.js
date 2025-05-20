import 'babel-polyfill';
import Vue from 'vue';
import hui from 'hui';
import 'hui/lib/hui.css';
import '@/core/huiPro';
import initApp from '@/core/initApp';
import components from '@/components';
import ImgPreview from '@hui-pro/img-preview';
import '@hui-pro/img-preview/theme/index.scss';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import selectTreeOption from '@hui-pro/select-tree-option';
import '@hui-pro/select-tree-option/theme/index.scss';
import treeSelect from '@hui-pro/tree-select';
import '@hui-pro/tree-select/theme/index.scss';
import { SvgOrganization } from '@hui/svg-icon';
// import cqSimplePlayer from 'cq-simple-player';
// import 'cq-simple-player/lib/cq-simplePlayer.css';
import tableTransfer from '@hui-pro/table-transfer';
import '@hui-pro/table-transfer/theme/index.scss';
import Rate from 'vant/es/rate';
import 'vant/es/rate/style';
import jsPluginPro from 'js-plugin-pro';
import 'js-plugin-pro/lib/js-plugin-pro.css';

Vue.use(tableTransfer);
Vue.use(jsPluginPro);
// Vue.use(cqSimplePlayer);
Vue.component(SvgOrganization.name, SvgOrganization);
Vue.use(treeSelect);
Vue.use(selectTreeOption);
Vue.use(ImgPreview);
Vue.use(hui);
Vue.use(Rate);
Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }
});
initApp(Vue);

components.map(({ install }) => {
  install(Vue);
});
