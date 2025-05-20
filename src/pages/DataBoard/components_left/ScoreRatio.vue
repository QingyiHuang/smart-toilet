<template>
  <div class="oneBox">
    <div class="boxTitle">公厕评分占比</div>
    <div class="boxContent">
      <div class="contentLeft">
        <div id="echartPie"></div>
      </div>
      <div class="contentRihgt">
        <div v-for="(item, index) in currentData" :key="index" class="oneType">
          <div
            :class="{
              colorBlock: true,
              green: item.level === '5星',
              orange: item.level === '4星',
              blue: item.level === '3星',
              deepblue: item.level === '2星',
              pink: item.level === '1星'
            }"
          ></div>
          <span class="typename">{{ item.level }}</span>
          <span class="typeRate">
            {{ item.proportion }}
            <i>%</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataBoardApi from '@/api/databoard';
import * as echarts from 'echarts';
export default {
  data() {
    return {
      currentData: [],
      orgCode: ''
    };
  },
  mounted() {
    // this.drawPie();
    // this.queryData();
  },
  methods: {
    // 查询评分占比
    queryData(orgCode) {
      if (orgCode) {
        this.orgCode = orgCode;
      }
      DataBoardApi.queryScoreProportion({ orgCode: this.orgCode }).then(res => {
        if (res.code === '0') {
          this.currentData = res.data;
          this.drawPie(res.data);
        }
      });
    },
    // 左侧饼图绘制
    drawPie(row) {
      const dom = document.getElementById('echartPie');
      if (!dom) {
        return false;
      }
      const tableData = [];
      if (row.length) {
        row.map(item => {
          tableData.push({
            name: item.level,
            value: item.proportion
          });
        });
      }
      const vchart = echarts.init(dom);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        color: ['#ffc0cb', '#247bff', '#00d2ff', '#f5a623', '#3bcd8d'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['65%', '80%'],
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
            data: tableData
          }
        ]
      };
      vchart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
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
  height: 180px;
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
  }
  .boxContent {
    height: 110px;
    position: relative;
    .contentLeft {
      width: 50%;
      position: absolute;
      left: 0;
      top: 0;
      height: 110px;
      #echartPie {
        width: 100%;
        height: 100%;
      }
      &::before {
        content: '';
        width: 110px;
        height: 110px;
        position: absolute;
        left: 50%;
        top: 50%;
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
        top: 50%;
        margin-left: -55px;
        margin-top: -55px;
        background: url('~@/assets/images/databoard/chart-饼图01.png') no-repeat;
        background-size: 100% 100%;
        animation: turn2 5s linear infinite;
      }
    }
    .contentRihgt {
      width: 50%;
      margin-left: 50%;
      height: 110px;
      .oneType {
        background: url('~@/assets/images/databoard/chart-饼图04.png') no-repeat;
        background-size: 100% 100%;
        width: 160px;
        height: 20px;
        margin-bottom: 2px;
        position: relative;
        .colorBlock {
          width: 10px;
          height: 10px;
          position: absolute;
          left: 8px;
          top: 5px;
        }
        .typename {
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #9ee0ff;
          letter-spacing: 0;
          line-height: 21px;
          position: absolute;
          left: 22px;
          top: 0;
        }
        .typeRate {
          font-family: MicrosoftYaHei-Bold;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 0;
          line-height: 21px;
          position: absolute;
          right: 10px;
          top: 0;
          font-weight: 550;
          i {
            font-weight: normal;
            font-style: normal;
            opacity: 0.7;
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #9ee0ff;
            letter-spacing: 0;
          }
        }
        .green {
          background: #3bcd8d;
        }
        .orange {
          background: #f5a623;
        }
        .blue {
          background: #00d2ff;
        }
        .deepblue {
          background: #247bff;
        }
        .pink {
          background: #ffc0cb;
        }
      }
    }
  }
}
</style>
