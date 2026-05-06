---
name: Industrial Precision
colors:
  surface: '#fbf8ff'
  surface-dim: '#dbd9e0'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2f9'
  surface-container: '#efedf4'
  surface-container-high: '#eae7ee'
  surface-container-highest: '#e4e1e8'
  on-surface: '#1b1b20'
  on-surface-variant: '#454651'
  inverse-surface: '#303035'
  inverse-on-surface: '#f2eff6'
  outline: '#767682'
  outline-variant: '#c6c5d2'
  surface-tint: '#4e59a1'
  primary: '#04115c'
  on-primary: '#ffffff'
  primary-container: '#1f2a71'
  on-primary-container: '#8a94e1'
  inverse-primary: '#bbc3ff'
  secondary: '#525a93'
  on-secondary: '#ffffff'
  secondary-container: '#b8c0ff'
  on-secondary-container: '#454c84'
  tertiary: '#361200'
  on-tertiary: '#ffffff'
  tertiary-container: '#572200'
  on-tertiary-container: '#d6865b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe0ff'
  primary-fixed-dim: '#bbc3ff'
  on-primary-fixed: '#030f5b'
  on-primary-fixed-variant: '#364087'
  secondary-fixed: '#dfe0ff'
  secondary-fixed-dim: '#bcc3ff'
  on-secondary-fixed: '#0c154c'
  on-secondary-fixed-variant: '#3b4279'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#723611'
  background: '#fbf8ff'
  on-background: '#1b1b20'
  surface-variant: '#e4e1e8'
typography:
  h1:
    fontFamily: DM Serif Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  h2:
    fontFamily: DM Serif Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.3'
  h3:
    fontFamily: DM Serif Display
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-mono:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.02em
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is engineered for the rigors of site management and industrial contracting. The brand personality is **authoritative, technical, and refined**, moving away from the "softness" of consumer SaaS toward the "density" of professional engineering tools. 

The visual style is a sophisticated blend of **Corporate Modernism** and **Technical Brutalism**. It prioritizes structural integrity over decorative flair, utilizing a strict "zero-shadow" policy to convey a flat, blueprint-inspired digital environment. The interface communicates high confidence through sharp borders and high-contrast typography, ensuring that site engineers and managers can parse complex data without visual fatigue.

## Colors

The palette is anchored by **Primary Navy**, a color of stability and institutional authority. This is used for the primary navigation sidebar and top-level headers. **Deep Navy Dark** is reserved strictly for interaction states (hovers and active toggles) to provide tactile feedback in a flat environment.

The background uses a cool-toned **Page BG** (#F0F4F8) to reduce glare and differentiate from the white card surfaces. Functional accents are highly targeted: **Accent Orange** is used exclusively for alerts and overdue items, while **Success Green** marks completed milestones. Text hierarchy is maintained through two distinct shades: a deep ink for readability and a muted slate for metadata.

## Typography

This design system utilizes a three-font strategy to separate intent:
1. **DM Serif Display**: Used for primary page titles and high-level headings. This provides a sophisticated, "editorial" feel to reports and dashboards.
2. **IBM Plex Sans**: The workhorse for all UI elements, inputs, and general body text. It is chosen for its exceptional legibility in dense layouts.
3. **IBM Plex Mono**: Reserved for all financial data, measurements, and Indian Rupee (₹) amounts. The monospaced alignment ensures that columns of numbers remain perfectly vertically aligned for quick comparison.

All typography should favor high density; line heights are kept tight to maximize the information visible on a single screen.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid Grid**. The primary sidebar is fixed at 240px, while the main content area utilizes a 12-column fluid grid. 

Spacing is based on a **4px base unit**. To achieve the "dense but clear" aesthetic:
- Use **16px gutters** between cards to maximize screen real estate.
- Use **12px or 16px internal padding** within cards.
- Align elements strictly to a vertical baseline to maintain the technical, blueprint feel.
- Group related data points using 8px spacing, and separate sections using 32px.

## Elevation & Depth

This design system eliminates all drop shadows. Depth is conveyed exclusively through **Tonal Layering and Borders**:

- **Level 0 (Base):** Page Background (#F0F4F8).
- **Level 1 (Content):** White Cards (#FFFFFF) with a 1px solid border (#D1D9E6).
- **Level 2 (Interaction):** Hover states on cards may change the border color to Primary Navy (#1F2A71), but the element does not "lift" off the page.

Separation between distinct UI sections is achieved by 1px dividers rather than whitespace, reinforcing the "industrial" feel.

## Shapes

The shape language is predominantly rectangular to reflect structural rigidity. 

- **Primary Radius**: 6px for main containers and cards.
- **Secondary Radius**: 4px for buttons, input fields, and status badges.
- **Sharp Corners**: Interactive elements like tabs or sidebar items should have 0px radius on the side where they "attach" to another surface to suggest a seamless mechanical fit.

## Components

### Buttons & Controls
- **Primary Button**: Solid Primary Navy (#1F2A71) with white IBM Plex Sans (Semi-Bold). No rounding beyond 4px.
- **Secondary Button**: 1px #D1D9E6 border with Primary Navy text.
- **Hover State**: Background shifts to Deep Navy Dark (#141C52).

### Status Badges
Badges must be rectangular with a subtle 4px corner radius. They use a light tint of their functional color (Success/Accent) for the background and a high-contrast dark version for text.

### Cards
Cards are the primary container. They must feature a 1px #D1D9E6 border. Headers within cards should have a subtle bottom border to separate titles from the body data.

### Data Grids
Tables should use IBM Plex Mono for all numeric columns. Header rows are Primary Navy with white text to provide a strong visual anchor for data-heavy views.

### Input Fields
Inputs use 1px #D1D9E6 borders. On focus, the border transitions to 1px Primary Navy. Use IBM Plex Sans for labels and IBM Plex Mono for fields requiring numeric entry (e.g., budget estimates).