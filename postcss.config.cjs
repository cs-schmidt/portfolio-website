const postcssNormalize = require('postcss-normalize');
const postcssPresetEnv = require('postcss-preset-env');
const cssnanoPlugin = require('cssnano');

/** PostCSS configuration object. */
module.exports = {
  // Lists the third-party plugins which extend postcss's capabilities.
  plugins: [
    postcssNormalize({
      // Automatically includes `normalize.css` in styles.
      forceImport: 'normalize.css'
    }),
    // Uses the build systems target environment to add polyfills to CSS
    // bundles. The `autoprefixer` utility is included within this plugin.
    postcssPresetEnv,
    // Used to minify CSS bundles.
    cssnanoPlugin({ preset: 'default' })
  ]
};
