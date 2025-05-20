<template>
  <div class="oneBox">
    <div class="boxTitle">
      最新智能预警
      <div class="more" @click="moreAlarm">更多</div>
    </div>
    <div class="boxContent">
      <div v-for="(item, index) in tableData" :key="index" class="oneAlarm">
        <div class="leftpart">
          <img :src="item.toiletPicUrl || quesheng" />
        </div>
        <div class="rightpart" :title="item.toiletName">
          <p class="rtitle">
            {{ item.alarmDetail || item.alarmTypeName }}
          </p>
          <p class="rinfo" :title="item.toiletAddress">
            {{ item.toiletAddress }}
          </p>
          <p class="rinfo">{{ item.alarmTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceApi from '@/api/device';
export default {
  data() {
    return {
      tableData: [],
      quesheng: require('@/assets/images/databoard/bg-缺省图片.png'),
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
      DeviceApi.alarmList({
        pageNo: 1,
        pageSize: 20,
        orgIndexCode: this.orgCode
      }).then(res => {
        if (res.code === '0') {
          this.tableData = (res.data.list || []).slice(0, 2);
        }
      });
    },
    moreAlarm() {
      this.$router.push({
        path: '/HistoryAlarm'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.oneBox {
  position: relative;
  height: 240px;
  width: 354px;
  padding-top: 50px;
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
    .more {
      position: absolute;
      right: 277px;
      top: 8px;
      height: 24px;
      width: 72px;
      text-align: center;
      line-height: 24px;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #9ee0ff;
      letter-spacing: 0;
      cursor: pointer;
      background: url('~@/assets/images/databoard/btn-小蓝按钮-默认.png')
        no-repeat;
      background-size: 100% 100%;
      &:hover {
        background: url('~@/assets/images/databoard/btn-小蓝按钮-悬停.png')
          no-repeat;
        color: #ffffff;
      }
    }
  }
  .boxContent {
    position: relative;
    .oneAlarm {
      width: 352px;
      height: 86px;
      background: url('~@/assets/images/databoard/card-最新告警01-默认.png')
        no-repeat;
      background-size: 100% 100%;
      margin-bottom: 8px;
      cursor: pointer;
      position: relative;
      &:hover {
        background: url('~@/assets/images/databoard/card-最新告警01-悬停.png')
          no-repeat;
      }
      .leftpart {
        width: 136px;
        height: 86px;
        position: absolute;
        left: 0;
        top: 0;
        padding: 6px 0 0 8px;
        img {
          width: 126px;
          height: 74px;
          // border: 1px solid red;
        }
      }
      .rightpart {
        margin-left: 147px;
        padding-top: 10px;
        .rtitle {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 0;
          margin-bottom: 0px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .rinfo {
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #9ee0ff;
          letter-spacing: 0;
          line-height: 24px;
          text-indent: 25px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
