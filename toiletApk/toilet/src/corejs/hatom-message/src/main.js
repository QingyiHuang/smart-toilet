import Vue from 'vue';
import MessageMain from './main.vue';

const hasOwnProperty = Object.prototype.hasOwnProperty;

const hasOwn = function (obj, key) {
  return hasOwnProperty.call(obj, key);
}

const isVNode = function (node) {
  return typeof node === 'object' && hasOwn(node, 'componentOptions');
}
const MessageConstructor = Vue.extend(MessageMain);

let instance;

var Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }

  options.onClose = function() {
    Message.close();
  };
  instance = new MessageConstructor({
    data: options
  });
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  return instance.vm;
};

Message.close = function() {
  if (instance) instance.close();
};

export default Message;
