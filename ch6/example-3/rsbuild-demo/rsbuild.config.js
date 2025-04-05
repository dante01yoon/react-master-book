// RSBuild configuration in JavaScript format
// This can be more compatible with different RSBuild versions

const { defineConfig } = require('@rsbuild/core');
const { pluginReact } = require('@rsbuild/plugin-react');

// A minimal configuration for maximum compatibility
module.exports = defineConfig({
  plugins: [pluginReact()],
  tools: {
    postcss: {
      // PostCSS는 이제 RSBuild에 내장되어 있습니다
      postcssOptions: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    },
    cssLoader: {
      // CSS 모듈 활성화
      modules: {
        auto: true,
        localIdentName: '[local]--[hash:base64:5]'
      }
    },
    bundlerChain: (chain, { CHAIN_ID }) => {
      // Lightning CSS 구성
      chain.module
        .rule(CHAIN_ID.RULE.CSS)
        .use(CHAIN_ID.USE.POSTCSS)
        .tap(options => {
          return {
            ...options,
            // Lightning CSS 변환 활성화
            lightningcss: {
              targets: {
                // Browserslist 구성을 통해 타겟 브라우저 설정 사용
                browsers: 'browserslist',
              },
              drafts: {
                // 새로운 CSS 기능 실험 활성화
                nesting: true,
                customMedia: true,
              },
            },
          };
        });
    }
  },
  source: {
    entry: {
      index: './src/index.tsx'
    }
  },
  output: {
    // 브라우저 호환성을 위한 코드 변환 설정
    polyfill: 'usage',
    targets: {
      browsers: ['> 0.5%', 'last 2 versions', 'not dead'],
    },
  },
}); 