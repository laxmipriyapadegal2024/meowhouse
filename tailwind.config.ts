import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d0d9',
          300: '#f4a8bb',
          400: '#ed7a96',
          500: '#e14d72',
          600: '#cd2d5a',
          700: '#a61e46',
          800: '#8b1a3d',
          900: '#741a37',
          950: '#420a19',
        },
        wine: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f8d0d8',
          300: '#f2a8bc',
          400: '#ea7a9a',
          500: '#de4d7a',
          600: '#c93965',
          700: '#a52a53',
          800: '#8a2449',
          900: '#752242',
          950: '#460e20',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia'],
        script: ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'burgundy-gradient': 'linear-gradient(135deg, #a61e46 0%, #8b1a3d 100%)',
        'wine-gradient': 'linear-gradient(135deg, #a52a53 0%, #752242 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}
export default config
