import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderColor: {
        "primary-blue": "#554de4",
        "primary-gray": "#100918",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(179deg, #F6F7F8 0.63%, #EFEEFF 98.87%)",
      },
      boxShadow: {
        button:
          "-4px -4px 14px 0px rgba(122, 137, 158, 0.70) inset, 4px 4px 14px 0px #5D55FA inset",
        "hover-button":
          "-4px -4px 14px 0px rgba(122, 137, 158, 0.70) inset, 0px 0px 40px 0px #5D55FA inset",
        "hover-button-secondary":
          "-4px -4px 14px 0px #FFF inset, 4px 4px 14px 0px #CDCAFD inset",
        "primary-box":
          "2px 2px 12px 0px #554DE4 inset, 0px 0px 24px 8px rgba(86, 78, 228, 0.25)",
        "primary-box-inset":
          "2px 2px 12px 0px #554DE4 inset, 0px 0px 24px 8px rgba(86, 78, 228, 0.25) inset",
        "border-inset": "0px 0px 0px 2px #554de4 inset",
        "secondary-box":
          "0px -12px 32px 0px #FFF inset, 8px 8px 32px 0px #E3E5E9 inset, -8px -8px 32px 0px #FFF inset",
      },
      colors: {
        "primary-background": "#F4F6F9",
        "primary-blue": "#554de4",
        "primary-button": "#0C1221",
        "hover-button": "#191B44",
        "secondary-button": "#EFEEFF",
        red: "#BB374B",
        orange: "#F18939",
        green: "#6EE1A7",
        gray: "#7A899E",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
