<template>
  <div
    ref="male"
    :style="{
      left: `${pleft}px`,
      top: `${ptop}px`,
      width: `${pwidth}px`,
      height: `${pheight}px`
    }"
    class="maleMarker"
    @dblclick="showDelete"
  >
    <!-- 双击展示弹框，可以删除，也可以查看详情可以关闭 -->
    <!-- <div v-show="showBox" class="box">
      <el-button type="link" @click="deleteOne">删除</el-button>
    </div> -->
    <p class="iconP" :title="mdata.name">{{ mdata.name }}</p>
  </div>
</template>

<script>
export default {
  directives: {
    drag: {
      // 指令的定义
      bind: function (el) {
        const odiv = el; // 获取当前元素
        el.onmousedown = e => {
          // 算出鼠标相对元素的位置
          const disX = e.clientX - odiv.offsetLeft;
          const disY = e.clientY - odiv.offsetTop;
          let left = '';
          let top = '';
          document.onmousemove = e => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            left = e.clientX - disX;
            top = e.clientY - disY;
            var docWidth = el.parentNode.clientWidth; // 网页可见宽
            var docHeight = el.parentNode.clientHeight; // 网页可见高
            if (top >= docHeight - 40) {
              // 超下边界
              top = docHeight - 40;
            }
            if (top <= 0) {
              // 超上边界
              top = 0;
            }
            if (left > docWidth + 340) {
              // 超右边界
              left = docWidth + 340;
            }
            if (left <= 0) {
              // 超左边界
              left = 0;
            }
            // 绑定元素位置到positionX和positionY上面
            // 移动当前元素
            odiv.style.left = left + 'px';
            odiv.style.top = top + 'px';
          };
          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  props: {
    pleft: {
      type: Number,
      default: 423
    },
    ptop: {
      type: Number,
      default: 248
    },
    pwidth: {
      type: Number,
      default: 40
    },
    pheight: {
      type: Number,
      default: 40
    },
    mdata: {
      type: Object,
      default: () => {
        return {
          id: '坑位id',
          name: ''
        };
      }
    }
  },
  data() {
    return {
      left: 0,
      top: 0,
      showBox: false,
      resizeable: false, // 开启尺寸修改
      clientX: '', // 鼠标按下时候的坐标x
      clientY: '', // 鼠标按下时的坐标Y
      minW: 18, // div可修改最小宽
      minH: 24, // div可修改最小高
      direc: '' // 鼠标按下时的位置，东南西北 wsen
    };
  },
  mounted() {
    this.registerDiv();
  },
  methods: {
    showDelete() {
      this.showBox = !this.showBox;
    },
    deleteOne() {
      this.$emit('deleteFemale', this.mdata.id);
    },
    getPosition() {
      return `${this.$refs.male.offsetLeft},${this.$refs.male.offsetTop},${this.$refs.male.offsetWidth},${this.$refs.male.offsetHeight}`;
    },
    // 获取需要调整尺寸的div，并注册拖拉事件
    registerDiv() {
      const box = document.querySelector('.dragOuter');
      const c = this.$refs.male;
      box.addEventListener('mousemove', this.move);
      // 给当前div注册鼠标按下事件
      c.addEventListener('mousedown', this.downFunc);
      // 给当前div注册鼠标松开事件
      box.addEventListener('mouseup', this.upFunc);
    },
    // 鼠标移动事件
    move(e) {
      const d = this.getDirection(e);
      const c = this.$refs.male;
      let cursor = '';
      if (d === '') cursor = 'default';
      else cursor = d + '-resize';
      // 修改鼠标显示效果
      c.style.cursor = cursor;
      // 当开启尺寸修改时，鼠标移动会修改div尺寸
      if (this.resizeable) {
        // 鼠标按下的位置在右边，修改宽度
        if (this.direc.indexOf('e') !== -1) {
          c.style.width =
            Math.max(this.minW, c.offsetWidth + (e.clientX - this.clientX)) +
            'px';
          this.clientX = e.clientX;
        }

        // 鼠标按下的位置在上部，修改高度
        if (this.direc.indexOf('n') !== -1) {
          c.style.height =
            Math.max(this.minH, c.offsetHeight + (this.clientY - e.clientY)) +
            'px';
          this.clientY = e.clientY;
        }
        // 鼠标按下的位置在底部，修改高度
        if (this.direc.indexOf('s') !== -1) {
          c.style.height =
            Math.max(this.minH, c.offsetHeight + (e.clientY - this.clientY)) +
            'px';
          this.clientY = e.clientY;
        }

        // 鼠标按下的位置在左边，修改宽度
        if (this.direc.indexOf('w') !== -1) {
          c.style.width =
            Math.max(this.minW, c.offsetWidth + (this.clientX - e.clientX)) +
            'px';
          this.clientX = e.clientX;
        }
      }
    },
    // 鼠标按下事件
    downFunc(e) {
      const d = this.getDirection(e);
      // 当位置为四个边和四个角时才开启尺寸修改
      if (d !== '') {
        this.resizeable = true;
        this.direc = d;
        this.clientX = e.clientX;
        this.clientY = e.clientY;
        this.dragFunc(this.$refs.male);
      } else {
        // console.log(this.resizeable);
        // this.dragFunc(this.$refs.male);
      }
    },
    // 鼠标放松
    upFunc() {
      this.resizeable = false;
      this.dragFunc2(this.$refs.male);
    },
    // 获取鼠标所在div的位置
    getDirection(ev) {
      const offset = 10;
      let dir = '';
      const c = this.$refs.male;
      const xP = ev.offsetX;
      const yP = ev.offsetY;
      if (yP < offset) dir += 'n';
      else if (yP > c.offsetHeight - offset) dir += 's';
      if (xP < offset) dir += 'w';
      else if (xP > c.offsetWidth - offset) dir += 'e';
      return dir;
    },
    // 拖拽事件
    dragFunc(el) {
      if (!this.resizeable) {
        const odiv = el; // 获取当前元素
        el.onmousedown = e => {
          // 算出鼠标相对元素的位置
          const disX = e.clientX - odiv.offsetLeft;
          const disY = e.clientY - odiv.offsetTop;
          let left = '';
          let top = '';

          // 鼠标在不在边框上则触发移动
          document.onmousemove = e => {
            // 如果e在边框上则不触发移动
            // 用鼠标的位置减去鼠console.log标相对元素的位置，得到元素的位置
            left = e.clientX - disX;
            top = e.clientY - disY;
            var docWidth = el.parentNode.clientWidth; // 网页可见宽
            var docHeight = el.parentNode.clientHeight; // 网页可见高
            if (top >= docHeight - 40) {
              // 超下边界
              top = docHeight - 40;
            }
            if (top <= 0) {
              // 超上边界
              top = 0;
            }
            if (left > docWidth + 340) {
              // 超右边界
              left = docWidth + 340;
            }
            if (left <= 0) {
              // 超左边界
              left = 0;
            }
            // 绑定元素位置到positionX和positionY上面
            // 移动当前元素
            odiv.style.left = left + 'px';
            odiv.style.top = top + 'px';
          };
          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      } else {
        el.onmousedown = null;
      }
    },
    dragFunc2(el) {
      const odiv = el; // 获取当前元素
      el.onmousedown = e => {
        // 算出鼠标相对元素的位置
        const disX = e.clientX - odiv.offsetLeft;
        const disY = e.clientY - odiv.offsetTop;
        let left = '';
        let top = '';

        // 鼠标在不在边框上则触发移动
        document.onmousemove = e => {
          // 如果e在边框上则不触发移动
          // 用鼠标的位置减去鼠console.log标相对元素的位置，得到元素的位置
          left = e.clientX - disX;
          top = e.clientY - disY;
          var docWidth = el.parentNode.clientWidth; // 网页可见宽
          var docHeight = el.parentNode.clientHeight; // 网页可见高
          if (top >= docHeight - 40) {
            // 超下边界
            top = docHeight - 40;
          }
          if (top <= 0) {
            // 超上边界
            top = 0;
          }
          if (left > docWidth + 340) {
            // 超右边界
            left = docWidth + 340;
          }
          if (left <= 0) {
            // 超左边界
            left = 0;
          }
          // 绑定元素位置到positionX和positionY上面
          // 移动当前元素
          odiv.style.left = left + 'px';
          odiv.style.top = top + 'px';
        };
        document.onmouseup = e => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.maleMarker {
  width: 40px;
  height: 40px;
  position: absolute;
  background-color: rgba(228, 124, 188, 0.4);
  border: 1px solid rgb(250, 169, 103);
  &::before {
    content: '';
    width: 9.6px;
    height: 24px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -4.8px;
    margin-top: -12px;
    background: url('~@/assets/guide/女厕-空闲.png') no-repeat;
    background-size: 100% 100%;
  }
  cursor: pointer;
  .iconP {
    position: absolute;
    top: -18px;
    width: 60px;
    left: -24px;
    color: #9ee0ff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 12px;
  }
  .box {
    width: 80px;
    // height: 40px;
    background: url('~@/assets/images/databoard/女厕.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: -30px;
    bottom: -40px;
    // line-height: 10px;
    padding: 4px;
    text-align: center;
    p {
      color: #ffffff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
