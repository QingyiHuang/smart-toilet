<template>
  <el-dialog
    :area="[1136, 736]"
    top="middle"
    no-scrollbar
    title="实时预览"
    :visible.sync="dialogFormVisible3"
    @opened="queryMonitor"
    @close="closeAll"
  >
    <div class="full outer">
      <div class="leftPart">
        <!-- <div class="tool">
          <div class="label">预览分屏数</div>
          <el-select v-model="videoScreens" placeholder="请选择">
            <el-option
              v-for="item in videoScreenOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div> -->
        <div class="list">
          <p
            v-for="(item, index) in monitorArr"
            :key="index"
            :class="{ monP: true, monPActive: item.active }"
            @click="queryPlayParam(item.indexCode, index)"
          >
            <i class="h-icon-info_camera"></i>
            <span>{{ item.name }}</span>
          </p>
        </div>
      </div>
      <div class="rightPart">
        <h-empty v-if="!indexCode" :img="require('@/assets/empty.png')" />
        <div class="full wnd-area">
          <!-- <cqSimplePlayer
            v-if="playerShow"
            ref="monitoringPlayer"
            :screens="videoScreens"
          /> -->
          <Player v-if="dialogFormVisible3" ref="player"></Player>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import CameraApi from '@/api/camera';
import Player from '../player/index.vue';
export default {
  components: {
    Player
  },
  data() {
    return {
      dialogFormVisible3: false,
      indexCode: '',
      monitorArr: [],
      videoScreens: 1,
      playerShow: false,
      monitorData: {}
    };
  },
  methods: {
    // 查询监控点并默认点击第一个
    queryMonitor() {
      if (this.indexCode) {
        // 查询监控点们
        CameraApi.getCameras({ id: this.indexCode }).then(res => {
          if (res.code === '0') {
            this.monitorArr = res.data;
            // 执行第一个默认播放
            if (res.data && res.data.length) {
              this.queryPlayParam(res.data[0].indexCode, 0);
            }
          }
        });
      }
      // CameraApi.videoGetCameraList('').then(res => {
      //   if (res.code === '0') {
      //     this.monitorArr = res.data;
      //     if (res.data && res.data.length) {
      //       this.live(res.data[0].indexCode);
      //     }
      //   }
      // });
    },
    // index查询播放参数
    queryPlayParam(indexCode, index) {
      this.playerShow = true;
      this.monitorArr.map((item, one) => {
        if (one === index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      this.$forceUpdate();
      CameraApi.getPreviewParamHtml5({
        cameraIndexCode: indexCode,
        protocol: window.location.protocol.indexOf('https') > -1 ? 'wss' : 'ws',
        streamType: 1,
        transmode: 1
      }).then(res => {
        if (res.code === '0' && res.data) {
          this.live(res.data.url);
        }
      });
    },

    // 关闭
    closeAll() {
      this.indexCode = '';
      this.playerShow = false;
      this.$emit('closeMonitor');
      // this.$refs.monitoringPlayer.closeAll([]);
      // this.$refs.monitoringPlayer.closeAll();
    },
    live(data) {
      this.$refs.player && this.$refs.player.$play(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  position: relative;
  display: flex;
  height: 662px;
  padding: 0 20px;
  .leftPart {
    width: 240px;
    height: 100%;

    .tool {
      display: flex;
      height: 32px;
      line-height: 32px;
      margin: 0 12px 12px 0;
      .label {
        width: 140px;
      }
    }
    .list {
      padding-top: 12px;
      padding-left: 10px;
      // border-top: 1px solid ;
      .monP {
        position: relative;
        line-height: 28px;
        height: 32px;
        margin-right: 12px;
        cursor: pointer;
        > i {
          font-size: 32px;
          color: #9ee0ff;
          vertical-align: middle;
        }
        > span {
          font-size: 16px;
          color: #9ee0ff;
          display: inline-block;
          vertical-align: middle;
        }
        &:hover {
          background: url('~@/assets/images/databoard/cmmd-列表-悬停.png')
            no-repeat;
          background-size: 100% 100%;
        }
        &:active {
          background: url('~@/assets/images/databoard/cmmd-列表-选中.png')
            no-repeat;
          background-size: 100% 100%;
          color: #ffffff;
        }
      }
      .monPActive {
        background: url('~@/assets/images/databoard/cmmd-列表-选中.png')
          no-repeat;
        background-size: 100% 100%;
        color: #ffffff;
        &:hover {
          background: url('~@/assets/images/databoard/cmmd-列表-选中.png')
            no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .rightPart {
    flex: 1;
    height: 100%;
    .full {
      width: 100%;
      height: 100%;
    }
  }
}
::v-deep .vjs-big-play-button {
  left: 430px !important;
  top: 280px !important;
}
.el-dialog__wrapper {
  z-index: 9999 !important;
  background: rgb(0, 19, 44, 0.7);
}
::v-deep .el-dialog {
  background: url('~@/assets/images/databoard/视频弹窗.png') no-repeat;
  background-size: 100% 100%;
  .el-dialog__header {
    background-color: transparent;
    height: 48px;
    border-bottom: 44px;
    line-height: 48px;
    font-size: 16px;
    color: #ffffff;
    .el-dialog__title {
      line-height: 48px;
      padding-left: 20px;
    }
    .el-dialog__headerbtn {
      width: 56px;
      height: 26px;
      background: url('~@/assets/hackblue/关闭按钮-正常.png') no-repeat;
      background-size: 100% 100%;
      top: 4px;
      right: 8px;
      .h-icon-close:before {
        content: '';
      }
      &:hover {
        width: 56px;
        height: 26px;
        background: url('~@/assets/hackblue/关闭按钮-悬停.png') no-repeat;
        background-size: 100% 100%;
        top: 4px;
        right: 8px;
      }
    }
  }
  .el-dialog__body-wrapper {
    padding: 0;
    height: 100%;
  }
}
</style>
