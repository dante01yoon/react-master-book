# Integrating Tailwind CSS with RSBuild

This document explains how to integrate Tailwind CSS with RSBuild for modern React applications.

## What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom user interfaces directly in your markup. Instead of pre-designed components, Tailwind provides low-level utility classes that you can compose to build any design.

## Setting Up Tailwind CSS with RSBuild

RSBuild provides easy integration with Tailwind CSS through its PostCSS plugin. Here's how to set it up:

### 1. Install Dependencies

First, install the necessary dependencies:

```bash
npm install --save-dev @rsbuild/plugin-postcss tailwindcss postcss autoprefixer
```

### 2. Configure RSBuild

Update your `rsbuild.config.js` to include the PostCSS plugin:

```js
const { defineConfig } = require('@rsbuild/core');
const { pluginReact } = require('@rsbuild/plugin-react');
const { pluginPostcss } = require('@rsbuild/plugin-postcss');

module.exports = defineConfig({
  plugins: [
    pluginReact(),
    pluginPostcss({
      // PostCSS configuration is in postcss.config.js
    })
  ],
  // ... other configuration options
});
```

### 3. Create PostCSS Config

Create a `postcss.config.js` file in your project root:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 4. Create Tailwind Configuration

Create a `tailwind.config.js` file in your project root:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Your custom theme configuration
    },
  },
  plugins: [],
};
```

### 5. Add Tailwind Directives to CSS

In your main CSS file (e.g., `src/styles/main.css`), add the Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles here */
```

### 6. Import the CSS in Your Entry Point

Import the CSS file in your main JavaScript/TypeScript entry point:

```jsx
import './styles/main.css';
```

## Customizing Tailwind with RSBuild

### Theme Customization

You can customize Tailwind's default theme in the `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1',
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
        // other custom colors
      },
      // other theme customizations
    },
  },
  plugins: [],
};
```

### Using Tailwind's Layer Directive

You can use Tailwind's `@layer` directive to add custom component styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-4 py-2 rounded-md;
  }
  
  /* other component classes */
}
```

## Performance Considerations

### JIT Mode

Tailwind CSS uses JIT (Just-In-Time) mode by default since version 3.0, which significantly improves build performance. This works particularly well with RSBuild's Rust-powered toolchain.

### Purging Unused CSS

The `content` option in `tailwind.config.js` tells Tailwind which files to scan for class names. This ensures that only the CSS classes you use in your project are included in the final bundle.

### Production Builds

RSBuild will automatically optimize your CSS for production, including minification and purging of unused styles, resulting in a much smaller CSS file.

## Example Component with Tailwind

Here's an example of a React component using Tailwind CSS:

```jsx
import React from 'react';

const Button = ({ children, variant = 'primary', onClick }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white',
    outline: 'border border-primary text-primary hover:bg-primary-light hover:text-white',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

## Advantages of Using Tailwind with RSBuild

1. **Fast Development**: Combine RSBuild's fast builds with Tailwind's utility-first approach for rapid UI development
2. **Performance**: RSBuild efficiently processes Tailwind's CSS
3. **Modern DX**: Both tools are designed for modern developer experience
4. **Responsive Design**: Easily create responsive designs using Tailwind's responsive utilities
5. **Type Safety**: Work with TypeScript and get autocompletion with Tailwind IntelliSense extension

## Troubleshooting

### Classes Not Applying

If Tailwind classes aren't being applied, check:
- The PostCSS plugin is correctly configured in RSBuild
- Your CSS file includes the Tailwind directives
- The content paths in `tailwind.config.js` are correct

### Build Performance Issues

If you experience slow builds with Tailwind:
- Ensure you're using Tailwind v3.0+ which has JIT mode enabled by default
- The `content` array in `tailwind.config.js` is not too broad
- Consider using more specific paths in the `content` array

## Conclusion

Integrating Tailwind CSS with RSBuild provides a powerful and efficient workflow for building modern React applications. The combination offers the performance benefits of RSBuild's Rust-powered toolchain and the utility-first approach of Tailwind CSS. 