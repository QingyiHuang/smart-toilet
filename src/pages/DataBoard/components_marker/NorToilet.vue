<template>
  <div
    :ref="popuData.id"
    v-clickoutside="closePop"
    :class="{ iconOuter: true, iconActive: showWindow }"
    @click.stop="changePopShow"
  >
    <div v-show="!showWindow" class="toiletName" :title="popuData.name">
      {{ popuData.name || '公共厕所' }}
    </div>
    <div v-show="showWindow" class="window" @click.stop.prevent="() => {}">
      <div class="windowTitle">{{ popuData.name || '公共厕所' }}</div>
      <div class="oneRow">
        <div class="leftpart">地点</div>
        <div class="rightPart" :title="popuData.address">
          {{ popuData.address }}
        </div>
      </div>
      <div class="oneRow">
        <div class="leftpart">在用</div>
        <div class="rightPart">{{ popuData.usedIndicator }}</div>
      </div>
      <div class="oneRow">
        <div class="leftpart">空闲</div>
        <div class="rightPart">{{ popuData.freeIndicator }}</div>
      </div>
      <!-- 视频预览 -->
      <div
        v-if="popuData.videoFlag"
        class="previewBtn"
        @click.stop.prevent="preview"
      >
        视频预览
      </div>
      <!-- 实时状态按钮 -->
      <div class="realTimeBtn" @click.stop.prevent="goDetail">实时状态</div>
      <!-- 关闭按钮 -->
      <div class="closeBtn" @click.stop.prevent="changePopShow"></div>
    </div>
  </div>
</template>

<script>
import Clickoutside from './Clickoutside';
export default {
  directives: {
    Clickoutside
  },
  props: {
    popuData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showWindow: false
    };
  },
  methods: {
    closePop() {
      this.showWindow = false;
    },
    changePopShow() {
      if (
        this.$refs[`${this.popuData.id}`].getElementsByClassName('window')[0]
          .style.display === 'block'
      ) {
        this.$refs[`${this.popuData.id}`].getElementsByClassName(
          'window'
        )[0].style.display = 'none';
      } else {
        this.$emit('openWindow', {
          open: !this.showWindow,
          marker: this
        });
        setTimeout(() => {
          if (!this.showWindow) {
            this.$nextTick(() => {
              document.getElementById(
                `cqMarkerlayers_${this.popuData.id}`
              ).style.zIndex = 299;
            });
          } else {
            this.$nextTick(() => {
              document.getElementById(
                `cqMarkerlayers_${this.popuData.id}`
              ).style.zIndex = 10;
            });
          }
          this.showWindow = !this.showWindow;
        }, 1);
      }
    },
    goDetail() {
      this.$emit('goRealTime', this.popuData.id);
    },
    preview() {
      this.$emit('preview', this.popuData.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.iconOuter {
  box-sizing: border-box;
  position: absolute;
  width: 36px;
  height: 36px;
  background: url('~@/assets/images/databoard/POI-公厕-默认1.png') no-repeat;
  background-size: cover;
  left: -18px;
  top: -18px;
  cursor: pointer;
  .toiletName {
    width: 58px;
    height: 24px;
    background-color: rgb(9, 45, 69);
    text-align: center;
    overflow: hidden;
    line-height: 24px;
    font-size: 12px;
    color: rgb(209, 216, 220);
    letter-spacing: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    left: -12px;
    top: -31px;
    border-left: 1px solid rgb(6, 192, 204);
    border-right: 1px solid rgb(6, 192, 204);
  }
  .window {
    height: 200px;
    width: 320px;
    background: url('~@/assets/images/databoard/tips-弹窗.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: -142px;
    top: -204px;
    padding: 12px 10px;
    .previewBtn {
      position: absolute;
      right: 113px;
      bottom: 48px;
      width: 80px;
      height: 32px;
      background: url('~@/assets/images/databoard/btn-蓝按钮01-默认.png')
        no-repeat;
      background-size: 100% 100%;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #9ee0ff;
      letter-spacing: 0;
      text-align: center;
      line-height: 32px;
      &:hover {
        background: url('~@/assets/images/databoard/btn-蓝按钮01-悬停.png')
          no-repeat;
        background-size: 100% 100%;
      }
    }
    .realTimeBtn {
      position: absolute;
      right: 25px;
      bottom: 48px;
      width: 80px;
      height: 32px;
      background: url('~@/assets/images/databoard/btn-蓝按钮01-默认.png')
        no-repeat;
      background-size: 100% 100%;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #9ee0ff;
      letter-spacing: 0;
      text-align: center;
      line-height: 32px;
      &:hover {
        background: url('~@/assets/images/databoard/btn-蓝按钮01-悬停.png')
          no-repeat;
        background-size: 100% 100%;
      }
    }
    .closeBtn {
      background: url('~@/assets/images/databoard/btn-tips-关闭01-默认.png')
        no-repeat;
      background-size: 100% 100%;
      width: 56px;
      height: 26px;
      position: absolute;
      cursor: pointer;
      right: 4px;
      top: 4px;
      transition: all 0.15s ease;
      &:hover {
        background: url('~@/assets/images/databoard/btn-tips-关闭01-悬停.png')
          no-repeat;
        background-size: 100% 100%;
      }
    }
    .windowTitle {
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0;
      padding-left: 12px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 13px;
    }
    .oneRow {
      padding-left: 19px;
      display: grid;
      grid-template-columns: 23% 77%;
      line-height: 24px;
      .leftpart {
        font-size: 14px;
        color: #4fb1c8;
        letter-spacing: 0;
      }
      .rightPart {
        font-size: 14px;
        color: #9ee0ff;
        letter-spacing: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
.iconActive {
  background: url('~@/assets/images/databoard/POI-公厕-悬停.png') no-repeat;
  background-size: cover;
  width: 36px;
  height: 45px;
  left: -18px;
  top: -22.5px;
}
</style>
