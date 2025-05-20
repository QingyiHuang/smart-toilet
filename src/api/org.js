import http from '@/core/httpInstance';
/* ---------------- 组织资源 ---------------- */
// /web/resource/org/syncTree.do获取同步组织树(可控权)
function syncTree(params) {
  return http.post({
    url: `/web/resource/org/syncTree.do`,
    data: params
  });
}
// 根据组织编码获取客流相机列表
function cameraEventpdc(params) {
  return http.post({
    url: `/web/resource/camera/eventpdc.do`,
    data: params
  });
}
// /web/resource/camera/noeventpdc.do根据组织编码获取监控点列表，不包含客流相机
function cameraNormal(params) {
  return http.post({
    url: `/web/resource/camera/noeventpdc.do`,
    data: params
  });
}
// 数据看板区域切换
function databoardOrgList(params) {
  return http.get({
    url: `/web/resource/databoard/orgList.do`,
    params
  });
}
// 获取地图配置/web/config/mapConfig.do
function mapConfig(data) {
  return http.post({
    url: `/web/config/mapConfig.do`,
    data
  });
}
// 获取hgis配置/web/config/mapType.do
function configMapType(params) {
  return http.get({
    url: `/web/config/mapType.do`,
    params
  });
}
export default {
  syncTree,
  cameraEventpdc,
  databoardOrgList,
  mapConfig,
  cameraNormal,
  configMapType
};
