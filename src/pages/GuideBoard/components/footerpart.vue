<template>
  <div :class="{ footerPart: true, footerpart1080: hack1080 }">
    <div class="leftPart">
      <div class="toiletBoss">
        <div class="titleInfo">公厕负责人</div>
        <div class="bossBottom">
          <div class="bossLeft"></div>
          <div class="bossRight">
            <p>
              <span>负责人</span>
              {{ chargePerson.name || '' }}
            </p>
            <p>
              <span>工号</span>
              {{ chargePerson.jobNo || '' }}
            </p>
            <p>
              <span>联系电话</span>
              {{ chargePerson.tel || '' }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="centerpart">
      <div class="toiletBosscenter">
        <div class="titleInfo">第三卫环境监测信息</div>
        <div class="bossBottom">
          <div class="oneCol">
            <div class="colLeft colImg1"></div>
            <div class="colRight">
              <p class="colRight-p">
                {{
                  thirdData.envData
                    ? JSON.parse(thirdData.envData).temperature
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
                  thirdData.envData
                    ? JSON.parse(thirdData.envData).humidity
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
                  thirdData.envData ? JSON.parse(thirdData.envData).NH3 : '--'
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
                  thirdData.envData ? JSON.parse(thirdData.envData).H2S : '--'
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
                  thirdData.envData
                    ? JSON.parse(thirdData.envData)['PM2.5']
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
    <div class="rightpart">
      <div class="toiletBoss">
        <div class="titleInfo">微信公众号</div>
        <div class="bossBottom">
          <div class="bossLeft"></div>
          <div class="bossRight">
            <div>
              可关注微信公众号“智慧舟山公厕”，为您提供公厕评价、寻找公厕等服务
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thirdData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    chargePerson: {
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
.footerPart {
  width: 1544px;
  height: 130px;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -772px;
  display: grid;
  grid-template-columns: 19% 62% 19%;
  .leftPart {
    position: relative;
  }
  .centerpart {
    position: relative;
  }
  .rightpart {
    position: relative;
  }
}
.footerpart1080 {
  bottom: 82px;
}
.toiletBoss {
  height: 130px;
  width: 282px;
  position: absolute;
  left: 0px;
  top: 0;
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
      div {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #9ee0ff;
        letter-spacing: 0;
        word-break: break-all;
        padding-top: 12px;
      }
    }
  }
}
.toiletBosscenter {
  height: 130px;
  width: 904px;
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -452px;
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
    background-image: linear-gradient(180deg, #0051a327 1%, #0a2d6633 100%);
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    padding-top: 13.5px;
    .oneCol {
      width: 100%;
      height: 57px;
      position: relative;
      margin-bottom: 14px;
      overflow: hidden;
      .colLeft {
        width: 57px;
        height: 57px;
        position: absolute;
        left: 8px;
      }
      .colImg1 {
        background: url('~@/assets/images/databoard/图标-卡片-温度.png')
          no-repeat;
        background-size: 100% 100%;
      }
      .colImg2 {
        background: url('~@/assets/images/databoard/图标-卡片-湿度.png')
          no-repeat;
        background-size: 100% 100%;
      }
      .colImg3 {
        background: url('~@/assets/images/databoard/图标-卡片-氨气.png')
          no-repeat;
        background-size: 100% 100%;
      }
      .colImg4 {
        background: url('~@/assets/images/databoard/图标-卡片-硫化氢.png')
          no-repeat;
        background-size: 100% 100%;
      }
      .colImg5 {
        background: url('~@/assets/images/databoard/图标-卡片-pm2.5.png')
          no-repeat;
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
  }
}
</style>
