<template>
  <el-upload
    ref="huiUpload"
    :action="url"
    :headers="headers"
    :data="params"
    :before-upload="beforeUploadFile"
    :on-error="uploadError"
    :on-success="uploadSuccess"
    :on-change="uploadChange"
    :on-remove="uploadRemove"
    :auto-upload="false"
    list-type="picture-card"
    :file-list="fileLists"
    accept="image/jpg,image/jpeg,image/png,video/mp4"
    multiple
    :limit="fileNum"
    :single-file="fileNum === 1"
  >
    <i class="h-icon-add" style="margin-top: 32px"></i>
    <div class="upload-img-text" style="position: relative; top: -12px">
      选择
    </div>
  </el-upload>
</template>

<script>
// application/vnd.ms-excel
import { getToken } from '@/utils/common';
export default {
  name: 'HuiUploadFile',
  props: {
    fileNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      params: {},
      headers: {
        'X-CSRF-TOKEN': getToken()
      },
      fileLists: []
    };
  },
  computed: {
    url() {
      return '/ptsa/web/material/upload/single.do';
    }
  },
  methods: {
    uploadChange(file, fileLists) {
      if (file.status === 'ready') {
        this.params = { name: file.name };
        this.$forceUpdate();
        this.$emit('fileReady', file.raw);
      }
    },
    uploadRemove() {
      this.$emit('fileReady', '');
      // console.log(file, this.fileLists);
    },
    submit(param) {
      // 附带参数，手动上传文件
      Object.assign(this.params, param);
      this.$refs.huiUpload.submit();
    },
    setParamAndSubmit(param) {
      this.params = param;
      this.$forceUpdate();
      setTimeout(() => {
        this.$refs.huiUpload.submit();
      }, 100);
    },
    beforeUploadFile(file) {
      const right = /\.(png|jpg|jpeg|mp4)$/i.test(file.name);
      // 格式
      if (!right) {
        this.$message.error('文件格式错误,仅支持上传png/jog/jpeg/mp4格式文件');
      }
      if (right) {
        this.$emit('startUpload');
      }
      return right;
    },
    uploadSuccess(res) {
      const { code } = res;
      if (code === '0') {
        this.$emit('upload-success', res.data);
      } else {
        this.clearFiles();
        this.$emit('upload-complete');
      }
    },
    uploadError() {
      this.clearFiles();
      this.$message.error(this.$t('error500'));
      this.$emit('upload-complete');
    },
    clearFiles() {
      this.$refs.huiUpload.clearFiles();
    }
  }
};
</script>
<style lang="scss">
.el-upload-list__item-content {
  background: url('~@/assets/images/videodefault.png') no-repeat;
  background-size: 100% 100%;
}
</style>
