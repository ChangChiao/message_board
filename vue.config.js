const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './'
  // devServer: {
  //   host: '0.0.0.0',
  //   port: '8081',
  //   hot: true,
  //   https: false,
  //   headers: { 'Access-Control-Allow-Origin': '*' },
  //   devMiddleware: {
  //     publicPath: 'http://192.168.209.106:8081'
  //   }
  // }
});
