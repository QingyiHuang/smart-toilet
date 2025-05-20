// import QRCode from 'qrcodejs2'
$(function() {
  startWebSocket = function() {
    // 如果当前有socket，断开socket
    // if(ws) {
    //   console.log('需要删除socket')
    //   ws.close()
    // }
    // 获取query中的sn
    var sn = filterUrlParams().sn;
    let protocol = ''
    if(window.location.protocol === 'http:') {
      protocol = 'ws'
    } else {
      protocol = 'wss'
    }
    var urlIp = window.location.host;
    // var wsuri = `${protocol}://${urlIp}/ptsa/websocket/toiletRealData?sn=${sn || 1213213213211}`; // ws地址
  //  var wsuri = `ws://10.196.74.23:9831/ptsa/websocket/toiletRealData?sn=${sn ||  '2'}`
   var wsuri = `wss://test/ptsa/websocket/toiletRealData?sn=2`
  //  this.dealPageData()
   var sendTimmer = null
    ws = new WebSocket(wsuri);
    // socket成功后
    ws.onopen = function() {
      sendTimmer = setInterval(() => {
        ws.send(`{"type":"HEART_BEAT"}`);
      }, 10000)
    };
    // socket失败后
    // ws.onerror = function() {
    //   // 失败后需要再次发起socket
    //   console.log('链接失败')
    //   setTimeout(() => {
    //     startWebSocket(); // 3s自调用
    //   }, 3000);
    //   // window.location.reload()
    // };
    // socket收到消息的时候
    ws.onmessage = function(res) {
      if (res.data) {
        const data = JSON.parse(res.data);
        if(data.type === 'UPDATE') {
          dealPageData(data.data);
        } else if(data.type === 'MATERIAL_CHANGE') {
          // 素材推送,则播放该素材
          VideoPlay(data.data);
        } else if(data.type === 'TIPS_CHANGE') {
          changeText(data.data)
        } else if(data.type === 'PAGE_CHANGE') {
          // 执行页面刷新操作
          pageChange()
        }
        
      }
    };
    ws.onclose = () => {
      setTimeout(() => {
        startWebSocket(); // 3s自调用
      }, 30000);
      // 在关闭的时候关闭发送heartbeat，在链接时发起
      if(sendTimmer) {
        clearInterval(sendTimmer)
      }
    };
  };
  // 获取导航参数
  filterUrlParams = function() {
    const str = window.location.search.replace('?', '');
    const arr = str.split('&');
    const obj = {};
    arr.map(e => {
      const key = e.split('=');
      obj[key[0]] = key[1];
    });
    return obj;
  };
  // 根据socket返回值修改数据
  dealPageData = function(data) {
    // 获取男左女友
    var maleOnLeft = data.maleOnLeft
    var maleData = ''
    var femaleData = ''
    if(maleOnLeft === 1) {
      maleData = data.realDataList.length >= 1 ? data.realDataList[0] : {};
      femaleData = data.realDataList.length >= 2 ? data.realDataList[1] : {};
    } else {
      femaleData = data.realDataList.length >= 1 ? data.realDataList[0] : {};
      maleData = data.realDataList.length >= 2 ? data.realDataList[1] : {};
    }
    var thirdData = data.realDataList.length >= 3 ? data.realDataList[2] : {};
    var chargePerson = data.chargePersonList && data.chargePersonList.length
      ? data.chargePersonList[0]
      : {};
    var headTitle = data.toiletName
    // 处理头部数据
    dealHeader(headTitle)
    // 处理左侧男厕数据
    dealLeftData(maleData, maleOnLeft);
    // 处理右侧女厕数据
    dealRightData(femaleData, maleOnLeft);
    // 处理下面数据
    dealFooterData(chargePerson, thirdData, data.monthFlowNum, data.todayFlowNum);
    // 处理中间数据
    dealCenterData(
      data.positionPic,
      data.realDataList[0].freeIndicators,
      data.realDataList[0].totalIndicators,
      data.realDataList[1].freeIndicators,
      data.realDataList[1].totalIndicators,
      data.lastUpdateTime,
      data.realDataList.length > 2 ? data.realDataList[2].freeIndicators : [],
      data.realDataList.length > 2 ? data.realDataList[2].totalIndicators : [],
    );
    drawQrCode(data.toiletGrade, data.toiletId, data.toiletName);
  };
  // 处理头部数据
  dealHeader = function(headTitle) {
    var headerpart = document.querySelector('.headerPart');
    headerpart.innerHTML = `${headTitle || '智慧公厕'}`
    // headerpart.onclick = pageChange()
  };
  // 处理左侧数据
  dealLeftData = function(maleData, maleOnLeft) {
    var title = document.querySelector('.titleInfoMan')
    // var toiletInfoLeft = document.querySelector('.toiletInfoLeftMan')
    // 如果manOnLeft，则添加class
    if(!maleOnLeft) {
      title.className = 'titleInfo titleInfoMan titleInfoNv'
    } else {
      title.className = 'titleInfo titleInfoMan'
    }
    var tlp = document.querySelector('.tlp1')
    if(maleOnLeft) {
      tlp.style.color = '#5ED6FF'
    } else {
      tlp.style.color = '#FE60A3'
    }
    tlp.innerHTML = `
      ${maleData.freeNum || 0}
      <span>/${maleData.totalNum || 0}</span>
    `;
    var part2 = document.querySelector('.part21')
    part2.innerHTML = `<p>${maleData.todayFlowNum || 0}<i>次</i></p><p>${maleData.monthFlowNum || 0}<i>次</i></p>`;
    var colp1 = document.querySelector('.colp11')
    var colp2 = document.querySelector('.colp21')
    var colp3 = document.querySelector('.colp31')
    var colp4 = document.querySelector('.colp41')
    var colp5 = document.querySelector('.colp51')
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
  };
  dealRightData = function(femaleData, maleOnLeft) {
    var titleInfo = document.querySelector('.titleInfowoman');
    // var toiletInfoLeft = document.querySelector('.toiletInfoLeftWoman')
    if(maleOnLeft) {
      titleInfo.className = 'titleInfo titleInfowoman'
    } else {
      titleInfo.className = 'titleInfo titleInfowoman titleInfoman'
    }
    var tlp = document.querySelector('.tlp2')
    if(maleOnLeft) {
      tlp.style.color = '#FE60A3'
    } else {
      tlp.style.color = '#5ED6FF'
    }
    tlp.innerHTML = `
      ${femaleData.freeNum || 0}
      <span>/${femaleData.totalNum || 0}</span>
    `;
    var part2 = document.querySelector('.part22')
    part2.innerHTML = `<p>${femaleData.todayFlowNum || 0}<i>次</i></p><p>${femaleData.monthFlowNum || 0}<i>次</i></p>`
    var colp1 = document.querySelector('.colp12')
    var colp2 = document.querySelector('.colp22')
    var colp3 = document.querySelector('.colp32')
    var colp4 = document.querySelector('.colp42')
    var colp5 = document.querySelector('.colp52')
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
  };
  // 处理第三厕数据
  dealFooterData = function(chargePerson, thirdData, month, today) {
    var allp1 = document.querySelector('.allp1')
    var allp2 = document.querySelector('.allp2')
    allp1.innerHTML = `${today || 0}`
    allp2.innerHTML = `${month || 0}`
    var colp1 = document.querySelector('.colp13')
    var colp2 = document.querySelector('.colp23')
    var colp3 = document.querySelector('.colp33')
    var colp4 = document.querySelector('.colp43')
    var colp5 = document.querySelector('.colp53')
    var toiletBosscenter = document.querySelector('.toiletBosscenter')
    var guideBackGround = document.querySelector('.guideBackGround')
    var tipstop = document.querySelector('.tipstop')
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
  };
  // 获取年月日
  bjtime = function(){
    var myDate = new Date();
    var year = myDate.getFullYear();//获取年
    var month = myDate.getMonth() + 1;//获取月，默认从0开始，所以要加一
    var date = myDate.getDate();//获取日
    var hours = myDate.getHours();//获取小时
    var minutes = myDate.getMinutes();//获取分
    var seconds = myDate.getSeconds();//获取秒
    var weekend = myDate.getDay(); //获取星期几，这里获得到的是数字1-7，所以我下面自己new了一个数组把获取到的数字当下标
    var weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    var day = weeks[weekend]//这样就是显示的星期x了//这些if判断是在小于10的时候前面自动补0
    if (month<10) {month = '0'+month}
    if (date<10) {date = '0'+date}
    if (hours<10) {hours = '0'+hours}
    if (minutes<10) {minutes = '0'+minutes}
    if (seconds<10) {seconds = '0'+seconds}
    $('.timePart').html(
      // 'GMT+'+hours+':'+minutes+' '+year+'/'+month+'/'+date+' '+hours+':'+minutes+':'+seconds
      `${year}/${month}/${date}  ${day}  ${hours}:${minutes}:${seconds}`
      );};
    var timer = setInterval(function() {bjtime()},1000)
  // 处理中间空闲图片
  var updateTime = ''
  dealCenterData = function(img, point1, point1all, point2, point2all, lastTime, point3, point3all) {
    if(updateTime !== lastTime) {
      updateTime = lastTime
      var centerPart = document.querySelector('.guideBackGround');
      // 获取背景图片
      var imgback = `<img class="imgback" src="${img}" />`;
      var nanceAll = '';
      var nvceAll = '';
      var nanceFree = '';
      var nvceFree = '';
      var thirdFree = '';
      var thirdAll = '';
      // 获取 男厕全部
      for (var i = 0; i < point1all.length; i++) {
        if (point1all[i].position) {
          var arr = point1all[i].position.split(',');
          nanceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
            arr[1]
          )}px;" class="maleMarker"></div>`;
        }
      }
      // 获取女厕全部
      for (var i = 0; i < point2all.length; i++) {
        if (point2all[i].position) {
          var arr = point2all[i].position.split(',');
          nvceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
            arr[1]
          )}px;" class="femaleMarker"></div>`;
        }
      }
      // 获取第三厕全部
      for (var i = 0; i < point3all.length; i++) {
        if (point3all[i].position) {
          var arr = point3all[i].position.split(',');
          thirdAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
            arr[1]
          )}px;" class="thirdMarker"></div>`;
        }
      }
        // 获取男厕空闲
        for (var i = 0; i < point1.length; i++) {
          if (point1[i].position) {
            var arr = point1[i].position.split(',');
            nanceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px;" class="maleMarkerActive"></div>`;
          }
        }
        // 获取女厕空闲
        for (var i = 0; i < point2.length; i++) {
          if (point2[i].position) {
            var arr = point2[i].position.split(',');
            nvceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px;" class="femaleMarkerActive"></div>`;
          }
        }
        // 获取第三厕空闲
        for (var i = 0; i < point3.length; i++) {
          if (point3[i].position) {
            var arr = point3[i].position.split(',');
            thirdFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px;" class="thirdMarkerActive"></div>`;
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
      var centerPart = document.querySelector('.backInfo');
      // 获取背景图片
      var nanceAll = '';
      var nvceAll = '';
      var nanceFree = '';
      var nvceFree = '';
      var thirdFree = '';
      var thirdAll = '';
      // 获取 男厕全部
      for (var i = 0; i < point1all.length; i++) {
        if (point1all[i].position) {
          var arr = point1all[i].position.split(',');
          nanceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
            arr[1]
          )}px;" class="maleMarker"></div>`;
        }
      }
      // 获取女厕全部
      for (var i = 0; i < point2all.length; i++) {
        if (point2all[i].position) {
          var arr = point2all[i].position.split(',');
          nvceAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
            arr[1]
          )}px;" class="femaleMarker"></div>`;
        }
      }
      // 获取第三厕all
      for (var i = 0; i < point3all.length; i++) {
        if (point3all[i].position) {
          var arr = point3all[i].position.split(',');
          thirdAll += `<div style="left: ${Number(arr[0])}px;top: ${Number(
            arr[1]
          )}px;" class="thirdMarker"></div>`;
        }
      }
      // 获取男厕空闲
      for (var i = 0; i < point1.length; i++) {
        if (point1[i].position) {
          var arr = point1[i].position.split(',');
          nanceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
            arr[1]
          )}px;" class="maleMarkerActive"></div>`;
        }
      }
      // 获取女厕空闲
      for (var i = 0; i < point2.length; i++) {
        if (point2[i].position) {
          var arr = point2[i].position.split(',');
          nvceFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
            arr[1]
          )}px;" class="femaleMarkerActive"></div>`;
        }
      }
        // 获取第三厕空闲
        for (var i = 0; i < point3.length; i++) {
          if (point3[i].position) {
            var arr = point3[i].position.split(',');
            thirdFree += `<div style="left: ${Number(arr[0])}px;top: ${Number(
              arr[1]
            )}px;" class="thirdMarkerActive"></div>`;
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
  };
  startWebSocket();
  // 改变视频播放地址
  VideoPlay = function(data) {
    // 执行方法的时候，初始化
    var root = document.querySelector('.videoArea')
    root.innerHTML = `          <div class="VideoImg" style="display: none;">
    <img src="">
  </div>
  <video id="audio" class="video-player" style="object-fit:fill; display: block;"  autoplay>
    <source id="videoInner" src="" type="video/mp4">
  </video>`
    // 从data中分离出视频
    var Urls = []
    var Pics = []
    for(let i = 0; i < data.length; i++) {
      if(data[i].type === 'VIDEO') {
        Urls.push(`https://test${data[i].url}`)
      } else {
        Pics.push(`https://test${data[i].url}`)
      }
    }
    $('#audio').html('');
    var urlLen = Urls.length
    var currentIndex = 0
    var picLen = Pics.length
    // video.loop = false;
    if(urlLen) {
      var video = document.getElementById("audio")
      var imgArea = document.querySelector('.VideoImg')
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
            // for (var i = 0; i < picLen; i++) {
            //   (function (t) {   // 注意这里是形参
            //       setTimeout(function () {
            //         imgArea.innerHTML = `<img src="${Pics[i]}" />`
            //         console.log(Pics[i])
            //       }, 1000 * t);	// 还是每秒执行一次，不是累加的
            //   })(3)   // 注意这里是实参，这里把要用的参数传进去
            // }
            if(picLen) {
              for (var i=0; i<picLen; i++) {
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
      var video = document.getElementById("audio")
      var imgArea = document.querySelector('.VideoImg')
      imgArea.style.display = 'block';
      video.style.display = 'none';
  
      for (var i=0; i<picLen; i++) {
        task(i);
      }
      function task(i) {
        setTimeout( function () {
            if(i === (picLen-1)) {
              // 
              imgArea.innerHTML = `<img src="${Pics[i]}">`
              setTimeout(() => {
                for (var i=0; i<picLen; i++) {
                  task(i);
                }
              }, 10000)
            } else {
              imgArea.innerHTML = `<img src="${Pics[i]}">`
            }
        }, 10000 * i);
      }
    }

  }
  // 绘制二维码
  drawQrCode = function(grid,toiletId,toiletName) {
    // 评分
    var star = document.querySelectorAll('.star')
    var evaValue = document.querySelector('.evaValue')
    if(Number(grid) === 0) {
      for(var i = 0; i < 5; i++) {
        star[i].className = 'star starLight'
      }
      evaValue.innerHTML = `5分`
    } else {
      var aa1 = parseInt(Number(grid))
      for(var i = 0; i < aa1; i++) {
        star[i].className = 'star starLight'
      }
      if(Number(grid) > aa1){
        star[aa1].className = 'star starHarf'
        for(var i = aa1+1; i < 5; i++){
          star[i].className = 'star'
        }
      } else {
        for(var i = aa1; i < 5; i++){
          star[i].className = 'star'
        }
      }
      evaValue.innerHTML = `${grid}分`
    }
    // 二维码
    if(document.getElementById("qrCodeArea").innerHTML === '') {
      // var qrcode = new QRCode(document.getElementById("qrCodeArea"), {
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
  }
  // 走马灯更换
  changeText = function(text) {
    var marquee = document.querySelector('.footerpart')
    marquee.innerHTML = `<marquee class="footerP" behavior="scroll">${text || '文明如厕，请爱护公共卫生'}</marquee>`
  }
  // 刷新页面操作
  pageChange = function() {
    // 关闭socket
    ws.close()
    window.location.reload();
  }
});
