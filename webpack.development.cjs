const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

/** Development configuration. */
module.exports = {
  // Enables built-in optimizations for each possible environment.
  mode: 'development',
  // Controls where bundles are emitted and how these files are named.
  output: {
    // Sets the filename of "initial" chunk files.
    filename: '[name].bundle.js',
    // Sets the filename of "non-initial" chunk files.
    chunkFilename: '[name].bundle.js',
    // Controls if bundles include comments with information about contained
    // modules. This should be disabled in production.
    pathinfo: true
  },
  // Controls if and how source maps are generated.
  devtool: 'eval-source-map',
  // Provides configuration to `webpack-dev-server`.
  devServer: {
    // Selects the port the development server runs on.
    port: 8080,
    // Opens default browser after the server has been started.
    open: true,
    // Enables Webpack's Hot Module Replacement (HMR) feature. HMR adds,
    // removes, or exchanges modules while an app is running without reloading.
    hot: true,
    // Controls client settings.
    client: {
      // Sets logging level from server in client's browser.
      logging: 'info'
    }
  },
  // Lists the of third-party plugins which extend Webpack's capabilities.
  plugins: [
    // Enables "fast refresh" (a.k.a hot reloading) for react components.
    new ReactRefreshWebpackPlugin()
  ]
};
