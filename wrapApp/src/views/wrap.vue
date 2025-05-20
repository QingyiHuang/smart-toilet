<template>
  <div class="wrap">
    <div v-if="!submited" class="page1">
      <!-- 多页面，移动端 -->
      <p class="header">评价</p>
      <p class="toiletName">{{ name }}体验怎么样?</p>
      <div class="rateOuter">
        <!-- <van-rate
          v-model="grade"
          :size="28"
          color="#FFCC5A"
          void-icon="star"
          void-color="#eee"
          allow-half
          :gutter="15"
        /> -->
      </div>
      <div style="margin-bottom: 16px;">
        <van-cell-group title="公厕评价">
          <template #title>
          <div>公厕评价</div>
          </template>

          <van-cell title="卫生间无异味">
            <template #right-icon>
              <van-rate
                v-model="grade1"
                :size="24"
                color="#FFCC5A"
                void-icon="star"
                void-color="#eee"
                allow-half
                :gutter="5"
              />
            </template>
          </van-cell>
          <van-cell title="设备设施完好" >
            <template #right-icon>
              <van-rate
                v-model="grade2"
                :size="24"
                color="#FFCC5A"
                void-icon="star"
                void-color="#eee"
                allow-half
                :gutter="5"
              />
            </template>
          </van-cell>
          <van-cell title="环境整洁干净" >
            <template #right-icon>
              <van-rate
                v-model="grade3"
                :size="24"
                color="#FFCC5A"
                void-icon="star"
                void-color="#eee"
                allow-half
                :gutter="5"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- 点击可以选中的选择列表 -->
      <!-- <div class="selectBox">
        <div
          v-for="(item, index) in selectOptions"
          :key="index"
          :class="{ selectItem: true, selectItemActive: item.active }"
          @click="selectOneOption(index)"
        >
          {{ item.name }}
        </div>
      </div> -->
      <!-- 其他留言部分 -->
      <div class="filedOuter">
        <van-field
          v-model="remark"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="说说其他意见和建议"
        />
      </div>
      <div id="uploader" class="staff-head all-center">
        <van-uploader
          v-model="fileList"
          :before-read="beforeRead"
          :after-read="afterRead"
          :max-count="1"
          :deletable="true"
          :before-delete="beforeDelete"
        ></van-uploader>
      </div>
      <!-- 底部button -->
      <div class="footerButton">
        <van-button
          round
          color="linear-gradient(54deg, #4580FF 0%, #2AA7FF 100%)"
          block
          @click="submit"
        >
          提 交
        </van-button>
      </div>
      <!-- 遮罩层，在提交之后则会进行展示 -->
      <van-overlay :show="show" @click="changeShow">
        <div class="wrapper" @click.stop>
          <div class="img"></div>
          <p class="p1">评价成功</p>
          <p class="p2">您的评价会帮助我们做得更好</p>
        </div>
      </van-overlay>
    </div>
    <div v-else class="page2">
      感谢您的评价
    </div>
  </div>
</template>

<script>
import CompressFunc from './compressImage';
import axios from 'axios'
export default {
  data() {
    return {
      fileList: [],
      faceUrl: '',
      base64: '',
      submited: false,
      show: false,
      selectOptions: [
        { name: '灯具、蹲/坐便器、小便器、水龙头无法正常使用', code: '00001' },
        { name: '清洁服务人员态度恶劣', code: '00002' },
        { name: '地面湿滑、积水', code: '00005' },
        { name: '地面、台面、蹲位脏污等清洁问题、异味大', code: '00003' },
        { name: '无法找到卫生间、导识指引错误', code: '00004' }
      ],
      evaluateItemCodes: '',
      evaluateItemNames: '',
      grade: 0,
      remark: '',
      toiletId: '',
      name: '当前公厕',
      grade1: 0,
      grade2: 0,
      grade3: 0
    };
  },
  created() {
    // 接口排版问题，若需改成线上获取选择项请放开
    // axios({
    //     url: `/ptsa/web/toilet/getEvaluateItems.do`,
    //     method: 'get',
    //     headers: {'Content-Type': 'application/json;charset=UTF-8'},
    // }).then(res => {
    //     this.selectOptions = res.data.data;
    // })
    // WrapApi.getEvaluateItems().then(res => {
    //   this.selectOptions = res.data;
    // });
    const searchParams = new URL(location.href).searchParams;
    this.toiletId = searchParams.get('toiletid') || '';
    this.name = searchParams.get('name') || '当前公厕';
  },
  methods: {
    beforeRead(file) {
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/bmp' ||
        file.type === 'image/pjpeg' ||
        file.type === 'image/jpg'
      ) {
        return true;
      }
      this.$toast.fail('请上传图片格式文件');
      return false;
    },
    afterRead(file) {
      CompressFunc(file.file).then(res => {
        // this.blobToDataURL(res);压缩图片
        // console.log(res);
        if (res) {
          this.base64 = res;
        }
      });
    },
    // 清空图片
    clearFace() {
      this.faceUrl = '';
      this.fileList = [];
    },
    selectOneOption(index) {
      this.selectOptions.map((item, key) => {
        if (key === index) {
          if (item.active) {
            item.active = false;
          } else {
            item.active = true;
          }
        }
      });
      this.$forceUpdate();
    },
    // 提交
    async submit() {
      if (this.grade1 && this.grade2 && this.grade3) {
        // 获取code 和 name
        const codes = [];
        const names = [];
        this.selectOptions.map(item => {
          if (item.active) {
            codes.push(item.code);
            names.push(item.name);
          }
        });
        const param = {
          evaluateItemCodes: '',
          evaluateItemNames: '',
          grade: this.grade,
          gradeDetail: JSON.stringify({
            grade1: this.grade1,
            grade2: this.grade2,
            grade3: this.grade3}
          ),
          remark: this.remark,
          toiletId: this.toiletId,
          pictureData: this.base64,

        };
        this.$toast.loading({
          message: '请稍后...',
          forbidClick: true
        });
        // WrapApi.evaluate(param)
        //   .then(res => {
        //     this.$toast.clear();
        //     if (res.code === '0') {
        //       this.show = true;
        //     }
        //   })
        //   .catch(() => {
        //     this.$toast.clear();
        //     this.$toast.fail('提交失败请重试');
        //   });
                    axios({
                        url: `/ptsa/web/toilet/evaluate.do`,
                        method: 'post',
                        headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        data:param, 
                    }).then(res => {
                        this.$toast.clear();
                        if (res.data.code === '0') {
                          this.show = true;
                        }
                    }).catch(() => {
                      this.$toast.clear();
                      this.$toast.fail('提交失败请重试');
                    })
      } else {
        this.$toast.fail('请先给公厕体验评分');
      }
    },
    // 在进行删除的时候
    beforeDelete() {
      this.base64 = '';
      return true;
    },
    changeShow() {
      this.show = false;
      this.submited = true;
    }
    // 图片转base64
    // blobToDataURL(file, cb) {
    //   const _this = this;
    //   const reader = new FileReader();
    //   reader.onload = function(evt) {
    //     _this.base64 = evt.target.result;
    //     console.log(this.base64);
    //   };
    //   reader.readAsDataURL(file);
    // }
  }
};
</script>

<style lang="scss" scoped>
// * {
//   margin: 0;
//   padding: 0;
// }
.wrap {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  background: url('~@/assets/wrap/wrapback.png') no-repeat;
  background-size: 100% 100%;
}
.page1 {
  padding: 20px 32px;
}
.page2 {
  text-align: center;
  line-height: 220px;
  color: green;
  font-size: 28px;
}
.header {
  text-align: center;
  margin-bottom: 20px;
}
.toiletName {
  text-align: center;
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 24px;
}
.rateOuter {
  text-align: center;
  margin-bottom: 20px;
}
.selectBox {
  text-align: center;
  margin-bottom: 10px;
  .selectItem {
    padding: 3px 8px;
    border-radius: 25px;
    background-color: rgb(228, 233, 235);
    font-size: 12px;
    display: inline-block;
    margin-bottom: 10px;
    color: rgb(67, 69, 70);
    border: 1px solid rgba(33, 149, 243, 0);
    & + .selectItem {
      margin-left: 10px;
    }
  }
  .selectItemActive {
    background: rgba(33, 150, 243, 0.12);
    border: 1px solid rgba(33, 150, 243, 1);
    color: #2196f3;
  }
}
.van-field {
  border: 1px solid rgb(240, 240, 240);
}
.filedOuter {
  // padding: 0 px;
  margin-bottom: 10px;
}
.van-uploader {
  margin-bottom: 10px;
}
.wrapper {
  width: 200px;
  height: 156px;
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -78px;
  text-align: center;
  .img {
    display: inline-block;
    background: url('~@/assets/wrap/icon-成功.png');
    background-size: 100% 100%;
    width: 48px;
    height: 48px;
    margin-top: 16px;
    margin-bottom: -18px;
  }
  .p1 {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #000000;
    font-weight: 400;
    margin-bottom: 6px;
  }
  .p2 {
    opacity: 0.4;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #000000;
    font-weight: 420;
  }
}
::v-deep .van-cell-group {
  background-color: transparent;
  .van-cell{
    background-color: transparent;
    padding: 6px 16px;
  }
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
  border-width: 0px;
}
.van-cell::after{
  display: none;
}
</style>
