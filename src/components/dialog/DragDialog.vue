<template>
  <el-dialog
    ref="draglog"
    v-loading.fullscreen.lock="diyLoading"
    :area="[1600, 706]"
    top="middle"
    no-scrollbar
    title="坑位配置"
    :visible.sync="dialogFormVisible"
    class="mydialog"
    @opened="opened"
    @close="closeAll"
  >
    <div class="dragOuter">
      <div class="dragarea">
        <img :src="backgroundImg" class="dragImg" alt="" @dragstart.prevent />
        <MaleMarker
          v-for="item in maleOptions"
          :ref="item.id"
          :key="item.id"
          :mdata="item"
          :pleft="
            item.position !== '' ? Number(item.position.split(',')[0]) : 423
          "
          :ptop="
            item.position !== '' ? Number(item.position.split(',')[1]) : 248
          "
          :pwidth="
            item.position !== '' ? Number(item.position.split(',')[2]) : 40
          "
          :pheight="
            item.position !== '' ? Number(item.position.split(',')[3]) : 40
          "
          @deleteMale="deleteMale"
        />
        <FemaleMarker
          v-for="item in femaleOptions"
          :ref="item.id"
          :key="item.id"
          :mdata="item"
          :pleft="
            item.position !== '' ? Number(item.position.split(',')[0]) : 423
          "
          :ptop="
            item.position !== '' ? Number(item.position.split(',')[1]) : 248
          "
          :pwidth="
            item.position !== '' ? Number(item.position.split(',')[2]) : 40
          "
          :pheight="
            item.position !== '' ? Number(item.position.split(',')[3]) : 40
          "
          @deleteFemale="deletefeMale"
        />
        <ThirdMarker
          v-for="item in thirdOptions"
          :ref="item.id"
          :key="item.id"
          :mdata="item"
          :pleft="
            item.position !== '' ? Number(item.position.split(',')[0]) : 423
          "
          :ptop="
            item.position !== '' ? Number(item.position.split(',')[1]) : 248
          "
          :pwidth="
            item.position !== '' ? Number(item.position.split(',')[2]) : 40
          "
          :pheight="
            item.position !== '' ? Number(item.position.split(',')[3]) : 40
          "
          @deleteFemale="deletefeMale"
        />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-if="maleOptions.length > 30 || femaleOptions.length > 30"
        type="primary"
        @click="addMaleMark"
      >
        添加男厕坑位
      </el-button>
      <el-button
        v-if="maleOptions.length > 30 || femaleOptions.length > 30"
        type="primary"
        @click="addFemaleMark"
      >
        添加女厕坑位
      </el-button>
      <el-button type="primary" @click="confirmPoint">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
    <!-- 选择坑位dialog -->
    <el-dialog
      :area="[400, 200]"
      title="选择坑位"
      top="middle"
      :visible.sync="innerVisible"
      append-to-body
      class="diyDialog"
    >
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in maleOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          :disabled="item.disabled || Boolean(item.position)"
        ></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="startDrawMale">确定</el-button>
      </div>
    </el-dialog>
    <!-- 选择坑位dialog -->
    <el-dialog
      :area="[400, 200]"
      title="选择坑位"
      top="middle"
      :visible.sync="innerVisible2"
      append-to-body
      class="diyDialog"
    >
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in femaleOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          :disabled="item.disabled || Boolean(item.position)"
        ></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="startDrawFeMale">确定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import MaleMarker from './MaleMarker.vue';
import FemaleMarker from './FemaleMarker.vue';
import ThirdMarker from './ThirdMarker.vue';
import DeviceApi from '@/api/device';
export default {
  components: {
    MaleMarker,
    FemaleMarker,
    ThirdMarker
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      innerVisible2: false,
      maleMarkerArr: [],
      femaleMarkerArr: [],
      maleOptions: [],
      femaleOptions: [],
      thirdOptions: [],
      value: '',
      diyLoading: false,
      backgroundImg: ''
    };
  },
  methods: {
    setBackGround(val) {
      this.backgroundImg = val;
    },
    opened() {
      // 查询男厕所的指示牌并分别放入数组中以便进行操作
      DeviceApi.getIndicators({ toiletType: 'MALE', toiletId: this.id }).then(
        res => {
          if (res.code === '0') {
            // 如果有position不为空的，先行画上
            let left = -340;
            let top = 20;
            (res.data || []).map(item => {
              if (!(item.position !== 'null' && Boolean(item.position))) {
                item.position = `${left},${top},40,40,male`;
                if (left >= -50) {
                  left = -340;
                  top += 60;
                } else {
                  left += 50;
                }
              }
            });

            this.maleOptions = res.data;
          }
        }
      );
      // 查询女厕所的指示牌并分别放入数组中以便进行操作
      DeviceApi.getIndicators({ toiletType: 'FEMALE', toiletId: this.id }).then(
        res => {
          if (res.code === '0') {
            let left = 1170;
            let top = 20;
            (res.data || []).map(item => {
              if (!(item.position !== 'null' && Boolean(item.position))) {
                item.position = `${left},${top},40,40,male`;
                if (left <= 880) {
                  left = 1170;
                  top += 60;
                } else {
                  left -= 50;
                }
              }
            });
            this.femaleOptions = res.data;
          }
        }
      );
      // 查询第三厕厕位指示牌并分别放入数组中以便进行操作
      DeviceApi.getIndicators({ toiletType: 'THIRD', toiletId: this.id }).then(
        res => {
          if (res.code === '0') {
            let left = 0;
            let top = 520;
            (res.data || []).map(item => {
              if (!(item.position !== 'null' && Boolean(item.position))) {
                item.position = `${left},${top},40,40,third`;
                if (left >= 800) {
                  left = 0;
                  top += 52;
                } else {
                  left += 50;
                }
              }
            });
            this.thirdOptions = res.data;
          }
        }
      );
    },
    closeAll() {
      // 移除重置参数
      this.dialogFormVisible = false;
      this.innerVisible = false;
      this.innerVisible2 = false;
      this.maleMarkerArr = [];
      this.femaleMarkerArr = [];
      this.maleOptions = [];
      this.femaleOptions = [];
      this.value = '';
      this.diyLoading = false;
    },
    addMaleMark() {
      // 弹出dialog()
      this.innerVisible = true;
      // 在图片中心生成一个marker，可以进行拖拽
    },
    addFemaleMark() {
      this.innerVisible2 = true;
    },
    // 删除一个maleMarker
    deleteMale(id) {
      this.maleMarkerArr = this.maleOptions.filter(item => {
        return item.id !== id;
      });
      this.maleOptions.map(item => {
        if (item.id === id) {
          item.disabled = false;
          item.position = '';
        }
      });
    },
    // 删除一个女厕
    deletefeMale(id) {
      this.femaleMarkerArr = this.femaleOptions.filter(item => {
        return item.id !== id;
      });
      this.femaleOptions.map(item => {
        if (item.id === id) {
          item.disabled = false;
          item.position = '';
        }
      });
    },
    circleClick(item, type) {
      // 如果没有占用则可以进行绘制，
      if (!(item.disabled || Boolean(item.position))) {
        if (type === 1) {
          this.value = item.id;
          this.startDrawMale();
        } else if (type === 2) {
          this.value = item.id;
          this.startDrawFeMale();
        }
      }
    },
    startDrawMale() {
      if (this.value) {
        const backArea = document.getElementsByClassName('dragarea')[0];
        // 在男列表中找到name
        let name = '';
        this.maleOptions.map(item => {
          if (item.id === this.value) {
            name = item.name;
          }
        });
        if (backArea) {
          this.maleMarkerArr.push({
            id: this.value,
            position: '',
            name: name
          });
          this.maleOptions.map(item => {
            if (item.id === this.value) {
              item.disabled = true;
            }
          });
          this.$forceUpdate();
          this.value = '';
          this.innerVisible = false;
        }
      } else {
        this.innerVisible = false;
      }
    },
    startDrawFeMale() {
      if (this.value) {
        const backArea = document.getElementsByClassName('dragarea')[0];
        if (backArea) {
          let name = '';
          this.femaleOptions.map(item => {
            if (item.id === this.value) {
              name = item.name;
            }
          });
          this.femaleMarkerArr.push({
            id: this.value,
            position: '',
            name: name
          });
          this.femaleOptions.map(item => {
            if (item.id === this.value) {
              item.disabled = true;
            }
          });
          this.$forceUpdate();
          this.value = '';
          this.innerVisible2 = false;
        }
      } else {
        this.innerVisible2 = false;
      }
    },
    async confirmPoint() {
      const arr1 = [];
      const arr2 = [];
      const arr3 = [];
      this.maleOptions.map(item => {
        arr1.push({
          id: item.id,
          position: this.$refs[item.id][0].getPosition() + ',male'
        });
      });
      this.femaleOptions.map(item => {
        arr2.push({
          id: item.id,
          position: this.$refs[item.id][0].getPosition() + ',female'
        });
      });
      this.thirdOptions.map(item => {
        arr3.push({
          id: item.id,
          position: this.$refs[item.id][0].getPosition() + ',third'
        });
      });
      await DeviceApi.updateIndicatorPosition({
        positions: arr1.concat(arr2).concat(arr3)
      })
        .then(res => {
          this.diyLoading = false;
          if (res.code === '0') {
            this.$message.success('保存成功');
            this.dialogFormVisible = false;
          }
        })
        .catch(() => {
          this.diyLoading = false;
        });
    },
    // 设置dialog高度值为518px.
    setDialogBody() {
      const domroot = document.getElementsByClassName('mydialog')[0];
      const domson = domroot.getElementsByClassName('el-dialog__body')[0];
      domson.style.height = 514 + 'px';
    }
  }
};
</script>

<style lang="scss" scoped>
.dragOuter {
  height: 600px;
  background-color: rgb(6, 21, 44);
}
.dragarea {
  width: 856px;
  height: 496px;
  position: relative;
  user-select: none;
  background-color: rgb(6, 21, 44);
  margin: 0 auto;
  .dragImg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 496px;
  }
}
.manandfemalebox {
  overflow: hidden;
  position: relative;
  padding-top: 2px;
  .manlist,
  .nvlist {
    width: 50%;
    float: left;
    .onePeopleBox {
      width: 51px;
      height: 58px;
      float: left;
      margin-right: 2px;
      margin-bottom: 2px;
      border: 1px solid rgb(202, 202, 202);
      position: relative;
      border-radius: 2px;
      p {
        text-align: center;
        line-height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        font-size: 12px;
        width: 100%;
      }
      .maleMarkerPoint {
        width: 24px;
        height: 24px;
        background-color: rgba(0, 128, 0, 0.849);
        border-radius: 50%;
        position: absolute;
        left: 50%;
        margin-left: -12px;
        bottom: 6px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        cursor: pointer;
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
            rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
            rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
          background-color: rgba(12, 145, 12, 0.678);
        }
        &:active {
          background-color: rgba(0, 128, 0, 0.849);
        }
      }
      .maleMarkerPointSeted {
        background-color: rgb(175, 175, 175);
        cursor: default;
        &:hover {
          background-color: rgb(175, 175, 175);
        }
        &:active {
          background-color: rgb(175, 175, 175);
        }
      }
    }
  }
  .nvlist {
    padding-left: 7px;
  }
  .malelist {
    width: 50%;
    float: left;
  }
}
</style>
