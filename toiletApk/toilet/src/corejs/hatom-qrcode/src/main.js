import Vue from 'vue';
import QrcodeMain from './main.vue';

const QrcodeConstructor = Vue.extend(QrcodeMain);

let instance;

var Qrcode = function() {
  if (Vue.prototype.$isServer) return;

  if (!document.getElementById("qrcode")) {
    instance = new QrcodeConstructor();
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.createQrcode();
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    return instance.vm;
  }
};

Qrcode.close = function() {
  instance.close();
};

export default Qrcode;
