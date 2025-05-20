const xiaoxieReg = /^[a-z0-9]*$/;
const daxiaoxieReg = /^[A-Za-z0-9]*$/;
const numLetterRule = msg => {
  return {
    validator: (rule, value, callback) => {
      if (daxiaoxieReg.test(value) && xiaoxieReg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入字母、数字'));
      }
    },
    trigger: 'change,blur'
  };
};
const requireRule = (message, type) => {
  const rule = {
    required: true,
    message,
    trigger: 'change,blur'
  };
  if (type) {
    rule.type = type;
  }
  return rule;
};
const NumRule = () => {
  return {
    validator: (rule, value, callback) => {
      if (!isNaN(parseFloat(value)) && isFinite(value)) {
        callback();
      } else {
        callback(new Error('请输入数字'));
      }
    },
    trigger: 'change,blur'
  };
};
export default {
  numLetterRule,
  requireRule,
  NumRule
};
