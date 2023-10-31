const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

// Sets `contextPath` to the closest parent dir with a `package.json` file or
// `node_modules` folder
const contextPath = process.env.npm_config_local_prefix;
const maxInlineSize = 8192; // maximum size in KB where assets will be inlined
const isDevEnv = process.env.NODE_ENV === 'development';

/** Common configuration. */
const commonConfig = {
  // Controls what bundle information is shown in the console during builds.
  stats: 'normal',
  // Instructs Webpack to generate code for the environment specified.
  target: 'browserslist',
  // Directory where entry points and loaders are resolved relative to.
  context: contextPath,
  // Specifies the "module(s)" Webpack will use to build the dependency graph.
  entry: './src/index.jsx',
  // Controls where bundles are emitted and how these files are named.
  output: {
    // Sets the path that webpack builds to.
    path: join(contextPath, 'public/'),
    // Sets the public URL of the output directory when referenced in a browser.
    // The value of this option is prefixed to every URL created by the runtime
    // or loaders.
    publicPath: 'auto',
    // Controls "cleaning" of the output directory before each build.
    clean: true
  },
  // Alters how "modules" are resolved.
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.jsx']
  },
  // Controls how the different kinds of "modules" are handled.
  module: {
    // Specifies rules for handling different types of "modules".
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
        test: /\.(?:bmp|webp|gif|jpe?g|png|svg|avif|ico)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[hash][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: maxInlineSize
          }
        }
      },
      {
        test: /\.(?:woff2?|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: maxInlineSize
          }
        }
      }
    ]
  },
  // Lists the of third-party plugins which extend Webpack's capabilities.
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
    })
  ]
};

const envConfig = isDevEnv
  ? require('./webpack.development.cjs')
  : require('./webpack.production.cjs');

/** Webpack configuration object. */
module.exports = merge(commonConfig, envConfig);
