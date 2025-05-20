<template>
  <div class="oneBox">
    <div class="boxTitle">
      空气质量排行
      <div class="timeBtn">
        <div
          :class="{
            timePickerBtn: true,
            timePickerBtnActive: active === 'THIS_DAY'
          }"
          @click="timePick('THIS_DAY')"
        >
          今日
        </div>
        <div
          :class="{
            timePickerBtn: true,
            timePickerBtnActive: active === 'THIS_MONTH'
          }"
          @click="timePick('THIS_MONTH')"
        >
          本月
        </div>
        <div
          :class="{
            timePickerBtn: true,
            timePickerBtnActive: active === 'THIS_YEAR'
          }"
          @click="timePick('THIS_YEAR')"
        >
          本年
        </div>
      </div>
    </div>
    <div class="boxContent">
      <div class="innerScrollContent">
        <div class="innerbox">
          <div
            v-for="(item, index) in currentData"
            :key="index"
            :class="{ rank1: true, otherrank: index > 0 }"
          >
            <div class="leftIndex">
              {{ index > 8 ? index + 1 : `0${index + 1}` }}
            </div>
            <div class="rightValue" :title="item.name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataBoardApi from '@/api/databoard';
export default {
  data() {
    return {
      active: 'THIS_DAY',
      currentData: [],
      timer: null,
      orgCode: ''
    };
  },
  created() {
    // this.queryData();
  },
  methods: {
    timePick(val) {
      this.active = val;
      this.queryData();
    },
    queryData(orgCode) {
      if (orgCode) {
        this.orgCode = orgCode;
      }
      DataBoardApi.queryAirQualityRank({
        orgCode: this.orgCode,
        timeCycle: this.active
      }).then(res => {
        if (res.code === '0') {
          this.currentData = res.data;

          if (this.timer) {
            clearInterval(this.timer);
          }

          this.scroll();
        }
      });
    },
    scroll() {
      const dom = document.getElementsByClassName('innerScrollContent')[0];
      this.timer = null;
      // 初始化从0开始
      dom.style.cssText = 'transform:translate(0,0)';
      const animationEndHandler = evt => {
        dom.style.cssText = 'transform:translate(0,0)';
        // dom.appendChild(dom.children[0]); // 把第一个DOM添加到最后一个去
      };
      const mouseEnterHander = evt => {
        clearInterval(this.timer);
      };
      const initInterval = () => {
        this.timer = setInterval(() => {
          if (dom.children[0]) {
            let scrollHeight = dom.children[0].offsetHeight;
            scrollHeight = parseInt(scrollHeight);
            dom.style.cssText = `transform:translate(0px,-${
              scrollHeight - 136
            }px);transition:all ${this.currentData.length * 2}s linear;`;
          }
        }, 0);
      };
      const mouseLeaveHandler = () => {
        initInterval();
      };
      dom.addEventListener('mouseenter', mouseEnterHander);
      dom.addEventListener('mouseleave', mouseLeaveHandler);
      dom.removeEventListener('transitionend', animationEndHandler);
      dom.addEventListener('transitionend', animationEndHandler);
      initInterval();
    }
  }
};
</script>

<style lang="scss" scoped>
.oneBox {
  position: relative;
  height: 160px;
  width: 360px;
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
    .timeBtn {
      width: 208px;
      height: 24px;
      overflow: hidden;
      position: absolute;
      left: 144px;
      top: 9px;
      .timePickerBtn {
        float: left;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #9ee0ff;
        letter-spacing: 0;
        line-height: 24px;
        // text-align: center;
        text-indent: 26px;
        width: 76px;
        height: 24px;
        background: url('~@/assets/images/databoard/cmmd-选项卡01-默认.png')
          no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        & + .timePickerBtn {
          margin-left: -10px;
        }
        &:hover {
          background: url('~@/assets/images/databoard/cmmd-选项卡01-悬停.png')
            no-repeat;
        }
        &:active {
          background: url('~@/assets/images/databoard/cmmd-选项卡01-选中.png')
            no-repeat;
        }
      }
      .timePickerBtnActive {
        background: url('~@/assets/images/databoard/cmmd-选项卡01-选中.png')
          no-repeat;
        font-weight: bold;
        color: #ffffff;
        &:hover {
          background: url('~@/assets/images/databoard/cmmd-选项卡01-选中.png')
            no-repeat;
        }
      }
    }
  }
  .boxContent {
    position: relative;
    height: 136px;
    overflow: hidden;
    .innerScrollContent {
      height: 100%;
    }
    .rank1 {
      height: 20px;
      margin-bottom: 14px;
      position: relative;
      .leftIndex {
        width: 32px;
        height: 20px;
        background: url('~@/assets/images/databoard/chart-排名01.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        line-height: 20px;
      }
      .rightValue {
        // width: 32px;
        height: 20px;
        background: url('~@/assets/images/databoard/chart-柱状图04-长.png')
          no-repeat;
        background-size: 100% 100%;
        margin-left: 32px;
        margin-right: 12px;
        font-size: 12px;
        color: #9ee0ff;
        text-indent: 10px;
        line-height: 20px;
      }
    }
    .otherrank {
      .leftIndex {
        width: 32px;
        height: 20px;
        background: url('~@/assets/images/databoard/chart-排名02.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        line-height: 20px;
      }
    }
  }
}
</style>
