const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: { "crypto": false }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
