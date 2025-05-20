<template>
  <div class="oneBox">
    <div class="boxTitle">公厕统计</div>
    <div class="boxContent">
      <div class="contentLeft">
        <p class="p1">{{ currentData.toiletNum }}</p>
        <p class="p2">公厕数量</p>
      </div>
      <div class="contentRihgt">
        <p class="p1">{{ currentData.sensorNum }}</p>
        <p class="p2">传感器数量</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataBoardApi from '@/api/databoard';
export default {
  data() {
    return {
      currentData: {
        sensorNum: '',
        toiletNum: ''
      },
      orgCode: ''
    };
  },
  created() {
    // this.queryData();
  },
  methods: {
    // 公厕统计
    queryData(orgCode) {
      if (orgCode) {
        this.orgCode = orgCode;
      }
      DataBoardApi.queryNumber({ orgCode: this.orgCode }).then(res => {
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
    height: 70px;
    position: relative;
    .p1 {
      font-family: MicrosoftYaHei-Bold;
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 38px;
    }
    .p2 {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #9ee0ff;
      letter-spacing: 0;
    }
    .contentLeft {
      width: 50%;
      position: absolute;
      left: 0;
      top: 0;
      height: 70px;
      &::before {
        content: '';
        position: absolute;
        width: 64px;
        height: 64px;
        background: url('~@/assets/images/databoard/图标-卡片-公厕数量.png')
          no-repeat;
        background-size: cover;
      }
      p {
        text-indent: 70px;
      }
    }
    .contentRihgt {
      width: 50%;
      margin-left: 50%;
      height: 68px;
      &::before {
        content: '';
        position: absolute;
        width: 64px;
        height: 64px;
        background: url('~@/assets/images/databoard/图标-卡片-公厕数量.png')
          no-repeat;
        background-size: cover;
      }
      p {
        text-indent: 68px;
      }
    }
  }
}
</style>
