import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  extend: {
    fontFamily: {
      unbounded: ['var(--font-unbounded)'],
    },
  },
},
  plugins: [],
};

export default config;
