import http from '@/core/httpInstance';
/* ---------------- 第一个统计页面的接口 ---------------- */
// /web/flowStatistic/toilet/Info.do公厕客流量统计
function flowStatisticInfo(params) {
  return http.post({
    url: `/web/flowStatistic/toilet/Info.do`,
    data: params
  });
}
// /web/flowStatistic/toilet/rank.do公厕客流排行
function flowStatisticRank(params) {
  return http.post({
    url: `/web/flowStatistic/toilet/rank.do`,
    data: params
  });
}
// /web/flowStatistic/toilet/trend.do客流趋势统计
function flowStatisticTrend(params) {
  return http.post({
    url: `/web/flowStatistic/toilet/trend.do`,
    data: params
  });
}
// /web/toiletStatistic/queryAirQualityRank.do空气质量排行
function queryAirQualityRank(params) {
  return http.post({
    url: `/web/toiletStatistic/queryAirQualityRank.do`,
    data: params
  });
}
// /web/toiletStatistic/queryCleanTimes.do清扫次数
function queryCleanTimes(params) {
  return http.get({
    url: `/web/toiletStatistic/queryCleanTimes.do`,
    params
  });
}
// /web/toiletStatistic/queryNumber.do公厕统计
function queryNumber(params) {
  return http.get({
    url: `/web/toiletStatistic/queryNumber.do`,
    params
  });
}
// /web/toiletStatistic/queryScoreProportion.do评分占比
function queryScoreProportion(params) {
  return http.get({
    url: `/web/toiletStatistic/queryScoreProportion.do`,
    params
  });
}
// /web/toiletStatistic/queryToiletNumberRank.do区域公厕排行
function queryToiletNumberRank(params) {
  return http.get({
    url: `/web/toiletStatistic/queryToiletNumberRank.do`,
    params
  });
}
export default {
  flowStatisticInfo,
  flowStatisticRank,
  flowStatisticTrend,
  queryAirQualityRank,
  queryCleanTimes,
  queryNumber,
  queryScoreProportion,
  queryToiletNumberRank
};
