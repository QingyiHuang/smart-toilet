import axios from 'axios';
/**
 * @author fanjun10
 * @desc 高德逆地理编码
 * @param {lon,lat} lon -longitude 经度，lat-latitude纬度
 * @return {Promise}
 */
const getAddress = (lon, lat, key) => {
  return new Promise(resolve => {
    //  对应组件获取key的接口
    // 高德逆编码
    axios
      .get('https://restapi.amap.com/v3/geocode/regeo', {
        params: {
          key: key,
          location: lon + ',' + lat
        }
      })
      .then(res => {
        if (res.status === 200 && res.statusText === 'OK') {
          // result为对应的地理位置详细信息
          resolve(res.data.regeocode.formatted_address);
        } else {
          resolve('');
        }
      })
      .catch(() => {
        resolve('');
      });
  });
};
export { getAddress };
