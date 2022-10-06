// postcss.config.js
module.exports = {
  plugins: {
    //   'autoprefixer': {
    //    // 当前px转rem的效果只作用于Android4.0及其以上版本,ios8以上版本
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
      propList: ['*'],
    },
  },
};