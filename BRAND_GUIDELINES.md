# Qyspo Brand Guidelines & Design System

## Design Implementation Prompt

When implementing any UI component or page for Qyspo, follow these brand guidelines to ensure consistency across the entire application. Use this document as a reference prompt for all design decisions.

## Core Design Profile

```json
{
  "designProfile": {
    "name": "Qyspo Tech SaaS Website",
    "style": "Modern & Minimalist Dark Mode",
    "description": "A sophisticated and modern dark-themed website design for a tech or SaaS company. It utilizes a high-contrast color palette with a vibrant accent color, elegant serif typography for headings, and clean sans-serif for body text to create a professional and focused user experience.",
    "colorPalette": {
      "primary": {
        "offBlack": {
          "hex": "#111111",
          "usage": "Overall page background"
        },
        "lightGray": {
          "hex": "#D9D9D9",
          "usage": "Main illustration card background"
        }
      },
      "accent": {
        "limeYellow": {
          "hex": "#E8FC6B",
          "usage": "Primary CTA buttons, news tags, and graphic highlights"
        },
        "duotonePink": {
          "hex": "#F008E1",
          "usage": "Duotone effect accent on image"
        },
        "duotoneBlue": {
          "hex": "#00C2FF",
          "usage": "Duotone effect accent on image"
        }
      },
      "text": {
        "primary": {
          "hex": "#F9F9F9",
          "usage": "Main headings, navigation links, primary text"
        },
        "secondary": {
          "hex": "#A0A0A0",
          "usage": "Subheadings, partner logos"
        },
        "onAccent": {
          "hex": "#111111",
          "usage": "Text on yellow buttons and tags"
        }
      }
    },
    "typography": {
      "headingFont": {
        "fontFamily": "Modern Serif (similar to Canela or a Garamond variant)",
        "style": "Regular, elegant",
        "size": "Very Large",
        "case": "Title Case",
        "usage": "Main hero text ('The Fastest Way...')"
      },
      "bodyFont": {
        "fontFamily": "Clean Sans-Serif (similar to Inter or Public Sans)",
        "style": "Regular",
        "size": "Medium",
        "case": "Sentence case",
        "usage": "Subheadings, descriptive text"
      },
      "uiFont": {
        "fontFamily": "Clean Sans-Serif (similar to Inter or Public Sans)",
        "style": "Medium, Bold",
        "size": "Small to Medium",
        "case": "Sentence case",
        "usage": "Navigation links, buttons, tags"
      }
    },
    "layout": {
      "grid": "Centered, single-column layout for hero content, with a two-column grid for feature showcases below.",
      "spacing": "Generous use of negative space to create a clean, uncluttered, and premium feel.",
      "header": {
        "components": ["Logo (left)", "Navigation (center)", "Primary CTA (right)"],
        "style": "Clean, single-row layout with wide, balanced spacing across the full width of the viewport."
      },
      "mainContent": "Large hero section with a heading, subheading, and CTA, followed by two large visual cards.",
      "footer": "A simple, single-row logo bar displaying partner or client logos in a monochrome style."
    },
    "uiComponents": {
      "buttons": [
        {
          "name": "Primary CTA (Filled)",
          "style": "Pill-shaped with a solid lime-yellow background, dark text, and a subtle glow effect.",
          "example": "'Subscribe — Our Plan' button"
        },
        {
          "name": "Secondary CTA (Ghost)",
          "style": "Pill-shaped with a thin, light-colored border, transparent background, and light text.",
          "example": "'Get Qyspo' button in the header"
        }
      ],
      "cards": [
        {
          "name": "Visual Feature Card",
          "style": "Large container with heavily rounded corners. Can contain either a stylized image or a minimalist illustration.",
          "content": "Used to showcase product features visually through imagery, UI mockups, and graphic elements.",
          "example": "The card with the duotone portrait and the gray card with line art."
        }
      ],
      "tags": {
        "name": "News Tag",
        "style": "Small, pill-shaped with a solid lime-yellow background and dark text. Includes a simple icon.",
        "example": "'News' tag above the main heading"
      }
    },
    "visualElements": {
      "iconography": {
        "style": "Minimalist, geometric, and monochrome.",
        "examples": ["Asterisk logo", "Icons within the feature card (video camera, plus symbol)", "Arrow in news tag"]
      },
      "imagery": {
        "style": "High-fashion, professional portraiture treated with a bold, two-color duotone effect (pink and blue).",
        "subjects": ["User portraits"]
      },
      "graphicElements": {
        "style": "Clean, minimalist line art used to illustrate concepts and workflows. Combined with mock UI elements.",
        "examples": ["The entire graphic on the right-hand card, including lines, dots, and UI popups."]
      },
      "effects": {
        "style": "A subtle glow or soft drop shadow is applied to primary CTA buttons to make them stand out. The duotone effect is the most prominent visual treatment."
      }
    },
    "overallAesthetic": {
      "mood": ["Sophisticated", "Modern", "Minimalist", "Professional", "Premium", "Tech-focused"],
      "shapes": "Characterized by soft, rounded forms (pill buttons, rounded cards) which contrast with the sharp, clean typography to create a balanced and modern feel."
    }
  }
}
```

## Implementation Guidelines

### Color Usage

**Primary Colors:**
- `#111111` - Main background for all pages
- `#1a1a1a` - Secondary background for cards and elevated surfaces
- `#E8FC6B` - Primary accent for CTAs, links, and emphasis
- `#F9F9F9` - Primary text color
- `#A0A0A0` - Secondary text color

**Color Rules:**
1. Never use pure black (#000000) or pure white (#FFFFFF)
2. Apply lime accent sparingly for maximum impact
3. Use transparency for subtle borders: `rgba(249, 249, 249, 0.1)` or `rgba(249, 249, 249, 0.2)`
4. Glow effects on primary buttons: `shadow-[0_0_20px_rgba(232,252,107,0.3)]`

### Typography

**Font Implementation:**
```css
/* Headings */
font-family: 'Playfair Display', serif;
font-weight: 400;

/* Body & UI */
font-family: 'Inter', sans-serif;
font-weight: 400, 500, 600;
```

**Type Scale:**
- Hero headings: `text-5xl md:text-6xl lg:text-[96px]`
- Page headings: `text-5xl md:text-6xl`
- Section headings: `text-2xl` to `text-3xl`
- Body text: `text-base` to `text-xl`
- Small text: `text-sm` to `text-xs`

### Component Patterns

**Buttons:**
```jsx
// Primary CTA
className="px-8 py-3 bg-[#E8FC6B] text-[#111111] rounded-full hover:bg-[#E8FC6B]/90 transition-all font-semibold shadow-[0_0_20px_rgba(232,252,107,0.3)]"

// Secondary/Ghost
className="px-6 py-2.5 border border-[#F9F9F9]/20 text-[#F9F9F9] rounded-full hover:border-[#E8FC6B] hover:text-[#E8FC6B] transition-all"
```

**Cards:**
```jsx
className="bg-[#1a1a1a] rounded-[32px] p-8 border border-[#F9F9F9]/10"
```

**Tags:**
```jsx
className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8FC6B] text-[#111111] rounded-full text-xs font-medium"
```

### Spacing System

- Use multiples of 4 for consistency: 4, 8, 12, 16, 24, 32, 48, 64, 96
- Page padding: `px-6` (24px)
- Section spacing: `py-20` to `py-32`
- Component spacing: `gap-4` to `gap-8`
- Max widths: 
  - Content: `max-w-[1200px]`
  - Text blocks: `max-w-[600px]` to `max-w-[1000px]`
  - Narrow content: `max-w-md` to `max-w-2xl`

### Border Radius

- Buttons & tags: `rounded-full`
- Large cards: `rounded-[32px]`
- Medium cards: `rounded-[24px]`
- Small elements: `rounded-xl` (12px) to `rounded-2xl` (16px)
- Inputs: `rounded-xl`

### Icons & Graphics

**Icon Style:**
- Stroke-based, not filled
- Stroke width: 1.5 to 2
- Geometric and minimalist
- Size: 12px, 16px, 20px, or 24px

**Logo:**
```jsx
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2"/>
  <circle cx="12" cy="12" r="3" fill="currentColor"/>
</svg>
```

### Animation & Transitions

- Default transition: `transition-all` or `transition-colors`
- Duration: 150ms for micro-interactions
- Hover states should be subtle
- Loading spinner: Rotating border with transparent top

### Accessibility

1. Maintain WCAG AA contrast ratios
2. Focus states must be visible (use lime accent)
3. Interactive elements minimum 44px touch target
4. Semantic HTML structure
5. Proper heading hierarchy

### Do's and Don'ts

**DO:**
- Use generous whitespace
- Keep interfaces clean and minimal
- Apply the lime accent strategically
- Maintain consistent border radius
- Use proper typography hierarchy

**DON'T:**
- Use multiple accent colors
- Create cluttered layouts
- Mix border radius styles
- Use pure black/white
- Apply effects excessively

## Component Library Reference

When building new components, reference these existing patterns:
- Navigation header with logo and CTAs
- Hero sections with large serif headings
- Feature cards with numbered badges
- Form inputs with rounded borders
- Modal dialogs with dark backgrounds
- Loading states with lime accent

## Usage Example

When creating a new component or page:

1. Start with the dark background (#111111)
2. Use Playfair Display for main headings
3. Apply Inter for body text and UI elements
4. Add lime accent (#E8FC6B) for primary actions
5. Use generous spacing (py-20, px-6)
6. Apply heavy border radius (32px) for cards
7. Keep borders subtle with transparency
8. Add glow effects to primary CTAs only

This design system creates a sophisticated, modern, and premium feel that positions Qyspo as a high-end SaaS solution.