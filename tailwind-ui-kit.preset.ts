import scrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const uiKitPreset = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    // Add xs breakpoint for extra-small devices
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },
      // Spacing for touch targets
      spacing: {
        touch: "44px",
        "touch-sm": "36px",
      },
      // Minimum sizes for touch targets
      minWidth: {
        touch: "44px",
      },
      minHeight: {
        touch: "44px",
      },
      colors: {
        background: "var(--color-primary-navy)",
        foreground: "var(--color-white)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-deep-night-black)",
        secondary: "var(--color-secondary)",
        "secondary-foreground": "var(--color-deep-night-black)",
        card: "var(--color-card)",
        popover: "var(--color-popover)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-deep-night-black)",
        destructive: "var(--color-destructive)",
        "destructive-foreground": "var(--color-white)",
        brand: {
          navy: "var(--color-primary-navy)",
          orange: "var(--color-signal-orange)",
          amber: "var(--color-digital-amber)",
          peach: "var(--color-soft-highlight-peach)",
          blue: "var(--color-blue-accent)",
          black: "var(--color-deep-night-black)",
          white: "var(--color-white)",
        },
      },
    },
  },
  plugins: [
    scrollbar({ nocompatible: true }),
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          "--color-primary-navy": "#1E1E44",
          "--color-signal-orange": "#FF9940",
          "--color-digital-amber": "#FF9940",
          "--color-soft-highlight-peach": "#5858C8",
          "--color-blue-accent": "#6CA8E4",
          "--color-deep-night-black": "#0A0A14",
          "--color-white": "#FFFFFF",
          "--color-card": "#11131D",
          "--color-popover": "#12141C",
          "--color-muted": "#161822",
          "--color-muted-foreground": "#BDBDBD",
          "--color-border": "#222534",
          "--color-input": "#222534",
          "--color-ring": "#30344F",
          "--color-primary": "#FF5F14",
          "--color-secondary": "#FF9A42",
          "--color-accent": "#FFD9B8",
          "--color-destructive": "#DC2828",
        },
      });
    }),
  ],
} satisfies Partial<Config>;

export default uiKitPreset;
