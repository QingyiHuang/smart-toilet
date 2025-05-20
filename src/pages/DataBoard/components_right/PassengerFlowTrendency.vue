<template>
  <div class="oneBox">
    <div class="boxTitle">
      客流量趋势统计
      <div class="timeBtn">
        <div
          :class="{
            timePickerBtn: true,
            timePickerBtnActive: active === 'DAY'
          }"
          @click="timePick('DAY')"
        >
          按日
        </div>
        <div
          :class="{
            timePickerBtn: true,
            timePickerBtnActive: active === 'WEEK'
          }"
          @click="timePick('WEEK')"
        >
          按周
        </div>
        <div
          :class="{
            timePickerBtn: true,
            timePickerBtnActive: active === 'MONTH'
          }"
          @click="timePick('MONTH')"
        >
          按月
        </div>
      </div>
    </div>
    <div class="boxContent">
      <div id="lineChart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import DataBoardApi from '@/api/databoard';
// import moment from 'moment'
export default {
  data() {
    return { active: 'DAY', orgCode: '' };
  },
  created() {
    // this.queryData();
  },
  methods: {
    // 根据时间和org来查询客流量趋势
    queryData(orgCode) {
      if (orgCode) {
        this.orgCode = orgCode;
      }
      DataBoardApi.flowStatisticTrend({
        orgIndexCode: this.orgCode,
        statisticType: this.active
      }).then(res => {
        if (res.code === '0') {
          this.drawPie(res.data);
        }
      });
    },
    timePick(val) {
      this.active = val;
      this.queryData();
    },
    drawPie(row) {
      const dom = document.getElementById('lineChart');
      if (!dom) {
        return false;
      }
      const xRow = [];
      const yRow = [];
      if (row.length) {
        row.map(item => {
          xRow.push(item.date);
          yRow.push(Number(item.totalPeopleNum));
        });
      }

      const vchart = echarts.init(dom);
      const option = {
        color: ['rgb(0, 210, 255)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '4%',
          right: '8%',
          bottom: '8%',
          top: '14%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xRow,
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(158, 224, 255, 0.7)',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(158, 224, 255, 0.7)',
                fontSize: 10
              },
              clickable: true
            },
            silent: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              // y轴文字的配置
              textStyle: {
                color: 'rgba(158, 224, 255, 0.7)',
                margin: 15
              }
              // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
            },
            axisTick: {
              show: false
            },
            axisLine: {
              // y轴线的颜色以及宽度
              show: false
            },
            splitLine: {
              // 分割线配置
              show: true,
              lineStyle: {
                color: 'rgba(158, 224, 255, 0.145)'
              }
            }
          }
        ],
        series: [
          {
            name: '客流量',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 3
            },
            showSymbol: true,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#ffffff',
                margin: 12
              }
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(57,234,236,0.70)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,134,255,0.00) '
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: yRow
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
  height: 220px;
  width: 354px;
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
    height: 183px;
    #lineChart {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
