<template>
  <el-dialog
    title="批量导入"
    :visible.sync="showImportDialog"
    :area="[480, 240]"
    top="middle"
  >
    <el-upload
      v-if="showImportDialog"
      ref="upload"
      :action="uploadOption.action"
      :headers="uploadOption.headers"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      accept="aplication/zip,application/x-rar-compressed"
      single-file
    >
      <el-button type="default">点击上传</el-button>
    </el-upload>
    <!-- <a class="download-template" :href="downloadTemplateUrl" target="_blank">
      模板下载
    </a> -->
    <!-- <el-button type="link" @click="downloadTemplate">模板下载</el-button> -->
    <div class="tip1">支持.zip格式的文件。</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelImport">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getToken } from '@/utils/common';
// import FaceApi from '@/api/faceApi';
export default {
  data() {
    return {
      showImportDialog: false,
      uploadOption: {
        action: '/ptsa/web/material/upload/batch.do',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': getToken(),
          responseType: 'blob'
        }
      },
      uploadLoading: false
      // downloadTemplateUrl: '/templateFile/人员信息.zip'
    };
  },
  methods: {
    // 为了新需求，做了自定义上传测试
    // diyUpload(val) {
    //   const formData = new FormData();
    //   formData.append('faceFile', val.file);
    //   FaceApi.batchAddFace(formData);
    // },
    // 下载模板
    // downloadTemplate() {
    //   FaceApi.downloadTemplate().then(res => {
    //     if (res) {
    //       const blob = new Blob([res], { type: 'application/zip' });
    //       const elink = document.createElement('a');
    //       elink.download = '模板文件.zip';
    //       elink.style.display = 'none';
    //       elink.href = URL.createObjectURL(blob);
    //       document.body.appendChild(elink);
    //       elink.click();
    //       URL.revokeObjectURL(elink.href); // 释放URL 对象
    //       document.body.removeChild(elink);
    //     } else {
    //       this.$message.warning('下载失败');
    //     }
    //   });
    // },
    // 导入文件校验
    beforeUpload(file) {
      if (!file.name.endsWith('.zip') && !file.name.endsWith('.rar')) {
        this.$message.warning(`${file.name} 文件格式错误，上传失败`);
        return false;
      }
      this.uploadLoading = true;
    },
    uploadSuccess(response) {
      const { code } = response;
      this.uploadLoading = false;
      if (code === '0') {
        this.$message.success('导入成功');
        this.showImportDialog = false;
        this.$emit('refresh');
      } else {
        this.$message.warning('导入失败或部分导入失败');
        this.$emit('refresh');
        this.showImportDialog = false;
        // FaceApi.downloadFalure({ key: response.data }).then(res => {
        //   // 请求下载失败部分
        //   if (res) {
        //     const blob = new Blob([res], { type: 'application/zip' });
        //     const elink = document.createElement('a');
        //     elink.download = '导入失败部分信息.zip';
        //     elink.style.display = 'none';
        //     elink.href = URL.createObjectURL(blob);
        //     document.body.appendChild(elink);
        //     elink.click();
        //     URL.revokeObjectURL(elink.href); // 释放URL 对象
        //     document.body.removeChild(elink);
        //   }
        // });
      }
    },
    uploadError(err) {
      this.uploadLoading = false;
      this.$message.warning(err.msg);
    },
    cancelImport() {
      this.showImportDialog = false;
      this.$refs.upload.clearFiles();
    }
  }
};
</script>
