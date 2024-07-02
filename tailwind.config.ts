import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        "ep-orange": "hsl(26, 100%, 55%)",
        "ep-pale-orange": "hsl(25, 100%, 94%)",

        // Neutral

        "ep-very-dark-blue": "hsl(220, 13%, 13%)",
        "ep-dark-grayish-blue": "hsl(219, 9%, 45%)",
        "ep-grayish-blue": "hsl(220, 14%, 75%)",
        "ep-light-grayish-blue": "hsl(223, 64%, 98%)",
        "ep-white": "hsl(0, 0%, 100%)",
        "ep-black": "hsl(0, 0%, 0%)", // (with 75% opacity for lightbox background),
      },
      fontFamily: {
        kumbh: ["Kumbh Sans", "sans-serif"],
      },
      fontSize: {
        base: "16px",
      },
      fontWeights: {
        normal: "400",
        bold: "700",
      },
      screens: {
        mobile: "375px",
        sm: "800px",
        desktop: "1440px",
      },
      backgroundImage: {
        // "sample-bg": "/tsugini" // basepath of github pages
      },
    },
  },
  plugins: [],
};
export default config;
