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
            <el-form-item label="素材" prop="file">
              <!-- 此处素材不能自动上传 -->
              <FileUploader
                ref="fileUploader"
                :file-num="1"
                @fileReady="fileReady"
              />
            </el-form-item>

            <el-form-item label="素材名称" prop="name">
              <el-input v-model="baseForm.name" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitHandle">保存</el-button>
              <el-button @click="back">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- </anchor-scroll> -->
      </h-page-content>
    </ScrollbarWrapper>
  </h-page-container>
</template>

<script>
// import ImgUpload from '../components/ImgUpload.vue';
import FileUploader from '@/components/common/Uploader.vue';
import ScrollbarWrapper from '@/components/common/ScrollBarWrapper.vue';
import MaterialApi from '@/api/material.js';
const requireRule = (message, type) => {
  const rule = {
    required: true,
    type: 'object',
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
        '素材管理',
        '添加素材'
      ],
      baseForm: {
        name: '',
        file: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        file: [requireRule('请上传素材')]
      },
      diyLoading: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    submitHandle() {
      this.$refs.baseForm.validate(async valid => {
        if (valid) {
          // 校验通过后进行提交
          try {
            this.diyLoading = true;
            await MaterialApi.uploadSingle(this.baseForm);
            this.uploadSuccess();
          } finally {
            this.diyLoading = false;
          }
        }
      });
    },
    startUpload() {
      this.diyLoading = true;
    },
    fileReady(file) {
      this.baseForm.file = file;
    },
    uploadSuccess() {
      this.diyLoading = false;
      this.$message.success('上传成功');
      this.$router.go(-1);
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
