const env = process.env.NODE_ENV;
const isDev = env === 'development';
const page = isDev ? 'index.html' : 'index.ftlh';
const projectThemeEntry = './src/style/project.scss';

const main = {
  indexPath: page,
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .oneOf('svg')
      .resourceQuery(/svg/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('sprite')
      .resourceQuery(/raw/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
      .end()
      .oneOf('img')
      .resourceQuery(/img/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        name: 'static/img/[name].[hash:8].[ext]'
      })
      .end()
      .end()
      .oneOf()
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'static/file/[name].[ext]'
      });
    config.entry('main').add('babel-polyfill');
    config.plugin('html').tap(args => {
      let meta = {
        _csrf: {
          name: '_csrf',
          content: '${(_csrf.token)!}'
        },
        lang: {
          name: 'lang',
          language: '{{ helper.lang() }}'
        },
        skin: {
          name: 'skin',
          skin: '{{ helper.skin() }}'
        }
      };
      if (isDev) {
        meta = '';
      }
      args[0].meta = meta;
      return args;
    });
    // config.module
    // .rule('vue')
    // .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap(options => {
    //     // 修改它的选项...
    //     return options
    //   })
  },
  publicPath: isDev ? '/' : process.env.VUE_APP_CONTEXT,
  assetsDir: process.env.VUE_APP_ASSETS,
  outputDir: 'dist',
  runtimeCompiler: true,
  // 默认babel-loader会忽略node_modules中的文件，需要转化的在此处填写
  transpileDependencies: [/@hui-pro/, /hui/],
  // 用于开发环境下与后端联调
  devServer: {
    proxy: {
      [`${process.env.VUE_APP_API_PREFIX}/*`]: {
        target: 'http://test.com',
        changeOrigin: true
      },
      '/hmap-server': {
        target: 'http://test.com',
        changeOrigin: true,
        // secure: true,
        ws: true
      },
      '^/ocos/ui/': {
        target: 'http://test.com', //
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          outputStyle: 'expanded'
        }
      }
    }
  },
  configureWebpack: {
    entry: isDev ? [projectThemeEntry, './src/main'] : './src/main'
  }
};

module.exports = main;
