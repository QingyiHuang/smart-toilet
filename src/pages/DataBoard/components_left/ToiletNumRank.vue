<template>
  <div class="oneBox">
    <div class="boxTitle">区域公厕数排行</div>
    <div class="boxContent">
      <!-- 五个百分比 -->
      <div v-for="(item, index) in tableData" :key="index" class="oneBar">
        <div
          :class="{
            barIndex: true,
            otherIndex1: index === 1,
            otherIndex2: index > 1
          }"
        >
          0{{ index + 1 }}
        </div>
        <div class="barName" :title="item.orgName">
          {{ item.orgName }}
        </div>
        <div class="barSelf">
          <div class="bordertest">
            <div
              v-for="one in Percentage(
                Number(item.toiletNum),
                Number(tableData[0].toiletNum)
              )"
              :key="one"
              class="onebarblock"
            ></div>
          </div>
        </div>
        <div class="barNum">{{ item.toiletNum }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DataBoardApi from '@/api/databoard';
export default {
  data() {
    return {
      tableData: [],
      orgCode: ''
    };
  },
  created() {
    // this.queryData();
  },
  methods: {
    queryData(orgCode) {
      if (orgCode) {
        this.orgCode = orgCode;
      }
      DataBoardApi.queryToiletNumberRank({ orgCode: this.orgCode }).then(
        res => {
          if (res.code === '0') {
            this.tableData = (res.data || []).slice(0, 5);
          }
        }
      );
    },
    Percentage(num, total) {
      if (num === 0 || total === 0) {
        return 0;
      }
      return Math.trunc((num / total) * 15); // 小数点后两位百分比
    }
  }
};
</script>

<style lang="scss" scoped>
.oneBox {
  position: relative;
  height: 220px;
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
    .oneBar {
      width: 100%;
      height: 32px;
      position: relative;
      .barIndex {
        width: 32px;
        height: 24px;
        background: url('~@/assets/images/databoard/chart-排名01.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 12px;
        color: #ffffff;
        line-height: 24px;
        text-align: center;
      }
      .otherIndex1 {
        background: url('~@/assets/images/databoard/chart-排名02.png') no-repeat;
      }
      .otherIndex2 {
        background: url('~@/assets/images/databoard/chart-排名03.png') no-repeat;
      }
      .barName {
        width: 68px;
        height: 24px;
        font-size: 12px;
        color: #9ee0ff;
        line-height: 20px;
        background: url('~@/assets/images/databoard/chart-柱状图04.png')
          no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 32px;
        top: 0;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #9ee0ff;
        line-height: 24px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        // padding-left: 4px;
      }
      .barSelf {
        height: 24px;
        width: 188px;
        background: url('~@/assets/images/databoard/chart-柱状图01.png')
          no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 100px;
        top: 0px;
        overflow: hidden;
        padding: 3.5px 2px 0 2px;
        .bordertest {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: url('~@/assets/images/databoard/chart-柱状图02.png')
            no-repeat;
          background-size: 100% 100%;
          overflow: hidden;
          padding-left: 4px;
        }
        .onebarblock {
          width: 12px;
          height: 6px;
          display: inline-block;
          background: url('~@/assets/images/databoard/菱形块.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .barNum {
        height: 24px;
        width: 64px;
        background: url('~@/assets/images/databoard/chart-柱状图05.png')
          no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 6px;
        top: 0;
        font-family: MicrosoftYaHei-Bold;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        line-height: 24px;
      }
    }
  }
}
</style>
