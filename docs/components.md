# Component Library

This project uses a modular component architecture built on top of Tailwind CSS. Components are categorized into UI primitives, layout structures, and feature-specific components.

## UI Primitives (`src/components/UI`)

The UI directory contains low-level, reusable components that form the building blocks of the interface.

- **[Button](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/UI/Button.tsx)**: The primary button component supporting multiple variants (`primary`, `secondary`, `outline`), sizes, and loading states.
- **[SecondaryButton](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/UI/SecondaryButton.tsx)**: A pre-configured secondary action button with a specific hover and active state.
- **[SectionTitle](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/UI/SectionTitle.tsx)**: Standardized header for sections with an orange "accent" and white "main" title split.
- **[StatusBadge](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/UI/StatusBadge.tsx)**: Used for labeling project statuses (e.g., "Active", "Completed") with semantic coloring.
- **[ResourceCard](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/UI/ResourceCard.tsx)**: A card component for the Resources page, featuring an icon and a CTA.
- **[OptimizedImage](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/UI/OptimizedImage.tsx)**: A wrapper for images providing lazy loading and responsive sizing.

## Layout Components (`src/components/layout`)

Layout components define the structural shell of the application.

- **[PageLayout](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/layout/PageLayout.tsx)**: The top-level wrapper for all pages, including the `Header`, `Footer`, and main content area.
- **[Header](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/layout/Header.tsx)**: High-performance navigation bar with mobile menu support and scroll-based elevation.
- **[Footer](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/layout/Footer.tsx)**: Global footer with branding, secondary links, and social icons.
- **[TwoColumnSection](file:///Users/mattfaltyn/Desktop/hypertrial_trilemma/foundation/website/src/components/layout/TwoColumnSection.tsx)**: A responsive grid layout for content blocks, typically used for hero sections or detailed information.

## Shared Styles & Presets

- **Tailwind UI Kit**: Custom tokens and utility classes are defined in `tailwind-ui-kit.preset.ts`.
- **Global Styles**: Base typography and scrollbar styles are in `src/index.css`.

## Development Guidelines

1. **Atomic Design**: Prefer creating new UI primitives in the `UI/` folder if a component will be used in more than two places.
2. **Prop Consistency**: Use TypeScript interfaces for all component props.
3. **Accessibility**: Always include `aria-labels` for interactive elements and ensure color contrast meets WCAG standards.
