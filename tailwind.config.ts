// Import the Config type from Tailwind CSS
import type { Config } from 'tailwindcss';

// Import the default colors module from Tailwind CSS
import { colors, fontFamily } from 'tailwindcss/defaultTheme';

// Annotate the config object with the Config type
const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
   
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        ...colors, // Use the default colors
        'light-gold': '#f5bc51',
        'dark-gold': '#533519',
      },
    },
  },
  plugins: [],
};

export default config;
