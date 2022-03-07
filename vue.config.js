module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.ts',
    },
  },
  configureWebpack: {
    externals: {
      fs: "require('fs')",
    },
  },
};
