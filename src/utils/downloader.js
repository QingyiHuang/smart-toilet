import { MessageBox } from 'hui';
import { formatDate } from '@/utils/common';
export default class Downloader {
  constructor(callBack) {
    let proxy = window.location.origin;
    if (process.env.NODE_ENV === 'development') {
      // 测试平台地址
      proxy = 'https://10.120.11.193';
    }
    this.proxy = proxy;
    // 连接中间件
    this.websocket = new WebSocket('wss://127.0.0.1:18001/WebS_Js');
    this.websocket.onopen = () => {
      // 连接成功后检测插件助手是否安装
      const sendMsg = {
        comment: { commenttype: 'checkapp', context: 'btoolsprotocol' }
      };
      this.websocket.send(JSON.stringify(sendMsg));
    };
    this.websocket.onmessage = evt => {
      const data = JSON.parse(evt.data);
      if (data.comment) {
        const { commenttype, context, resultCode } = data.comment;
        // resultCode 1-安装成功，0-安装失败
        const installed = resultCode === '1';
        if (commenttype === 'checkapp') {
          // 检测插件助手
          if (context === 'btoolsprotocol') {
            installed ? this.checkDownloader() : this.uninstallBtools();
          } else if (context === 'btooldownloadprotocol') {
            // 检测下载器
            if (installed) {
              callBack();
            } else {
              this.uninstallDownloader();
            }
          }
        }
      }
    };
    this.websocket.onerror = () => {
      this.uninstallBtools();
    };
  }

  uninstallDownloader() {
    // this.websocket.send(
    //   `{"comment":{"commenttype":"startapp", "context":"btooldownloadprotocol:", "commentcmd":"btooldownloadprotocol://language:zh_CN;CenterUrl:${this.proxy}"}}`
    // );
    MessageBox({
      title: '下载器未安装',
      type: 'error',
      message: '系统检测到未安装下载器，请到插件助手中安装，安装完成后请重试！'
    });
  }

  uninstallBtools() {
    MessageBox({
      title: '插件助手未安装',
      buttons: [
        { name: '下载', type: 'primary', action: 'download' },
        { name: '取消', type: 'default', action: 'cancel' }
      ],
      onConfirm: () => {
        const a = document.createElement('a');
        a.href = this.proxy + '/portal/out/getPackageById.do?id=btools';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      onCancel: () => {},
      type: 'error',
      message:
        '系统检测到未安装插件助手，请先下载并安装插件助手，安装完成后请重试！'
    });
  }

  downloadVideos(str) {
    const transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value = str; // 这里表示想要复制的内容
    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    transfer.blur();
    document.body.removeChild(transfer);
  }

  checkDownloader() {
    // 连接成功后检测插件助手是否安装
    const sendMsg = {
      comment: { commenttype: 'checkapp', context: 'btooldownloadprotocol' }
    };
    this.websocket.send(JSON.stringify(sendMsg));
  }

  startDownloader(dlSG, fileName) {
    const commentcmd = JSON.stringify(
      this.getCommentcmd(dlSG, btoa(JSON.stringify({ name: fileName })))
    );
    const params = {
      comment: {
        commenttype: 'startapp',
        context: 'btooldownloadprotocol',
        commentcmd
      }
    };
    this.websocket.send(JSON.stringify(params));
  }

  startApp() {
    const params = {
      comment: {
        commenttype: 'startapp',
        context: 'btooldownloadprotocol',
        commentcmd: ''
      }
    };
    this.websocket.send(JSON.stringify(params));
  }

  startDownloader1(dlSG, ids) {
    const commentcmd = JSON.stringify(
      this.getCommentcmd(
        dlSG,
        btoa(JSON.stringify(ids)),
        '/vehicle/alarm/video/download'
      )
    );
    const params = {
      comment: {
        commenttype: 'startapp',
        context: 'btooldownloadprotocol',
        commentcmd
      }
    };
    this.websocket.send(JSON.stringify(params));
  }

  // 获取启动播放器cmd
  getCommentcmd(dlSG, params, path = '/common/btools/download') {
    let postUrl = '';
    let origin = window.location.origin;
    // 使用今天作为默认保存文件夹，需要转成base64字符串
    const dlName = btoa(formatDate(new Date(), 10).replace(/\//g, ''));
    if (process.env.NODE_ENV === 'development') {
      // 测试平台地址
      origin = process.env.VUE_APP_IP;
    }
    postUrl = `${origin}${process.env.VUE_APP_CONTEXT}${path}`;
    return `btooldownloadprotocol://postUrl:${postUrl};proxy:${this.proxy};postFields:${params};dlName:${dlName};componentId:imuckcar;dlSG:${dlSG};language:zh_CN;`;
  }

  close() {
    if (this.websocket) {
      this.websocket.close();
    }
  }

  // 启动对讲助手
  startSpeekTool(param) {
    const {
      sg,
      protocol,
      multiRouteId,
      nginxIp,
      nginxPort,
      devIndex,
      TalkIndex,
      DisPlayInfo
    } = param;
    const cmd = `btoolsprotocol://CenterUrl:${protocol}://${nginxIp}:${nginxPort}/portal;Toollist:PROT_btoolvoicetalkprotocol;CmdLine:btoolvoicetalkprotocol://protocol:${protocol};NginxIp:${nginxIp};NginxPort:${nginxPort};UserID:admin;sg:${sg};MultiRouteId:${multiRouteId};Tgt:;TalkIndex:${TalkIndex};DevIndex:${devIndex};DisPlayInfo:${encodeURI(
      DisPlayInfo
    )};Language:zh_CN;`;
    const params = {
      comment: {
        commenttype: 'startapp',
        context: 'btoolsprotocol',
        commentcmd: cmd
      }
    };
    this.websocket.send(JSON.stringify(params));
  }
}
