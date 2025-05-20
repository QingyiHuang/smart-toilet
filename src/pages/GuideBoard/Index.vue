<template>
  <div class="GuidePage">
    <HeaderPart />
    <div class="centertips">
      <div class="empty">空闲</div>
      <div class="using">在用</div>
    </div>
    <div class="leftPanel">
      <MalePart ref="p1" :male-data="maleData" />
    </div>
    <div class="rightPanel">
      <FemalePart ref="p2" :female-data="femaleData" />
    </div>
    <ToiletType1 ref="toilet" />
    <ThirdPart ref="p3" :third-data="thirdData" :charge-person="chargePerson" />
    <FooterPart />
  </div>
</template>

<script>
import HeaderPart from '../DataBoard/components_headfoot/HeaderPart.vue';
import FooterPart from '../DataBoard/components_headfoot/FooterPart.vue';
import MalePart from './components/malePart.vue';
import FemalePart from './components/femalePart.vue';
import ThirdPart from './components/footerpart.vue';
import ToiletType1 from './ToiletPlane/ToiletType1.vue';
// import Api from '@/api/index';
export default {
  components: {
    HeaderPart,
    FooterPart,
    MalePart,
    FemalePart,
    ThirdPart,
    ToiletType1
  },
  data() {
    return {
      hack1080: false,
      maleData: {},
      femaleData: {},
      thirdData: {},
      chargePerson: {},
      websock: null
    };
  },
  mounted() {
    this.initWebSocket();
    window.addEventListener('resize', this.pageResize);
  },
  destroyed() {
    window.removeEventListener('mousemove', this.pageResize);
    this.websocketOnclose();
  },
  methods: {
    pageResize() {
      this.$refs.p1.pageResize();
      this.$refs.p2.pageResize();
      this.$refs.p3.pageResize();
    },
    // websocket
    initWebSocket() {
      const urlIp = window.location.hostname;
      let wsuri = '';
      if (process.env.NODE_ENV !== 'development') {
        wsuri = `wss://${urlIp}/ptsa/websocket/toiletRealData?sn=${
          this.$route.query.sn || 3052108200001
        }`; // ws地址
      } else {
        wsuri = `ws://10.196.74.8:9831/ptsa/websocket/toiletRealData?sn=${
          this.$route.query.sn || 3052108200001
        }`;
      }
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketOnopen;
      this.websock.onerror = this.websocketOnerror;
      this.websock.onmessage = this.websocketOnmessage;
      this.websock.onclose = this.websocketOnclose;
    },
    // 客户端和服务端建立链接时触发,此时可向服务端传递参数
    websocketOnopen() {
      this.websock.send(''); // 传递参数
    },
    // 客户端收到服务端发来的消息时,会触发onmessage事件,参数res.data中包含server传输过来的数据
    websocketOnmessage(res) {
      if (res && res.data) {
        const { data } = JSON.parse(res.data);
        this.maleData =
          data.realDataList.length >= 1 ? data.realDataList[0] : {};
        this.femaleData =
          data.realDataList.length >= 2 ? data.realDataList[1] : {};
        this.thirdData =
          data.realDataList.length >= 3 ? data.realDataList[2] : {};
        this.chargePerson = data.chargePersonList.length
          ? data.chargePersonList[0]
          : {};
        this.$refs.toilet.setValue(
          data.positionPic,
          data.realDataList[0].totalIndicators,
          data.realDataList[0].freeIndicators,
          data.realDataList[1].totalIndicators,
          data.realDataList[1].freeIndicators
        );
      }
    },
    // 如果出现连接,处理,接收,发送数据失败的时候就会触发onerror事件
    websocketOnerror() {
      this.$message.error('连接失败');
      // 执行重新连接
      setTimeout(() => {
        this.initWebSocket();
      }, 3000);
      this.loading = false;
    },
    // 客户端收到服务端发送的关闭连接的请求时,触发onclose事件
    websocketOnclose() {
      this.websock.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.GuidePage {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  user-select: none;
  background-color: rgb(6, 21, 44);
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url('~@/assets/images/databoard/img-模型背景图.png') no-repeat;
    background-size: 100% 100%;
  }
  .leftPanel {
    width: 543px;
    height: calc(100% - 193px);
    background: url('~@/assets/images/databoard/pnl-左数据板-展开.png')
      no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 32px;
  }
  .rightPanel {
    width: 543px;
    height: calc(100% - 193px);
    background: url('~@/assets/images/databoard/pnl-右数据板-展开.png')
      no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 32px;
  }
  .centertips {
    width: 180px;
    position: absolute;
    left: 508px;
    top: 80px;
    .empty {
      width: 80px;
      margin-right: 10px;
      display: inline-block;
      font-family: MicrosoftYaHei;
      font-size: 20px;
      color: #9ee0ff;
    }
    .using {
      width: 80px;
      display: inline-block;
      font-family: MicrosoftYaHei;
      font-size: 20px;
      color: #9ee0ff;
    }
  }
}
</style>
