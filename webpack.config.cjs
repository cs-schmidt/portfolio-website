const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { SourceMapDevToolPlugin } = require('webpack');

// NOTE: `SourceMapDevToolPlugin` makes source maps even if `devtool` is omitted.

// Sets `contextPath` to the closest parent directory with a `package.json` file
// or `node_modules` folder. In most cases this would be the project root.
const contextPath = process.env.npm_config_local_prefix;
const maxInlineSize = 8192; // Maximum inlining asset size in KB.
const nodeEnv = process.env.NODE_ENV;
const isDevEnv = nodeEnv === 'development';

/** Webpack configuration object. */
module.exports = {
  // Controls what bundle information is shown in the console at build time.
  stats: 'normal',
  // Instructs webpack to generate runtime code for a specific environment.
  target: 'browserslist',
  // Enables webpack's built-in optimizations for each possible environment.
  mode: isDevEnv ? 'development' : 'production',
  // The directory where entry points and loaders are resolved relative to.
  context: contextPath,
  // Alters how modules are resolved.
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.jsx']
  },
  // Indicates which "module" Webpack should use to build the dependency graph.
  entry: './src/index.jsx',
  // Controls where bundles are emitted and how these files are named.
  output: {
    // Sets the path that webpack builds to.
    path: join(contextPath, 'public/'),
    // Controls if bundles include comments with information about contained
    // modules. This should be disabled in production.
    pathinfo: isDevEnv,
    // Sets the public URL of the output directory when referenced in a browser.
    // The value of this option is prefixed to every URL created by the runtime
    // or loaders.
    publicPath: 'auto',
    // Sets the filename of "initial" chunk files.
    filename: isDevEnv ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
    // Sets the filename of "non-initial" chunk files.
    chunkFilename: isDevEnv
      ? '[name].bundle.js'
      : '[name].[contenthash].bundle.js',
    // Controls "cleaning" of the output directory before each build.
    clean: true
  },
  // Controls if and how source maps are generated.
  devtool:
    nodeEnv === 'deployment'
      ? false
      : isDevEnv
      ? 'eval-source-map'
      : 'source-map',
  // Controls if and how source maps are generated.
  devServer: {
    port: 8080,
    // Opens default browser after the server has been started.
    open: true,
    // Enables webpack's Hot Module Replacement (HMR) feature. HMR adds,
    // removes, or exchanges modules while an app is running without reloading.
    hot: true,
    // Controls client settings.
    client: {
      // Sets logging level from server in client's browser.
      logging: 'info'
    }
  },
  // Controls how the different kinds of "modules" within a project are handled.
  module: {
    rules: [
      {
        test: /\.(?:[cm]js|jsx?)$/i,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(?:c|(?:s[ac]))ss$/i,
        use: [
          // Extracts CSS files into separate files, creating a CSS file per JS
          // file which contains CSS.
          MiniCSSExtractPlugin.loader,
          // Processes CSS files resolving `@import()` and `url()` calls.
          'css-loader',
          // Processes CSS files applying PostCSS transformations.
          'postcss-loader',
          // Processes SASS files compiling them to CSS files.
          'sass-loader'
        ]
      },
      {
        test: /\.glsl$/i,
        type: 'asset/source'
      },
      {
        test: /\.(?:bmp|webp|gif|jpeg|png|svg|avif|ico)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[hash][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: maxInlineSize
          }
        }
      }
    ]
  },
  // Lists the of third-party plugins which extend webpack's capabilities.
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: join(contextPath, 'src/index.html')
    }),
    new MiniCSSExtractPlugin({
      // Sets the filename of "initial" CSS chunks.
      filename: isDevEnv
        ? '[name].bundle.css'
        : '[name].[contenthash].bundle.css',
      // Sets the filename of "non-initial" CSS chunks.
      chunkFilename: isDevEnv
        ? '[name].bundle.css'
        : '[name].[contenthash].bundle.css'
    }),
    ...(isDevEnv
      ? // Development-specific env plugins.
        [
          // Enables "fast refresh" (a.k.a hot reloading) for react components.
          new ReactRefreshWebpackPlugin()
        ]
      : // Non-development env plugins.
        [
          new ProgressBarPlugin(),
          new CopyWebpackPlugin({
            patterns: [
              { from: join(contextPath, 'robots.txt'), to: 'robots.txt' }
            ]
          }),
          new CompressionWebpackPlugin({
            threshold: 860
          }),
          new BundleAnalyzerPlugin({
            analyzerMode: 'disable',
            generateStatsFile: true,
            statsFilename: '.info/bundle-stats.json'
          })
        ]),
    ...(nodeEnv !== 'deployment'
      ? // Non-deployment env plugins.
        [
          new SourceMapDevToolPlugin({
            filename: 'maps/[file].map'
          })
        ]
      : // Deployment-specific plugins.
        [])
  ]
};
