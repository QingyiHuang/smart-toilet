// vue.config.js
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/ptsa" : "/",
  outputDir: "dist", // 打包的目录
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  //代理服务  配置项目跨域用到
  devServer: {
    open: true, // 启动服务后是否打开    浏览器
    // host: "192.168.191.1",
    host: "0.0.0.0",
    port: 5705, // 服务端口
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      "/ptsa": {
        // target: 'http://10.196.74.102:17211/ptsa/',
        // target: "http://10.196.74.23:9831/ptsa/",
        target: "http://10.196.74.219:9831/ptsa/",
        // ws: true, // proxy websockets
        changeOrigin: true,
        pathRewrite: {
          "^/ptsa": "" // 设置过滤关键字api ，
          //   '^/': ''  // 设置过滤关键字为空 ，
        }
      }
    }
  },
  // module: {
  //   rules: [{
  //     test: /\.(woff2?|eot|ttf|otf|ttc)(\?.*)?$/,
  //     loader: 'url-loader',
  //   }]
  // },
  // css: {
  //   loaderOptions: {
  //       sass: {
  //           prependData: `@import "~@/assets/scss/_variable.scss";`
  //       }
  //   }
  // },
};