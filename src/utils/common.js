import huiLocale from 'hui/lib/locale';
import huiProLocale from '@hui-pro/locale';
import { formatTime, localTimeToIsoTime, type } from '@hui-pro/utils';

// 获取语言参数
const isDev = process.env.NODE_ENV === 'development';
const formatDate = (param, len, separator) => {
  if (param) {
    if (type(param) !== 'Date') {
      param = new Date(param);
    }
    let str = formatTime(localTimeToIsoTime(param));
    if (len) {
      str = str.substr(0, len);
    }
    if (separator) {
      str = str.replace(/\//g, separator);
    }
    return str;
  } else {
    return '--';
  }
};
const getIsoTime = localTime => {
  return localTimeToIsoTime(localTime);
};
const getPlaybackTime = timestamp => {
  // 回放时间为前后15s
  return {
    startTime: getIsoTime(timestamp - 15000),
    endTime: getIsoTime(timestamp + 15000)
  };
};
const getLanKey = () => {
  if (isDev) {
    return 'zh_CN';
  } else {
    return document.querySelector('meta[name="lang"]').getAttribute('language');
  }
};
// 获取皮肤参数
const getSkinKey = () => {
  if (isDev) {
    return 'blue';
  } else {
    return document.querySelector('meta[name="skin"]').getAttribute('skin');
  }
};
// 获取csrftoken
const getToken = () => {
  let token = '';
  const metas = document.getElementsByTagName('meta');
  for (const meta of metas) {
    if (meta.getAttribute('name') === '_csrf') {
      token = meta.getAttribute('content');
    }
  }
  return token;
};

const renderTheme = ({ path, id }) => {
  return new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0];
    let linkTag = document.getElementById(id);
    linkTag && linkTag.parentNode.removeChild(linkTag);
    linkTag = document.createElement('link');
    linkTag.href = path;
    linkTag.rel = 'stylesheet';
    linkTag.type = 'text/css';
    linkTag.setAttribute('id', id);
    linkTag.onload = () => resolve();
    linkTag.onerror = err => reject(err);
    head.appendChild(linkTag);
  });
};

const renderLanguage = ({ i18n, data, id }) => {
  const locales = [huiLocale, huiProLocale];
  return new Promise(resolve => {
    i18n.setLocaleMessage(id, data);
    i18n.locale = id;
    locales.forEach(locale => {
      locale.i18n((key, value) => i18n.t(key, value));
    });
    resolve();
  });
};
// 根据图片id获取图片请求路径
const getSrcById = (fileId, smallImg) => {
  const context = process.env.VUE_APP_CONTEXT;
  let path = 'getFileUrl';
  // 缩略图返回路径
  if (smallImg) {
    path = 'getThumbnailUrl';
  }
  return fileId ? `${context}/commonFile/${path}?fileId=${fileId}` : '';
};

const encode = str => {
  // 对字符串进行编码
  const encode = encodeURI(str);
  // 对编码的字符串转化base64
  const base64 = btoa(encode);
  return base64;
};
const decode = base64 => {
  // 对base64转编码
  const decode = atob(base64);
  // 编码转字符串
  const str = decodeURI(decode);
  return str;
};

const addFormData = function (formData, array, key) {
  if (array === undefined || array === null || typeof array === 'function') {
    return false;
  }
  if (typeof array !== 'object') {
    formData.append(key, array);
  } else if (array instanceof Array) {
    if (array.length === 0) {
      formData.append(`${key}`, '');
    } else if (array[0] instanceof File) {
      for (const i in array) {
        // 此处只使用数组内只有file，没有其他对象
        if (array[i] instanceof File) {
          formData.append(`${key}`, array[i]);
        } else {
          for (const j in array[i]) {
            addFormData(formData, array[i][j], `${key}[${i}].${j}`);
          }
        }
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        formData.append(`${key}`, array[i]);
      }
    }
  } else {
    const arr = Object.keys(array);
    if (arr.indexOf('uid') === -1) {
      for (const j in array) {
        addFormData(formData, array[j], `${key}.${j}`);
      }
    } else {
      formData.append(`${key}`, array);
    }
  }
};

export {
  getPlaybackTime,
  getIsoTime,
  getSrcById,
  encode,
  decode,
  getLanKey,
  getSkinKey,
  getToken,
  renderTheme,
  renderLanguage,
  formatDate,
  addFormData
};
