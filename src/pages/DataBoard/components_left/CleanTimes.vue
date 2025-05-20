<template>
  <div class="oneBox">
    <div class="boxTitle">清扫次数统计</div>
    <div class="boxContent">
      <div class="contentLeft"></div>
      <div class="contentRihgt">
        <div class="part1">
          <p>今日清扫次数</p>
          <p>本月清扫次数</p>
        </div>
        <div class="part2">
          <p>
            {{ currentData.todayCleanTimes || 0 }}
            <i>次</i>
          </p>
          <p>
            {{ currentData.monthlyCleanTimes || 0 }}
            <i>次</i>
          </p>
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
      currentData: {},
      orgCode: ''
    };
  },
  created() {
    // this.queryData();
  },
  methods: {
    // queryData
    queryData(orgCode) {
      if (orgCode) {
        this.orgCode = orgCode;
      }
      DataBoardApi.queryCleanTimes({ orgCode: this.orgCode }).then(res => {
        if (res.code === '0') {
          this.currentData = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.oneBox {
  position: relative;
  height: 135px;
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
    height: 72px;
    position: relative;
    .contentLeft {
      position: absolute;
      left: 0;
      top: 0;
      height: 72px;
      width: 72px;
      height: 72px;
      background: url('~@/assets/images/databoard/图标-卡片-清扫.png') no-repeat;
      background-size: cover;
    }
    .contentRihgt {
      margin-left: 78px;
      margin-right: 20px;
      height: 72px;
      display: grid;
      grid-template-columns: 58% 42%;
      background: url('~@/assets/images/databoard/pnl-数据板.png') no-repeat;
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
</style>
