module.exports = {
  configureWebpack: {
    externals: {
      fs: "require('fs')",
      electron: "require('electron')",
      typeorm: 'commonjs typeorm',
      sqlite3: 'commonjs sqlite3',
    },
  },
};
