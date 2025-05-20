<template>
  <h-page-container v-loading.fullscreen.lock="diyLoading">
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" return-icon />
    <ScrollbarWrapper class="diyWrapper">
      <h-page-content style="padding: 0">
        <div class="add-Config">
          <el-form
            ref="baseForm"
            label-position="top"
            :model="baseForm"
            content-width="480px"
            :rules="rules"
          >
            <h-page-group title="素材轮播">
              <el-form-item label="素材" prop="pictureData">
                <!-- <ImgUpload ref="imgUploader" /> -->
                <FileUploader ref="fileUploader" />
              </el-form-item>
            </h-page-group>
            <h-page-group title="提示语">
              <el-form-item label="提示信息" required prop="textarea">
                <!-- <el-input
                  v-model="baseForm.name"
                  placeholder=""
                  :maxlength="32"
                ></el-input> -->
                <el-input
                  v-model="baseForm.textarea"
                  type="textarea"
                  :rows="4"
                  :count="128"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitHandle">保存</el-button>
                <el-button @click="back">取消</el-button>
              </el-form-item>
            </h-page-group>
          </el-form>
        </div>
        <!-- </anchor-scroll> -->
      </h-page-content>
    </ScrollbarWrapper>
    <!-- <h-page-footer inner-width="500px">
      <el-button type="primary" @click="submitHandle">
        保存
      </el-button>
      <el-button @click="back">取消</el-button>
    </h-page-footer> -->
  </h-page-container>
</template>

<script>
// import ImgUpload from '../components/ImgUpload.vue';
import FileUploader from '@/components/common/UploaderMulti.vue';
import Api from '@/api/index';
import ScrollbarWrapper from '@/components/common/ScrollBarWrapper.vue';
import MaterialApi from '@/api/material';
const requireRule = (message, type) => {
  const rule = {
    required: true,
    message,
    trigger: 'change,blur'
  };
  if (type) {
    rule.type = type;
  }
  return rule;
};
export default {
  components: {
    // ImgUpload,
    FileUploader,
    ScrollbarWrapper
  },
  data() {
    return {
      breadcrumb: [
        '系统管理',
        '应用配置中心',
        '智慧公厕监管应用',
        '物联设备管理',
        '配置信息屏'
      ],
      baseForm: {
        textarea: '文明如厕，请爱护公共卫生'
      },
      rules: {
        textarea: [requireRule('请输入提示信息')]
      },
      diyLoading: false,
      deviceId: ''
    };
  },
  created() {
    // 初始化获取config
    this.getInitConfig();
  },
  mounted() {},
  methods: {
    getInitConfig() {
      MaterialApi.screenConfigGet({
        id: this.$route.query.id
      }).then(res => {
        if (res.code === '0') {
          // tips
          if (res.data.tips) {
            this.baseForm.textarea = res.data.tips;
          } else {
            this.baseForm.textarea = '文明如厕，请爱护公共卫生';
          }
          if (res.data.materials && res.data.materials.length) {
            const thumbnailArr = [];
            res.data.materials.map(item => {
              thumbnailArr.push(item.thumbnail);
            });
            // 素材赋值
            if (this.$refs.fileUploader) {
              this.$refs.fileUploader.setDefaultValue(
                thumbnailArr,
                thumbnailArr,
                res.data.materials
              );
            }
          }
          this.deviceId = res.data.deviceId;
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    getImg(val) {
      if (val) {
        return process.env.NODE_ENV === 'production'
          ? val
          : `https://test:443${val}`;
      } else {
        return '';
      }
    },
    submitHandle() {
      // 提交关联，视频和图片不是必传懂吗
      // 提交的时候先执行关联,然后执行文字更改
      // let marterIds = [];
      // marterIds = this.$refs.fileUploader.getMaterial();
      // const params = {
      //   materialId: '',
      //   materialIds: marterIds,
      //   toiletId: this.$route.query.id,
      //   toiletIds: []
      // };
      // // 执行关联操作
      // MaterialApi.linkMaterial(params).then(res => {
      //   if (res.code === '0') {
      //     this.$message.success('素材设置成功');
      //     // this.$router.go(-1);
      //     // 执行关联所有信息
      //     this.connectAllInfo()
      //   }
      // });
      this.connectAllInfo();
    },
    // connectAllInfo
    connectAllInfo() {
      let marterIds = [];
      marterIds = this.$refs.fileUploader.getMaterial();
      this.diyLoading = true;
      MaterialApi.screenConfigSave({
        deviceId: this.deviceId,
        materialIds: marterIds,
        tips: this.baseForm.textarea,
        toiletId: this.$route.query.id
      })
        .then(res => {
          this.diyLoading = false;
          if (res.code === '0') {
            this.$message.success('素材设置成功');
            this.$router.go(-1);
          }
        })
        .catch(() => {
          this.diyLoading = false;
        });
    },
    posChange(longitude, latitude) {
      this.baseForm.latitude = parseFloat(latitude);
      this.baseForm.longitude = parseFloat(longitude);
      this.$refs.baseForm.validateField('longitude');
    },
    orgInput(val, val2, path) {
      this.baseForm.orgName = val2;
      this.baseForm.path = path;
      this.$refs.baseForm.validateField('orgCode');
    }
  }
};
</script>

<style lang="scss" scoped>
.add-Config {
  position: relative;
  width: 500px;
  margin: auto;
  padding: 40px 0 56px;
}
.diyWrapper {
  height: calc(100% - 112px);
}
::v-deep .h-page-group__title {
  font-family: MicrosoftYaHeiUI-Bold;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 700;
}
</style>
