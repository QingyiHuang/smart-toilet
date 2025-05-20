import http from '@/core/httpInstance';
/* ---------------- 视频预览相关 ---------------- */
// /web/toilet/getCameras.do查询公厕关联监控点
function getCameras(params) {
  return http.get({
    url: `/web/toilet/getCameras.do`,
    params
  });
}
// /web/resource/camera/{cameraIndexCode}/preview.do 获取预览参数
function preview(code) {
  return http.post({
    url: `/web/resource/camera/${code}/preview.do`,
    data: {}
  });
}
function getPreviewParamHtml5(data) {
  return http.post({
    // eslint-disable-next-line no-irregular-whitespace
    url: `/web/resource/camera/getPreviewParamHtml5.do`,
    data
  });
}
export default {
  getCameras,
  preview,
  getPreviewParamHtml5
};
