<template>
  <h-page-container v-loading.fullscreen.lock="uploadLoading">
    <div class="historyAlarmPage">
      <div class="headDiv">{{ toiletName || '智慧公厕' }}</div>
      <div class="content">
        <div class="returndiv">
          <div class="returnPart" @click="goback">智慧监管</div>
        </div>
        <div :class="{ leftPanel: true, hack1080: !hack1080 }">
          <div class="toiletInfo">
            <div class="titleInfo">男卫生间</div>
            <div class="toiletInfoLeft"></div>
            <div class="toiletInfoRight">
              <div class="type1">
                空闲厕位
                <span>{{ maleData.freeNum || 0 }}</span>
              </div>
              <div class="type2">
                占用厕位
                <span>{{ maleData.usedNum || 0 }}</span>
              </div>
              <div class="type3">
                故障厕位
                <span>{{ maleData.faultNum || 0 }}</span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="oneBox">
            <div class="boxTitle">客流数据</div>
            <div class="boxContent">
              <div class="contentLeft"></div>
              <div class="contentRihgt">
                <div class="part1">
                  <p>今日客流</p>
                  <p>本月客流</p>
                </div>
                <div class="part2">
                  <p>
                    {{ maleData.todayFlowNum || 0 }}
                    <i>次</i>
                  </p>
                  <p>
                    {{ maleData.monthFlowNum || 0 }}
                    <i>次</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="oneBox">
            <div class="boxTitle">报警数据</div>
            <div class="boxContent">
              <div class="contentLeft contentLeftAlarm"></div>
              <div class="contentRihgt">
                <div class="part1">
                  <p>今日报警</p>
                  <p>本月报警</p>
                </div>
                <div class="part2">
                  <p>
                    {{ maleData.todayAlarmNum || 0 }}
                    <i>次</i>
                  </p>
                  <p>
                    {{ maleData.monthAlarmNum || 0 }}
                    <i>次</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="oneBox">
            <div class="boxTitle">环境监测信息</div>
            <div class="boxContent">
              <div class="oneCol">
                <div class="colLeft colImg1"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      maleData.envData
                        ? Boolean(JSON.parse(maleData.envData).temperature)
                          ? JSON.parse(maleData.envData).temperature
                          : JSON.parse(maleData.envData).temperature === '0' ||
                            JSON.parse(maleData.envData).temperature === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>℃</span>
                  </p>
                  <p class="colRight-name">温度</p>
                </div>
              </div>
              <div class="oneCol">
                <div class="colLeft colImg2"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      maleData.envData
                        ? Boolean(JSON.parse(maleData.envData).humidity)
                          ? JSON.parse(maleData.envData).humidity
                          : JSON.parse(maleData.envData).humidity === '0' ||
                            JSON.parse(maleData.envData).humidity === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>%</span>
                  </p>
                  <p class="colRight-name">湿度</p>
                </div>
              </div>
              <div class="oneCol">
                <div class="colLeft colImg3"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      maleData.envData
                        ? Boolean(JSON.parse(maleData.envData).NH3)
                          ? JSON.parse(maleData.envData).NH3
                          : JSON.parse(maleData.envData).NH3 === '0' ||
                            JSON.parse(maleData.envData).NH3 === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>ppm</span>
                  </p>
                  <p class="colRight-name">氨气</p>
                </div>
              </div>
              <div class="oneCol">
                <div class="colLeft colImg4"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      maleData.envData
                        ? Boolean(JSON.parse(maleData.envData).H2S)
                          ? JSON.parse(maleData.envData).H2S
                          : JSON.parse(maleData.envData).H2S === '0' ||
                            JSON.parse(maleData.envData).H2S === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>ppm</span>
                  </p>
                  <p class="colRight-name">硫化氢</p>
                </div>
              </div>
              <div class="oneCol">
                <div class="colLeft colImg5"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      maleData.envData
                        ? Boolean(JSON.parse(maleData.envData)['PM2.5'])
                          ? JSON.parse(maleData.envData)['PM2.5']
                          : JSON.parse(maleData.envData)['PM2.5'] === '0' ||
                            JSON.parse(maleData.envData)['PM2.5'] === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>ug/m³</span>
                  </p>
                  <p class="colRight-name">PM2.5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="{ rightPanel: true, hack1080: !hack1080 }">
          <div class="toiletInfo">
            <div class="titleInfo titleInfoNv">女卫生间</div>
            <div class="toiletInfoLeftNv"></div>
            <div class="toiletInfoRight">
              <div class="type1">
                空闲厕位
                <span>{{ femaleData.freeNum || 0 }}</span>
              </div>
              <div class="type2">
                占用厕位
                <span>{{ femaleData.usedNum || 0 }}</span>
              </div>
              <div class="type3">
                故障厕位
                <span>{{ femaleData.faultNum || 0 }}</span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="oneBox">
            <div class="boxTitleNv">客流数据</div>
            <div class="boxContent">
              <div class="contentLeft"></div>
              <div class="contentRihgt">
                <div class="part1">
                  <p>今日客流</p>
                  <p>本月客流</p>
                </div>
                <div class="part2">
                  <p>
                    {{ femaleData.todayFlowNum || 0 }}
                    <i>次</i>
                  </p>
                  <p>
                    {{ femaleData.monthFlowNum || 0 }}
                    <i>次</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="oneBox">
            <div class="boxTitleNv">报警数据</div>
            <div class="boxContent">
              <div class="contentLeft contentLeftAlarm"></div>
              <div class="contentRihgt">
                <div class="part1">
                  <p>今日报警</p>
                  <p>本月报警</p>
                </div>
                <div class="part2">
                  <p>
                    {{ femaleData.todayAlarmNum || 0 }}
                    <i>次</i>
                  </p>
                  <p>
                    {{ femaleData.monthAlarmNum || 0 }}
                    <i>次</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="oneBox">
            <div class="boxTitleNv">环境监测信息</div>
            <div class="boxContent">
              <div class="oneCol">
                <div class="colLeft colImg1"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      femaleData.envData
                        ? Boolean(JSON.parse(femaleData.envData).temperature)
                          ? JSON.parse(femaleData.envData).temperature
                          : JSON.parse(femaleData.envData).temperature ===
                              '0' ||
                            JSON.parse(femaleData.envData).temperature === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>℃</span>
                  </p>
                  <p class="colRight-name">温度</p>
                </div>
              </div>
              <div class="oneCol">
                <div class="colLeft colImg2"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      femaleData.envData
                        ? Boolean(JSON.parse(femaleData.envData).humidity)
                          ? JSON.parse(femaleData.envData).humidity
                          : JSON.parse(femaleData.envData).humidity === '0' ||
                            JSON.parse(femaleData.envData).humidity === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>%</span>
                  </p>
                  <p class="colRight-name">湿度</p>
                </div>
              </div>
              <div class="oneCol">
                <div class="colLeft colImg3"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      femaleData.envData
                        ? Boolean(JSON.parse(femaleData.envData).NH3)
                          ? JSON.parse(femaleData.envData).NH3
                          : JSON.parse(femaleData.envData).NH3 === '0' ||
                            JSON.parse(femaleData.envData).NH3 === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>ppm</span>
                  </p>
                  <p class="colRight-name">氨气</p>
                </div>
              </div>
              <div class="oneCol">
                <div class="colLeft colImg4"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      femaleData.envData
                        ? Boolean(JSON.parse(femaleData.envData).H2S)
                          ? JSON.parse(femaleData.envData).H2S
                          : JSON.parse(femaleData.envData).H2S === '0' ||
                            JSON.parse(femaleData.envData).H2S === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>ppm</span>
                  </p>
                  <p class="colRight-name">硫化氢</p>
                </div>
              </div>
              <div class="oneCol">
                <div class="colLeft colImg5"></div>
                <div class="colRight">
                  <p class="colRight-p">
                    {{
                      femaleData.envData
                        ? Boolean(JSON.parse(femaleData.envData)['PM2.5'])
                          ? JSON.parse(femaleData.envData)['PM2.5']
                          : JSON.parse(femaleData.envData)['PM2.5'] === '0' ||
                            JSON.parse(femaleData.envData)['PM2.5'] === 0
                          ? '0'
                          : '--'
                        : '--'
                    }}
                    <span>ug/m³</span>
                  </p>
                  <p class="colRight-name">PM2.5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="{ centerPanel: true, centerPanelHack1080: hack1080 }">
          <img class="centernToilet" :src="centerImg" />
        </div>
        <!-- 公厕负责人 -->
        <div class="toiletBoss">
          <div class="titleInfo">公厕负责人</div>
          <div class="bossBottom">
            <div class="bossLeft"></div>
            <div class="bossRight">
              <p>
                <span>负责人</span>
                {{ chargeperson.name }}
              </p>
              <p>
                <span>工号</span>
                {{ chargeperson.jobNo }}
              </p>
              <p>
                <span>联系电话</span>
                {{ chargeperson.tel }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="showAll" class="toiletBoss2">
          <div class="oneBox">
            <div class="boxTitle">客流数据</div>
            <div class="boxContent">
              <div class="contentLeft"></div>
              <div class="contentRihgt">
                <div class="part1">
                  <p>今日客流总数</p>
                  <p>本月客流总数</p>
                </div>
                <div class="part2">
                  <p>
                    {{ todayFlowNum || 0 }}
                    <i>次</i>
                  </p>
                  <p>
                    {{ monthFlowNum || 0 }}
                    <i>次</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footerDiv"></div>
      </div>
    </div>
  </h-page-container>
</template>

<script>
// websocket版本
export default {
  components: {},
  data() {
    return {
      uploadLoading: false,
      hack1080: false,
      centerImg: require('@/assets/images/databoard/img-公厕模型.png'),
      maleData: {},
      femaleData: {},
      chargeperson: {},
      toiletName: '',
      monthFlowNum: '',
      todayFlowNum: '',
      showAll: false,
      timmer2: null,
      sendTimmer: null,
      websock: ''
    };
  },
  created() {
    this.pageResize();
    window.addEventListener('resize', this.pageResize);
    // 查询数据
    // this.initData();

    this.startWebSocket();
  },
  destroyed() {
    if (this.websock) {
      this.websock.close();
    }
  },
  methods: {
    startWebSocket() {
      // 获取query中的sn
      if (this.$route.query.id) {
        const id = this.$route.query.id;
        let protocol = '';
        if (window.location.protocol === 'http:') {
          protocol = 'ws';
        } else {
          protocol = 'wss';
        }
        const urlIp = window.location.host;
        let wsuri = '';
        if (process.env.NODE_ENV !== 'development') {
          wsuri = `${protocol}://${urlIp}/ptsa/websocket/toiletRealData?toiletId=${id}`; // ws
        } else {
          wsuri = `ws://10.196.74.8:9831/ptsa/websocket/toiletRealData?toiletId=${id}`;
        }
        this.websock = new WebSocket(wsuri);
        this.websock.onopen = this.websocketOnopen;
        this.websock.onerror = this.websocketOnerror;
        this.websock.onmessage = this.websocketOnmessage;
        this.websock.onclose = this.websocketOnclose;
      }
    },
    // 客户端和服务端建立链接时触发,此时可向服务端传递参数
    websocketOnopen() {
      this.sendTimmer = setInterval(() => {
        this.websock.send(`{"type":"HEART_BEAT"}`);
      }, 10000);
    },
    // 客户端收到服务端发来的消息时,会触发onmessage事件,参数res.data中包含server传输过来的数据
    websocketOnmessage(res) {
      if (res) {
        const data = JSON.parse(res.data);
        this.initData(data.data);
      }
      //  console.log(this.arrisrun)s
    },
    // 如果出现连接,处理,接收,发送数据失败的时候就会触发onerror事件
    websocketOnerror() {
      this.$message.error('连接失败');
    },
    // 客户端收到服务端发送的关闭连接的请求时,触发onclose事件,执行断线重连
    websocketOnclose() {
      // 执行断线重连
      const _this = this;
      setTimeout(() => {
        _this.startWebSocket();
      }, 30000);
    },
    initData(data) {
      this.maleData = data.realDataList[0];
      this.femaleData = data.realDataList[1];
      this.chargeperson = data.chargePersonList ? data.chargePersonList[0] : {};
      this.toiletName = data.toiletName;
      this.monthFlowNum = data.monthFlowNum;
      this.todayFlowNum = data.todayFlowNum;
    },
    goback() {
      this.$router.go(-1);
    },
    pageResize() {
      document.documentElement.clientHeight >= 1080
        ? (this.hack1080 = true)
        : (this.hack1080 = false);
      document.documentElement.clientWidth >= 1700
        ? (this.showAll = true)
        : (this.showAll = false);
    }
  }
};
</script>

<style lang="scss" scoped>
.historyAlarmPage {
  user-select: none;
  width: 100%;
  height: 100%;
  position: relative;
  // background: url('~@/assets/images/databoard/img-背景图.png') no-repeat;
  // background-size: 100% 100%;
  background-color: rgb(6, 21, 44);
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url('~@/assets/images/databoard/img-模型背景图.png') no-repeat;
    background-size: 100% 100%;
  }
  .headDiv {
    height: 70px;
    width: 100%;
    background: url('~@/assets/images/databoard/pnl-头部标题.png') no-repeat;
    background-size: 100% 100%;
    font-family: PingFangSC-Semibold;
    font-size: 22px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 53px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .content {
    height: 100%;
    position: relative;
    .returndiv {
      height: 40px;
      overflow: hidden;
      position: absolute;
      top: 77px;
      left: 24px;
      z-index: 2;
    }
    .returnPart {
      height: 40px;
      width: 124px;
      float: left;
      margin-left: 24px;
      background: url('~@/assets/images/databoard/btn-返回-默认.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 40px;
      text-indent: 48px;
      &:hover {
        background: url('~@/assets/images/databoard/btn-返回-悬停.png')
          no-repeat;
      }
    }
    .leftPanel {
      background: url('~@/assets/images/databoard/pnl-左数据板-展开.png')
        no-repeat;
      background-size: 100% 100%;
      height: 100%;
      width: 515px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      padding-top: 160px;
      padding-left: 40px;
    }
    .rightPanel {
      background: url('~@/assets/images/databoard/pnl-右数据板-展开.png')
        no-repeat;
      background-size: 100% 100%;
      height: 100%;
      width: 512px;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      padding-top: 160px;
      // padding-right: 40px;
      padding-left: 100px;
    }
    .toiletInfo {
      height: 206px;
      width: 360px;
      position: relative;
      .titleInfo {
        position: absolute;
        left: 0;
        top: 0;
        line-height: 44px;
        height: 44px;
        width: 250px;
        background: url('~@/assets/images/databoard/pnl-一级标题-01.png')
          no-repeat;
        background-size: 100% 100%;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #effeff;
        letter-spacing: 0;
        text-indent: 35px;
      }
      .titleInfoNv {
        position: absolute;
        left: 110px;
        top: 0;
        background: url('~@/assets/images/databoard/pnl-一级标题-02.png')
          no-repeat;
        background-size: 100% 100%;
        text-indent: 0;
        text-align: right;
        padding-right: 35px;
      }
      .toiletInfoLeft {
        width: 100px;
        height: 100px;
        background: url('~@/assets/images/databoard/icon-男厕01.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 64px;
        &::before {
          content: '';
          background: url('~@/assets/images/databoard/icon-男厕02.png')
            no-repeat;
          background-size: 100% 100%;
          width: 100px;
          height: 100px;
          left: 0;
          top: 0px;
          position: absolute;
          animation: turn1 5s linear infinite;
        }
        &::after {
          content: '';
          background: url('~@/assets/images/databoard/icon-男厕03.png')
            no-repeat;
          background-size: 100% 100%;
          width: 100px;
          height: 100px;
          left: 0;
          top: 0px;
          position: absolute;
          animation: turn2 5s linear infinite;
        }
      }
      .toiletInfoLeftNv {
        width: 100px;
        height: 100px;
        background: url('~@/assets/images/databoard/icon-女厕01.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 64px;
        &::before {
          content: '';
          background: url('~@/assets/images/databoard/icon-女厕02.png')
            no-repeat;
          background-size: 100% 100%;
          width: 100px;
          height: 100px;
          left: 0;
          top: 0px;
          position: absolute;
          animation: turn1 5s linear infinite;
        }
        &::after {
          content: '';
          background: url('~@/assets/images/databoard/icon-女厕03.png')
            no-repeat;
          background-size: 100% 100%;
          width: 100px;
          height: 100px;
          left: 0;
          top: 0px;
          position: absolute;
          animation: turn2 5s linear infinite;
        }
      }
      .toiletInfoRight {
        position: absolute;
        top: 64px;
        left: 120px;
        width: 239px;
        height: 104px;
        background: url('~@/assets/images/databoard/女厕.png') no-repeat;
        background-size: 100% 100%;
        line-height: 25px;
        padding: 12px 0 0 32px;
        .type1 {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #9ee0ff;
          letter-spacing: 0;
          &::before {
            content: '';
            width: 8px;
            height: 8px;
            background-color: #38efa5;
            display: inline-block;
            margin-right: 8px;
          }
          span {
            margin-left: 24px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 18px;
            position: relative;
            top: 2px;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 0;
          }
        }
        .type2 {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #9ee0ff;
          letter-spacing: 0;
          &::before {
            content: '';
            width: 8px;
            height: 8px;
            background-color: #ffc800;
            display: inline-block;
            margin-right: 8px;
          }
          span {
            margin-left: 24px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 18px;
            position: relative;
            top: 2px;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 0;
          }
        }
        .type3 {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #9ee0ff;
          letter-spacing: 0;
          &::before {
            content: '';
            width: 8px;
            height: 8px;
            background-color: #fa3239;
            display: inline-block;
            margin-right: 8px;
          }
          span {
            margin-left: 24px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 18px;
            position: relative;
            top: 2px;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 0;
          }
        }
      }
    }
  }
}

.footerDiv {
  height: 24px;
  width: 100%;
  background: url('~@/assets/images/databoard/pnl-底部装饰.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
}
@keyframes turn1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes turn2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.oneBox {
  position: relative;
  height: 135px;
  width: 360px;
  margin-bottom: 26px;
  .boxTitle {
    height: 35px;
    width: 200px;
    // position: absolute;
    left: 0;
    top: 0;
    background: url('~@/assets/images/databoard/pnl-二级标题-01.png') no-repeat;
    background-size: cover;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #effeff;
    letter-spacing: 0;
    line-height: 35px;
    text-indent: 12px;
    margin-bottom: 14px;
  }
  .boxTitleNv {
    height: 35px;
    width: 200px;
    position: relative;
    left: 160px;
    top: 0;
    background: url('~@/assets/images/databoard/pnl-二级标题-02.png') no-repeat;
    background-size: cover;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #effeff;
    letter-spacing: 0;
    line-height: 35px;
    // text-indent: 12px;
    padding-right: 12px;
    text-align: right;
    margin-bottom: 14px;
  }
  .boxContent {
    height: 72px;
    position: relative;
    .contentLeft {
      position: absolute;
      left: 0;
      top: 0;
      height: 72px;
      width: 72px;
      height: 72px;
      background: url('~@/assets/images/databoard/图标-卡片-客流量数据.png')
        no-repeat;
      background-size: cover;
    }
    .contentLeftAlarm {
      background: url('~@/assets/images/databoard/图标-卡片-报警数据.png')
        no-repeat;
      background-size: cover;
    }
    .contentRihgt {
      margin-left: 78px;
      margin-right: 20px;
      height: 72px;
      width: 283px;
      display: grid;
      grid-template-columns: 55% 45%;
      background: url('~@/assets/images/databoard/pnl-数据板.png') no-repeat;
      background-size: 100% 100%;
      .part1 {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #9ee0ff;
        letter-spacing: 0;
        p {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #9ee0ff;
          letter-spacing: 0;
          line-height: 36px;
          text-indent: 10px;
        }
      }
      .part2 {
        font-family: MicrosoftYaHei-Bold;
        font-size: 20px;
        color: #ffffff;
        letter-spacing: 0;
        p {
          font-family: MicrosoftYaHei-Bold;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 0;
          line-height: 34px;
          text-indent: 10px;
          font-weight: 550;
          i {
            font-style: normal;
            font-size: 12px;
            color: #46a0dc;
          }
        }
      }
    }
  }
}
.oneCol {
  width: 50%;
  display: inline-block;
  height: 57px;
  position: relative;
  margin-bottom: 14px;
  overflow: hidden;
  .colLeft {
    width: 57px;
    height: 57px;
    position: absolute;
    left: 0;
  }
  .colImg1 {
    background: url('~@/assets/images/databoard/图标-卡片-温度.png') no-repeat;
    background-size: 100% 100%;
  }
  .colImg2 {
    background: url('~@/assets/images/databoard/图标-卡片-湿度.png') no-repeat;
    background-size: 100% 100%;
  }
  .colImg3 {
    background: url('~@/assets/images/databoard/图标-卡片-氨气.png') no-repeat;
    background-size: 100% 100%;
  }
  .colImg4 {
    background: url('~@/assets/images/databoard/图标-卡片-硫化氢.png') no-repeat;
    background-size: 100% 100%;
  }
  .colImg5 {
    background: url('~@/assets/images/databoard/图标-卡片-pm2.5.png') no-repeat;
    background-size: 100% 100%;
  }
  .colRight {
    margin-left: 62px;
    .colRight-p {
      font-family: MicrosoftYaHei-Bold;
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 24px;
      span {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #9ee0ff;
        letter-spacing: 0;
      }
    }
    .colRight-name {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #9ee0ff;
      letter-spacing: 0;
    }
  }
}
// panelPadding
.hack1080 {
  padding-top: 135px !important;
}
.centerPanel {
  height: calc(100% - 200px);
  width: 1000px;
  margin: 0 auto;
  position: relative;
  padding-top: 60px;
  // margin-top: 100px;
  .centernToilet {
    width: 100%;
    height: auto;
  }
}
.centerPanelHack1080 {
  padding-top: 180px;
}
.toiletBoss2 {
  height: 74px;
  width: 282px;
  position: absolute;
  right: 587px;
  bottom: 60px;
  .boxTitle {
    display: none;
  }
}
.toiletBoss {
  height: 130px;
  width: 282px;
  position: absolute;
  left: 512px;
  bottom: 50px;
  .titleInfo {
    position: absolute;
    left: 0;
    top: 0;
    line-height: 32px;
    height: 32px;
    width: 186px;
    background: url('~@/assets/images/databoard/pnl-小标题.png') no-repeat;
    background-size: 100% 100%;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #effeff;
    letter-spacing: 0;
    text-indent: 35px;
  }
  .bossBottom {
    height: 84px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url('~@/assets/images/databoard/card-环卫信息-默认.png')
      no-repeat;
    background-size: 100%;
    .bossLeft {
      height: 100%;
      width: 84px;
      position: absolute;
      left: 0;
      top: 0;
    }
    .bossRight {
      margin-left: 84px;
      padding-left: 10px;
      p {
        font-size: 14px;
        color: #9ee0ff;
        letter-spacing: 0;
        line-height: 26px;
        span {
          font-size: 14px;
          color: #4fb1c8;
          letter-spacing: 0;
        }
      }
    }
  }
}
</style>
