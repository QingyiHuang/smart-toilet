import http from '@/core/httpInstance';
/* ---------------- 公厕信息 ---------------- */
// /web/toilet/addToilet.do添加公厕
function addToilet(params) {
  return http.post({
    url: `/web/toilet/addToilet.do`,
    data: params
  });
}
// /web/toilet/list.do查询所有公厕
function toiletList(params) {
  return http.post({
    url: `/web/toilet/list.do`,
    data: params
  });
}
// /web/toilet/getToilet.do 查询单个公厕
function getToilet(params) {
  return http.get({
    url: `/web/toilet/getToilet.do`,
    params
  });
}
// /web/toilet/pageQuery.do分页查询公厕
function toiletPageQuery(params) {
  return http.post({
    url: `/web/toilet/pageQuery.do`,
    data: params
  });
}
// /web/toilet/removeToilet.do删除公厕
function removeToilet(params) {
  return http.post({
    url: `/web/toilet/removeToilet.do`,
    data: params
  });
}
// 修改公厕
function updateToilet(params) {
  return http.post({
    url: `/web/toilet/updateToilet.do`,
    data: params
  });
}
// /web/config/param/get.do获取配置
function getConfig() {
  return http.get({
    url: `/web/config/param/get.do`
  });
}
// /web/config/param/save.do保存配置
function saveConfig(params) {
  return http.post({
    url: `/web/config/param/save.do`,
    data: params
  });
}
// /web/toiletStatistic/getToiletRealData.do查询公厕实时数据
function getToiletRealData(params) {
  return http.get({
    url: `/web/toiletStatistic/getToiletRealData.do`,
    params
  });
}
// 查询所有客流统计方式
function getFlowCountTypes() {
  return http.get({
    url: `/web/toilet/getFlowCountTypes.do`
  });
}
//  通知引导屏刷新页面
function RefreshBoard(param) {
  return http.post({
    url: `/web/websocket/databoard/refresh/notify.do`,
    data: param
  });
}

export default {
  addToilet,
  toiletList,
  toiletPageQuery,
  removeToilet,
  getConfig,
  saveConfig,
  updateToilet,
  getToilet,
  getToiletRealData,
  getFlowCountTypes,
  RefreshBoard
};
