import http from '@/core/httpInstance';
import { addFormData } from '@/utils/common';

/* ---------------- 移动端接口 ---------------- */
// /web/material/delete/ids.do素材批量删除
function deleteIds(params) {
  return http.post({
    url: `/web/material/delete/ids.do`,
    data: params
  });
}
// /web/material/linkMaterial.do公厕关联素材
function linkMaterial(params) {
  return http.post({
    url: `/web/material/linkMaterial.do`,
    data: params
  });
}
// /web/material/linkToilet.do素材关联公厕
function linkToilet(params) {
  return http.post({
    url: `/web/material/linkToilet.do`,
    data: params
  });
}
// /web/material/query/page.do素材分页查询
function queryPage(params) {
  return http.post({
    url: `/web/material/query/page.do`,
    data: params
  });
}
// /web/material/upload/batch.do批量素材上传,上传zip压缩文件
function uploadBatch(params) {
  return http.post({
    url: `/web/material/upload/batch.do`,
    data: params
  });
}
// /web/material/upload/single.do单个素材上传,上传单个素材文件
function uploadSingle(data) {
  const formData = new FormData();
  for (const key in data) {
    addFormData(formData, data[key], key);
  }
  return http.upload({
    url: '/web/material/upload/single.do',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
// /web/device/screenConfig/get.do获取信息屏配置
function screenConfigGet(params) {
  return http.get({
    url: `/web/device/screenConfig/get.do`,
    params
  });
}
// /web/device/screenConfig/save.do保存信息屏配置
function screenConfigSave(params) {
  return http.post({
    url: `/web/device/screenConfig/save.do`,
    data: params
  });
}
export default {
  deleteIds,
  linkMaterial,
  linkToilet,
  queryPage,
  uploadBatch,
  uploadSingle,
  screenConfigGet,
  screenConfigSave
};
