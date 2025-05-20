// const isDev = process.env.NODE_ENV === 'development';

export default [
  {
    path: '/',
    redirect: '/IotConfig'
  },
  // 厕所管理
  {
    name: 'IotConfig',
    path: '/IotConfig',
    component: 'IotConfig/Index',
    meta: {
      keepAlive: true
    }
  },
  // 厕所对应设备列表
  {
    name: 'DeviceLists',
    path: '/DeviceLists',
    component: 'IotConfig/DeviceLists',
    meta: {
      keepAlive: true
    }
  },
  {
    // 通用设备详情页面
    name: 'IotCommonConfigDetail',
    path: '/IotCommonConfigDetail',
    component: 'IotConfig/detail/CommonDetail'
  },
  {
    // 五合一详情页面
    name: 'FiveInOneDetail',
    path: '/FiveInOneDetail',
    component: 'IotConfig/detail/FiveInOneDetail'
  },
  // 增加公厕
  {
    name: 'AddToilet',
    path: '/AddToilet',
    component: 'IotConfig/AddToilet'
  },
  // 通用配置配置
  {
    name: 'CommonConfig',
    path: '/CommonConfig',
    component: 'CommonConfig/Index'
  }
]
  .concat([
    // 舟山看板
    {
      name: 'DataBoard',
      path: '/DataBoard',
      component: 'DataBoard/Index'
    },
    // 历史告警
    {
      name: 'HistoryAlarm',
      path: '/HistoryAlarm',
      component: 'DataBoard/HistoryAlarm'
    },
    // 实时状态
    {
      name: 'RealTimeBoard',
      path: '/RealTimeBoard',
      component: 'RealTimeBoard/index'
    }
  ])
  .concat([
    // 引导屏幕(废弃为了兼容性使用原生写法，代码在同级目录)
    {
      name: 'GuideBoard',
      path: '/GuideBoard',
      component: 'GuideBoard/Index'
    },
    // 公厕运行管理
    {
      name: 'OperationManage',
      path: '/OperationManage',
      component: 'OperationManage/Index'
    },
    // 公厕异常报警
    {
      name: 'AbnormalAlarm',
      path: '/AbnormalAlarm',
      component: 'AbnormalAlarm/Index'
    },
    // 环卫人员信息管理
    {
      name: 'Sanitation',
      path: '/Sanitation',
      component: 'Sanitation/Index'
    }
  ])
  .concat([
    // 公厕评分
    {
      name: 'Score',
      path: '/Score',
      component: 'Score/Index'
    },
    // 引导屏配置
    {
      name: 'GuideConfig',
      path: '/GuideConfig',
      component: 'IotConfig/guideConfig/GuideConfig'
    },
    // 视频管理
    {
      name: 'VideoConfig',
      path: '/VideoConfig',
      component: 'VideoConfig/VideoConfig',
      meta: {
        keepAlive: true
      }
    },
    // 新增单个素材
    {
      name: 'AddOneVideo',
      path: '/AddOneVideo',
      component: 'VideoConfig/AddOneVideo'
    }
  ])
  .concat([
    {
      name: 'error',
      path: '/error/:type',
      component: 'Error'
    }
  ]);
