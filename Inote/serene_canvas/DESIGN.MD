---
name: Serene Canvas
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464652'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#767683'
  outline-variant: '#c7c5d3'
  surface-tint: '#4f55ae'
  primary: '#4f55ae'
  on-primary: '#ffffff'
  primary-container: '#8e94f2'
  on-primary-container: '#232781'
  inverse-primary: '#bfc2ff'
  secondary: '#4a6545'
  on-secondary: '#ffffff'
  secondary-container: '#c9e8bf'
  on-secondary-container: '#4f6a49'
  tertiary: '#7b4d88'
  on-tertiary: '#ffffff'
  tertiary-container: '#bd8aca'
  on-tertiary-container: '#4c225a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bfc2ff'
  on-primary-fixed: '#02026b'
  on-primary-fixed-variant: '#373c95'
  secondary-fixed: '#ccebc2'
  secondary-fixed-dim: '#b1cfa7'
  on-secondary-fixed: '#082007'
  on-secondary-fixed-variant: '#334d2f'
  tertiary-fixed: '#fad7ff'
  tertiary-fixed-dim: '#eab4f7'
  on-tertiary-fixed: '#310540'
  on-tertiary-fixed-variant: '#61356f'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  h1:
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontSize: 1.875rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  label-caps:
    fontSize: 0.75rem
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  button:
    fontSize: 0.9375rem
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2.5rem
  layout_margin: 2rem
  gutter: 1rem
---

## Brand & Style

The brand personality is centered on tranquility, clarity, and intentionality. It is designed to reduce the cognitive load of the user, transforming note-taking from a chore into a reflective practice. The target audience includes creative professionals, students, and thinkers who value a "digital sanctuary" for their ideas.

The design system utilizes **Soft Minimalism**. It moves beyond cold, clinical minimalism by introducing warmth through organic curves and a palette inspired by nature. By emphasizing generous whitespace and a reduction of unnecessary borders, the UI allows the user’s content to breathe. The emotional response is one of calm focus, reliability, and subtle sophistication.

## Colors

The color strategy employs a muted Lavender as the primary driver for actions and brand presence. This is supported by a Sage Green for secondary accents (like success states or "done" tags) and a Soft Lilac for tertiary highlights. 

In Light Mode, the neutral palette avoids pure blacks, opting for deep slates to maintain a softer visual "thud." Dark Mode is engineered for high-quality contrast, utilizing deep navy-slates rather than pure black to prevent eye strain during late-night writing sessions. Lavender accents in dark mode are slightly desaturated to maintain accessibility and prevent "neon" vibrations against dark backgrounds.

## Typography

This design system utilizes **Plus Jakarta Sans** for its approachable, modern, and slightly rounded character, which reinforces the "soft" brand personality. 

To accommodate localization (TR, DE, EN, FR), line heights are set to a generous 1.5x minimum. This ensures that diacritics common in French and Turkish do not clash with descending characters on the line above. Furthermore, for German (DE), the typography scales are tested for long compound words, ensuring that H1 and H2 levels have enough horizontal clearance and appropriate hyphenation rules to prevent layout breaking.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** approach for desktop and tablet, centering the content to provide a focused writing environment. On mobile, the system transitions to a fluid model with a 16px safe-area margin. 

The spacing rhythm is built on an 8px base unit. To achieve the desired minimalist aesthetic, "Large" (1.5rem) and "Extra Large" (2.5rem) spacing units should be used frequently to separate distinct content blocks, while "Medium" (1rem) is reserved for internal component padding. This creates a clear visual hierarchy where the most important element—the note itself—is framed by significant whitespace.

## Elevation & Depth

Depth in this design system is conveyed through **Ambient Shadows** and **Tonal Layers**. Instead of harsh drop shadows, elements like cards and modals utilize extra-diffused, low-opacity shadows with a subtle Lavender tint (`rgba(142, 148, 242, 0.08)`). This makes the components feel as if they are floating gently above the surface rather than being forced into the foreground.

Surfaces use container tiers. A primary surface is the background; a secondary surface is a card; a tertiary surface might be a floating action button. In Dark Mode, elevation is communicated by lightening the surface color (Layer 1 is darkest, Layer 3 is lightest) to mimic physical light hitting objects closer to the viewer.

## Shapes

The shape language is consistently **Rounded** (Level 2). This eliminates "sharpness" from the interface, contributing to the soft, modern feel. 

Standard components like input fields and list items use the 0.5rem base radius. Larger containers, such as Note Cards or Sidebar panels, use the 1rem radius to emphasize their structural importance. The "full" pill-shape is reserved exclusively for tags/chips and primary action buttons, providing a distinct tactile quality that invites interaction.

## Components

- **Buttons:** Use a pill-shaped geometry. Primary buttons use the Lavender fill with white text. Secondary buttons use a Lavender-tinted ghost style (transparent fill with a subtle 1px border).
- **Cards:** White or deep-slate backgrounds with a `radius-lg` and an ambient shadow. No borders.
- **Input Fields:** Soft gray backgrounds (`accent_subtle`) with no border in their default state. Upon focus, they transition to a 1.5px Lavender border with a soft outer glow.
- **Chips/Tags:** Used for categorization. These should be pill-shaped with Sage Green or Lilac backgrounds at 15% opacity and full-saturation text for readability.
- **Lists:** Note lists should have generous vertical padding (12px) between items. Use a subtle `accent_subtle` background hover state with `radius-base`.
- **Editor:** The core note-taking area should be completely free of chrome, using only typography and spacing to define hierarchy.
- **Sidebar:** A translucent, slightly blurred (backdrop-filter) panel that provides a clear sense of location without feeling heavy.