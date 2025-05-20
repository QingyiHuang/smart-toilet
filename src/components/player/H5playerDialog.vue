<template>
  <el-dialog
    :area="[800, 565]"
    title="视频"
    :visible.sync="innerVisible"
    custom-class="dark-dialog"
    append-to-body
    @opened="openVideo"
    @closed="closedDialog2"
  >
    <div v-if="innerVisible" class="videoArea">
      <Player ref="player"></Player>
    </div>
  </el-dialog>
</template>

<script>
import Player from './index.vue';
export default {
  components: {
    Player
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
