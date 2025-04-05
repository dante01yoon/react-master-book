# Theming Guide for RSBuild + Tailwind CSS + shadcn/ui

This project implements a theming system based on the [shadcn/ui](https://ui.shadcn.com/) design system using CSS variables and Tailwind CSS. This guide explains how the theming works and how to add your own custom themes.

## How Theming Works

Our theming system uses:

1. **CSS Variables**: Defined in `src/styles/themes.css` using HSL color format
2. **Tailwind Configuration**: Maps these variables to Tailwind classes in `tailwind.config.js`
3. **Theme Provider**: React context for managing theme state in `src/components/ThemeProvider.tsx`
4. **Theme Switcher**: UI component allowing users to change themes in `src/components/ThemeSwitcher.tsx`

### Key Components

- **Base theme**: Defined in `:root` selector with light mode colors
- **Dark mode**: Defined in `.dark` class
- **Color themes**: Defined as additional classes like `.theme-blue`, `.theme-green`, etc.

## Adding a New Theme

### 1. Update the `themes.css` file

Add your new theme class following the template provided in the file:

```css
/* My Custom Theme */
.theme-custom {
  --primary: 340 82% 52%;
  --primary-foreground: 355 100% 97%;
  --secondary: 340 62% 42%;
  --secondary-foreground: 355 100% 97%;
  --accent: 340 88% 77%;
  --accent-foreground: 340 62% 32%;
  --ring: 340 82% 52%;
  
  /* Optional: Override other variables as needed */
  /* --background: 0 0% 100%; */
  /* --foreground: 340 10% 4%; */
}
```

### 2. Update the Theme Types

In `src/components/ThemeProvider.tsx`, update the `Theme` type to include your new theme:

```typescript
type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'custom';
```

### 3. Add the Theme to the Switcher

In `src/components/ThemeSwitcher.tsx`, add a new theme button for your custom theme:

```tsx
<ThemeButton
  theme="custom"
  currentTheme={theme}
  onClick={() => setTheme('custom')}
  className="bg-[#e9116f]" // Use a representative color
  disabled={theme === 'dark'}
/>
```

## Designing Effective Themes

When creating themes, consider these guidelines:

1. **Maintain Contrast**: Ensure text remains readable against backgrounds
2. **Use HSL Format**: HSL makes it easier to maintain color relationships
3. **Test Both Light and Dark Modes**: Ensure your theme works well in both modes
4. **Consider Accessibility**: Maintain WCAG 2.1 AA contrast ratios (at least 4.5:1 for normal text)

## Recommended HSL Color Generation Tools

- [HSL Color Picker](https://hslpicker.com/)
- [Coolors](https://coolors.co/)
- [ColorSpace](https://mycolor.space/)

## Advanced: Creating Component-Specific Themes

For more granular control, you can create component-specific themes by combining Tailwind and your theme variables:

```tsx
<div className="bg-primary text-primary-foreground p-4 rounded-md">
  This will adapt to any theme automatically!
</div>
```

## Examples

Here are some example themes with different color schemes:

### Warm Theme

```css
.theme-warm {
  --primary: 20 90% 50%;
  --primary-foreground: 0 0% 98%;
  --secondary: 30 80% 60%;
  --secondary-foreground: 20 10% 10%;
  --accent: 40 100% 70%;
  --accent-foreground: 20 10% 10%;
  --ring: 20 90% 50%;
}
```

### Cool Theme

```css
.theme-cool {
  --primary: 200 80% 50%;
  --primary-foreground: 0 0% 98%;
  --secondary: 190 70% 60%;
  --secondary-foreground: 200 10% 10%;
  --accent: 210 100% 70%;
  --accent-foreground: 200 10% 10%;
  --ring: 200 80% 50%;
}
```

## Further Reading

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Theming Guide](https://ui.shadcn.com/docs/theming)
- [HSL Color Model](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl) 