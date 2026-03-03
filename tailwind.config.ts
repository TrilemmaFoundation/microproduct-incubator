import type { Config } from "tailwindcss";
import uiKitPreset from "./tailwind-ui-kit.preset";

export default {
  presets: [uiKitPreset],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
} satisfies Config;
