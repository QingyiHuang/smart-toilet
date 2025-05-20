<template>
  <el-dialog
    title="预览"
    :visible.sync="show"
    :area="[700, 480]"
    top="middle"
    @opened="startPlay"
    @close="close"
  >
    <div class="videoArea">
      <video
        v-if="show"
        id="audio"
        class="video-player"
        style="object-fit: fill"
        muted
      >
        <source id="videoInner" :src="videoSrc" type="video/mp4" />
      </video>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      videoSrc: ''
    };
  },
  methods: {
    // 开始播放视频
    startPlay(url) {
      const video = document.getElementById('audio');
      video.play();
    },
    close() {
      this.videoSrc = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.videoArea {
  height: 400px;
  width: 100%;
  #audio {
    width: 100%;
    height: 100%;
  }
}
</style>
