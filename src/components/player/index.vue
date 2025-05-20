<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: tanjingjing5
 * @Date: 2022-01-04 13:48:06
 * @LastEditors: tanjingjing5
 * @LastEditTime: 2022-02-10 11:24:08
-->
<template>
  <h-layout class="full">
    <js-plugin-pro
      ref="jsPluginPro"
      :wnd-split="1"
      :max-split="1"
      :show-timeline="isPlayBack"
      :loading-text="loadingText"
      :show-mask-toolbar="false"
      :base-path="h5BasePath"
      @performance-lack="performanceLack"
      @error="error"
    >
      <template slot="toolbarRight">
        <plugin-capture />
        <plugin-mute />
        <plugin-full-screen />
      </template>
      <!-- 回放的左侧栏操作 -->
      <template v-if="isPlayBack" slot="toolbarLeft">
        <plugin-time :time="time" />
        <plugin-play />
        <plugin-speed :speed-map="[0.25, 0.5, 1, 2, 4]" />
      </template>
      <!-- 预览的左侧栏操作 -->
      <!-- <template v-else slot="toolbarLeft">
        <plugin-capture />
        <plugin-mute />
      </template> -->
    </js-plugin-pro>
  </h-layout>
</template>
<script>
import H5PlayerMixin from '@/mixins/H5PlayerMixin';
import moment from 'moment';
// Vue.use(jsPluginPro)
export default {
  mixins: [H5PlayerMixin],
  props: {
    isPlayBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: ''
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$resize();
  },
  methods: {
    $close(i) {
      if (i || i === 0) {
        this.$refs.jsPluginPro.close(i);
      } else {
        this.$refs.jsPluginPro.closeAll();
      }
    },
    $resize() {
      this.$refs.jsPluginPro.resize();
    },
    $play(url) {
      this.$resize();
      this.$refs.jsPluginPro.play(
        url,
        {
          playURL: url
        },
        0,
        false,
        null,
        this.playError
      );
    },
    $playBack({ url, list, cameraData }) {
      this.$resize();
      this.time = moment(cameraData.beginTime).valueOf();
      const timeSegments = this.formatTimeSegments(list).map(d => {
        return {
          beginTime: new Date(d.beginTime).getTime(),
          endTime: new Date(d.endTime).getTime(),
          url: url,
          style: {
            background: d.color
          }
        };
      });
      if (timeSegments && timeSegments.length) {
        this.$refs.jsPluginPro.play(
          url,
          {
            playURL: url,
            timeSegments
          },
          0,
          false,
          null,
          this.playError
        );
      } else {
        this.setErrorMessage({ text: '未查询到录像' });
      }
    },
    formatTimeSegments(timeList) {
      if (!timeList) return [];
      const arr = [];
      let num = 0;
      // 说明：
      // 后台返回的时间段会出现明明连续却截成两段的情况
      // 这里处理一下，凡是上下两段相差不到一秒的，就按一段处理
      for (let i = 0, len = timeList.length; i < len; i++) {
        const item = timeList[i];
        const lastItem = timeList[i - 1];

        if (!lastItem) {
          arr[i] = {
            beginTime: item.beginTime,
            endTime: item.endTime,
            color: this.getColorByType(item.recordType)
          };
          num = i;
        }

        if (
          lastItem &&
          new Date(item.beginTime).getTime() -
            new Date(lastItem.endTime).getTime() <=
            1000 &&
          item.recordType === lastItem.recordType
        ) {
          arr[num] = {
            beginTime: arr[num].beginTime,
            endTime: item.endTime,
            color: this.getColorByType(item.recordType)
          };
        } else if (
          lastItem &&
          (new Date(item.beginTime).getTime() -
            new Date(lastItem.endTime).getTime() >
            1000 ||
            item.recordType !== lastItem.recordType)
        ) {
          num++;
          arr[num] = {
            beginTime: item.beginTime,
            endTime: item.endTime,
            color: this.getColorByType(item.recordType)
          };
        }
      }

      return arr;
    },
    getColorByType(type) {
      switch (type) {
        case 0: // 录像计划
          return '#5881cf';
        case 1: // 移动侦测
          return '#836abb';
        case 2: // 报警录像
          return '#b25959';
        default:
          // 其它
          return '#519f8f';
      }
    }
  }
};
</script>
