import http from '@/core/httpInstance';
/* ---------------- 移动端接口 ---------------- */
// /web/toilet/evaluate.do评价公厕
function evaluate(params) {
  return http.post({
    url: `/web/toilet/evaluate.do`,
    data: params
  });
}
// /web/toilet/getEvaluateItems.do 查询公厕评价项
function getEvaluateItems(params) {
  return http.get({
    url: `/web/toilet/getEvaluateItems.do`,
    params
  });
}
// /web/toilet/getToiletEvaluates.do分页查询公厕评价
function getToiletEvaluates(params) {
  return http.post({
    url: `/web/toilet/getToiletEvaluates.do`,
    data: params
  });
}
// 查询所有公厕评分区间/web/toilet/getToiletGradeRanges.do
function getToiletGradeRanges(params) {
  return http.get({
    url: `/web/toilet/getToiletGradeRanges.do`,
    params
  });
}
// 删除评分项目

function removeToiletEvaluates(params) {
  return http.post({
    url: `/web/toilet/removeToiletEvaluates.do`,
    data: params
  });
}
export default {
  evaluate,
  getEvaluateItems,
  getToiletEvaluates,
  getToiletGradeRanges,
  removeToiletEvaluates
};
