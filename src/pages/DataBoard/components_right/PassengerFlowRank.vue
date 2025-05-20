<template>
  <div class="oneBox">
    <div class="boxTitle">
      客流量排行
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
      <div v-for="(item, index) in barData" :key="index" class="oneBar">
        <div class="barname" :title="item.toiletName">
          {{ item.toiletName }}
        </div>
        <div class="barpart">
          <div class="barouter">
            <div
              class="barself"
              :style="{
                width: `${Percentage(
                  Number(item.totalPeopleNum),
                  Number(barData[0].totalPeopleNum)
                )}%`
              }"
            ></div>
          </div>
          <div class="barnum">{{ item.totalPeopleNum }}</div>
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
      barData: [],
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
      DataBoardApi.flowStatisticRank({
        limit: 5,
        orgIndexCode: this.orgCode,
        timeCycle: this.active
      }).then(res => {
        if (res.code === '0') {
          this.barData = res.data;
        }
      });
    },
    Percentage(num, total) {
      if (num === 0 || total === 0) {
        return 0;
      }
      return Math.round((num / total) * 10000) / 100.0; // 小数点后两位百分比
    }
  }
};
</script>

<style lang="scss" scoped>
.oneBox {
  position: relative;
  height: 184px;
  width: 354px;
  padding-top: 58px;
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
    .oneBar {
      display: grid;
      grid-template-columns: 28% 72%;
      height: 25px;
      .barname {
        font-size: 14px;
        color: #9ee0ff;
        letter-spacing: 0;
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .barpart {
        padding-left: 12px;
        // padding-top: 6px;

        .barouter {
          width: 198px;
          display: inline-block;
          .barself {
            height: 8px;

            background-image: linear-gradient(270deg, #00a8ff 0%, #072d5b 100%);
            position: relative;
            display: inline-block;
            &::after {
              content: '';
              background-image: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.5) 100%
              );
              width: 8px;
              height: 10px;
              position: absolute;
              right: 0;
              top: -1px;
            }
          }
        }

        .barnum {
          display: inline-block;
          position: relative;
          margin-left: 4px;
          top: 0px;
          font-family: MicrosoftYaHei-Bold;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          line-height: 14px;
          background: rgba(6, 25, 55, 0.3);
          border: 1px solid #00d2ff;
          padding: 0 1px;
        }
      }
    }
  }
}
</style>
