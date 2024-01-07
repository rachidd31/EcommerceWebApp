// webpack.config.js
const path = require('path');

module.exports = {
  entry: 'C:\\Users\\Fujitsu LifeBook u\\Desktop\\Web Project\\E-Commerce-Store-main\\src\\app\\app.module.ts',  // Replace with your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
