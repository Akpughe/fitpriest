# The Fitness Priest - Design System

**Version**: 2.0.0
**Last Updated**: January 2025
**Inspired by**: Modern fitness coaching platforms with premium dark aesthetics

---

## 🎨 Color Palette

### Primary Colors

```css
--color-black: #000000        /* Pure black - primary dark backgrounds */
--color-white: #FFFFFF        /* Pure white - text on dark, light backgrounds */
```

### Accent Colors

```css
--color-orange-primary: #FF5722    /* Vibrant orange - primary CTAs, accents */
--color-orange-light: #FF7849      /* Light orange - hover states */
--color-orange-dark: #E64A19       /* Dark orange - active states */
--color-rust: #C1502E              /* Rust orange - gradients, overlays */
```

### Decorative Colors

```css
--color-gold: #D4AF37             /* Golden - decorative curves, accents */
--color-amber: #FFB347            /* Amber - subtle highlights */
```

### Background Colors

```css
--color-cream: #FAF8F5            /* Light cream - soft backgrounds */
--color-cream-dark: #F5F5F0       /* Darker cream - section dividers */
--color-gray-50: #FAFAFA          /* Lightest gray */
--color-gray-900: #0A0A0A         /* Near black - alternative dark bg */
```

### Usage Guide

- **Hero Sections**: Black background with white text
- **CTAs**: Orange primary for buttons and important actions
- **Decorative Elements**: Golden/amber curves and shapes
- **Cards**: White or cream backgrounds with subtle shadows
- **Overlays**: Black to rust gradient for depth

---

## 📝 Typography

### Font Families

**Primary Font**: Inter (fallback: system-ui, sans-serif)
- Modern, highly readable
- Excellent at all sizes
- Wide range of weights

**Alternative**: DM Sans or Poppins

### Font Scale

```css
/* Headings */
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
--text-4xl: 2.25rem     /* 36px */
--text-5xl: 3rem        /* 48px */
--text-6xl: 3.75rem     /* 60px */
--text-7xl: 4.5rem      /* 72px */
```

### Font Weights

```css
--font-normal: 400      /* Body text */
--font-medium: 500      /* Subheadings, emphasis */
--font-semibold: 600    /* Section headings */
--font-bold: 700        /* Important headings */
--font-extrabold: 800   /* Hero headings */
--font-black: 900       /* Extra impact */
```

### Typography Hierarchy

**Hero Heading (H1)**
- Size: 60-72px (text-6xl to text-7xl)
- Weight: 800-900 (extrabold to black)
- Line Height: 1.1
- Letter Spacing: -0.02em (tight)
- Color: White on dark, Black on light

**Section Heading (H2)**
- Size: 36-48px (text-4xl to text-5xl)
- Weight: 700-800 (bold to extrabold)
- Line Height: 1.2
- Color: Inherits

**Subsection Heading (H3)**
- Size: 24-30px (text-2xl to text-3xl)
- Weight: 600-700 (semibold to bold)
- Line Height: 1.3

**Body Text**
- Size: 16-18px (text-base to text-lg)
- Weight: 400-500 (normal to medium)
- Line Height: 1.6-1.8
- Color: Gray-700 on light, Gray-200 on dark

**Small Text**
- Size: 14px (text-sm)
- Weight: 400-500
- Line Height: 1.5

---

## 📐 Spacing System

### Scale (Tailwind Compatible)

```css
--space-0: 0
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */
--space-3: 0.75rem    /* 12px */
--space-4: 1rem       /* 16px */
--space-5: 1.25rem    /* 20px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
--space-20: 5rem      /* 80px */
--space-24: 6rem      /* 96px */
--space-32: 8rem      /* 128px */
```

### Layout Spacing

- **Section Padding (Vertical)**: 80px - 128px (py-20 to py-32)
- **Container Max Width**: 1280px (max-w-7xl)
- **Container Padding**: 24px - 48px (px-6 to px-12)
- **Card Padding**: 24px - 32px (p-6 to p-8)
- **Element Spacing**: 16px - 24px (gap-4 to gap-6)

---

## 🔘 Buttons

### Primary Button (CTA)

```css
Background: Orange Primary (#FF5722)
Text: White
Padding: 16px 32px (px-8 py-4)
Border Radius: 9999px (rounded-full) - Pill shape
Font Weight: 600 (semibold)
Font Size: 16px (text-base)
Hover: Lighten background to #FF7849
Active: Darken to #E64A19
Transition: All 200ms ease
```

**Example**: "Schedule a Consultation", "Get Started", "Download Here"

### Secondary Button (Outline)

```css
Background: Transparent
Border: 2px solid current color
Text: Orange or White (context dependent)
Padding: 14px 28px (to account for border)
Border Radius: 9999px (rounded-full)
Font Weight: 600
Hover: Fill with color, text inverts
```

### Ghost Button

```css
Background: Transparent
Text: Current color
Padding: 16px 32px
Border: None
Font Weight: 500
Hover: Subtle background (opacity 10%)
```

### Sizes

- **Small**: px-6 py-2, text-sm
- **Medium**: px-8 py-4, text-base (default)
- **Large**: px-10 py-5, text-lg

---

## 🎴 Cards & Containers

### Card Component

```css
Background: White or Cream
Border Radius: 16px - 24px (rounded-2xl to rounded-3xl)
Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Padding: 24px - 32px (p-6 to p-8)
Border: None or 1px solid rgba(0, 0, 0, 0.05)
```

### Stats Card

```css
Background: White
Border Radius: 20px (rounded-2xl)
Padding: 24px (p-6)
Shadow: Subtle
Icon: Orange circular background
Number: Large, bold (text-3xl to text-4xl)
Label: Small, gray (text-sm text-gray-600)
```

### Floating Badge

```css
Background: White or semi-transparent dark
Border Radius: 12px (rounded-xl)
Padding: 12px 20px
Shadow: Medium
Backdrop Blur: Optional for glass effect
```

---

## 🌊 Decorative Elements

### Curved Lines/Waves

- **Style**: Flowing, organic curves
- **Color**: Golden (#D4AF37) with low opacity (10-30%)
- **Width**: 2-4px
- **Placement**: Background layer, behind main content
- **Implementation**: SVG paths or CSS border-radius tricks

### Gradient Overlays

```css
/* Dark to Rust Gradient */
background: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0.8) 0%,
  rgba(193, 80, 46, 0.6) 100%
);

/* Black to Transparent */
background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0.9) 0%,
  rgba(0, 0, 0, 0) 100%
);
```

### Orange Accent Stripe

- **Height**: 60-120px
- **Color**: Orange Primary (#FF5722)
- **Usage**: Section dividers, visual breaks
- **Position**: Full-width horizontal

---

## 📱 Layout Patterns

### Hero Section (Split)

**Desktop (≥1024px)**:
```
[----------------------------------------]
|  Left (50%)          |  Right (50%)    |
|  - Heading           |  - Hero Image   |
|  - Subheading        |  - Decorative   |
|  - CTA Button        |                 |
[----------------------------------------]
```

**Mobile (<1024px)**:
```
[------------------]
|   Heading        |
|   Subheading     |
|   CTA Button     |
|   Image (full)   |
[------------------]
```

### Container Structure

```css
Max Width: 1280px (max-w-7xl)
Padding X: 24px mobile, 48px desktop (px-6 lg:px-12)
Margin: Auto centered (mx-auto)
```

### Grid Systems

**3-Column** (Features, Stats):
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Gap: 24px - 32px

**2-Column** (Content sections):
- Mobile: 1 column
- Desktop: 2 columns (60/40 or 50/50)

---

## 🎭 Component Library

### Navigation

```css
Background: Transparent or Black
Position: Fixed top
Height: 80px
Backdrop Blur: Optional when transparent
Logo: Left aligned
Nav Links: Center or Right
CTA Button: Orange, right aligned
```

### Avatar Group

```css
Display: Flex with negative margin overlap (-space-x-2)
Size: 40px - 48px (w-10 to w-12)
Border: 2px solid background color
Border Radius: Full (rounded-full)
Max Display: 3-4, then +N indicator
```

### Stat Badge

```css
Icon: Top or Left
Number: Large, bold, primary color
Label: Small, secondary color
Layout: Vertical or horizontal
```

### Social Icons

```css
Size: 20px - 24px
Color: White or current
Hover: Orange
Transition: 200ms
Spacing: 16px vertical gap
Position: Fixed left sidebar or footer
```

---

## 🎨 Effects & Interactions

### Shadows

```css
/* Subtle */
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

/* Medium */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* Large */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

/* Orange Glow (Hover) */
box-shadow: 0 0 20px rgba(255, 87, 34, 0.3);
```

### Transitions

```css
/* Fast */
transition: all 150ms ease;

/* Standard */
transition: all 200ms ease;

/* Slow */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover States

- **Buttons**: Scale slightly (scale-105), change background
- **Cards**: Lift with shadow, subtle transform
- **Links**: Color change, underline
- **Images**: Subtle zoom (scale-110) with overflow hidden

---

## 📐 Breakpoints

```css
/* Mobile First Approach */
sm: 640px    /* Small tablets */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large screens */
```

---

## ♿ Accessibility

### Color Contrast

- **White on Black**: 21:1 (AAA)
- **Black on White**: 21:1 (AAA)
- **Orange on White**: Ensure 4.5:1 minimum
- **White on Orange**: Ensure 4.5:1 minimum

### Focus States

```css
outline: 2px solid orange;
outline-offset: 2px;
```

### Interactive Elements

- Minimum touch target: 44x44px
- Clear focus indicators
- Keyboard navigation support
- ARIA labels where needed

---

## 🎯 Usage Examples

### Hero Section

```jsx
<section className="relative bg-black min-h-screen flex items-center overflow-hidden">
  {/* Decorative curves */}
  <div className="absolute inset-0 opacity-20">
    {/* SVG curves */}
  </div>

  <div className="container mx-auto px-6 lg:px-12">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
          Personalized Plans for Maximum Impact
        </h1>
        <button className="bg-orange-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-light transition">
          Schedule a Consultation
        </button>
      </div>
      <div>
        {/* Hero Image */}
      </div>
    </div>
  </div>
</section>
```

### Stats Card

```jsx
<div className="bg-white rounded-2xl p-6 shadow-md">
  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
    <IconComponent className="w-6 h-6 text-orange-primary" />
  </div>
  <div className="text-3xl font-bold text-black mb-1">120K+</div>
  <div className="text-sm text-gray-600">Active Users</div>
</div>
```

### Primary Button

```jsx
<button className="bg-orange-primary hover:bg-orange-light active:bg-orange-dark text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg">
  Get Started
</button>
```

---

## 📋 Design Principles

1. **Bold & Confident**: Use large, impactful typography
2. **High Contrast**: Black and white for maximum readability
3. **Strategic Color**: Orange as accent, not overwhelm
4. **Generous Space**: Let content breathe
5. **Premium Feel**: Quality over quantity
6. **Mobile-First**: Design for small screens, enhance for large
7. **Performance**: Optimize images, use system fonts when possible
8. **Consistency**: Reuse components, maintain patterns

---

## 🔄 Component Checklist

When creating new components, ensure:
- [ ] Follows color palette
- [ ] Uses design system spacing
- [ ] Responsive across all breakpoints
- [ ] Accessible (WCAG AA minimum)
- [ ] Consistent with existing patterns
- [ ] Smooth transitions/animations
- [ ] Proper typography hierarchy
- [ ] Testing on dark and light backgrounds

---

**End of Design System**
