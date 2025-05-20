<template>
  <el-dialog
    :area="[800, 460]"
    top="middle"
    no-scrollbar
    title="评分详情"
    :visible.sync="dialogFormVisible3"
    @close="clearVale"
    @opened="drawStar"
  >
    <div class="infoOuter">
      <div class="imgPart">
        <img v-if="boxObj.picUrl" :src="boxObj.picUrl" />
        <img v-else class="emptyImg" :src="quesheng" alt="" />
      </div>
      <div class="rightInfoPart">
        <div class="oneLine">
          <p class="lineTitle">公厕名称</p>
          <p class="normalP">{{ boxObj.toiletName }}</p>
        </div>
        <div class="oneLine">
          <p class="lineTitle">总体评分</p>
          <div class="eva">
            <div class="star starLight"></div>
            <div class="star starLight"></div>
            <div class="star starLight"></div>
            <div class="star starLight"></div>
            <div class="star starLight"></div>
            <p class="starNum">{{ boxObj.grade }}分</p>
          </div>
        </div>
        <div class="oneLine oneLinesmall">
          <p class="lineTitle small">卫生间无异味</p>
          <div class="eva evasmall">
            <div class="star2 starLight"></div>
            <div class="star2 starLight"></div>
            <div class="star2 starLight"></div>
            <div class="star2 starLight"></div>
            <div class="star2 starLight"></div>
            <p class="starNum">{{ smallGrade.grade1 || 5 }}分</p>
          </div>
        </div>
        <div class="oneLine oneLinesmall">
          <p class="lineTitle small">设备设施完好</p>
          <div class="eva evasmall">
            <div class="star3 starLight"></div>
            <div class="star3 starLight"></div>
            <div class="star3 starLight"></div>
            <div class="star3 starLight"></div>
            <div class="star3 starLight"></div>
            <p class="starNum">{{ smallGrade.grade2 || 5 }}分</p>
          </div>
        </div>
        <div class="oneLine oneLinesmall">
          <p class="lineTitle small">环境整洁干净</p>
          <div class="eva evasmall">
            <div class="star4 starLight"></div>
            <div class="star4 starLight"></div>
            <div class="star4 starLight"></div>
            <div class="star4 starLight"></div>
            <div class="star4 starLight"></div>
            <p class="starNum">{{ smallGrade.grade3 || 5 }}分</p>
          </div>
        </div>
        <div class="oneLine">
          <p class="lineTitle">反馈内容</p>
          <p class="rowP">{{ boxObj.evaluateItemNames }}</p>
          <p class="rowP">{{ boxObj.remark || '--' }}</p>
        </div>
        <div class="oneLine">
          <p class="lineTitle">评价时间</p>
          <p class="normalP">{{ boxObj.createTime | timeFilter }}</p>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
// 该dialog用以展示公厕评分详情内容
import moment from 'moment';
export default {
  filters: {
    timeFilter(val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '--';
      }
    }
  },
  data() {
    return {
      dialogFormVisible3: false,
      boxObj: {},
      quesheng: require('@/assets/empty.png'),
      smallGrade: {}
    };
  },
  methods: {
    clearVale() {
      //
      this.boxObj = {};
    },
    setVal(obj) {
      this.boxObj = obj;
      if (obj.gradeDetail) {
        this.smallGrade = JSON.parse(obj.gradeDetail);
      } else {
        this.smallGrade = {};
      }
      this.dialogFormVisible3 = true;
    },
    drawStar() {
      const star = document.querySelectorAll('.star');
      const grid = this.boxObj.grade;
      if (Number(grid) === 0) {
        for (let i = 0; i < 5; i++) {
          star[i].className = 'star starLight';
        }
      } else {
        const aa1 = parseInt(Number(grid));
        for (let i = 0; i < aa1; i++) {
          star[i].className = 'star starLight';
        }
        if (Number(grid) > aa1) {
          star[aa1].className = 'star starHarf';
          for (let i = aa1 + 1; i < 5; i++) {
            star[i].className = 'star';
          }
        } else {
          for (let i = aa1; i < 5; i++) {
            star[i].className = 'star';
          }
        }
      }
      this.drawSmallStar('star2', this.smallGrade.grade1);
      this.drawSmallStar('star3', this.smallGrade.grade2);
      this.drawSmallStar('star4', this.smallGrade.grade3);
    },
    drawSmallStar(starName, grade) {
      // 获取当前评分
      const star = document.querySelectorAll(`.${starName}`);
      const grid = grade || 5;
      if (Number(grid) === 0) {
        for (let i = 0; i < 5; i++) {
          star[i].className = `${starName} starLight`;
        }
      } else {
        const aa1 = parseInt(Number(grid));
        for (let i = 0; i < aa1; i++) {
          star[i].className = `${starName} starLight`;
        }
        if (Number(grid) > aa1) {
          star[aa1].className = `${starName} starHarf`;
          for (let i = aa1 + 1; i < 5; i++) {
            star[i].className = `${starName}`;
          }
        } else {
          for (let i = aa1; i < 5; i++) {
            star[i].className = `${starName}`;
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.infoOuter {
  height: 400px;
  position: relative;
  .imgPart {
    height: 400px;
    width: 500px;
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 100%;
      height: 100%;
    }
    .emptyImg {
      width: 174px;
      height: 148px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -87px;
      margin-top: -74px;
    }
  }
  .rightInfoPart {
    margin-left: 500px;
    height: 400px;
    padding: 6px;
  }
  .normalP {
  }
  .lineTitle {
    font-weight: bold;
    color: black;
  }
  .small {
    font-weight: normal;
    color: rgb(129, 129, 129);
  }
  .oneLine {
    margin-bottom: 8px;
  }
  .oneLinesmall {
    margin-bottom: 0px;
  }
}
.eva {
  overflow: hidden;
  .starNum {
    float: left;
    line-height: 26px;
  }
}
.eva .star,
.eva .star1,
.eva .star2,
.eva .star3,
.eva .star4 {
  width: 26px;
  height: 26px;
  background: url('~@/assets/images/ico-星背景.png') no-repeat;
  background-size: 100% 100%;
  float: left;
  margin-right: 4px;
}
.eva .starLight {
  background: url('~@/assets/images/ico-星.png') no-repeat;
  background-size: 100% 100%;
}
.eva .starHarf {
  background: url('~@/assets/images/ico-星半.png') no-repeat;
  background-size: 100% 100%;
}
.evasmall .star,
.evasmall .star1,
.evasmall .star2,
.evasmall .star3,
.evasmall .star4 {
  width: 18px;
  height: 18px;
  background: url('~@/assets/images/ico-星背景.png') no-repeat;
  background-size: 100% 100%;
  float: left;
  margin-right: 2px;
}
.evasmall .starLight {
  background: url('~@/assets/images/ico-星.png') no-repeat;
  background-size: 100% 100%;
}
.evasmall .starHarf {
  background: url('~@/assets/images/ico-星半.png') no-repeat;
  background-size: 100% 100%;
}
.evasmall {
  overflow: hidden;
  .starNum {
    float: left;
    line-height: 20px;
  }
}
</style>
