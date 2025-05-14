const { join } = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { SourceMapDevToolPlugin } = require('webpack');

// NOTE: `SourceMapDevToolPlugin` makes source maps even if `devtool` is omitted.

// Sets `contextPath` to the closest parent dir with a `package.json` file or
// `node_modules` folder
const contextPath = process.env.npm_config_local_prefix;
const isDeployment = process.env.NODE_ENV === 'deployment';

/** Production configuration. */
module.exports = {
  // Enables built-in optimizations for each possible environment.
  mode: 'production',
  // Controls where bundles are emitted and how these files are named.
  output: {
    // Sets the filename of "initial" chunk files.
    filename: '[name].[contenthash].bundle.js',
    // Sets the filename of "non-initial" chunk files.
    chunkFilename: '[name].[contenthash].bundle.js',
    // Controls if bundles include comments with information about contained
    // modules. This should be disabled in production.
    pathinfo: false
  },
  // Controls if and how source maps are generated.
  devtool: !isDeployment ? 'source-map' : false,
  // Lists the of third-party plugins which extend Webpack's capabilities.
  plugins: [
    new ProgressBarPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: join(contextPath, 'robots.txt'), to: 'robots.txt' }]
    }),
    new CompressionWebpackPlugin({
      threshold: 860
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disable',
      generateStatsFile: true,
      statsFilename: '.info/bundle-stats.json'
    }),
    ...(!isDeployment
      ? [
          new SourceMapDevToolPlugin({
            filename: 'maps/[file].map'
          })
        ]
      : [])
  ]
};
