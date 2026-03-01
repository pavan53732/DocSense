# DocSense Design System Documentation

## Color Palette

### Primary Colors
```css
/* Primary Brand Colors */
--primary: hsl(221, 83%, 53%);
--primary-foreground: hsl(0, 0%, 100%);

/* Secondary Colors */
--secondary: hsl(225, 22%, 16%);
--secondary-foreground: hsl(0, 0%, 100%);

/* Accent Colors */
--accent: hsl(262, 75%, 60%);
--accent-foreground: hsl(0, 0%, 100%);
```

### Status Colors
```css
/* Success/Green */
--success: hsl(142, 58%, 42%);
--success-foreground: hsl(0, 0%, 100%);

/* Warning/Orange */
--warning: hsl(38, 92%, 55%);
--warning-foreground: hsl(0, 0%, 0%);

/* Destructive/Error/Red */
--destructive: hsl(0, 65%, 48%);
--destructive-foreground: hsl(0, 0%, 100%);

/* Info/Blue */
--info: hsl(210, 80%, 58%);
--info-foreground: hsl(0, 0%, 100%);
```

### Neutral Colors
```css
/* Background */
--background: hsl(225, 28%, 9%);
--foreground: hsl(0, 0%, 100%);

/* Card */
--card: hsl(225, 22%, 16%);
--card-foreground: hsl(0, 0%, 100%);

/* Surface */
--surface-elevated: hsl(225, 25%, 12%);

/* Borders */
--border: hsl(225, 22%, 16%);
--input: hsl(225, 22%, 16%);

/* Muted */
--muted: hsl(225, 22%, 16%);
--muted-foreground: hsl(215, 15%, 50%);
```

## Typography

### Font Family
```css
--font-sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Font Sizes
```css
/* Headings */
h1: text-2xl font-bold (24px)
h2: text-xl font-bold (20px)
h3: text-lg font-bold (18px)

/* Body */
body: text-base (16px)
small: text-sm (14px)
caption: text-xs (12px)

/* Labels */
label: text-[9px] font-bold uppercase tracking-widest
stat-value: text-2xl font-bold font-mono
```

### Font Weights
- **Light:** 300
- **Regular:** 400
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700

## Spacing System

### Base Unit
```css
--base-unit: 4px;
```

### Spacing Scale
```css
0: 0px
0.5: 2px
1: 4px
1.5: 6px
2: 8px
2.5: 10px
3: 12px
3.5: 14px
4: 16px
5: 20px
6: 24px
7: 28px
8: 32px
9: 36px
10: 40px
12: 48px
14: 56px
16: 64px
20: 80px
24: 96px
```

## Border Radius

### Standard Radii
```css
sm: 2px
default: 4px
md: 6px
lg: 8px
xl: 12px
2xl: 16px
full: 9999px
```

## Shadows

### Elevation System
```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

## Component Design Patterns

### Cards
```css
.card {
  border-radius: 12px;
  border: 1px solid hsl(225, 22%, 16%);
  background: hsl(225, 22%, 16%);
  padding: 20px;
  transition: all 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  border-color: hsl(221, 83%, 53%);
}
```

### Buttons
```css
.button-base {
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
}

.button-primary {
  background: hsl(221, 83%, 53%);
  color: white;
}

.button-secondary {
  background: hsl(225, 22%, 16%);
  color: white;
  border: 1px solid hsl(225, 22%, 16%);
}

.button-hover:hover {
  background: hsl(221, 83%, 45%);
  transform: translateY(-1px);
}
```

### Input Fields
```css
.input {
  border-radius: 6px;
  border: 1px solid hsl(225, 22%, 16%);
  background: hsl(225, 28%, 9%);
  padding: 8px 12px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: hsl(221, 83%, 53%);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

## Animation System

### Timing Functions
```css
transition-fast: 150ms
transition-normal: 200ms
transition-slow: 300ms
```

### Easing Functions
```css
ease-in: cubic-bezier(0.4, 0, 1, 1)
ease-out: cubic-bezier(0, 0, 0.2, 1)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Framer Motion Presets
```javascript
// Fade in animations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Slide animations
const slideIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

// Staggered animations
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};
```

## Iconography

### Icon Sizes
```css
icon-xs: w-3 h-3 (12px)
icon-sm: w-4 h-4 (16px)
icon-md: w-5 h-5 (20px)
icon-lg: w-6 h-6 (24px)
icon-xl: w-8 h-8 (32px)
```

### Icon Colors
```css
.text-primary: hsl(221, 83%, 53%)
.text-success: hsl(142, 58%, 42%)
.text-warning: hsl(38, 92%, 55%)
.text-destructive: hsl(0, 65%, 48%)
.text-accent: hsl(262, 75%, 60%)
.text-muted-foreground: hsl(215, 15%, 50%)
```

## Chart Color Schemes

### Severity Colors
```javascript
const SEVERITY_COLORS = {
  critical: "hsl(0, 65%, 48%)",    // Red
  high: "hsl(38, 92%, 55%)",       // Orange
  medium: "hsl(187, 85%, 48%)",    // Cyan
  low: "hsl(215, 15%, 50%)"        // Gray
};
```

### Category Colors
```javascript
const CATEGORY_COLORS = [
  "hsl(187, 85%, 48%)",  // Cyan
  "hsl(262, 75%, 60%)",  // Purple
  "hsl(142, 58%, 42%)",  // Green
  "hsl(38, 92%, 55%)",   // Orange
  "hsl(0, 65%, 48%)",    // Red
  "hsl(210, 80%, 58%)",  // Blue
  "hsl(330, 70%, 55%)",  // Pink
  "hsl(170, 60%, 45%)"   // Teal
];
```

## Data Visualization Guidelines

### Chart Dimensions
- **Height:** 200px for most charts
- **Width:** 100% responsive containers
- **Padding:** 10px margins

### Tooltip Styling
```css
.tooltip {
  background: hsl(225, 28%, 9%);
  border: 1px solid hsl(225, 22%, 16%);
  border-radius: 8px;
  font-size: 12px;
}
```

### Legend Styling
```css
.legend {
  font-size: 10px;
}
```

## Responsive Breakpoints

### Tailwind Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Grid Behavior
```css
/* Statistics Grid */
sm: grid-cols-2
md: grid-cols-3
lg: grid-cols-6

/* Chart Grid */
lg: grid-cols-2
xl: grid-cols-3
```

## Accessibility

### Focus States
```css
.focus-ring {
  outline: 2px solid hsl(221, 83%, 53%);
  outline-offset: 2px;
}
```

### Contrast Ratios
- **Text:** Minimum 4.5:1 contrast ratio
- **Large Text:** Minimum 3:1 contrast ratio
- **Interactive Elements:** Clear focus indicators

### Screen Reader Support
- Proper semantic HTML structure
- ARIA labels for interactive elements
- Descriptive alt text for images
- Logical tab order

This design system ensures consistency across all UI components and provides a foundation for maintaining visual harmony throughout the application.