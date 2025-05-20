const ws = require('ws');
const BaseServer = require('webpack-dev-server/lib/servers/BaseServer');
const ip = require('ip');
module.exports = class WebsocketServer extends BaseServer {
  constructor(server) {
    super(server);

    this.wsServer = new ws.Server({
      host: ip.address(),
      port: 7001
    });

    this.server.listeningApp.on('upgrade', (req, sock, head) => {
      if (!this.wsServer.shouldHandle(req)) {
        return;
      }

      this.wsServer.handleUpgrade(req, sock, head, (connection) => {
        this.wsServer.emit('connection', connection, req);
      });
    });

    this.wsServer.on('error', (err) => {
      this.server.log.error(err.message);
    });

    const noop = () => {};

    setInterval(() => {
      this.wsServer.clients.forEach((socket) => {
        if (socket.isAlive === false) {
          return socket.terminate();
        }

        socket.isAlive = false;
        socket.ping(noop);
      });
    }, this.server.heartbeatInterval);

    this.mobileLoginMsg = {
      type: 'debug',
      from: 'mobile',
      target: 'pc',
      data: { res: 'login' }
    }

    this.mobileLogoutMsg = {
      type: 'debug',
      from: 'mobile',
      target: 'pc',
      data: { res: 'logout' }
    }
  }

  send(connection, message) {
    // prevent cases where the server is trying to send data while connection is closing
    if (connection.readyState !== 1) {
      return;
    }

    connection.send(message);
  }

  close(connection) {
    connection.close();
  }

  // f should be passed the resulting connection and the connection headers
  onConnection(f) {
    this.wsServer.on('connection', (connection, req) => {
      const user = req.url.split('/')[1]
      connection.user = user;
      console.log(`用户连接: ${req.socket.remoteAddress}, ${connection.user}`)
      connection.isAlive = true;

      let mobileOnline = false
      /** 移动端设备登录或者pc端设备登录且当前有mobile设备正在连接，向pc设备发送信息 */
      if (user === 'mobile') {
        mobileOnline = true;
      } else if (user === 'pc') {
        this.wsServer.clients.forEach((socket) => {
          if (socket.user === 'mobile') {
            mobileOnline = true;
          }
        })
      }
      if (mobileOnline) {
        this.wsServer.clients.forEach((socket) => {
          if (socket.user === 'pc' && socket.readyState === ws.OPEN) {
            socket.send(JSON.stringify(this.mobileLoginMsg))
          }
        });
      }

      connection.on('pong', () => {
        connection.isAlive = true;
      });

      f(connection, req.headers);
      /** 收到信息后判断，来自pc或mobile的才进行处理 */
      connection.on('message', (data) => {
        if (connection.user === 'pc' || connection.user === 'mobile') {
          console.log('收到消息:', data, connection.user)
          /** pc发送的消息转发给mobile, mobile发送的消息转发给pc */
          const targetUser = connection.user === 'pc' ? 'mobile' : 'pc'
          try {
            const message = {
              type: 'debug',
              from: connection.user,
              target: targetUser,
              data: JSON.parse(data)
            }
            this.wsServer.clients.forEach((socket) => {
              if (socket.user === targetUser && socket.readyState === ws.OPEN) {
                socket.send(JSON.stringify(message))
              }
            });
          } catch (err) {
            console.log(`来自${req.socket.remoteAddress}用户${connection.user}的信息解析错误, ${err}`)
          }
        }
      })
      connection.on('close', () => {
        /** 移动端设备登出时，向pc设备发送信息 */
        if (connection.user === 'mobile') {
          this.wsServer.clients.forEach((socket) => {
            if (socket.user === 'pc' && socket.readyState === ws.OPEN) {
              socket.send(JSON.stringify(this.mobileLogoutMsg))
            }
          });
        }
        console.log(`用户断开: ${req.socket.remoteAddress}, ${connection.user}`)
      })
    });
  }

  onConnectionClose(connection, f) {
    connection.on('close', f);
  }
};
