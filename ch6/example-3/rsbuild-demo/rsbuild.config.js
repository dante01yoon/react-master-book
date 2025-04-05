// RSBuild configuration in JavaScript format
// This can be more compatible with different RSBuild versions

const { defineConfig } = require('@rsbuild/core');
const { pluginReact } = require('@rsbuild/plugin-react');

// A minimal configuration for maximum compatibility
module.exports = defineConfig({
  plugins: [pluginReact()],
  tools: {
    postcss: {
      // PostCSS is now built into RSBuild
      postcssOptions: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    }
  },
  source: {
    entry: {
      index: './src/index.tsx'
    }
  }
}); 