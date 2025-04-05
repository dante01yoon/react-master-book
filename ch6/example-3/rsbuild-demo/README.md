# RSBuild Demo - Modern React Build Tool with Tailwind CSS

This project demonstrates the capabilities of RSBuild, a next-generation build tool for React applications, and compares it with traditional build tools like Create React App (CRA) and webpack. It also showcases integration with Tailwind CSS.

## What is RSBuild?

[RSBuild](https://rsbuild.dev/) is a Rust-powered, high-performance build tool designed specifically for modern React applications. It provides a zero-config setup with significantly faster build times compared to JavaScript-based build tools.

Key features of RSBuild include:

- **Lightning-fast builds** powered by Rust (up to 10x faster than JS-based tools)
- **Zero-config** approach similar to CRA but with more flexibility
- **TypeScript** first-class support built-in
- **Optimized for React** and React Server Components
- **Built-in code splitting** and tree shaking
- **Hot Module Replacement** with minimal configuration
- **Bundle optimization** for smaller production builds
- **Tailwind CSS integration** with PostCSS support

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# IMPORTANT: RSBuild is a rapidly evolving tool, and API changes may occur between versions
# If you encounter errors related to configuration, you may need to update the RSBuild config
# or install specific versions:
npm install @rsbuild/core @rsbuild/plugin-react tailwindcss postcss autoprefixer

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle
npm run build:analyze
```

> **Note**: In newer versions of RSBuild, PostCSS support is built-in and doesn't require a separate plugin. The configuration has been updated to reflect this change.

## Demo Features

This demo showcases several key features of RSBuild:

1. **Performance Comparison**: Visual comparison of build times between RSBuild, CRA, and webpack
2. **Code Splitting**: Demonstrates automatic code splitting with lazy-loaded components
3. **Hot Module Replacement**: Make changes to components and see them update instantly without losing state
4. **TypeScript Support**: Built-in TypeScript handling without additional configuration
5. **Zero Config**: Minimal configuration required to get a powerful build setup
6. **Tailwind CSS Integration**: Modern utility-first CSS with RSBuild

## Tailwind CSS Integration

This project demonstrates how RSBuild seamlessly integrates with Tailwind CSS:

- **PostCSS Plugin**: RSBuild's PostCSS plugin provides support for Tailwind
- **Custom Theme**: Custom color palette and design tokens
- **Utility-First Design**: Components use Tailwind's utility classes
- **Performance**: RSBuild efficiently processes Tailwind's large CSS without performance issues

### Files for Tailwind Configuration

- `tailwind.config.js` - Main Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `src/styles/main.css` - CSS file with Tailwind directives
- `rsbuild.config.js` - RSBuild configuration with PostCSS plugin

## Project Structure

```
rsbuild-demo/
├── public/            # Static assets
├── src/               # Source code
│   ├── components/    # React components
│   ├── styles/        # CSS styles with Tailwind
│   ├── App.tsx        # Main application component
│   └── index.tsx      # Entry point
├── rsbuild.config.js  # RSBuild configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js  # PostCSS configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## Comparing with CRA and Webpack

### RSBuild vs Create React App

- **Build Speed**: RSBuild is significantly faster (often 10x or more)
- **Configuration**: Both offer zero-config setups, but RSBuild provides more flexibility to customize
- **TypeScript**: RSBuild has better integrated TypeScript support
- **Bundle Size**: RSBuild typically produces smaller bundles with better tree-shaking
- **HMR**: RSBuild offers faster hot module replacement
- **CSS Processing**: RSBuild handles Tailwind CSS more efficiently

### RSBuild vs Webpack

- **Build Speed**: RSBuild is much faster than webpack
- **Configuration**: RSBuild requires minimal configuration compared to webpack's complex setup
- **Learning Curve**: RSBuild is easier to learn and use
- **Ecosystem**: Webpack has a larger ecosystem of plugins and loaders
- **Optimization**: RSBuild handles many optimizations automatically that require manual configuration in webpack
- **PostCSS Integration**: RSBuild makes PostCSS and Tailwind setup simpler

## Performance Metrics

Based on a medium-sized React application with 50 components:

| Build Tool | Initial Build Time | Incremental Build | Dev Server Start |
|------------|-------------------|-------------------|------------------|
| RSBuild    | < 1 second        | ~100ms            | < 1 second       |
| CRA        | ~10-15 seconds    | ~1-2 seconds      | ~5 seconds       |
| Webpack    | ~20-30 seconds    | ~3-5 seconds      | ~10 seconds      |

## Troubleshooting

### Common Issues

1. **Configuration API changes**: RSBuild is actively developed and its API may change between versions. If you encounter configuration errors, check the [official documentation](https://rsbuild.dev/config/) for the most up-to-date configuration options.

2. **Source map errors**: If you see errors related to `devtool` or source maps, update the `sourceMap` configuration to use string values (e.g., `'source-map'` instead of `true`).

3. **Server configuration**: If you see server-related errors, ensure you're using the correct property names in the configuration. Some older versions used `dev` while newer versions use `server`.

4. **Tailwind CSS issues**: If Tailwind classes aren't applying, check that the PostCSS plugin is correctly configured and that your CSS file includes the Tailwind directives.

### Fixing TypeScript Errors

If you encounter TypeScript errors related to the RSBuild configuration, you might need to:

1. Install the exact versions of dependencies that are compatible with each other
2. Simplify the configuration to include only essential options
3. Use `// @ts-ignore` comments for type errors if necessary during development

## Learn More

- [RSBuild Documentation](https://rsbuild.dev/)
- [GitHub Repository](https://github.com/web-infra-dev/rsbuild)
- [Quick Start Guide](https://rsbuild.dev/guide/start/quick-start)
- [Configuration Reference](https://rsbuild.dev/config/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Features

- **Rust-Powered Performance**: Experience lightning-fast builds and hot module replacement
- **Zero Configuration**: Works out of the box with sensible defaults
- **React Optimized**: Fine-tuned for optimal React development experience
- **Modern CSS with Tailwind**: Utility-first CSS framework for rapid UI development
- **shadcn-inspired Theming**: Advanced theming system based on CSS variables with multiple themes
- **Dark Mode Support**: Toggle between light and dark modes with automatic preference detection

## Theming System

This project includes a comprehensive theming system inspired by the shadcn/ui design system:

- **Multiple Color Themes**: Choose between light, dark, blue, green, and purple themes
- **CSS Variables**: Uses HSL color format for flexible theming
- **ThemeProvider**: React context for managing theme state
- **Easy to Extend**: Simple process to add your own custom themes

For more information on how to use and extend the theming system, see the [Theming Guide](./docs/THEMING.md). 