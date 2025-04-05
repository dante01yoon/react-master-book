# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Vite Performance Examples

This project demonstrates two key performance features of Vite:

1. **Dependency Pre-bundling**
2. **On-Demand Transpilation**

## Dependency Pre-bundling

Vite pre-bundles dependencies using esbuild, which is 10-100x faster than traditional JavaScript-based bundlers. This significantly improves development server start time.

### What it does:
- Converts CommonJS/UMD modules to ESM for browser compatibility
- Merges multiple small packages into a single HTTP request
- Caches pre-bundled dependencies for faster startup

### How to observe:
1. Start the development server: `npm run dev`
2. Open browser developer tools (Network tab)
3. Notice how dependencies are served as pre-bundled files
4. Check `.vite/deps` folder in `node_modules` to see cached pre-bundled files

## On-Demand Transpilation

Vite transpiles source code on-demand when requested by the browser. This eliminates the need to rebuild the entire bundle after changes.

### What it does:
- Only transpiles files that are currently imported
- Leverages browser's native ES modules to enable HMR (Hot Module Replacement)
- Transforms files only when they're requested by the browser

### How to observe:
1. Start the development server: `npm run dev`
2. Open browser developer tools (Network tab)
3. Navigate between pages/components
4. Notice how source files are loaded on-demand as they're needed

## Examples in this Project

- **DependencyExample.tsx**: Imports multiple third-party libraries to demonstrate pre-bundling
- **LazyLoadExample.tsx**: Demonstrates on-demand loading of components
- **DynamicImportExample.tsx**: Shows how dynamic imports are handled efficiently

## Running the Examples

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit the displayed URL in your browser and use the navigation links to explore examples.
