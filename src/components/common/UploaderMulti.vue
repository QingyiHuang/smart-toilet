<template>
  <div v-loading.fullscreen.lock="diyLoading" class="upload-wrapper">
    <div v-show="urlList.length < max" class="upload-block">
      <el-upload
        ref="huiUpload"
        :action="actionUrl"
        :headers="headers"
        :name="fieldName"
        :data="params"
        accept="image/jpg,image/jpeg,image/png,video/mp4"
        :on-preview="preview"
        :on-remove="removeFile"
        :on-change="uploadChange"
        :before-upload="beforeUploadFile"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :show-file-list="false"
        :auto-upload="false"
        :multiple="multiple"
      >
        <div class="hui-upload-btn">
          <i class="h-icon-add"></i>
          <div>选择</div>
        </div>
      </el-upload>
    </div>
    <div v-for="(url, index) in urlList" :key="index" class="upload-block">
      <div class="full hui-upload-img">
        <i class="h-icon-delete" @click="removeImg(index)"></i>
        <img class="full" :src="url" @click="preview(index)" />
        <div
          v-if="fileArr[index] && fileArr[index].type === 'VIDEO'"
          class="playBtn"
          @click="previewVideo(fileArr[index].url)"
        ></div>
      </div>
    </div>

    <h-img-preview
      :data="urlList"
      :current-index="currentIndex"
      :visible.sync="visibleImgPreview"
    />
    <Previewer ref="previewer" />
  </div>
</template>

<script>
import { getToken } from '@/utils/common';
import Previewer from '../../pages/VideoConfig/components/Previewer.vue';
export default {
  name: 'HuiUploadAction',
  components: {
    Previewer
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    fieldName: {
      type: String,
      // default: 'img'
      default: 'file'
    },
    max: {
      type: Number,
      default: 30
    },
    action: {
      type: String,
      // default: '/resource/uploadPicture'
      default: '/ptsa/web/material/upload/single.do'
    },
    valueType: {
      type: String,
      default: 'array'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visibleImgPreview: false,
      urlList: [],
      fileIds: [],
      fileArr: [],
      currentIndex: 0,
      headers: {
        'X-CSRF-TOKEN': getToken()
      },
      params: {},
      diyLoading: false
    };
  },
  computed: {
    actionUrl() {
      return this.action;
    }
  },
  methods: {
    uploadChange(file) {
      if (file.status === 'ready') {
        this.params = { name: file.name };
        this.$forceUpdate();
        this.$emit('fileReady', file.name);
        setTimeout(() => {
          this.$refs.huiUpload.submit();
        }, 0);
      }
    },
    beforeUploadFile(file) {
      let msg = '';
      this.uploading = true;
      // 验证图片格式
      if (/\.(png|jpg|jpeg|mp4)$/i.test(file.name)) {
        // 将字节大小改成M
        if (file.size / 1024 / 1024 <= 100) {
          this.diyLoading = true;
          return true;
        } else {
          msg = '文件大小不能超过100M';
        }
      } else {
        msg = '文件格式错误';
      }
      this.$message.error(msg);
      return false;
    },
    preview(index) {
      this.currentIndex = index;
      this.visibleImgPreview = true;
    },
    removeImg(index) {
      this.urlList.splice(index, 1);
      this.fileArr.splice(index, 1);
      this.emitInput();
    },
    setUrls(urls) {
      this.urlList = urls;
    },
    setDefaultValue(urls, fileIds, fileArr) {
      this.urlList = urls;
      this.fileIds = fileIds;
      this.fileArr = fileArr;
      this.emitInput();
    },
    removeFile() {
      this.$emit('remove-file');
    },
    uploadSuccess(response) {
      const { code, data } = response;
      this.diyLoading = false;
      if (code === '0') {
        this.$message.success('上传成功');
        // 显示图片
        this.urlList.push(data.thumbnail);
        // 记录图片id，并通知父组件
        // this.fileIds.push(data.thumbnail);
        this.fileArr.push(data);
        this.emitInput();
      } else {
        // this.$refs.huiUpload.clearFiles();
        this.$message.warning('上传失败');
      }
    },
    emitInput() {
      // const isString = this.valueType === 'string';
      // this.$emit('input', isString ? this.fileIds.join(',') : this.fileIds);
      // this.$emit('change', this.fileIds);
    },
    uploadError() {
      this.diyLoading = false;
      this.$refs.huiUpload.clearFiles();
      this.$message.error(this.$t('error500'));
    },
    previewVideo(val) {
      this.$refs.previewer.videoSrc =
        process.env.NODE_ENV === 'production'
          ? val
          : `https://test${val}`;
      this.$refs.previewer.show = true;
    },
    getMaterial() {
      const arr = [];
      this.fileArr.map(item => {
        arr.push(item.id);
      });
      return arr;
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-wrapper {
  position: relative;
  min-height: 104px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .upload-block {
    margin: 0 10px 12px 0;
  }
  .hui-upload-btn,
  .upload-block {
    position: relative;
    height: 96px;
    width: 96px;
  }
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
  .hui-upload-btn {
    border: 1px dashed rgba(0, 0, 0, 0.12);
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    text-align: center;
    padding-top: 20px;
    color: #999;
    i {
      font-size: 24px;
    }
  }
}
.playBtn {
  width: 30px;
  height: 30px;
  background: url('~@/assets/images/info-视频02.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -15px;
  margin-top: -15px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  }
}
</style>
