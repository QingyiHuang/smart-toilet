<template>
  <!-- 应用范围 -->
  <div class="GuidePage">
    <!-- 头部 -->
    <div class="headerPart">
      智慧公厕
    </div>
    <div class="tipstop">
      <div class="tipstop1">空闲</div>
      <div class="tipstop2">在用</div>
    </div>
    <!-- 时间显示，定时器一秒一更新 -->
    <div class="timePart">2022/06/15 星期五 10:13:26</div>
    <!-- 天气显示，定时器12小时一刷 -->
    <div class="weatherPart">
      <div class="weather1"></div>
      <div class="weather2">多云</div>
      <div class="weather3"> 20℃~32℃ 当前22℃</div>
    </div>
    <!-- 中间厕位区域 -->
    <div class="guideBackGround">
      <img class="imgback" src="">
      <div class="backInfo"></div>
    </div>
    <!-- 左边区域 -->
    <div class="leftPanel malePart1080">
      <div class="malePart">
        <div class="toiletInfo">
          <div class="titleInfo titleInfoMan"></div>
          <div class="toiletInfoRight toiletInfoRightMan">
            <p class="tlp tlp1">
              0
              <span >/0</span>
            </p>
          </div>
        </div>
        <div class="oneBox">
          <div class="boxTitle">
            客流数据
          </div>
          <div class="boxContent">
            <div class="contentLeft"></div>
            <div class="contentRihgt">
              <div class="part1">
                <p>今日客流</p>
                <p>本月客流</p>
              </div>
              <div class="part2 part21">
                <p>
                  0
                  <i>次</i>
                </p>
                <p>
                  0
                  <i>次</i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 环境监测信息 -->
        <div class="oneBox">
          <div class="boxTitle">
            环境监测数据
          </div>
          <div class="boxContent">
            <div class="oneCol">
              <div class="colLeft colImg1"></div>
              <div class="colRight">
                <p class="colRight-p colp11">
                  0
                  <span>℃</span>
                </p>
                <p class="colRight-name">温度</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg2"></div>
              <div class="colRight">
                <p class="colRight-p colp21">
                  0
                  <span>%</span>
                </p>
                <p class="colRight-name">湿度</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg3"></div>
              <div class="colRight">
                <p class="colRight-p colp31">
                  0
                  <span>ppm</span>
                </p>
                <p class="colRight-name">氨气</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg4"></div>
              <div class="colRight">
                <p class="colRight-p colp41">
                  0
                  <span>ppm</span>
                </p>
                <p class="colRight-name">硫化氢</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg5"></div>
              <div class="colRight">
                <p class="colRight-p colp51">
                  0
                  <span>ug/m³</span>
                </p>
                <p class="colRight-name">PM2.5</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 左下视频播放区域 -->
        <div class="videoArea">
          <div class="VideoImg" style="display: none;">
            <img src="">
          </div>
          <video id="audio" class="video-player" style="object-fit:fill; display: block;"  autoplay muted>
            <source id="videoInner" src="" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
    <!-- 右侧区域 -->
    <div class="rightPanel malePart1080">
      <div class="femalePart">
        <div class="toiletInfo">
          <div class="titleInfo titleInfowoman"></div>
          <div class="toiletInfoLeft toiletInfoLeftWoman"></div>
          <div class="toiletInfoRight">
            <p class="tlp tlp2">
              0
              <span>/0</span>
            </p>
          </div>
        </div>
        <div class="oneBox">
          <div class="boxTitle">
            客流数据
          </div>
          <div class="boxContent">
            <div class="contentLeft"></div>
            <div class="contentRihgt">
              <div class="part1">
                <p>今日客流</p>
                <p>本月客流</p>
              </div>
              <div class="part2 part22">
                <p>
                  0
                  <i>次</i>
                </p>
                <p>
                  0
                  <i>次</i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 环境监测信息 -->
        <div class="oneBox">
          <div class="boxTitle">
            环境监测数据
          </div>
          <div class="boxContent">
            <div class="oneCol">
              <div class="colLeft colImg1"></div>
              <div class="colRight">
                <p class="colRight-p colp12">
                  0
                  <span>℃</span>
                </p>
                <p class="colRight-name">温度</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg2"></div>
              <div class="colRight">
                <p class="colRight-p colp22">
                  0
                  <span>%</span>
                </p>
                <p class="colRight-name">湿度</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg3"></div>
              <div class="colRight">
                <p class="colRight-p colp32">
                  0
                  <span>ppm</span>
                </p>
                <p class="colRight-name">氨气</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg4"></div>
              <div class="colRight">
                <p class="colRight-p colp42">
                  0
                  <span>ppm</span>
                </p>
                <p class="colRight-name">硫化氢</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg5"></div>
              <div class="colRight">
                <p class="colRight-p colp52">
                  0
                  <span>ug/m³</span>
                </p>
                <p class="colRight-name">PM2.5</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 增加评分区域 -->
        <div class="evaluateArea">
          <div class="evaLeft">
            <div class="evaTitle">综合评分</div>
            <div class="starBar">
              <div class="star starLight"></div>
              <div class="star starLight"></div>
              <div class="star starLight"></div>
              <div class="star starLight"></div>
              <div class="star starLight"></div>
            </div>
            <p class="evaValue">0分</p>
          </div>
          <div class="evaRight">
            <div id="qrCodeArea"></div>
            <p>码上评价</p>
          </div>
        </div>
        <!-- 更换公厕 -->
        <div class="switchBtn" @click="reGuide" >切换厕所</div>
      </div>
    </div>
    <!-- 第三厕信息 -->
    <div class="thirdPart footerpart1080">
      <div class="leftPart">
      </div>
      <div class="centerpart">
        <div class="oneBoxSpecial">
          <div class="specialOneLine"><p class="p1">今日客流总数</p><p class="p2 allp1">
            0
          </p></div>
          <div class="specialOneLine"><p class="p1">本月客流总数</p><p class="p2 allp2">
            0
          </p></div>
        </div>
        <div class="toiletBosscenter">
          <div class="titleInfo">第三卫环境监测信息</div>
          <div class="bossBottom">
            <div class="oneCol">
              <div class="colLeft colImg1"></div>
              <div class="colRight">
                <p class="colRight-p colp13">
                  0
                  <span>℃</span>
                </p>
                <p class="colRight-name">温度</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg2"></div>
              <div class="colRight">
                <p class="colRight-p colp23">
                  0
                  <span>%</span>
                </p>
                <p class="colRight-name">湿度</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg3"></div>
              <div class="colRight">
                <p class="colRight-p colp33">
                  0
                  <span>ppm</span>
                </p>
                <p class="colRight-name">氨气</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg4"></div>
              <div class="colRight">
                <p class="colRight-p colp43">
                  0
                  <span>ppm</span>
                </p>
                <p class="colRight-name">硫化氢</p>
              </div>
            </div>
            <div class="oneCol">
              <div class="colLeft colImg5"></div>
              <div class="colRight">
                <p class="colRight-p colp53">
                  0
                  <span>ug/m³</span>
                </p>
                <p class="colRight-name">PM2.5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rightpart">
      </div>
    </div>
    <!-- 底部 -->
    <div class="footerpart">
      <marquee class="footerP" behavior="scroll">文明如厕，请爱护公共卫生</marquee>
    </div>
  </div>
</template>

<script>
// import './qrcode.min.js
import './jquery-1.11.1.min.js'
import './jquery-qrcode.min.js'
// import './index.js'
  export default {
    data() {
      return{
        ws: '',
        sendTimmer: null,
        timer: null,
        updateTime: '',
        nouse: false, // 当为false的时候 则执行close重连，否则 不允许重连
      }
    },
    mounted() {
      // 执行websocket连接
      this.startWebSocket()
      this.displayTime()
      this.queryWeather()
      console.log(this.$route.query)
    },
    beforeDestroy() {
      if(this.ws) {
        this.ws.close()
        this.nouse = true
      }
    },
    methods: {
      reGuide() {
        // 重新reload
        this.$router.push({
          path: '/index'
        })
      },
      // 迁移index.js里的逻辑到guide内
      startWebSocket() {
        // 如果当前有socket，断开socket
        this.nouse = false
        if(this.ws) {
          console.log('需要删除socket')
          this.ws.close()
        }
        // 获取query中的sn,没sn后续不进行
        let sn = this.$route.query.sn;
        let urlIp = '';
        let protocol = '';
        if(this.$route.query.ip.includes('https:')) {
          protocol = 'wss'
          urlIp = this.$route.query.ip.replace('https://', '')
        } else {
          protocol = 'ws'
          urlIp = this.$route.query.ip.replace('http://', '')
        }
        let wsuri = `${protocol}://${urlIp}/ptsa/websocket/toiletRealData?sn=${sn || 1213213213211}`; // ws地址
        //  let wsuri = `ws://10.196.74.23:9831/ptsa/websocket/toiletRealData?sn=${sn ||  '2'}`
        // let wsuri = `wss://test/ptsa/websocket/toiletRealData?sn=2`
        //  this.dealPageData()
        this.ws = new WebSocket(wsuri);
        // socket成功后
        this.ws.onopen = this.websocketOnopen;
        // socket收到消息的时候
        this.ws.onmessage = this.websocketOnmessage;
        this.ws.onclose = this.websocketOnclose;
      },
      // socket开启
      websocketOnopen() {
        if(this.sendTimmer) {
          clearInterval(this.sendTimmer)
          this.sendTimmer = null
        }
        this.sendTimmer = setInterval(() => {
          this.ws.send(`{"type":"HEART_BEAT"}`);
        }, 10000)
      },
      websocketOnmessage(res) {
          if (res.data) {
            const data = JSON.parse(res.data);
            if(data.type === 'UPDATE') {
              this.dealPageData(data.data);
            } else if(data.type === 'MATERIAL_CHANGE') {
              // 素材推送,则播放该素材
              this.VideoPlay(data.data);
            } else if(data.type === 'TIPS_CHANGE') {
              this.changeText(data.data)
            } else if(data.type === 'PAGE_CHANGE') {
              // 执行页面刷新操作
              this.pageChange()
            }
          }
      },
      websocketOnclose(res) {
        if(!this.nouse) {
          setTimeout(() => {
            this.startWebSocket(); // 3s自调用
          }, 30000);
          // 在关闭的时候关闭发送heartbeat，在链接时发起
          if(this.sendTimmer) {
            clearInterval(this.sendTimmer)
            this.sendTimmer = null
          }
        }

      },
      // 根据socket返回值修改数据
      dealPageData(data) {
        // 获取男左女友
        let maleOnLeft = data.maleOnLeft
        let maleData = ''
        let femaleData = ''
        if(maleOnLeft === 1) {
          maleData = data.realDataList.length >= 1 ? data.realDataList[0] : {};
          femaleData = data.realDataList.length >= 2 ? data.realDataList[1] : {};
        } else {
          femaleData = data.realDataList.length >= 1 ? data.realDataList[0] : {};
          maleData = data.realDataList.length >= 2 ? data.realDataList[1] : {};
        }
        let thirdData = data.realDataList.length >= 3 ? data.realDataList[2] : {};
        let chargePerson = data.chargePersonList && data.chargePersonList.length
          ? data.chargePersonList[0]
          : {};
        let headTitle = data.toiletName
        // 处理头部数据
        this.dealHeader(headTitle)
        // 处理左侧男厕数据
        this.dealLeftData(maleData, maleOnLeft);
        // 处理右侧女厕数据
        this.dealRightData(femaleData, maleOnLeft);
        // 处理下面数据
        this.dealFooterData(chargePerson, thirdData, data.monthFlowNum, data.todayFlowNum);
        // 处理中间数据
        this.dealCenterData(
          data.positionPic,
          data.realDataList[0].freeIndicators,
          data.realDataList[0].totalIndicators,
          data.realDataList[1].freeIndicators,
          data.realDataList[1].totalIndicators,
          data.lastUpdateTime,
          data.realDataList.length > 2 ? data.realDataList[2].freeIndicators : [],
          data.realDataList.length > 2 ? data.realDataList[2].totalIndicators : [],
        );
        this.drawQrCode(data.toiletGrade, data.toiletId, data.toiletName);
      },
      // 处理头部数据
      dealHeader (headTitle) {
        let headerpart = document.querySelector('.headerPart');
        headerpart.innerHTML = `${headTitle || '智慧公厕'}`
        // headerpart.onclick = pageChange()
      },
      // 处理左侧数据
      dealLeftData(maleData, maleOnLeft) {
        let title = document.querySelector('.titleInfoMan')
        // let toiletInfoLeft = document.querySelector('.toiletInfoLeftMan')
        // 如果manOnLeft，则添加class
        if(!maleOnLeft) {
          title.className = 'titleInfo titleInfoMan titleInfoNv'
        } else {
          title.className = 'titleInfo titleInfoMan'
        }
        let tlp = document.querySelector('.tlp1')
        if(maleOnLeft) {
          tlp.style.color = '#5ED6FF'
        } else {
          tlp.style.color = '#FE60A3'
        }
        tlp.innerHTML = `
          ${maleData.freeNum || 0}
          <span>/${maleData.totalNum || 0}</span>
        `;
        let part2 = document.querySelector('.part21')
        part2.innerHTML = `<p>${maleData.todayFlowNum || 0}<i>次</i></p><p>${maleData.monthFlowNum || 0}<i>次</i></p>`;
        let colp1 = document.querySelector('.colp11')
        let colp2 = document.querySelector('.colp21')
        let colp3 = document.querySelector('.colp31')
        let colp4 = document.querySelector('.colp41')
        let colp5 = document.querySelector('.colp51')
        colp1.innerHTML = `${
          maleData.envData
          ? Boolean(JSON.parse(maleData.envData).temperature)
            ? JSON.parse(maleData.envData).temperature
            : JSON.parse(maleData.envData).temperature === '0' ||
              JSON.parse(maleData.envData).temperature === 0
            ? '0'
            : '--'
          : '--'
        }
        <span>℃</span>`;
        colp2.innerHTML = `${
          maleData.envData
          ? Boolean(JSON.parse(maleData.envData).humidity)
            ? JSON.parse(maleData.envData).humidity
            : JSON.parse(maleData.envData).humidity === '0' ||
              JSON.parse(maleData.envData).humidity === 0
            ? '0'
            : '--'
          : '--'
        }
        <span>%</span>`;
        colp3.innerHTML = `${
          maleData.envData
          ? Boolean(JSON.parse(maleData.envData).NH3)
            ? JSON.parse(maleData.envData).NH3
            : JSON.parse(maleData.envData).NH3 === '0' ||
              JSON.parse(maleData.envData).NH3 === 0
            ? '0'
            : '--'
          : '--'
        }
          <span>ppm</span>`;
        colp4.innerHTML = `${
          maleData.envData
          ? Boolean(JSON.parse(maleData.envData).H2S)
            ? JSON.parse(maleData.envData).H2S
            : JSON.parse(maleData.envData).H2S === '0' ||
              JSON.parse(maleData.envData).H2S === 0
            ? '0'
            : '--'
          : '--'
        }
        <span>ppm</span>`;
        colp5.innerHTML = `${
          maleData.envData
          ? Boolean(JSON.parse(maleData.envData)['PM2.5'])
            ? JSON.parse(maleData.envData)['PM2.5']
            : JSON.parse(maleData.envData)['PM2.5'] === '0' ||
              JSON.parse(maleData.envData)['PM2.5'] === 0
            ? '0'
            : '--'
          : '--'
        }
        <span>ug/m³</span>`;
      },
      dealRightData(femaleData, maleOnLeft) {
          let titleInfo = document.querySelector('.titleInfowoman');
          // let toiletInfoLeft = document.querySelector('.toiletInfoLeftWoman')
          if(maleOnLeft) {
            titleInfo.className = 'titleInfo titleInfowoman'
          } else {
            titleInfo.className = 'titleInfo titleInfowoman titleInfoman'
          }
          let tlp = document.querySelector('.tlp2')
          if(maleOnLeft) {
            tlp.style.color = '#FE60A3'
          } else {
            tlp.style.color = '#5ED6FF'
          }
          tlp.innerHTML = `
            ${femaleData.freeNum || 0}
            <span>/${femaleData.totalNum || 0}</span>
          `;
          let part2 = document.querySelector('.part22')
          part2.innerHTML = `<p>${femaleData.todayFlowNum || 0}<i>次</i></p><p>${femaleData.monthFlowNum || 0}<i>次</i></p>`
          let colp1 = document.querySelector('.colp12')
          let colp2 = document.querySelector('.colp22')
          let colp3 = document.querySelector('.colp32')
          let colp4 = document.querySelector('.colp42')
          let colp5 = document.querySelector('.colp52')
          colp1.innerHTML = `${
            femaleData.envData
            ? Boolean(JSON.parse(femaleData.envData).temperature)
              ? JSON.parse(femaleData.envData).temperature
              : JSON.parse(femaleData.envData).temperature ===
                  '0' ||
                JSON.parse(femaleData.envData).temperature === 0
              ? '0'
              : '--'
            : '--'
          }
          <span>℃</span>`;
          colp2.innerHTML = `${
            femaleData.envData
            ? Boolean(JSON.parse(femaleData.envData).humidity)
              ? JSON.parse(femaleData.envData).humidity
              : JSON.parse(femaleData.envData).humidity === '0' ||
                JSON.parse(femaleData.envData).humidity === 0
              ? '0'
              : '--'
            : '--'
          }
          <span>%</span>`;
          colp3.innerHTML = `${
            femaleData.envData
            ? Boolean(JSON.parse(femaleData.envData).NH3)
              ? JSON.parse(femaleData.envData).NH3
              : JSON.parse(femaleData.envData).NH3 === '0' ||
                JSON.parse(femaleData.envData).NH3 === 0
              ? '0'
              : '--'
            : '--'
          }
          <span>ppm</span>`;
          colp4.innerHTML = `${
            femaleData.envData
            ? Boolean(JSON.parse(femaleData.envData).H2S)
              ? JSON.parse(femaleData.envData).H2S
              : JSON.parse(femaleData.envData).H2S === '0' ||
                JSON.parse(femaleData.envData).H2S === 0
              ? '0'
              : '--'
            : '--'
          }
          <span>ppm</span>`;
          colp5.innerHTML = `${
            femaleData.envData
            ? Boolean(JSON.parse(femaleData.envData)['PM2.5'])
              ? JSON.parse(femaleData.envData)['PM2.5']
              : JSON.parse(femaleData.envData)['PM2.5'] === '0' ||
                JSON.parse(femaleData.envData)['PM2.5'] === 0
              ? '0'
              : '--'
            : '--'
          }
          <span>ug/m³</span>`;
      },
      // 处理第三厕数据
      dealFooterData (chargePerson, thirdData, month, today) {
        let allp1 = document.querySelector('.allp1')
        let allp2 = document.querySelector('.allp2')
        allp1.innerHTML = `${today || 0}`
        allp2.innerHTML = `${month || 0}`
        let colp1 = document.querySelector('.colp13')
        let colp2 = document.querySelector('.colp23')
        let colp3 = document.querySelector('.colp33')
        let colp4 = document.querySelector('.colp43')
        let colp5 = document.querySelector('.colp53')
        let toiletBosscenter = document.querySelector('.toiletBosscenter')
        let guideBackGround = document.querySelector('.guideBackGround')
        let tipstop = document.querySelector('.tipstop')
        // 如果thirdData存在,否则隐藏第三厕信息
        if(thirdData.envData) {
          // 显示第三卫部分
          // toiletBosscenter.style.display = 'block';
          // 设置中间厕位图下行
          guideBackGround.style.top = '250px'
          tipstop.style.bottom = '270px'
            colp1.innerHTML = `${
              thirdData.envData
              ? Boolean(JSON.parse(thirdData.envData).temperature)
                ? JSON.parse(thirdData.envData).temperature
                : JSON.parse(thirdData.envData).temperature === '0' ||
                  JSON.parse(thirdData.envData).temperature === 0
                ? '0'
                : '--'
              : '--'
          }
          <span>℃</span>`;
            colp2.innerHTML = `${
              thirdData.envData
              ? Boolean(JSON.parse(thirdData.envData).humidity)
                ? JSON.parse(thirdData.envData).humidity
                : JSON.parse(thirdData.envData).humidity === '0' ||
                  JSON.parse(thirdData.envData).humidity === 0
                ? '0'
                : '--'
              : '--'
          }
            <span>%</span>`;
            colp3.innerHTML = `${
              thirdData.envData
              ? Boolean(JSON.parse(thirdData.envData).NH3)
                ? JSON.parse(thirdData.envData).NH3
                : JSON.parse(thirdData.envData).NH3 === '0' ||
                  JSON.parse(thirdData.envData).NH3 === 0
                ? '0'
                : '--'
              : '--'
          }
          <span>ppm</span>`;
            colp4.innerHTML = `${
              thirdData.envData
              ? Boolean(JSON.parse(thirdData.envData).H2S)
                ? JSON.parse(thirdData.envData).H2S
                : JSON.parse(thirdData.envData).H2S === '0' ||
                  JSON.parse(thirdData.envData).H2S === 0
                ? '0'
                : '--'
              : '--'
          }
          <span>ppm</span>`;
            colp5.innerHTML = `${
              thirdData.envData
              ? Boolean(JSON.parse(thirdData.envData)['PM2.5'])
                ? JSON.parse(thirdData.envData)['PM2.5']
                : JSON.parse(thirdData.envData)['PM2.5'] === '0' ||
                  JSON.parse(thirdData.envData)['PM2.5'] === 0
                ? '0'
                : '--'
              : '--'
          }
          <span>ug/m³</span>`;
        } else {
          toiletBosscenter.style.display = 'none'
          guideBackGround.style.top = '328px'
          tipstop.style.bottom = '172px'
        }
      },
      // 获取年月日
      bjtime(){
        let myDate = new Date();
        let year = myDate.getFullYear();//获取年
        let month = myDate.getMonth() + 1;//获取月，默认从0开始，所以要加一
        let date = myDate.getDate();//获取日
        let hours = myDate.getHours();//获取小时
        let minutes = myDate.getMinutes();//获取分
        let seconds = myDate.getSeconds();//获取秒
        let weekend = myDate.getDay(); //获取星期几，这里获得到的是数字1-7，所以我下面自己new了一个数组把获取到的数字当下标
        let weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        let day = weeks[weekend]//这样就是显示的星期x了//这些if判断是在小于10的时候前面自动补0
        if (month<10) {month = '0'+month}
        if (date<10) {date = '0'+date}
        if (hours<10) {hours = '0'+hours}
        if (minutes<10) {minutes = '0'+minutes}
        if (seconds<10) {seconds = '0'+seconds}
        $('.timePart').html(
          // 'GMT+'+hours+':'+minutes+' '+year+'/'+month+'/'+date+' '+hours+':'+minutes+':'+seconds
          `${year}/${month}/${date}  ${day}  ${hours}:${minutes}:${seconds}`
          );
      },
      // 执行时间
      displayTime() {
        if(this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        let _this = this
        this.timer = setInterval(function() {_this.bjtime()},1000)
      },

  // 处理中间空闲图片--
  dealCenterData (img, point1, point1all, point2, point2all, lastTime, point3, point3all) {
    if(this.updateTime !== lastTime) {
      this.updateTime = lastTime
      let centerPart = document.querySelector('.guideBackGround');
      // 获取背景图片
      let imgback = `<img class="imgback" src="${this.$route.query.ip}${img}" />`;
      let nanceAll = '';
      let nvceAll = '';
      let nanceFree = '';
      let nvceFree = '';
      let thirdFree = '';
      let thirdAll = '';
      // 获取男厕全部
      for(var i = 0; i < point1all.length; i++) {
        var flag = point1.some(item => {
          return item.id === point1all[i].id
        })
        // 如果在空闲中有该值则绘制空闲，否则绘制占用
        if(flag) {
          if (point1all[i].position) {
            var arr = point1all[i].position.split(',');
            nanceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="maleMarkerActive"></div>`;
          }
        } else {
          if (point1all[i].position) {
            var arr = point1all[i].position.split(',');
            nanceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="maleMarker"></div>`;
          }
        }
      }
      // 获取女厕全部
      
      for(var i = 0; i < point2all.length; i++) {
        var flag = point2.some(item => {
          return item.id === point2all[i].id
        })
        // 如果在空闲中有该值则绘制空闲，否则绘制占用
        if(flag) {
          if (point2all[i].position) {
            var arr = point2all[i].position.split(',');
            nanceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="femaleMarkerActive"></div>`;
          }
        } else {
          if (point2all[i].position) {
            var arr = point2all[i].position.split(',');
            nanceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="femaleMarker"></div>`;
          }
        }
      }
      // 获取第三厕全部
      for(var i = 0; i < point3all.length; i++) {
        var flag = point3.some(item => {
          return item.id === point3all[i].id
        })
        // 如果在空闲中有该值则绘制空闲，否则绘制占用
        if(flag) {
          if (point3all[i].position) {
            var arr = point3all[i].position.split(',');
            nanceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="thirdMarkerActive"></div>`;
          }
        } else {
          if (point3all[i].position) {
            var arr = point3all[i].position.split(',');
            nanceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="thirdMarker"></div>`;
          }
        }
      }
        centerPart.innerHTML = `
          ${imgback}
          <div class="backInfo">
          ${nanceAll}
          ${nvceAll}
          ${thirdAll}
          ${nanceFree}
          ${nvceFree}
          ${thirdFree}
          </div>
        `;

    } else {
      let centerPart = document.querySelector('.backInfo');
      // 获取背景图片
      let nanceAll = '';
      let nvceAll = '';
      let nanceFree = '';
      let nvceFree = '';
      let thirdFree = '';
      let thirdAll = '';
      // 获取 男厕全部
      for(var i = 0; i < point1all.length; i++) {
        var flag = point1.some(item => {
          return item.id === point1all[i].id
        })
        // 如果在空闲中有该值则绘制空闲，否则绘制占用
        if(flag) {
          if (point1all[i].position) {
            var arr = point1all[i].position.split(',');
            nanceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="maleMarkerActive"></div>`;
          }
        } else {
          if (point1all[i].position) {
            var arr = point1all[i].position.split(',');
            nanceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="maleMarker"></div>`;
          }
        }
      }
      // 获取女厕全部
      
      for(var i = 0; i < point2all.length; i++) {
        var flag = point2.some(item => {
          return item.id === point2all[i].id
        })
        // 如果在空闲中有该值则绘制空闲，否则绘制占用
        if(flag) {
          if (point2all[i].position) {
            var arr = point2all[i].position.split(',');
            nanceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="femaleMarkerActive"></div>`;
          }
        } else {
          if (point2all[i].position) {
            var arr = point2all[i].position.split(',');
            nanceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="femaleMarker"></div>`;
          }
        }
      }
      // 获取第三厕全部
      for(var i = 0; i < point3all.length; i++) {
        var flag = point3.some(item => {
          return item.id === point3all[i].id
        })
        // 如果在空闲中有该值则绘制空闲，否则绘制占用
        if(flag) {
          if (point3all[i].position) {
            var arr = point3all[i].position.split(',');
            nanceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="thirdMarkerActive"></div>`;
          }
        } else {
          if (point3all[i].position) {
            var arr = point3all[i].position.split(',');
            nanceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px; width: ${Number(arr[2]) ? (Number(arr[2]) + 'px') : '40px'}; height: ${Number(arr[3]) ? (Number(arr[3]) + 'px') : '40px'}" class="thirdMarker"></div>`;
          }
        }
      }
      centerPart.innerHTML = `
        ${nanceAll}
        ${nvceAll}
        ${thirdAll}
        ${nanceFree}
        ${nvceFree}
        ${thirdFree}
      `;
    }
  },
  // this.startWebSocket();
  // 改变视频播放地址
  VideoPlay (data) {
    // 执行方法的时候，初始化
    let root = document.querySelector('.videoArea')
    root.innerHTML = `<div class="VideoImg" style="display: none;">
    <img src="">
  </div>
  <video id="audio" class="video-player" style="object-fit:fill; display: block;"  autoplay muted>
    <source id="videoInner" src="" type="video/mp4">
  </video>`
    // 从data中分离出视频
    let Urls = []
    let Pics = []
    for(let i = 0; i < data.length; i++) {
      if(data[i].type === 'VIDEO') {
        Urls.push(`${this.$route.query.ip}${data[i].url}`)
      } else {
        Pics.push(`${this.$route.query.ip}${data[i].url}`)
      }
    }
    $('#audio').html('');
    let urlLen = Urls.length
    let currentIndex = 0
    let picLen = Pics.length
    // video.loop = false;
    if(urlLen) {
      let video = document.getElementById("audio")
      let imgArea = document.querySelector('.VideoImg')
      // video.innerHTML = `<source src="${Urls[0]}" type="video/mp4">`
      // 视频播放停止
      video.src=  Urls[currentIndex]
      // video.currentTime=0.1; video.play();
      // video.play()

      
      video.addEventListener('ended', function () { 
        //监听到播放结束后，在此处可调用自己的接口
        // 切换视频源
        if(urlLen > 0) {
          if(currentIndex + 1 < urlLen) {
            currentIndex ++
            video.src=  Urls[currentIndex]
            video.currentTime=0.1; video.play();
          } else {
            currentIndex= 0
            // 一轮播放完成,然后开始播图片,图片播放完成再播视频
            video.pause()
            // 获取图片长度
            imgArea.style.display = 'block';
            video.style.display = 'none';
            if(picLen) {
              for (let i=0; i<picLen; i++) {
                task(i);
              }
              function task(i) {
                setTimeout( function () {
                    if(i === (picLen-1)) {
                      // 
                      imgArea.innerHTML = `<img src="${Pics[i]}">`
                      setTimeout(() => {
                        imgArea.style.display = 'none';
                        video.style.display = 'block';
                        video.src=  Urls[currentIndex]
                        video.currentTime=0.1; video.play();
                      }, 10000)
                    } else {
                      imgArea.innerHTML = `<img src="${Pics[i]}">`
                    }
                }, 10000 * i);
              }
            } else {
              imgArea.style.display = 'none';
              video.style.display = 'block';
              video.src=  Urls[currentIndex]
              video.currentTime=0.1; video.play();
            }
          }
        }
        
      }, false)
    } else {
      // 只有图片

      let video = document.getElementById("audio")
      let imgArea = document.querySelector('.VideoImg')
      imgArea.style.display = 'block';
      video.style.display = 'none';
      if(picLen > 1) {
        for (let i=0; i<picLen; i++) {
          task(i);
        }
        function task(i) {
          setTimeout( function () {
              if(i === (picLen-1)) {
                // 
                imgArea.innerHTML = `<img src="${Pics[i]}">`
                setTimeout(() => {
                  for (let i=0; i<picLen; i++) {
                    task(i);
                  }
                }, 10000)
              } else {
                imgArea.innerHTML = `<img src="${Pics[i]}">`
              }
          }, 10000 * i);
        }
      } else {
        imgArea.innerHTML = `<img src="${Pics[0]}">`
      }
    }

  },
  // 绘制二维码
  drawQrCode (grid,toiletId,toiletName) {
    // 评分
    let star = document.querySelectorAll('.star')
    let evaValue = document.querySelector('.evaValue')
    if(Number(grid) === 0) {
      for(let i = 0; i < 5; i++) {
        star[i].className = 'star starLight'
      }
      evaValue.innerHTML = `5分`
    } else {
      let aa1 = parseInt(Number(grid))
      for(let i = 0; i < aa1; i++) {
        star[i].className = 'star starLight'
      }
      if(Number(grid) > aa1){
        star[aa1].className = 'star starHarf'
        for(let i = aa1+1; i < 5; i++){
          star[i].className = 'star'
        }
      } else {
        for(let i = aa1; i < 5; i++){
          star[i].className = 'star'
        }
      }
      evaValue.innerHTML = `${grid}分`
    }
    // 二维码
    if(document.getElementById("qrCodeArea").innerHTML === '') {
      // let qrcode = new QRCode(document.getElementById("qrCodeArea"), {
      //   width: 132,
      //   height: 132,
      //   colorDark : "#000000",
      //   colorLight : "#ffffff",
      //   correctLevel : QRCode.CorrectLevel.Q
      // });
      // qrcode.makeCode(encodeURI(`${window.location.origin}/ptsa/wrap.html?toiletid=${toiletId}&name=${toiletName}`));
      $('#qrCodeArea').qrcode({
        width: 132,height: 132,text: encodeURI(`${window.location.origin}/ptsa/wrap.html?toiletid=${toiletId}&name=${toiletName}`)
      })
    }
  },
  // 走马灯更换
  changeText(text) {
    let marquee = document.querySelector('.footerpart')
    marquee.innerHTML = `<marquee class="footerP" behavior="scroll">${text || '文明如厕，请爱护公共卫生'}</marquee>`
  },
  // 刷新页面操作
  pageChange() {
    // 关闭socketF
    this.ws.close()
    this.$router.go(0)
  },
  queryWeather() {
    $.ajax({
      type: 'Get',
      url: `${this.$route.query.ip}/ptsa/web/weather/getWeather.do?city=%E5%A5%8E%E5%B1%AF` ,
      // data: pageParam,
      dataType: "json",
      success: function (response) {
        if(response) {
          response = JSON.parse(response.data)
          var weather2 = document.querySelector('.weather2')
          var weather3 = document.querySelector('.weather3')
          weather2.innerHTML = response.data.forecast[0].type
          weather3.innerHTML = ` ${response.data.forecast[0].low.replace('低温', '')}~${response.data.forecast[0].high.replace('高温', '')} 当前${response.data.wendu}℃`
        }
        // 
      }
    })
  }
  
    }
  }
</script>

<style lang="scss" scoped>
@import './guide.css';
.switchBtn{
  color: #ffffff;
  position: relative;
  left: 294px;
  top: 70px;
}
</style>