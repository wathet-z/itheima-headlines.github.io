module.exports = {
  plugins: {
    //     'autoprefixer': {
    //     // 当前px转rem的效果只作用于Android4.0及其以上版本,ios8以上版本
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}