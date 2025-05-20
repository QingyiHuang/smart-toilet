import http from '@/core/httpInstance';
/* ---------------- 设备管理 ---------------- */
// /web/device/addCommonDevice.do添加通用设备
function addCommonDevice(params) {
  return http.post({
    url: `/web/device/addCommonDevice.do`,
    data: params
  });
}
// /web/device/addToiletDevice.do添加厕所设备
function addToiletDevice(params) {
  return http.post({
    url: `/web/device/addToiletDevice.do`,
    data: params
  });
}
// /web/device/removeCommonDevice.do删除通用设备
function removeCommonDevice(params) {
  return http.post({
    url: `/web/device/removeCommonDevice.do`,
    data: params
  });
}
// /web/device/removeToiletDevice.do删除厕所设备
function removeToiletDevice(params) {
  return http.post({
    url: `/web/device/removeToiletDevice.do`,
    data: params
  });
}
// /web/device/updateCommonDevice.do修改通用设备
function updateCommonDevice(params) {
  return http.post({
    url: `/web/device/updateCommonDevice.do`,
    data: params
  });
}
// /web/device/updateToiletDevice.do修改厕所设备
function updateToiletDevice(params) {
  return http.post({
    url: `/web/device/updateToiletDevice.do`,
    data: params
  });
}
// get请求part
// /web/device/commonDeviceTypes.do查询公用设备类型
function commonDeviceTypes() {
  return http.get({
    url: `/web/device/commonDeviceTypes.do`
  });
}
// /web/device/getCommonDevice.do查询单个公用设备
function getCommonDevice() {
  return http.get({
    url: `/web/device/getCommonDevice.do`
  });
}
// /web/device/getCommonDeviceDetail.do查询通用设备详情
function getCommonDeviceDetail(params) {
  return http.get({
    url: `/web/device/getCommonDeviceDetail.do`,
    params
  });
}
// /web/device/getCommonDevices.do根据公厕id查询所有通用设备
function getCommonDevices(params) {
  return http.get({
    url: `/web/device/getCommonDevices.do`,
    params
  });
}
// /web/device/getFemaleDevices.do根据公厕id查询所有女厕设备
function getFemaleDevices(params) {
  return http.get({
    url: `/web/device/getFemaleDevices.do`,
    params
  });
}
// /web/device/getMaleDevices.do根据公厕id查询所有男厕设备
function getMaleDevices(params) {
  return http.get({
    url: `/web/device/getMaleDevices.do`,
    params
  });
}
// /web/device/getThirdDevices.do根据公厕id查询所有第三厕设备
function getThirdDevices(params) {
  return http.get({
    url: `/web/device/getThirdDevices.do`,
    params
  });
}
// /web/device/getToiletDevice.do查询单个厕所设备
function getToiletDevice() {
  return http.get({
    url: `/web/device/getToiletDevice.do`
  });
}
// /web/device/getToiletDeviceDetail.do查询厕所设备详情
function getToiletDeviceDetail(params) {
  return http.get({
    url: `/web/device/getToiletDeviceDetail.do`,
    params
  });
}
// /web/device/onlineStatus.do查询在线状态
function onlineStatus() {
  return http.get({
    url: `/web/device/onlineStatus.do`
  });
}
// /web/device/telcoTypes.do查询运营商类型
function telcoTypes() {
  return http.get({
    url: `/web/device/telcoTypes.do`
  });
}
// /web/device/toiletDeviceTypes.do查询厕所设备类型
function toiletDeviceTypes() {
  return http.get({
    url: `/web/device/toiletDeviceTypes.do`
  });
}
// /web/device/toiletTypes.do查询厕所类型
function toiletTypes() {
  return http.get({
    url: `/web/device/toiletTypes.do`
  });
}
// /web/alarm/list.do 报警分页获取
function alarmList(params) {
  return http.post({
    url: `/web/alarm/list.do`,
    data: params
  });
}
// /web/alarm/types.do获取违规类型
function alarmTypes() {
  return http.get({
    url: `/web/alarm/types.do`
  });
}
// 查询指示牌/web/device/getIndicators.do
function getIndicators(params) {
  return http.post({
    url: `/web/device/getIndicators.do`,
    data: params
  });
}
// /web/device/updateIndicatorPosition.do更新指示牌位置
function updateIndicatorPosition(params) {
  return http.post({
    url: `/web/device/updateIndicatorPosition.do`,
    data: params
  });
}
export default {
  addCommonDevice,
  addToiletDevice,
  removeCommonDevice,
  removeToiletDevice,
  updateCommonDevice,
  updateToiletDevice,
  commonDeviceTypes,
  getCommonDevice,
  getCommonDeviceDetail,
  getCommonDevices,
  getFemaleDevices,
  getMaleDevices,
  getThirdDevices,
  getToiletDevice,
  getToiletDeviceDetail,
  onlineStatus,
  telcoTypes,
  toiletDeviceTypes,
  toiletTypes,
  alarmList,
  alarmTypes,
  getIndicators,
  updateIndicatorPosition
};
