<template>
  <div>
    <div v-if="base64" class="full hui-upload-img">
      <i class="h-icon-delete" @click="removeImg"></i>
      <!-- <img class="full" :src="base64" @click="preview" /> -->
      <viewer class="full" :images="[base64]">
        <div class="full">
          <img class="full" :src="base64" />
        </div>
      </viewer>
    </div>
    <el-upload
      ref="huiUpload"
      class="upload-image"
      :auto-upload="false"
      list-type="picture-card"
      single-file
      accept="image/jpg,image/jpeg,image/JPEG,image/png"
      :file-list="fileLists"
      :on-remove="uploadOnRemove"
      :on-change="uploadOnChange"
      :before-upload="beforeUploadFile"
      action=""
    >
      <i class="h-icon-add" style="margin-top: 32px"></i>
    </el-upload>
    <p style="color: gray; font-size: 12px">支持上传png/jpg格式图片</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileLists: [],
      base64: ''
    };
  },
  methods: {
    beforeUploadFile(file) {
      // 验证图片格式
      if (/\.(png|jpg|jpeg)$/i.test(file.name)) {
        return true;
      } else {
        this.$message.error('文件格式错误');
        return false;
      }
    },
    removeImg() {
      this.base64 = '';
    },
    uploadOnChange(file, fileLists) {
      if (/\.(png|jpg|jpeg)$/i.test(file.name)) {
        this.fileLists = fileLists;
        if (this.fileLists.length) {
          // 将图片转为base64
          this.blobToDataURL(file.raw);
        }
      } else {
        this.$message.error('文件格式错误');
        this.fileLists = [];
      }
    },
    uploadOnRemove(file, fileLists) {
      this.fileLists = fileLists;
    },
    // 图片转base64
    blobToDataURL(blob, cb) {
      const _this = this;
      const reader = new FileReader();
      reader.onload = function (evt) {
        _this.base64 = evt.target.result;
      };
      reader.readAsDataURL(blob);
    }
  }
};
</script>

<style lang="scss" scoped>
.hui-upload-img {
  position: absolute;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1;
  i {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 24px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
    cursor: pointer;
    &:hover {
      color: #fa3239;
    }
  }
}
.full {
  height: 102px;
  width: 102px;
}
</style>
