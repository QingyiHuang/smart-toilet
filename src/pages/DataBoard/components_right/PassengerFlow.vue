<template>
  <div class="oneBox">
    <div class="boxTitle">
      客流量统计
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
      <div class="totalNum">
        <div class="boxnum">{{ totalNum }}</div>
        <div class="boxtitle">总计</div>
      </div>
      <div id="echartPie2"></div>
      <div class="femalBox">
        <p class="boxtitle">女厕</p>
        <p class="boxnum">{{ femaleNum }}</p>
      </div>
      <div class="maleBox">
        <p class="boxtitle">男厕</p>
        <p class="boxnum">{{ maleNum }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import DataBoardApi from '@/api/databoard';
export default {
  data() {
    return {
      active: 'THIS_DAY',
      maleNum: 0,
      femaleNum: 0,
      totalNum: 0,
      orgCode: ''
    };
  },
  created() {
    // this.queryData();
  },
  methods: {
    // 根据时间和org来查询客流量并绘制饼图函数
    queryData(orgCode) {
      if (orgCode) {
        this.orgCode = orgCode;
      }
      DataBoardApi.flowStatisticInfo({
        orgIndexCode: this.orgCode,
        timeCycle: this.active
      }).then(res => {
        if (res.code === '0') {
          this.drawPie(res.data);
          this.maleNum = res.data.malePeopleNum;
          this.femaleNum = res.data.femalePeopleNum;
          this.totalNum = res.data.totalPeopleNum;
        }
      });
    },
    timePick(val) {
      this.active = val;
      this.queryData();
    },
    // 左侧饼图绘制
    drawPie(row) {
      const dom = document.getElementById('echartPie2');
      if (!dom) {
        return false;
      }
      const vchart = echarts.init(dom);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        color: ['#F5A623', '#008CFF'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['45%', '58%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: Number(row.femalePeopleNum), name: '女厕' },
              { value: Number(row.malePeopleNum), name: '男厕' }
            ]
          }
        ]
      };
      vchart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.oneBox {
  position: relative;
  height: 194px;
  width: 354px;
  // border: 1px solid red;
  padding-top: 36px;
  .boxTitle {
    height: 35px;
    width: 200px;
    // position: absolute;
    background: url('~@/assets/images/databoard/pnl-二级标题-02.png') no-repeat;
    background-size: cover;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #effeff;
    letter-spacing: 0;
    line-height: 35px;
    text-align: right;
    margin-bottom: 14px;
    position: absolute;
    right: 0;
    top: 0;
    padding-right: 12px;
    .timeBtn {
      width: 208px;
      height: 24px;
      overflow: hidden;
      position: absolute;
      right: 144px;
      top: 9px;
      .timePickerBtn {
        float: left;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #9ee0ff;
        letter-spacing: 0;
        line-height: 24px;
        text-align: center;
        // text-indent: 0px;
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
    // margin-top: 36px;
    height: 156px;
    .totalNum {
      position: absolute;
      width: 100%;
      z-index: 9;
      top: 48px;
      .boxnum {
        text-align: center;
        font-family: MicrosoftYaHei-Bold;
        font-size: 20px;
        color: #ffffff;
        letter-spacing: 0;
      }
      .boxtitle {
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #4fb1c8;
        letter-spacing: 0;
      }
    }
    .femalBox {
      width: 101px;
      height: 56px;
      position: absolute;
      bottom: 14px;
      left: 50px;
      background: url('~@/assets/images/databoard/chart-环形图-05.png')
        no-repeat;
      background-size: 100% 100%;
      padding-left: 14px;
      padding-top: 6px;
      .boxtitle {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #9ee0ff;
        letter-spacing: 0;
        position: relative;
        &::before {
          content: '';
          height: 12px;
          width: 2px;
          background: #f5a623;
          border-radius: 1px;
          position: absolute;
          left: -6px;
          top: 4px;
        }
      }
      .boxnum {
        font-family: MicrosoftYaHei-Bold;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
      }
    }
    .maleBox {
      width: 101px;
      height: 56px;
      position: absolute;
      bottom: 14px;
      right: 50px;
      background: url('~@/assets/images/databoard/chart-环形图-06.png')
        no-repeat;
      background-size: 100% 100%;
      padding-right: 14px;
      padding-top: 6px;
      text-align: right;
      .boxtitle {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #9ee0ff;
        letter-spacing: 0;
        position: relative;
        &::after {
          content: '';
          height: 12px;
          width: 2px;
          background: #008cff;
          border-radius: 1px;
          position: absolute;
          right: -6px;
          top: 4px;
        }
      }
      .boxnum {
        font-family: MicrosoftYaHei-Bold;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
      }
    }
    #echartPie2 {
      width: 100%;
      height: 100%;
    }
    &::before {
      content: '';
      width: 110px;
      height: 110px;
      position: absolute;
      left: 50%;
      top: 45%;
      margin-left: -55px;
      margin-top: -55px;
      background: url('~@/assets/images/databoard/chart-饼图03.png') no-repeat;
      background-size: 100% 100%;
      animation: turn1 5s linear infinite;
    }
    &::after {
      content: '';
      width: 110px;
      height: 110px;
      position: absolute;
      left: 50%;
      top: 45%;
      margin-left: -55px;
      margin-top: -55px;
      background: url('~@/assets/images/databoard/chart-饼图01.png') no-repeat;
      background-size: 100% 100%;
      animation: turn2 5s linear infinite;
    }
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
