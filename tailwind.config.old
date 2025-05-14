import type { Config } from "tailwindcss"
const colors = require("tailwindcss/colors")

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/blocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/swiper/**/*.js",
  ],
  theme: {
    colors: {
      beige: {
        50: "hsl(var(--beige-50))",
        100: "hsl(var(--beige-100))",
        400: "hsl(var(--beige-400))",
      },
      blue: {
        50: "hsl(var(--blue-50))",
        100: "hsl(var(--blue-100))",
        500: "hsl(var(--blue-500))",
        600: "hsl(var(--blue-600))",
        950: "hsl(var(--blue-950))",
      },
      slate: {
        50: "hsl(var(--slate-50))",
        100: "hsl(var(--slate-100))",
        200: "hsl(var(--slate-200))",
        600: "hsl(var(--slate-600))",
        950: "hsl(var(--slate-950))",
      },
      yellow: {
        400: "hsl(var(--yellow-400))",
      },
      white: colors.white,
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
    },
    extend: {
      spacing: {
        xs: "1.5rem",
        sm: "3rem",
        lg: "5rem",
        xl: "10rem",
      },
      container: {
        center: true,
      },
      backgroundImage: {
        "fade-to-secondary": "linear-gradient(180deg, white 60%, hsl(var(--secondary)) 60%)",
        "fade-to-gray": "linear-gradient(180deg, white 60%, hsl(var(--slate-50)) 60%)",
        "fade-to-gray-reverse": "linear-gradient(180deg, hsl(var(--slate-50)) 60%, white 60%)",
        "fade-to-black-reverse": "linear-gradient(180deg, hsl(var(--blue-950)) 60%, white 60%)",
      },
      fontSize: {
        "heading-1": [
          "3.8rem",
          {
            lineHeight: "3.8rem",
            fontWeight: "700",
          },
        ],
        "heading-2": [
          "3rem", // 28.48px
          {
            lineHeight: "3.5rem",
            fontWeight: "700",
          },
        ],
        "heading-3": [
          "2.375rem", // 38px
          {
            lineHeight: "3rem", // 48px
            fontWeight: "700",
          },
        ],
        "heading-4": [
          "1.78rem", // 28px
          {
            fontWeight: "600",
            lineHeight: "2.35rem",
          },
        ],
        "heading-5": [
          "1.5rem",
          {
            lineHeight: "1.9rem",
            fontWeight: "500",
          },
        ],
        base: [
          "1.125rem",
          {
            lineHeight: "1.8rem",
            fontWeight: "400",
          },
        ],
        caption: [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: 400,
          },
        ],
        badge: ["0.875rem", { fontWeight: 500 }],
      },
      fontFamily: {
        sans: ["var(--font-workSans)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--blue-950))",
            h5: {
              fontWeight: 600,
            },
          },
        },
      }),
      keyframes: {
        "scroll-x": {
          from: { transform: "translateX(var(--marquee-scroll-start))" },
          to: { transform: "translateX(var(--marquee-scroll-end))" },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "collapsible-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-collapsible-content-height)",
          },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "scroll-x": "scroll-x var(--marquee-duration) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config
