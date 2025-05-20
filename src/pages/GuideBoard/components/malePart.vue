<template>
  <div :class="{ malePart: true, malePart1080: hack1080 }">
    <div class="toiletInfo">
      <div class="titleInfo">男卫生间</div>
      <div class="toiletInfoLeft"></div>
      <div class="toiletInfoRight">
        <p>
          {{ maleData.freeNum || 0 }}
          <span>/{{ maleData.totalNum || 0 }}</span>
        </p>
      </div>
    </div>
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
    <!-- 环境监测信息 -->
    <div class="oneBox">
      <div class="boxTitle">环境监测数据</div>
      <div class="boxContent">
        <div class="oneCol">
          <div class="colLeft colImg1"></div>
          <div class="colRight">
            <p class="colRight-p">
              {{
                maleData.envData
                  ? JSON.parse(maleData.envData).temperature
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
                  ? JSON.parse(maleData.envData).humidity
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
                  ? JSON.parse(maleData.envData).NH3
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
                  ? JSON.parse(maleData.envData).H2S
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
                  ? JSON.parse(maleData.envData)['PM2.5']
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
</template>

<script>
export default {
  props: {
    maleData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      hack1080: false
    };
  },
  mounted() {
    this.pageResize();
  },
  methods: {
    pageResize() {
      document.documentElement.clientHeight >= 1080
        ? (this.hack1080 = true)
        : (this.hack1080 = false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './font.css';
.malePart {
  height: 100%;
  width: 100%;
  padding: 97px 0 0 40px;
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
        background: url('~@/assets/images/databoard/icon-男厕02.png') no-repeat;
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
        background: url('~@/assets/images/databoard/icon-男厕03.png') no-repeat;
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
      p {
        font-family: DSDIGI;
        font-size: 80px;
        color: #09c6ff;
        line-height: 104px;
        text-align: center;
        letter-spacing: 1;
        span {
          font-size: 40px;
          color: #ffffff;
          // line-height: 80px;
          position: relative;
          margin-left: -10px;
        }
      }
    }
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
.malePart1080 {
  .toiletInfo {
    margin-bottom: 20px;
  }
  .oneBox {
    margin-bottom: 46px;
  }
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
</style>
