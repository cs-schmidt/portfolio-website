const isDevEnv = process.env.NODE_ENV === 'development';

/** Babel configuration object */
module.exports = {
  // Lists the babel configurations we're inheriting properties from. Presets
  // are loaded after plugins, in an order of last to first.
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        useBuiltIns: 'usage',
        corejs: '3.26.1'
      }
    ],
    '@babel/preset-react'
  ],
  // Lists the third-party plugins which extend babel's capabilities. Plugins
  // run before presets, in an order of first to last.
  plugins: isDevEnv
    ? ['react-refresh/babel']
    : ['@babel/plugin-transform-runtime']
};
